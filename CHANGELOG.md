# Changelog

Newest first. One entry per change made in GHL. Note the workflow, what changed, and anything still open.

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
