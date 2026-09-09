import re

with open('public/index.html', 'r') as f:
    content = f.read()

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

# We'll inject it right before the last </div></div> in App
old_closing = """                        {gameState === 'gallery' && (
                            <GalleryScreen 
                                onBack={() => transitionTo((currentIndex > 0 && currentIndex >= RAW_QUESTIONS.length) ? 'result' : 'welcome')}
                                isFading={isFading}
                            />
                        )}
                    </div>
                </div>"""

new_closing = f"""                        {{gameState === 'gallery' && (
                            <GalleryScreen 
                                onBack={{() => transitionTo((currentIndex > 0 && currentIndex >= RAW_QUESTIONS.length) ? 'result' : 'welcome')}}
                                isFading={{isFading}}
                            />
                        )}}
{reset_modal}
                    </div>
                </div>"""

content = content.replace(old_closing, new_closing)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Modal injected successfully.")
