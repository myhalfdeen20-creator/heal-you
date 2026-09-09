import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_heading = '<h2 id="break-title" className="text-2xl font-serif text-slate-700 mb-4">Jeda Sejenak (Bagian {chunkIndex})</h2>'
new_heading = '<h2 id="break-title" className="text-2xl font-serif text-slate-700 mb-4">Jeda Sejenak<br/>(Bagian {chunkIndex})</h2>'

if old_heading in content:
    content = content.replace(old_heading, new_heading)
    with open('public/index.html', 'w') as f:
        f.write(content)
    print("Heading updated successfully.")
else:
    print("Could not find the target heading.")
