import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Modify the CSS for question-enter and question-exit to be slower and softer (fade in/out only, no slide, longer duration)
old_css = """        .question-enter { animation: questionIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .question-exit { animation: questionOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes enterScreen {
            from { opacity: 0; transform: translateY(16px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes exitScreen {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(-16px) scale(0.98); }
        }
        @keyframes questionIn {
            from { opacity: 0; transform: translateX(16px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes questionOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-16px); }
        }"""

new_css = """        .question-enter { animation: questionIn 0.6s ease-out forwards; }
        .question-exit { animation: questionOut 0.5s ease-in forwards; }

        @keyframes enterScreen {
            from { opacity: 0; transform: translateY(16px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes exitScreen {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(-16px) scale(0.98); }
        }
        @keyframes questionIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes questionOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }"""
content = content.replace(old_css, new_css)

# 2. Modify handleAnswer to increase the delay corresponding to the new animation timing
old_handle_answer = """                setIsFading(true);
                setTimeout(() => {
                    setAnswers(newAnswers);
                    setCurrentIndex(nextIndex);
                    setGameState(nextState);
                    setIsFading(false);
                }, 300);"""

new_handle_answer = """                setIsFading(true);
                setTimeout(() => {
                    setAnswers(newAnswers);
                    setCurrentIndex(nextIndex);
                    setGameState(nextState);
                    setIsFading(false);
                }, 500); // Increased delay to match softer fade out"""
content = content.replace(old_handle_answer, new_handle_answer)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Transitions softened.")
