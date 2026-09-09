import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_history = """                                        <p className="text-base text-slate-700 leading-relaxed font-medium">
                                            {selectedChar.history}
                                        </p>"""

new_history = """                                        <div className="text-base text-slate-700 leading-relaxed font-medium text-justify">
                                            {selectedChar.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                                if (idx % 2 === 0) {
                                                    const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                    
                                                    // Format psychological terms in quotes or parentheses to be highlighted
                                                    const formattedPara = para.split(/('[^']+'|\\([^)]+\\))/g).map((part, i) => {
                                                        if (part.startsWith("'") && part.endsWith("'")) {
                                                            const cleanTerm = part.replace(/'/g, '').trim();
                                                            const hasMatch = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTerm.toLowerCase());
                                                            return <span key={i} onClick={() => handleTermClick(part)} className={`font-bold transition-opacity inline ${hasMatch ? 'underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-70' : ''}`} style={{color: selectedChar.hex}}>{cleanTerm}</span>;
                                                        }
                                                        if (part.startsWith("(") && part.endsWith(")")) {
                                                            const cleanTermParen = part.replace(/[()]/g, '').trim();
                                                            const hasMatchParen = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTermParen.toLowerCase());
                                                            return <span key={i} onClick={() => handleTermClick(part)} className={`font-medium transition-opacity inline ${hasMatchParen ? 'cursor-pointer hover:opacity-70 underline decoration-dotted underline-offset-4' : 'cursor-default'}`} style={{color: selectedChar.hex}}>{part}</span>;
                                                        }
                                                        return part;
                                                    });

                                                    acc.push(
                                                        <p key={idx} className={`mb-6 ${idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                            {formattedPara}
                                                        </p>
                                                    );
                                                }
                                                return acc;
                                            }, [])}
                                        </div>"""

content = content.replace(old_history, new_history)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Replaced Jejak Sejarah content.")
