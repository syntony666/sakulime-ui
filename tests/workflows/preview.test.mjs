import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { readWorkflow, shellBlocks } from '../lib/workflow.mjs';
import { mockBin, readCalls } from '../lib/mocks.mjs';

const checks = readWorkflow('test');
const pipeline = readWorkflow('test-pipeline');

function previewFixture(t) {
  const tmp = mkdtempSync(join(tmpdir(), 'sl-preview-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const bin = join(tmp, 'bin');
  const log = join(tmp, 'calls.jsonl');
  const output = join(tmp, 'output');
  const summary = join(tmp, 'summary');
  writeFileSync(output, '');
  writeFileSync(summary, '');
  mockBin(bin, 'gh', `#!/usr/bin/env node
const fs = require('node:fs');
fs.appendFileSync(process.env.CALL_LOG, JSON.stringify(['gh', ...process.argv.slice(2)]) + '\\n');
if (process.env.MOCK_GH_FAILURE) process.exit(1);
console.log(process.env.MOCK_PRS);
`);
  mockBin(bin, 'npx', `#!/usr/bin/env node
const fs = require('node:fs');
fs.appendFileSync(process.env.CALL_LOG, JSON.stringify(['npx', ...process.argv.slice(2)]) + '\\n');
if (process.env.MOCK_PREVIEW_FAILURE) process.exit(1);
fs.writeFileSync(
  process.env.WRANGLER_OUTPUT_FILE_PATH,
  JSON.stringify({ type: 'preview', preview_urls: [process.env.MOCK_PREVIEW_URL] }) + '\\n',
);
console.log(process.env.MOCK_PREVIEW_STDOUT);
`);
  const pr = {
    number: 42, state: 'open',
    head: { ref: 'feature/docs', sha: 'a'.repeat(40), repo: { full_name: 'example/fixture' } },
  };
  const run = (name, env = {}) => {
    const step = checks.split(`      - name: ${name}\n`)[1]?.split('\n      - ')[0];
    const script = step && shellBlocks(step)[0];
    assert.ok(script, `the workflow must include the ${name} shell step`);
    return spawnSync('bash', ['-e', '-o', 'pipefail', '-c', `
      gh() { "$TEST_BIN/gh" "$@"; }
      npx() { "$TEST_BIN/npx" "$@"; }
      ${script}
    `], {
      cwd: tmp, encoding: 'utf8',
      env: {
        ...process.env, TEST_BIN: bin, CALL_LOG: log,
        GH_TOKEN: '', GITHUB_TOKEN: '', CLOUDFLARE_API_TOKEN: '', CLOUDFLARE_ACCOUNT_ID: '',
        GITHUB_OUTPUT: output, GITHUB_STEP_SUMMARY: summary, GITHUB_WORKSPACE: tmp,
        RUNNER_TEMP: tmp,
        GITHUB_REPOSITORY: 'example/fixture', GITHUB_REPOSITORY_OWNER: 'example',
        PR_BRANCH: pr.head.ref, PR_HEAD_SHA: pr.head.sha, PR_NUMBER: String(pr.number),
        MOCK_PRS: JSON.stringify([pr]), MOCK_GH_FAILURE: '', MOCK_PREVIEW_FAILURE: '',
        MOCK_PREVIEW_URL: 'https://preview.example.invalid',
        MOCK_PREVIEW_STDOUT: 'stdout progress\n{"preview":{"urls":["https://preview.example.invalid"]}}',
        ...env,
      },
    });
  };
  return {
    tmp, pr, run,
    output: () => readFileSync(output, 'utf8'),
    summary: () => readFileSync(summary, 'utf8'),
    calls: () => readCalls(log),
  };
}

const evalExpr = (expression, github) => new Function(
  'github', 'startsWith', `return (${expression});`,
)(github, (value, prefix) => value.startsWith(prefix));
const jobExpr = re => {
  const match = checks.match(re);
  assert.ok(match, 'the workflow must define the job expression');
  return match[1];
};
const concurrencyGroup = github => jobExpr(/\n {2}group: (.+)/)
  .replace(/\$\{\{ (.+?) \}\}/g, (_, expression) => String(evalExpr(expression, github)));
const githubContext = ({
  event_name, login = null, head_ref = null, ref_name = 'main',
  repo = 'example/fixture', headRepo = repo,
}) => ({
  event_name,
  repository: repo,
  head_ref: event_name === 'pull_request' ? head_ref : null,
  ref_name,
  event: {
    pull_request: event_name === 'pull_request'
      ? { user: { login }, head: { repo: { full_name: headRepo }, sha: 'a'.repeat(40) }, number: 7 }
      : { user: { login: null }, head: { repo: { full_name: null }, sha: null }, number: null },
  },
});

test('Test runs only for PRs and explicit dispatch, not branch pushes', () => {
  assert.match(checks, /\n {2}pull_request:/);
  assert.match(checks, /\n {2}workflow_dispatch:/);
  assert.doesNotMatch(checks, /\n {2}push:/);
});

test('every check run executes the same Fixture assertions job', () => {
  const job = checks.split(/\n {2}verify:\n/)[1]?.split('\n  preview:')[0];
  assert.ok(job, 'the workflow must define the verify job');
  assert.match(job, /name: Fixture assertions/);
  assert.doesNotMatch(job, /\n {4}if:/);
  assert.doesNotMatch(checks, /Release checks delegated/);
});

test('a branch keeps one in-flight check run for any trigger', () => {
  const pr = githubContext({
    event_name: 'pull_request', login: 'github-actions[bot]', head_ref: 'changeset-release/0.4.5',
  });
  const dispatch = githubContext({
    event_name: 'workflow_dispatch', ref_name: 'changeset-release/0.4.5',
  });
  assert.equal(concurrencyGroup(pr), concurrencyGroup(dispatch));
});

test('the shared pipeline builds the preview-flagged site and runs the test suite', () => {
  assert.match(checks, /site: "true"/);
  assert.match(pipeline, /\n {8}env:\n {10}VITE_DOC_PREVIEW: "true"/);
  assert.match(pipeline, /run: node --test$/m);
  assert.match(pipeline, /upload-artifact@v4/);
  assert.match(pipeline, /name: docs-site/);
  assert.match(checks, /download-artifact@v4/);
});

test('Preview is gated after checks and does not expose deployment secrets to forks', () => {
  assert.match(checks, /contents: read/);
  assert.match(checks, /pull-requests: read/);
  assert.match(checks, /statuses: write/);
  assert.match(checks, /cancel-in-progress: true/);
  assert.match(checks, /group: test-\$\{\{ github.event.pull_request.head.repo.full_name \|\| github.repository \}\}-\$\{\{ github.head_ref \|\| github.ref_name \}\}/);
  assert.match(checks, /if: \$\{\{ github.event_name == 'workflow_dispatch' \|\| github.event.pull_request.head.repo.full_name == github.repository \}\}/);
  assert.match(checks, /if: \$\{\{ steps.preview.outputs.name != '' \}\}/);
  assert.match(checks, /PR_BRANCH: \$\{\{ github.head_ref \|\| github.ref_name \}\}/);
  assert.match(checks, /PR_HEAD_SHA: \$\{\{ github.event.pull_request.head.sha \|\| github.sha \}\}/);
  assert.match(checks, /PR_NUMBER: \$\{\{ github.event.pull_request.number \|\| 0 \}\}/);
  const previewJob = checks.indexOf('\n  preview:');
  const lookup = checks.indexOf('- name: Find open PR for Preview');
  const deployment = checks.indexOf('- name: Deploy docs Preview');
  const status = checks.indexOf('- name: Publish Preview status');
  assert.ok(previewJob > 0 && previewJob < lookup && lookup < deployment && deployment < status);
  assert.match(checks, /\n {2}preview:[^]*needs: verify/);
  assert.doesNotMatch(checks.slice(0, deployment), /secrets\.CLOUDFLARE_/);
  assert.match(checks.slice(deployment), /CLOUDFLARE_API_TOKEN: \$\{\{ secrets.CLOUDFLARE_API_TOKEN \}\}/);
  assert.match(checks.slice(deployment), /CLOUDFLARE_ACCOUNT_ID: \$\{\{ secrets.CLOUDFLARE_ACCOUNT_ID \}\}/);
  assert.match(checks, /echo "sha=\$PR_HEAD_SHA" >> "\$GITHUB_OUTPUT"/);
  assert.match(checks, /STATUS_SHA: \$\{\{ steps\.preview\.outputs\.sha \}\}/);
  assert.match(checks, /PREVIEW_URL: \$\{\{ steps\.deploy\.outputs\.url \}\}/);
  assert.match(checks, /gh api "repos\/\$GITHUB_REPOSITORY\/statuses\/\$STATUS_SHA"/);
  assert.match(checks, /context="Docs Preview"/);
  assert.match(checks, /target_url="\$PREVIEW_URL"/);
  assert.doesNotMatch(checks, /pull_request_target|wrangler deploy/);
});

test('an open same-repository PR resolves to a stable Preview name', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Find open PR for Preview');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(fixture.output(), `name=pr-42\nsha=${'a'.repeat(40)}\n`);
  assert.deepEqual(fixture.calls(), [[
    'gh', 'api', '--method', 'GET', 'repos/example/fixture/pulls',
    '-f', 'state=open', '-f', 'head=example:feature/docs',
  ]]);
});

test('bot dispatch resolves the open PR without a pull_request event number', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Find open PR for Preview', { PR_NUMBER: '0' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(fixture.output(), `name=pr-42\nsha=${'a'.repeat(40)}\n`);
});

