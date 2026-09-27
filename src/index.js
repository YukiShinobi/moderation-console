export const CASE_STATES = ['open', 'reviewing', 'actioned', 'appealed', 'closed'];
export const SEVERITY_WEIGHT = { low: 1, medium: 2, high: 3, critical: 4 };

export function createCase({ id, subjectId, reason, severity = 'medium', evidence = [] }) {
  if (!subjectId || !reason) throw new Error('subjectId and reason are required');
  if (!(severity in SEVERITY_WEIGHT)) throw new Error('Invalid severity');
  const at = new Date().toISOString();
  return {
    id,
    subjectId,
    reason,
    severity,
    evidence,
    state: 'open',
    assignedTo: null,
    decision: null,
    appeal: null,
    createdAt: at,
    history: [{ type: 'created', at, severity, reason }]
  };
}

export function assignCase(caseRecord, moderatorId) {
  return {
    ...caseRecord,
    assignedTo: moderatorId,
    state: caseRecord.state === 'open' ? 'reviewing' : caseRecord.state,
    history: [...caseRecord.history, { type: 'assigned', moderatorId, at: new Date().toISOString() }]
  };
}

export function decideCase(caseRecord, { action, rationale, moderatorId }) {
  if (!rationale?.trim()) throw new Error('A rationale is required');
  return {
    ...caseRecord,
    state: 'actioned',
    decision: { action, rationale, moderatorId, at: new Date().toISOString() },
    history: [...caseRecord.history, { type: 'decision', action, moderatorId, at: new Date().toISOString() }]
  };
}

export function appealCase(caseRecord, text) {
  if (caseRecord.state !== 'actioned') throw new Error('Only actioned cases can be appealed');
  return {
    ...caseRecord,
    state: 'appealed',
    appeal: { text: text.trim(), at: new Date().toISOString() },
    history: [...caseRecord.history, { type: 'appeal', at: new Date().toISOString() }]
  };
}

export function closeCase(caseRecord, moderatorId) {
  return {
    ...caseRecord,
    state: 'closed',
    history: [...caseRecord.history, { type: 'closed', moderatorId, at: new Date().toISOString() }]
  };
}

export function moderationQueue(cases = []) {
  const statePriority = { appealed: 4, open: 3, reviewing: 2, actioned: 1, closed: 0 };
  return [...cases].sort((a, b) => {
    const stateDelta = statePriority[b.state] - statePriority[a.state];
    if (stateDelta) return stateDelta;
    const severityDelta = SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity];
    if (severityDelta) return severityDelta;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

export function caseStats(cases = []) {
  return CASE_STATES.reduce((stats, state) => {
    stats[state] = cases.filter(item => item.state === state).length;
    return stats;
  }, { total: cases.length });
}
