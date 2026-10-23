import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  BadgeCheck,
  Stethoscope,
  FlaskConical,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  CalendarCheck,
  MessageCircle,
  Instagram,
  Building2,
  X,
  Quote,
  Maximize2,
} from 'lucide-react';

/* Palet warna mengikuti desain halaman Tentang Kami (rose pink) */
const C = {
  primary: '#DA5B86',
  primaryDark: '#C84873',
  primaryDeep: '#A9365E',
  blush: '#FDF7F8',
  blush100: '#FAF0F2',
  rose50: '#FDF2F5',
  dark: '#2D1F23',
  sub: '#665359',
  border: '#F2D3DC',
};

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const STATS = [
  { value: '15+', title: 'Tahun Melayani', sub: 'Sejak 2009 di Cianjur' },
  { value: '10k+', title: 'Pasien Puas', sub: 'Keluarga, Pria & Remaja' },
  { value: '100%', title: 'BPOM & Halal', sub: 'Kualitas Teruji Medis' },
  { value: 'Modern', title: 'Teknologi Terkini', sub: 'Nature Meet Technology' },
];

const BADGES = [
  { icon: ShieldCheck, label: 'BPOM Resmi' },
  { icon: BadgeCheck, label: 'Halal Certified' },
  { icon: Stethoscope, label: 'Tim Dokter Medis' },
  { icon: FlaskConical, label: 'Teruji Klinis' },
];

const VISI_CARDS = [
  {
    no: '01',
    title: 'Dokter & Terapis Handal',
    desc: 'Didukung oleh tim dokter profesional bersertifikat dan terapis berpengalaman dalam bidang dermatologi estetika.',
    image: img('1579684385127-1ef15d508118'),
  },
  {
    no: '02',
    title: 'Nature Meets Tech',
    desc: 'Inovasi berkala memadukan formula botani teruji dengan peralatan estetika canggih yang terkalibrasi medis.',
    image: img('1629909615184-74f495363b67'),
  },
  {
    no: '03',
    title: 'Formula Aman & Teruji',
    desc: 'Semua krim & serum terdaftar BPOM dan Halal, memberikan rasa aman dan kenyamanan maksimal bagi setiap pasien.',
    image: img('1570172619644-dfd03ed5d881'),
  },
  {
    no: '04',
    title: 'Untuk Semua Kalangan',
    desc: 'Layanan personal komprehensif mulai dari perawatan jerawat remaja hingga anti-aging untuk wanita dan pria.',
    image: img('1519494026892-80bbd2d6fd0d'),
  },
];

const MISI = [
  'Membangun perusahaan terpercaya yang mampu melebihi harapan pelanggan.',
  'Meningkatkan kompetensi melalui perbaikan skill, knowledge, attitude dengan melakukan pelatihan yang rutin.',
  'Melakukan inovasi secara berkala baik dalam produk maupun teknologi kecantikan, nature meet technology.',
  'Meningkatkan kerjasama antar divisi.',
  'Menciptakan nilai tambah dengan integritas tinggi. Menjadi perusahaan yang terkemuka di Indonesia di bidang perawatan kecantikan wajah dengan mengutamakan kualitas dan memberikan pelayanan yang prima.',
];

const FACILITY_TABS = [
  'Semua',
  'Ruang Treatment',
  'Konsultasi Dokter',
  'Bangunan & Resepsionis',
  'Lounge & VIP',
  'Alat & Sterilisasi',
];

