# Moderation Console

A moderation case workflow for communities that need decisions to be reviewable instead of disappearing into random staff messages.

The core model treats moderation like case management: reports have severity, evidence, assignment, a decision rationale, appeal state and a permanent history of what happened.

## Current features

- case creation with severity and evidence references
- moderator assignment
- action + written rationale
- appeal workflow
- case closure
- immutable-style history entries
- queue prioritisation (appeals first, then severity)
- case statistics

```js
import { createCase, assignCase, decideCase, appealCase } from './src/index.js';
```

This is useful for Discord/community tooling because moderation gets messy fast when there is no source of truth. A future UI can add permissions, attachments, user notifications and searchable audit logs on top of the domain model.

Requires Node 20+.