test('a manual check without an open PR does not schedule a Preview', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Find open PR for Preview', { MOCK_PRS: '[]', PR_NUMBER: '0' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(fixture.output(), '');
});

for (const [name, update] of [
  ['closed PR', pr => { pr.state = 'closed'; }],
  ['fork PR', pr => { pr.head.repo.full_name = 'contributor/fork'; }],
  ['outdated revision', pr => { pr.head.sha = 'b'.repeat(40); }],
  ['different branch', pr => { pr.head.ref = 'feature/other'; }],
  ['different PR number', pr => { pr.number = 43; }],
]) {
  test(`Preview rejects a ${name}`, t => {
    const fixture = previewFixture(t);
    const response = structuredClone(fixture.pr);
    update(response);
    const result = fixture.run('Find open PR for Preview', { MOCK_PRS: JSON.stringify([response]) });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(fixture.output(), '');
  });
}

test('PR lookup failures stop the check instead of authorizing a Preview', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Find open PR for Preview', { MOCK_GH_FAILURE: '1' });
  assert.notEqual(result.status, 0);
  assert.equal(fixture.output(), '');
});

test('Preview deploys the built docs using the local CLI and reports its URL', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Deploy docs Preview', { PREVIEW_NAME: 'pr-42' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(fixture.calls(), [[
    'npx', '--no-install', 'wrangler', 'preview',
    '--config', join(fixture.tmp, 'doc/wrangler.toml'), '--name', 'pr-42', '--json',
  ]]);
  assert.match(fixture.summary(), /https:\/\/preview\.example\.invalid/);
  assert.match(fixture.output(), /url=https:\/\/preview\.example\.invalid/);
});

