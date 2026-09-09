import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Add activeTerm state and modal to ResultDashboard
state_hook = """            const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
            const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);

            const handleTermClick = (rawTerm) => {
                let term = rawTerm.replace(/['()]/g, '').trim().toLowerCase();
                const match = Object.keys(PSYCH_GLOSSARY).find(k => k.toLowerCase() === term);
                if (match) {
                    setActiveGlossaryTerm({ title: match, desc: PSYCH_GLOSSARY[match] });
                }
            };
"""
content = content.replace('            const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);', state_hook)

# Add Modal JSX just before the final </div> of ResultDashboard (before return ends)
# We can inject it before "            // Hidden PDF Rapor Layout"
# Actually, it's better to inject it right before `</main>` or similar. But ResultDashboard returns a `div`, not `main` (it's inside `main` in `App`).
# Let's inject it before `{/* Hidden PDF Rapor Layout`
modal_jsx = """
                        {/* Glossary Modal */}
                        {activeGlossaryTerm && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setActiveGlossaryTerm(null)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel max-w-sm w-full rounded-[2rem] p-8 sm:p-10 relative z-10 slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setActiveGlossaryTerm(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <h4 className="text-xl font-serif text-slate-800 mb-4 pr-6">{activeGlossaryTerm.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {activeGlossaryTerm.desc}
                                    </p>
                                </div>
                            </div>
                        )}

                    {/* Hidden PDF Rapor Layout"""
content = content.replace('{/* Hidden PDF Rapor Layout', modal_jsx)

# Make terms clickable
old_span_quote = """return <span key={i} className="font-bold" style={{color: primary.hex}}>{part.replace(/'/g, '')}</span>;"""
new_span_quote = """
                                                        const cleanTerm = part.replace(/'/g, '').trim();
                                                        const hasMatch = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTerm.toLowerCase());
                                                        return <button key={i} onClick={() => handleTermClick(part)} className={`font-bold transition-opacity ${hasMatch ? 'underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-70' : ''}`} style={{color: primary.hex}}>{cleanTerm}</button>;"""
content = content.replace(old_span_quote, new_span_quote)

old_span_paren = """return <span key={i} className="text-sm px-1.5 py-0.5 rounded-md mx-1 bg-white/60 border shadow-sm whitespace-nowrap" style={{color: primary.hex, borderColor: `${primary.hex}30`}}>{part}</span>;"""
new_span_paren = """
                                                        const cleanTermParen = part.replace(/[()]/g, '').trim();
                                                        const hasMatchParen = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTermParen.toLowerCase());
                                                        return <button key={i} onClick={() => handleTermClick(part)} className={`text-sm px-1.5 py-0.5 rounded-md mx-1 bg-white/60 border shadow-sm whitespace-nowrap transition-all ${hasMatchParen ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'cursor-default'}`} style={{color: primary.hex, borderColor: `${primary.hex}30`}}>{part}</button>;"""
content = content.replace(old_span_paren, new_span_paren)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Modal and clickability added.")
