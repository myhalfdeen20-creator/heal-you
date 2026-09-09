import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_transition = """            const transitionTo = (newState, delay = 400) => {
                setIsFading(true);
                saveState(currentIndex, answers, questions, userName, newState);
                setTimeout(() => {
                    setGameState(newState);
                    setIsFading(false);
                }, delay);
            };"""

new_transition = """            const transitionTo = (newState, delay = 400) => {
                setIsFading(true);
                saveState(currentIndex, answers, questions, userName, newState);
                setTimeout(() => {
                    setGameState(newState);
                    setIsFading(false);
                    // Ensure the new screen always starts at the very top
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }, delay);
            };"""

content = content.replace(old_transition, new_transition)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Scroll to top behavior added to transitionTo.")
