import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Since the user hasn't successfully uploaded the image to the applet's public folder,
# and it's rendering as a broken image box (white square), I will temporarily replace the
# exact string path back to just 'logo-healyou.webp'.
# I'll ask the user to rename the file before uploading.

old_str = "1000974633_2a094a59602a758c034e51afdc2dd49b-7_8_2026,%2011.48.41.webp"
new_str = "logo-healyou.webp"

content = content.replace(old_str, new_str)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Reverted to a simpler image path.")
