import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Replace the pill button formatting for parenthetical terms
old_span_paren = """
                                                        const cleanTermParen = part.replace(/[()]/g, '').trim();
                                                        const hasMatchParen = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTermParen.toLowerCase());
                                                        return <button key={i} onClick={() => handleTermClick(part)} className={`text-sm px-1.5 py-0.5 rounded-md mx-1 bg-white/60 border shadow-sm transition-all inline ${hasMatchParen ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'cursor-default'}`} style={{color: primary.hex, borderColor: `${primary.hex}30`}}>{part}</button>;"""

new_span_paren = """
                                                        const cleanTermParen = part.replace(/[()]/g, '').trim();
                                                        const hasMatchParen = Object.keys(PSYCH_GLOSSARY).some(k => k.toLowerCase() === cleanTermParen.toLowerCase());
                                                        return <button key={i} onClick={() => handleTermClick(part)} className={`font-medium transition-opacity inline ${hasMatchParen ? 'cursor-pointer hover:opacity-70 underline decoration-dotted underline-offset-4' : 'cursor-default'}`} style={{color: primary.hex}}>{part}</button>;"""

content = content.replace(old_span_paren, new_span_paren)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Inline formatting fixed.")
