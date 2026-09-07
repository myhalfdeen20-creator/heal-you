const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove the conditional buttons in WelcomeScreen
html = html.replace(
    /\{savedIndex > 0 \? \([\s\S]*?\) : \([\s\S]*?Mulai Perjalananmu[\s\S]*?\}<\/button>\s*\)\}/,
    `<button onClick={onStart} className="btn-primary w-full sm:w-auto px-10 py-4 rounded-[2rem] font-semibold flex items-center justify-center gap-3">
                                    Mulai Perjalananmu <ArrowRightIcon aria-hidden="true" />
                                </button>`
);

// 2. Add isInitializing state and auto-resume in App
const appStart = `const App = () => {
            const [isInitializing, setIsInitializing] = useState(true);
            const [gameState, setGameState] = useState('welcome');
            const [questions, setQuestions] = useState([]);
            const [currentIndex, setCurrentIndex] = useState(0);
            const [answers, setAnswers] = useState({});
            const [isFading, setIsFading] = useState(false);`;

html = html.replace(/const App = \(\) => \{\s*const \[gameState, setGameState\] = useState\('welcome'\);\s*const \[questions, setQuestions\] = useState\(\[\]\);\s*const \[currentIndex, setCurrentIndex\] = useState\(0\);\s*const \[answers, setAnswers\] = useState\(\{\}\);\s*const \[isFading, setIsFading\] = useState\(false\);/, appStart);

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
                            setQuestions(parsed.questions);
                            setCurrentIndex(parsed.currentIndex || 0);
                            setAnswers(parsed.answers || {});
                            
                            if (parsed.currentIndex > 0) {
                                if (parsed.currentIndex >= parsed.questions.length) {
                                    setGameState('result');
                                } else if (parsed.currentIndex % 11 === 0 && parsed.currentIndex !== 0) {
                                    setGameState('break');
                                } else {
                                    setGameState('playing');
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Gagal memuat penyimpanan", e);
                    }
                }
                setIsInitializing(false);
            }, []);`;

html = html.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, useEffectBlock);

const returnBlock = `return (
                <div className="bg-[#F7F5F0] text-slate-700 min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
                    {isInitializing ? null : gameState === 'welcome' && (`;

html = html.replace(/return \(\s*<div className="bg-\[#F7F5F0\] text-slate-700 min-h-screen selection:bg-emerald-100 selection:text-emerald-900">\s*\{gameState === 'welcome' && \(/, returnBlock);

fs.writeFileSync('public/index.html', html);
console.log('Fixed WelcomeScreen and auto-resume!');
