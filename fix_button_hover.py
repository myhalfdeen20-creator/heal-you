import re

with open('public/index.html', 'r') as f:
    content = f.read()

replacements = [
    ("#324A3A", "#4A4865"),
    ("rgba(92, 124, 106,", "rgba(107, 104, 141,"),
    ("rgba(44, 62, 53,", "rgba(50, 48, 68,"),
    ("rgba(92,124,106,", "rgba(107,104,141,"),
    ("rgba(44,62,53,", "rgba(50,48,68,"),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Hover colors and shadows updated.")
