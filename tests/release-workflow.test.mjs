import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { devNull, tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const readWorkflow = name => {
  const url = new URL(`../.github/workflows/${name}.yml`, import.meta.url);
  return existsSync(url) ? readFileSync(url, 'utf8') : '';
};
const start = readWorkflow('release-pr');
const checks = readWorkflow('test');
const publish = readWorkflow('release');

function shellBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(\s*)run: \|$/);
    if (!match) continue;
    const indent = match[1].length + 2;
    const block = [];
    while (i + 1 < lines.length) {
      const line = lines[i + 1];
      if (line.trim() && !line.startsWith(' '.repeat(indent))) break;
      block.push(line.slice(indent));
      i++;
    }
    blocks.push(block.join('\n'));
  }
  return blocks;
}

function releaseFixture(t, { changeset = true } = {}) {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-release-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const repo = join(tmp, 'repo');
  const bin = join(tmp, 'bin');
  mkdirSync(repo);
  mkdirSync(bin);
  const write = (path, content) => {
    const full = join(repo, path);
    mkdirSync(join(full, '..'), { recursive: true });
    writeFileSync(full, content);
  };
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-b', 'master');
  git('config', 'user.name', 'Release test');
  git('config', 'user.email', 'test@example.invalid');
  const names = ['sakulime-ui', '@sakulime-ui/core', '@sakulime-ui/layout', '@sakulime-ui/theme'];
  const paths = ['', 'packages/core/', 'packages/layout/', 'packages/theme/'];
  for (const [i, path] of paths.entries()) {
    write(`${path}package.json`, JSON.stringify({
      name: names[i], version: '0.4.4',
      ...(i === 0 ? { workspaces: ['.', 'packages/*'] } : {}),
    }));
    write(`${path}CHANGELOG.md`, '# Changelog\n');
  }
  write('package-lock.json', '{}\n');
  write('.changeset/config.json', JSON.stringify({
    changelog: false, fixed: [names], linked: [], access: 'public',
    baseBranch: 'master', updateInternalDependencies: 'patch', ignore: [],
  }));
  git('add', '.');
  git('commit', '-m', 'Initial version');
  git('switch', '-c', 'release/0.4.5');
  if (changeset) write('.changeset/patch.md', '---\n"sakulime-ui": patch\n---\nRelease fixture.\n');
  else write('source.txt', 'A CI-only source without a changeset.\n');
  git('add', '.');
  git('commit', '-m', 'Source changes');
  const source = git('rev-parse', 'HEAD');
  const remote = join(tmp, 'origin.git');
  git('clone', '--bare', repo, remote);
  git('remote', 'add', 'origin', remote);
  git('switch', 'master');

  const log = join(tmp, 'calls.jsonl');
  const state = join(tmp, 'pr.json');
  writeFileSync(join(bin, 'gh'), `#!/usr/bin/env node
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.CALL_LOG, JSON.stringify(args) + '\\n');
if (args[0] === 'pr' && args[1] === 'list') {
  if (fs.existsSync(process.env.PR_STATE)) process.stdout.write(fs.readFileSync(process.env.PR_STATE));
} else if (args[0] === 'pr' && args[1] === 'create') {
  const pr = { state: 'OPEN', url: 'https://example.invalid/pull/1' };
  fs.writeFileSync(process.env.PR_STATE, JSON.stringify(pr));
  console.log(pr.url);
} else if (args[0] !== 'workflow' || args[1] !== 'run') {
  process.exit(1);
}
`, { mode: 0o755 });
  writeFileSync(join(bin, 'npm'), '#!/bin/sh\nprintf \'["npm","%s"]\\n\' "$*" >> "$CALL_LOG"\n', { mode: 0o755 });
  writeFileSync(join(bin, 'npx'), '#!/bin/sh\nprintf \'["npx","version"]\\n\' >> "$CALL_LOG"\nexec "$TEST_NODE" "$CHANGESET_CLI" version\n', { mode: 0o755 });
  const env = {
    ...process.env, CI: 'true', TEST_BIN: bin, npm_config_offline: 'true',
    RELEASE_BRANCH: 'release/0.4.5', GH_REPO: 'example/fixture',
    GH_TOKEN: '', GITHUB_TOKEN: '', NODE_AUTH_TOKEN: '', NPM_TOKEN: '',
    CALL_LOG: log, PR_STATE: state, GITHUB_STEP_SUMMARY: join(tmp, 'summary'),
    TEST_NODE: process.execPath,
    CHANGESET_CLI: fileURLToPath(new URL('../node_modules/@changesets/cli/bin.js', import.meta.url)),
  };
  const script = `
    npm() { "$TEST_BIN/npm" "$@"; }
    npx() { "$TEST_BIN/npx" "$@"; }
    gh() { "$TEST_BIN/gh" "$@"; }
    ${shellBlocks(start)[1]}
  `;
  const run = () => spawnSync('bash', ['-e', '-c', script], {
    cwd: repo, env, encoding: 'utf8',
  });
  const calls = () => existsSync(log) ? readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse) : [];
  return { repo, git, source, run, calls, state, write };
}

