import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Replace the warm slate with standard tailwind slate, or just delete the custom slate config.
old_slate_config = """                        slate: {
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
                        }"""

# New cool slate (standard slate)
new_slate_config = """                        slate: {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                        }"""

content = content.replace(old_slate_config, new_slate_config)

# Also update the white color to a cool off-white
content = content.replace("white: '#FCFAF6',", "white: '#FDFDFE',")
# And replace #FCFAF6 globally just in case
content = content.replace("#FCFAF6", "#FDFDFE")
content = content.replace("252, 250, 246", "253, 253, 254")

with open('public/index.html', 'w') as f:
    f.write(content)

print("Tailwind slate config updated.")
