import re

with open('public/index.html', 'r') as f:
    content = f.read()

# First replace in GalleryScreen modal (lines 648+)
old_gallery_li = """                                                    <li key={idx} className="text-sm text-slate-700 leading-relaxed bg-white/40 p-3 rounded-xl border border-white">
                                                        <span 
                                                            onClick={() => handleTermClick(term)} 
                                                            className="font-bold inline-block mb-1 cursor-pointer hover:opacity-75 transition-opacity border-b border-dashed" 
                                                            style={{color: selectedChar.hex, borderBottomColor: selectedChar.hex}}
                                                            title="Klik untuk penjelasan"
                                                        >
                                                            {term}
                                                        </span>
                                                        <span className="font-medium">{desc}</span>
                                                    </li>"""

new_gallery_li = """                                                    <li key={idx} className="flex flex-col gap-1.5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed bg-white/40 p-3 rounded-xl border border-white">
                                                        <span 
                                                            onClick={() => handleTermClick(term)} 
                                                            className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase self-start border cursor-pointer hover:opacity-75 transition-opacity" 
                                                            style={{color: selectedChar.hex, backgroundColor: `${selectedChar.hex}10`, borderColor: `${selectedChar.hex}30`}}
                                                            title="Klik untuk penjelasan"
                                                        >
                                                            {term}
                                                        </span>
                                                        <span className="text-slate-600 block mt-1">{desc}</span>
                                                    </li>"""

content = content.replace(old_gallery_li, new_gallery_li)

# Second replace in PDF Export Layout (lines 1361+)
old_pdf_li = """                                                <li key={idx} className="flex flex-col gap-1 text-base text-slate-600 font-medium leading-relaxed">
                                                    <span className="font-bold text-slate-800">{term}</span>
                                                    <span>{desc}</span>
                                                </li>"""

new_pdf_li = """                                                <li key={idx} className="flex flex-col gap-1.5 text-base text-slate-600 font-medium leading-relaxed">
                                                    <span 
                                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase self-start border" 
                                                        style={{color: primary.hex, backgroundColor: `${primary.hex}10`, borderColor: `${primary.hex}30`}}
                                                    >
                                                        {term}
                                                    </span>
                                                    <span>{desc}</span>
                                                </li>"""

content = content.replace(old_pdf_li, new_pdf_li)


with open('public/index.html', 'w') as f:
    f.write(content)

print("Updated style for cognitive strength terms in Gallery and PDF.")
