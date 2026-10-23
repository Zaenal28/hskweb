import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Award,
  Images,
  Tag,
} from 'lucide-react';

const TreatmentDetail = () => {
  const { id } = useParams();
  const { treatments } = useStore();

  const treatment =
    treatments.find((t) => String(t.id) === String(id)) || treatments[0];

  const defaultPhotos = [
    treatment?.image,
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
  ].filter(Boolean);

  const processPhotos =
    treatment?.processPhotos && treatment.processPhotos.length > 0
      ? treatment.processPhotos
      : defaultPhotos;

  const [selectedPhoto, setSelectedPhoto] = useState(processPhotos[0]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );

  useEffect(() => {
    if (treatment) {
      const photos =
        treatment.processPhotos && treatment.processPhotos.length > 0
          ? treatment.processPhotos
          : [treatment.image];
      setSelectedPhoto(photos[0]);
      setBookingSuccess(false);
    }
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

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
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
      <div className="bg-[#FDF2F2] border-b border-[#8B3A4D]/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
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
              {treatment.category || 'Aesthetic Care'}
            </span>
            <span>/</span>
            <span className="font-bold text-[#8B3A4D]">{treatment.title}</span>
          </div>

          <Link
            to="/admin/treatments"
            className="text-[11px] font-semibold text-[#8B3A4D] hover:underline"
          >
            Edit Data Ini di Kelola Treatment →
          </Link>
        </div>
      </div>

      {/* Main Content Detail Treatment */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Kolom Kiri: Galeri Foto Utama & Thumbnail Proses */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100">
              <img
                src={selectedPhoto || treatment.image}
                alt={treatment.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#8B3A4D] text-xs font-bold uppercase tracking-wider shadow">
                <Tag className="w-3.5 h-3.5" />
                {treatment.category || 'Aesthetic Care'}
              </span>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DA5B86] text-white text-xs font-semibold shadow-lg">
                <Clock className="w-3.5 h-3.5" />
                Durasi: {treatment.duration || '45 Menit'}
              </span>
            </div>

            {/* Deretan Thumbnail Foto Proses Treatment */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5 flex items-center gap-1.5">
                <Images className="w-4 h-4 text-[#8B3A4D]" />
                Pilih Foto Dokumentasi Proses Treatment ({processPhotos.length}{' '}
                Foto):
              </p>
              <div className="grid grid-cols-4 gap-3">
                {processPhotos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className={`relative h-24 rounded-xl overflow-hidden border-2 transition ${
                      selectedPhoto === photo
                        ? 'border-[#8B3A4D] ring-2 ring-[#8B3A4D]/30 scale-[1.02]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Proses ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-black/65 text-white text-[9px] font-bold">
                      Tahap {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Keterangan Lengkap, Durasi, Harga & Booking */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-3 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-xs font-bold uppercase tracking-wider">
                  {treatment.category || 'Aesthetic Care'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B3A4D] bg-[#FDF2F2] px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  {treatment.duration || '45 Menit'}
                </span>
              </div>

              <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-wide uppercase">
                {treatment.title}
              </h1>

              <p className="text-sm text-gray-500 font-medium">
                {treatment.description}
              </p>

              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  Harga Mulai:
                </span>
                <span className="font-serif text-3xl font-bold text-[#8B3A4D]">
                  {treatment.price}
                </span>
              </div>
            </div>

            {/* Keterangan Detail Treatment */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B3A4D]">
                Keterangan &amp; Manfaat Treatment
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {treatment.fullDescription || treatment.description}
              </p>
            </div>

            {/* Tahapan Proses Treatment */}
            <div className="space-y-3 bg-[#FDF2F2]/60 p-4 rounded-xl border border-[#8B3A4D]/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B3A4D] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Tahapan Proses Treatment ({treatment.duration || '45 Menit'})
              </h3>
              <ul className="space-y-2">
                {stepsList.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8B3A4D] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Reservasi Jadwal */}
            <form
              onSubmit={handleBookSubmit}
              className="space-y-4 pt-3 border-t border-gray-100"
            >
              <h4 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8B3A4D]" />
                Reservasi Jadwal Treatment Ini
              </h4>

              {bookingSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                  <p className="font-bold text-sm">
                    ✓ Jadwal Reservasi Berhasil Dicatat!
                  </p>
                  <p>
                    Terima kasih <strong>{bookingName}</strong>, jadwal{' '}
                    <strong>{treatment.title}</strong> ({treatment.duration})
                    pada tanggal <strong>{bookingDate}</strong> telah terdaftar.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Nama Lengkap Anda"
                      className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs focus:outline-none focus:border-[#8B3A4D]"
                    />
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs focus:outline-none focus:border-[#8B3A4D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-widest shadow-md transition"
                  >
                    Book {treatment.title} Sekarang ({treatment.price})
                  </button>
                </>
              )}
            </form>

            {/* Jaminan Klinik */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B3A4D]" />
                <span>Alat Steril Medis 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8B3A4D]" />
                <span>Dokter &amp; Terapis Ahli</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Galeri Besar Foto-Foto Proses Treatment */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Galeri Foto Proses Pengerjaan {treatment.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Dokumentasi tahapan perawatan bersama terapis profesional di
                klinik HSK SECRET (Durasi: {treatment.duration || '45 Menit'}).
              </p>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-xs font-bold">
              {processPhotos.length} Dokumentasi Proses
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processPhotos.map((photoUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(photoUrl)}
                className="cursor-pointer group rounded-xl overflow-hidden border border-gray-100 bg-[#F9FAFB] shadow-sm hover:shadow-md transition"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={photoUrl}
                    alt={`${treatment.title} Proses ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#DA5B86] text-white text-[10px] font-bold uppercase tracking-wider">
                    Proses 0{idx + 1}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="font-serif text-xs font-bold text-gray-900">
                    {stepsList[idx] ||
                      `Tahap Pengerjaan ${idx + 1} — ${treatment.title}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Treatment Lainnya */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Layanan Treatment Lainnya
            </h2>
            <Link
              to="/treatments"
              className="text-xs font-bold uppercase tracking-wider text-[#8B3A4D] hover:underline"
            >
              Lihat Semua &amp; Filter Kategori →
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B3A4D]">
                    {item.category} · {item.duration}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-gray-900 group-hover:text-[#8B3A4D] truncate mt-0.5">
                    {item.title}
                  </h4>
                  <p className="font-serif text-sm font-bold text-[#8B3A4D] mt-1">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TreatmentDetail;
