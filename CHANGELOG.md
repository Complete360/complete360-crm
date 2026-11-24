# Changelog

Newest first. One entry per change made in GHL. Note the workflow, what changed, and anything still open.

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
- Other [CS.CODE] renewal ACR cards (GBPM, etc.) still say "you don't need to touch them". Update to the close-out rule.
- Projects list shows `active_monitoring` as "Needs Attention". Status design says Active Monitoring.
- Google Ads (GADS) review is next.
