import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Update resetState
old_resetState = """            const resetState = () => {
                if (window.confirm("Apakah kamu yakin ingin mereset sistem (menghapus cache data) dan memulai ulang dari awal?")) {
                    try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                    setQuestions([]);
                    setCurrentIndex(0);
                    setAnswers({});
                    setUserName('');
                    transitionTo('welcome');
                }
            };"""

new_resetState = """            const resetState = () => {
                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                setQuestions([]);
                setCurrentIndex(0);
                setAnswers({});
                setUserName('');
                setShowResetConfirm(false);
                transitionTo('welcome');
            };"""
content = content.replace(old_resetState, new_resetState)

# 2. Add showResetConfirm state to App
content = content.replace("            const [isAudioPlaying, setIsAudioPlaying] = useState(false);", "            const [isAudioPlaying, setIsAudioPlaying] = useState(false);\n            const [showResetConfirm, setShowResetConfirm] = useState(false);")


# 3. Update the props being passed: instead of `resetState`, we pass `() => setShowResetConfirm(true)`
content = content.replace("onReset={resetState}", "onReset={() => setShowResetConfirm(true)}")

# 4. Add the Custom Reset Confirm Modal inside App (at the end of return, before </ThemeProvider>)
reset_modal = """
                        {/* Custom Reset Confirm Modal */}
                        {showResetConfirm && ReactDOM.createPortal(
                            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 fade-in" onClick={() => setShowResetConfirm(false)}>
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true"></div>
                                <div className="glass-panel max-w-sm w-full rounded-[2rem] p-8 sm:p-10 relative z-10 slide-up shadow-2xl text-center" onClick={e => e.stopPropagation()}>
                                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                                    </div>
                                    <h4 className="text-xl font-serif text-slate-800 mb-4">Mulai Ulang?</h4>
                                    <p className="text-sm text-slate-600 font-medium mb-8">
                                        Apakah kamu yakin ingin mereset sistem dan memulai ulang dari awal? Semua riwayat jawabanmu akan dihapus.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                                            Batal
                                        </button>
                                        <button onClick={resetState} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md shadow-red-500/20">
                                            Ya, Mulai Ulang
                                        </button>
                                    </div>
                                </div>
                            </div>,
                            document.body
                        )}"""

# Find closing of App's main div and insert it
content = content.replace("                    </div>\n                </ThemeProvider>", "                    </div>\n" + reset_modal + "\n                </ThemeProvider>")

with open('public/index.html', 'w') as f:
    f.write(content)

print("Reset confirm fixed.")
