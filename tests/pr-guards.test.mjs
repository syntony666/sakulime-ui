import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const readWorkflow = name => readFileSync(
  new URL(`../.github/workflows/${name}.yml`, import.meta.url), 'utf8',
);
const codeql = readWorkflow('codeql');
const review = readWorkflow('dependency-review');

test('CodeQL scans pull requests and master pushes with the security-and-quality suite', () => {
  assert.match(codeql, /\n {2}pull_request:/);
  assert.match(codeql, /\n {2}push:[^]*branches:[^]*- master/);
  assert.match(codeql, /\n {2}schedule:[^]*cron: "0 0 \* \* 1"/);
  assert.match(codeql, /security-events: write/);
  assert.match(codeql, /github\/codeql-action\/init@v\d+/);
  assert.match(codeql, /github\/codeql-action\/analyze@v\d+/);
  assert.match(codeql, /languages: javascript-typescript/);
  assert.match(codeql, /queries: security-and-quality/);
  assert.doesNotMatch(codeql, /pull_request_target/);
});

test('Dependency Review runs on pull requests with read-only permissions', () => {
  assert.match(review, /\n {2}pull_request:/);
  assert.doesNotMatch(review, /\n {2}(push|pull_request_target|workflow_dispatch):/);
  assert.match(review, /contents: read/);
  assert.doesNotMatch(review, /secrets\./);
  assert.match(review, /actions\/dependency-review-action@v\d+/);
  assert.match(review, /fail-on-severity: (high|critical)/);
});
