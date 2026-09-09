import re

with open('public/index.html', 'r') as f:
    content = f.read()

content = content.replace("bg-amber-100/30", "bg-purple-100/30")
content = content.replace("bg-teal-100/30", "bg-blue-100/30")

with open('public/index.html', 'w') as f:
    f.write(content)

print("Parallax colors updated.")