const FACILITIES = [
  {
    tag: 'Fasilitas Utama',
    title: 'Ruang Treatment Utama & Higienis',
    desc: 'Kenyamanan maksimal dengan sterilisasi udara UV-C rutin.',
    cat: 'Ruang Treatment',
    image: img('1519494026892-80bbd2d6fd0d', 1200),
    featured: true,
  },
  {
    tag: 'Konsultasi',
    title: 'Ruang Konsultasi Dokter',
    desc: 'Diagnosa mendalam & personal',
    cat: 'Konsultasi Dokter',
    image: img('1629909615184-74f495363b67'),
  },
  {
    tag: 'Lounge',
    title: 'VIP Executive Lounge',
    desc: 'Kenyamanan santai bernuansa hangat',
    cat: 'Lounge & VIP',
    image: img('1584132967334-10e028bd69f7'),
  },
  {
    tag: 'Resepsionis',
    title: 'Lobi & Meja Resepsionis',
    desc: 'Pelayanan ramah & cepat',
    cat: 'Bangunan & Resepsionis',
    image: img('1590402494682-cd3fb53b1f70'),
  },
  {
    tag: 'Treatment',
    title: 'Ruang Laser & Facial Care',
    desc: 'Privasi tindakan & kenyamanan',
    cat: 'Ruang Treatment',
    image: img('1570172619644-dfd03ed5d881'),
  },
  {
    tag: 'Sterilisasi',
    title: 'Alat Sterilisasi Autoclave',
    desc: 'Standar mutu medis tertinggi',
    cat: 'Alat & Sterilisasi',
    image: img('1576091160550-2173dba999ef'),
  },
  {
    tag: 'Produk',
    title: 'Skincare Gallery & Farmasi',
    desc: 'Produk resmi BPOM & Halal',
    cat: 'Lounge & VIP',
    image: img('1522337360788-8b13dee7a37e'),
  },
  {
    tag: 'Inklusif',
    title: 'Perawatan Remaja & Pria',
    desc: 'Semua kalangan & gender',
    cat: 'Ruang Treatment',
    image: img('1612349317150-e413f6a5b16d'),
  },
  {
    tag: 'Teknologi',
    title: 'Skin Analyzer Station',
    desc: 'Analisa kulit presisi digital',
    cat: 'Alat & Sterilisasi',
    image: img('1579684385127-1ef15d508118'),
  },
  {
    tag: 'Eksterior',
    title: 'Gedung Baru No. 85 Cianjur',
    desc: 'Parkir luas & akses mudah',
    cat: 'Bangunan & Resepsionis',
    image: img('1629909613654-28e377c37b09'),
  },
];

