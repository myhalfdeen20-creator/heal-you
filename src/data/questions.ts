import type { ArchetypeId, QuestionItem } from '../types';

const QUESTION_SEED: Array<{ a: ArchetypeId; t: string }> = [
  { a: 'khadijah', t: 'Saat orang terdekatku merasa ragu pada diri mereka, aku selalu bisa melihat potensi mereka dan meyakinkan mereka.' },
  { a: 'khadijah', t: 'Aku merasa senang dan utuh saat bisa menjadi tempat bersandar dan pendukung utama bagi orang-orang yang kusayangi.' },
  { a: 'khadijah', t: 'Di situasi panik atau krisis, kehadiranku sering kali membuat orang-orang di sekitarku kembali merasa tenang.' },
  { a: 'khadijah', t: 'Aku sama sekali tidak merasa tersaingi jika pasanganku atau sahabatku meraih kesuksesan yang lebih besar dariku.' },
  { a: 'khadijah', t: 'Menghadapi masa sulit tidak membuatku mudah menyerah, selama aku tahu kami masih memiliki tujuan yang jelas.' },

  { a: 'saudah', t: 'Aku lebih memilih mengalah demi menjaga kedamaian di sekitarku daripada harus bersikeras memenangkan egoku sendiri.' },
  { a: 'saudah', t: 'Aku sering menggunakan candaan atau humor untuk mencairkan suasana yang sedang tegang atau canggung.' },
  { a: 'saudah', t: 'Melihat keluargaku atau teman-temanku rukun karena aku rela berkorban memberiku kepuasan batin tersendiri.' },
  { a: 'saudah', t: 'Aku merasa aman dengan diriku sendiri, sehingga pencapaian orang lain tidak pernah membuatku merasa iri.' },
  { a: 'saudah', t: 'Aku sangat menghindari persaingan yang tidak sehat dan lebih suka menjadi peneduh bagi semua orang.' },

  { a: 'aisyah', t: 'Jika ada informasi yang terasa janggal, aku akan otomatis mempertanyakannya dan mencari tahu kebenarannya.' },
  { a: 'aisyah', t: 'Aku selalu jujur dan terbuka dalam mengekspresikan apa yang aku rasakan, tanpa berusaha menutup-nutupinya.' },
  { a: 'aisyah', t: 'Aku sangat mudah belajar hal baru dan rasa ingin tahuku terhadap banyak hal seakan tidak pernah habis.' },
  { a: 'aisyah', t: 'Aku butuh alasan yang logis dan bisa diterima akal sebelum aku mau mematuhi sebuah aturan atau instruksi.' },
  { a: 'aisyah', t: 'Meskipun ditekan atau dijauhi banyak orang, aku menolak untuk mengakui kesalahan yang tidak pernah aku buat.' },

  { a: 'hafshah', t: 'Aku selalu memastikan kebenaran sebuah cerita sebelum ikut mempercayai apa kata orang banyak.' },
  { a: 'hafshah', t: 'Orang sangat mempercayaiku memegang rahasia karena aku selalu bersikap objektif dan tidak mudah terbawa emosi.' },
  { a: 'hafshah', t: 'Aku merasa jauh lebih tenang jika hidupku memiliki jadwal, kedisiplinan, dan aturan main yang sangat jelas.' },
  { a: 'hafshah', t: 'Aku sangat tidak suka jika ada kesepakatan yang dilanggar; bagiku aturan itu dibuat untuk menjaga kebaikan bersama.' },
  { a: 'hafshah', t: 'Aku lebih memilih dianggap kaku karena memegang prinsip, daripada membiarkan kebohongan terjadi di depan mataku.' },

  { a: 'ummusalamah', t: 'Saat terjadi masalah besar yang membuat orang lain panik, otakku justru langsung mencari solusi strategis.' },
  { a: 'ummusalamah', t: 'Aku sadar bahwa memberikan contoh lewat tindakan nyata jauh lebih efektif daripada sekadar berdebat dengan kata-kata.' },
  { a: 'ummusalamah', t: 'Pengalaman masa lalu yang pahit justru melatihku untuk bisa mengambil keputusan yang lebih bijaksana saat ini.' },
  { a: 'ummusalamah', t: 'Jika rencanaku gagal total, aku tidak akan lama-lama terpuruk dan langsung mencari jalan keluar lain.' },
  { a: 'ummusalamah', t: 'Aku memiliki firasat yang kuat untuk mengarahkan konflik dalam kelompok menuju penyelesaian yang damai.' },

  { a: 'zainabkhuzaimah', t: 'Keinginanku untuk membantu mereka yang lemah atau kesulitan sering kali mengalahkan kepentingan pribadiku sendiri.' },
  { a: 'zainabkhuzaimah', t: 'Membantu orang lain secara langsung adalah caraku yang paling ampuh untuk menemukan kebahagiaan hidup.' },
  { a: 'zainabkhuzaimah', t: 'Rasa empatiku sangat tinggi; aku seolah ikut merasakan sakit saat melihat orang lain menderita.' },
  { a: 'zainabkhuzaimah', t: 'Aku selalu fokus ingin memberikan kebaikan yang maksimal kepada orang lain, walaupun perjumpaan kami hanya sebentar.' },
  { a: 'zainabkhuzaimah', t: 'Banyak orang merasa nyaman menceritakan masalah terberat mereka kepadaku karena mereka tahu aku peduli.' },

  { a: 'zainabjahsy', t: 'Aku sangat menghargai kemandirian; kebanggaan terbesarku berasal dari hasil jerih payah tanganku sendiri.' },
  { a: 'zainabjahsy', t: 'Aku bangga karena bisa mengubah egoku di masa lalu menjadi keinginan kuat untuk terus berkarya dan mandiri.' },
  { a: 'zainabjahsy', t: 'Bisa bersedekah atau berbagi dengan orang lain dari hasil keringatku sendiri memberiku kepuasan batin yang luar biasa.' },
  { a: 'zainabjahsy', t: 'Aku merasa tidak nyaman jika hidupku harus selalu bergantung pada bantuan atau belas kasihan orang lain.' },
  { a: 'zainabjahsy', t: 'Bagiku, kemuliaan seseorang ditentukan oleh seberapa gigih ia bekerja agar bisa bermanfaat bagi sesamanya.' },

  { a: 'juwairiyah', t: 'Saat pikiranku sedang sangat cemas karena suatu masalah, aku menenangkannya dengan menyendiri dan beribadah.' },
  { a: 'juwairiyah', t: 'Kehadiran dan ketenanganku secara tidak sengaja sering kali membuat suasana panas di sekitarku ikut mereda.' },
  { a: 'juwairiyah', t: 'Melakukan rutinitas ibadah (seperti zikir) sangat membantuku menurunkan pikiran yang tegang kembali menjadi normal.' },
  { a: 'juwairiyah', t: "Aku seperti 'pekerja di balik layar' yang ikut membereskan kekacauan emosi orang lain tanpa perlu mencari panggung." },
  { a: 'juwairiyah', t: 'Aku berusaha keras memutus rantai luka masa laluku agar jangan sampai aku ikut melukai orang lain di masa depan.' },

  { a: 'ummuhabibah', t: 'Aku berani memberi batasan tegas dan menjauhi siapa pun—termasuk keluarga—jika mereka merusak prinsip agamaku.' },
  { a: 'ummuhabibah', t: 'Berada di lingkungan yang asing atau pernah dikhianati justru membuat keteguhan prinsip hidupku semakin kuat.' },
  { a: 'ummuhabibah', t: 'Aku membangun batasan diri yang sangat jelas untuk mencegah hal-hal buruk (toksik) masuk merusak ketenanganku.' },
  { a: 'ummuhabibah', t: 'Luka di masa lalu membuatku berhenti memaksakan diri untuk harus selalu menyenangkan semua orang.' },
  { a: 'ummuhabibah', t: 'Meskipun membatasi kedekatan secara emosi, aku tetap bisa bersikap biasa dan profesional dengan orang yang tidak kusukai.' },

  { a: 'shafiyyah', t: 'Saat orang menyerang latar belakang atau kekuranganku, aku bisa mengubah ejekan itu menjadi bukti kelebihanku.' },
  { a: 'shafiyyah', t: 'Luka karena ditolak atau dibeda-bedakan justru memacuku untuk membuktikan bahwa aku orang yang tulus dan setia.' },
  { a: 'shafiyyah', t: 'Aku sama sekali tidak mengizinkan penilaian buruk orang lain mendikte bagaimana aku menilai harga diriku sendiri.' },
  { a: 'shafiyyah', t: 'Aku membalas ketidakadilan orang lain dengan cara yang elegan, yaitu dengan tetap memberikan kebaikan yang tulus.' },
  { a: 'shafiyyah', t: 'Semakin aku dipojokkan dengan kelemahanku, semakin tajam dan cerdas caraku dalam membalas ucapan mereka.' },

  { a: 'maimunah', t: 'Aku memiliki ingatan dan kejelian yang sangat baik dalam merekam detail fisik, rutinitas, dan kebiasaan orang lain.' },
  { a: 'maimunah', t: 'Menjaga kebersihan, membereskan barang, dan melakukan rutinitas harian sangat ampuh untuk meredakan beban pikiranku.' },
  { a: 'maimunah', t: 'Orang-orang sering bertanya kepadaku karena mereka tahu ingatanku terhadap detail sebuah kejadian sangatlah akurat.' },
  { a: 'maimunah', t: 'Aku lebih cepat menyadari adanya perubahan kecil pada sikap seseorang atau lingkungan di sekitarku dibanding orang lain.' },
  { a: 'maimunah', t: 'Memiliki rutinitas yang teratur setiap hari, tanpa terlalu banyak kejutan mendadak, membuatku merasa jauh lebih aman.' },
];

