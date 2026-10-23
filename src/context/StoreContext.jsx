import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultClinicSlides = [
  {
    id: 1,
    isFullImage: false,
    subtitle: 'ENHANCE. REFINE. EMPOWER.',
    titleLine1: 'Elevate Your',
    titleLine2: 'Natural Beauty',
    description:
      'Perawatan estetika modern yang dirancang khusus untuk meningkatkan kepercayaan diri dan kilau alami kulit Anda.',
    discountTop: 'NEW CLIENTS',
    discountMain: '10% OFF',
    discountBottom: 'FIRST TREATMENT',
    buttonPrimary: 'Book Your Appointment',
    buttonSecondary: 'Explore Products',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85',
    imageFit: 'cover',
    imagePosition: 'center',
    status: 'Active',
  },
  {
    id: 2,
    isFullImage: true,
    titleLine2: 'Full Banner Treatment 1',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85',
    imageFit: 'cover',
    imagePosition: 'center',
    status: 'Active',
  },
  {
    id: 3,
    isFullImage: true,
    titleLine2: 'Full Banner Treatment 2',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    imageFit: 'cover',
    imagePosition: 'center',
    status: 'Active',
  },
];

/* Slide Hero Halaman Produk: bisa "Konten + Gambar" atau "Hanya Gambar Saja" */
const defaultProductSlides = [
  {
    id: 1,
    isFullImage: false,
    subtitle: 'NATURAL. LUXURIOUS. YOU.',
    titleLine1: 'Glow Naturally',
    titleLine2: 'Shine Confidently',
    description:
      'Rangkaian skincare dan kecantikan berkualitas tinggi yang diformulasikan untuk kilau alami kulit Anda.',
    buttonPrimary: 'Shop Now',
    buttonSecondary: 'Explore Collections',
    showBadges: true,
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85',
    imageFit: 'cover',
    imagePosition: 'center',
    status: 'Active',
  },
  {
    id: 2,
    isFullImage: true,
    titleLine2: 'Banner Produk 1',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=85',
    imageFit: 'cover',
    imagePosition: 'center',
    status: 'Active',
  },
];

const defaultContent = {
  clinicPromoText:
    '✦ KLIEN BARU: DISKON 10% UNTUK TREATMENT PERTAMA — GUNAKAN KODE: WELCOME10 ✦',
  clinicHeroSubtitle: 'ENHANCE. REFINE. EMPOWER.',
  clinicHeroTitleLine1: 'Elevate Your',
  clinicHeroTitleLine2: 'Natural Beauty',
  clinicHeroDescription:
    'Perawatan estetika modern yang dirancang khusus untuk meningkatkan kepercayaan diri dan kilau alami kulit Anda.',
  clinicHeroImage:
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85',
  clinicDiscountBadge: '10% OFF',
  clinicAboutSubtitle: 'Welcome to HSK Secret',
  clinicAboutTitle: 'TENTANG KAMI',
  clinicAboutDescription:
    'Di HSK Secret Beauty & Aesthetics, kami menghadirkan rangkaian perawatan kulit dan estetika terbaik dalam suasana mewah dan menenangkan. Misi kami adalah membantu Anda tampil percaya diri dengan perawatan personal dan hasil terbaik.',
  clinicAboutImage:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
  clinicPhone: '+62 812-8899-0011',
  clinicEmail: 'hsksecret.admin@gmail.com',
  clinicAddress: 'Jl. Senopati Raya No. 123, Jakarta Selatan',
  clinicHours: 'Senin–Sabtu: 09:00 – 19:00 WIB',

  productPromoLeft: '✦ Gratis Ongkir Untuk Pembelian di Atas Rp 500.000',
  productPromoCenter: 'Diskon 20% Pesanan Pertama · Gunakan Kode: GLOW20',
  productHeroSubtitle: 'NATURAL. LUXURIOUS. YOU.',
  productHeroTitleLine1: 'Glow Naturally',
  productHeroTitleLine2: 'Shine Confidently',
  productHeroDescription:
    'Rangkaian skincare dan kecantikan berkualitas tinggi yang diformulasikan untuk kilau alami kulit Anda.',
  productHeroImage:
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85',
  productOfferTitle: 'Get 20% OFF Your First Order',
  productOfferCode: 'GLOW20',
};

