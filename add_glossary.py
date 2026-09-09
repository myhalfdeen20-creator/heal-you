import re

with open('public/index.html', 'r') as f:
    content = f.read()

glossary_def = """
        const PSYCH_GLOSSARY = {
            "Somatic Grounding": "Teknik untuk menenangkan sistem saraf yang sedang panik (hyper-arousal) dengan fokus pada sensasi fisik, seperti memberikan kehangatan, tekanan (diselimuti), atau sentuhan fisik yang aman, sehingga mengembalikan otak ke realitas saat ini.",
            "Cognitive Restructuring": "Sebuah proses terapi untuk mengidentifikasi dan menantang pikiran-pikiran negatif atau irasional, kemudian menggantinya dengan pemikiran yang lebih logis, positif, dan berbasis bukti nyata.",
            "Crisis Intervention": "Tindakan segera dan terarah yang diberikan kepada seseorang yang sedang mengalami trauma atau krisis akut, bertujuan untuk mencegah kerusakan psikologis lebih lanjut dan mengembalikan stabilitas mental dasar.",
            "secure attachment": "Gaya kelekatan psikologis yang sehat, di mana seseorang merasa aman, nyaman, dan percaya diri dalam hubungan, serta mampu menjadi tempat bersandar yang menenangkan bagi orang lain tanpa rasa cemas atau takut ditinggalkan.",
            "Fungsi Eksekutif": "Kemampuan kognitif tingkat tinggi di otak (korteks prefrontal) yang mengatur perencanaan, fokus, pengendalian impuls, dan penyelesaian masalah secara terstruktur, terutama di bawah tekanan.",
            "disosiasi traumatis": "Mekanisme pertahanan mental ekstrem di mana seseorang 'memisahkan diri' dari kenyataan atau kesadarannya untuk menghindari rasa sakit akibat trauma emosional yang terlalu berat.",
            "behavioral-driven": "Pendekatan atau solusi yang digerakkan oleh tindakan/perilaku nyata, bukan sekadar teori atau kata-kata.",
            "mirror neurons": "Sel-sel saraf di otak yang bereaksi dan meniru emosi atau tindakan orang lain yang kita lihat, memungkinkan manusia untuk merasakan empati dan menyelaraskan perilaku secara kolektif.",
            "act of service": "Bahasa cinta atau ekspresi empati yang ditunjukkan melalui tindakan pelayanan atau pengabdian nyata kepada orang lain.",
            "coping mechanism": "Cara atau strategi sadar maupun tidak sadar yang digunakan seseorang untuk menghadapi, mengurangi, atau mentolerir stres dan masalah psikologis.",
            "trait": "Sifat bawaan atau karakteristik kepribadian yang menetap dan mendefinisikan identitas asli seseorang.",
            "disonansi kognitif": "Rasa tidak nyaman dan konflik batin yang parah akibat memegang dua atau lebih nilai, keyakinan, atau ide yang saling bertentangan secara bersamaan.",
            "behavioral reframing": "Mengubah cara pandang atau perasaan terhadap suatu masalah dengan cara mengubah tindakan atau perilaku fisik secara nyata, yang pada akhirnya akan merombak pola pikir.",
            "PTSD": "Gangguan Stres Pascatrauma; kondisi kesehatan mental yang dipicu oleh peristiwa traumatis masa lalu yang menyebabkan kecemasan parah, kilas balik, dan ketidakberdayaan.",
            "core wound": "Luka batin terdalam (sering terbentuk di masa lalu) yang menjadi akar dari ketakutan atau respons emosional negatif seseorang, seperti rasa takut diabaikan atau ditolak.",
            "mindfulness": "Praktik memusatkan perhatian penuh pada momen saat ini secara sadar, menerima perasaan dan pikiran tanpa menghakimi, sangat efektif menenangkan sistem saraf.",
            "Psychological Resilience": "Ketahanan mental atau kemampuan seseorang untuk bangkit kembali, beradaptasi, dan bahkan tumbuh menjadi lebih kuat setelah mengalami penderitaan atau trauma berat.",
            "strict healthy boundaries": "Batasan emosional dan fisik yang tegas, sehat, dan jelas untuk melindungi diri dari manipulasi, eksploitasi, atau pelanggaran nilai, tanpa kompromi berlebihan.",
            "people pleasing": "Kecenderungan untuk selalu berusaha menyenangkan orang lain dan mengorbankan diri sendiri, biasanya didasari oleh rasa takut akan penolakan atau konflik.",
            "Rejection": "Rasa sakit emosional akibat penolakan, pengasingan, atau tidak diterimanya seseorang oleh individu atau kelompok lain.",
            "Cognitive Reframing": "Teknik mengubah perspektif atau cara seseorang melihat dan memaknai sebuah peristiwa, merombak sudut pandang negatif menjadi makna yang memberdayakan dan positif.",
            "observational learning": "Proses belajar yang terjadi murni melalui pengamatan yang sangat teliti terhadap perilaku orang lain, merekam detail-detail kecil untuk ditiru atau dijaga dengan presisi.",
            "detail-oriented": "Kemampuan untuk sangat memperhatikan, merekam, dan mengeksekusi detail-detail kecil dengan tingkat akurasi yang tinggi."
        };
"""

# Insert glossary before ResultDashboard
content = content.replace('// Result Dashboard (Bento Box Layout)', glossary_def + '\n        // Result Dashboard (Bento Box Layout)')

with open('public/index.html', 'w') as f:
    f.write(content)

print("Glossary added.")
