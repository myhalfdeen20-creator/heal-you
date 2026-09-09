import re

with open('public/index.html', 'r') as f:
    content = f.read()

old_pdf_canvas_config = """                    const canvas = await html2canvas(pdfRef.current, {
                        scale: 2,
                        backgroundColor: "#ffffff",
                        useCORS: true,
                        logging: false,
                        windowWidth: pdfRef.current.scrollWidth,
                        windowHeight: pdfRef.current.scrollHeight,
                    });"""

new_pdf_canvas_config = """                    const canvas = await html2canvas(pdfRef.current, {
                        scale: 3,
                        backgroundColor: "#FDFDFE",
                        useCORS: true,
                        logging: false,
                        windowWidth: pdfRef.current.scrollWidth,
                        windowHeight: pdfRef.current.scrollHeight,
                    });"""

content = content.replace(old_pdf_canvas_config, new_pdf_canvas_config)

with open('public/index.html', 'w') as f:
    f.write(content)
