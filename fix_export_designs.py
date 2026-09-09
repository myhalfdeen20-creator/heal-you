import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Update exportRef (Social Media Poster)
old_export_block = """                    {/* Hidden Export Layout (Portrait for Social Media) */}
                    <div style={{ position: 'absolute', top: '-15000px', left: '-15000px' }}>
                        <div ref={exportRef} className="w-[480px] min-h-[853px] bg-[#F6F7FA] relative overflow-hidden flex flex-col p-10 font-sans" style={{ backgroundColor: '#F6F7FA' }}>
                            {/* Background Decorations */}
                            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{backgroundColor: secondary ? secondary.hex : primary.hex}}></div>

                            {/* Header */}
                            <div className="mb-4 flex justify-center items-center z-10">
                                <p className="text-[10px] font-bold text-[#6B688D] tracking-widest uppercase">Catatan Perjalanan Psikologis</p>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center z-10 py-6">
                                <CharacterAvatar id={primary.id} colorHex={primary.hex} size="large" />
                                
                                <div className="mt-8 mb-4 inline-flex items-center justify-center px-5 py-2 bg-white/60 border border-white rounded-full shadow-sm whitespace-nowrap backdrop-blur-md">
                                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{color: primary.hex}}>
                                        {primary.epithet} • Kesesuaian {primary.matchPercentage || 0}%
                                    </span>
                                </div>
                                
                                <h1 className="font-serif text-center flex flex-col items-center gap-1 mb-8 w-full">
                                    <span className="text-lg text-slate-500 font-medium tracking-wide">
                                        Halo {userName ? userName : 'saya'},
                                    </span>
                                    <span className="text-xl text-slate-700 leading-snug">
                                        Karakteristikmu beresonansi dengan
                                    </span>
                                    <div className="flex flex-col items-center mt-3">
                                        <span className="text-4xl font-bold tracking-tight leading-none text-center" style={{color: primary.hex}}>
                                            {mainName}
                                        </span>
                                        {subName && (
                                            <span className="text-xl font-medium mt-2 text-center" style={{color: primary.hex, opacity: 0.85}}>
                                                {subName}
                                            </span>
                                        )}
                                    </div>
                                </h1>
                                
                                <p className="text-slate-600 leading-relaxed text-base font-medium px-2">
                                    {primary.shortSummary}
                                </p>
                            </div>

                            {/* Secondary if exists */}
                            {secondary && (
                                <div className="mt-4 bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 w-full z-10">
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Sub-Rutinitas Pendukung</p>
                                    <p className="text-sm font-serif text-slate-700"><span style={{color: secondary.hex}} className="font-semibold">{secondary.name}</span> — {secondary.epithet}</p>
                                </div>
                            )}

                            {/* Footer */}
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
                            </div>
                        </div>
                    </div>"""

new_export_block = """                    {/* Hidden Export Layout (Portrait for Social Media) */}
                    <div style={{ position: 'absolute', top: '-15000px', left: '-15000px' }}>
                        <div ref={exportRef} className="w-[480px] min-h-[853px] bg-[#FDFDFE] relative overflow-hidden flex flex-col p-10 font-sans border-[12px] border-slate-50" style={{ backgroundColor: '#FDFDFE' }}>
                            {/* Sharp Clean Background Decorations (No Blurs for perfect html2canvas render) */}
                            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{backgroundColor: primary.hex}}></div>
                            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{backgroundColor: secondary ? secondary.hex : primary.hex}}></div>

                            {/* Header */}
                            <div className="mb-4 flex justify-center items-center z-10">
                                <p className="text-[10px] font-bold text-[#6B688D] tracking-widest uppercase border-b border-slate-200 pb-2">Catatan Perjalanan Psikologis</p>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center z-10 py-6">
                                <div className="relative p-2 rounded-full border border-slate-100 bg-white shadow-sm mb-6">
                                    <CharacterAvatar id={primary.id} colorHex={primary.hex} size="large" />
                                </div>
                                
                                <div className="mb-6 inline-flex items-center justify-center px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
                                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{color: primary.hex}}>
                                        {primary.epithet} • Kesesuaian {primary.matchPercentage || 0}%
                                    </span>
                                </div>
                                
                                <h1 className="font-serif text-center flex flex-col items-center gap-1 mb-8 w-full">
                                    <span className="text-lg text-slate-500 font-medium tracking-wide italic">
                                        Halo {userName ? userName : 'saya'},
                                    </span>
                                    <span className="text-xl text-slate-700 leading-snug">
                                        Karakteristikmu beresonansi dengan
                                    </span>
                                    <div className="flex flex-col items-center mt-4">
                                        <span className="text-4xl font-bold tracking-tight leading-none text-center" style={{color: primary.hex}}>
                                            {mainName}
                                        </span>
                                        {subName && (
                                            <span className="text-xl font-medium mt-2 text-center" style={{color: primary.hex, opacity: 0.85}}>
                                                {subName}
                                            </span>
                                        )}
                                    </div>
                                </h1>
                                
                                <p className="text-slate-600 leading-relaxed text-sm font-medium px-4">
                                    {primary.shortSummary}
                                </p>
                            </div>

                            {/* Secondary if exists */}
                            {secondary && (
                                <div className="mt-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 w-full z-10 text-left">
                                    <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Sifat Pendamping</p>
                                    <p className="text-sm font-serif text-slate-700"><span style={{color: secondary.hex}} className="font-bold">{secondary.name}</span></p>
                                    <p className="text-xs text-slate-500 mt-1">{secondary.epithet}</p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center z-10">
                                <div className="text-left flex-1">
                                    <p className="text-[11px] font-bold text-[#6B688D] mb-1">Asesmen Ummul Mukminin</p>
                                    <p className="text-[9px] text-slate-500">healyou-asesmen-ummul-mukminin.netlify.app</p>
                                </div>
                                <div className="flex flex-col items-end shrink-0 gap-1.5">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-0.5">
                                        <img src="/logo-healyou.webp" alt="Heal You" className="w-full h-full object-cover rounded-[0.5rem]" />
                                    </div>
                                    <p className="text-[7px] font-bold text-[#6B688D] tracking-[0.2em] uppercase">Heal You</p>
                                </div>
                            </div>
                        </div>
                    </div>"""
content = content.replace(old_export_block, new_export_block)

# 2. Fix the scaling in html2canvas config
old_canvas_config = """                    const canvas = await html2canvas(exportRef.current, {
                        scale: 2, 
                        backgroundColor: "#F6F7FA",
                        useCORS: true,
                        logging: false,
                        windowWidth: exportRef.current.scrollWidth,
                        windowHeight: exportRef.current.scrollHeight,
                    });"""
                    
new_canvas_config = """                    const canvas = await html2canvas(exportRef.current, {
                        scale: 3, 
                        backgroundColor: "#FDFDFE",
                        useCORS: true,
                        logging: false,
                        windowWidth: exportRef.current.scrollWidth,
                        windowHeight: exportRef.current.scrollHeight,
                    });"""
content = content.replace(old_canvas_config, new_canvas_config)


with open('public/index.html', 'w') as f:
    f.write(content)

print("Export typography and cleanup completed.")
