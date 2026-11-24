#!/usr/bin/env python3
"""Spacing-rule check (see README). Fails on:
  - empty paragraphs (<p></p>, <p><br></p>, <p>&nbsp;</p>)  -> render as 3-4 blank lines
  - paragraphs that START with <br>                         -> render as 2 blank lines
One blank line = one <br> at the END of the paragraph before the gap.
Run from the repo root: python3 scripts/check_cards.py"""
import pathlib, re, sys
EMPTY = re.compile(r'<p(\s[^>]*)?>\s*(<br\s*/?>|&nbsp;)?\s*</p>', re.I)
LEADING = re.compile(r'<p(\s[^>]*)?>\s*<br\s*/?>', re.I)
bad = []
for f in sorted(pathlib.Path('cards').rglob('*.html')):
    t = f.read_text(encoding='utf-8')
    e, l = len(EMPTY.findall(t)), len(LEADING.findall(t))
    if e or l:
        bad.append(f'FAIL {f}: {e} empty paragraph(s), {l} paragraph(s) starting with <br>')
print('\n'.join(bad) if bad else 'OK: spacing rule passes on every card')
sys.exit(1 if bad else 0)
