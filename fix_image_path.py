import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Since I don't have direct filesystem access to user uploads through the chat context in this exact environment, 
# I will set the img src to point to a local file name and ask the user to upload it via the file explorer,
# OR assume it was uploaded to /app/applet/public and use that path. Let's use ./logo-healyou.webp
# Currently I set it to /logo-healyou.webp. Let's make it more robust.

old_analyzing = """                        <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-slate-200 rounded-full opacity-50"></div>
                            <div className="absolute inset-0 border-4 border-[#45624E] rounded-full border-t-transparent animate-spin opacity-80"></div>
                            <div className="absolute inset-2 bg-emerald-50 rounded-full animate-pulse flex items-center justify-center overflow-hidden shadow-inner p-2">
                                <img src="/logo-healyou.webp" alt="Heal You" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>"""

new_analyzing = """                        <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-slate-200 rounded-full opacity-50"></div>
                            <div className="absolute inset-0 border-4 border-[#45624E] rounded-full border-t-transparent animate-spin opacity-80"></div>
                            <div className="absolute inset-2 bg-emerald-50 rounded-full animate-pulse flex items-center justify-center overflow-hidden shadow-inner">
                                <img src="/1000974633_2a094a59602a758c034e51afdc2dd49b-7_8_2026,%2011.48.41.webp" alt="Heal You" className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.onerror = null; e.target.src = '/logo-healyou.webp'; }} />
                            </div>
                        </div>"""
content = content.replace(old_analyzing, new_analyzing)

old_welcome = """                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-md rounded-[2rem] mb-6 shadow-sm border border-white/50 overflow-hidden" aria-hidden="true">
                                <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover" />
                            </div>"""

new_welcome = """                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-md rounded-[2.5rem] mb-6 shadow-sm border border-white/50 overflow-hidden p-1" aria-hidden="true">
                                <img src="/1000974633_2a094a59602a758c034e51afdc2dd49b-7_8_2026,%2011.48.41.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[2rem]" onError={(e) => { e.target.onerror = null; e.target.src = '/logo-healyou.webp'; }} />
                            </div>"""
content = content.replace(old_welcome, new_welcome)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Paths updated.")
