import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Fix PDF layout
old_pdf_block = """                    {/* Hidden PDF Rapor Layout (A4 Size: ~794px x 1123px) */}
                    <div style={{ position: 'absolute', top: '-25000px', left: '-25000px' }}>
                        <div ref={pdfRef} className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden flex flex-col font-sans text-slate-800" style={{ backgroundColor: '#FDFDFE' }}>
                            {/* Decorative Top Border */}
                            <div className="h-4 w-full" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Header */}
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
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 px-16 py-12 flex flex-col gap-10">
                                {/* Core Identity */}
                                <div className="flex items-center gap-10">
                                    <div className="shrink-0 relative">
                                        <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{backgroundColor: primary.hex}}></div>
                                        <CharacterAvatar id={primary.id} colorHex={primary.hex} size="medium" />
                                    </div>"""

new_pdf_block = """                    {/* Hidden PDF Rapor Layout (A4 Size: ~794px x 1123px) */}
                    <div style={{ position: 'absolute', top: '-25000px', left: '-25000px' }}>
                        <div ref={pdfRef} className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden flex flex-col font-sans text-slate-800" style={{ backgroundColor: '#FDFDFE' }}>
                            {/* Decorative Top Border */}
                            <div className="h-4 w-full" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Header */}
                            <div className="px-16 pt-16 pb-8 flex justify-between items-end border-b border-slate-100 relative z-10">
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
                            </div>

                            {/* Clean Background Decorations for PDF */}
                            <div className="absolute top-1/4 right-[-100px] w-96 h-96 rounded-full opacity-5 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Main Content */}
                            <div className="flex-1 px-16 py-12 flex flex-col gap-10 z-10">
                                {/* Core Identity */}
                                <div className="flex items-center gap-10">
                                    <div className="shrink-0 relative">
                                        <div className="absolute inset-0 rounded-full opacity-10" style={{backgroundColor: primary.hex, transform: 'scale(1.15)'}}></div>
                                        <CharacterAvatar id={primary.id} colorHex={primary.hex} size="medium" />
                                    </div>"""
content = content.replace(old_pdf_block, new_pdf_block)

with open('public/index.html', 'w') as f:
    f.write(content)

print("PDF typography and cleanup completed.")
