import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Update exportRef (Social Media Poster)
# Change the old "HealYou" text/leaf icon in header/footer to use the actual logo and improve colors.

old_export_header = """                            {/* Header */}
                            <div className="mb-6 flex justify-between items-center z-10">
                                <p className="text-[#6B688D] font-bold tracking-[0.2em] uppercase text-[10px]">Catatan Perjalanan HealYou</p>
                            </div>"""

new_export_header = """                            {/* Header */}
                            <div className="mb-8 flex justify-center items-center z-10">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 overflow-hidden p-0.5" aria-hidden="true">
                                    <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-xl" />
                                </div>
                            </div>"""
content = content.replace(old_export_header, new_export_header)

old_export_footer = """                            {/* Footer */}
                            <div className="mt-6 pt-6 border-t border-slate-200/50 flex justify-between items-center z-10">
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-700">Asesmen Ummul Mukminin</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">healyou-asesmen-ummul-mukminin.netlify.app</p>
                                </div>
                                <div className="w-10 h-10 bg-[#6B688D] rounded-full flex items-center justify-center text-white shadow-sm">
                                    <LeafIcon />
                                </div>
                            </div>"""

new_export_footer = """                            {/* Footer */}
                            <div className="mt-6 pt-6 border-t border-slate-200/50 flex justify-between items-center z-10">
                                <div className="text-left">
                                    <p className="text-xs font-bold text-[#6B688D]">Asesmen Ummul Mukminin</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">healyou-asesmen-ummul-mukminin.netlify.app</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-[#6B688D] tracking-widest uppercase">Heal You</p>
                                </div>
                            </div>"""
content = content.replace(old_export_footer, new_export_footer)

# 2. Update pdfRef (A4 Report)
old_pdf_header = """                            {/* Header */}
                            <div className="px-16 pt-16 pb-8 flex justify-between items-start border-b border-slate-100">
                                <div>
                                    <h1 className="text-3xl font-serif text-slate-800 tracking-tight">Rapor Psikologi</h1>
                                    <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-2">HealYou Asesmen Ummul Mukminin</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500 font-medium">Tanggal: {new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Subjek: <span className="text-slate-800 font-bold">{userName || 'Anonim'}</span></p>
                                </div>
                            </div>"""

new_pdf_header = """                            {/* Header */}
                            <div className="px-16 pt-16 pb-8 flex justify-between items-end border-b border-slate-100 relative">
                                <div className="absolute top-16 right-16 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-1 flex items-center justify-center">
                                    <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[0.8rem]" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-serif text-[#6B688D] tracking-tight">Rapor Psikologi</h1>
                                    <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-2">HealYou Asesmen Ummul Mukminin</p>
                                </div>
                                <div className="text-right pr-20">
                                    <p className="text-sm text-slate-500 font-medium">Tanggal: {new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Subjek: <span className="text-slate-800 font-bold">{userName || 'Anonim'}</span></p>
                                </div>
                            </div>"""
content = content.replace(old_pdf_header, new_pdf_header)

old_pdf_footer = """                            <div className="px-16 py-8 border-t border-slate-100 flex justify-between items-center bg-slate-50 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#45624E] rounded-full flex items-center justify-center text-white">
                                        <LeafIcon />
                                    </div>
                                    <p className="text-xs font-bold text-slate-700 tracking-widest uppercase">HealYou App</p>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Dokumen ini dihasilkan secara otomatis dari hasil asesmen mandiri.</p>
                            </div>"""

new_pdf_footer = """                            <div className="px-16 py-8 border-t border-slate-100 flex justify-between items-center bg-slate-50 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#6B688D] rounded-full flex items-center justify-center overflow-hidden p-0.5">
                                        <img src="/logo-healyou.webp" alt="Heal You" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <p className="text-xs font-bold text-[#6B688D] tracking-widest uppercase">Heal You App</p>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Dokumen ini dihasilkan secara otomatis dari hasil asesmen mandiri.</p>
                            </div>"""
content = content.replace(old_pdf_footer, new_pdf_footer)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Export layouts updated.")