const WA_LINK = 'https://wa.me/6281234567890';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [preview, setPreview] = useState(null);
  const visiTrackRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollVisi = (dir) => {
    const el = visiTrackRef.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: 'smooth' });
  };

  const filteredFacilities =
    activeTab === 'Semua'
      ? FACILITIES
      : FACILITIES.filter((f) => f.cat === activeTab);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.blush, color: C.dark }}
    >
      {/* ==================== NAVBAR (sama dengan halaman klinik) ==================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <Link to="/" className="hover:text-[#8B3A4D] transition">
              Home
            </Link>
            <Link
              to="/about"
              className="text-[#8B3A4D] border-b-2 border-[#8B3A4D] pb-1"
            >
              About Us
            </Link>
            {/* Menu Treatment dengan Sub-Bar Kategori: Face, Body, Hair, Wellness, All Treatment */}
            <div className="relative group py-6">
              <Link
                to="/treatments"
                className="hover:text-[#8B3A4D] transition inline-flex items-center gap-1"
              >
                <span>Treatment</span>
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full w-[560px] bg-white shadow-xl border border-gray-100 rounded-xl py-4 px-8 flex items-center justify-between text-xs font-medium normal-case tracking-normal text-gray-800 z-50">
                {['Face', 'Body', 'Hair', 'Wellness'].map((cat) => (
                  <Link
                    key={cat}
                    to={`/treatments?category=${cat}`}
                    className="hover:text-[#8B3A4D] font-semibold transition"
                  >
                    {cat}
                  </Link>
                ))}
                <Link
                  to="/treatments"
                  className="hover:text-[#8B3A4D] font-semibold transition"
                >
                  All Treatment
                </Link>
              </div>
            </div>
            <Link
              to="/products"
              className="text-[#8B3A4D] bg-[#FDF2F2] px-3 py-1.5 rounded-full hover:bg-[#DA5B86] hover:text-white transition"
            >
              Products
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="lg:hidden text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-lg bg-[#FDF2F2] text-[#8B3A4D]"
            >
              Products
            </Link>
            <Link
              to="/treatments"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-semibold tracking-widest uppercase transition shadow-sm"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ==================== HERO ==================== */}
        <section className="pt-10">
          <div className="relative rounded-[2rem] overflow-hidden shadow-xl min-h-[460px] sm:min-h-[560px] flex items-end">
            <img
              src={img('1629909613654-28e377c37b09', 2000)}
              alt="Interior HSK Secret Clinic"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(218,91,134,0.25) 0%, rgba(169,54,94,0.55) 55%, rgba(140,46,78,0.85) 100%)',
              }}
            />
            <div className="relative p-8 sm:p-16 max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 bg-white/15 backdrop-blur text-[11px] font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FFAEC9' }} />
                Klinik Kecantikan Terpercaya Cianjur
              </span>
              <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight mb-5">
                Wujudkan Kulit Sehat &amp; Cantik Alami Bersama Kami
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-xl">
                HSK Secret Clinic memadukan keahlian medis dermatologi, produk
                bersertifikasi, dan teknologi mutakhir untuk memberikan
                perawatan estetika komprehensif bagi seluruh kalangan.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-white text-sm font-bold shadow-lg transition hover:opacity-90"
                style={{ backgroundColor: C.primary }}
              >
                Jadwalkan Konsultasi Gratis
              </a>
            </div>
          </div>
        </section>

        {/* ==================== SEJARAH ==================== */}
        <section id="sejarah" className="scroll-mt-24 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: C.primary }}
            >
              Sejarah Perjalanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-6" style={{ color: C.primaryDeep }}>
              Sejarah HSK Secret
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: C.sub }}>
              <p>
                <span className="font-semibold" style={{ color: C.primary }}>
                  HSK SECRET CLINIC
                </span>{' '}
                berdiri pada tahun 2009 yang beralamat pertama kali di Jl. Ir.
                H. Juanda No. 57 Cianjur, kemudian berpindah ke alamat Jl. Ir.
                H. Juanda No. 85 Cianjur dengan bangunan yang lebih luas serta
                peralatan yang lebih lengkap dan juga modern.
              </p>
              <p>
                HSK SECRET CLINIC memahami bahwa penampilan serta arti
                kecantikan dan kesehatan kulit merupakan aset yang sangat
                penting bagi setiap orang, karena itu HSK SECRET CLINIC tetap
                berkomitmen untuk terus berinovasi dan berupaya menjadikan HSK
                SECRET CLINIC sebagai Pusat Perawatan Kulit yang terpercaya dan
                terbaik di Indonesia, bukan hanya diperuntukkan bagi wanita
                namun sebagai brand yang menjangkau semua kalangan baik
                kategori Remaja hingga Pria.
              </p>
              <p>
                HSK SECRET CLINIC didukung oleh Tim Dokter yang profesional dan
                juga Tim Therapist handal yang berpengalaman, serta produk yang
                sudah bersertifikasi BPOM, Halal dan teruji secara klinis demi
                menjaga kualitas serta kenyamanan bagi setiap orang.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
              {BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: C.primaryDeep }}
                >
                  <Icon className="w-4 h-4" style={{ color: C.primary }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-5 rounded-3xl p-8 sm:p-10 grid grid-cols-2 gap-x-8 gap-y-10 border"
            style={{ backgroundColor: C.blush100, borderColor: C.border }}
          >
            {STATS.map((s) => (
              <div key={s.title}>
                <div className="text-4xl sm:text-5xl font-light" style={{ color: C.primary }}>
                  {s.value}
                </div>
                <div className="text-sm font-semibold mt-2" style={{ color: C.dark }}>
                  {s.title}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: C.sub }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: C.border }} />

        {/* ==================== VISI ==================== */}
        <section id="visi" className="scroll-mt-24 py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: C.primary }}
              >
                Arah &amp; Standar Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-6" style={{ color: C.primaryDeep }}>
                Visi HSK Secret
              </h2>
              <figure
                className="relative overflow-hidden rounded-3xl p-7 sm:p-9 shadow-[0_10px_40px_-15px_rgba(218,91,134,0.35)]"
                style={{
                  background: `linear-gradient(135deg, #FFFFFF 0%, ${C.rose50} 100%)`,
                  border: `1px solid ${C.border}`,
                }}
              >
                {/* Aksen garis kiri */}
                <span
                  className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full"
                  style={{ background: `linear-gradient(180deg, ${C.primary}, ${C.primaryDeep})` }}
                />
                {/* Tanda kutip dekoratif besar */}
                <Quote
                  className="absolute -top-2 right-4 w-28 h-28 rotate-180 pointer-events-none"
                  style={{ color: C.primary, opacity: 0.08 }}
                  fill="currentColor"
                  strokeWidth={0}
                />

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-5 shadow-md"
                  style={{ backgroundColor: C.primary }}
                >
                  <Quote className="w-5 h-5 text-white" fill="currentColor" strokeWidth={0} />
                </div>

                <blockquote
                  className="relative font-serif text-lg sm:text-xl leading-[1.8]"
                  style={{ color: C.dark }}
                >
                  Menjadi klinik yang{' '}
                  <span className="font-semibold" style={{ color: C.primaryDeep }}>
                    terkemuka dan terpercaya di Indonesia
                  </span>{' '}
                  di bidang perawatan kecantikan kulit dengan mengutamakan
                  kualitas dan memberikan pelayanan yang prima dengan tenaga
                  kerja yang profesional dan berpengalaman untuk mewujudkan{' '}
                  <span className="font-semibold" style={{ color: C.primaryDeep }}>
                    kulit sehat dan kecantikan secara menyeluruh
                  </span>
                  , bukan hanya sekadar impian.
                </blockquote>

                <figcaption className="relative flex items-center gap-3 mt-6">
                  <span className="h-px w-10" style={{ backgroundColor: C.primary }} />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: C.primary }}
                  >
                    Visi HSK Secret
                  </span>
                </figcaption>
              </figure>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollVisi(-1)}
                className="w-11 h-11 rounded-full border bg-white flex items-center justify-center transition hover:opacity-80"
                style={{ borderColor: C.border, color: C.primary }}
                aria-label="Sebelumnya"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollVisi(1)}
                className="w-11 h-11 rounded-full text-white flex items-center justify-center shadow-md transition hover:opacity-90"
                style={{ backgroundColor: C.primary }}
                aria-label="Berikutnya"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={visiTrackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {VISI_CARDS.map((card) => (
              <article
                key={card.no}
                className="snap-start shrink-0 w-[80%] sm:w-[45%] lg:w-[calc(25%-18px)] group"
              >
                <div className="relative aspect-[4/3.6] rounded-2xl overflow-hidden mb-4" style={{ backgroundColor: C.blush100 }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white text-[11px] font-bold"
                    style={{ color: C.primary }}
                  >
                    {card.no}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-1.5" style={{ color: C.dark }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: C.sub }}>
                  {card.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: C.border }} />

        {/* ==================== MISI + FASILITAS ==================== */}
        <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Misi */}
          <div id="misi" className="scroll-mt-24 lg:col-span-5 lg:sticky lg:top-28">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: C.primary }}
            >
              Komitmen Pelayanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-2" style={{ color: C.primaryDeep }}>
              MISI HSK Secret
            </h2>
            <p className="text-sm mb-6" style={{ color: C.sub }}>
              Langkah terstruktur kami dalam memberikan pelayanan estetika
              terbaik dan berintegritas tinggi.
            </p>
            <ol className="space-y-3">
              {MISI.map((m, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start bg-white border rounded-2xl p-4 transition hover:shadow-md"
                  style={{ borderColor: C.border }}
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: C.primary }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed pt-1" style={{ color: C.sub }}>
                    {m}
                  </p>
                </li>
              ))}
            </ol>

            <div
              className="relative overflow-hidden mt-6 rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})` }}
            >
              <Building2 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/15" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                Lokasi Gedung Baru
              </span>
              <h3 className="text-lg font-semibold mt-1 mb-2">
                Jl. Ir. H. Juanda No. 85 Cianjur
              </h3>
              <p className="text-xs text-white/85 leading-relaxed relative">
                Gedung baru dengan kapasitas lebih luas, fasilitas lengkap,
                ruang treatment eksklusif, dan parkir memadai.
              </p>
            </div>
          </div>

          {/* Fasilitas */}
          <div id="fasilitas" className="scroll-mt-24 lg:col-span-7">
            <div className="bg-white border rounded-3xl p-5 sm:p-6 mb-6" style={{ borderColor: C.border }}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: C.primary }}
                  >
                    Eksplorasi Fasilitas
                  </span>
                  <h3 className="text-lg font-semibold" style={{ color: C.dark }}>
                    Suasana &amp; Ruangan Klinik
                  </h3>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: C.rose50, color: C.primary }}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {FACILITIES.length} Ruangan
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {FACILITY_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition"
                    style={
                      activeTab === tab
                        ? { backgroundColor: C.primary, borderColor: C.primary, color: '#fff' }
                        : { backgroundColor: '#fff', borderColor: C.border, color: C.sub }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredFacilities.map((f) => (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setPreview(f)}
                  className={`relative group rounded-2xl overflow-hidden text-left ${
                    f.featured && activeTab === 'Semua' ? 'col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={f.image}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: C.primary }}
                  >
                    {f.tag}
                  </span>
                  {f.featured && activeTab === 'Semua' && (
                    <span className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="text-sm font-semibold leading-tight">{f.title}</h4>
                    <p className="text-[11px] text-white/80 mt-0.5">{f.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border bg-white text-xs font-bold uppercase tracking-wider transition hover:opacity-80"
                style={{ borderColor: C.border, color: C.primary }}
              >
                <CalendarCheck className="w-4 h-4" />
                Reservasi Kunjungan Sekarang
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-md transition hover:opacity-90"
                style={{ backgroundColor: C.primary }}
              >
                <MessageCircle className="w-4 h-4" />
                Tanya Fasilitas
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t mt-10" style={{ backgroundColor: C.blush100, borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <img src="/hsk-logo.png" alt="HSK SECRET" className="h-12 w-auto object-contain mb-4" />
            <p className="text-xs leading-relaxed max-w-md mb-4" style={{ color: C.sub }}>
              Pusat perawatan kecantikan kulit terpercaya di Cianjur sejak 2009.
              Berkomitmen menghadirkan kulit sehat bercahaya melalui teknologi
              terkini dan sentuhan tim medis profesional.
            </p>
            <p className="flex items-center gap-2 text-xs mb-1.5" style={{ color: C.sub }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: C.primary }} />
              Jl. Ir. H. Juanda No. 85, Cianjur, Jawa Barat
            </p>
            <p className="flex items-center gap-2 text-xs" style={{ color: C.sub }}>
              <Clock className="w-3.5 h-3.5" style={{ color: C.primary }} />
              Buka Setiap Hari: 09.00 - 18.00 WIB
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.primary }}>
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: C.sub }}>
              <li>
                <Link to="/" className="hover:underline">Beranda</Link>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('sejarah')} className="hover:underline">
                  Sejarah HSK Secret
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('visi')} className="hover:underline">
                  Visi &amp; Standar Mutu
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('misi')} className="hover:underline">
                  Misi Pelayanan
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('fasilitas')} className="hover:underline">
                  Galeri Ruangan
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.primary }}>
              Kontak &amp; Booking
            </h4>
            <p className="text-xs leading-relaxed mb-4" style={{ color: C.sub }}>
              Konsultasikan keluhan kulit wajah Anda bersama dokter estetika kami.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-xs font-bold mb-2 transition hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Klinik
            </a>
            <a
              href="https://instagram.com/hsksecretclinic"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border bg-white text-xs font-semibold transition hover:opacity-80"
              style={{ borderColor: C.border, color: C.primary }}
            >
              <Instagram className="w-4 h-4" />
              @hsksecretclinic
            </a>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: C.border }}>
          <div
            className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
            style={{ color: C.sub }}
          >
            <span>© 2009 - 2026 HSK Secret Clinic. Seluruh hak cipta dilindungi.</span>
            <span>Kebijakan Privasi • Syarat &amp; Ketentuan</span>
          </div>
        </div>
      </footer>

      {/* ==================== PREVIEW FASILITAS ==================== */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={preview.image.replace('w=800', 'w=1400')} alt={preview.title} className="w-full max-h-[70vh] object-cover" />
            <div className="p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.primary }}>
                {preview.tag}
              </span>
              <h4 className="text-lg font-semibold" style={{ color: C.dark }}>{preview.title}</h4>
              <p className="text-xs" style={{ color: C.sub }}>{preview.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"
              style={{ color: C.primary }}
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
