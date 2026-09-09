import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_app_top = """        const App = () => {
            const [isAudioPlaying, setIsAudioPlaying] = useState(false);
            const [ambientType, setAmbientType] = useState('wind');
            const [showResetConfirm, setShowResetConfirm] = useState(false);

            const toggleAudio = () => {
                if (isAudioPlaying) {
                    AudioEngine.stop();
                    setIsAudioPlaying(false);
                } else {
                    AudioEngine.play();
                    setIsAudioPlaying(true);
                }
            };"""

new_app_top = """        const App = () => {
            const [isAudioPlaying, setIsAudioPlaying] = useState(false);
            const [ambientType, setAmbientType] = useState('wind');
            const [showAudioMenu, setShowAudioMenu] = useState(false);
            const [showResetConfirm, setShowResetConfirm] = useState(false);

            const toggleAudio = () => {
                if (isAudioPlaying) {
                    if (!showAudioMenu) {
                        setShowAudioMenu(true);
                    } else {
                        AudioEngine.stop();
                        setIsAudioPlaying(false);
                        setShowAudioMenu(false);
                    }
                } else {
                    AudioEngine.play();
                    setIsAudioPlaying(true);
                    setShowAudioMenu(true);
                }
            };"""

content = content.replace(old_app_top.strip(), new_app_top.strip())

old_audio_ui = """                        {/* Floating Audio Controls */}
                        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                            {isAudioPlaying && (
                                <div className="bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 rounded-2xl p-2 flex flex-col gap-1 slide-up">
                                    {[
                                        { id: 'wind', name: 'Angin', icon: '🍃' },
                                        { id: 'ocean', name: 'Ombak', icon: '🌊' },
                                        { id: 'rain', name: 'Gerimis', icon: '🌧️' },
                                        { id: 'forest', name: 'Hutan', icon: '🌲' },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setAmbientType(t.id)}
                                            className={`px-3 py-2 text-xs font-bold tracking-wider rounded-xl transition-colors text-left flex items-center gap-2 ${ambientType === t.id ? 'bg-[#6B688D] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            <span>{t.icon}</span> {t.name}
                                        </button>
                                    ))}
                                </div>
                            )}"""

new_audio_ui = """                        {/* Floating Audio Controls */}
                        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                            {isAudioPlaying && showAudioMenu && (
                                <div className="bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 rounded-2xl p-2 flex flex-col gap-1 slide-up">
                                    <div className="px-2 pt-1 pb-2 mb-1 flex justify-between items-center border-b border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase ml-1">Suara Ambien</span>
                                        <button onClick={() => setShowAudioMenu(false)} className="text-slate-400 hover:text-slate-600 px-2 rounded-full">✕</button>
                                    </div>
                                    {[
                                        { id: 'wind', name: 'Angin', icon: '🍃' },
                                        { id: 'ocean', name: 'Ombak', icon: '🌊' },
                                        { id: 'rain', name: 'Gerimis', icon: '🌧️' },
                                        { id: 'forest', name: 'Hutan', icon: '🌲' },
                                    ].map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setAmbientType(t.id); setShowAudioMenu(false); }}
                                            className={`px-3 py-2 text-xs font-bold tracking-wider rounded-xl transition-colors text-left flex items-center gap-2 ${ambientType === t.id ? 'bg-[#6B688D] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            <span>{t.icon}</span> {t.name}
                                        </button>
                                    ))}
                                </div>
                            )}"""

content = content.replace(old_audio_ui.strip(), new_audio_ui.strip())

with open('public/index.html', 'w') as f:
    f.write(content)

print("Menu hide logic added.")