export const RAW_QUESTIONS: QuestionItem[] = QUESTION_SEED.map((q, idx) => ({
  id: idx,
  a: q.a,
  t: q.t,
}));

export const LIKERT_OPTIONS = [
  { val: 1, label: 'Sangat Tidak Sesuai', badgeBg: 'bg-[#F5F4EF]', badgeText: 'text-slate-700' },
  { val: 2, label: 'Kurang Sesuai', badgeBg: 'bg-[#EDE9FE]/80', badgeText: 'text-slate-700' },
  { val: 3, label: 'Netral', badgeBg: 'bg-[#E0E7FF]', badgeText: 'text-[#3730A3]' },
  { val: 4, label: 'Sesuai', badgeBg: 'bg-[#DDD6FE]', badgeText: 'text-[#312E81]' },
  { val: 5, label: 'Sangat Sesuai', badgeBg: 'bg-[#D8B4FE]', badgeText: 'text-[#1E1B4B]' },
] as const;

export const BREAK_AFFIRMATIONS: string[] = [
  'Terima kasih sudah berbagi sejauh ini. Tarik napas perlahan, istirahatkan pikiranmu sejenak, dan mari kita lanjutkan saat kamu siap.',
  'Kamu melakukan hal yang hebat dengan jujur pada dirimu sendiri. Ambil napas panjang, hembuskan perlahan, dan lepaskan sedikit bebanmu.',
  'Perjalanan mengenal diri ini tidak perlu terburu-buru. Nikmati jeda ini, tenangkan hatimu, dan kita lanjutkan jika kamu sudah merasa nyaman.',
  'Setiap jawabanmu membawamu selangkah lebih dekat dengan pemahaman diri yang lebih dalam. Tarik napas yang dalam, tenangkan pikiranmu.',
  'Tidak ada yang mengejarmu di sini. Rasakan udara yang masuk dan keluar, berikan ruang untuk dirimu bernapas sebelum melanjutkan perjalanan ini.',
];
