import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Update <main> paddings
content = re.sub(r'p-4 sm:p-6 lg:p-8', 'p-6 sm:p-12 lg:p-24', content)
content = re.sub(r'p-4 sm:p-6', 'p-6 sm:p-12 lg:p-20', content)
content = re.sub(r'py-10 px-4 sm:px-6 lg:px-8', 'py-16 sm:py-24 px-6 sm:px-12 lg:px-24', content)

# Update WelcomeScreen
content = content.replace('p-8 sm:p-12 lg:p-16', 'p-10 sm:p-16 lg:p-24')
content = content.replace('mb-10 text-left', 'mb-16 text-left')
content = content.replace('mb-10 leading-relaxed', 'mb-16 leading-relaxed')

# Update Forms and Breaks
content = content.replace('rounded-[2rem] p-10 text-center', 'rounded-[2rem] p-12 sm:p-16 text-center')

# Update QuestionScreen
content = content.replace('mb-12 relative', 'mb-16 relative') # Question text spacing
content = content.replace('gap-4 flex flex-col', 'gap-6 sm:gap-8 flex flex-col') # Options gap
content = content.replace('p-5 sm:p-6', 'p-6 sm:p-8') # Option card padding

# Update ResultDashboard
content = content.replace('max-w-5xl mx-auto space-y-6', 'max-w-5xl mx-auto space-y-10 sm:space-y-12')
content = content.replace('p-8 sm:p-12 text-center', 'p-10 sm:p-16 lg:p-20 text-center') # Main identity
content = content.replace('mb-8 text-base sm:text-lg', 'mb-12 text-base sm:text-lg')
content = content.replace('p-8 sm:p-10', 'p-10 sm:p-14') # Relational / Cognitive
content = content.replace('p-6 sm:p-8 flex flex-col', 'p-8 sm:p-12 flex flex-col') # Secondary character
content = content.replace('gap-6 slide-up stagger-4', 'gap-10 slide-up stagger-4') # Secondary flex gap
content = content.replace('pt-6 slide-up', 'pt-10 slide-up') # Actions

# Update History toggle
content = content.replace('p-6 rounded-[2rem]', 'p-8 sm:p-10 rounded-[2rem]')
content = content.replace('p-6 sm:p-8 -mt-4 pt-8', 'p-8 sm:p-12 -mt-6 pt-12')

# Buttons padding
content = content.replace('py-4 px-4', 'py-5 px-6') # Primary/Secondary action buttons

with open('public/index.html', 'w') as f:
    f.write(content)

print("Done updating spacings.")
