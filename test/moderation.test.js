import test from 'node:test';
import assert from 'node:assert/strict';
import { appealCase, assignCase, createCase, decideCase, moderationQueue } from '../src/index.js';

test('case follows review and appeal flow', () => {
  let c = createCase({ id: '1', subjectId: 'user-1', reason: 'Spam', severity: 'high' });
  c = assignCase(c, 'mod-1');
  c = decideCase(c, { action: 'warning', rationale: 'Repeated spam', moderatorId: 'mod-1' });
  c = appealCase(c, 'Please review this again');
  assert.equal(c.state, 'appealed');
  assert.equal(c.history.length, 4);
});

test('appeals are prioritised in the queue', () => {
  let appealed = createCase({ id: 'a', subjectId: '1', reason: 'A', severity: 'low' });
  appealed = decideCase(appealed, { action: 'warning', rationale: 'reason', moderatorId: 'mod' });
  appealed = appealCase(appealed, 'appeal');
  const critical = createCase({ id: 'b', subjectId: '2', reason: 'B', severity: 'critical' });
  assert.equal(moderationQueue([critical, appealed])[0].id, 'a');
});