const defaultCategories = [
  {
    id: 1,
    code: 'CAT-01',
    name: 'SKINCARE',
    description: 'Serum, moisturizer, toner & facial oil',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    code: 'CAT-02',
    name: 'MAKEUP',
    description: 'Luxury cosmetics, lip tint & cushion',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    code: 'CAT-03',
    name: 'HAIRCARE',
    description: 'Nourishing hair elixir, shampoo & mask',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    code: 'CAT-04',
    name: 'BATH & BODY',
    description: 'Body lotion, scrub & aromatic shower gel',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6828?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 5,
    code: 'CAT-05',
    name: 'FRAGRANCE',
    description: 'Signature eau de parfum & body mist',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 6,
    code: 'CAT-06',
    name: 'TOOLS & BRUSHES',
    description: 'Gua sha, rose quartz roller & beauty brushes',
    status: 'Active',
    isOffer: false,
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 7,
    code: 'CAT-07',
    name: 'OFFERS',
    description: 'Special bundle & seasonal discount up to 20%',
    status: 'Active',
    isOffer: true,
    image: '',
  },
];

const defaultTreatments = [
  {
    id: 1,
    title: 'HYDRAFACIAL',
    category: 'Face',
    description: 'Deep cleanse, exfoliate and hydrate for glowing skin.',
    fullDescription:
      'Perawatan Hydrafacial Signature HSK SECRET menggunakan teknologi vortex-fusion medis untuk membersihkan pori-pori secara mendalam, mengangkat sel kulit mati tanpa rasa sakit, serta memasukkan serum antioksidan, peptida, dan hyaluronic acid langsung ke lapisan kulit terdalam.',
    price: 'Rp 650.000',
    duration: '60 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Deep Cleansing & Analisis Kulit | 2. Gentle Acid Peel & Eksfoliasi | 3. Ekstraksi Vakum Vortex Tanpa Sakit | 4. Infusi Serum Hyaluronic & Antioksidan | 5. Masker Gold Calming & LED Light Therapy',
    processPhotos: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1512290900672-1f84d1714b12?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 2,
    title: 'BROW SHAPING & TINT',
    category: 'Face',
    description: 'Perfectly shaped brows that frame your face.',
    fullDescription:
      'Perawatan pembentukan dan pewarnaan alis presisi tinggi oleh spesialis brow artist HSK SECRET. Disesuaikan dengan proporsi anatomi wajah Anda menggunakan pigmen organik lembut yang tahan lama untuk tampilan alis rapi, penuh, dan natural.',
    price: 'Rp 250.000',
    duration: '30 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Konsultasi & Brow Mapping Proporsi Wajah | 2. Gentle Waxing & Tweezing Presisi | 3. Aplikasi Botanical Henna / Tint | 4. Nourishing Brow Keratin Serum',
    processPhotos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 3,
    title: 'DERMAPLANING',
    category: 'Face',
    description: 'Smooth, radiant skin by removing dead skin cells.',
    fullDescription:
      'Prosedur eksfoliasi fisik non-invasif menggunakan instrumen steril khusus untuk mengangkat lapisan sel kulit mati kusam dan bulu halus (peach fuzz) di permukaan wajah. Kulit langsung terasa selembut sutra, cerah seketika, dan penyerapan skincare meningkat drastis.',
    price: 'Rp 550.000',
    duration: '45 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Double Cleansing & Antiseptik Prep | 2. Prosedur Dermaplaning Steril Presisi | 3. Enzyme Brightening Peel | 4. Soothing Rose Quartz Mask & SPF Protection',
    processPhotos: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 4,
    title: 'LIP FILLER',
    category: 'Face',
    description: 'Enhance and define your lips with natural-looking results.',
    fullDescription:
      'Perawatan estetika medis oleh dokter estetika berpengalaman menggunakan dermal filler berbasis Hyaluronic Acid premium bersertifikasi FDA/BPOM. Memberikan volume bibir yang proporsional, memperbaiki kontur bibir, dan melembapkan bibir dengan hasil sangat natural.',
    price: 'Rp 1.200.000',
    duration: '45 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Konsultasi Desain Bentuk Bibir dengan Dokter | 2. Aplikasi Krim Anestesi Topikal (20 Menit) | 3. Injeksi Micro-Cannula Hyaluronic Acid Presisi | 4. Cold Compress & Aftercare Lip Balm',
    processPhotos: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 5,
    title: 'LASER HAIR REMOVAL',
    category: 'Body',
    description: 'Long-lasting smoothness with advanced technology.',
    fullDescription:
      'Teknologi Diode Laser generasi terbaru dengan sistem pendingin ujung kristal safir (-5°C) yang nyaman dan bebas rasa panas. Menargetkan folikel rambut secara selektif untuk menghentikan pertumbuhan bulu secara permanen sekaligus mencerahkan pori-pori kulit tubuh.',
    price: 'Rp 350.000',
    duration: '30 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Pembersihan Area & Shaving Steril | 2. Aplikasi Cooling Ultrasound Gel | 3. Penyinaran Sapphire Diode Laser | 4. Aplikasi Soothing Aloe & Post-Laser Cream',
    processPhotos: [
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 6,
    title: 'LASH EXTENSIONS',
    category: 'Face',
    description: 'Enhance your natural beauty with long-lasting lashes.',
    fullDescription:
      'Pemasangan bulu mata sutra super ringan (Cashmere Silk Lash) helai demi helai dengan teknik isolasi presisi. Tidak terasa berat di kelopak mata, aman bagi bulu mata asli, dan memberikan efek mata lebih hidup serta lentik memukau hingga 6 minggu.',
    price: 'Rp 450.000',
    duration: '60 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1512290900672-1f84d1714b12?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Konsultasi Desain Curl & Panjang Bulu Mata | 2. Lash Spa Cleansing & Collagen Eye Patch | 3. Aplikasi Helai demi Helai Cashmere Lash | 4. Nano Mist Curing & Lash Brushing',
    processPhotos: [
      'https://images.unsplash.com/photo-1512290900672-1f84d1714b12?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 7,
    title: 'BODY CONTOURING & SCULPT',
    category: 'Body',
    description: 'Firm, tone and contour your body silhouette naturally.',
    fullDescription:
      'Perawatan pembentukan kontur tubuh non-bedah menggunakan gelombang Radiofrequency (RF) multipolar dan pijat drainase limfatik untuk mengencangkan kulit, menyamarkan selulit, dan meluruhkan lemak membandel.',
    price: 'Rp 750.000',
    duration: '60 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Pengukuran Lingkar & Analisis Area Tubuh | 2. Aplikasi Firming Thermal Gel | 3. Terapi RF Multipolar & Cavitation | 4. Lymphatic Drainage Massage',
    processPhotos: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 8,
    title: 'KERATIN HAIR & SCALP SPA',
    category: 'Hair',
    description: 'Deep scalp detox and luxury keratin hair nourishment.',
    fullDescription:
      'Perawatan intensif kulit kepala dan batang rambut menggunakan kamera analisis folikel, eksfoliasi kulit kepala, ozon steamer, serta infusi serum keratin murni dan argan oil untuk rambut berkilau, sehat, dan bebas rontok.',
    price: 'Rp 480.000',
    duration: '60 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Microscopic Scalp Check & Detox Scrub | 2. Deep Cleansing Aromatic Wash | 3. Infusi Keratin & Botanical Hair Mask | 4. Ozone Mist Therapy & Blow Styling',
    processPhotos: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85',
    ],
  },
  {
    id: 9,
    title: 'AROMATHERAPY & GLOW WELLNESS',
    category: 'Wellness',
    description: 'Holistic relaxation ritual for mind, body and radiant skin.',
    fullDescription:
      'Terapi relaksasi holistik yang memadukan pijat akupresur aromaterapi minyak esensial mawar organik, hot stone therapy, dan infusi antioksidan untuk melepas stres, melancarkan sirkulasi darah, serta mengembalikan kesegaran tubuh.',
    price: 'Rp 590.000',
    duration: '90 Menit',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
    processSteps:
      '1. Foot Ritual & Rose Tea Welcome | 2. Full Body Aromatherapy Essential Oil Massage | 3. Warm Volcanic Stone Therapy | 4. Refreshing Facial Acupressure',
    processPhotos: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    ],
  },
];

