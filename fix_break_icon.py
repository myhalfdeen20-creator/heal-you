import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_break = """                    <div className="inline-flex items-center justify-center p-4 bg-white/80 rounded-[2rem] text-[#45624E] mb-6 shadow-sm border border-white" aria-hidden="true">
                        <LeafIcon />
                    </div>"""

new_break = """                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-[1.5rem] mb-6 shadow-sm border border-white/50 overflow-hidden p-1" aria-hidden="true">
                        <img src="/1000974633_2a094a59602a758c034e51afdc2dd49b-7_8_2026,%2011.48.41.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[1.2rem]" onError={(e) => { e.target.onerror = null; e.target.src = '/logo-healyou.webp'; }} />
                    </div>"""

content = content.replace(old_break, new_break)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Break icon updated.")
