import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_export_h1 = """                                <h1 className="text-3xl font-serif text-slate-700 mb-6 leading-tight">
                                    Karakteristik {userName ? userName : 'saya'} beresonansi dengan<br />
                                    <span style={{color: primary.hex}} className="font-semibold text-4xl mt-3 block">{primary.name}</span>
                                </h1>"""

new_export_h1 = """                                <h1 className="font-serif text-center flex flex-col items-center gap-1 mb-8 w-full">
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
                                </h1>"""
content = content.replace(old_export_h1, new_export_h1)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Export heading format applied.")
