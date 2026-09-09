import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Update question animations
q_anim_old = """        .question-enter { animation: questionIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .question-exit { animation: questionOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }"""
q_anim_new = """        .question-enter { animation: questionIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .question-exit { animation: questionOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }"""
content = content.replace(q_anim_old, q_anim_new)

q_kf_old = """        @keyframes questionIn {
            from { opacity: 0; transform: translateX(32px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes questionOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-32px); }
        }"""
q_kf_new = """        @keyframes questionIn {
            from { opacity: 0; transform: translateX(16px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes questionOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-16px); }
        }"""
content = content.replace(q_kf_old, q_kf_new)

# 2. Add whitespace-nowrap to pills/chips
content = content.replace('className="text-[10px] font-bold tracking-widest uppercase mt-2 mb-3 px-3 py-1 rounded-full bg-white/60 border shadow-sm"', 'className="text-[10px] font-bold tracking-widest uppercase mt-2 mb-3 px-4 py-1.5 rounded-full bg-white/60 border shadow-sm whitespace-nowrap"')
content = content.replace('className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/60 border shadow-sm mb-4"', 'className="inline-block text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-white/60 border shadow-sm mb-4 whitespace-nowrap"')
content = content.replace('className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border mt-2"', 'className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border mt-2 whitespace-nowrap"')
content = content.replace('rounded-full shadow-sm', 'rounded-full shadow-sm whitespace-nowrap')
content = content.replace('w-full bg-slate-200/50 rounded-full', 'w-full bg-slate-200/50 rounded-full overflow-hidden')

# Make option buttons text prevent wrapping weirdly if short, but long questions in options might wrap.
# Usually pills are for small labels.
# Wait, "Label teks di dalam tombol (pill atau chip) tidak boleh sampai patah ke bawah"
content = content.replace('className="btn-primary', 'className="btn-primary whitespace-nowrap')
content = content.replace('className="btn-secondary', 'className="btn-secondary whitespace-nowrap')
content = content.replace('className="glass-panel flex-1', 'className="glass-panel flex-1 whitespace-nowrap')
content = content.replace('className="glass-panel w-full sm:w-auto flex-1', 'className="glass-panel w-full sm:w-auto flex-1 whitespace-nowrap')
content = content.replace('inline-flex items-center justify-center p-3.5', 'inline-flex items-center justify-center p-3.5 whitespace-nowrap')

with open('public/index.html', 'w') as f:
    f.write(content)

print("Micro-interactions updated.")
