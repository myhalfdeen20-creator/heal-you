import type { ArchetypeId, DailyPractice } from '../types';

export const MODERN_RELEVANCE: Record<
  ArchetypeId,
  { validation: string; relevance: string }
> = {
  khadijah: {
    validation:
      'Karaktermu adalah bukti bahwa dunia membutuhkan perempuan yang berwawasan luas, mandiri, dan tangguh sepertimu.',
    relevance:
      'Jika saat ini kamu merasa memikul tanggung jawab besar atau sering diandalkan oleh banyak orang, ketahuilah bahwa ketenangan dan kemandirianmu adalah warisan dari Khadijah. Jangan ragu pada kapasitasmu untuk memimpin, berbisnis, atau menjadi pilar utama keluarga. Dunia yang penuh kekhawatiran ini sangat membutuhkan tempat bersandar yang kokoh seperti dirimu.',
  },
  saudah: {
    validation:
      'Kelapangan dadamu membuktikan bahwa kedamaian batin jauh lebih berharga daripada memenangkan ego.',
    relevance:
      'Di dunia modern yang sering mendorong kita untuk terus berkompetisi dan membandingkan diri, sifat mengalahmu terkadang disalahpahami sebagai kelemahan. Padahal, itu adalah bukti ketenteraman batin yang mendalam seperti Saudah. Teruslah menjadi peredam ketegangan; kehadiranmu merawat keharmonisan yang didambakan banyak orang.',
  },
  aisyah: {
    validation:
      'Rasa ingin tahumu yang tajam adalah lentera ilmu yang menerangi lingkungan di sekitarmu.',
    relevance:
      'Jika saat ini kamu merasa memiliki daya kritis yang tinggi di lingkungan yang terkadang masih meremehkan kecerdasan perempuan, ingatlah Aisyah. Kecerdasan dan ketelitiannyalah yang menjadikannya rujukan ribuan sahabat. Jangan pernah memadamkan rasa ingin tahumu; arahkanlah semangat belajarmu untuk menyebarkan kebaikan dan ilmu.',
  },
  hafshah: {
    validation:
      'Ketegasan dan keberanianmu menjaga prinsip adalah perisai bagi kebenaran dan keadilan.',
    relevance:
      'Perempuan yang memiliki pendirian kokoh terkadang disalahpahami sebagai sosok yang keras. Namun, keteguhan itulah yang diwariskan Hafshah saat dipercaya menjaga naskah suci Al-Quran. Jangan takut untuk menetapkan batasan yang sehat dan bersuara tegas ketika prinsipmu diusik. Ketegasanmu adalah bentuk integritas yang sangat berharga hari ini.',
  },
  zainabkhuzaimah: {
    validation:
      'Kepedulian dan kedermawananmu adalah pelukan hangat bagi mereka yang sedang berduka.',
    relevance:
      "Jika kamu sering merasa sangat peka atau mudah terenyuh melihat kesulitan orang lain, ketahuilah bahwa empati itu adalah anugerah terindah dari Zainab binti Khuzaimah, sang 'Ibu Kaum Miskin'. Di zaman yang semakin individualistis, kepedulianmu adalah oase penyejuk. Namun ingatlah untuk tetap merawat energimu sendiri sebelum membagikannya kepada orang lain.",
  },
  ummusalamah: {
    validation:
      'Kematangan berpikirmu menunjukkan bahwa kecantikan sejati bersumber dari kejernihan akal dan kebijaksanaan budi.',
    relevance:
      'Dalam pergaulan yang sering kali hanya memandang penampilan lahiriah, ketajaman logikamu menembus batas itu. Ummu Salamah terbukti mampu memberikan jalan keluar yang sangat bijak saat perjanjian Hudaibiyah, menyelamatkan kaum muslimin dari kebuntuan. Jangan ragu menyuarakan pandangan bijakmu; lingkunganmu membutuhkan penasihat dengan akal jernih sepertimu.',
  },
  zainabjahsy: {
    validation:
      'Kemandirian dan hasil jerih payah tanganmu adalah cermin rasa syukur dan kehormatan diri yang nyata.',
    relevance:
      'Jika kamu merasa bahagia saat menghasilkan sesuatu dari ketekunan tanganmu sendiri (karya, usaha mandiri, atau keahlian praktis), banggalah. Zainab binti Jahsy adalah perempuan mandiri yang gemar berkarya untuk disedekahkan. Dedikasi pada keahlianmu tidak mengurangi keanggunanmu; justru itu adalah bentuk nyata dari kemandirian dan martabat diri.',
  },
  juwairiyah: {
    validation:
      'Ketangguhanmu menunjukkan bahwa dari ujian hidup yang berat bisa lahir berkah dan perubahan besar.',
    relevance:
      'Jika kamu pernah melalui masa transisi yang sulit atau kehilangan besar, teladanilah Juwairiyah. Beliau pernah kehilangan segalanya dalam perang, namun kelenturan mental dan ketabahannya berhasil membuka pintu kebebasan bagi ratusan kaumnya. Jangan biarkan masa lalu mendikte masa depanmu; ketangguhanmu akan membuka jalan kebaikan bagi dirimu dan sesama.',
  },
  ummuhabibah: {
    validation:
      'Keteguhan prinsipmu membuktikan bahwa integritas iman jauh lebih bernilai daripada sekadar kenyamanan sesaat.',
    relevance:
      'Mungkin kamu pernah merasa sendirian karena teguh memegang prinsip yang berbeda dari arus pergaulan di sekitarmu. Ummu Habibah rela hidup dalam pengasingan di Habasyah demi menjaga keimanannya. Teruslah setia pada komitmen moral dan prinsip kebenaranmu; keteguhanmu akan berbuah kemuliaan dan ketenangan jiwa.',
  },
  shafiyyah: {
    validation:
      'Kebesaran jiwamu memaafkan masa lalu menjadikanmu pribadi yang kaya kelembutan dan kebijaksanaan.',
    relevance:
      'Bagi kamu yang pernah terluka oleh prasangka atau masa lalu yang berat, Shafiyyah mengajarkan seni berdamai dengan luka batin. Beliau mampu memaafkan dan mengubah rasa sakit menjadi kelembutan yang tulus. Keberanianmu memutus rantai dendam dan memilih untuk tetap berbuat ihsan adalah puncak kedewasaan jiwa yang sangat luhur.',
  },
  maimunah: {
    validation:
      'Ketulusan dan dedikasimu tanpa pamrih adalah pengikat erat persaudaraan yang tulus.',
    relevance:
      'Kamu mungkin tidak gemar mencari sorotan, namun kamu selalu hadir ketika ada yang membutuhkan dukungan nyata. Maimunah adalah sosok yang tulus mendahulukan kerukunan dan kedamaian keluarga. Kebaikan hatimu yang tulus adalah perekat kebersamaan; jangan pernah merasa bahwa kebaikan kecilmu tidak berharga.',
  },
};

