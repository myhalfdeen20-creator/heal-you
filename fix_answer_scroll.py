import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_handle = """                setIsFading(true);
                setTimeout(() => {
                    setAnswers(newAnswers);
                    setCurrentIndex(nextIndex);
                    setGameState(nextState);
                    setIsFading(false);
                }, 500); // Increased delay to match softer fade out"""

new_handle = """                setIsFading(true);
                setTimeout(() => {
                    setAnswers(newAnswers);
                    setCurrentIndex(nextIndex);
                    setGameState(nextState);
                    setIsFading(false);
                    // Scroll to top if transitioning to break or analyzing
                    if (nextState !== 'playing') {
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }
                }, 500); // Increased delay to match softer fade out"""

content = content.replace(old_handle, new_handle)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Scroll to top behavior added to handleAnswer.")
