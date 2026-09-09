import re

with open('public/index.html', 'r') as f:
    html = f.read()

# Find style block
style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
if style_match:
    custom_css = style_match.group(1)
    
    # Save to src/input.css
    with open('src/input.css', 'w') as f:
        f.write("@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n")
        f.write("@layer base {\n")
        # Keep imports at top if any
        css_lines = custom_css.split('\n')
        imports = []
        rest = []
        for line in css_lines:
            if line.strip().startswith('@import'):
                imports.append(line)
            else:
                rest.append(line)
        f.write('\n'.join(rest))
        f.write("\n}\n")
        
    # Create the imports string to prepend
    imports_str = '\n'.join(imports) + '\n'
    if imports:
        with open('src/input.css', 'r') as f:
            content = f.read()
        with open('src/input.css', 'w') as f:
            f.write(imports_str + content)
else:
    print("No style block found.")

# Remove Tailwind CDN script, Tailwind Config script, and the style block
html = re.sub(r'<script src="https://cdn\.tailwindcss\.com"></script>', '', html)
html = re.sub(r'<script>\s*tailwind\.config\s*=\s*{.*?}\s*</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="/styles.css">', html, flags=re.DOTALL)

with open('public/index.html', 'w') as f:
    f.write(html)

print("CSS and config extracted successfully.")
