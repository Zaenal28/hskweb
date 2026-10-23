import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Clock,
  Search,
  Images,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const MAIN_CATEGORIES = ['Face', 'Body', 'Hair', 'Wellness', 'All Treatment'];

const TreatmentsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { treatments, content } = useStore();

  const initialCat = searchParams.get('category') || 'All Treatment';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedDuration, setSelectedDuration] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat) {
      setSelectedCategory(paramCat);
    } else {
      setSelectedCategory('All Treatment');
    }
  }, [searchParams]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All Treatment') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const activeTreatments = treatments.filter((t) => t.status !== 'Hidden');

  const uniqueDurations = [
    'ALL',
    ...Array.from(
      new Set(activeTreatments.map((t) => t.duration || '45 Menit'))
    ),
  ];

  const filteredTreatments = activeTreatments.filter((t) => {
    const cat = t.category || 'Face';
    const dur = t.duration || '45 Menit';
    const matchesCategory =
      selectedCategory === 'All Treatment' ||
      selectedCategory === 'ALL' ||
      cat.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDuration =
      selectedDuration === 'ALL' || dur === selectedDuration;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.fullDescription &&
        t.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cat.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDuration && matchesSearch;
  });

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
              to="/products"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-semibold tracking-widest uppercase transition shadow-sm"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header Treatment */}
      <section className="bg-[#FDF2F2] py-12 border-b border-[#8B3A4D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B3A4D]">
            HSK SECRET AESTHETIC CLINIC
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
            {selectedCategory === 'All Treatment'
              ? 'All Signature Treatments'
              : `${selectedCategory} Treatments`}
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Pilih kategori perawatan <strong>Face</strong>,{' '}
            <strong>Body</strong>, <strong>Hair</strong>, atau{' '}
            <strong>Wellness</strong>. Klik pada kartu untuk melihat banyak foto
            proses pengerjaan, keterangan lengkap, dan durasi treatment.
          </p>
        </div>
      </section>

      {/* Search & Durasi Filter Bar + Bar Kategori di Bawah Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 space-y-5">
          {/* Baris 1: Search & Durasi */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama treatment atau keterangan manfaat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                <Clock className="w-4 h-4 text-[#8B3A4D]" />
                <span>Durasi:</span>
              </div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#8B3A4D]"
              >
                {uniqueDurations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur === 'ALL' ? 'Semua Durasi' : dur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baris 2 (Di Bawah Search): Face | Body | Hair | Wellness | All Treatment */}
          <div className="pt-4 border-t border-gray-100">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 overflow-x-auto px-2">
              {MAIN_CATEGORIES.map((cat) => {
                const isSelected =
                  selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`text-sm whitespace-nowrap pb-2 transition-all ${
                      isSelected
                        ? 'font-bold text-[#8B3A4D] border-b-2 border-[#8B3A4D]'
                        : 'font-normal text-gray-800 hover:text-[#8B3A4D]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Treatment Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Menampilkan{' '}
            <strong className="text-[#8B3A4D]">
              {filteredTreatments.length}
            </strong>{' '}
            Treatment pada kategori{' '}
            <strong className="text-[#8B3A4D]">{selectedCategory}</strong>
          </p>
          {(selectedCategory !== 'All Treatment' ||
            selectedDuration !== 'ALL' ||
            searchQuery !== '') && (
            <button
              type="button"
              onClick={() => {
                handleSelectCategory('All Treatment');
                setSelectedDuration('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#8B3A4D] hover:underline"
            >
              Tampilkan All Treatment
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((item) => {
            const photosCount =
              item.processPhotos && item.processPhotos.length > 0
                ? item.processPhotos.length
                : 4;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/treatments/${item.id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Gambar Utama */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Badge Kategori */}
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur text-[#8B3A4D] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                    {item.category || 'Face'}
                  </span>
                  {/* Badge Jumlah Foto Proses */}
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-semibold">
                    <Images className="w-3 h-3" />
                    {photosCount} Foto Proses
                  </span>
                  {/* Circular Sparkle Badge */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#DA5B86] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Isi Kartu */}
                <div className="p-6 pt-8 flex-1 flex flex-col justify-between text-center">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Durasi: {item.duration || '45 Menit'}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#8B3A4D] transition">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 block">
                        MULAI
                      </span>
                      <span className="font-serif text-xl font-bold text-[#8B3A4D]">
                        {item.price}
                      </span>
                    </div>

                    <Link
                      to={`/treatments/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-3 px-4 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] group-hover:bg-[#DA5B86] group-hover:text-white text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition"
                    >
                      <span>Lihat Detail &amp; Proses</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Singkat */}
      <footer className="bg-[#DA5B86] text-white/80 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-white block">
              HSK SECRET
            </span>
            <span className="text-[10px] text-[#F8E4E6]/70">
              {content.clinicAddress}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#F8E4E6]" />
              {content.clinicPhone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#F8E4E6]" />
              {content.clinicEmail}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F8E4E6]" />
              {content.clinicHours}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TreatmentsPage;
