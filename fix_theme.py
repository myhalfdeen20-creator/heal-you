import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Current theme variables
# Primary color: #45624E (Deep Green) -> Change to Soft Deep Lavender/Indigo: #6B688D
# Background color: #F2EFE9 (Warm Beige) -> Change to Soft Cool Violet/White: #F6F7FB
# Emerald-100/50 -> Indigo-100/50
# Orange-100 -> Fuchsia-100

replacements = [
    ("#F2EFE9", "#F6F7FA"),    # Base background
    ("#45624E", "#6B688D"),    # Primary accent color (Buttons, active states, text accents)
    ("emerald-100", "indigo-100"), # Background blurs
    ("emerald-200", "indigo-200"), # Parallax background
    ("emerald-50", "indigo-50"),   # Progress/Loading inner circles
    ("emerald-900", "indigo-900"), # Selection text
    ("emerald-500", "indigo-500"), # Bullet points in welcome screen
    ("orange-100", "fuchsia-100"), # Second blur color in welcome
    ("rgba(92, 124, 106, 0.1)", "rgba(107, 104, 141, 0.15)"), # Box shadow for btn-secondary
]

for old, new in replacements:
    content = content.replace(old, new)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Theme updated successfully.")
