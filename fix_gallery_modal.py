import re

with open('public/index.html', 'r') as f:
    content = f.read()

# I see the actual gallery modal code is slightly different from what I guessed.
# Here is the actual modal code from the output:
old_modal_exact = """                    {/* Character Details Modal */}
                    {selectedChar && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-slate-900/40 backdrop-blur-sm animate-enter" onClick={() => setSelectedChar(null)}>
                            <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 sm:p-10 relative bg-[#F2EFE9]" onClick={e => e.stopPropagation()}>
                                <button 
                                    onClick={() => setSelectedChar(null)}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                                    aria-label="Tutup"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                
                                <div className="text-center mb-8 relative">
                                    <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{backgroundColor: selectedChar.hex}}></div>
                                    <h3 className="text-3xl font-serif text-slate-800 mb-2 relative">{selectedChar.name}</h3>
                                    <p className="text-sm font-medium text-slate-500 relative">{selectedChar.title}</p>
                                </div>

                                <div className="prose prose-slate prose-sm sm:prose-base mx-auto">
                                    <div className="text-center">
                                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-white/60 border shadow-sm mb-4 whitespace-nowrap" style={{color: selectedChar.hex, borderColor: `${selectedChar.hex}30`}}>
                                            Analisis Historis
                                        </span>
                                    </div>
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

# The exact text for the prose part might differ slightly, let's just replace the wrapper.

target = """                    {/* Character Details Modal */}
                    {selectedChar && ("""
replacement = """                    {/* Character Details Modal */}
                    {selectedChar && ReactDOM.createPortal("""

content = content.replace(target, replacement)

# Replace the closing tag.
# We need to find the `</div>\n                        </div>\n                    )}` matching `selectedChar`.
# Let's use regex.
content = re.sub(r'(<div className="text-slate-700 leading-relaxed font-medium text-justify">.*?</div>\n                                </div>\n                            </div>\n                        </div>)\n                    \)}', r'\1,\n                    document.body\n                    )}', content, flags=re.DOTALL)


# Let's write an exact replace instead of regex to be safe.
# Find where selectedChar closing is:

find_str = """                                </div>
                            </div>
                        </div>
                    )}"""
replace_str = """                                </div>
                            </div>
                        </div>,
                        document.body
                    )}"""
content = content.replace(find_str, replace_str)


# Also add body scroll lock
hook_code = """        useEffect(() => {
            if (selectedChar) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return () => { document.body.style.overflow = 'unset'; };
        }, [selectedChar]);
"""
if "if (selectedChar) {" not in content:
    content = content.replace('const [selectedChar, setSelectedChar] = useState(null);', 'const [selectedChar, setSelectedChar] = useState(null);\n' + hook_code)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Gallery portal fixed.")
