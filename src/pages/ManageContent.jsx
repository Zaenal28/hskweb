import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  FileEdit,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Plus,
  Edit3,
  Trash2,
  X,
  Images,
  Upload,
  Maximize2,
} from 'lucide-react';

const emptyFullImageSlide = {
  isFullImage: true,
  titleLine2: 'Full Banner Slide Klinik',
  image:
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85',
  imageFit: 'cover',
  imagePosition: 'center',
  status: 'Active',
};

const ManageContent = () => {
  const {
    content,
    setContent,
    defaultContent,
    clinicSlides,
    setClinicSlides,
    defaultClinicSlides,
  } = useStore();

  const [formData, setFormData] = useState(content);
  const [activeTab, setActiveTab] = useState('clinic');
  const [savedNotice, setSavedNotice] = useState(false);

  // State Form Cepat Tambah Full Gambar Langsung di Halaman Kelola Konten Clinic
  const [quickImage, setQuickImage] = useState('');
  const [quickImageFit, setQuickImageFit] = useState('cover');
  const [quickImagePosition, setQuickImagePosition] = useState('center');

  // State Modal untuk Tambah/Edit Slide Hero Klinik
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [slideForm, setSlideForm] = useState(emptyFullImageSlide);

  const showSavedToast = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setContent(formData);
    showSavedToast();
  };

  const handleReset = () => {
    setFormData(defaultContent);
    setContent(defaultContent);
    setClinicSlides(defaultClinicSlides);
    showSavedToast();
  };

  // Tambah Full Gambar Langsung dari Form Cepat di Kelola Konten Clinic
  const handleQuickFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setQuickImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQuickAddFullImage = (e) => {
    e.preventDefault();
    if (!quickImage.trim()) return;
    const newSlide = {
      id: Date.now(),
      isFullImage: true,
      titleLine2: `Full Banner Slide 0${clinicSlides.length + 1}`,
      image: quickImage.trim(),
      imageFit: quickImageFit,
      imagePosition: quickImagePosition,
      status: 'Active',
    };
    setClinicSlides((prev) => [...prev, newSlide]);
    setQuickImage('');
    showSavedToast();
  };

  // Ganti Gambar Langsung pada Kartu Slide
  const handleCardFileChange = (slideId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setClinicSlides((prev) =>
          prev.map((s) =>
            s.id === slideId ? { ...s, image: reader.result } : s
          )
        );
        showSavedToast();
      }
    };
    reader.readAsDataURL(file);
  };

  // Ubah Penyesuaian Ukuran Gambar Langsung pada Kartu Slide
  const handleCardFitChange = (slideId, newFit) => {
    setClinicSlides((prev) =>
      prev.map((s) => (s.id === slideId ? { ...s, imageFit: newFit } : s))
    );
    showSavedToast();
  };

  const openAddSlideModal = () => {
    setEditingSlideId(null);
    setSlideForm({
      ...emptyFullImageSlide,
      titleLine2: `Full Banner Slide 0${clinicSlides.length + 1}`,
    });
    setIsSlideModalOpen(true);
  };

  const openEditSlideModal = (slide) => {
    setEditingSlideId(slide.id);
    setSlideForm({
      imageFit: 'cover',
      imagePosition: 'center',
      ...slide,
    });
    setIsSlideModalOpen(true);
  };

  const handleDeleteSlide = (id) => {
    if (clinicSlides.length <= 1) return;
    setClinicSlides((prev) => prev.filter((s) => s.id !== id));
    showSavedToast();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSlideForm((prev) => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (editingSlideId) {
      setClinicSlides((prev) =>
        prev.map((s) =>
          s.id === editingSlideId ? { ...slideForm, id: editingSlideId } : s
        )
      );
    } else {
      setClinicSlides((prev) => [
        ...prev,
        {
          ...slideForm,
          id: Date.now(),
          isFullImage: true,
        },
      ]);
    }
    setIsSlideModalOpen(false);
    showSavedToast();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Konten Clinic &amp; Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Tambah &amp; atur slide <strong>Full Gambar Saja</strong> yang
            otomatis disesuaikan dengan ukuran konten Hero Clinic (1280 × 600
            px).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold uppercase tracking-wider transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            Simpan Konten
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>
            Perubahan Kelola Konten Clinic &amp; Full Gambar Slide berhasil
            disimpan!
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('clinic')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'clinic'
              ? 'bg-[#DA5B86] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-[#FDF2F2] hover:text-[#8B3A4D]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Kelola Konten Clinic (Tambah Full Gambar &amp; Sesuaikan Ukuran)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'products'
              ? 'bg-[#DA5B86] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-[#FDF2F2] hover:text-[#8B3A4D]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Kelola Konten Halaman Produk
        </button>
      </div>

      {activeTab === 'clinic' ? (
        <div className="space-y-6">
          {/* BOX 1: FORM LANGSUNG TAMBAH FULL GAMBAR SAJA & SESUAIKAN UKURAN KONTEN */}
          <div className="bg-white rounded-2xl border-2 border-[#8B3A4D]/20 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-widest mb-1">
                  Tambah Hanya Full Gambar Saja
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Tambah Slide Full Gambar Baru (Otomatis Sesuai Ukuran Konten
                  Hero)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pilih gambar dari perangkat atau tempel URL gambar. Ukuran
                  gambar otomatis disesuaikan penuh mengikuti kontainer konten
                  Hero Clinic (1280 × 600 px).
                </p>
              </div>
            </div>

            <form
              onSubmit={handleQuickAddFullImage}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Kolom Kiri: Input File / URL + Pengaturan Ukuran */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Upload File Gambar */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      1. Upload Gambar dari Perangkat
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-[#8B3A4D]/40 bg-[#FDF2F2]/60 text-[#8B3A4D] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FDF2F2] transition">
                      <Upload className="w-4 h-4" />
                      <span>Pilih File Gambar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQuickFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Atau Input URL Gambar */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Atau Tempel URL Gambar
                    </label>
                    <input
                      type="text"
                      value={quickImage}
                      onChange={(e) => setQuickImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                    />
                  </div>
                </div>

                {/* Pengaturan Penyesuaian Ukuran Gambar dengan Konten */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      2. Sesuaikan Ukuran Gambar ke Konten
                    </label>
                    <select
                      value={quickImageFit}
                      onChange={(e) => setQuickImageFit(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#8B3A4D]"
                    >
                      <option value="cover">
                        Otomatis Penuh Proporsional (Cover - Pas Konten)
                      </option>
                      <option value="fill">
                        Rentangkan Penuh Mengikuti Konten (Fill 100%)
                      </option>
                      <option value="contain">
                        Tampilkan Utuh di Dalam Konten (Contain)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Posisi Fokus Gambar
                    </label>
                    <select
                      value={quickImagePosition}
                      onChange={(e) => setQuickImagePosition(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#8B3A4D]"
                    >
                      <option value="center">Tengah (Center)</option>
                      <option value="top">Atas (Top)</option>
                      <option value="bottom">Bawah (Bottom)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={!quickImage.trim()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambahkan Full Gambar ke Slide Clinic</span>
                  </button>
                </div>
              </div>

              {/* Kolom Kanan: Preview Ukuran Konten Hero (Rasio 1280 x 600) */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#8B3A4D]" />
                    Preview Ukuran Konten Hero (1280 × 600 px)
                  </span>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-[#FDF2F2] border-2 border-[#8B3A4D]/20 flex items-center justify-center relative">
                  {quickImage ? (
                    <img
                      src={quickImage}
                      alt="Preview Full Gambar"
                      style={{
                        objectFit: quickImageFit,
                        objectPosition: quickImagePosition,
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <Images className="w-8 h-8 text-[#8B3A4D]/50 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-gray-500">
                        Upload atau masukkan URL gambar untuk melihat preview
                        penyesuaian ukuran konten Hero Clinic
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* BOX 2: DAFTAR SLIDE HERO HALAMAN KLINIK */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Images className="w-5 h-5 text-[#8B3A4D]" />
                  <h3 className="font-serif text-xl font-bold text-[#8B3A4D]">
                    Daftar Slide Aktif di Halaman Clinic ({clinicSlides.length}{' '}
                    Slide)
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Anda dapat langsung mengganti gambar atau mengatur penyesuaian
                  ukuran gambar pada setiap slide di bawah ini.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddSlideModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Full Gambar (Modal)</span>
              </button>
            </div>

            {/* Grid Kartu Slide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clinicSlides.map((slide, index) => {
                const isActive = slide.status !== 'Hidden';
                return (
                  <div
                    key={slide.id}
                    className="rounded-2xl border border-gray-200 overflow-hidden bg-[#F9FAFB] flex flex-col justify-between shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      {/* Preview Gambar Sesuai Pengaturan Fit */}
                      <div className="relative h-48 bg-[#FDF2F2] overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.titleLine2 || `Slide ${index + 1}`}
                          style={{
                            objectFit: slide.imageFit || 'cover',
                            objectPosition: slide.imagePosition || 'center',
                          }}
                          className="w-full h-full"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#DA5B86] text-white text-[10px] font-bold uppercase tracking-widest shadow">
                          Slide 0{index + 1} ·{' '}
                          {slide.isFullImage
                            ? 'Full Gambar Saja'
                            : 'Konten Utama + Gambar'}
                        </span>
                        <span
                          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isActive
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-600 text-white'
                          }`}
                        >
                          {slide.status || 'Active'}
                        </span>

                        {/* Tombol Cepat Upload Ganti Gambar di Atas Kartu */}
                        <label className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-[#DA5B86] text-white text-[11px] font-semibold cursor-pointer shadow transition">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti Gambar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCardFileChange(slide.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="p-4 space-y-3">
                        {slide.isFullImage ? (
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-0.5 rounded bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-wider">
                              Hanya Full Gambar (Sesuai Ukuran Konten)
                            </span>
                            <p className="text-xs text-gray-500">
                              Tampil penuh 100% mengikuti area konten Hero
                              Clinic tanpa teks tambahan.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B3A4D]">
                              {slide.subtitle}
                            </p>
                            <h4 className="font-serif text-base font-bold text-gray-900">
                              {slide.titleLine1}{' '}
                              <span className="text-[#8B3A4D]">
                                {slide.titleLine2}
                              </span>
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {slide.description}
                            </p>
                          </div>
                        )}

                        {/* Pilihan Cepat Sesuaikan Ukuran Gambar */}
                        <div className="pt-2 border-t border-gray-200/70">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Ukuran Gambar Terhadap Konten:
                          </label>
                          <select
                            value={slide.imageFit || 'cover'}
                            onChange={(e) =>
                              handleCardFitChange(slide.id, e.target.value)
                            }
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#8B3A4D]"
                          >
                            <option value="cover">
                              Penuh Proporsional (Cover - Direkomendasikan)
                            </option>
                            <option value="fill">
                              Rentangkan Pas Ukuran Konten (Fill 100%)
                            </option>
                            <option value="contain">
                              Tampilkan Utuh (Contain)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-gray-400">
                        Ukuran Konten: 1280 × 600 px
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditSlideModal(slide)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-semibold transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Detail / Edit</span>
                        </button>
                        {clinicSlides.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSlide(slide.id)}
                            title="Hapus Slide"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOX 3: FORM ABOUT US DAN KONTAK KLINIK */}
          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6"
          >
            <h3 className="font-serif text-lg font-bold text-[#8B3A4D] border-b border-gray-100 pb-3">
              Pengaturan About Us &amp; Kontak Halaman Klinik
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Subtitle About Us
                </label>
                <input
                  type="text"
                  name="clinicAboutSubtitle"
                  value={formData.clinicAboutSubtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Judul About Us
                </label>
                <input
                  type="text"
                  name="clinicAboutTitle"
                  value={formData.clinicAboutTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Deskripsi About Us Klinik
                </label>
                <textarea
                  rows="3"
                  name="clinicAboutDescription"
                  value={formData.clinicAboutDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  URL Foto Interior / Resepsionis About Us
                </label>
                <input
                  type="text"
                  name="clinicAboutImage"
                  value={formData.clinicAboutImage || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Nomor Telepon Klinik
                </label>
                <input
                  type="text"
                  name="clinicPhone"
                  value={formData.clinicPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Email Klinik
                </label>
                <input
                  type="text"
                  name="clinicEmail"
                  value={formData.clinicEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Alamat Klinik
                </label>
                <input
                  type="text"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Jam Operasional
                </label>
                <input
                  type="text"
                  name="clinicHours"
                  value={formData.clinicHours}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition"
              >
                <Save className="w-4 h-4" />
                Simpan Konten Klinik
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* TAB 2: KONTEN HALAMAN PRODUK — dipindah ke halaman admin tersendiri */
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-4 text-center">
          <ShoppingBag className="w-10 h-10 text-[#8B3A4D] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
            Konten Halaman Produk Kini Punya Halaman Sendiri
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Slide hero (konten + gambar / hanya gambar) dan teks promo halaman
            produk sekarang dikelola di menu Kelola Konten Produk.
          </p>
          <Link
            to="/admin/product-content"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition"
          >
            Buka Kelola Konten Produk
          </Link>
        </div>
      )}

      {/* Modal Tambah / Edit Slide Full Gambar & Penyesuaian Ukuran */}
      {isSlideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingSlideId
                  ? 'Edit Gambar & Ukuran Slide Clinic'
                  : 'Tambah Full Gambar Slide Clinic'}
              </h3>
              <button
                type="button"
                onClick={() => setIsSlideModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveSlide}
              className="p-6 space-y-4 overflow-y-auto"
            >
              {/* Preview Gambar Sesuai Rasio Konten Hero */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                  Preview Gambar (Disesuaikan Ukuran Konten Hero 1280 × 600 px)
                </label>
                <div className="w-full h-48 rounded-xl overflow-hidden bg-[#FDF2F2] border border-gray-200">
                  <img
                    src={slideForm.image}
                    alt="Preview Slide"
                    style={{
                      objectFit: slideForm.imageFit || 'cover',
                      objectPosition: slideForm.imagePosition || 'center',
                    }}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Upload File Gambar dari Komputer */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Pilih File Gambar dari Perangkat
                </label>
                <label className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-[#8B3A4D]/30 bg-[#FDF2F2]/50 text-[#8B3A4D] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FDF2F2] transition">
                  <Upload className="w-4 h-4" />
                  <span>Upload Gambar Baru</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Input URL Gambar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Atau Masukkan URL Gambar
                </label>
                <input
                  type="text"
                  required
                  value={slideForm.image}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, image: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              {/* Pengaturan Penyesuaian Ukuran Gambar & Posisi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Sesuaikan Ukuran Gambar
                  </label>
                  <select
                    value={slideForm.imageFit || 'cover'}
                    onChange={(e) =>
                      setSlideForm({ ...slideForm, imageFit: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-semibold focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="cover">
                      Penuh Proporsional (Cover - Pas Konten)
                    </option>
                    <option value="fill">
                      Rentangkan Penuh (Fill 100% Konten)
                    </option>
                    <option value="contain">Tampilkan Utuh (Contain)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Posisi Fokus Gambar
                  </label>
                  <select
                    value={slideForm.imagePosition || 'center'}
                    onChange={(e) =>
                      setSlideForm({
                        ...slideForm,
                        imagePosition: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-semibold focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="center">Tengah (Center)</option>
                    <option value="top">Atas (Top)</option>
                    <option value="bottom">Bawah (Bottom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Status Slide
                </label>
                <select
                  value={slideForm.status || 'Active'}
                  onChange={(e) =>
                    setSlideForm({ ...slideForm, status: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                >
                  <option value="Active">Active (Tampil)</option>
                  <option value="Hidden">Hidden (Sembunyikan)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  Simpan Gambar Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContent;