export const SYNTHESIS_DATA: {
  primary: Record<ArchetypeId, string>;
  secondary: Record<ArchetypeId, string>;
} = {
  primary: {
    khadijah:
      'Kamu memancarkan ketenangan, visi yang tajam, dan kemandirian seperti Khadijah, menjadi pilar kokoh tempat banyak orang bersandar.',
    saudah:
      'Kamu memiliki kelapangan dada dan keikhlasan luar biasa seperti Saudah, selalu mengutamakan kedamaian dan menghindari konflik yang tidak perlu.',
    aisyah:
      'Kamu dibekali kecerdasan analitis yang tajam dan dinamika berpikir seperti Aisyah, selalu haus akan ilmu dan berani bersuara kritis.',
    hafshah:
      'Kamu memegang teguh prinsip dengan ketegasan dan keberanian layaknya Hafshah, tidak ragu menetapkan batasan demi melindungi apa yang benar.',
    zainabkhuzaimah:
      'Kamu memiliki kelembutan hati dan empati yang sangat dalam seperti Zainab binti Khuzaimah, selalu tergerak untuk merangkul mereka yang terluka.',
    ummusalamah:
      'Kamu memancarkan kematangan berpikir dan keanggunan intelektual seperti Ummu Salamah, mampu memberikan jalan keluar logis di saat-saat krisis.',
    zainabjahsy:
      'Kamu adalah sosok yang sangat mandiri dan produktif seperti Zainab binti Jahsy, menemukan kebanggaan dan rasa syukur melalui karya nyata tanganmu sendiri.',
    juwairiyah:
      'Kamu memiliki ketangguhan dan kemampuan beradaptasi yang luar biasa seperti Juwairiyah, mampu mengubah krisis atau masa sulit menjadi titik balik yang membawa berkah.',
    ummuhabibah:
      'Kamu berdiri teguh di atas keyakinanmu seperti Ummu Habibah, rela menempuh jalan yang sunyi atau tidak populer demi mempertahankan prinsip hidupmu.',
    shafiyyah:
      'Kamu memiliki kepekaan emosional tingkat tinggi dan kebesaran hati seperti Shafiyyah, mampu mengubah rasa sakit masa lalu menjadi pemaafan dan kelembutan yang tulus.',
    maimunah:
      'Kamu adalah perekat yang tulus dan penuh dedikasi seperti Maimunah, senantiasa berbuat baik tanpa pamrih dan tanpa perlu menjadi pusat perhatian.',
  },
  secondary: {
    khadijah:
      'Namun yang membuatmu istimewa adalah caramu merespons dinamika. Kamu menyeimbangkannya dengan naluri perlindungan dan kemandirian Khadijah, memastikan bahwa apa pun yang terjadi, kamu tetap memiliki pijakan yang aman.',
    saudah:
      'Namun yang membuatmu istimewa adalah caramu menghadapi dunia. Kamu membungkus energi tersebut dengan kelapangan dada dan selera humor layaknya Saudah, menjadikanmu sosok yang mudah didekati dan menyejukkan.',
    aisyah:
      'Namun yang membuatmu istimewa adalah caramu memproses situasi. Kamu melengkapinya dengan ketajaman analisis dan semangat kritis Aisyah, sehingga kamu tidak mudah terbawa arus tanpa memahami alasan logis di baliknya.',
    hafshah:
      'Namun yang membuatmu istimewa adalah caramu menjaga diri. Kamu membentenginya dengan ketegasan dan prinsip kuat layaknya Hafshah, memastikan bahwa energimu tidak dimanfaatkan oleh orang yang salah.',
    zainabkhuzaimah:
      'Namun yang membuatmu istimewa adalah caramu menyalurkan energi. Semuanya pada akhirnya bermuara pada empati dan kepedulian tulus layaknya Zainab binti Khuzaimah, di mana kamu selalu memprioritaskan rasa kemanusiaan.',
    ummusalamah:
      'Namun yang membuatmu istimewa adalah caramu mengambil keputusan. Kamu membingkainya dengan nalar logis dan kematangan taktis Ummu Salamah, menjauhkanmu dari reaksi emosional yang gegabah.',
    zainabjahsy:
      'Namun yang membuatmu istimewa adalah caramu berekspresi. Kamu mewujudkannya melalui kerja keras dan kemandirian Zainab binti Jahsy, lebih suka membuktikan diri lewat tindakan nyata dan karya.',
    juwairiyah:
      'Namun yang membuatmu istimewa adalah kelenturan mentalmu. Saat berhadapan dengan tembok buntu, kamu meminjam ketangguhan adaptasi Juwairiyah, mencari celah peluang dari setiap tantangan yang ada.',
    ummuhabibah:
      'Namun yang membuatmu istimewa adalah akar pijakanmu. Saat dunia memintamu berkompromi, kamu menarik garis batas tegas dengan keteguhan iman Ummu Habibah, menolak mengorbankan nilai dasar yang kamu yakini.',
    shafiyyah:
      'Namun yang membuatmu istimewa adalah kapasitas batinmu. Di saat kamu berhak untuk marah atau kecewa, kamu memilih meresponsnya dengan kelembutan dan kebijaksanaan Shafiyyah, memutus rantai sakit hati dan kebencian.',
    maimunah:
      'Namun yang membuatmu istimewa adalah caramu menjaga keharmonisan. Kamu melakukannya dengan ketulusan yang sunyi layaknya Maimunah, mengabdi pada kebaikan tanpa menuntut pengakuan atau validasi panggung.',
  },
};

