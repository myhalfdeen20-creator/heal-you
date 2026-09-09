import re

with open('public/index.html', 'r') as f:
    content = f.read()

# We can add a script right before the babel script to suppress that specific warning.
suppress_script = """
    <!-- Suppress Babel Standalone Warning -->
    <script>
        const originalWarn = console.warn;
        console.warn = function(...args) {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('You are using the in-browser Babel transformer')) {
                return;
            }
            originalWarn.apply(console, args);
        };
    </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>"""

content = content.replace('<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>', suppress_script)

with open('public/index.html', 'w') as f:
    f.write(content)

