import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_submit = """                // Manual transition to prevent closure stale state overwriting localStorage
                setIsFading(true);
                setTimeout(() => {
                    setGameState('playing');
                    setIsFading(false);
                }, 400);"""

new_submit = """                // Manual transition to prevent closure stale state overwriting localStorage
                setIsFading(true);
                setTimeout(() => {
                    setGameState('playing');
                    setIsFading(false);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }, 400);"""

content = content.replace(old_submit, new_submit)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Scroll to top behavior added to submitUserData.")
