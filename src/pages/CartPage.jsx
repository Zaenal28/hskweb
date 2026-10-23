import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, parseRupiah, formatRupiah } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  User,
  RotateCcw,
} from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    defaultCart,
    products,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartTotalItems,
    cartSubtotal,
    currentUser,
  } = useStore();

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      {/* Top Promo Bar */}
      <div className="bg-[#F8E4E6] text-[#8B3A4D] text-[11px] font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>✦ Gratis Ongkir Untuk Pembelian di Atas Rp 500.000</span>
          <span className="font-semibold">
            Keranjang Belanja Resmi HSK SECRET Beauty
          </span>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <Link to="/products" className="flex items-center">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold whitespace-nowrap transition"
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>
                {currentUser ? currentUser.name : 'Profile'}
              </span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D] whitespace-nowrap transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Produk</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Stepper Progress */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#8B3A4D]">
            <span className="w-7 h-7 rounded-full bg-[#DA5B86] text-white flex items-center justify-center">
              1
            </span>
            <span>Keranjang Belanja</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              2
            </span>
            <span>Transaksi, Ongkir &amp; Metode Pembayaran</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Keranjang Belanja Anda ({cartTotalItems} Barang)
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Periksa kembali daftar produk pilihan Anda sebelum melanjutkan ke
              proses pembelian dan pembayaran.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Kosongkan Keranjang</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Tampilan Jika Keranjang Kosong */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 sm:p-14 text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Keranjang Belanja Masih Kosong
            </h2>
            <p className="text-sm text-gray-500">
              Anda belum memiliki barang di dalam keranjang. Silakan pilih
              produk skincare HSK SECRET terlebih dahulu.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-widest shadow-md transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pilih Produk Sekarang</span>
              </Link>
              <button
                type="button"
                onClick={() => setCart(defaultCart)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#FDF2F2] text-xs font-bold uppercase tracking-wider transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Muat Contoh Barang Keranjang</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Daftar Barang di Keranjang */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => {
                const unitPrice = parseRupiah(item.price);
                const itemSubtotal = unitPrice * (item.qty || 1);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#8B3A4D]/30 transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-[#FDF2F2] shrink-0 border border-gray-100"
                      />
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-wider">
                          {item.category || 'SKINCARE'}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 mt-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {item.subtitle}
                        </p>
                        <p className="text-xs font-semibold text-gray-600 mt-1">
                          Harga Satuan:{' '}
                          <span className="text-[#8B3A4D] font-bold">
                            {item.price}
                          </span>
                          {item.originalPrice &&
                            item.originalPrice !== item.price && (
                              <span className="ml-2 text-gray-400 line-through text-[11px]">
                                {item.originalPrice}
                              </span>
                            )}
                        </p>
                      </div>
                    </div>

                    {/* Pengatur Jumlah Qty & Subtotal Item */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                          Subtotal Barang
                        </span>
                        <span className="font-serif text-base sm:text-lg font-bold text-[#8B3A4D]">
                          {formatRupiah(itemSubtotal)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center rounded-xl border border-gray-200 bg-[#F9FAFB] p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.id, (item.qty || 1) - 1)
                            }
                            className="w-7 h-7 rounded-lg hover:bg-white text-gray-700 flex items-center justify-center transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-gray-900">
                            {item.qty || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQty(item.id, (item.qty || 1) + 1)
                            }
                            className="w-7 h-7 rounded-lg hover:bg-white text-gray-700 flex items-center justify-center transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          title="Hapus dari Keranjang"
                          className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Rekomendasi Tambah Cepat Produk Lain ke Keranjang */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B3A4D] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Tambah Produk Lainnya ke Keranjang
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {products
                    .filter((p) => p.status !== 'Out of Stock' && p.stock > 0)
                    .slice(0, 3)
                    .map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-xl border border-gray-100 bg-[#F9FAFB] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {prod.name}
                            </p>
                            <p className="text-[11px] font-semibold text-[#8B3A4D]">
                              {prod.price}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(prod, 1)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#DA5B86] hover:bg-[#C84873] text-white text-[10px] font-bold uppercase shrink-0 transition"
                        >
                          + Tambah
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Ringkasan Belanja & Tombol PROSES PEMBELIAN */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-7 space-y-5 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                Ringkasan Keranjang
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Total Jenis Produk</span>
                  <span className="font-semibold text-gray-900">
                    {cart.length} Produk
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Total Jumlah Barang</span>
                  <span className="font-semibold text-gray-900">
                    {cartTotalItems} Pcs
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Estimasi Ongkos Kirim</span>
                  <span className="text-xs font-semibold text-[#8B3A4D]">
                    Dipilih saat Checkout
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-gray-900">
                    Subtotal Harga
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#8B3A4D]">
                    {formatRupiah(cartSubtotal)}
                  </span>
                </div>
              </div>

              {cartSubtotal >= 500000 && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Selamat! Belanjaan Anda memenuhi syarat{' '}
                    <strong>Promo Gratis Ongkir (Rp 0)</strong>.
                  </span>
                </div>
              )}

              {/* TOMBOL PROSES PEMBELIAN */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>Proses Pembelian</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="block text-center text-xs font-semibold text-gray-500 hover:text-[#8B3A4D] transition"
              >
                ← Tambah Barang Lain dari Katalog Produk
              </Link>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-2.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-5 h-5 text-[#8B3A4D] shrink-0" />
                <span>
                  Transaksi 100% Aman &amp; Terenkripsi · Produk Original HSK
                  SECRET
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
