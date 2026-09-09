import re

with open('public/index.html', 'r') as f:
    content = f.read()

# We need to insert the parsing logic at the beginning of ResultDashboard.
# Wait, ResultDashboard starts like:
#        const ResultDashboard = ({ result, userName, onReset, onViewGallery, isFading }) => {
#            const { primary, secondary, radarData } = result;

old_dashboard_start = """        const ResultDashboard = ({ result, userName, onReset, onViewGallery, isFading }) => {
            const { primary, secondary, radarData } = result;
            const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);"""

new_dashboard_start = """        const ResultDashboard = ({ result, userName, onReset, onViewGallery, isFading }) => {
            const { primary, secondary, radarData } = result;
            const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
            
            // Parse primary name to separate main name and sub name (in parentheses)
            const nameMatch = primary.name.match(/^(.*?)\\s*(\\((.*?)\\))?$/);
            const mainName = nameMatch ? nameMatch[1].trim() : primary.name;
            const subName = nameMatch && nameMatch[2] ? nameMatch[2].trim() : null;
"""
content = content.replace(old_dashboard_start, new_dashboard_start)

# Now replace the h1 element
old_h1 = """                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-700 mb-4 px-2 leading-tight">
                                    {userName ? `Halo ${userName}, Karakteristikmu` : 'Karakteristikmu'}<br />Beresonansi dengan <span style={{color: primary.hex}} className="font-semibold">{primary.name}</span>
                                </h1>"""

new_h1 = """                                <h1 className="font-serif text-center flex flex-col items-center gap-2 sm:gap-3 mb-8 px-4 w-full">
                                    {userName && (
                                        <span className="text-xl sm:text-2xl lg:text-3xl text-slate-500 font-medium tracking-wide mb-1">
                                            Halo {userName},
                                        </span>
                                    )}
                                    <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 leading-snug">
                                        Karakteristikmu beresonansi dengan
                                    </span>
                                    <div className="flex flex-col items-center mt-3 sm:mt-5">
                                        <span className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none text-center" style={{color: primary.hex}}>
                                            {mainName}
                                        </span>
                                        {subName && (
                                            <span className="text-xl sm:text-2xl lg:text-3xl font-medium mt-3 sm:mt-4 text-center" style={{color: primary.hex, opacity: 0.85}}>
                                                {subName}
                                            </span>
                                        )}
                                    </div>
                                </h1>"""
content = content.replace(old_h1, new_h1)

with open('public/index.html', 'w') as f:
    f.write(content)

print("Heading format applied.")