const defaultFlashSaleConfig = {
  isActive: true,
  title: 'FLASH SALE SPESIAL HSK SECRET',
  subtitle: 'Promo Potongan Harga Eksklusif Waktu Terbatas',
  badgeText: '⚡ FLASH SALE',
  countdownHours: 4,
};

const defaultProducts = [
  {
    id: 1,
    sku: 'HSK-PRD-001',
    name: 'Radiance Glow Serum',
    subtitle: 'Brightening & Repairing',
    category: 'SKINCARE',
    price: 'Rp 490.000',
    isFlashSale: true,
    originalPrice: 'Rp 490.000',
    flashSalePrice: 'Rp 343.000',
    discountPercent: 30,
    flashSaleQuota: 30,
    flashSaleSold: 22,
    stock: 42,
    reviews: 128,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 2,
    sku: 'HSK-PRD-002',
    name: 'Hydra Boost Cream',
    subtitle: 'Deep Hydration',
    category: 'SKINCARE',
    price: 'Rp 440.000',
    isFlashSale: true,
    originalPrice: 'Rp 440.000',
    flashSalePrice: 'Rp 330.000',
    discountPercent: 25,
    flashSaleQuota: 25,
    flashSaleSold: 18,
    stock: 28,
    reviews: 96,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 3,
    sku: 'HSK-PRD-003',
    name: 'Vitamin C Brightening Serum',
    subtitle: 'Even Tone & Glow',
    category: 'SKINCARE',
    price: 'Rp 290.000',
    isFlashSale: false,
    originalPrice: 'Rp 290.000',
    flashSalePrice: 'Rp 232.000',
    discountPercent: 20,
    flashSaleQuota: 20,
    flashSaleSold: 5,
    stock: 0,
    reviews: 112,
    status: 'Out of Stock',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 4,
    sku: 'HSK-PRD-004',
    name: 'Rose Quartz Facial Mist',
    subtitle: 'Hydrate & Refresh',
    category: 'SKINCARE',
    price: 'Rp 220.000',
    isFlashSale: true,
    originalPrice: 'Rp 220.000',
    flashSalePrice: 'Rp 154.000',
    discountPercent: 30,
    flashSaleQuota: 40,
    flashSaleSold: 31,
    stock: 65,
    reviews: 84,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 5,
    sku: 'HSK-PRD-005',
    name: 'Luxury Face Oil',
    subtitle: 'Nourish & Rejuvenate',
    category: 'SKINCARE',
    price: 'Rp 550.000',
    isFlashSale: false,
    originalPrice: 'Rp 550.000',
    flashSalePrice: 'Rp 440.000',
    discountPercent: 20,
    flashSaleQuota: 15,
    flashSaleSold: 6,
    stock: 19,
    reviews: 76,
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=85',
  },
];

