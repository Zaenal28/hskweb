import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  ArrowLeft,
  CheckCircle2,
  User,
  LogOut,
} from 'lucide-react';

const defaultBenefitByProduct = {
  1: 'Mencerahkan tekstur kulit, memudarkan noda hitam bekas jerawat, dan menutrisi lapisan kulit secara mendalam.',
  2: 'Melembapkan kulit kering secara intensif hingga 72 jam dan memperkuat fungsi skin barrier alami.',
  3: 'Meratakan warna kulit yang kusam, menangkal radikal bebas dengan antioksidan Vitamin C murni.',
  4: 'Menyegarkan wajah seketika, menghidrasi pori-pori, dan membuat riasan tampak glowing tahan lama.',
  5: 'Meremajakan elastisitas kulit wajah, menyamarkan garis halus, dan memberikan kilau sehat alami.',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    cartTotalItems,
    currentUser,
    logoutCustomer,
  } = useStore();

  const product =
    products.find((p) => String(p.id) === String(id)) || products[0];

  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-6">
        <p className="text-gray-600 mb-4">Produk tidak ditemukan.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-[#DA5B86] text-white text-xs font-bold uppercase"
        >
          Kembali ke Produk
        </Link>
      </div>
    );
  }

  const isOutOfStock =
    product.status === 'Out of Stock' || Number(product.stock) <= 0;
  const maxStock = Number(product.stock) > 0 ? Number(product.stock) : 1;

  const activePrice =
    product.isFlashSale && product.flashSalePrice
      ? product.flashSalePrice
      : product.price;
  const strikethroughPrice =
    product.isFlashSale && product.originalPrice
      ? product.originalPrice
      : null;
  const discountPercent = product.isFlashSale
    ? product.discountPercent || 20
    : null;

  const benefitText =
    product.benefit ||
    defaultBenefitByProduct[product.id] ||
    `${product.subtitle}. Diformulasikan khusus oleh ahli dermatologi HSK SECRET untuk merawat kesehatan dan kilau alami kulit Anda.`;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      {/* Navbar Minimalis */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <Link to="/products" className="flex items-center shrink-0">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <Link to="/" className="hover:text-[#8B3A4D] transition">
              Home (Clinic)
            </Link>
            <Link
              to="/products"
              className="text-[#8B3A4D] border-b-2 border-[#8B3A4D] pb-1"
            >
              Products
            </Link>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D] whitespace-nowrap transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Kembali</span>
            </Link>

            {currentUser ? (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-semibold whitespace-nowrap">
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="max-w-[90px] truncate">
                    {currentUser.name}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logoutCustomer}
                  className="ml-1 text-gray-400 hover:text-red-600"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-[#8B3A4D]/25 text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold whitespace-nowrap transition"
              >
                Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => navigate('/cart')}
              title="Buka Keranjang Belanja"
              className="w-9 h-9 rounded-full text-gray-700 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] flex items-center justify-center transition relative shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="w-4 h-4 rounded-full bg-[#DA5B86] text-white text-[9px] font-bold flex items-center justify-center absolute -top-0.5 -right-0.5 shadow-sm">
                {cartTotalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Berhasil Masuk Keranjang */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-[#8B3A4D] rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-md">
          <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gray-900">
              {qty}x {product.name} dimasukkan ke Cart!
            </p>
            <p className="text-gray-500 mt-0.5">
              Siap untuk dilanjutkan ke proses pembelian.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="px-3.5 py-2 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 transition"
          >
            Buka Cart →
          </button>
        </div>
      )}

      {/* Main Product Detail Card (Sesuai Desain Gambar Referensi) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* KOLOM KIRI: FOTO BESAR PRODUK + BADGE DISKON */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#FDF2F2] min-h-[360px] sm:min-h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent ? (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                DISKON {discountPercent}%
              </span>
            ) : (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                {product.category || 'SKINCARE'}
              </span>
            )}
          </div>

          {/* KOLOM KANAN: INFORMASI DETAIL PRODUK */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Baris Atas: Brand/Kategori & Kode SKU */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#C85A70]">
                  HSK SECRET · {product.category || 'SKINCARE'}
                </span>
                <span className="text-gray-400 font-medium">
                  SKU: {product.sku || `HSK-PRD-00${product.id}`}
                </span>
              </div>

              {/* Nama Produk */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating Bintang & Status Stok Tersedia */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-800">4.9</span>
                  <span className="text-gray-400">
                    ({product.reviews || 128})
                  </span>
                </div>

                <span className="text-gray-300">|</span>

                {isOutOfStock ? (
                  <span className="font-bold text-red-600">
                    Stok Habis (0 pcs)
                  </span>
                ) : (
                  <span className="font-bold text-emerald-600">
                    Stok Tersedia ({product.stock} pcs)
                  </span>
                )}
              </div>

              {/* Kotak Harga (Harga Promo + Harga Coret) */}
              <div className="rounded-2xl bg-[#F8F8F6] px-5 py-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {activePrice}
                </span>
                {strikethroughPrice && strikethroughPrice !== activePrice && (
                  <span className="text-sm text-gray-400 line-through font-medium">
                    {strikethroughPrice}
                  </span>
                )}
              </div>

              {/* Manfaat Utama */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-1">
                <strong className="text-gray-900">Manfaat Utama:</strong>{' '}
                {benefitText}
              </p>

              {/* Pengatur Jumlah (Qty) */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-gray-800">Jumlah:</span>
                <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 flex items-center justify-center transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQty((prev) => Math.min(maxStock, prev + 1))
                    }
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 flex items-center justify-center transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bagian Bawah: Tombol Favorit, Tambah ke Cart & Beli Sekarang */}
            <div className="space-y-3 pt-4">
              {/* Tombol Tambahkan ke Favorit */}
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full py-3 px-5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  isFavorite
                    ? 'border-[#C85A70] bg-[#FDF2F2] text-[#8B3A4D]'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-[#C85A70] text-[#C85A70]' : ''
                  }`}
                />
                <span>
                  {isFavorite
                    ? 'Tersimpan di Favorit'
                    : 'Tambahkan ke Favorit'}
                </span>
              </button>

              {/* Baris 2 Tombol: Tambah ke Cart & Beli Sekarang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`py-3.5 px-5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    isOutOfStock
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 bg-white hover:border-[#8B3A4D] hover:text-[#8B3A4D] text-gray-900 shadow-sm'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Tambah ke Cart</span>
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className={`py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm ${
                    isOutOfStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#D46A7E] hover:bg-[#DA5B86] text-white'
                  }`}
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>

              {/* Garansi 100% Original & Pengiriman Kilat */}
              <div className="pt-2 flex flex-wrap items-center gap-5 text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Garansi 100% Original</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C85A70]" />
                  <span>Pengiriman Kilat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Produk Lainnya */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
              Produk Lainnya dari HSK SECRET
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setQty(1);
                    navigate(`/products/${item.id}`);
                  }}
                  className="cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group"
                >
                  <div className="h-44 bg-[#FDF2F2] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-xs text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs font-bold text-[#8B3A4D] mt-1">
                      {item.isFlashSale && item.flashSalePrice
                        ? item.flashSalePrice
                        : item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
