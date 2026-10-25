import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Plus,
  Edit3,
  Trash2,
  Package,
  X,
  Save,
  Search,
} from 'lucide-react';

const emptyProduct = {
  sku: 'HSK-PRD-NEW',
  name: '',
  subtitle: 'Brightening & Hydrating',
  category: 'SKINCARE',
  price: 'Rp 390.000',
  stock: 25,
  reviews: 50,
  status: 'Active',
  image:
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85',
};

const ManageProducts = () => {
  const { products, setProducts, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      ...emptyProduct,
      sku: `HSK-PRD-00${products.length + 1}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericStock = Number(formData.stock) || 0;
    const computedStatus = numericStock <= 0 ? 'Out of Stock' : formData.status;

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...formData,
                id: editingId,
                stock: numericStock,
                status: computedStatus,
              }
            : item
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          stock: numericStock,
          status: computedStatus,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Data Barang &amp; Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Kelola stok barang, harga, kategori, dan produk skincare yang tampil
            di Halaman Produk HSK SECRET.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama / SKU barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Barang</span>
          </button>
        </div>
      </div>

      {/* Responsive Product Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Kode SKU</th>
                <th className="py-4 px-6">Nama Barang / Produk</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Harga</th>
                <th className="py-4 px-6">Stok Gudang</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => {
                const isAvailable =
                  product.status === 'Active' && product.stock > 0;
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-[#8B3A4D]">
                      {product.sku || `HSK-00${product.id}`}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <p className="font-serif font-bold text-gray-900 text-base">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md bg-[#F9FAFB] border border-gray-200 text-xs font-semibold text-gray-600">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {product.price}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {product.stock} unit
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/20'
                        }`}
                      >
                        {isAvailable ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          title="Edit Barang"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          title="Hapus Barang"
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

      {/* Modal Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId ? 'Edit Data Barang / Produk' : 'Tambah Barang Baru'}
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
                    Kode SKU Barang
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Nama Produk / Barang
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Radiance Glow Serum"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Subtitle Singkat
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="Contoh: Brightening & Repairing"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Manfaat Utama (Tampil di Halaman Detail Produk)
                </label>
                <textarea
                  rows="2"
                  value={formData.benefit || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, benefit: e.target.value })
                  }
                  placeholder="Contoh: Mencerahkan tekstur kulit, memudarkan noda hitam bekas jerawat."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Harga Jual
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Rp 490.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Stok Unit
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
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
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  URL Foto Produk
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
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
                  Simpan Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
