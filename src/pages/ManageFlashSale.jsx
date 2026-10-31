import React, { useState } from 'react';
import { useStore, parseRupiah, formatRupiah } from '../context/StoreContext';
import {
  Zap,
  Save,
  Edit3,
  CheckCircle2,
  Percent,
  Clock,
  X,
  Plus,
  Trash2,
  Tag,
} from 'lucide-react';

const ManageFlashSale = () => {
  const {
    products,
    setProducts,
    flashSaleConfig,
    setFlashSaleConfig,
  } = useStore();

  const [bannerForm, setBannerForm] = useState(
    flashSaleConfig || {
      isActive: true,
      title: 'FLASH SALE SPESIAL HSK SECRET',
      subtitle: 'Promo Potongan Harga Eksklusif Waktu Terbatas',
      badgeText: '⚡ FLASH SALE',
      countdownHours: 4,
    }
  );

  const [savedNotice, setSavedNotice] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const showToast = (msg) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(''), 3500);
  };

  // Simpan Pengaturan Banner Flash Sale
  const handleSaveBanner = (e) => {
    e.preventDefault();
    setFlashSaleConfig(bannerForm);
    showToast('Pengaturan Banner & Timer Flash Sale berhasil disimpan!');
  };

  // Toggle Produk Masuk / Keluar Flash Sale
  const handleToggleFlashSale = (product) => {
    const nextState = !product.isFlashSale;
    const baseNum = parseRupiah(product.originalPrice || product.price);
    const disc = Number(product.discountPercent) || 20;
    const computedFlashPrice = formatRupiah(
      Math.round(baseNum * (1 - disc / 100))
    );

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              isFlashSale: nextState,
              originalPrice: p.originalPrice || p.price,
              discountPercent: disc,
              flashSalePrice: p.flashSalePrice || computedFlashPrice,
              flashSaleQuota: p.flashSaleQuota || 30,
              flashSaleSold: p.flashSaleSold || 10,
            }
          : p
      )
    );
    showToast(
      nextState
        ? `${product.name} ditambahkan ke Flash Sale!`
        : `${product.name} dikeluarkan dari Flash Sale.`
    );
  };

  // Buka Modal Edit Harga Coret & Potongan Flash Sale
  const openEditModal = (product) => {
    const orig = product.originalPrice || product.price;
    const disc = Number(product.discountPercent) || 20;
    const origNum = parseRupiah(orig);
    const defaultFlash =
      product.flashSalePrice ||
      formatRupiah(Math.round(origNum * (1 - disc / 100)));

    setEditingProduct({
      ...product,
      isFlashSale: true,
      originalPrice: orig,
      discountPercent: disc,
      flashSalePrice: defaultFlash,
      flashSaleQuota: product.flashSaleQuota || 30,
      flashSaleSold: product.flashSaleSold || 12,
    });
  };

  // Kalkulasi Otomatis saat Harga Coret atau Persen Potongan Diubah
  const handleOriginalPriceChange = (val) => {
    const origNum = parseRupiah(val);
    const disc = Number(editingProduct.discountPercent) || 0;
    const flashNum = Math.max(0, Math.round(origNum * (1 - disc / 100)));
    setEditingProduct((prev) => ({
      ...prev,
      originalPrice: val,
      price: val,
      flashSalePrice: origNum > 0 ? formatRupiah(flashNum) : prev.flashSalePrice,
    }));
  };

  const handleDiscountPercentChange = (val) => {
    const disc = Math.min(95, Math.max(0, Number(val) || 0));
    const origNum = parseRupiah(editingProduct.originalPrice);
    const flashNum = Math.max(0, Math.round(origNum * (1 - disc / 100)));
    setEditingProduct((prev) => ({
      ...prev,
      discountPercent: disc,
      flashSalePrice: origNum > 0 ? formatRupiah(flashNum) : prev.flashSalePrice,
    }));
  };

  const handleFlashPriceManualChange = (val) => {
    const origNum = parseRupiah(editingProduct.originalPrice);
    const flashNum = parseRupiah(val);
    let computedDisc = editingProduct.discountPercent;
    if (origNum > 0 && flashNum <= origNum) {
      computedDisc = Math.round(((origNum - flashNum) / origNum) * 100);
    }
    setEditingProduct((prev) => ({
      ...prev,
      flashSalePrice: val,
      discountPercent: computedDisc,
    }));
  };

  const handleSaveProductFlashSale = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    showToast(
      `Harga Coret & Potongan Flash Sale untuk "${editingProduct.name}" berhasil disimpan!`
    );
  };

  const activeFlashProducts = products.filter((p) => p.isFlashSale);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Flash Sale &amp; Harga Coret Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Atur produk yang masuk ke promo Flash Sale, persentase potongan
            diskon (%), serta tampilan harga coret di Halaman Produk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-2 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] text-xs font-bold">
            ⚡ {activeFlashProducts.length} Produk Sedang Flash Sale
          </span>
        </div>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* BAGIAN 1: PENGATURAN BANNER & COUNTDOWN FLASH SALE */}
      <form
        onSubmit={handleSaveBanner}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-serif text-lg font-bold text-[#8B3A4D] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Pengaturan Banner &amp; Timer Flash Sale</span>
          </h3>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bannerForm.isActive !== false}
              onChange={(e) =>
                setBannerForm({ ...bannerForm, isActive: e.target.checked })
              }
              className="w-4 h-4 accent-[#8B3A4D]"
            />
            <span className="text-xs font-bold text-gray-700">
              Tampilkan Section Flash Sale di Halaman Produk
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Label Badge
            </label>
            <input
              type="text"
              value={bannerForm.badgeText || ''}
              onChange={(e) =>
                setBannerForm({ ...bannerForm, badgeText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Judul Utama Flash Sale
            </label>
            <input
              type="text"
              value={bannerForm.title || ''}
              onChange={(e) =>
                setBannerForm({ ...bannerForm, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Durasi Timer (Jam)
            </label>
            <input
              type="number"
              min="1"
              max="72"
              value={bannerForm.countdownHours || 4}
              onChange={(e) =>
                setBannerForm({
                  ...bannerForm,
                  countdownHours: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
              Subtitle Promo Flash Sale
            </label>
            <input
              type="text"
              value={bannerForm.subtitle || ''}
              onChange={(e) =>
                setBannerForm({ ...bannerForm, subtitle: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Banner</span>
            </button>
          </div>
        </div>
      </form>

      {/* BAGIAN 2: TABEL PENGATURAN PRODUK FLASH SALE, POTONGAN & HARGA CORET */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Daftar Produk &amp; Pengaturan Harga Coret Flash Sale
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Aktifkan status Flash Sale pada produk dan klik{' '}
              <strong>Atur Harga Coret &amp; Potongan</strong> untuk mengubah
              harga asli (dicoret) dan harga setelah diskon.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF2F2]/70 text-[#8B3A4D] text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Produk</th>
                <th className="py-3.5 px-4">Status Flash Sale</th>
                <th className="py-3.5 px-4">Harga Coret (Harga Asli)</th>
                <th className="py-3.5 px-4">Potongan (%)</th>
                <th className="py-3.5 px-4">Harga Flash Sale</th>
                <th className="py-3.5 px-4">Kuota Terjual</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {products.map((product) => {
                const origPrice = product.originalPrice || product.price;
                const disc = Number(product.discountPercent) || 20;
                const flashPrice =
                  product.flashSalePrice ||
                  formatRupiah(
                    Math.round(parseRupiah(origPrice) * (1 - disc / 100))
                  );

                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50/80 transition ${
                      product.isFlashSale ? 'bg-[#FDF2F2]/25' : ''
                    }`}
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {product.sku} · {product.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Toggle Aktif / Nonaktif Flash Sale */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFlashSale(product)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${
                          product.isFlashSale
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>
                          {product.isFlashSale
                            ? 'Aktif Flash Sale'
                            : 'Tidak Aktif'}
                        </span>
                      </button>
                    </td>

                    {/* Harga Coret */}
                    <td className="py-4 px-4">
                      <span className="text-gray-400 line-through font-semibold text-xs">
                        {origPrice}
                      </span>
                    </td>

                    {/* Persentase Potongan */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-extrabold text-xs">
                        -{disc}%
                      </span>
                    </td>

                    {/* Harga Promo Flash Sale */}
                    <td className="py-4 px-4">
                      <span className="font-serif text-sm font-bold text-[#8B3A4D]">
                        {flashPrice}
                      </span>
                    </td>

                    {/* Kuota Flash Sale */}
                    <td className="py-4 px-4 text-gray-600 font-medium">
                      {product.flashSaleSold || 10} /{' '}
                      {product.flashSaleQuota || 30} Pcs
                    </td>

                    {/* Tombol Edit Harga Coret & Potongan */}
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-bold transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Atur Harga Coret &amp; Potongan</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ATUR HARGA CORET & POTONGAN FLASH SALE */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#8B3A4D]" />
                <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                  Atur Flash Sale &amp; Harga Coret
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveProductFlashSale}
              className="p-6 space-y-4"
            >
              {/* Info Produk & Preview Tampilan Harga Coret */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-gray-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={editingProduct.image}
                    alt={editingProduct.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-serif font-bold text-gray-900">
                      {editingProduct.name}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-base text-[#8B3A4D]">
                        {editingProduct.flashSalePrice}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {editingProduct.originalPrice}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                        -{editingProduct.discountPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Aktif Flash Sale */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Status Promo Flash Sale Produk Ini
                </label>
                <select
                  value={editingProduct.isFlashSale ? 'true' : 'false'}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      isFlashSale: e.target.value === 'true',
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-bold text-[#8B3A4D] focus:outline-none focus:border-[#8B3A4D]"
                >
                  <option value="true">
                    ⚡ Aktifkan di Flash Sale &amp; Tampilkan Harga Coret
                  </option>
                  <option value="false">
                    Nonaktifkan (Tampilkan Harga Normal Saja)
                  </option>
                </select>
              </div>

              {/* Input Harga Coret & Persentase Potongan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    1. Harga Coret / Harga Normal (Rp) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.originalPrice}
                    onChange={(e) => handleOriginalPriceChange(e.target.value)}
                    placeholder="Contoh: Rp 490.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    2. Potongan Diskon (%) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="95"
                      required
                      value={editingProduct.discountPercent}
                      onChange={(e) =>
                        handleDiscountPercentChange(e.target.value)
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm font-bold text-rose-600 focus:outline-none focus:border-[#8B3A4D]"
                    />
                    <Percent className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Input Harga Flash Sale (Otomatis Terhitung / Bisa Diedit Manual) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  3. Harga Setelah Potongan (Harga Flash Sale Rp) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.flashSalePrice}
                  onChange={(e) => handleFlashPriceManualChange(e.target.value)}
                  placeholder="Contoh: Rp 343.000"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#8B3A4D]/30 bg-[#FDF2F2]/40 text-sm font-bold text-[#8B3A4D] focus:outline-none focus:border-[#8B3A4D]"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Otomatis dihitung dari Harga Coret dikurangi Potongan %, atau
                  ketik langsung nominalnya.
                </p>
              </div>

              {/* Kuota Stok & Terjual */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Total Kuota Flash Sale
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.flashSaleQuota || 30}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        flashSaleQuota: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Jumlah Sudah Terjual
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.flashSaleSold || 10}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        flashSaleSold: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-wider shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Harga Coret &amp; Flash Sale</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlashSale;
