import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_welcome = """                            <div className="inline-flex items-center justify-center p-3.5 whitespace-nowrap bg-white/80 backdrop-blur-md rounded-[2rem] text-[#45624E] mb-6 shadow-sm border border-white/50" aria-hidden="true">
                                <SparklesIcon />
                            </div>"""

new_welcome = """                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/80 backdrop-blur-md rounded-[2.5rem] mb-6 shadow-sm border border-white/50 overflow-hidden p-1" aria-hidden="true">
                                <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[2rem]" />
                            </div>"""
content = content.replace(old_welcome, new_welcome)

old_analyzing = """                        <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-slate-200 rounded-full opacity-50"></div>
                            <div className="absolute inset-0 border-4 border-[#45624E] rounded-full border-t-transparent animate-spin opacity-80"></div>
                            <div className="absolute inset-2 bg-emerald-50 rounded-full animate-pulse flex items-center justify-center text-[#45624E] shadow-inner">
                                <SparklesIcon />
                            </div>
                        </div>"""

new_analyzing = """                        <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-slate-200 rounded-full opacity-50"></div>
                            <div className="absolute inset-0 border-4 border-[#45624E] rounded-full border-t-transparent animate-spin opacity-80"></div>
                            <div className="absolute inset-2 bg-emerald-50 rounded-full animate-pulse flex items-center justify-center overflow-hidden shadow-inner p-1">
                                <img src="/logo-healyou.webp" alt="Heal You" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>"""
content = content.replace(old_analyzing, new_analyzing)

old_break = """                    <div className="inline-flex items-center justify-center p-4 bg-white/80 rounded-[2rem] text-[#45624E] mb-6 shadow-sm border border-white" aria-hidden="true">
                        <LeafIcon />
                    </div>"""

new_break = """                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-[1.5rem] mb-6 shadow-sm border border-white/50 overflow-hidden p-1" aria-hidden="true">
                        <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[1.2rem]" />
                    </div>"""
content = content.replace(old_break, new_break)


with open('public/index.html', 'w') as f:
    f.write(content)

print("Logo applied to components.")
