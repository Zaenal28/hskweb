import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Activity,
  MessageCircle,
  FileText,
  MapPin,
  X,
} from 'lucide-react';

const TreatmentDetail = () => {
  const { id } = useParams();
  const { treatments, clinics, content } = useStore();

  const treatment =
    treatments.find((t) => String(t.id) === String(id)) || treatments[0];

  const defaultPhotos = [
    treatment?.image,
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1512290900672-1f84d1714b12?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
  ].filter(Boolean);

  const rawPhotos =
    treatment?.processPhotos && treatment.processPhotos.length > 0
      ? treatment.processPhotos
      : defaultPhotos;

  // Pastikan minimal ada 5 foto di galeri jika data default memiliki 4 foto
  const processPhotos =
    rawPhotos.length === 4
      ? [
          ...rawPhotos,
          'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85',
        ]
      : rawPhotos;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(
    clinics && clinics.length > 0
      ? clinics[0]
      : {
          id: 1,
          name: 'Clinic Cianjur',
          city: 'Cianjur',
          address: 'Jl. Ir. H. Juanda No. 85, Cianjur',
        }
  );
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  useEffect(() => {
    setSelectedPhotoIndex(0);
    window.scrollTo(0, 0);
  }, [id, treatment]);

  if (!treatment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF2F2] p-6">
        <p className="font-serif text-2xl text-[#8B3A4D] font-bold">
          Treatment tidak ditemukan
        </p>
        <Link
          to="/treatments"
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#DA5B86] text-white text-xs font-bold uppercase tracking-wider"
        >
          Kembali ke Daftar Treatment
        </Link>
      </div>
    );
  }

  const selectedPhoto = processPhotos[selectedPhotoIndex] || treatment.image;

  const categoryBadgeText = (() => {
    const cat = treatment.category || 'Facial';
    if (cat.toLowerCase() === 'face') return 'Facial Treatment';
    if (cat.toLowerCase().includes('treatment')) return cat;
    return `${cat} Treatment`;
  })();

  // Format judul agar tampak elegan (Title Case jika huruf besar semua)
  const formattedTitle =
    treatment.title === treatment.title?.toUpperCase()
      ? treatment.title
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : treatment.title;

  const stepsList = (
    treatment.processSteps ||
    '1. Konsultasi & Analisis Kulit | 2. Deep Cleansing & Sterilisasi | 3. Pengerjaan Inti Treatment | 4. Aplikasi Masker & Serum Nutrisi'
  )
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);

  const relatedTreatments = treatments
    .filter((t) => t.id !== treatment.id && t.status !== 'Hidden')
    .slice(0, 3);

  const handleSelectBranchAndWhatsApp = (branch) => {
    setSelectedBranch(branch);
    setIsBranchModalOpen(false);
    const rawPhone = String(content?.clinicPhone || '6281288990011').replace(
      /[^0-9]/g,
      ''
    );
    const waNumber = rawPhone.startsWith('0')
      ? `62${rawPhone.slice(1)}`
      : rawPhone || '6281288990011';
    const message = encodeURIComponent(
      `Halo Admin HSK Secret (${branch.name}), saya ingin reservasi treatment *${formattedTitle}* (${treatment.price}). Mohon info jadwal yang tersedia.`
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FCFAFB] text-gray-800 font-sans">
      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <Link to="/" className="hover:text-[#8B3A4D] transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#8B3A4D] transition">
              About Us
            </Link>
            <Link
              to="/treatments"
              className="text-[#8B3A4D] border-b-2 border-[#8B3A4D] pb-1"
            >
              Treatment
            </Link>
            <Link
              to="/products"
              className="text-[#8B3A4D] bg-[#FDF2F2] px-3 py-1.5 rounded-full hover:bg-[#DA5B86] hover:text-white transition"
            >
              Products
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/treatments"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-semibold tracking-widest uppercase transition shadow-sm"
            >
              Semua Treatment
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb Bar */}
      <div className="bg-[#FDF2F2]/70 border-b border-[#8B3A4D]/10 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link
              to="/treatments"
              className="inline-flex items-center gap-1.5 font-semibold text-[#8B3A4D] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Katalog Treatment
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-700">
              {categoryBadgeText}
            </span>
            <span>/</span>
            <span className="font-bold text-[#8B3A4D]">{formattedTitle}</span>
          </div>

          <Link
            to="/admin/treatments"
            className="text-[11px] font-semibold text-[#8B3A4D] hover:underline"
          >
            Edit Data Ini di Kelola Treatment →
          </Link>
        </div>
      </div>

      {/* Main Content Detail Treatment (Sesuai Desain Gambar Referensi) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Kolom Kiri: Foto Utama Square & Deretan Thumbnail */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3.7] sm:aspect-square rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100">
              <img
                src={selectedPhoto}
                alt={formattedTitle}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Indikator Jumlah Foto di Kanan Atas (contoh: 5 / 5) */}
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-sm text-white text-xs font-bold tracking-wider">
                {selectedPhotoIndex + 1} / {processPhotos.length}
              </span>
            </div>

            {/* Deretan Thumbnail Foto */}
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {processPhotos.map((photo, index) => {
                const isSelected = selectedPhotoIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 transition-all ${
                      isSelected
                        ? 'ring-2 ring-[#E06387] ring-offset-2 scale-[1.02]'
                        : 'opacity-75 hover:opacity-100 border border-gray-200'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`${formattedTitle} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Info Treatment, Kotak Harga, 4 Kartu Keunggulan & Tombol WA */}
          <div className="lg:col-span-6 space-y-5 pt-1">
            {/* Badge Kategori & Judul */}
            <div className="space-y-2.5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#E06387] text-white text-xs font-bold tracking-wide shadow-sm">
                {categoryBadgeText}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#7B1E3A] tracking-tight leading-tight">
                {formattedTitle}
              </h1>
            </div>

            {/* Kotak Harga Treatment */}
            <div className="rounded-2xl bg-[#FFF5F7] border border-[#F5DCE2] p-5 sm:p-6 space-y-1.5">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                HARGA TREATMENT (HSK SECRET{' '}
                {(selectedBranch?.city || 'CIANJUR').toUpperCase()}):
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#7B1E3A]">
                {treatment.price}
              </p>
              <p className="text-xs italic text-gray-500 pt-1">
                *Konsultasikan kebutuhan kondisi kulit Anda langsung dengan
                dokter kami.
              </p>
            </div>

            {/* 4 Kartu Keunggulan / Spesifikasi Treatment (Grid 2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* 1. Sertifikasi BPOM */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Sertifikasi BPOM
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {treatment.certification || 'Terdaftar & Teruji Aman'}
                  </p>
                </div>
              </div>

              {/* 2. Cepat & Nyaman */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E06387] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Cepat &amp; Nyaman
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {treatment.comfort || 'Minim Rasa Sakit'}
                  </p>
                </div>
              </div>

              {/* 3. Durasi Pengerjaan */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#8B3A4D] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Durasi Pengerjaan
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    ± {treatment.duration || '60 Menit'}
                  </p>
                </div>
              </div>

              {/* 4. Downtime */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Downtime</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {treatment.downtime || 'Tanpa Downtime'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Hijau Reservasi via WhatsApp (Pilih Cabang) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsBranchModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-[#25C15A] hover:bg-[#1EA84D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Reservasi via WhatsApp (Pilih Cabang)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kartu Full-Width: Deskripsi & Manfaat Treatment */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#E06387]" />
            <h2 className="text-base sm:text-lg font-extrabold text-[#7B1E3A]">
              Deskripsi &amp; Manfaat Treatment
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {treatment.fullDescription || treatment.description}
          </p>

          {/* Tahapan Proses Treatment */}
          {stepsList.length > 0 && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B1E3A] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E06387]" />
                Tahapan Prosedur ({treatment.duration || '60 Menit'}):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {stepsList.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF5F7]/70 border border-[#F5DCE2]/70 text-xs text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E06387] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Treatment Lainnya */}
        <section className="space-y-5 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#7B1E3A]">
              Layanan Treatment Lainnya
            </h2>
            <Link
              to="/treatments"
              className="text-xs font-bold uppercase tracking-wider text-[#8B3A4D] hover:underline"
            >
              Lihat Semua Treatment →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTreatments.map((item) => (
              <Link
                key={item.id}
                to={`/treatments/${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4 p-4 group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E06387]">
                    {item.category} · {item.duration}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#7B1E3A] truncate mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-sm font-extrabold text-[#7B1E3A] mt-1">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Pilih Cabang untuk Reservasi WhatsApp */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-[#FFF5F7] border-b border-[#F5DCE2] flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#7B1E3A]">
                  Pilih Cabang Klinik HSK Secret
                </h3>
                <p className="text-xs text-gray-500">
                  Reservasi {formattedTitle} ({treatment.price})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBranchModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-[#7B1E3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {(clinics && clinics.length > 0
                ? clinics
                : [
                    {
                      id: 1,
                      name: 'Clinic Cianjur',
                      city: 'Cianjur',
                      address: 'Jl. Ir. H. Juanda No. 85, Cianjur',
                    },
                  ]
              ).map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => handleSelectBranchAndWhatsApp(branch)}
                  className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-[#E06387] hover:bg-[#FFF5F7]/60 transition flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#E06387] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-[#7B1E3A]">
                        HSK Secret — {branch.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {branch.address}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-[#25C15A] text-white text-xs font-bold shrink-0">
                    Chat WA
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentDetail;
