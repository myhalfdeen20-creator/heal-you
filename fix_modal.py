import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Replace the modal container logic.
# Because the container is `fixed inset-0`, it covers the whole screen.
# BUT, if `ResultDashboard` doesn't have a stacking context or the root element doesn't let `fixed` work relative to the viewport (e.g., due to transform/filter on parent), the modal might position incorrectly.
# The user says "pop up muncul di tengah page, sehingga user harus scroll ke bagian tengah". 
# This happens when `fixed` is overridden and behaves like `absolute` because an ancestor has `transform`, `filter`, or `will-change`.
# Let's use `React.createPortal` or just fix the parent. Wait, `App` has `transform` somewhere?
# No, we can just ensure it uses `window.scrollY` or we can render it at the App root using a portal, OR we can just use `window.scrollTo` or block scroll.
# Wait, actually `fixed` inside an element with `transform` becomes absolute to that element.
# The `ResultDashboard` is inside `slide-up` which has `transform: translateY(...)`.

# Since we don't have a portal setup easily without rewriting ReactDOM root, let's fix the CSS or use inline styles to position it relative to window scroll, OR we can just add an event listener to disable body scroll.
# Actually, the simplest fix is to render the modal OUTSIDE the transforming containers, or use `position: fixed` and make sure no parent has a lingering `transform`. The `slide-up` animation ends with `transform: translateY(0)`, but `animation-fill-mode: forwards` keeps the transform context active!
# To fix this, we can change the CSS of `slide-up` to remove the transform after it finishes, OR use a Portal, OR simply calculate `top` based on `window.scrollY`.
# Since we are using standard React, `ReactDOM.createPortal` is available! Let's check if we can use it.
# `ReactDOM.createPortal(modal_jsx, document.body)`
# We need to see if ReactDOM is imported. Yes, it's `ReactDOM.createRoot`.

# Let's replace the modal jsx with a Portal.

old_modal = """                        {/* Glossary Modal */}
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
                        )}"""

new_modal = """                        {/* Glossary Modal */}
                        {activeGlossaryTerm && ReactDOM.createPortal(
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setActiveGlossaryTerm(null)}>
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
                            </div>,
                            document.body
                        )}"""

content = content.replace(old_modal, new_modal)

# Also block scroll when modal is open
# We can add an effect in ResultDashboard
hook_to_add = """            useEffect(() => {
                if (activeGlossaryTerm) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'unset';
                }
                return () => { document.body.style.overflow = 'unset'; };
            }, [activeGlossaryTerm]);
"""

content = content.replace('const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);', 'const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);\n' + hook_to_add)


with open('public/index.html', 'w') as f:
    f.write(content)

print("Modal portal fixed.")