const defaultUsers = [
  {
    id: 1,
    code: 'USR-CUST-001',
    name: 'Sophia Marlowe',
    email: 'sophia.marlowe@gmail.com',
    phone: '081234567890',
    password: 'password123',
    accountType: 'Customer',
    tier: 'VIP Member',
    totalOrders: 6,
    totalSpent: 'Rp 3.120.000',
    joinedDate: '2026-08-14',
    status: 'Active',
  },
  {
    id: 2,
    code: 'USR-CUST-002',
    name: 'Emily Richardson',
    email: 'emily.r@gmail.com',
    phone: '081398765432',
    password: 'password123',
    accountType: 'Customer',
    tier: 'Regular Member',
    totalOrders: 3,
    totalSpent: 'Rp 1.420.000',
    joinedDate: '2026-09-02',
    status: 'Active',
  },
  {
    id: 3,
    code: 'USR-GUEST-003',
    name: 'Nadia Putri (Guest)',
    email: 'nadia.guest@gmail.com',
    phone: '085722334455',
    accountType: 'Guest',
    tier: 'Guest Checkout',
    totalOrders: 1,
    totalSpent: 'Rp 490.000',
    joinedDate: '2026-10-18',
    status: 'Active',
  },
  {
    id: 4,
    code: 'USR-CUST-004',
    name: 'Jessica Laurent',
    email: 'jessica.laurent@gmail.com',
    phone: '081155667788',
    password: 'password123',
    accountType: 'Customer',
    tier: 'VIP Member',
    totalOrders: 8,
    totalSpent: 'Rp 4.650.000',
    joinedDate: '2026-07-21',
    status: 'Active',
  },
  {
    id: 5,
    code: 'USR-GUEST-005',
    name: 'Amanda Wijaya (Guest)',
    email: 'amanda.w@yahoo.com',
    phone: '087811223344',
    accountType: 'Guest',
    tier: 'Guest Checkout',
    totalOrders: 1,
    totalSpent: 'Rp 660.000',
    joinedDate: '2026-10-20',
    status: 'Active',
  },
];

const defaultCart = [
  {
    id: 1,
    sku: 'HSK-PRD-001',
    name: 'Radiance Glow Serum',
    subtitle: 'Brightening & Repairing',
    category: 'SKINCARE',
    price: 'Rp 490.000',
    qty: 1,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 2,
    sku: 'HSK-PRD-002',
    name: 'Hydra Boost Cream',
    subtitle: 'Deep Hydration',
    category: 'SKINCARE',
    price: 'Rp 440.000',
    qty: 1,
    image:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85',
  },
];

export const parseRupiah = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  const cleaned = String(priceStr || '').replace(/[^0-9]/g, '');
  return Number(cleaned) || 0;
};

export const formatRupiah = (amount) => {
  const num = Number(amount) || 0;
  return 'Rp ' + num.toLocaleString('id-ID');
};