export const INTENSITY_DATA: Record<ArchetypeId, { high: string; mod: string }> = {
  khadijah: {
    high: 'Tarikan energi Khadijah di dalam dirimu sangatlah kuat. Ingatlah, menjadi pilar bagi banyak orang itu melelahkan. Orang sekuat dirimu pun sangat berhak untuk memiliki ruang menangis dan bersandar.',
    mod: 'Binar ketenangan Khadijah mulai mekar dalam dirimu. Teruslah rawat kemandirianmu; pelan namun pasti, kamu sedang bertumbuh menjadi pondasi yang kokoh bagi sekitarmu.',
  },
  saudah: {
    high: 'Kapasitasmu mengalah sangat dominan. Namun ingatlah, menjaga perasaan orang lain tidak boleh dibayar dengan mengorbankan kebahagiaanmu sendiri. Kamu berhak menetapkan batas.',
    mod: 'Sikap lapang dada Saudah mulai mewarnai hari-harimu. Teruslah asah kedewasaan ini, karena kemampuan meredam ego adalah kunci kedamaian jangka panjang.',
  },
  aisyah: {
    high: 'Rasa ingin tahumu berdegup sangat kencang. Terkadang pikiran yang terlalu aktif bisa memicu kecemasan (overthinking). Berikan jeda untuk pikiranmu beristirahat sejenak dan nikmati ketenangan hening.',
    mod: 'Ketajaman nalar Aisyah sedang bertumbuh dalam dirimu. Teruslah bertanya dan mencari tahu; dunia selalu membutuhkan perempuan yang berani mencari kebenaran.',
  },
  hafshah: {
    high: 'Ketegasan prinsipmu sangat kokoh. Ingatlah bahwa tidak semua hal harus dilawan atau dipertahankan dengan keras. Sisakan sedikit ruang kompromi agar kamu tidak kehabisan energi.',
    mod: 'Keberanian Hafshah untuk bersuara mulai terbangun di dalam dirimu. Teruslah latih ketegasanmu, perlahan kamu akan mahir melindungi apa yang berharga bagimu.',
  },
  zainabkhuzaimah: {
    high: 'Empatimu meluap-luap. Sangat mudah bagimu untuk menyerap penderitaan orang lain hingga kamu sendiri kelelahan (compassion fatigue). Ingatlah untuk mengisi cangkir jiwamu sendiri sebelum menuangkannya untuk orang lain.',
    mod: 'Benih kepedulian Zainab binti Khuzaimah mulai berakar kuat di hatimu. Teruslah rawat kepekaanmu; kebaikan-kebaikan kecilmu akan menjadi penyelamat bagi banyak orang.',
  },
  ummusalamah: {
    high: 'Kematangan taktismu mendominasi. Saking rasionalnya, kadang kamu lupa memvalidasi perasaanmu sendiri. Izinkan dirimu untuk sesekali rapuh, tidak semua hal harus segera diselesaikan.',
    mod: 'Kebijaksanaan Ummu Salamah sedang mekar perlahan. Teruslah asah kemampuanmu melihat masalah dari berbagai sudut pandang; nalar jernihmu sedang dilatih.',
  },
  zainabjahsy: {
    high: 'Daya dorong kemandirianmu sangat luar biasa. Namun, jangan sampai produktivitas menjadi satu-satunya sumber harga dirimu. Kamu tetap berharga meski sedang tidak melakukan apa-apa.',
    mod: 'Semangat kemandirian Zainab binti Jahsy mulai terlihat jelas. Teruslah berkarya dan temukan kebanggaan pada usahamu sendiri; kemandirian sejati sedang kamu bangun.',
  },
  juwairiyah: {
    high: 'Daya juang dan adaptasimu sangat luar biasa. Kamu sudah terbiasa melewati masa-masa sulit, tapi ingatlah bahwa kamu tidak harus selalu dalam mode bertahan hidup (survival mode). Izinkan hatimu bernapas lega.',
    mod: 'Ketangguhan mental Juwairiyah mulai terasah di dalam dirimu. Teruslah berlatih lentur menghadapi keadaan; setiap tantangan sedang membentukmu menjadi lebih kuat.',
  },
  ummuhabibah: {
    high: 'Keteguhan imanmu mengakar sangat dalam. Berada di jalan yang berbeda dengan mayoritas memang melelahkan dan sepi. Jangan lupa untuk mencari lingkungan yang satu frekuensi denganmu.',
    mod: 'Prinsip-prinsip Ummu Habibah mulai kokoh dalam pijakanmu. Teruslah berani tampil beda demi kebenaran; integritasmu sedang diuji dan ditempa menjadi lebih baik.',
  },
  shafiyyah: {
    high: 'Kelembutan hatimu dalam memaafkan sangat mendominasi. Pastikan kebesaran hatimu tidak dimanfaatkan oleh orang yang sama berulang kali. Berdamai dengan masa lalu tidak berarti membiarkan dirimu terluka lagi.',
    mod: 'Kapasitas batin Shafiyyah mulai meluas di hatimu. Teruslah latih seni melepaskan; setiap maaf yang kamu berikan sedang membebaskan jiwamu dari beban masa lalu.',
  },
  maimunah: {
    high: 'Dedikasimu tanpa pamrih sangat kuat. Saking tulusnya, kamu sering lupa mengapresiasi dirimu sendiri. Ingat, mengakui dan merayakan kebaikanmu sendiri bukanlah sebuah kesombongan.',
    mod: 'Ketulusan Maimunah mulai memancar dari setiap tindakanmu. Teruslah menjadi perekat kebaikan; peran-peran sunyimu kelak akan memberikan dampak yang sangat besar.',
  },
};

