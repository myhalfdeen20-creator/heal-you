const fs = require('fs');

const content = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HealYou - Karakter Perempuan & Ummul Mukminin</title>

    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- html2canvas for Export/Share Feature -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        :root {
            --bg-base: #F7F5F0;
        }

        body {
            background-color: var(--bg-base);
            /* Subtle, elegant mesh gradient background */
            background-image: 
                radial-gradient(at 10% 0%, rgba(212, 228, 220, 0.7) 0px, transparent 50%),
                radial-gradient(at 90% 10%, rgba(245, 235, 220, 0.8) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(212, 228, 220, 0.6) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(245, 235, 220, 0.7) 0px, transparent 50%);
            background-attachment: fixed;
            color: #334155; 
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
        }

        h1, h2, h3, h4, .font-serif {
            font-family: 'Playfair Display', serif;
        }

        /* Modern Glass Panel / Bento Box Style */
        .glass-panel {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 
                0 4px 24px -8px rgba(0, 0, 0, 0.04),
                inset 0 0 0 1px rgba(255,255,255,0.4);
        }

        /* Smooth transitions */
        .fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        
        .stagger-1 { animation-delay: 100ms; }
        .stagger-2 { animation-delay: 200ms; }
        .stagger-3 { animation-delay: 300ms; }
        .stagger-4 { animation-delay: 400ms; }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* Buttons & Interactions */
        .btn-primary {
            background: #2C3E35;
            color: #ffffff;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 14px rgba(44, 62, 53, 0.15);
        }
        .btn-primary:hover {
            background: #1F2C25;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(44, 62, 53, 0.25);
        }
        
        .btn-secondary {
            background: rgba(255,255,255,0.8);
            border: 1px solid rgba(0,0,0,0.05);
            color: #475569;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-secondary:hover {
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            color: #1e293b;
        }

        .option-card {
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.8);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .option-card:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-3px);
            box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
            border-color: #fff;
        }

        /* Hide tap highlight on mobile */
        * { -webkit-tap-highlight-color: transparent; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // --- 1. DATA UMMUL MUKMININ ---
        const ARCHETYPES = [
            {
                id: "khadijah",
                name: "Khadijah binti Khuwailid",
                epithet: "Pendukung Penuh Kasih & Visioner",
                hex: "#0d6b52",
                shortSummary: "Bagimu, menjadi sandaran bagi orang-orang tersayang adalah panggilan jiwa. Kamu memancarkan kehangatan, rasa aman, dan pandangan jauh ke depan.",
                history: "Khadijah RA hadir sebagai pendukung pertama bagi Rasulullah SAW. Saat beliau gelisah, Khadijah menenangkan dengan kelembutan. Intuisi dan keyakinannya begitu kuat memeluk kebenaran di saat yang lain masih ragu.",
                roleDynamics: "Sejak muda, kamu tumbuh dengan kedewasaan hati. Sebagai teman atau pasangan, kamu adalah tempat bersandar yang menenangkan. Kasih sayangmu menanamkan kemandirian sekaligus perlindungan yang utuh bagi keluargamu.",
                wisdom: [
                    "Mampu menenangkan kecemasan orang di sekitar dengan ketenangan batin.",
                    "Memiliki kepekaan melihat dan memvalidasi kebaikan orang lain.",
                    "Berani mendukung penuh kebaikan yang diyakini di dalam hati."
                ]
            },
            {
                id: "saudah",
                name: "Saudah binti Zam'ah",
                epithet: "Hati yang Lapang & Penjaga Keharmonisan",
                hex: "#c96a3f",
                shortSummary: "Kamu sangat peduli pada kebersamaan dan kedamaian. Bagimu, mengalah bukanlah sebuah kekalahan, melainkan cara yang indah untuk menjaga kerukunan.",
                history: "Saudah RA adalah wanita mulia yang mengasuh putri-putri Rasulullah dengan penuh kehangatan. Ia menggunakan kelapangan dada dan selera humornya yang khas untuk mencairkan suasana, menjadikannya penjaga keharmonisan keluarga.",
                roleDynamics: "Di mana pun berada, kamu selalu bisa mencairkan suasana. Kamu membawa kedamaian dan menjauhkan lingkunganmu dari perselisihan. Kehangatanmu merangkul siapa saja layaknya keluargamu sendiri.",
                wisdom: [
                    "Rela mengalah demi kebaikan dan keharmonisan bersama.",
                    "Menggunakan kelembutan dan candaan ringan untuk meredakan ketegangan.",
                    "Memiliki hati yang bebas dari rasa iri, bahagia melihat orang lain bahagia."
                ]
            },
            {
                id: "aisyah",
                name: "Aisyah binti Abu Bakar",
                epithet: "Pikiran Cerdas & Semangat Belajar Tinggi",
                hex: "#c2760c",
                shortSummary: "Rasa ingin tahumu seolah tak pernah padam. Kamu melihat dunia melalui pikiran yang kritis, ingatan yang kuat, dan kejujuran hati yang tulus.",
                history: "Aisyah RA adalah sosok perempuan cerdas yang banyak meriwayatkan hadits. Ia sangat gemar belajar, bertanya, dan berdiskusi untuk memahami ilmu lebih dalam. Emosinya yang jujur mencerminkan kecerdasannya yang berpadu dengan kepekaan.",
                roleDynamics: "Sejak kecil kamu dipenuhi rasa ingin tahu yang besar. Kamu adalah teman bicara yang menyenangkan dan cerdas. Semangat belajarmu menginspirasi dan mendidik orang-orang di sekitarmu.",
                wisdom: [
                    "Menjadikan rasa ingin tahu dan proses belajar sebagai sebuah kebaikan.",
                    "Berani bertanya dan berdiskusi untuk memahami sesuatu dengan benar.",
                    "Jujur pada perasaan sendiri dan tidak menyimpannya menjadi beban."
                ]
            },
            {
                id: "hafshah",
                name: "Hafshah binti Umar",
                epithet: "Penjaga Amanah & Prinsip yang Kuat",
                hex: "#33348e",
                shortSummary: "Keteraturan dan kedisiplinan membuatmu merasa aman. Kamu sangat menghargai prinsip yang benar dan sangat bisa diandalkan dalam menjaga amanah.",
                history: "Hafshah RA dikenal dengan keteguhan prinsipnya. Karena sifatnya yang sangat amanah dan dapat dipercaya, ia diberi tanggung jawab besar menjaga lembaran asli Al-Qur'an pertama. Ia adalah sosok pelindung kebenaran.",
                roleDynamics: "Kamu tumbuh dengan memegang teguh apa yang benar. Kamu sangat menghargai batasan dan kejujuran. Sikap disiplinmu membawa keteraturan dan melindungi nama baik keluargamu.",
                wisdom: [
                    "Sangat berhati-hati dan teliti dalam mengemban amanah.",
                    "Tidak mudah terbawa arus, selalu berpegang pada fakta dan kebenaran.",
                    "Menjaga prinsip dengan tegas demi melindungi nilai-nilai kebaikan."
                ]
            },
            {
                id: "ummusalamah",
                name: "Ummu Salamah",
                epithet: "Pemikir Tenang & Penemu Solusi",
                hex: "#15746b",
                shortSummary: "Di saat orang lain mungkin kebingungan, kamu justru mampu melihat jalan keluar. Kamu adalah sosok penengah dan penyelesai masalah yang bijaksana.",
                history: "Ummu Salamah RA adalah sosok yang sangat bijak. Pada peristiwa Hudaibiyah, ketika suasana sedang genting, ia memberikan saran cemerlang kepada Rasulullah untuk memberi contoh tindakan langsung, yang akhirnya menenangkan semua orang.",
                roleDynamics: "Pengalaman hidup membuat batinmu sangat tangguh. Kamu bukan hanya pendamping yang baik, tapi juga penasihat yang menenangkan. Pemikiranmu yang jernih selalu membantu keluargamu melangkah ke arah yang lebih baik.",
                wisdom: [
                    "Mampu berpikir jernih dan tenang di saat-saat yang sulit.",
                    "Percaya bahwa contoh tindakan jauh lebih menyentuh hati daripada kata-kata.",
                    "Mengubah kesulitan di masa lalu menjadi kebijaksanaan untuk menuntun sesama."
                ]
            },
            {
                id: "zainabkhuzaimah",
                name: "Zainab binti Khuzaimah",
                epithet: "Hati yang Penuh Empati & Pengasih",
                hex: "#8b5cf6",
                shortSummary: "Hidupmu diwarnai oleh ketulusan untuk peduli pada sesama. Kepedulianmu pada orang yang kesulitan mengalir begitu saja, tanpa mengharap balasan.",
                history: "Dikenal dengan julukan 'Ibundanya Orang-Orang Miskin', Zainab binti Khuzaimah RA memiliki empati yang luar biasa tulus. Kasih sayangnya menyentuh mereka yang terpinggirkan, memberikan kehangatan bagi yang membutuhkan.",
                roleDynamics: "Kamu memiliki kepekaan rasa yang tinggi terhadap keadaan sekitarmu. Kehadiranmu membawa keteduhan bagi banyak orang. Kepedulianmu melampaui batas keluarga, menyentuh siapapun yang butuh pertolongan.",
                wisdom: [
                    "Menemukan kebahagiaan sejati dalam berbagi dan menolong sesama.",
                    "Memiliki kepekaan hati yang sangat halus terhadap kesedihan orang lain.",
                    "Mengubah ujian hidup menjadi dorongan untuk menyembuhkan luka sesama."
                ]
            },
            {
                id: "zainabjahsy",
                name: "Zainab binti Jahsy",
                epithet: "Jiwa Mandiri & Pekerja Keras",
                hex: "#8a4b32",
                shortSummary: "Kamu bangga bisa berdiri di atas kakimu sendiri. Bagimu, nilai diri seseorang tidak diukur dari kedudukan, melainkan dari karya dan kebaikannya.",
                history: "Zainab binti Jahsy RA adalah perempuan terhormat yang tidak sungkan bekerja dengan tangannya sendiri. Ia rajin menyamak kulit dan menjahit, lalu dengan bangga menyedekahkan hasil kerjanya. Kemandiriannya adalah jalan kebaikannya.",
                roleDynamics: "Kamu tidak suka berpangku tangan dan lebih memilih untuk berusaha sendiri. Semangat kerjamu membawa energi positif. Kemandirian yang kamu miliki menjadi teladan indah bagi generasi setelahmu.",
                wisdom: [
                    "Memahami bahwa kehormatan diri berasal dari karya yang bermanfaat.",
                    "Merasakan kebebasan dan ketenangan hati melalui kemandirian.",
                    "Senang bekerja keras agar bisa lebih banyak memberi dan berbagi."
                ]
            },
            {
                id: "juwairiyah",
                name: "Juwairiyah binti Al-Harits",
                epithet: "Penyembuh Luka & Penuh Kedamaian",
                hex: "#059669",
                shortSummary: "Kamu memiliki cara yang luar biasa dalam memulihkan dirimu. Keteduhan hati dan ibadah adalah jalan utamamu untuk menemukan kedamaian saat menghadapi kesulitan.",
                history: "Juwairiyah RA membawa keberkahan dan kedamaian besar bagi kaumnya. Setelah melewati masa-masa sulit, ia memelihara ketenangan batinnya dengan rajin berdzikir dan beribadah dari pagi hingga waktu Dhuha.",
                roleDynamics: "Tantangan hidup mungkin memaksamu untuk cepat dewasa, tapi kamu menghadapinya dengan sabar. Kehadiranmu membawa aura damai yang meredakan ketegangan. Kamu mencontohkan bagaimana kedekatan dengan Tuhan menyembuhkan segalanya.",
                wisdom: [
                    "Menemukan ketenangan dari rasa cemas melalui doa dan kedekatan spiritual.",
                    "Tidak membiarkan kesulitan masa lalu menghalangi kebaikan di masa depan.",
                    "Membawa kedamaian secara alami bagi lingkungan yang sedang tidak rukun."
                ]
            },
            {
                id: "ummuhabibah",
                name: "Ummu Habibah",
                epithet: "Keteguhan Hati & Prinsip yang Melindungi",
                hex: "#b91c1c",
                shortSummary: "Ketahanan hatimu sangat mengagumkan. Kamu mampu menjaga jarak dan melindungi hal yang kamu yakini benar, meski harus merasa sendiri.",
                history: "Ummu Habibah RA pernah mengalami masa-masa terasing saat mempertahankan keimanannya. Dalam kesendirian, keteguhan prinsipnya justru semakin kuat. Kesetiaannya pada kebenaran melampaui ikatan apa pun.",
                roleDynamics: "Kamu berani memegang prinsip meski harus berbeda dari banyak orang. Kesetiaanmu pada hal yang benar sangatlah kuat. Kamu menjadi pelindung yang kokoh bagi keluargamu dari hal-hal yang kurang baik.",
                wisdom: [
                    "Mampu memegang teguh keyakinan dasar meski berada di lingkungan yang berbeda.",
                    "Berani menjaga jarak dari hal-hal yang bisa merusak nilai kebaikanmu.",
                    "Setia tanpa keraguan pada prinsip-prinsip hidup yang benar dan lurus."
                ]
            },
            {
                id: "shafiyyah",
                name: "Shafiyyah binti Huyay",
                epithet: "Pemaaf & Pengubah Luka Menjadi Kekuatan",
                hex: "#0369a1",
                shortSummary: "Kamu sangat ahli dalam mengubah kesedihan menjadi kelembutan. Saat orang lain mencoba merendahkanmu, kamu menanggapinya dengan hati yang lapang dan membuktikan kebaikanmu.",
                history: "Shafiyyah RA kadang dihadapkan pada ucapan kurang menyenangkan terkait latar belakangnya. Namun dengan bimbingan Rasulullah, ia mengubah hal itu menjadi kebanggaan. Ia membalas ketidakadilan dengan kesetiaan dan kesabaran.",
                roleDynamics: "Jika kamu pernah dipojokkan karena prasangka, kamu membalasnya dengan senyuman dan karya. Kamu mendidik orang-orang di sekitarmu untuk bangga pada diri mereka sendiri dan membalas kata-kata buruk dengan keanggunan budi.",
                wisdom: [
                    "Mampu memaafkan dan mengubah prasangka buruk menjadi kekuatan diri.",
                    "Menghadapi perasaan sedih dengan hati yang lapang dan sabar.",
                    "Membuktikan bahwa masa lalu tidak menentukan seberapa baik masa depan seseorang."
                ]
            },
            {
                id: "maimunah",
                name: "Maimunah binti Al-Harits",
                epithet: "Pengamat yang Teliti & Penjaga Keteraturan",
                hex: "#4f46e5",
                shortSummary: "Kamu memiliki ketelitian yang sangat baik. Perhatianmu pada hal-hal kecil di sekitarmu membuat hidup terasa lebih teratur dan menenangkan.",
                history: "Maimunah RA sangat teliti dalam memperhatikan tata cara ibadah dan kebiasaan sehari-hari Nabi Muhammad SAW. Banyak orang datang padanya untuk menanyakan detail-detail penting. Keteraturannya membawa ketenangan.",
                roleDynamics: "Kamu adalah sosok tenang yang selalu memperhatikan detail kecil yang sering terlewat oleh orang lain. Kerapian dan rutinitasmu memberikan rasa aman dan nyaman bagi siapa saja yang berada di dekatmu.",
                wisdom: [
                    "Merasakan kedamaian dengan cara merapikan hal-hal kecil di sekitar.",
                    "Menjadi sosok yang dipercaya karena ketelitian dan kehati-hatianmu.",
                    "Menciptakan rasa aman melalui keteraturan dan kebiasaan yang baik."
                ]
            }
        ];

        // --- 2. DATA PERTANYAAN (55 SOAL PRESISI) ---
        const RAW_QUESTIONS = [
            // Khadijah
            { a: "khadijah", t: "Saat orang terdekatku ragu pada diri mereka, aku bisa melihat potensi mereka dan menguatkannya." },
            { a: "khadijah", t: "Aku merasa bahagia saat bisa memberikan dukungan penuh untuk hal baik yang diyakini bersama." },
            { a: "khadijah", t: "Di situasi yang membingungkan, aku biasanya bisa tetap tenang dan menenangkan sekitarku." },
            { a: "khadijah", t: "Aku ikut senang, bukan merasa tersaingi, ketika pasanganku atau temanku meraih kesuksesan besar." },
            { a: "khadijah", t: "Menghadapi kesulitan tidak membuatku panik, selama kami tetap memiliki tujuan yang sama." },
            // Saudah
            { a: "saudah", t: "Aku lebih memilih mengalah untuk menjaga kedamaian, daripada menang berdebat tapi merusak hubungan." },
            { a: "saudah", t: "Aku sering menggunakan candaan ringan untuk mencairkan suasana yang kaku atau tegang." },
            { a: "saudah", t: "Melihat keluargaku hidup rukun dan damai sudah memberiku kebahagiaan yang sangat cukup." },
            { a: "saudah", t: "Melihat orang lain mendapat pujian atau posisi yang lebih baik tidak membuatku merasa iri." },
            { a: "saudah", t: "Aku tidak keberatan menertawakan kecanggunganku sendiri demi membuat orang lain merasa nyaman." },
            // Aisyah
            { a: "aisyah", t: "Jika ada hal yang terasa kurang pas, aku suka bertanya dan mencari tahu sampai aku benar-benar paham." },
            { a: "aisyah", t: "Aku cenderung jujur tentang apa yang kurasakan (sedih, senang, atau kecewa) tanpa banyak menutupinya." },
            { a: "aisyah", t: "Aku sangat suka belajar hal baru; rasa ingin tahuku tentang banyak hal sangat besar." },
            { a: "aisyah", t: "Aku butuh berdiskusi atau mengutarakan pendapatku dulu sebelum bisa menerima sebuah keputusan." },
            { a: "aisyah", t: "Aku sangat peka dan mudah menyadari jika suasana hati seseorang sedang berubah." },
            // Hafshah
            { a: "hafshah", t: "Aku selalu memastikan kebenaran sebuah cerita sebelum mempercayai atau membagikannya." },
            { a: "hafshah", t: "Orang-orang sering mempercayaiku untuk menyimpan rahasia karena aku sangat menjaga amanah." },
            { a: "hafshah", t: "Memiliki jadwal dan aturan yang jelas membuatku merasa lebih tenang dan nyaman." },
            { a: "hafshah", t: "Aku merasa kurang nyaman jika kesepakatan yang sudah dibuat tiba-tiba diubah tanpa dibicarakan." },
            { a: "hafshah", t: "Aku lebih memilih bersikap tegas daripada harus berpura-pura setuju pada sesuatu yang salah." },
            // Ummu Salamah
            { a: "ummusalamah", t: "Saat terjadi masalah besar dan orang lain panik, aku justru mulai memikirkan jalan keluarnya." },
            { a: "ummusalamah", t: "Aku percaya bahwa memberikan contoh lewat tindakan jauh lebih baik daripada banyak berbicara." },
            { a: "ummusalamah", t: "Pengalaman sulit di masa lalu membuatku tumbuh menjadi orang yang lebih tenang dan sabar." },
            { a: "ummusalamah", t: "Jika rencanaku gagal, aku tidak akan lama meratapinya, melainkan langsung mencari cara lain." },
            { a: "ummusalamah", t: "Aku bisa merasakan kapan waktu yang tepat untuk bertindak dan kapan sebaiknya aku diam sejenak." },
            // Zainab binti Khuzaimah
            { a: "zainabkhuzaimah", t: "Keinginanku untuk membantu mereka yang kesulitan sering kali lebih besar dari kepentingan pribadiku." },
            { a: "zainabkhuzaimah", t: "Berbagi dan membantu orang lain adalah salah satu cara terbaikku untuk merasa lebih bahagia." },
            { a: "zainabkhuzaimah", t: "Aku mudah merasa sedih saat melihat orang lain atau makhluk hidup lain kesusahan." },
            { a: "zainabkhuzaimah", t: "Aku selalu ingin memastikan semua orang di sekitarku merasa nyaman dan diperhatikan." },
            { a: "zainabkhuzaimah", t: "Orang yang baru kukenal sering merasa nyaman bercerita tentang masalah mereka kepadaku." },
            // Zainab binti Jahsy
            { a: "zainabjahsy", t: "Aku merasa bangga pada apa yang kudapatkan dari hasil usaha dan kerja kerasku sendiri." },
            { a: "zainabjahsy", t: "Aku sangat menghargai kemandirian dan tidak ingin terlalu bergantung pada bantuan orang lain." },
            { a: "zainabjahsy", t: "Bisa berbagi atau bersedekah dari hasil jerih payahku sendiri memberiku kebahagiaan luar biasa." },
            { a: "zainabjahsy", t: "Aku terkadang merasa sungkan atau tidak nyaman jika menerima sesuatu tanpa usaha." },
            { a: "zainabjahsy", t: "Bagiku, kehormatan seseorang dilihat dari seberapa banyak ia bisa memberi dan berkarya." },
            // Juwairiyah
            { a: "juwairiyah", t: "Saat merasa lelah atau banyak pikiran, aku mencari ketenangan melalui ibadah dan doa yang panjang." },
            { a: "juwairiyah", t: "Kehadiranku sering kali secara tidak langsung membawa suasana damai bagi teman-teman yang sedang berselisih." },
            { a: "juwairiyah", t: "Berdzikir atau melakukan rutinitas ibadah sangat membantuku untuk merasa tenang kembali." },
            { a: "juwairiyah", t: "Aku sadar bahwa sikap tenangku bisa membantu meredakan konflik di sekitarku." },
            { a: "juwairiyah", t: "Aku mudah memaafkan kesalahan orang lain karena aku mencoba mengerti apa yang mungkin mereka alami." },
            // Ummu Habibah
            { a: "ummuhabibah", t: "Aku bisa bersikap tegas menolak sesuatu, bahkan pada orang terdekat, jika hal itu bertentangan dengan keyakinanku." },
            { a: "ummuhabibah", t: "Berbeda pendapat dengan banyak orang tidak akan membuatku mengubah prinsip yang kuyakini benar." },
            { a: "ummuhabibah", t: "Aku akan menjaga jarak jika seseorang terus-menerus mengabaikan nilai-nilai kebaikan yang aku hormati." },
            { a: "ummuhabibah", t: "Jika batas kesabaranku sudah dilewati berkali-kali, aku bisa melepaskan ikatan kedekatan dengan seseorang." },
            { a: "ummuhabibah", t: "Aku bisa tetap bersikap ramah pada seseorang, meskipun di dalam hati aku membatasi kedekatan dengannya." },
            // Shafiyyah
            { a: "shafiyyah", t: "Saat seseorang membicarakan keburukan masa laluku, aku memilih untuk membuktikan diriku lewat kebaikan, bukan amarah." },
            { a: "shafiyyah", t: "Walau merasa sedih saat diperlakukan tidak adil, aku menyimpannya dengan sabar tanpa rasa dendam." },
            { a: "shafiyyah", t: "Tantangan dan kesedihan di masa lalu justru membuatku menjadi sosok yang lebih setia dan tulus." },
            { a: "shafiyyah", t: "Aku tidak membiarkan komentar negatif orang lain menentukan bagaimana aku menilai diriku sendiri." },
            { a: "shafiyyah", t: "Semakin aku diremehkan, semakin kuat keinginanku untuk membuktikan bahwa diriku berharga melalui kebaikan." },
            // Maimunah
            { a: "maimunah", t: "Aku sangat teliti dan sering memperhatikan hal-hal kecil atau kebiasaan orang di sekitarku." },
            { a: "maimunah", t: "Merapikan barang-barang atau melakukan rutinitas sederhana membantuku merasa lebih tenang saat pikiran sedang penuh." },
            { a: "maimunah", t: "Banyak teman yang bertanya kepadaku jika mereka lupa akan detail sebuah kejadian atau aturan tertentu." },
            { a: "maimunah", t: "Aku cepat menyadari jika ada sesuatu yang tidak pada tempatnya atau ada hal kecil yang terlewat." },
            { a: "maimunah", t: "Keteraturan, kebersihan, dan kepastian dalam hal-hal kecil memberiku rasa nyaman yang mendalam." }
        ];

        // Shuffle array safely
        const shuffleArray = (array) => {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        // --- 3. KOMPONEN IKON & AVATAR ---
        const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
        const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
        const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
        const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

        const FacelessAvatar = ({ colorHex, size = "large" }) => {
            const dims = size === "large" ? "w-32 h-32" : "w-16 h-16 sm:w-20 sm:h-20";
            return (
                <div className={\`relative \${dims} flex items-center justify-center rounded-full bg-white shadow-sm overflow-hidden border border-white\`} style={{boxShadow: \`0 10px 30px -10px \${colorHex}40\`}}>
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="150" cy="50" r="4" fill={colorHex} opacity="0.15"/>
                        <circle cx="40" cy="80" r="3" fill={colorHex} opacity="0.1"/>
                        <circle cx="160" cy="140" r="5" fill={colorHex} opacity="0.1"/>
                        <path d="M40 220 Q100 130 160 220 Z" fill={colorHex} opacity="0.85" />
                        <path d="M60 160 Q100 40 140 160 Q100 190 60 160 Z" fill={colorHex} opacity="0.95" />
                        <ellipse cx="100" cy="95" rx="20" ry="26" fill="#F4E3D7" />
                        <path d="M75 90 Q100 120 125 90 Q120 170 100 175 Q80 170 75 90 Z" fill={colorHex} opacity="0.9" />
                    </svg>
                </div>
            );
        };

        // --- 4. KOMPONEN UI ---
        
        // Welcome Screen
        const WelcomeScreen = ({ onStart, onResume, onReset, savedIndex, isFading }) => (
            <main className={\`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-opacity duration-700 \${isFading ? 'opacity-0' : 'opacity-100 fade-in'}\`}>
                <article className="glass-panel max-w-3xl w-full rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" aria-hidden="true"></div>
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl" aria-hidden="true"></div>

                    <div className="relative z-10">
                        <header className="slide-up stagger-1">
                            <div className="inline-flex items-center justify-center p-3.5 bg-white/80 backdrop-blur-md rounded-2xl text-[#2C3E35] mb-6 shadow-sm border border-white/50" aria-hidden="true">
                                <SparklesIcon />
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 mb-6 leading-[1.15] tracking-tight">
                                Kenali Karaktermu Lewat<br className="hidden sm:block" /> Kisah Ummul Mukminin
                            </h1>
                        </header>
                        
                        <section className="slide-up stagger-2">
                            <p className="text-slate-600 mb-10 leading-relaxed text-sm sm:text-base max-w-lg mx-auto font-medium">
                                Selamat datang di ruang refleksi ini. Melalui kuesioner singkat, kita akan melihat sisi mana dari karakter istri-istri Nabi Muhammad SAW yang paling dekat dengan dirimu. Jawablah dengan jujur sesuai kata hatimu.
                            </p>

                            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl text-sm mb-10 text-left border border-white/60 shadow-sm max-w-xl mx-auto" role="note">
                                <strong className="block mb-3 text-base font-semibold text-slate-800 flex items-center gap-2">
                                    <LeafIcon aria-hidden="true" /> Catatan Refleksi
                                </strong>
                                <ul className="space-y-3 text-slate-600 font-medium">
                                    <li className="flex gap-3"><span className="text-emerald-500/70" aria-hidden="true">•</span> Jawablah berdasarkan apa yang paling menggambarkan dirimu saat ini.</li>
                                    <li className="flex gap-3"><span className="text-emerald-500/70" aria-hidden="true">•</span> Tidak ada jawaban salah. Setiap keunikanmu sangat berharga.</li>
                                    <li className="flex gap-3"><span className="text-emerald-500/70" aria-hidden="true">•</span> Jawabanmu tersimpan di perangkatmu agar bisa dilanjutkan kapan saja.</li>
                                </ul>
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 slide-up stagger-3">
                            {savedIndex > 0 ? (
                                <>
                                    <button onClick={onResume} className="btn-primary w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                                        Lanjutkan (Soal {savedIndex + 1}) <ArrowRightIcon aria-hidden="true" />
                                    </button>
                                    <button onClick={onReset} className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold">
                                        Mulai dari Awal
                                    </button>
                                </>
                            ) : (
                                <button onClick={onStart} className="btn-primary w-full sm:w-auto px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3">
                                    Mulai Refleksi <ArrowRightIcon aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </div>
                </article>
            </main>
        );

        // Break Screen
        const BreakScreen = ({ chunkIndex, onContinue, isFading }) => (
            <main className={\`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-opacity duration-700 \${isFading ? 'opacity-0' : 'opacity-100 fade-in'}\`}>
                <section className="glass-panel max-w-md w-full rounded-[2rem] p-10 text-center slide-up" aria-labelledby="break-title">
                    <div className="inline-flex items-center justify-center p-4 bg-white/80 rounded-2xl text-[#2C3E35] mb-6 shadow-sm border border-white" aria-hidden="true">
                        <LeafIcon />
                    </div>
                    <h2 id="break-title" className="text-2xl font-serif text-slate-800 mb-4">Bagian {chunkIndex} Selesai</h2>
                    <p className="text-slate-600 text-sm mb-10 leading-relaxed font-medium">
                        Satu langkah lagi menuju pemahaman diri yang lebih dalam. Terima kasih sudah jujur pada dirimu sendiri sejauh ini.
                    </p>
                    <button onClick={onContinue} className="btn-primary w-full py-4 rounded-xl font-semibold">
                        Tarik Napas & Lanjutkan
                    </button>
                </section>
            </main>
        );

        // Question Board
        const QuestionBoard = ({ question, currentIndex, totalQuestions, onAnswer, isFading }) => {
            const progressPercent = (currentIndex / totalQuestions) * 100;
            const currentChunkIndex = Math.floor(currentIndex / 11) + 1;
            const totalChunks = Math.ceil(totalQuestions / 11);

            return (
                <main className={\`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-opacity duration-500 \${isFading ? 'opacity-0' : 'opacity-100'}\`}>
                    <section className="max-w-2xl w-full">
                        <header className="mb-10 text-center" aria-label="Progress">
                            <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-5" aria-live="polite">
                                Bagian {currentChunkIndex} dari {totalChunks}
                            </p>
                            <div className="w-full bg-slate-200/50 backdrop-blur-sm h-1 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progressPercent)} aria-valuemin="0" aria-valuemax="100">
                                <div 
                                    className="h-full bg-[#2C3E35] transition-all duration-700 ease-out rounded-full"
                                    style={{ width: \`\${progressPercent}%\` }}
                                ></div>
                            </div>
                        </header>

                        <article className="glass-panel rounded-[2rem] p-8 sm:p-12 mb-8 min-h-[240px] flex items-center justify-center text-center relative">
                            <h2 className="text-xl sm:text-3xl font-serif text-slate-800 leading-snug relative z-10" aria-live="assertive">
                                "{question.t}"
                            </h2>
                        </article>

                        <nav aria-label="Pilihan Jawaban" className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                            {[
                                {val: 1, label: "Sangat Tidak Sesuai"},
                                {val: 2, label: "Kurang Sesuai"},
                                {val: 3, label: "Netral"},
                                {val: 4, label: "Sesuai"},
                                {val: 5, label: "Sangat Sesuai"}
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => onAnswer(opt.val)}
                                    className="option-card flex-1 min-w-[140px] py-4 px-3 rounded-2xl text-slate-700 text-sm font-semibold flex items-center justify-center"
                                    aria-label={\`Pilih \${opt.label}\`}
                                >
                                    <span className="text-center leading-tight">{opt.label}</span>
                                </button>
                            ))}
                        </nav>
                        <p className="text-center text-slate-400 text-xs mt-8 font-medium" aria-hidden="true">
                            Pilih jawaban yang paling mendekati perasaanmu saat ini.
                        </p>
                    </section>
                </main>
            );
        };

        // Result Dashboard (Bento Box Layout)
        const ResultDashboard = ({ result, onReset, isFading }) => {
            const { primary, secondary } = result;
            const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
            const [isDownloading, setIsDownloading] = useState(false);
            const captureRef = useRef(null);

            const handleDownloadImage = async () => {
                if (!captureRef.current) return;
                setIsDownloading(true);
                try {
                    const originalHistoryState = isHistoryExpanded;
                    setIsHistoryExpanded(true); 
                    await new Promise(resolve => setTimeout(resolve, 100));

                    const canvas = await html2canvas(captureRef.current, {
                        scale: 2, 
                        backgroundColor: "#F7F5F0",
                        useCORS: true,
                        logging: false,
                        windowWidth: captureRef.current.scrollWidth,
                    });

                    setIsHistoryExpanded(originalHistoryState);

                    const image = canvas.toDataURL("image/jpeg", 0.9);
                    const link = document.createElement("a");
                    link.href = image;
                    link.download = \`Karakter_\${primary.name.replace(/\\s+/g, '_')}.jpg\`;
                    link.click();
                } catch (error) {
                    console.error("Gagal mengekspor gambar:", error);
                    alert("Maaf, terjadi kesalahan saat menyimpan gambar.");
                } finally {
                    setIsDownloading(false);
                }
            };

            return (
                <main className={\`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-700 \${isFading ? 'opacity-0' : 'opacity-100 fade-in'}\`}>
                    
                    <div className="max-w-5xl mx-auto space-y-6" ref={captureRef}>
                        {/* BENTO GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            
                            {/* Main Identity (Top row, full width) */}
                            <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-8 sm:p-12 text-center slide-up stagger-1 flex flex-col items-center">
                                <FacelessAvatar colorHex={primary.hex} size="large" />
                                <div className="mt-6 mb-4 inline-flex items-center justify-center px-4 py-1.5 bg-white/60 border border-white rounded-full shadow-sm backdrop-blur-md">
                                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{color: primary.hex}}>
                                        {primary.epithet}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 mb-4 px-2 leading-tight">
                                    Beresonansi dengan<br />
                                    <span style={{color: primary.hex}} className="font-semibold">{primary.name}</span>
                                </h1>
                                <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto font-medium">
                                    {primary.shortSummary}
                                </p>
                            </div>

                            {/* Cermin Kepribadian (Left column, 7 spans) */}
                            <div className="glass-panel col-span-1 md:col-span-7 rounded-[2rem] p-8 sm:p-10 slide-up stagger-2 flex flex-col justify-center">
                                <h3 className="text-xs font-bold text-slate-400 mb-5 tracking-widest uppercase">Cermin Kepribadian</h3>
                                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                                    {primary.roleDynamics}
                                </p>
                            </div>

                            {/* Kekuatan Kebaikan (Right column, 5 spans) */}
                            <div className="glass-panel col-span-1 md:col-span-5 rounded-[2rem] p-8 sm:p-10 slide-up stagger-3 flex flex-col justify-center">
                                <h3 className="text-xs font-bold text-slate-400 mb-6 tracking-widest uppercase">Kekuatan Utama</h3>
                                <ul className="space-y-4">
                                    {primary.wisdom.map((w, idx) => (
                                        <li key={idx} className="flex gap-4 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                                            <span className="mt-1" aria-hidden="true">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={primary.hex} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </span>
                                            <span>{w}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Secondary Character (Full width) */}
                            {secondary && (
                                <div className="glass-panel col-span-1 md:col-span-12 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 slide-up stagger-4">
                                    <div className="shrink-0">
                                        <FacelessAvatar colorHex={secondary.hex} size="small" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Sisi Kebaikan Lainnya</p>
                                        <h3 className="text-xl font-serif text-slate-800 mb-2">{secondary.name}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                            Kamu juga memiliki bayangan karakter {secondary.name.split(' ')[0]}, yang terlihat dari kepribadianmu sebagai <span className="font-semibold" style={{color: secondary.hex}}>{secondary.epithet}</span>.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* History Toggle (Full width) */}
                            <div className="col-span-1 md:col-span-12 slide-up stagger-4">
                                <button 
                                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                    className="glass-panel w-full flex items-center justify-between p-6 rounded-2xl text-slate-700 font-semibold transition-all hover:bg-white/90"
                                    aria-expanded={isHistoryExpanded}
                                >
                                    <span>Kisah Inspiratif {primary.name.split(' ')[0]}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={\`transform transition-transform duration-300 \${isHistoryExpanded ? 'rotate-180' : ''}\`}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                
                                {isHistoryExpanded && (
                                    <div className="glass-panel border-t-0 rounded-b-2xl p-6 sm:p-8 -mt-4 pt-8 text-base text-slate-700 leading-relaxed font-medium">
                                        {primary.history}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions (Outside capture area if you prefer, but included here for layout. It will be captured but that's fine or we can put it outside.) */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 slide-up stagger-4" data-html2canvas-ignore>
                            <button onClick={handleDownloadImage} disabled={isDownloading} className="btn-primary flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                                {isDownloading ? "Menyiapkan Gambar..." : <><DownloadIcon /> Simpan Hasil</>}
                            </button>
                            <button onClick={onReset} className="btn-secondary flex-1 py-4 rounded-xl font-semibold">
                                Coba Lagi Nanti
                            </button>
                        </div>
                        
                        <p className="text-center text-slate-400 text-xs font-medium pt-8 pb-4" data-html2canvas-ignore>
                            Dibuat sebagai ruang refleksi sederhana.
                        </p>
                    </div>
                </main>
            );
        };

        // --- 5. MAIN APP COMPONENT ---
        const App = () => {
            const [gameState, setGameState] = useState('welcome');
            const [questions, setQuestions] = useState([]);
            const [currentIndex, setCurrentIndex] = useState(0);
            const [answers, setAnswers] = useState({});
            const [isFading, setIsFading] = useState(false);

            useEffect(() => {
                const savedState = localStorage.getItem('healyou_ummul_mukminin_state');
                if (savedState) {
                    try {
                        const parsed = JSON.parse(savedState);
                        if (parsed.questions && parsed.questions.length > 0) {
                            setQuestions(parsed.questions);
                            setCurrentIndex(parsed.currentIndex || 0);
                            setAnswers(parsed.answers || {});
                        }
                    } catch (e) {
                        console.error("Gagal memuat penyimpanan", e);
                    }
                }
            }, []);

            const saveState = (newCurrentIndex, newAnswers, newQuestions) => {
                const stateToSave = {
                    questions: newQuestions || questions,
                    currentIndex: newCurrentIndex,
                    answers: newAnswers,
                    lastSaved: new Date().toISOString()
                };
                localStorage.setItem('healyou_ummul_mukminin_state', JSON.stringify(stateToSave));
            };

            const transitionTo = (newState, delay = 400) => {
                setIsFading(true);
                setTimeout(() => {
                    setGameState(newState);
                    setIsFading(false);
                }, delay);
            };

            const startNew = () => {
                const shuffled = shuffleArray(RAW_QUESTIONS);
                setQuestions(shuffled);
                setCurrentIndex(0);
                setAnswers({});
                saveState(0, {}, shuffled);
                transitionTo('playing');
            };

            const resume = () => {
                transitionTo('playing');
            };

            const handleAnswer = (val) => {
                const currentQ = questions[currentIndex];
                const newAnswers = { ...answers };
                
                if (!newAnswers[currentQ.a]) {
                    newAnswers[currentQ.a] = 0;
                }
                newAnswers[currentQ.a] += val;

                const nextIndex = currentIndex + 1;
                saveState(nextIndex, newAnswers, questions);

                setIsFading(true);
                setTimeout(() => {
                    setAnswers(newAnswers);
                    setCurrentIndex(nextIndex);
                    
                    if (nextIndex >= questions.length) {
                        setGameState('result');
                    } else if (nextIndex % 11 === 0 && nextIndex !== 0) {
                        setGameState('break');
                    }
                    setIsFading(false);
                }, 300);
            };

            const resetState = () => {
                if (window.confirm("Apakah kamu yakin ingin menghapus progress dan memulai ulang dari awal?")) {
                    localStorage.removeItem('healyou_ummul_mukminin_state');
                    setQuestions([]);
                    setCurrentIndex(0);
                    setAnswers({});
                    transitionTo('welcome');
                }
            };

            const calculateResult = () => {
                const scores = Object.keys(answers).map(archId => ({
                    id: archId,
                    score: answers[archId]
                })).sort((a, b) => b.score - a.score);

                if (scores.length === 0) return { primary: ARCHETYPES[0], secondary: null };

                const primaryArch = ARCHETYPES.find(a => a.id === scores[0].id);
                const secondaryArch = scores.length > 1 && (scores[0].score - scores[1].score <= 3) 
                    ? ARCHETYPES.find(a => a.id === scores[1].id) 
                    : null;

                return { primary: primaryArch, secondary: secondaryArch };
            };

            return (
                <div className="selection:bg-[#2C3E35] selection:text-white relative">
                    {gameState === 'welcome' && (
                        <WelcomeScreen 
                            onStart={startNew} 
                            onResume={resume} 
                            onReset={resetState}
                            savedIndex={currentIndex} 
                            isFading={isFading}
                        />
                    )}
                    
                    {gameState === 'playing' && questions.length > 0 && currentIndex < questions.length && (
                        <QuestionBoard 
                            question={questions[currentIndex]}
                            currentIndex={currentIndex}
                            totalQuestions={questions.length}
                            onAnswer={handleAnswer}
                            isFading={isFading}
                        />
                    )}
                    
                    {gameState === 'break' && (
                        <BreakScreen 
                            chunkIndex={Math.floor(currentIndex / 11)} 
                            onContinue={() => transitionTo('playing')}
                            isFading={isFading}
                        />
                    )}
                    
                    {gameState === 'result' && (
                        <ResultDashboard 
                            result={calculateResult()} 
                            onReset={resetState}
                            isFading={isFading}
                        />
                    )}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
`

fs.writeFileSync('public/index.html', content);
