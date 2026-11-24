import type { GlossaryEntry } from '../types';

export const PSYCH_GLOSSARY: Record<string, string> = {
  'Somatic Grounding':
    'Teknik regulasi sistem saraf otonom saat mengalami kepanikan atau hiper-arousal melalui kesadaran fisik, sensasi tubuh yang menenangkan, dan orientasi ruang aman.',
  'Cognitive Restructuring':
    'Metode kognitif-perilaku (CBT) untuk mengidentifikasi dan mematahkan distorsi pikiran negatif atau katastropik dengan bukti rasional yang logis dan objektif.',
  'Crisis Intervention':
    'Protokol penanganan cepat untuk menstabilkan kondisi psikologis seseorang yang sedang mengalami guncangan emosional atau krisis akut.',
  'Ego-bypass Mechanism':
    'Kecakapan menonaktifkan pertahanan ego defensif demi merawat harmoni relasional dan tujuan kolektif yang lebih tinggi.',
  'Stress Relief':
    'Mekanisme pereda ketegangan psikofisiologis melalui katarsis humor hangat, relaksasi, dan kelapangan dada.',
  'Self-Concept Certainty':
    'Kestabilan konsep diri yang aman dan kokoh, sehingga kebal terhadap rasa terancam atau tersaingi oleh kelebihan orang lain.',
  'High Neuroplasticity':
    'Kapasitas adaptif otak dan daya ingat yang luar biasa untuk belajar, menyerap ilmu baru, dan berpikir secara lentur serta dinamis.',
  'Critical Analytical':
    'Kecenderungan kognitif untuk memvalidasi akurasi data, mempertanyakan asumsi, dan menguji kebenaran secara metodis dan rasional.',
  'Graceful Emotional Transparency':
    'Keberanian mengekspresikan dinamika emosi secara jujur, transparan, dan apa adanya tanpa disosiasi atau represi kepalsuan.',
  Conscientiousness:
    'Dimensi kepribadian yang dicirikan oleh kedisiplinan tinggi, kehati-hatian mutlak, keteraturan, dan rasa tanggung jawab penuh terhadap amanah.',
  'Rule-Bound Adherence':
    'Kepatuhan sistematis terhadap tata aturan, batasan moral, dan prinsip integritas tanpa ruang kompromi.',
  'Integrity Guardian':
    'Peran psikososial sebagai penjaga amanah dan rahasia krusial berkat independensi penilaian dan objektivitas yang tidak mudah dipengaruhi sentimen.',
  'Executive Functioning':
    'Kapasitas fungsi kognitif tingkat tinggi di korteks prefrontal untuk perencanaan strategis, pemecahan masalah kompleks, dan regulasi impuls di tengah krisis.',
  'Cognitive Flexibility':
    'Kelenturan mental untuk beralih strategi dan melihat persoalan dari perspektif alternatif saat menghadapi kebuntuan atau kehilangan.',
  'Behavioral-Driven Solution':
    'Intervensi berbasis tindakan konkret yang terbukti lebih efektif meregulasi emosi kelompok dibanding instruksi verbal semata.',
  'Pure Altruism':
    'Motivasi prososial murni untuk menolong sesama tanpa mengharapkan timbal balik eksternal atau validasi sosial.',
  'Compassion Fatigue':
    'Kondisi kelelahan fisik, emosional, dan spiritual akibat paparan terus-menerus terhadap penderitaan orang lain tanpa batas diri (boundaries) yang memadai.',
  'Act of Service':
    'Penyaluran dorongan kasih sayang dan kepedulian melalui bantuan praktis nyata sebagai ekspresi nilai inti diri.',
  'Ego Deconstruction':
    'Proses mendekonstruksi keterikatan identitas terhadap status sosial, privilese, atau ego masa lalu demi menyelaraskan diri dengan prinsip moral yang lebih tinggi.',
  'Self-Reliance & Hard Work':
    'Efikasi diri yang bertumpu pada kemandirian usaha dan karya nyata, membebaskan diri dari ketergantungan validasi eksternal.',
  'Pride of Service':
    'Transformasi kebanggaan dari status hierarkis menjadi kebanggaan atas kebermanfaatan dan pelayanan bagi sesama.',
  'Survival Mode':
    'Respon adaptif sistem saraf (fight, flight, or freeze) saat menghadapi krisis atau ancaman berkepanjangan, di mana energi difokuskan semata untuk bertahan hidup sehingga perlu dipulihkan menuju rasa aman.',
  'Social Ripple Effect':
    'Dampak berantai positif di mana tindakan pembebasan atau kebaikan satu individu menginspirasi perubahan sosial yang luas.',
  'Silent Emotional Regulation':
    'Kemampuan menenangkan gejolak emosi secara internal dan mandiri tanpa reaktivitas impulsif.',
  'Strict Healthy Boundaries':
    'Penetapan garis batas psikologis yang tegas dan protektif untuk mempertahankan keselamatan prinsip dan integritas nilai diri.',
  'Post-Traumatic Growth':
    'Transformasi positif dan pendewasaan psikologis mendalam yang tercapai setelah berhasil melewati penderitaan berat atau trauma krisis.',
  'Assertive Integrity':
    'Keberanian bersikap asertif demi membela kebenaran tanpa terjebak dalam rasa sungkan atau tekanan pergaulan yang keliru.',
  'Cognitive Reframing':
    'Teknik membingkai ulang makna dari pengalaman menyakitkan, stigma, atau penolakan menjadi pemahaman yang menguatkan dan berdaya.',
  'Wound Restructuring':
    'Kemampuan merawat dan menyembuhkan luka penolakan emosional dengan martabat dan keanggunan alih-alih dendam.',
  'Identity Ownership':
    'Kedaulatan batin dalam mendefinisikan martabat dan harga diri secara otonom, tanpa terdistorsi oleh stereotip atau prasangka orang lain.',
  'Detail-Oriented Observation':
    'Sensitivitas perseptual tinggi dalam menangkap detail kecil, keteraturan lingkungan, dan kebiasaan adab.',
  'Observational Learning':
    'Mekanisme pembelajaran sosial melalui pengamatan langsung dan pemodelan perilaku nyata dalam kehidupan sehari-hari.',
  'Consistent Reliability':
    'Konsistensi perilaku dan keandalan karakter yang menghadirkan rasa aman dan kepastian relasional bagi orang-orang sekitar.',
  Overthinking:
    'Kondisi ruminasi kognitif di mana pikiran terus berputar menganalisis atau mencemaskan kemungkinan buruk hingga menguras energi mental.',
};

const GLOSSARY_LOWER_MAP = new Map<string, GlossaryEntry>(
  Object.entries(PSYCH_GLOSSARY).map(([title, desc]) => [
    title.toLowerCase(),
    { title, desc },
  ])
);

export function findGlossaryEntry(rawTerm: string): GlossaryEntry | null {
  const clean = rawTerm.replace(/['()]/g, '').trim().toLowerCase();
  return GLOSSARY_LOWER_MAP.get(clean) ?? null;
}