export const DAILY_PRACTICES: Record<ArchetypeId, DailyPractice[]> = {
  khadijah: [
    {
      title: 'Jeda Grounding 3 Menit',
      tag: 'Pelepas Beban',
      habit:
        "Saat krisis atau kepanikan melanda, tarik napas perlahan (4 detik tarik, 4 detik tahan, 6 detik hembus). Ingatkan diri: 'Aku tidak harus menyelesaikan dan memikul seluruh beban ini sendirian saat ini juga.'",
    },
    {
      title: 'Ruang Bersandar Malam',
      tag: 'Perawatan Diri',
      habit:
        'Sediakan 15 menit hening di malam hari (melalui doa lirih atau jurnal rasa) untuk mengakui kelelahanmu. Validasi bahwa sosok sekuat dirimu pun sangat berhak memiliki ruang untuk bersandar dan menangis.',
    },
    {
      title: 'Delegasi Tanpa Supervisi',
      tag: 'Percaya & Lepaskan',
      habit:
        'Serahkan minimal 1 tanggung jawab kecil hari ini kepada orang lain secara penuh tanpa memeriksa ulang atau merevisi hasilnya, demi melatih rasa percaya.',
    },
  ],
  saudah: [
    {
      title: 'Jeda Sejenak Sebelum Merespons',
      tag: 'Menghargai Diri',
      habit:
        "Latihlah kalimat: 'Beri aku waktu untuk memikirkannya ya' alih-alih refleks mengiyakan permintaan orang lain yang memberatkan demi menjaga keharmonisan sesaat.",
    },
    {
      title: '1 Keinginan Otentik Hari Ini',
      tag: 'Suara Pribadi',
      habit:
        'Pilih minimal 1 hal yang benar-benar kamu sukai hari ini (makanan favorit, jalan santai, waktu hening) dan nikmati seutuhnya tanpa ada rasa bersalah.',
    },
    {
      title: 'Batasi Menjadi Penyelamat Suasana',
      tag: 'Konservasi Energi',
      habit:
        'Ketika suasana sekitar tegang atau dingin, sadari bahwa kamu tidak berkewajiban selalu mencairkannya dengan lelucon jika energi batinmu sendiri sedang rapuh.',
    },
  ],
  aisyah: [
    {
      title: 'Jurnal Emosi Sebelum Bersuara',
      tag: 'Komunikasi Bijak',
      habit:
        "Sebelum melontarkan koreksi logis atau kritik tajam, tuliskan poinmu di catatan pribadi. Tanyakan: 'Apakah ini cara, kata, dan waktu terbaik untuk menyampaikannya agar tidak melukai hati?'",
    },
    {
      title: 'Detoks Stimulasi Mental',
      tag: 'Penenang Saraf',
      habit:
        'Beri otak analitismu jeda istirahat 15 menit di sore hari tanpa membaca, menganalisis, atau terpaku pada layar gawai untuk meredakan siklus overthinking.',
    },
    {
      title: 'Fokus Intelektual Tunggal',
      tag: 'Kedalaman Eksplorasi',
      habit:
        'Pilih 1 hal baru yang ingin kamu pelajari hari ini dan nikmati prosesnya secara mendalam selama 25 menit tanpa berpindah-pindah topik secara impulsif.',
    },
  ],
  hafshah: [
    {
      title: 'Pilih Hal yang Patut Diperjuangkan',
      tag: 'Konservasi Energi',
      habit:
        "Sebelum berargumen mengenai aturan atau ketidakteraturan, tanyakan: 'Apakah hal ini masih berdampak nyata 1 bulan ke depan?' Jika tidak, izinkan dirimu melepaskannya dengan lapang dada.",
    },
    {
      title: 'Ketegasan Berakar Kehangatan',
      tag: 'Tegas & Lembut',
      habit:
        'Awali teguran atau batasan dengan kalimat apresiasi tulus. Sentuh hatinya terlebih dahulu sebelum menyentuh logikanya agar kebenaran yang kamu bawa disambut hangat.',
    },
    {
      title: 'Peregangan Bahu & Rahang',
      tag: 'Relaksasi Raga',
      habit:
        'Lakukan peregangan fisik 2 menit di siang hari untuk melepaskan ketegangan otot leher dan rahang yang sering terkunci saat menahan dorongan menjaga prinsip.',
    },
  ],
  zainabkhuzaimah: [
    {
      title: 'Isi Cangkir Sebelum Menuang',
      tag: 'Cinta Diri Nyata',
      habit:
        'Pastikan 3 kebutuhan dasarmu (makan teratur, hidrasi cukup, dan istirahat berkualitas) terpenuhi sebelum kamu melangkah keluar untuk menolong sesama.',
    },
    {
      title: 'Sekat Empati yang Sehat',
      tag: 'Batas Batin',
      habit:
        'Saat mendengar curahan kesedihan orang lain, bayangkan ada sekat pelindung yang bening: kamu hadir mendengarkan dengan penuh cinta tanpa harus menyerap rasa sakit mereka ke dalam ragamu.',
    },
    {
      title: 'Kedermawanan Terjadwal',
      tag: 'Jaga Stamina Hati',
      habit:
        'Tetapkan batas waktu dan tenaga untuk urusan luar hari ini agar energimu tidak terkuras habis karena berlebihan menanggung kesedihan orang lain.',
    },
  ],
  ummusalamah: [
    {
      title: 'Aturan 24 Jam untuk Isu Krusial',
      tag: 'Kematangan Taktis',
      habit:
        'Untuk keputusan besar atau konflik bernada tinggi, beri jeda satu malam sebelum merespons agar nalar jernih dan intuisi strategismu bekerja secara utuh.',
    },
    {
      title: 'Validasi Emosi Sebelum Logika',
      tag: 'Koneksi Batin',
      habit:
        "Ketika merasa gelisah atau lelah, tuliskan emosi mentahmu tanpa buru-buru mencari 'solusi logis'. Izinkan dirimu merasakan emosi itu sebelum menyusun rencana perbaikan.",
    },
    {
      title: 'Percakapan Sambil Berdampingan',
      tag: 'Harmonisasi Relasi',
      habit:
        'Bahas topik sensitif dengan pasangan atau rekan sambil duduk berdampingan atau berjalan santai, menciptakan suasana musyawarah yang aman tanpa tensi konfrontatif.',
    },
  ],
  zainabjahsy: [
    {
      title: 'Karya Tangan Penenang Jiwa',
      tag: 'Kreativitas Otentik',
      habit:
        'Luangkan 20 menit untuk membuat sesuatu dengan tanganmu sendiri (merapikan tata ruang, memasak, menjahit, atau menulis) sebagai sarana meditasi dan pengekspresian jiwa.',
    },
    {
      title: 'Harga Diri di Luar Produktivitas',
      tag: 'Keberhargaan Diri',
      habit:
        "Ucapkan afirmasi saat beristirahat: 'Nilai dan kemuliaan diriku tidak diukur dari seberapa banyak tugas yang kuselesaikan hari ini. Aku berharga apa adanya bahkan saat berhenti sejenak.'",
    },
    {
      title: 'Kebaikan Sunyi Tanpa Panggung',
      tag: 'Kemurnian Niat',
      habit:
        'Lakukan satu tindakan bermakna atau pemberian secara diam-diam tanpa membagikannya ke media sosial untuk merawat kemandirian batinmu dari dahaga validasi luar.',
    },
  ],
  juwairiyah: [
    {
      title: 'Melihat Hikmah dari Perubahan Rencana',
      tag: 'Kelenturan Mental',
      habit:
        "Saat situasi tidak berjalan sesuai rencana, ambil napas dan tuliskan: 'Peluang baru atau hikmah apa yang bisa kutumbuhkan dari perubahan arah mendadak ini?'",
    },
    {
      title: 'Redakan Rasa Cemas Berlebihan',
      tag: 'Rasa Aman Batin',
      habit:
        "Sadari saat detak jantungmu bergerak cepat karena cemas; letakkan tangan di dada dan ingatkan dirimu: 'Saat ini aku sudah aman, krisis masa lalu sudah berlalu.'",
    },
    {
      title: 'Jembatan Kebaikan Rekonsiliasi',
      tag: 'Penebar Kedamaian',
      habit:
        'Ambil inisiatif menyapa atau memberi senyuman tulus kepada orang yang sedang berbeda sudut pandang untuk mencairkan ketegangan sosial di sekitarmu.',
    },
  ],
  ummuhabibah: [
    {
      title: 'Jangkar Nilai Pagi Hari',
      tag: 'Keteguhan Prinsip',
      habit:
        'Luangkan 3 menit di pagi hari merenungkan satu kompas nilai moral yang ingin kamu pegang teguh hari ini agar langkahmu tidak mudah goyah oleh tekanan lingkungan.',
    },
    {
      title: 'Cari Lingkungan Sefrekuensi',
      tag: 'Sistem Pendukung',
      habit:
        'Hubungi satu orang sahabat atau mentor yang memahami perjuanganmu untuk berbagi kabar dan saling menguatkan agar tidak merasa terasing di jalan kebenaran.',
    },
    {
      title: 'Keteguhan Tanpa Sikap Menghakimi',
      tag: 'Kedewasaan Bersikap',
      habit:
        'Ingatkan diri bahwa memegang teguh keyakinan tidak mengharuskanmu bersikap kaku atau memandang rendah orang lain yang proses bertumbuhnya belum sama denganmu.',
    },
  ],
  shafiyyah: [
    {
      title: 'Ritual Melepaskan Beban Masa Lalu',
      tag: 'Penyembuhan Batin',
      habit:
        'Tuliskan luka atau prasangka orang lain yang sempat melukai hatimu di secarik kertas, lalu sobek dan buang sebagai komitmen bahwa masa lalumu tidak berhak mengatur masa depanmu.',
    },
    {
      title: 'Lembut pada Diri Sendiri Saat Keliru',
      tag: 'Kelembutan Diri',
      habit:
        "Ketika berbuat kesalahan, bicaralah pada dirimu dengan kelembutan seorang ibu kepada anaknya: 'Ini wajar dan manusiawi, aku sedang berproses menjadi lebih bijak.'",
    },
    {
      title: 'Menerima Apresiasi dengan Hangat',
      tag: 'Penerimaan Terbuka',
      habit:
        "Saat seseorang memuji atau berterima kasih kepadamu, sambutlah dengan kalimat: 'Terima kasih, alhamdulillah' tanpa meremehkan usahamu atau merasa tidak pantas.",
    },
  ],
  maimunah: [
    {
      title: 'Syukur Atas Kontribusi Sunyi',
      tag: 'Apresiasi Batin',
      habit:
        'Sebelum tidur, catat 3 kebaikan kecil tanpa nama yang telah kamu berikan hari ini (kenyamanan ruang, doa tulus, bantuan tenang) dan hargai betapa berharganya kontribusimu.',
    },
    {
      title: 'Ungkapkan Kebutuhan Secara Terus Terang',
      tag: 'Komunikasi Terbuka',
      habit:
        'Latihlah menyampaikan apa yang sedang kamu butuhkan atau harapkan kepada orang terdekat secara langsung tanpa menunggu mereka menebaknya sendiri.',
    },
    {
      title: 'Rawat Tali Silaturahmi Hangat',
      tag: 'Penebar Cinta',
      habit:
        'Kirimkan sebaris pesan singkat berisi doa tulus kepada sanak saudara atau sahabat lama yang sedang menghadapi ujian kehidupan.',
    },
  ],
};

