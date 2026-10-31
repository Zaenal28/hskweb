import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Save,
  RotateCcw,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  X,
  Images,
  Upload,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Type,
  Image as ImageIcon,
} from 'lucide-react';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]';
const labelCls =
  'block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5';

const emptyImageSlide = {
  isFullImage: true,
  titleLine2: 'Banner Produk',
  image: '',
  imageFit: 'cover',
  imagePosition: 'center',
  status: 'Active',
};

const emptyContentSlide = {
  isFullImage: false,
  subtitle: 'NATURAL. LUXURIOUS. YOU.',
  titleLine1: 'Judul Baris 1',
  titleLine2: 'Judul Baris 2',
  description: 'Deskripsi singkat slide produk.',
  buttonPrimary: 'Shop Now',
  buttonSecondary: 'Explore Collections',
  showBadges: true,
  image: '',
  imageFit: 'cover',
  imagePosition: 'center',
  status: 'Active',
};

const readFileAsDataUrl = (file, cb) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') cb(reader.result);
  };
  reader.readAsDataURL(file);
};

const ManageProductContent = () => {
  const {
    content,
    setContent,
    productSlides,
    setProductSlides,
    defaultProductSlides,
  } = useStore();

  const [formData, setFormData] = useState(content);
  const [savedNotice, setSavedNotice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [slideForm, setSlideForm] = useState(emptyImageSlide);

  const showToast = (msg) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(''), 3000);
  };

  /* ---------- Slide handlers ---------- */
  const openAdd = (type) => {
    setEditingId(null);
    setSlideForm(
      type === 'image'
        ? {
            ...emptyImageSlide,
            titleLine2: `Banner Produk ${productSlides.length + 1}`,
          }
        : { ...emptyContentSlide }
    );
    setIsModalOpen(true);
  };

  const openEdit = (slide) => {
    setEditingId(slide.id);
    setSlideForm({ imageFit: 'cover', imagePosition: 'center', ...slide });
    setIsModalOpen(true);
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (!slideForm.image.trim()) return;
    if (editingId) {
      setProductSlides((prev) =>
        prev.map((s) => (s.id === editingId ? { ...slideForm, id: editingId } : s))
      );
    } else {
      setProductSlides((prev) => [...prev, { ...slideForm, id: Date.now() }]);
    }
    setIsModalOpen(false);
    showToast('Slide berhasil disimpan!');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Hapus slide ini?')) return;
    setProductSlides((prev) => prev.filter((s) => s.id !== id));
    showToast('Slide dihapus.');
  };

  const toggleStatus = (id) => {
    setProductSlides((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Hidden' ? 'Active' : 'Hidden' }
          : s
      )
    );
  };

  const moveSlide = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= productSlides.length) return;
    setProductSlides((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleCardImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (url) => {
      setProductSlides((prev) =>
        prev.map((s) => (s.id === id ? { ...s, image: url } : s))
      );
      showToast('Gambar slide diganti!');
    });
  };

  const handleModalFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (url) =>
      setSlideForm((prev) => ({ ...prev, image: url }))
    );
  };

  /* ---------- Promo / text content ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveContent = (e) => {
    e.preventDefault();
    setContent((prev) => ({
      ...prev,
      productPromoLeft: formData.productPromoLeft,
      productPromoCenter: formData.productPromoCenter,
      productOfferTitle: formData.productOfferTitle,
      productOfferCode: formData.productOfferCode,
    }));
    showToast('Konten promo halaman produk berhasil disimpan!');
  };

  const handleResetSlides = () => {
    if (!window.confirm('Kembalikan semua slide produk ke default?')) return;
    setProductSlides(defaultProductSlides);
    showToast('Slide produk dikembalikan ke default.');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Konten Halaman Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Atur slide hero halaman produk — bisa <strong>Konten + Gambar</strong>{' '}
            atau <strong>Hanya Gambar Saja</strong> — serta teks promo.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold uppercase tracking-wider transition"
          >
            <ExternalLink className="w-4 h-4" />
            Lihat Halaman
          </Link>
          <button
            type="button"
            onClick={handleResetSlides}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold uppercase tracking-wider transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Slide
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Slide list */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Images className="w-5 h-5 text-[#8B3A4D]" />
              <h3 className="font-serif text-xl font-bold text-[#8B3A4D]">
                Slide Hero Halaman Produk ({productSlides.length} Slide)
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Slide berganti otomatis setiap 5 detik. Urutan di bawah = urutan
              tampil. Jika semua slide disembunyikan, hero memakai konten default.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openAdd('image')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
            >
              <ImageIcon className="w-4 h-4" />
              Tambah Slide Gambar Saja
            </button>
            <button
              type="button"
              onClick={() => openAdd('content')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DA5B86] text-[#8B3A4D] hover:bg-[#FDF2F2] text-xs font-semibold uppercase tracking-wider transition"
            >
              <Type className="w-4 h-4" />
              Tambah Slide Konten + Gambar
            </button>
          </div>
        </div>

        {productSlides.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-500">
            Belum ada slide. Tambahkan slide baru di atas.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {productSlides.map((slide, index) => {
              const isActive = slide.status !== 'Hidden';
              return (
                <div
                  key={slide.id}
                  className={`rounded-2xl border overflow-hidden bg-[#F9FAFB] flex flex-col justify-between shadow-sm hover:shadow-md transition ${
                    isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div>
                    <div className="relative h-44 bg-[#FDF2F2] overflow-hidden">
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
                        Slide {index + 1} ·{' '}
                        {slide.isFullImage ? 'Gambar Saja' : 'Konten + Gambar'}
                      </span>
                      <span
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          isActive ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-white'
                        }`}
                      >
                        {isActive ? 'Active' : 'Hidden'}
                      </span>
                      <label className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-[#DA5B86] text-white text-[11px] font-semibold cursor-pointer shadow transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Ganti Gambar</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCardImageChange(slide.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="p-4 space-y-1">
                      {slide.isFullImage ? (
                        <>
                          <p className="text-sm font-semibold text-gray-800">
                            {slide.titleLine2 || 'Banner Produk'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Tampil penuh tanpa teks tambahan.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B3A4D]">
                            {slide.subtitle}
                          </p>
                          <h4 className="font-serif text-base font-bold text-gray-900">
                            {slide.titleLine1}{' '}
                            <span className="text-[#8B3A4D]">{slide.titleLine2}</span>
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {slide.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSlide(index, -1)}
                        disabled={index === 0}
                        title="Naikkan urutan"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] disabled:opacity-30 transition"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSlide(index, 1)}
                        disabled={index === productSlides.length - 1}
                        title="Turunkan urutan"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] disabled:opacity-30 transition"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(slide.id)}
                        title={isActive ? 'Sembunyikan' : 'Tampilkan'}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                      >
                        {isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(slide)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-semibold transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(slide.id)}
                        title="Hapus Slide"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Promo content */}
      <form
        onSubmit={handleSaveContent}
        className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6"
      >
        <h3 className="font-serif text-lg font-bold text-[#8B3A4D] border-b border-gray-100 pb-3">
          Teks Promo Halaman Produk
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Promo Bar (Running Text) 1</label>
            <input
              type="text"
              name="productPromoLeft"
              value={formData.productPromoLeft || ''}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Promo Bar (Running Text) 2</label>
            <input
              type="text"
              name="productPromoCenter"
              value={formData.productPromoCenter || ''}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Judul Penawaran</label>
            <input
              type="text"
              name="productOfferTitle"
              value={formData.productOfferTitle || ''}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Kode Kupon Promo</label>
            <input
              type="text"
              name="productOfferCode"
              value={formData.productOfferCode || ''}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition"
          >
            <Save className="w-4 h-4" />
            Simpan Teks Promo
          </button>
        </div>
      </form>

      {/* Modal Tambah / Edit Slide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId ? 'Edit Slide Produk' : 'Tambah Slide Produk'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-6 space-y-4 overflow-y-auto">
              {/* Tipe slide */}
              <div>
                <label className={labelCls}>Tipe Slide</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: true, label: 'Hanya Gambar Saja', Icon: ImageIcon },
                    { val: false, label: 'Konten + Gambar', Icon: Type },
                  ].map(({ val, label, Icon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setSlideForm((prev) =>
                          val
                            ? { ...prev, isFullImage: true }
                            : { ...emptyContentSlide, ...prev, isFullImage: false }
                        )
                      }
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition ${
                        slideForm.isFullImage === val
                          ? 'bg-[#DA5B86] border-[#DA5B86] text-white'
                          : 'border-gray-200 text-gray-600 hover:bg-[#FDF2F2]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="w-full h-48 rounded-xl overflow-hidden bg-[#FDF2F2] border border-gray-200 flex items-center justify-center">
                {slideForm.image ? (
                  <img
                    src={slideForm.image}
                    alt="Preview Slide"
                    style={{
                      objectFit: slideForm.imageFit || 'cover',
                      objectPosition: slideForm.imagePosition || 'center',
                    }}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center text-xs text-gray-500">
                    <Images className="w-8 h-8 text-[#8B3A4D]/50 mx-auto mb-2" />
                    Upload atau masukkan URL gambar
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Upload Gambar</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-[#8B3A4D]/30 bg-[#FDF2F2]/50 text-[#8B3A4D] text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#FDF2F2] transition">
                    <Upload className="w-4 h-4" />
                    Pilih File
                    <input type="file" accept="image/*" onChange={handleModalFile} className="hidden" />
                  </label>
                </div>
                <div>
                  <label className={labelCls}>Atau URL Gambar</label>
                  <input
                    type="text"
                    required
                    value={slideForm.image}
                    onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Ukuran Gambar</label>
                  <select
                    value={slideForm.imageFit || 'cover'}
                    onChange={(e) => setSlideForm({ ...slideForm, imageFit: e.target.value })}
                    className={inputCls}
                  >
                    <option value="cover">Penuh Proporsional (Cover)</option>
                    <option value="fill">Rentangkan Penuh (Fill)</option>
                    <option value="contain">Tampilkan Utuh (Contain)</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Posisi Fokus Gambar</label>
                  <select
                    value={slideForm.imagePosition || 'center'}
                    onChange={(e) => setSlideForm({ ...slideForm, imagePosition: e.target.value })}
                    className={inputCls}
                  >
                    <option value="center">Tengah</option>
                    <option value="top">Atas</option>
                    <option value="bottom">Bawah</option>
                    <option value="left">Kiri</option>
                    <option value="right">Kanan</option>
                  </select>
                </div>
              </div>

              {slideForm.isFullImage ? (
                <div>
                  <label className={labelCls}>Nama Slide (Alt Text)</label>
                  <input
                    type="text"
                    value={slideForm.titleLine2 || ''}
                    onChange={(e) => setSlideForm({ ...slideForm, titleLine2: e.target.value })}
                    className={inputCls}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Subtitle</label>
                    <input
                      type="text"
                      value={slideForm.subtitle || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Judul Baris 1</label>
                    <input
                      type="text"
                      value={slideForm.titleLine1 || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, titleLine1: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Judul Baris 2</label>
                    <input
                      type="text"
                      value={slideForm.titleLine2 || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, titleLine2: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Deskripsi</label>
                    <textarea
                      rows="2"
                      value={slideForm.description || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Tombol Utama (kosongkan = sembunyi)</label>
                    <input
                      type="text"
                      value={slideForm.buttonPrimary || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, buttonPrimary: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Tombol Kedua (kosongkan = sembunyi)</label>
                    <input
                      type="text"
                      value={slideForm.buttonSecondary || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, buttonSecondary: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slideForm.showBadges !== false}
                      onChange={(e) => setSlideForm({ ...slideForm, showBadges: e.target.checked })}
                      className="w-4 h-4 accent-[#DA5B86]"
                    />
                    Tampilkan 4 badge keunggulan (Authentic, Cruelty Free, dll.)
                  </label>
                </div>
              )}

              <div>
                <label className={labelCls}>Status Slide</label>
                <select
                  value={slideForm.status || 'Active'}
                  onChange={(e) => setSlideForm({ ...slideForm, status: e.target.value })}
                  className={inputCls}
                >
                  <option value="Active">Active (Tampil)</option>
                  <option value="Hidden">Hidden (Sembunyikan)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  Simpan Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProductContent;
