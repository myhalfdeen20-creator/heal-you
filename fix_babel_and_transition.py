import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Suppress Babel Warning Fully
suppress_script = """
    <!-- Suppress Babel Standalone Warning -->
    <script>
        const methods = ['warn', 'info', 'log', 'error'];
        methods.forEach(m => {
            const orig = console[m];
            console[m] = function(...args) {
                if (args[0] && typeof args[0] === 'string' && (args[0].includes('Babel') || args[0].includes('babel'))) {
                    return;
                }
                orig.apply(console, args);
            };
        });
    </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>"""

content = re.sub(r'<!-- Suppress Babel.*?babel\.min\.js"></script>', suppress_script, content, flags=re.DOTALL)

# 2. Fix WelcomeScreen to have "Lanjutkan Sesi" if savedIndex > 0
old_welcome_buttons = """                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 slide-up stagger-3">
                            <button onClick={onStart} className="btn-primary whitespace-nowrap w-full sm:w-auto px-10 py-4 rounded-[2rem] font-semibold flex items-center justify-center gap-3">
                                    Mulai Perjalananmu <ArrowRightIcon aria-hidden="true" />
                                </button>
                        </div>"""

new_welcome_buttons = """                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 slide-up stagger-3">
                            {savedIndex > 0 ? (
                                <>
                                    <button onClick={onResume} className="btn-primary whitespace-nowrap w-full sm:w-auto px-10 py-4 rounded-[2rem] font-semibold flex items-center justify-center gap-3">
                                        Lanjutkan Sesi <ArrowRightIcon aria-hidden="true" />
                                    </button>
                                    <button onClick={onReset} className="btn-secondary whitespace-nowrap w-full sm:w-auto px-8 py-4 rounded-[2rem] font-semibold flex items-center justify-center">
                                        Mulai Ulang
                                    </button>
                                </>
                            ) : (
                                <button onClick={onStart} className="btn-primary whitespace-nowrap w-full sm:w-auto px-10 py-4 rounded-[2rem] font-semibold flex items-center justify-center gap-3">
                                    Mulai Perjalananmu <ArrowRightIcon aria-hidden="true" />
                                </button>
                            )}
                        </div>"""
content = content.replace(old_welcome_buttons, new_welcome_buttons)

# 3. Fix transitionTo overriding state in submitUserData
# We will use setGameState directly in submitUserData with setTimeout, or we will modify transitionTo to accept state overrides.
# The easiest way is to modify submitUserData to handle the transition manually, since it already called saveState.
old_submitUserData = """            const submitUserData = (name) => {
                setUserName(name);
                const shuffled = shuffleArray(RAW_QUESTIONS);
                setQuestions(shuffled);
                setCurrentIndex(0);
                setAnswers({});
                saveState(0, {}, shuffled, name, 'playing');
                transitionTo('playing');
            };"""

new_submitUserData = """            const submitUserData = (name) => {
                setUserName(name);
                const shuffled = shuffleArray(RAW_QUESTIONS);
                setQuestions(shuffled);
                setCurrentIndex(0);
                setAnswers({});
                saveState(0, {}, shuffled, name, 'playing');
                
                // Manual transition to prevent closure stale state overwriting localStorage
                setIsFading(true);
                setTimeout(() => {
                    setGameState('playing');
                    setIsFading(false);
                }, 400);
            };"""
content = content.replace(old_submitUserData, new_submitUserData)

with open('public/index.html', 'w') as f:
    f.write(content)

