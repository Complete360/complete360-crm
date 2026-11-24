#!/usr/bin/env python3
"""Spacing-rule check (see README). Fails on:
  - empty paragraphs (<p></p>, <p><br></p>, <p>&nbsp;</p>)  -> render as 3-4 blank lines
  - paragraphs that START with <br>                         -> render as 2 blank lines
  - banners that END with <br>                              -> box grows a line; no gap after banners
One blank line = one <br> at the END of the paragraph before the gap.
Run from the repo root: python3 scripts/check_cards.py"""
import pathlib, re, sys
EMPTY = re.compile(r'<p(\s[^>]*)?>\s*(<br\s*/?>|&nbsp;)?\s*</p>', re.I)
BANNER_BR = re.compile(r'<p style="background-color:#[0-9A-Fa-f]{6}">(?:(?!</p>).)*?<br\s*/?>\s*</p>', re.I|re.S)
LEADING = re.compile(r'<p(\s[^>]*)?>\s*<br\s*/?>', re.I)
bad = []
for f in sorted(pathlib.Path('cards').rglob('*.html')):
    t = f.read_text(encoding='utf-8')
    e, l, b = len(EMPTY.findall(t)), len(LEADING.findall(t)), len(BANNER_BR.findall(t))
    if e or l or b:
        bad.append(f'FAIL {f}: {e} empty paragraph(s), {l} starting with <br>, {b} banner(s) ending with <br>')
print('\n'.join(bad) if bad else 'OK: spacing rule passes on every card')
sys.exit(1 if bad else 0)
