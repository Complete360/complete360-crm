#!/usr/bin/env python3
"""Spacing-rule check: fail if any card file contains an empty paragraph.
GHL renders every empty <p> as a huge gap. Use <p><br>... for one blank line instead.
Run from the repo root: python3 scripts/check_cards.py"""
import pathlib, re, sys
EMPTY = re.compile(r'<p(\s[^>]*)?>\s*(<br\s*/?>|&nbsp;)?\s*</p>', re.I)
bad = []
for f in sorted(pathlib.Path('cards').rglob('*.html')):
    n = len(EMPTY.findall(f.read_text(encoding='utf-8')))
    if n:
        bad.append((str(f), n))
for f, n in bad:
    print(f'FAIL {f}: {n} empty paragraph(s)')
print(f'{len(bad)} file(s) break the spacing rule' if bad else 'OK: no empty paragraphs')
sys.exit(1 if bad else 0)
