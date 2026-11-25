# Changelog

Newest first. One entry per change made in GHL. Note the workflow, what changed, and anything still open.

## 2026-11-24 (GBPM project and review cards)

- **[ORD.01] GBPM cards:** text matched the repo on all four; live had 5 to 6 empty spacer paragraphs each.
- Applied the approved no-appointment change (from `pending/gbpm-onboarding-no-appointment.md`, now removed): CSR Onboarding drops the appointment section and is renumbered (Agreement, Onboarding Form, Access & Details, Handoff to Gabriel, Reputation, Google Social); NAP rule is "the live GBP wins"; handoff note includes any NAP or listing changes. Tech Onboarding: claim/create from the onboarding form NAP, business name matches the GBP, Local SEO Booster listings match the GBP unless the client asked otherwise.
- All four applied in [ORD.01] by Workflow AI (version 176 → 177, published). Renewal cards got spacing only (text unchanged). Reviewed by API: only the four GBPM Create Task actions changed; no other action, trigger, edge or setting; banners intact, no empty paragraphs. Live HTML matches the repo.
- **[CS.GBPM]** (version 31): repo files were stale (Oct 28 status list, Renewed Services close-out); rebuilt all four from the live text with the final spacing rule, renewal cards now carry the close-out rule. Pushed by API (v32): only the four descriptions changed; all 15 steps (including the three [SYS.17] prospect-report hooks) and 14 edges intact. GBPM is done.

## 2026-11-24 (GBPS project cards)

- **[ORD.01] GBPS cards checked against live.** Text matched the repo word for word on both; live had 6 empty spacer paragraphs each.
- Both applied in [ORD.01] by Workflow AI (version 175 → 176, published). Reviewed by API: only the two GBPS Create Task actions changed; no other action, trigger, edge or setting; banners intact, no empty paragraphs, full text through the footer. Live HTML matches the repo. GBPS is setup only (no review cards), so GBPS is done.

## 2026-11-24 (MADS project cards)

- **[ORD.01] MADS cards checked against live.** Text matched the repo word for word on all four (close-out wording and the Ad Creatives subtask already in); live still had the Nov 23 spacing (6 to 7 empty paragraphs and margin styles each).
- All four applied in [ORD.01] by Workflow AI (version 174 → 175, published). Reviewed by API: only the four MADS Create Task actions changed; no other action, trigger, edge or setting; banners intact, no empty paragraphs or margin styles, full text through the footer. Live HTML matches the repo. MADS is done (project and review cards).

## 2026-11-24 (GADS project cards; CS.GADS and CS.LSAM review cards)

- **[ORD.01] GADS cards checked against live.** The live GADS Tech Renewal template was cut off after the first line of section 1 (no renewal cards had been created from it yet). The other three matched the repo but carried 6 empty spacer paragraphs each.
- `cards/ord01/gads-tech-renewal.html`: "Jared sets the previous term's GADS Tech review card to Renewed Services" replaced with the renewal close-out rule.
- All four GADS cards applied in [ORD.01] by Workflow AI (version 173 → 174, published). Reviewed by API: only the four GADS Create Task actions changed; no other action, trigger, edge or setting; banners intact, no empty paragraphs, full text through the footer. Live HTML matches the repo.
- **[CS.GADS]** (version 28): live text matched the repo word for word but still had empty spacer paragraphs and margin styles. Pushed the four repo cards by API (Draft → read v29 → update → publish, v30); only the four descriptions changed, all 13 steps and 11 edges intact, banners and custom-value chips kept.
- **[CS.LSAM]** (version 25): the repo files were stale (Oct 28: old status list, prospect report line removed from LSAM since, Renewed Services close-out). Rebuilt all four from the live text with the final spacing rule; renewal cards now carry the close-out rule instead of "you don't need to touch them". Migration variants unchanged.
- **[CS.LSAM]** pushed by API (Draft → read v26 → update → publish, v27): only the four descriptions changed; all 13 steps and 11 edges intact.
- **[CS.MADS]** (version 27): live text matched the repo word for word but had empty spacer paragraphs and margin styles. Pushed the four repo cards by API (v28): only the four descriptions changed; all 14 steps (including the [SYS.17] Ad Creatives hook) and 12 edges intact.

## 2026-11-24 (LSAS project cards)

- **[ORD.01] LSAS cards checked against live.** Text matched the repo word for word on both; live still had 6 empty spacer paragraphs each.
- `cards/ord01/lsas-tech.html`: added the missing gap before the "Created by" footer.
- Both cards applied in [ORD.01] by Workflow AI (version 171 → 173, published). Reviewed by API: only the two LSAS Create Task actions changed; no other action, trigger, edge or setting; banners intact, no empty paragraphs, no leading `<br>`. Live HTML matches the repo (custom values as plain tokens).
- LSAS has no review cards (setup only, no ACR).

## 2026-11-24 (close-out wording applied in [ORD.01])

- Workflow AI edited the GBPM, LSAM, LSB and PLAT CSR Renewal actions in [ORD.01] (version 170 → 171, published). Reviewed by API: only that one sentence changed in each; no other action, trigger, edge or setting changed; banner colors kept. Live text now matches the repo on all four.
- **Open:** GBPM, LSB and PLAT CSR Renewal still carry 5 empty spacer paragraphs live (pre-existing). Fix with the spacing rule when each product comes up.

## 2026-11-24 (renewal close-out wording, CSR renewal cards)

