const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. In App's useEffect, let's fix what happens on load.
// We can just keep it as is, but if they have finished the quiz, we should clear the state so they can start over.
// Because if currentIndex >= questions.length, they shouldn't "resume" from welcome.
const useEffectReplacement = `
            useEffect(() => {
                let savedState = null;
                try {
                    savedState = localStorage.getItem('healyou_ummul_mukminin_state');
                } catch (e) {}
                
                if (savedState) {
                    try {
                        const parsed = JSON.parse(savedState);
                        if (parsed.questions && parsed.questions.length > 0) {
                            if (parsed.currentIndex >= parsed.questions.length) {
                                // Already finished. Clear it so they start fresh next time they are at welcome.
                                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                            } else {
                                setQuestions(parsed.questions);
                                setCurrentIndex(parsed.currentIndex || 0);
                                setAnswers(parsed.answers || {});
                            }
                        }
                    } catch (e) {
                        console.error("Gagal memuat", e);
                    }
                }
            }, []);
`;
html = html.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, useEffectReplacement.trim());

// 2. In WelcomeScreen, always just show ONE button. If savedIndex > 0, we can say "Lanjutkan Analisis". 
// But the user specifically said "hapus tombol mulai dari awal karena kan memang itu halaman awal belum melakukan apapun".
// So let's just make the button say "Mulai Analisis". If there's a saved session, we use it, otherwise we start new.
// Actually, if we just change the button to "Mulai Analisis" and it calls onStart ALWAYS, they lose resume capability.
// But they can just finish it in one go. If they want resume, they can have it. Let's make "Mulai Analisis" call onStart if savedIndex == 0, and onResume if savedIndex > 0.
// Wait, if it just says "Mulai Analisis" and resumes transparently, they might be confused why they are at Question 12 instead of 1!
// If they refreshed and went to Welcome Screen, they EXPECT to start from the beginning because they said "halaman awal belum melakukan apapun".
// Meaning they think the Welcome Screen = New Session.
// So maybe we should just remove the resume functionality from Welcome Screen, OR auto-resume in useEffect!
