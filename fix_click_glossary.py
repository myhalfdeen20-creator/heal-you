import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Fix in ResultDashboard
old_result_span = """<span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase self-start border" style={{color: primary.hex, backgroundColor: `${primary.hex}10`, borderColor: `${primary.hex}30`}}>"""

new_result_span = """<span 
                                                    onClick={() => handleTermClick(term)} 
                                                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase self-start border cursor-pointer hover:opacity-75 transition-opacity" 
                                                    style={{color: primary.hex, backgroundColor: `${primary.hex}10`, borderColor: `${primary.hex}30`}}
                                                    title="Klik untuk penjelasan"
                                                >"""

content = content.replace(old_result_span, new_result_span)

# Fix in GalleryScreen
old_gallery_span = """<span className="font-bold block mb-1" style={{color: selectedChar.hex}}>{term}</span>"""
new_gallery_span = """<span 
                                                            onClick={() => handleTermClick(term)} 
                                                            className="font-bold inline-block mb-1 cursor-pointer hover:opacity-75 transition-opacity border-b border-dashed" 
                                                            style={{color: selectedChar.hex, borderBottomColor: selectedChar.hex}}
                                                            title="Klik untuk penjelasan"
                                                        >
                                                            {term}
                                                        </span>"""

content = content.replace(old_gallery_span, new_gallery_span)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Added click handlers to cognitive strength terms.")
