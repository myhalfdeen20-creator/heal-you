import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_pdf_block = """                    {/* Hidden PDF Rapor Layout (A4 Size: ~794px x 1123px) - Optimized for Print */}
                    <div style={{ position: 'absolute', top: '-25000px', left: '-25000px' }}>
                        <div ref={pdfRef} className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden flex flex-col font-sans text-slate-900" style={{ backgroundColor: '#FDFDFE' }}>
                            {/* Decorative Top Border */}
                            <div className="h-3 w-full" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Header */}
                            <div className="px-20 pt-16 pb-6 flex justify-between items-end border-b-2 border-slate-100 relative z-10">
                                <div className="absolute top-16 right-20 w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                                    <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-[0.5rem]" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-serif text-[#6B688D] tracking-tight">Rapor Psikologi</h1>
                                    <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-2">HealYou Asesmen Ummul Mukminin</p>
                                </div>
                                <div className="text-right pr-20">
                                    <p className="text-xs text-slate-500 font-medium">Tanggal: <span className="text-slate-800">{new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span></p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Subjek: <span className="text-slate-800 font-bold">{userName || 'Anonim'}</span></p>
                                </div>
                            </div>

                            {/* Clean Background Decorations for PDF */}
                            <div className="absolute top-1/4 right-[-100px] w-96 h-96 rounded-full opacity-[0.03] pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Main Content */}
                            <div className="flex-1 px-20 py-10 flex flex-col gap-8 z-10">
                                {/* Core Identity */}
                                <div className="flex items-center gap-8">
                                    <div className="shrink-0 relative">
                                        <div className="absolute inset-0 rounded-full opacity-[0.08]" style={{backgroundColor: primary.hex, transform: 'scale(1.15)'}}></div>
                                        <CharacterAvatar id={primary.id} colorHex={primary.hex} size="medium" />
                                    </div>
                                    <div className="flex-1 border-l-2 border-slate-100 pl-8">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Resonansi Utama</p>
                                                <h2 className="text-3xl font-serif text-slate-900">{primary.name}</h2>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold" style={{color: primary.hex}}>{primary.matchPercentage || 0}%</p>
                                                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Kesesuaian</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold tracking-widest uppercase border mt-2 whitespace-nowrap" style={{color: primary.hex, borderColor: `${primary.hex}40`, backgroundColor: `${primary.hex}08`}}>
                                            {primary.epithet}
                                        </span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div>
                                    <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase mb-3 border-b-2 border-slate-100 pb-2">Profil Kepribadian</h3>
                                    <p className="text-[13px] text-slate-700 leading-relaxed font-medium text-justify">
                                        {primary.shortSummary}
                                    </p>
                                </div>

                                {/* Dynamics */}
                                <div>
                                    <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase mb-3 border-b-2 border-slate-100 pb-2">Dinamika Relasional & Keseharian</h3>
                                    <p className="text-[13px] text-slate-700 leading-relaxed font-medium text-justify">
                                        {primary.roleDynamics}
                                    </p>
                                </div>

                                {/* Wisdom */}
                                <div>
                                    <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase mb-3 border-b-2 border-slate-100 pb-2">Kekuatan Kognitif & Emosional</h3>
                                    <ul className="space-y-3.5">
                                        {primary.wisdom.map((w, idx) => {
                                            const [term, desc] = w.split(': ');
                                            return (
                                                <li key={idx} className="flex flex-col gap-1 text-[13px] text-slate-700 font-medium leading-relaxed">
                                                    <span 
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase self-start border" 
                                                        style={{color: primary.hex, backgroundColor: `${primary.hex}08`, borderColor: `${primary.hex}30`}}
                                                    >
                                                        {term}
                                                    </span>
                                                    <span className="text-justify">{desc}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                
                                {/* Secondary */}
                                {secondary && (
                                    <div className="mt-auto pt-6 border-t-2 border-slate-100">
                                        <h3 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-3">Sifat Pendamping & Kemampuan Beradaptasi</h3>
                                        <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                            <div className="shrink-0 scale-90 origin-left">
                                                <CharacterAvatar id={secondary.id} colorHex={secondary.hex} size="small" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-serif text-slate-900 mb-0.5">{secondary.name}</h4>
                                                <p className="text-xs text-slate-600 font-medium">Sistem pendukung: <span style={{color: secondary.hex}} className="font-bold">{secondary.epithet}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-20 py-6 border-t-2 border-slate-100 flex justify-between items-center bg-slate-50 mt-auto">"""

