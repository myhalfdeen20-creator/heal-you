import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_reset = """            const resetState = () => {
                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                setQuestions([]);
                setCurrentIndex(0);
                setAnswers({});
                setUserName('');
                setShowResetConfirm(false);
                setGameState('welcome'); // Direct state update to bypass delay and saveState bugs if any
            };"""

new_reset = """            const resetState = () => {
                try { localStorage.removeItem('healyou_ummul_mukminin_state'); } catch (e) {}
                setQuestions([]);
                setCurrentIndex(0);
                setAnswers({});
                setUserName('');
                setShowResetConfirm(false);
                setGameState('welcome'); 
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            };"""

content = content.replace(old_reset, new_reset)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Scroll to top behavior added to resetState.")