test('Start Release is manual and never approves or merges a PR', () => {
  assert.match(start, /name: Start Release/);
  assert.match(start, /workflow_dispatch:/);
  assert.match(start, /release_branch:/);
  assert.doesNotMatch(start, /\n {2}push:/);
  assert.doesNotMatch(start, /gh pr (?:review|merge)|--auto\b|--force\b/);
});

test('source validation rejects non-release branches and non-master workflow refs', () => {
  const validation = shellBlocks(start)[0];
  assert.ok(validation, 'the workflow must validate input before checkout');
  const run = (branch, ref = 'refs/heads/master') => spawnSync('bash', ['-e', '-c', validation], {
    encoding: 'utf8',
    env: { ...process.env, RELEASE_BRANCH: branch, GITHUB_REF: ref, GITHUB_OUTPUT: devNull },
  });
  assert.equal(run('release/0.4.5').status, 0);
  for (const branch of ['master', 'release/foo', 'release/01.2.3', 'release/1.2.3; echo unsafe']) {
    assert.notEqual(run(branch).status, 0, branch);
  }
  assert.notEqual(run('release/0.4.5', 'refs/heads/release/0.4.5').status, 0);
});

test('preparation snapshots the source without rewriting an existing release', () => {
  assert.match(start, /git merge-base --is-ancestor/);
  assert.match(start, /git rev-parse HEAD\^/);
  assert.match(start, /npm ci/);
  assert.match(start, /changeset version/);
  assert.match(start, /--package-lock-only --ignore-scripts/);
  assert.match(start, /git commit -m "chore: release \$version"/);
  assert.match(start, /gh pr list[^]*--state all/);
  assert.match(start, /gh pr create --base master --head "\$target"/);
  assert.match(start, /gh workflow run test.yml --ref "\$target"/);
});

test('bot-created PRs have an explicit check run on their prepared branch', () => {
  assert.match(checks, /workflow_dispatch:/);
  assert.doesNotMatch(checks, /if:.*changeset-release/);
  assert.match(checks, /name: Fixture assertions/);
  assert.match(checks, /node --test tests\/release-workflow\.test\.mjs/);
  assert.match(start, /actions: write/);
});

test('master publishes a prepared version without opening a second PR', () => {
  assert.match(publish, /\n {2}push:\n {4}branches:\n {6}- master/);
  assert.doesNotMatch(publish, /changesets\/action|changeset version|gh pr create/);
  assert.match(publish, /HEAD\^1:package\.json/);
  assert.match(publish, /npm run release/);
  assert.match(publish, /gh release create/);
  assert.match(publish, /id-token: write/);
});

