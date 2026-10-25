import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Tags,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Percent,
} from 'lucide-react';

const emptyCategory = {
  code: 'CAT-NEW',
  name: '',
  description: '',
  status: 'Active',
  isOffer: false,
  image:
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
};

const ManageCategories = () => {
  const { categories, setCategories, products } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyCategory);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      ...emptyCategory,
      code: `CAT-0${categories.length + 1}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat.id);
    setFormData(cat);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedName = formData.name.toUpperCase();
    if (editingId) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...formData, id: editingId, name: formattedName }
            : c
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          name: formattedName,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Kategori Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Atur kategori produk (Skincare, Makeup, Haircare, dll.) yang tampil
            pada ikon bulat di Halaman Produk HSK SECRET.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Kategori</span>
        </button>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Kode</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Deskripsi</th>
                <th className="py-4 px-6">Jumlah Produk</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {categories.map((cat) => {
                const productCount = products.filter(
                  (p) => p.category.toUpperCase() === cat.name.toUpperCase()
                ).length;
                const isActive = cat.status === 'Active';

                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-[#8B3A4D]">
                      {cat.code}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FDF2F2] border border-[#8B3A4D]/20 overflow-hidden flex items-center justify-center shrink-0">
                          {cat.isOffer ? (
                            <Percent className="w-5 h-5 text-[#8B3A4D]" />
                          ) : (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="font-serif font-bold text-gray-900">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-xs">
                      {cat.description}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-[#F9FAFB] border border-gray-200 text-xs font-semibold text-gray-700">
                        {productCount} Produk
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          title="Edit Kategori"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id)}
                          title="Hapus Kategori"
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

      {/* Modal Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId ? 'Edit Kategori Produk' : 'Tambah Kategori Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kode Kategori
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
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
                  Nama Kategori
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: SKINCARE / BODY CARE"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Deskripsi Kategori
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Serum, moisturizer, toner & facial oil"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  URL Foto Kategori Bulat
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
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
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
