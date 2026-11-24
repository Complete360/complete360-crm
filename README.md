# complete360-crm

Source of truth for Complete360's GoHighLevel build: card templates, custom code, and workflow snapshots. GHL is the live system; this repo is the reviewed copy with history.

## Account guard

- Complete360 sub-account only: location `1pBjHBEIsKGbwvAUTY9u`. The API connection can see other sub-accounts. Never touch them.
- B2 / Voicedrop Snapshot is off-limits.
- Builder links use `app.complete360.org`, never `app.gohighlevel.com`.

## Layout

| Folder | What's in it |
|---|---|
| `cards/ord01/` | ✅ [SET] project card descriptions created by [ORD.01] Order Intake |
| `cards/cs-<code>/` | 🔁 [ACR] review card descriptions created by each [CS.CODE] workflow |
| `code/` | Custom Code steps (e.g. [SYS.17] Subtask Builder) |
| `workflows/` | JSON exports of workflow definitions (see `workflows/README.md`) |
| `CHANGELOG.md` | One entry per change made in GHL |

## Card format: THE SPACING RULE (read before writing any card)

**Exactly one blank line between sections. Never double. Never bigger.**

- **NEVER use empty paragraphs** (`<p></p>`, `<p style="..."></p>`, `<p><br></p>`) as spacers. GHL renders every empty paragraph as a huge gap (3 to 4 lines). This is the bug that kept coming back.
- **For the one blank line, start the next section's paragraph with `<br>`**: `<p><br><strong>Product:</strong> ...</p>`. A line break inside a paragraph renders as exactly one line.
- Sections that follow each other with no gap (e.g. STATUS list → gray banner, numbered checklist sections) get no `<br>`.
- **GHL strips `margin:0px` / `padding` styles when it saves a card.** Only `background-color` survives. Don't add margin styles; they do nothing.
- Banners: `<p style="background-color:#FFF3CD">` (yellow = build/launch), `#D1ECF1` (blue = renewal), `#E2E3E5` (gray = checklist how-to), `#F8D7DA` (red = warning). When a banner follows a gap, the `<br>` goes at the start of the banner paragraph (`<p style="background-color:#FFF3CD"><br><strong>…`).
- Line breaks are `<br>`. Custom values: `<span data-cv-variable="opportunity.order_id" data-cv-token="true">{{opportunity.order_id}}</span>`.
- Footer: `<p><br><em>Created by: [WORKFLOW] Name</em></p>`.
- Status: `<br>` method converted in every file on Nov 24, 2026; confirm on one live test card before pushing to GHL.
- **Before committing or pushing any card**, run `python3 scripts/check_cards.py`. It fails on any empty paragraph.

**To apply a card:** open the Create Task action, description box → source code view `<>` → select all → paste → save → publish the workflow. Do not use Workflow AI for card bodies; it strips the banner colors.

## Naming spine

- Workflows: `[AREA.CODE.##] Name`. Areas: ORD, ONB, CS, MKT, BILL, CAL, AI-CALL, VD, SYS.
- Pipelines: `AREA-## | Name`.
- Tags: `category:value`, lowercase, workflow-managed, never renamed without repointing every workflow the same day.
- Product codes: PLAT, GBPM, GBPS, LSAM, LSAS, LSB, REV, GADS, MADS, WEB, SOCG, SOCM, CRM, AIV, AIA, GEO.
- Cards: `✅ [SET] CODE ROLE | Client | Order ID` (project), `🔁 [ACR] CODE ROLE | Client | Order ID` (review), `🛑 [CXL]` / `🛑 [END]` (offboarding).
- Subtasks: `Label | Client | CID` (e.g. `Ad Creatives | Acme | 84884`).

## Status design

Projects and Internal Ops share: To Do, Scheduled, In Progress, Blocked/Delayed, Active Monitoring, Renewed Services, Cancelled, Completed.

| Status | API key |
|---|---|
| To Do | `to_do` |
| Scheduled | `doing` |
| In Progress | `in_progress` |
| Blocked/Delayed | `blocked` |
| Active Monitoring | `active_monitoring` (labeled "Needs Attention" on the Projects list as of Nov 23, 2026; check) |
| Renewed Services | `in_review` |
| Cancelled | `cancelled` |
| Completed | `completed` |

- Build done = Completed on the project card. [CS.01] fires only on Projects cards titled `CODE Tech |`, `REV Build |` or `SOCM Content |`.
- Renewals: whoever confirms the renewal order marks the previous term's ACR cards **Completed** with the comment "Renewed into [Order ID]". Anyone who finds one still open closes it the same way.
- Term ended / not renewed: [CS.02] runs only when the OPS-01 opportunity moves to Term Ended, not when a card is completed.

## Roles by product (MADS)

- Luis (CSR): onboarding, client's business portfolio linked, assets collected.
- Hannah: ad creatives, as the **Ad Creatives** subtask under Gabriel's ✅ [SET] MADS Tech card (new and renewal).
- Gabriel (Tech): builds and runs the ads.

## Operating rules

1. Confirm every write with Jared first. Idempotency key on every API write.
2. Renaming keeps IDs. Tags are the exception.
3. Never delete first: create → migrate → repoint → archive (Draft) → delete after a quiet week.
4. Before any bulk write, list what it can trigger ([ORD.01], [CS.01], [CS.CODE], [CS.03]) and draft or filter it.
5. Workflow API edits: set Draft → read definition (fresh version) → update → publish. Always merge into the current definition; someone may have changed it since your last read.
6. Never commit API tokens. Custom Code steps take the token through the step's input data, not the code.

## Reference IDs

| Thing | ID |
|---|---|
| Projects list | `6acfea8aaecbdc823cb57b71` |
| General Tasks / ACR list | `6aa121b936c0c8cf7861a342` |
| Offboarding list | `6ae913739c95460197214aa5` |
| Internal Ops workplace | `6aa121b836c0c8cf7861a2f0` |
| Projects workplace | `6acfea89aecbdc823cb57b13` |
| OPS-01 pipeline | `gp9Uy19KczJiQCkZyr7R` |
| Jared | `DQPlifx0eU5JDGYyHzsM` |
| Luis | `wdAqBlSvd9adlaufNGzv` |
| Gabriel | `3HLtVQuhN0E0rpXt5h1F` |
| Hannah | `e3L8ilv2a0kFgvaUkETZ` |

| Workflow | ID |
|---|---|
| [ORD.01] Order Intake - Create Projects & ACR | `f1509ef0-96aa-4a70-8fec-7acfc8e9045d` |
| [CS.01] Account Reviews - Project Complete | `a3e394a4-ddc1-4914-bea5-5dff47199d97` |
| [CS.02] Term Ended - Shut Off Selected Services | `41560c88-6dc0-4b26-9eb7-c6cce1a7bb9c` |
| [CS.MADS] Account Reviews - Meta Ads | `2904f347-654a-4c33-b07b-2053ea9cb30d` |
| [ONB.MADS.01] Onboarding - Meta Ads | `f25bc17a-0d9a-41f2-bcde-b4a55de35a5a` |
| [ONB.MADS.02] Form Completed | `958ae9d2-0225-4c68-b162-a088e532e8be` |
| [ONB.GADS.01] Onboarding - Google Ads | `e3f9a8c5-8466-428e-8c7a-dcd2440568c9` |
| [SYS.17] Subtask Builder | `c1f76f52-6fc8-433a-93dd-e30adaf1c81e` |