test('every multiline workflow shell command has valid bash syntax', () => {
  const blocks = [start, checks, publish].flatMap(shellBlocks);
  assert.ok(blocks.length > 0);
  for (const block of blocks) {
    const result = spawnSync('bash', ['-n'], { input: block, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
});

test('preparation creates one real version commit and retries without another bump', t => {
  const fixture = releaseFixture(t);
  const result = fixture.run();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const head = fixture.git('rev-parse', 'HEAD');
  assert.equal(fixture.git('rev-parse', 'HEAD^'), fixture.source);
  assert.equal(JSON.parse(readFileSync(join(fixture.repo, 'package.json'))).version, '0.4.5');
  assert.equal(fixture.git('rev-parse', 'origin/release/0.4.5'), fixture.source);
  assert.equal(JSON.parse(fixture.git('show', 'master:package.json')).version, '0.4.4');
  assert.equal(fixture.git('log', '-1', '--format=%s'), 'chore: release 0.4.5');
  const retry = fixture.run();
  assert.equal(retry.status, 0, retry.stdout + retry.stderr);
  assert.equal(fixture.git('rev-parse', 'HEAD'), head);
  assert.equal(fixture.calls().filter(args => args[0] === 'pr' && args[1] === 'create').length, 1);
  assert.equal(fixture.calls().filter(args => args.join(' ') === 'workflow run test.yml --ref changeset-release/0.4.5').length, 2);
  assert.deepEqual(fixture.calls().filter(args => args[0] === 'npm'), [
    ['npm', 'ci'], ['npm', 'install --package-lock-only --ignore-scripts'],
  ]);
  assert.equal(fixture.calls().filter(args => args[0] === 'npx').length, 1);
});

test('preparation refuses a source changed after its PR was prepared', t => {
  const fixture = releaseFixture(t);
  const first = fixture.run();
  assert.equal(first.status, 0, first.stdout + first.stderr);
  const head = fixture.git('rev-parse', 'HEAD');
  fixture.git('switch', 'release/0.4.5');
  fixture.write('later.txt', 'New source changes\n');
  fixture.git('add', '.');
  fixture.git('commit', '-m', 'Later source');
  fixture.git('push', 'origin', 'release/0.4.5');
  const retry = fixture.run();
  assert.notEqual(retry.status, 0);
  assert.match(retry.stdout, /source changed after preparation/);
  assert.equal(fixture.git('rev-parse', 'HEAD'), head);
  assert.equal(fixture.calls().filter(args => args[0] === 'pr' && args[1] === 'create').length, 1);
});

test('preparation stops without a changeset instead of pushing an unchanged version', t => {
  const fixture = releaseFixture(t, { changeset: false });
  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /No unreleased changesets found/);
  assert.equal(fixture.git('ls-remote', '--heads', 'origin', 'refs/heads/changeset-release/0.4.5'), '');
  assert.equal(fixture.calls().filter(args => args[0] === 'pr' && args[1] === 'create').length, 0);
});

test('preparation never reopens a merged or closed release PR', t => {
  const fixture = releaseFixture(t);
  for (const state of ['MERGED', 'CLOSED']) {
    writeFileSync(fixture.state, JSON.stringify({ state, url: 'https://example.invalid/pull/1' }));
    const result = fixture.run();
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /already closed or merged/);
  }
  assert.equal(fixture.git('rev-parse', 'HEAD'), fixture.git('rev-parse', 'master'));
});

test('installing the workflow without a version bump cannot publish packages', t => {
  const fixture = releaseFixture(t, { changeset: false });
  fixture.git('switch', 'release/0.4.5');
  const output = join(fixture.repo, 'outputs');
  const result = spawnSync('bash', ['-e', '-c', shellBlocks(publish)[0]], {
    cwd: fixture.repo, encoding: 'utf8', env: { ...process.env, GITHUB_OUTPUT: output },
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(readFileSync(output, 'utf8'), 'publish=false\n');
});

test('preparation stops when the source does not include the latest master', t => {
  const fixture = releaseFixture(t);
  fixture.write('new-master.txt', 'Latest workflow changes\n');
  fixture.git('add', '.');
  fixture.git('commit', '-m', 'Update master');
  fixture.git('push', 'origin', 'master');
  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /Sync the latest master/);
  assert.equal(fixture.git('ls-remote', '--heads', 'origin', 'refs/heads/changeset-release/0.4.5'), '');
  assert.equal(fixture.calls().filter(args => args[0] === 'pr' && args[1] === 'create').length, 0);
});

test('only merging the prepared version enables publication', t => {
  const fixture = releaseFixture(t);
  const prepared = fixture.run();
  assert.equal(prepared.status, 0, prepared.stdout + prepared.stderr);
  fixture.git('switch', 'master');
  fixture.git('merge', '--no-ff', 'changeset-release/0.4.5', '-m', 'Merge approved release');
  const output = join(fixture.repo, 'outputs');
  const result = spawnSync('bash', ['-e', '-c', shellBlocks(publish)[0]], {
    cwd: fixture.repo, encoding: 'utf8', env: { ...process.env, GITHUB_OUTPUT: output },
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(readFileSync(output, 'utf8'), 'publish=true\ntag=sakulime-ui@0.4.5\n');
});
