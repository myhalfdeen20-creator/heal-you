const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const useEffectBlock = `useEffect(() => {
                let savedState = null;
                try {
                    savedState = localStorage.getItem('healyou_ummul_mukminin_state');
                } catch (e) {
                    console.error("Gagal mengakses localStorage", e);
                }
                if (savedState) {
                    try {
                        const parsed = JSON.parse(savedState);
                        if (parsed.questions && parsed.questions.length > 0) {
                            if (parsed.currentIndex >= parsed.questions.length) {
                                // Sudah selesai, kembali ke awal
                                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch(e) {}
                            } else {
                                setQuestions(parsed.questions);
                                setCurrentIndex(parsed.currentIndex || 0);
                                setAnswers(parsed.answers || {});
                                
                                if (parsed.currentIndex > 0) {
                                    if (parsed.currentIndex % 11 === 0 && parsed.currentIndex !== 0) {
                                        setGameState('break');
                                    } else {
                                        setGameState('playing');
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Gagal memuat penyimpanan", e);
                    }
                }
                setIsInitializing(false);
            }, []);`;

html = html.replace(/useEffect\(\(\) => \{[\s\S]*?setIsInitializing\(false\);\s*\}, \[\]\);/, useEffectBlock);

fs.writeFileSync('public/index.html', html);
console.log('Fixed auto-resume behavior.');
