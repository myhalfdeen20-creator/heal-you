import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Replace <button for the quote terms
content = content.replace(
    '''return <button key={i} onClick={() => handleTermClick(part)} className={`font-bold transition-opacity ${hasMatch ? 'underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-70' : ''}`} style={{color: primary.hex}}>{cleanTerm}</button>;''',
    '''return <span key={i} onClick={() => handleTermClick(part)} className={`font-bold transition-opacity inline ${hasMatch ? 'underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-70' : ''}`} style={{color: primary.hex}}>{cleanTerm}</span>;'''
)

# Replace <button for the parenthetical terms
content = content.replace(
    '''return <button key={i} onClick={() => handleTermClick(part)} className={`font-medium transition-opacity inline ${hasMatchParen ? 'cursor-pointer hover:opacity-70 underline decoration-dotted underline-offset-4' : 'cursor-default'}`} style={{color: primary.hex}}>{part}</button>;''',
    '''return <span key={i} onClick={() => handleTermClick(part)} className={`font-medium transition-opacity inline ${hasMatchParen ? 'cursor-pointer hover:opacity-70 underline decoration-dotted underline-offset-4' : 'cursor-default'}`} style={{color: primary.hex}}>{part}</span>;'''
)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Changed buttons to spans.")
