import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Remove the center logo from the top header
old_export_header = """                            {/* Header */}
                            <div className="mb-8 flex justify-center items-center z-10">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 overflow-hidden p-0.5" aria-hidden="true">
                                    <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-xl" />
                                </div>
                            </div>"""

new_export_header = """                            {/* Header */}
                            <div className="mb-4 flex justify-center items-center z-10">
                                <p className="text-[10px] font-bold text-[#6B688D] tracking-widest uppercase">Catatan Perjalanan Psikologis</p>
                            </div>"""

content = content.replace(old_export_header, new_export_header)

# 2. Place the logo in the bottom right corner of the footer
old_export_footer = """                            {/* Footer */}
                            <div className="mt-6 pt-6 border-t border-slate-200/50 flex justify-between items-center z-10">
                                <div className="text-left">
                                    <p className="text-xs font-bold text-[#6B688D]">Asesmen Ummul Mukminin</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">healyou-asesmen-ummul-mukminin.netlify.app</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-[#6B688D] tracking-widest uppercase">Heal You</p>
                                </div>
                            </div>"""

new_export_footer = """                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-slate-200/50 flex justify-between items-center z-10">
                                <div className="text-left flex-1">
                                    <p className="text-xs font-bold text-[#6B688D] mb-1">Asesmen Ummul Mukminin</p>
                                    <p className="text-[9px] text-slate-500">healyou-asesmen-ummul-mukminin.netlify.app</p>
                                </div>
                                <div className="flex flex-col items-end shrink-0 gap-1.5">
                                    <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 overflow-hidden p-0.5">
                                        <img src="/logo-healyou.webp" alt="Heal You" className="w-full h-full object-cover rounded-[0.6rem]" />
                                    </div>
                                    <p className="text-[8px] font-bold text-[#6B688D] tracking-[0.2em] uppercase">Heal You</p>
                                </div>
                            </div>"""

content = content.replace(old_export_footer, new_export_footer)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Social media poster layout updated.")
