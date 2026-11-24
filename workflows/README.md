# Workflow snapshots

JSON exports of workflow definitions from the GHL workflow API (`GET /workflows/{id}/definition`).

- Save as `workflows/<code>.json`, e.g. `workflows/cs-mads.json`, after every change.
- **Redact before committing.** Custom Code steps keep the API token in `attributes.inputData.token`. Replace it with `"<TOKEN>"`. Put unredacted pulls in `workflows/raw/` (git-ignored).
- The `version` field changes on every save; don't edit it by hand. The API rejects an update with a stale version.
