import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Replace the history rendering block
old_history_render = """                                {isHistoryExpanded && (
                                    <div className="glass-panel border-t-0 rounded-b-2xl p-8 sm:p-12 -mt-6 pt-12 text-base text-slate-700 leading-relaxed font-medium">
                                        {primary.history}
                                    </div>
                                )}"""

new_history_render = """                                {isHistoryExpanded && (
                                    <div className="glass-panel border-t-0 rounded-b-2xl p-8 sm:p-12 -mt-6 pt-12 text-base text-slate-700 leading-relaxed font-medium">
                                        {primary.history.split(/(?<=\\.)\\s+/).reduce((acc, sentence, idx, arr) => {
                                            if (idx % 2 === 0) {
                                                const para = [sentence, arr[idx + 1]].filter(Boolean).join(' ');
                                                
                                                // Format psychological terms in quotes or parentheses to be highlighted
                                                const formattedPara = para.split(/('[^']+'|\\([^)]+\\))/g).map((part, i) => {
                                                    if (part.startsWith("'") && part.endsWith("'")) {
                                                        return <span key={i} className="font-bold" style={{color: primary.hex}}>{part.replace(/'/g, '')}</span>;
                                                    }
                                                    if (part.startsWith("(") && part.endsWith(")")) {
                                                        return <span key={i} className="text-sm px-1.5 py-0.5 rounded-md mx-1 bg-white/60 border shadow-sm whitespace-nowrap" style={{color: primary.hex, borderColor: `${primary.hex}30`}}>{part}</span>;
                                                    }
                                                    return part;
                                                });

                                                acc.push(
                                                    <p key={idx} className={`mb-6 text-slate-600 ${idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''}`}>
                                                        {formattedPara}
                                                    </p>
                                                );
                                            }
                                            return acc;
                                        }, [])}
                                    </div>
                                )}"""

content = content.replace(old_history_render, new_history_render)

with open('public/index.html', 'w') as f:
    f.write(content)

print("History rendering updated.")
