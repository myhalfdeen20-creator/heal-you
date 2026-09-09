import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Modify resetState
old_resetState = """            const resetState = () => {
                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                setQuestions([]);
                setCurrentIndex(0);
                setAnswers({});
                setUserName('');
                setShowResetConfirm(false);
                transitionTo('welcome');
            };"""

new_resetState = """            const resetState = () => {
                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                setQuestions([]);
                setCurrentIndex(0);
                setAnswers({});
                setUserName('');
                setShowResetConfirm(false);
                setGameState('welcome'); // Direct state update to bypass delay and saveState bugs if any
            };"""

content = content.replace(old_resetState, new_resetState)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Reset transition fixed.")
