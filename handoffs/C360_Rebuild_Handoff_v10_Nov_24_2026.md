# C360 Rebuild Handoff v10 (Nov 24, 2026)

Supersedes v9 for everything below. Read this first, then the repo README.

**Repo (source of truth for cards and code):** `github.com/Complete360/complete360-crm` (public).
**GHL sub-account:** Complete360 only, location `1pBjHBEIsKGbwvAUTY9u`. Never touch other sub-accounts or B2 / Voicedrop Snapshot. Builder links use `app.complete360.org`.

---

## 1. How the two chats work together

- **Working chat (the new one):** has a classic GitHub token. Makes changes on a branch and opens a **pull request** against `main`. Never pushes straight to `main`. Never writes the token into any file, commit, or PR text.
- **Review chat (this project chat):** Jared reviews and approves PRs here. Claude can read the public repo (`git clone https://github.com/Complete360/complete360-crm.git`) to check a PR before Jared merges.
- Every PR: run `python3 scripts/check_cards.py` first (must print `OK`), add a `CHANGELOG.md` entry, update the Status column in `cards/README.md`.
- Keep client names and order IDs out of the repo (it's public). Say "5 open MADS orders", not the client names.

## 2. THE SPACING RULE (final, tested on a live card Nov 24)

This is the bug that kept coming back. Jared wants exactly **one blank line** between sections, never double.

| HTML | Renders as |
|---|---|
| `...text<br></p><p><strong>Next</strong>` (one `<br>` at the **end** of the paragraph before the gap) | one blank line ✅ |
| `...text<br><br><strong>Next</strong>` (two plain sections merged into one paragraph) | one blank line ✅ |
| `<p><br><strong>Next</strong>` (`<br>` at the **start** of a paragraph) | two blank lines ❌ |
| Any extra paragraph: `<p></p>`, `<p><br></p>`, `<p>&nbsp;</p>` | three to four blank lines ❌ |
| `<br>` at the end of a **banner** | banner grows one colored line ❌ |

- **Banners get no `<br>` and no gap after them.** The next section starts right under the colored bar (Jared's choice, "option 1").
- GHL strips `margin`/`padding` styles on save. Only `background-color` survives, and only in **workflow templates**.
- **Updating an existing card through the task API strips ALL styles, banner colors included.** Only workflow templates keep colors.
- Untested idea, only if Jared asks for white space under banners again: color a `<span>` inside the paragraph instead of the `<p>`, then `<br>` after the span.
- Standard gaps on a card: after the title, after the Product block, before WHEN DONE (when no banner precedes it), before the "Created by" footer. None after banners; none between numbered checklist sections.

## 3. How to apply changes

| Target | Method |
|---|---|
| **[ORD.01] card templates** | Jared pastes the full HTML from `cards/ord01/` into the action's description, source view `<>`, select all, paste, save, publish. ORD.01 is too big to rewrite via API safely. Workflow AI is being tested for LSAM CSR cards (it may drop banner colors and custom-value chips; check before trusting it). |
| **[CS.CODE] review card templates** | Claude via workflow API: set Draft → read definition (fresh `version`) → update full definition → publish. Always merge into the current definition (someone else edited SYS.17 mid-session). Idempotency key on every write. |
| **Open cards already on the board** | Task API update. Fixes text/spacing but strips banner colors. Decide per product. |

Verifying ORD.01 templates without reading ORD.01: search the newest live SET cards for the product (`search-projects-tasks`, list `6acfea8aaecbdc823cb57b71`, query `[SET] CODE`, sort createdAt desc). Their bodies are copies of the ORD.01 template with values filled in.

## 4. Product-by-product routine (Jared's plan)

For each product, in order:
1. **ORD.01 project cards:** verify against newest live cards, apply spacing rule, Jared pastes one card at a time.
2. **Review cards ([CS.CODE]):** spacing rule + renewal close-out rule, pushed via API (Jared OKs first).
3. **Open cards on the board:** decide whether to fix (loses banner colors).
4. **Repo:** update card files, Status column, changelog, run the checker. Via PR.

## 5. Status by product

| Product | ORD.01 cards | Review cards | Notes |
|---|---|---|---|
| **LSAM** | Card 1 Tech (Onboarding) pasted ✅. Card 2 Tech (Renewal) sent, confirm pasted. Cards 3–4 CSR (Onboarding, Renewal): Workflow AI test in progress, check banner colors and custom-value chips | [CS.LSAM] not checked yet | Live text matched repo word for word on all 4 (checked Nov 24). Onboarding cards had spacers; renewal cards had no gaps. |
| **LSAS** ← **NEXT** | 2 cards (`lsas-tech.html`, `lsas-csr.html`), not checked against live | none (setup only, no ACR) | Start here. |
| **MADS** | 4 cards were pasted Nov 23 with the OLD spacing. **Re-paste all 4** from the repo (current files follow the final rule). | [CS.MADS] pushed Nov 23 with old spacers + margin styles. **Re-push** with final rule. | Hannah's Ad Creatives subtask is live (see §6). Presley Roth MADS Tech card was used as the spacing test card: banners stripped and test spacing left in; clean it up (final rule) or leave. |
| **GADS** | New-order cards verified Nov 23 (no gaps at all live). Paste with final rule. Renewal cards: no live example. | [CS.GADS] pushed Nov 23 with old spacers. **Re-push** with final rule. | |
| **GBPM** | Apply `pending/gbpm-onboarding-no-appointment.md` (approved Nov 24) + spacing rule | needs spacing + close-out rule | Do NOT touch GBPM renewal cards or the PLAT CSR appointment. |
| LSB, PLAT, SOCG, SOCM, REV | not checked | not checked; likely old spacers + missing close-out rule | |
| GBPS, WEB (9 tiers) | not checked | none | |

## 6. Decisions made Nov 23–24

- **MADS creatives:** Hannah gets one **Ad Creatives** subtask under Gabriel's ✅ [SET] MADS Tech card, created by [SYS.17] v1.5 (called from [CS.MADS] hook on Opportunity Found), status Scheduled (`doing`), due 3 days out, on **new and renewal** orders. [ONB.MADS.02] no longer creates tasks; it emails Hannah "form is in, start the subtask" and now removes the contact from [ONB.MADS.01] (it used to wrongly remove from [ONB.GADS.01]). Jared wants no duplicate tasks for the same work.
- **Roles (MADS):** Gabriel runs the ads, Hannah makes creatives, Luis handles onboarding and links us to the client's business portfolio.
- **Renewal close-out:** whoever confirmed the renewal order marks the previous term's ACR cards **Completed** with "Renewed into [Order ID]". Anyone who finds one still open does the same. (Completing an ACR card does not trigger [CS.02]; that runs only on OPS-01 → Term Ended.) Review cards should say this instead of "you don't need to touch them".
- **GBPM onboarding:** no appointment; live GBP wins for NAP; Yext matches GBP unless the client says otherwise. Platinum keeps its appointment via the LSA path until it has its own form.

## 7. Open items (not product-by-product)

- Projects list status `active_monitoring` is labeled "Needs Attention"; status design says Active Monitoring.
- Migration variant cards (`*-migration.html`) still carry the old status list (Need Attention).
- Old repo `Jared34510/complete360-crm` still public with client names in history: delete or make private.
- Fine-grained token "Claude cleanup" (Complete360 org) has broad write permissions and was pasted in the review chat; trim to this repo + Contents only, or rotate.
- Confirm Hannah sees Ad Creatives subtasks in her own task view.
- Full ORD.01 export to `workflows/ord01.json` is a Claude Code job (too big for chat).

## 8. Key IDs

| Thing | ID |
|---|---|
| Projects list | `6acfea8aaecbdc823cb57b71` |
| General Tasks / ACR list | `6aa121b936c0c8cf7861a342` |
| Internal Ops workplace | `6aa121b836c0c8cf7861a2f0` |
| Status keys | To Do `to_do`, Scheduled `doing`, In Progress `in_progress`, Blocked `blocked`, Active Monitoring `active_monitoring`, Renewed Services `in_review`, Cancelled `cancelled`, Completed `completed` |
| Jared / Luis / Gabriel / Hannah | `DQPlifx0eU5JDGYyHzsM` / `wdAqBlSvd9adlaufNGzv` / `3HLtVQuhN0E0rpXt5h1F` / `e3L8ilv2a0kFgvaUkETZ` |
| [ORD.01] | `f1509ef0-96aa-4a70-8fec-7acfc8e9045d` |
| [CS.01] | `a3e394a4-ddc1-4914-bea5-5dff47199d97` (fires only on `CODE Tech \|`, `REV Build \|`, `SOCM Content \|`) |
| [CS.02] | `41560c88-6dc0-4b26-9eb7-c6cce1a7bb9c` |
| [CS.MADS] | `2904f347-654a-4c33-b07b-2053ea9cb30d` |
| [CS.GADS] | `ccb6cfef-b5a9-47ff-93f5-75c7344baa20` |
| [ONB.MADS.01] / [ONB.MADS.02] | `f25bc17a-0d9a-41f2-bcde-b4a55de35a5a` / `958ae9d2-0225-4c68-b162-a088e532e8be` |
| [ONB.GADS.01] | `e3f9a8c5-8466-428e-8c7a-dcd2440568c9` |
| [SYS.17] Subtask Builder (v1.5) | `c1f76f52-6fc8-433a-93dd-e30adaf1c81e` |

## 9. First message for the new chat

> Read `handoffs/C360_Rebuild_Handoff_v10_Nov_24_2026.md` and the README in `Complete360/complete360-crm`. We're starting **LSAS**: check the two LSAS project cards against the newest live LSAS cards, apply the spacing rule, then give me card 1 to paste into ORD.01. Repo changes go in a pull request.
