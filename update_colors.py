import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Update Tailwind config
tailwind_old = """                extend: {
                    fontFamily: {"""
tailwind_new = """                extend: {
                    colors: {
                        white: '#FCFAF6',
                        black: '#1F2220',
                    },
                    fontFamily: {"""
content = content.replace(tailwind_old, tailwind_new)

# 2. Update primary and background hexes
content = content.replace('#5C7C6A', '#45624E') # Muted deep sage
content = content.replace('#466352', '#324A3A') # btn-primary hover
content = content.replace('#F7F5F0', '#F2EFE9') # Warmer paper bg

# 3. Update hardcoded whites in CSS
content = content.replace('rgba(255, 255, 255,', 'rgba(252, 250, 246,')
content = content.replace('rgba(255,255,255,', 'rgba(252, 250, 246,')
content = content.replace('background: #ffffff;', 'background: #F2EFE9;')

# 4. Make text colors more charcoal instead of raw tailwind slate
# Tailwind's slate is already not pure black, but we can darken text-slate-800 or text-slate-700
# Actually, tailwind slate is #334155 (700) and #1e293b (800) which are blue-gray.
# Let's change text-slate-700 and 800 to custom classes or just redefine them in tailwind colors.
# Even better, let's redefine slate in tailwind config to be warmer charcoal (stone-like).

tailwind_colors_old = """                    colors: {
                        white: '#FCFAF6',
                        black: '#1F2220',
                    },"""
tailwind_colors_new = """                    colors: {
                        white: '#FCFAF6',
                        black: '#1F2220',
                        slate: {
                            50: '#faf9f8',
                            100: '#f4f2ef',
                            200: '#e8e5e1',
                            300: '#d7d2cc',
                            400: '#a39c96',
                            500: '#7d7671',
                            600: '#635d58',
                            700: '#4a4642',
                            800: '#302d2a',
                            900: '#1f1d1b',
                        }
                    },"""
content = content.replace(tailwind_colors_old, tailwind_colors_new)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Colors updated successfully.")
