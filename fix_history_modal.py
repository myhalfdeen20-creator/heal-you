import re

with open('public/index.html', 'r') as f:
    content = f.read()

# The user is talking about the "Baca Sejarah Lengkap" popup in the Gallery.
# Let's see how `selectedChar` modal is rendered.

old_gallery_modal = """                        {selectedChar && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setSelectedChar(null)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 sm:p-12 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
"""

new_gallery_modal = """                        {selectedChar && ReactDOM.createPortal(
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setSelectedChar(null)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 sm:p-12 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
"""

# Wait, the closing tag of the selectedChar modal needs to be updated too.
# Let's replace the opening, and then we need to replace the closing `</div>\n                        )}` with `</div>\n                            </div>,\n                            document.body\n                        )}`
# Let's do it cleanly by finding the block.
# Actually, the activeGlossaryTerm modal was fixed by using ReactDOM.createPortal. We need to do the exact same for `selectedChar` modal in the Gallery component.

old_block = """                        {selectedChar && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setSelectedChar(null)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 sm:p-12 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setSelectedChar(null)} 
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                                    aria-label="Tutup popup"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    
                                    <div className="text-center mb-8 relative">
                                        <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{backgroundColor: selectedChar.hex}}></div>
                                        <h3 className="text-3xl font-serif text-slate-800 mb-2 relative">{selectedChar.name}</h3>
                                        <p className="text-sm font-medium text-slate-500 relative">{selectedChar.title}</p>
                                    </div>

                                    <div className="prose prose-slate prose-sm sm:prose-base mx-auto">
                                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-white/60 border shadow-sm mb-4" style={{color: selectedChar.hex, borderColor: `${selectedChar.hex}30`}}>
                                            Analisis Historis
                                        </span>
                                        <div className="text-slate-700 leading-relaxed font-medium text-justify">
                                            {selectedChar.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                                if (idx % 2 === 0) {
                                                    const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                    acc.push(
                                                        <p key={idx} className={`mb-4 ${idx === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                            {para}
                                                        </p>
                                                    );
                                                }
                                                return acc;
                                            }, [])}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}"""

new_block = """                        {selectedChar && ReactDOM.createPortal(
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setSelectedChar(null)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 sm:p-12 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setSelectedChar(null)} 
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                                    aria-label="Tutup popup"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    
                                    <div className="text-center mb-8 relative">
                                        <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{backgroundColor: selectedChar.hex}}></div>
                                        <h3 className="text-3xl font-serif text-slate-800 mb-2 relative">{selectedChar.name}</h3>
                                        <p className="text-sm font-medium text-slate-500 relative">{selectedChar.title}</p>
                                    </div>

                                    <div className="prose prose-slate prose-sm sm:prose-base mx-auto">
                                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-white/60 border shadow-sm mb-4" style={{color: selectedChar.hex, borderColor: `${selectedChar.hex}30`}}>
                                            Analisis Historis
                                        </span>
                                        <div className="text-slate-700 leading-relaxed font-medium text-justify">
                                            {selectedChar.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                                if (idx % 2 === 0) {
                                                    const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                    acc.push(
                                                        <p key={idx} className={`mb-4 ${idx === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                            {para}
                                                        </p>
                                                    );
                                                }
                                                return acc;
                                            }, [])}
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            document.body
                        )}"""

# Replace the block
content = content.replace(old_block, new_block)

# Add overflow hidden effect
hook_to_add_gallery = """        useEffect(() => {
            if (selectedChar) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return () => { document.body.style.overflow = 'unset'; };
        }, [selectedChar]);
"""
content = content.replace('const [selectedChar, setSelectedChar] = useState(null);', 'const [selectedChar, setSelectedChar] = useState(null);\n' + hook_to_add_gallery)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Gallery modal portal fixed.")