new_pdf_block = """                    {/* Hidden PDF Rapor Layout (A4 Size: ~794px x 1123px) - Optimized for Print */}
                    <div style={{ position: 'absolute', top: '-25000px', left: '-25000px' }}>
                        <div ref={pdfRef} className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden flex flex-col font-sans text-slate-900" style={{ backgroundColor: '#FDFDFE' }}>
                            {/* Decorative Top Border */}
                            <div className="h-3 w-full" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Header */}
                            <div className="px-14 pt-10 pb-5 flex justify-between items-end border-b border-slate-100 relative z-10">
                                <div className="absolute top-10 right-14 w-12 h-12 bg-white rounded-[0.8rem] shadow-sm border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                                    <img src="/logo-healyou.webp" alt="Heal You Logo" className="w-full h-full object-cover rounded-md" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-serif text-[#6B688D] tracking-tight">Rapor Psikologi</h1>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1.5">HealYou Asesmen Ummul Mukminin</p>
                                </div>
                                <div className="text-right pr-16">
                                    <p className="text-[11px] text-slate-500 font-medium">Tanggal: <span className="text-slate-800">{new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span></p>
                                    <p className="text-[11px] text-slate-500 font-medium mt-1">Subjek: <span className="text-slate-800 font-bold">{userName || 'Anonim'}</span></p>
                                </div>
                            </div>

                            {/* Clean Background Decorations for PDF */}
                            <div className="absolute top-1/4 right-[-100px] w-96 h-96 rounded-full opacity-[0.03] pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                            
                            {/* Main Content */}
                            <div className="flex-1 px-14 py-8 flex flex-col gap-6 z-10">
                                {/* Core Identity */}
                                <div className="flex items-center gap-6">
                                    <div className="shrink-0 relative scale-90 origin-left">
                                        <div className="absolute inset-0 rounded-full opacity-[0.08]" style={{backgroundColor: primary.hex, transform: 'scale(1.15)'}}></div>
                                        <CharacterAvatar id={primary.id} colorHex={primary.hex} size="medium" />
                                    </div>
                                    <div className="flex-1 border-l-2 border-slate-100 pl-6">
                                        <div className="flex justify-between items-start mb-1.5">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">Resonansi Utama</p>
                                                <h2 className="text-2xl font-serif text-slate-900">{primary.name}</h2>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold" style={{color: primary.hex}}>{primary.matchPercentage || 0}%</p>
                                                <p className="text-[8px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Kesesuaian</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase border mt-1 whitespace-nowrap" style={{color: primary.hex, borderColor: `${primary.hex}40`, backgroundColor: `${primary.hex}08`}}>
                                            {primary.epithet}
                                        </span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-800 tracking-widest uppercase mb-2 border-b border-slate-100 pb-1.5">Profil Kepribadian</h3>
                                    <p className="text-[11.5px] text-slate-700 leading-[1.6] font-medium text-justify">
                                        {primary.shortSummary}
                                    </p>
                                </div>

                                {/* Dynamics */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-800 tracking-widest uppercase mb-2 border-b border-slate-100 pb-1.5">Dinamika Relasional & Keseharian</h3>
                                    <p className="text-[11.5px] text-slate-700 leading-[1.6] font-medium text-justify">
                                        {primary.roleDynamics}
                                    </p>
                                </div>

                                {/* Wisdom */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-800 tracking-widest uppercase mb-2 border-b border-slate-100 pb-1.5">Kekuatan Kognitif & Emosional</h3>
                                    <ul className="space-y-2.5">
                                        {primary.wisdom.map((w, idx) => {
                                            const [term, desc] = w.split(': ');
                                            return (
                                                <li key={idx} className="flex flex-col gap-0.5 text-[11.5px] text-slate-700 font-medium leading-[1.6]">
                                                    <span 
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase self-start border" 
                                                        style={{color: primary.hex, backgroundColor: `${primary.hex}08`, borderColor: `${primary.hex}30`}}
                                                    >
                                                        {term}
                                                    </span>
                                                    <span className="text-justify">{desc}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                
                                {/* Secondary */}
                                {secondary && (
                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <h3 className="text-[9px] font-bold text-slate-500 tracking-widest uppercase mb-2">Sifat Pendamping & Kemampuan Beradaptasi</h3>
                                        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                                            <div className="shrink-0 scale-75 origin-left">
                                                <CharacterAvatar id={secondary.id} colorHex={secondary.hex} size="small" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-serif text-slate-900 mb-0.5">{secondary.name}</h4>
                                                <p className="text-[11px] text-slate-600 font-medium">Sistem pendukung: <span style={{color: secondary.hex}} className="font-bold">{secondary.epithet}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-14 py-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 mt-auto">"""

content = content.replace(old_pdf_block.strip(), new_pdf_block.strip())

with open('public/index.html', 'w') as f:
    f.write(content)

print("PDF Print Template successfully adjusted.")