- `cards/ord01/` GBPM, LSAM, LSB and PLAT CSR Renewal cards: "leave them running until Gabriel finishes the audit" replaced with the renewal close-out rule (mark the previous term's review cards Completed with the comment "Renewed into [Order ID]").
- **Open:** not yet applied in [ORD.01]. Apply per product (paste or Workflow AI), then check the live text and update the Status column.

## 2026-11-24 (LSAM project cards)

- **[ORD.01] LSAM cards checked against live (version 170).** All four match the repo word for word with banners intact and clean spacing. Tech cards (Onboarding, Renewal) pasted by hand. CSR cards (Onboarding, Renewal) applied by Workflow AI: text and banners kept, but the six custom-value chips became plain `{{…}}` tokens. Jared confirmed the values still fill in on live cards.
- **Open:** LSAM CSR renewal still says to leave the previous term's review cards running (conflicts with the close-out rule; same line in GBPM, LSB, PLAT).

## 2026-11-24 (spacing rule, banners)

- Tested `<p><br></p>` and `<p>&nbsp;</p>`: both render as ~3 blank lines. Banners now get no `<br>` and no gap after them (Jared's call). All cards updated; checker fails on a banner ending with `<br>`.

## 2026-11-24 (spacing rule, tested)

- **Tested on the Presley Roth MADS Tech card.** A leading `<br>` renders as two blank lines; a trailing `<br>` (end of the paragraph before the gap) or `<br><br>` inside one paragraph renders as exactly one. README table updated; all card files converted to trailing `<br>`; checker now also fails on leading `<br>`.
- Updating an existing card via the task API strips all styles, banner colors included (Presley Roth MADS Tech lost its banners).

## 2026-11-24 (spacing rule)

- **Spacing rule rewritten.** Root cause of the oversized gaps: empty `<p></p>` spacer paragraphs, which GHL renders as 3 to 4 blank lines, while GHL strips the `margin:0px` styles on save. New rule in README: no empty paragraphs ever; one blank line = a leading `<br>` in the next paragraph.
- All 96 card files converted (empty paragraphs removed, margin styles removed, leading `<br>` added).
- Added `scripts/check_cards.py`: fails on any empty paragraph. Run before every commit or push.
- **Open:** test on one live card, then re-push [CS.MADS] and [CS.GADS] and re-paste the four ORD.01 MADS cards, which still contain spacers.

## 2026-11-23 (GADS)

- **GADS checked against live.** ORD.01 GADS Tech/CSR (onboarding) match the repo; no live GADS renewal card exists yet to compare. [CS.GADS] review cards had already moved past the Oct 28 doc (final status list, Blocked/Delayed instead of Need Attention).
- **[CS.GADS]**: all four review cards converted to house format; both renewal cards now carry the close-out rule. Pushed by API and republished. Source: `cards/cs-gads/`.
- GADS migration variants still carry the old status list (Need Attention); not in any workflow.

## 2026-11-23 (repo)

- Repo moved to the Complete360 organization (`Complete360/complete360-crm`) with a fresh history.
- **All cards seeded.** 43 ✅ [SET] cards from [ORD.01] and 41 🔁 [ACR] cards (including migration variants) from the eight other [CS.CODE] workflows, extracted from the Oct 27/28 card docs. Only the MADS cards are verified against live; every other file is marked "not yet checked" in `cards/README.md`.

## 2026-11-23

### Meta Ads (MADS): creatives moved to a subtask

**Why:** Hannah's "Ad Creatives Request" task from [ONB.MADS.02] used the old task action, which has no list setting, so it landed in General Tasks/ACR instead of Projects.

- **[SYS.17] Subtask Builder → v1.5** (`code/sys17-subtask-builder.js`). Added template `SET MADS Tech` → **Ad Creatives** subtask, assigned to Hannah, status Scheduled (`doing`), due 3 days out, on new **and** renewal cards. Templates can now set `status` and `assignee`. Merged into a v1.4 someone else had published the same day (Quarterly on renewals, closed-card skip, alert card to Jared).
- **[CS.MADS]**: added `Add to Workflow | SYS.17 | Ad Creatives (SET MADS Tech)` on the Opportunity Found branch, before the Wait.
- **[CS.MADS]**: both renewal ACR cards now say whoever confirmed the renewal order marks the previous term's ACR cards Completed ("Renewed into [Order ID]"); if one is still open, do it now. Replaced "you don't need to touch them".
- **[ONB.MADS.02] Form Completed**: deleted the old "Meta Ad Creatives Request" (Hannah) and "Step 1 | Meta Ad Signup" (Gabriel) task actions. Hannah's email now says the form is in and to start the Ad Creatives subtask. Note is green and names [ONB.MADS.02]. **Remove-from-workflow now targets [ONB.MADS.01]**; it used to remove contacts from [ONB.GADS.01] (AdCenter leftover).
- **Backfill:** Ad Creatives subtasks added under the 5 open MADS Tech cards that predated the hook (3 with forms already in → To Do; 1 new order and 1 renewal → Scheduled). The 3 open old "Ad Creatives Request" tasks in General Tasks set to Cancelled with a pointer comment. Completed historical ones left as is. Clients already live were skipped.
- **[CS.MADS]**: all four ACR card bodies converted to house format (margin style on every paragraph, `<br>`, data-cv-variable spans). Wording unchanged. Source: `cards/cs-mads/`.
- **[ORD.01] card bodies (pasted by Jared):** `cards/ord01/mads-*.html`. MADS Tech: Scheduled line and section 4 point at Hannah's subtask. MADS CSR: handoff goes to Gabriel & Hannah. Both renewal cards carry the close-out rule.

**Open**
- Other [CS.CODE] renewal ACR cards (GBPM, LSAM, LSB, PLAT, SOCG, SOCM, REV) likely still say "you don't need to touch them". Update to the close-out rule.
- Projects list shows `active_monitoring` as "Needs Attention". Status design says Active Monitoring.
- Google Ads (GADS) review is next.