export const BLIND_SPOT_DATA: Record<ArchetypeId, string> = {
  khadijah:
    "Kamu memiliki empati dan fleksibilitas yang luar biasa, namun terkadang kamu mudah terguncang saat situasi tidak menentu. Cobalah pinjam ketenangan Khadijah; belajarlah untuk menjadi 'jangkar' bagi dirimu sendiri sebelum mencari validasi atau sandaran dari orang lain.",
  saudah:
    'Dalam upayamu memegang kendali atau mencapai kesempurnaan, kamu mungkin sering merasa tegang atau sulit mengalah. Sesekali, pinjamlah kelapangan dada dan selera humor Saudah; belajarlah untuk menertawakan ketidaksempurnaan dunia demi menjaga kedamaian hatimu.',
  aisyah:
    'Di balik kelembutan dan kematangan emosionalmu, tampaknya kamu sering menahan diri untuk bertanya atau meragukan sesuatu karena takut dianggap menyusahkan. Padahal, dunia membutuhkan nalar kritismu. Cobalah pinjam sedikit keberanian Aisyah untuk sesekali bersuara, karena rasa ingin tahumu juga berharga.',
  hafshah:
    "Kedermawanan dan kebaikan hatimu sungguh indah, namun terkadang hal itu membuatmu lupa membangun batasan diri yang sehat. Jangan takut untuk berkata 'tidak'. Sesekali, pinjamlah ketegasan Hafshah untuk melindungi ketenangan batinmu sendiri dari tuntutan berlebih orang lain.",
  zainabkhuzaimah:
    'Kekuatan logika dan kemandirianmu sangat luar biasa, tapi hati-hati agar hal itu tidak membuatmu terasa jauh atau dingin. Izinkan dirimu merasakan kerentanan. Pinjamlah kelembutan empati Zainab binti Khuzaimah untuk sesekali menyelami perasaan orang lain tanpa harus selalu memberikan solusi logis.',
  ummusalamah:
    'Kamu sangat perasa dan mudah terbawa oleh emosi atau kepanikan saat berhadapan dengan masalah. Saat badai datang, cobalah berhenti sejenak. Pinjamlah kematangan berpikir Ummu Salamah untuk mengambil jarak, berpikir taktis, dan tidak gegabah dalam merespons.',
  zainabjahsy:
    'Kamu banyak menghabiskan waktu memikirkan atau melayani orang lain hingga melupakan ruang untuk mengekspresikan potensimu sendiri. Sesekali, pinjamlah semangat kemandirian Zainab binti Jahsy; temukan hobi, karya, atau kebanggaan dari apa yang bisa diciptakan oleh tanganmu sendiri.',
  juwairiyah:
    'Rutinitas yang aman adalah zona nyamanmu, dan kamu mungkin mudah cemas ketika ada perubahan mendadak. Ketika krisis atau hal tak terduga datang, jangan langsung menolak. Pinjamlah kelenturan mental Juwairiyah untuk melihat peluang dan berkah di balik ujian tersebut.',
  ummuhabibah:
    'Kamu sangat fleksibel dan mudah beradaptasi, namun pastikan kamu tidak kehilangan warna aslimu demi diterima oleh lingkungan. Pinjamlah keteguhan iman Ummu Habibah; belajarlah untuk berani berdiri tegak di atas prinsipmu sendiri, meski itu membuatmu terlihat berbeda.',
  shafiyyah:
    'Tampaknya kamu sering memendam luka masa lalu atau memiliki standar yang terlalu keras pada dirimu sendiri. Hal ini sangat menguras batinmu. Pinjamlah kebesaran hati Shafiyyah untuk memulai proses memaafkan—bukan hanya untuk orang lain, tapi yang terpenting untuk dirimu sendiri.',
  maimunah:
    'Kamu mungkin sering merasa harus mencapai sesuatu yang besar atau mendapatkan pengakuan agar merasa berharga. Sesekali, turunlah dari panggung ekspektasi. Pinjamlah ketulusan sunyi Maimunah untuk melakukan kebaikan kecil tanpa nama, sekadar untuk merasakan kedamaian dari memberi tanpa pamrih.',
};