test('Preview reads the structured output instead of command stdout', t => {
  const fixture = previewFixture(t);
  const result = fixture.run('Deploy docs Preview', {
    PREVIEW_NAME: 'pr-42',
    MOCK_PREVIEW_STDOUT: '🌀 Starting asset upload...\nnot a JSON payload',
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(fixture.summary(), '### Docs Preview\n\nhttps://preview.example.invalid\n');
});

test('Preview command failures or missing URLs fail the check', t => {
  for (const env of [{ MOCK_PREVIEW_FAILURE: '1' }, { MOCK_PREVIEW_URL: '' }]) {
    const fixture = previewFixture(t);
    const result = fixture.run('Deploy docs Preview', { PREVIEW_NAME: 'pr-42', ...env });
    assert.notEqual(result.status, 0);
    assert.equal(fixture.summary(), '');
    assert.equal(fixture.output(), '');
  }
});

test('a successful Preview publishes its URL as a commit status', t => {
  const fixture = previewFixture(t);
  const deploy = fixture.run('Deploy docs Preview', { PREVIEW_NAME: 'pr-42' });
  assert.equal(deploy.status, 0, deploy.stdout + deploy.stderr);
  const url = fixture.output().match(/^url=(.+)$/m)[1];
  const result = fixture.run('Publish Preview status', {
    STATUS_SHA: fixture.pr.head.sha, PREVIEW_URL: url,
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(fixture.calls().at(-1), [
    'gh', 'api', `repos/example/fixture/statuses/${'a'.repeat(40)}`,
    '-f', 'state=success', '-f', 'context=Docs Preview',
    '-f', 'target_url=https://preview.example.invalid',
    '-f', 'description=Documentation preview',
  ]);
});