const defaultOrders = [
  {
    id: 1,
    invoice: 'INV-HSK-2026-001',
    customerName: 'Sophia Marlowe',
    accountType: 'Customer',
    itemsSummary: 'Radiance Glow Serum (1x), Hydra Boost Cream (1x)',
    qty: 2,
    totalAmount: 'Rp 930.000',
    paymentMethod: 'BCA Virtual Account',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    orderDate: '2026-10-19',
  },
  {
    id: 2,
    invoice: 'INV-HSK-2026-002',
    customerName: 'Nadia Putri (Guest)',
    accountType: 'Guest',
    itemsSummary: 'Radiance Glow Serum (1x)',
    qty: 1,
    totalAmount: 'Rp 490.000',
    paymentMethod: 'QRIS / GoPay',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    orderDate: '2026-10-20',
  },
  {
    id: 3,
    invoice: 'INV-HSK-2026-003',
    customerName: 'Emily Richardson',
    accountType: 'Customer',
    itemsSummary: 'Luxury Face Oil (1x), Rose Quartz Facial Mist (1x)',
    qty: 2,
    totalAmount: 'Rp 770.000',
    paymentMethod: 'Mandiri Transfer',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    orderDate: '2026-10-17',
  },
  {
    id: 4,
    invoice: 'INV-HSK-2026-004',
    customerName: 'Amanda Wijaya (Guest)',
    accountType: 'Guest',
    itemsSummary: 'Hydra Boost Cream (1x), Rose Quartz Facial Mist (1x)',
    qty: 2,
    totalAmount: 'Rp 660.000',
    paymentMethod: 'Transfer Bank BCA',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    orderDate: '2026-10-21',
  },
];

const defaultShipments = [
  {
    id: 1,
    trackingNumber: 'AWB-HSK-88901',
    invoice: 'INV-HSK-2026-001',
    recipientName: 'Sophia Marlowe',
    accountType: 'Customer',
    courier: 'JNE YES',
    shippingCost: 'Gratis Ongkir (Rp 0)',
    address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan',
    estimatedArrival: '2026-10-22',
    status: 'Dalam Perjalanan',
  },
  {
    id: 2,
    trackingNumber: 'AWB-HSK-88902',
    invoice: 'INV-HSK-2026-002',
    recipientName: 'Nadia Putri (Guest)',
    accountType: 'Guest',
    courier: 'J&T Express',
    shippingCost: 'Rp 25.000',
    address: 'Jl. Dago Asri No. 12, Coblong, Bandung',
    estimatedArrival: '2026-10-23',
    status: 'Menunggu Kurir',
  },
  {
    id: 3,
    trackingNumber: 'AWB-HSK-88903',
    invoice: 'INV-HSK-2026-003',
    recipientName: 'Emily Richardson',
    accountType: 'Customer',
    courier: 'SiCepat Best',
    shippingCost: 'Gratis Ongkir (Rp 0)',
    address: 'Jl. Darmo Permai III No. 88, Surabaya',
    estimatedArrival: '2026-10-19',
    status: 'Terkirim / Selesai',
  },
  {
    id: 4,
    trackingNumber: 'AWB-HSK-88904',
    invoice: 'INV-HSK-2026-004',
    recipientName: 'Amanda Wijaya (Guest)',
    accountType: 'Guest',
    courier: 'SiCepat Reguler',
    shippingCost: 'Gratis Ongkir (Rp 0)',
    address: 'Jl. Sunset Road No. 101, Seminyak, Bali',
    estimatedArrival: '2026-10-24',
    status: 'Menunggu Kurir',
  },
];

