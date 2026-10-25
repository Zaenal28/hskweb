import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Plus,
  Edit3,
  Trash2,
  Stethoscope,
  X,
  Save,
  Clock,
  Images,
  ExternalLink,
  Search,
} from 'lucide-react';

const emptyTreatment = {
  title: '',
  category: 'Face',
  description: '',
  fullDescription: '',
  price: 'Rp 450.000',
  duration: '45 Menit',
  status: 'Active',
  image:
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
  processSteps:
    '1. Konsultasi & Analisis Kulit | 2. Deep Cleansing & Sterilisasi | 3. Pengerjaan Inti Treatment | 4. Aplikasi Masker & Serum Nutrisi',
  processPhotos: [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1512290900672-1f84d1714b12?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
  ],
};

const ManageTreatments = () => {
  const { treatments, setTreatments } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All Treatment');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyTreatment);

  const categoriesList = ['Face', 'Body', 'Hair', 'Wellness', 'All Treatment'];

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyTreatment);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      ...emptyTreatment,
      ...item,
      processPhotos:
        item.processPhotos && item.processPhotos.length > 0
          ? item.processPhotos
          : [item.image, ...emptyTreatment.processPhotos.slice(1)],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTreatments((prev) => prev.filter((t) => t.id !== id));
  };

  const handlePhotoChange = (index, value) => {
    const updated = [...(formData.processPhotos || [])];
    updated[index] = value;
    setFormData({
      ...formData,
      processPhotos: updated,
      image: index === 0 && value ? value : formData.image,
    });
  };

  const handleAddPhotoField = () => {
    setFormData({
      ...formData,
      processPhotos: [
        ...(formData.processPhotos || []),
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
      ],
    });
  };

  const handleRemovePhotoField = (index) => {
    if ((formData.processPhotos || []).length <= 1) return;
    const updated = formData.processPhotos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      processPhotos: updated,
      image: updated[0] || formData.image,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedPhotos = (formData.processPhotos || []).filter(Boolean);
    const primaryImage = cleanedPhotos[0] || formData.image;

    if (editingId) {
      setTreatments((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...formData,
                id: editingId,
                image: primaryImage,
                processPhotos: cleanedPhotos,
              }
            : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        title: formData.title.toUpperCase(),
        image: primaryImage,
        processPhotos: cleanedPhotos,
      };
      setTreatments((prev) => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  const filteredTreatments = treatments.filter((t) => {
    const cat = t.category || 'Face';
    const matchesCat =
      selectedCategory === 'All Treatment' ||
      cat.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Treatment Klinik (Sinkron Halaman Detail &amp; Kategori)
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Kelola nama, kategori, durasi, keterangan lengkap, tahapan pengerjaan,
            dan galeri foto proses treatment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#8B3A4D]/30 text-[#8B3A4D] hover:bg-[#FDF2F2] text-xs font-semibold uppercase tracking-wider transition"
          >
            <span>Lihat Halaman Treatment</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Treatment</span>
          </button>
        </div>
      </div>

      {/* Filter Kategori & Search di Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-[#DA5B86] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-[#FDF2F2] hover:text-[#8B3A4D]'
              }`}
            >
              {cat === 'All Treatment'
                ? `All Treatment (${treatments.length})`
                : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari treatment / kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#8B3A4D] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table of Treatments */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Treatment &amp; Foto Proses</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Keterangan &amp; Tahapan</th>
                <th className="py-4 px-6">Durasi</th>
                <th className="py-4 px-6">Harga</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredTreatments.map((item) => {
                const isActive = item.status === 'Active';
                const photoCount =
                  item.processPhotos && item.processPhotos.length > 0
                    ? item.processPhotos.length
                    : 4;
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/treatments/${item.id}`}
                            className="font-serif font-bold text-gray-900 hover:text-[#8B3A4D] block"
                          >
                            {item.title}
                          </Link>
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#8B3A4D] font-semibold mt-0.5">
                            <Images className="w-3 h-3" />
                            {photoCount} Foto Proses
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-xs font-bold">
                        {item.category || 'Aesthetic Care'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-xs max-w-xs">
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">
                        {item.fullDescription || item.processSteps}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-gray-700 text-xs font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8B3A4D]" />
                        {item.duration || '45 Menit'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-serif font-bold text-[#8B3A4D] text-base">
                      {item.price}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <Link
                          to={`/treatments/${item.id}`}
                          title="Lihat Halaman Detail Treatment"
                          className="px-2.5 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold transition"
                        >
                          Detail
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Edit Treatment"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Hapus Treatment"
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Treatment Lengkap dengan Banyak Foto Proses */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId
                  ? 'Edit Detail, Durasi & Foto Proses Treatment'
                  : 'Tambah Treatment Klinik Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Nama Treatment
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Contoh: HYDRAFACIAL"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kategori Treatment
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Face">Face</option>
                    <option value="Body">Body</option>
                    <option value="Hair">Hair</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Durasi Treatment
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="60 Menit"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Harga Mulai (Rp)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Rp 650.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Ringkasan Singkat (Tampil di Kartu)
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Deep cleanse, exfoliate and hydrate for glowing skin."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Keterangan Detail &amp; Manfaat Treatment (Tampil di Halaman
                  Detail)
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value,
                    })
                  }
                  placeholder="Penjelasan lengkap mengenai prosedur dan manfaat treatment..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Tahapan Proses Pengerjaan (Pisahkan dengan tanda | )
                </label>
                <textarea
                  rows="2"
                  value={formData.processSteps}
                  onChange={(e) =>
                    setFormData({ ...formData, processSteps: e.target.value })
                  }
                  placeholder="1. Deep Cleansing | 2. Gentle Peel | 3. Vortex Extraction | 4. Serum Infusion"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              {/* Galeri Banyak Foto Proses Treatment */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8B3A4D] flex items-center gap-1.5">
                    <Images className="w-4 h-4" />
                    Galeri Foto Proses Treatment (
                    {(formData.processPhotos || []).length} Foto)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddPhotoField}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-bold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Foto Proses
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.processPhotos || []).map((photoUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img
                        src={photoUrl}
                        alt={`Preview ${idx + 1}`}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                      <input
                        type="text"
                        required
                        value={photoUrl}
                        onChange={(e) => handlePhotoChange(idx, e.target.value)}
                        placeholder={`URL Foto Proses Tahap ${idx + 1}`}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs focus:outline-none focus:border-[#8B3A4D]"
                      />
                      {(formData.processPhotos || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePhotoField(idx)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
                  Simpan Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTreatments;
