import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Add Toast state and function to ResultDashboard
old_result_init = """        const ResultDashboard = ({ userName, answers, transitionTo, isFading }) => {
            const resultRef = useRef(null);
            const exportRef = useRef(null);
            const pdfRef = useRef(null);
            const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
            const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);"""

new_result_init = """        const ResultDashboard = ({ userName, answers, transitionTo, isFading }) => {
            const resultRef = useRef(null);
            const exportRef = useRef(null);
            const pdfRef = useRef(null);
            const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
            const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
            const [toastMessage, setToastMessage] = useState(null);
            
            const showToast = (message) => {
                setToastMessage(message);
                setTimeout(() => setToastMessage(null), 3000);
            };"""
content = content.replace(old_result_init, new_result_init)

# 2. Replace alerts with showToast in ResultDashboard
# PDF Error alert
content = content.replace('alert("Maaf, terjadi kesalahan saat menyusun dokumen rapor.");', 'showToast("Gagal menyusun PDF. Silakan coba lagi.");')

# Copy clipboard alerts
content = content.replace('alert("Teks berhasil disalin ke clipboard! Silakan paste di sosial mediamu.");', 'showToast("Tautan berhasil disalin ke clipboard!");')
content = content.replace('alert("Teks dan tautan berhasil disalin ke clipboard! (Fitur Web Share tidak didukung di browsermu).");', 'showToast("Tautan berhasil disalin ke clipboard!");')

# Image Error alert
content = content.replace('alert("Maaf, terjadi kesalahan saat menyimpan gambar.");', 'showToast("Gagal menyimpan gambar. Silakan coba lagi.");')

# 3. Inject the Toast UI component at the end of ResultDashboard return block
old_return_end = """                        {/* Reset Confirm Modal passed down from App if needed, or handled via button */}
                    </div>
                </main>
            );"""

new_return_end = """                        {/* Reset Confirm Modal passed down from App if needed, or handled via button */}
                    </div>
                    
                    {/* Toast Notification */}
                    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                        <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
                        </div>
                    </div>
                </main>
            );"""
content = content.replace(old_return_end, new_return_end)


with open('public/index.html', 'w') as f:
    f.write(content)

print("Alerts replaced with Toast Notifications.")