const defaultRecipientAddresses = [
  {
    id: 101,
    label: 'Alamat Rumah Utama',
    recipientName: 'Sophia Marlowe',
    phone: '081234567890',
    address: 'Jl. Senopati Raya No. 45, RT 04/RW 02, Kel. Senayan, Kec. Kebayoran Baru',
    city: 'Jakarta Selatan, DKI Jakarta',
    postalCode: '12190',
    notes: 'Rumah pagar putih samping taman',
    accountType: 'Customer',
    isPrimary: true,
  },
];

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [clinicSlides, setClinicSlides] = useState(() => {
    const saved = localStorage.getItem('hsk_v4_clinic_slides');
    return saved ? JSON.parse(saved) : defaultClinicSlides;
  });

  const [productSlides, setProductSlides] = useState(() => {
    const saved = localStorage.getItem('hsk_v1_product_slides');
    return saved ? JSON.parse(saved) : defaultProductSlides;
  });

  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('hsk_v2_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('hsk_v2_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [treatments, setTreatments] = useState(() => {
    const saved = localStorage.getItem('hsk_v5_treatments');
    return saved ? JSON.parse(saved) : defaultTreatments;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('hsk_v3_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [flashSaleConfig, setFlashSaleConfig] = useState(() => {
    const saved = localStorage.getItem('hsk_v1_flash_sale_config');
    return saved ? JSON.parse(saved) : defaultFlashSaleConfig;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hsk_v3_users');
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('hsk_v2_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  const [shipments, setShipments] = useState(() => {
    const saved = localStorage.getItem('hsk_v2_shipments');
    return saved ? JSON.parse(saved) : defaultShipments;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('hsk_v1_cart');
    return saved ? JSON.parse(saved) : defaultCart;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hsk_v1_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [recipientAddresses, setRecipientAddresses] = useState(() => {
    const saved = localStorage.getItem('hsk_v1_recipient_addresses');
    return saved ? JSON.parse(saved) : defaultRecipientAddresses;
  });

  useEffect(() => {
    localStorage.setItem('hsk_v4_clinic_slides', JSON.stringify(clinicSlides));
  }, [clinicSlides]);

  useEffect(() => {
    localStorage.setItem('hsk_v1_product_slides', JSON.stringify(productSlides));
  }, [productSlides]);

  useEffect(() => {
    localStorage.setItem('hsk_v2_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('hsk_v2_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('hsk_v5_treatments', JSON.stringify(treatments));
  }, [treatments]);

  useEffect(() => {
    localStorage.setItem('hsk_v3_products', JSON.stringify(products));
  }, [products]);

  // Sinkronisasi otomatis field Flash Sale jika state lama di browser belum memiliki isFlashSale
  useEffect(() => {
    if (products.length > 0 && typeof products[0].isFlashSale === 'undefined') {
      setProducts(defaultProducts);
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      'hsk_v1_flash_sale_config',
      JSON.stringify(flashSaleConfig)
    );
  }, [flashSaleConfig]);

  useEffect(() => {
    localStorage.setItem('hsk_v3_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('hsk_v2_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hsk_v2_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('hsk_v1_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hsk_v1_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hsk_v1_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(
      'hsk_v1_recipient_addresses',
      JSON.stringify(recipientAddresses)
    );
  }, [recipientAddresses]);

  // Fungsi Keranjang (Cart) — Otomatis menggunakan harga Flash Sale jika produk sedang Flash Sale
  const addToCart = (product, qty = 1) => {
    const effectivePrice =
      product.isFlashSale && product.flashSalePrice
        ? product.flashSalePrice
        : product.price;
    const strikethroughPrice = product.isFlashSale
      ? product.originalPrice || product.price
      : null;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                price: effectivePrice,
                originalPrice: strikethroughPrice,
                isFlashSale: Boolean(product.isFlashSale),
                qty: item.qty + qty,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          sku: product.sku || `HSK-PRD-00${product.id}`,
          name: product.name,
          subtitle: product.subtitle || product.category,
          category: product.category,
          price: effectivePrice,
          originalPrice: strikethroughPrice,
          isFlashSale: Boolean(product.isFlashSale),
          qty,
          image: product.image,
        },
      ];
    });
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + parseRupiah(item.price) * (item.qty || 1),
    0
  );

  // Fungsi Autentikasi Customer (No Telpon/WA) & Guest
  const normalizePhone = (phoneStr) =>
    String(phoneStr || '')
      .replace(/[^0-9]/g, '')
      .replace(/^62/, '0');

  const registerCustomerByPhone = ({ phone, name, password }) => {
    const cleanPhone = normalizePhone(phone);
    const exists = users.find(
      (u) =>
        u.accountType === 'Customer' && normalizePhone(u.phone) === cleanPhone
    );
    if (exists) {
      return {
        success: false,
        message: 'Nomor telepon / WA sudah terdaftar! Silakan langsung Login.',
      };
    }

    const newUser = {
      id: Date.now(),
      code: `USR-CUST-00${users.length + 1}`,
      name: name.trim(),
      email: `${cleanPhone}@hskcustomer.id`,
      phone: phone.trim(),
      password,
      accountType: 'Customer',
      tier: 'Regular Member',
      totalOrders: 0,
      totalSpent: 'Rp 0',
      joinedDate: new Date().toISOString().slice(0, 10),
      status: 'Active',
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const loginCustomerByPhone = ({ phone, password }) => {
    const cleanPhone = normalizePhone(phone);
    const found = users.find(
      (u) =>
        normalizePhone(u.phone) === cleanPhone &&
        (!u.password || u.password === password)
    );
    if (!found) {
      return {
        success: false,
        message:
          'Nomor Telepon / WA atau Password tidak ditemukan. Silakan daftar akun terlebih dahulu.',
      };
    }
    setCurrentUser(found);
    return { success: true, user: found };
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: Date.now(),
      code: `USR-GUEST-${String(Date.now()).slice(-3)}`,
      name: 'Tamu / Guest HSK',
      phone: '',
      accountType: 'Guest',
      tier: 'Guest Checkout',
      joinedDate: new Date().toISOString().slice(0, 10),
      status: 'Active',
    };
    setCurrentUser(guestUser);
    return guestUser;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
  };

  // Fungsi Kelola Profile & Data Penerima Barang Pembelian (Customer maupun Guest)
  const saveProfileAndRecipient = ({
    accountType,
    label,
    recipientName,
    phone,
    address,
    city,
    postalCode,
    notes,
    editingAddressId,
  }) => {
    const activeType = accountType || currentUser?.accountType || 'Guest';

    // Update currentUser agar data nama, no telpon & alamat tersimpan di sesi aktif
    const updatedUser = {
      ...(currentUser || {
        id: Date.now(),
        code:
          activeType === 'Customer'
            ? `USR-CUST-00${users.length + 1}`
            : `USR-GUEST-00${users.length + 1}`,
        tier: activeType === 'Customer' ? 'Regular Member' : 'Guest Checkout',
        joinedDate: new Date().toISOString().slice(0, 10),
        status: 'Active',
      }),
      name: recipientName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: (notes || '').trim(),
      accountType: activeType,
    };
    setCurrentUser(updatedUser);

    // Tambah atau Update ke Daftar Alamat Penerima (Buku Alamat)
    if (editingAddressId) {
      setRecipientAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddressId
            ? {
                ...addr,
                label: label || 'Alamat Pengiriman',
                recipientName: recipientName.trim(),
                phone: phone.trim(),
                address: address.trim(),
                city: city.trim(),
                postalCode: postalCode.trim(),
                notes: (notes || '').trim(),
                accountType: activeType,
              }
            : addr
        )
      );
    } else {
      const newAddr = {
        id: Date.now(),
        label: label || 'Alamat Penerima Utama',
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        notes: (notes || '').trim(),
        accountType: activeType,
        isPrimary: true,
      };
      setRecipientAddresses((prev) => [
        newAddr,
        ...prev.map((a) => ({ ...a, isPrimary: false })),
      ]);
    }

    // Sinkronkan juga ke daftar Users (agar Admin bisa melihat data Customer/Guest)
    const cleanPhone = normalizePhone(phone);
    const existingIdx = users.findIndex(
      (u) =>
        u.id === updatedUser.id ||
        (cleanPhone !== '' && normalizePhone(u.phone) === cleanPhone)
    );
    if (existingIdx >= 0) {
      setUsers((prev) =>
        prev.map((u, idx) =>
          idx === existingIdx
            ? {
                ...u,
                name:
                  activeType === 'Guest' && !recipientName.includes('(Guest)')
                    ? `${recipientName.trim()} (Guest)`
                    : recipientName.trim(),
                phone: phone.trim(),
                address: `${address.trim()}, ${city.trim()} ${postalCode.trim()}`,
              }
            : u
        )
      );
    } else {
      const newUserRec = {
        id: updatedUser.id,
        code:
          activeType === 'Customer'
            ? `USR-CUST-00${users.length + 1}`
            : `USR-GUEST-00${users.length + 1}`,
        name:
          activeType === 'Guest' && !recipientName.includes('(Guest)')
            ? `${recipientName.trim()} (Guest)`
            : recipientName.trim(),
        email: `${cleanPhone || 'guest'}@hsksecret.id`,
        phone: phone.trim(),
        address: `${address.trim()}, ${city.trim()} ${postalCode.trim()}`,
        accountType: activeType,
        tier: activeType === 'Customer' ? 'Regular Member' : 'Guest Checkout',
        totalOrders: 0,
        totalSpent: 'Rp 0',
        joinedDate: new Date().toISOString().slice(0, 10),
        status: 'Active',
      };
      setUsers((prev) => [newUserRec, ...prev]);
    }

    return updatedUser;
  };

  const setPrimaryRecipientAddress = (addrId) => {
    const selected = recipientAddresses.find((a) => a.id === addrId);
    setRecipientAddresses((prev) =>
      prev.map((a) => ({ ...a, isPrimary: a.id === addrId }))
    );
    if (selected) {
      setCurrentUser((prev) => ({
        ...(prev || {}),
        name: selected.recipientName,
        phone: selected.phone,
        address: selected.address,
        city: selected.city,
        postalCode: selected.postalCode,
        notes: selected.notes,
        accountType: selected.accountType || prev?.accountType || 'Guest',
      }));
    }
  };

  const deleteRecipientAddress = (addrId) => {
    setRecipientAddresses((prev) => prev.filter((a) => a.id !== addrId));
  };

  // Fungsi Proses Transaksi Checkout (Simpan ke Orders, Shipments & Users)
  const createOrderTransaction = ({
    buyerName,
    buyerPhone,
    address,
    city,
    postalCode,
    notes,
    courierName,
    shippingCostNum,
    estimatedDays,
    paymentMethod,
  }) => {
    const today = new Date().toISOString().slice(0, 10);
    const invoiceCode = `INV-HSK-2026-00${orders.length + 1}`;
    const awbCode = `AWB-HSK-${Math.floor(10000 + Math.random() * 90000)}`;
    const accountType =
      currentUser?.accountType === 'Customer' ? 'Customer' : 'Guest';

    const itemsSummary = cart
      .map((item) => `${item.name} (${item.qty}x)`)
      .join(', ');
    const totalQty = cartTotalItems;
    const grandTotalNum = cartSubtotal + Number(shippingCostNum || 0);
    const grandTotalFormatted = formatRupiah(grandTotalNum);

    const newOrder = {
      id: Date.now(),
      invoice: invoiceCode,
      customerName:
        accountType === 'Guest' && !buyerName.includes('(Guest)')
          ? `${buyerName} (Guest)`
          : buyerName,
      phone: buyerPhone,
      accountType,
      itemsSummary,
      qty: totalQty,
      subtotalAmount: formatRupiah(cartSubtotal),
      shippingCost:
        shippingCostNum === 0
          ? 'Gratis Ongkir (Rp 0)'
          : formatRupiah(shippingCostNum),
      totalAmount: grandTotalFormatted,
      paymentMethod,
      paymentStatus: paymentMethod.includes('COD') ? 'Pending' : 'Paid',
      orderStatus: 'Processing',
      orderDate: today,
    };

    const fullAddress = [address, city, postalCode ? `Kode Pos ${postalCode}` : '', notes ? `(${notes})` : '']
      .filter(Boolean)
      .join(', ');

    const newShipment = {
      id: Date.now() + 1,
      trackingNumber: awbCode,
      invoice: invoiceCode,
      recipientName: newOrder.customerName,
      phone: buyerPhone,
      accountType,
      courier: courierName,
      shippingCost: newOrder.shippingCost,
      address: fullAddress,
      estimatedArrival: estimatedDays || today,
      status: 'Menunggu Kurir',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setShipments((prev) => [newShipment, ...prev]);

    // Update atau Tambahkan Data Pembeli di Users
    const cleanPhone = normalizePhone(buyerPhone);
    const existingUser = users.find(
      (u) => normalizePhone(u.phone) === cleanPhone && cleanPhone !== ''
    );
    if (existingUser) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id !== existingUser.id) return u;
          const prevSpent = parseRupiah(u.totalSpent);
          return {
            ...u,
            totalOrders: (u.totalOrders || 0) + 1,
            totalSpent: formatRupiah(prevSpent + grandTotalNum),
          };
        })
      );
    } else {
      const newBuyerRecord = {
        id: Date.now() + 2,
        code:
          accountType === 'Customer'
            ? `USR-CUST-00${users.length + 1}`
            : `USR-GUEST-00${users.length + 1}`,
        name: newOrder.customerName,
        email: `${cleanPhone || 'guest'}@hsksecret.id`,
        phone: buyerPhone,
        accountType,
        tier: accountType === 'Customer' ? 'Regular Member' : 'Guest Checkout',
        totalOrders: 1,
        totalSpent: grandTotalFormatted,
        joinedDate: today,
        status: 'Active',
      };
      setUsers((prev) => [newBuyerRecord, ...prev]);
    }

    clearCart();

    return {
      order: newOrder,
      shipment: newShipment,
      items: [...cart],
    };
  };

  const resetAllData = () => {
    setClinicSlides(defaultClinicSlides);
    setProductSlides(defaultProductSlides);
    setContent(defaultContent);
    setCategories(defaultCategories);
    setTreatments(defaultTreatments);
    setProducts(defaultProducts);
    setUsers(defaultUsers);
    setOrders(defaultOrders);
    setShipments(defaultShipments);
    setCart(defaultCart);
  };

  return (
    <StoreContext.Provider
      value={{
        clinicSlides,
        setClinicSlides,
        defaultClinicSlides,
        productSlides,
        setProductSlides,
        defaultProductSlides,
        content,
        setContent,
        categories,
        setCategories,
        treatments,
        setTreatments,
        products,
        setProducts,
        flashSaleConfig,
        setFlashSaleConfig,
        defaultFlashSaleConfig,
        users,
        setUsers,
        orders,
        setOrders,
        shipments,
        setShipments,
        cart,
        setCart,
        defaultCart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotalItems,
        cartSubtotal,
        currentUser,
        setCurrentUser,
        recipientAddresses,
        setRecipientAddresses,
        saveProfileAndRecipient,
        setPrimaryRecipientAddress,
        deleteRecipientAddress,
        registerCustomerByPhone,
        loginCustomerByPhone,
        loginAsGuest,
        logoutCustomer,
        createOrderTransaction,
        parseRupiah,
        formatRupiah,
        resetAllData,
        defaultContent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
