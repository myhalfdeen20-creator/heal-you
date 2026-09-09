import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Add text-justify to the paragraphs in history
content = content.replace('className={`mb-6 text-slate-600 ${idx === 0 ?', 'className={`mb-6 text-slate-600 text-justify leading-relaxed ${idx === 0 ?')

# Fix the pill buttons overflowing by removing whitespace-nowrap and making them wrap nicely
content = content.replace('bg-white/60 border shadow-sm whitespace-nowrap transition-all', 'bg-white/60 border shadow-sm transition-all inline')

with open('public/index.html', 'w') as f:
    f.write(content)

print("Alignment and wrapping fixed.")
