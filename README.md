<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=MODERATION%20CONSOLE&fontAlignY=38&desc=CASES%20%E2%80%A2%20EVIDENCE%20%E2%80%A2%20APPEALS&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Moderation](https://img.shields.io/badge/model-case%20management-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/tests-node:test-7a1f1f?style=for-the-badge)

**A moderation workflow built around reviewable decisions instead of scattered staff messages.**

</div>

---

## Current model

- case creation with severity and evidence references
- moderator assignment
- action + written rationale
- appeal workflow
- case closure
- immutable-style history entries
- queue prioritisation (appeals first, then severity)
- case statistics
- automated tests

## Why I built it

Community moderation gets messy fast when there is no source of truth. I wanted the core to treat moderation like case management: every decision should have context, ownership and a history that can be reviewed later.

```txt
report
  ↓
case + evidence
  ↓
assignment
  ↓
decision + rationale
  ↓
appeal / closure
  ↓
history
```

## Use

```js
import { createCase, assignCase, decideCase, appealCase } from './src/index.js';
```

```bash
npm test
```

## Next

`role permissions` · `attachments` · `searchable audit log` · `user notifications` · `appeal review queue`

---

<div align="center"><sub>YukiShinobi // moderation should be accountable even when the community is busy.</sub></div>
