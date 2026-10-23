import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  ShoppingBag,
  Star,
  Zap,
  User,
  LogOut,
} from 'lucide-react';

/* ============================================================
   Konfigurasi Filter (Kategori + Sub Kategori + Tipe Kulit)
   ============================================================ */
const CATEGORY_FILTERS = [
  {
    key: 'MAKEUP',
    label: 'Makeup',
    sub: ['Lipstick', 'Cushion', 'Foundation', 'Bedak', 'Blush On', 'Mascara'],
  },
  {
    key: 'SKINCARE',
    label: 'Skincare',
    sub: [
      'Sunscreen',
      'Facial Wash',
      'Toner',
      'Serum',
      'Cream Malam',
      'Moisturizer',
      'Masker',
      'Cleanser',
    ],
  },
  {
    key: 'BATH & BODY',
    label: 'Perawatan Tubuh',
    sub: ['Body Lotion', 'Body Scrub', 'Shower Gel', 'Body Mist'],
  },
  {
    key: 'HAIRCARE',
    label: 'Perawatan Rambut',
    sub: ['Shampoo', 'Conditioner', 'Hair Mask', 'Hair Serum'],
  },
];

const SKIN_TYPES = [
  'Sensitif',
  'Kering',
  'Berminyak',
  'Normal',
  'Acne-Prone',
  'Kombinasi',
];

const ShopPage = () => {
  const navigate = useNavigate();
  const {
    content,
    products,
    addToCart,
    cartTotalItems,
    currentUser,
    logoutCustomer,
  } = useStore();

  // State Filter
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | category key
  const [activeSub, setActiveSub] = useState(null); // sub kategori terpilih
  const [openCategory, setOpenCategory] = useState('SKINCARE'); // accordion yang terbuka
  const [activeSkinTypes, setActiveSkinTypes] = useState([]); // array tipe kulit
  const [addedToast, setAddedToast] = useState(null);

  const toggleCategoryOpen = (key) =>
    setOpenCategory((prev) => (prev === key ? null : key));

  const selectCategory = (key) => {
    setActiveCategory(key);
    setActiveSub(null);
    if (key !== 'ALL') setOpenCategory(key);
  };

  const selectSub = (sub) =>
    setActiveSub((prev) => (prev === sub ? null : sub));

  const toggleSkinType = (type) =>
    setActiveSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const resetFilters = () => {
    setSearch('');
    setActiveCategory('ALL');
    setActiveSub(null);
    setActiveSkinTypes([]);
    setOpenCategory('SKINCARE');
  };

  const hasActiveFilter =
    search.trim() !== '' ||
    activeCategory !== 'ALL' ||
    activeSub !== null ||
    activeSkinTypes.length > 0;

  // Gabungkan teks produk untuk pencocokan sub-kategori / tipe kulit
  const productText = (p) =>
    `${p.name || ''} ${p.subtitle || ''} ${p.category || ''} ${
      p.subCategory || ''
    } ${(p.skinTypes || []).join(' ')} ${(p.tags || []).join(' ')}`.toLowerCase();

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (products || []).filter((p) => {
      // Filter Kategori
      if (
        activeCategory !== 'ALL' &&
        String(p.category || '').toUpperCase() !== activeCategory
      ) {
        return false;
      }

      // Filter Sub Kategori (cocokkan dari field subCategory atau teks produk)
      if (activeSub) {
        const sub = activeSub.toLowerCase();
        const matchSub =
          String(p.subCategory || '').toLowerCase() === sub ||
          productText(p).includes(sub);
        if (!matchSub) return false;
      }

      // Filter Tipe Kulit (produk harus cocok dengan salah satu tipe terpilih)
      if (activeSkinTypes.length > 0) {
        const text = productText(p);
        const matchSkin = activeSkinTypes.some((t) =>
          text.includes(t.toLowerCase())
        );
        if (!matchSkin) return false;
      }

      // Filter Pencarian Kata Kunci
      if (q && !productText(p).includes(q)) return false;

      return true;
    });
  }, [products, activeCategory, activeSub, activeSkinTypes, search]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans">
      {/* Top Promo Strip (Running Text / Marquee) — disamakan dengan halaman Products */}
      <div className="bg-[#F8E4E6] text-[#8B3A4D] text-[11px] font-medium py-2 overflow-hidden relative">
        <div className="animate-marquee-treatments gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="inline-flex items-center gap-16 shrink-0">
              <span>{content?.productPromoLeft}</span>
              <span className="font-semibold">{content?.productPromoCenter}</span>
              <span>✦ 24/7 Customer Support</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar (disamakan dengan halaman Products) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <Link
              to="/"
              className="hover:text-[#8B3A4D] transition whitespace-nowrap"
            >
              Clinic HSK Secret
            </Link>
            <Link
              to="/shop"
              className="text-[#8B3A4D] border-b-2 border-[#8B3A4D] pb-1 whitespace-nowrap"
            >
              Semua Produk
            </Link>
          </nav>

          {/* Right Utility Icons (Minimalis & Compact) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              to="/"
              className="lg:hidden text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] whitespace-nowrap"
            >
              ← Clinic
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-semibold whitespace-nowrap">
                <Link
                  to="/profile"
                  title="Buka Profile & Alamat Penerima"
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
                  title="Keluar Akun"
                  className="ml-1 text-gray-400 hover:text-red-600 transition"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/profile"
                  title="Profile & Alamat Penerima"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] text-[11px] font-semibold whitespace-nowrap transition"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Link
                  to="/login"
                  title="Login / Daftar / Guest"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg border border-[#8B3A4D]/25 text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold whitespace-nowrap transition"
                >
                  Login
                </Link>
              </>
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

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900">
          Semua Produk HSK Secret
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gunakan filter di samping untuk menemukan produk yang tepat untukmu.
        </p>
      </div>

      {/* ===================== LAYOUT: SIDEBAR + GRID ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8 items-start">
        {/* ---------------- SIDEBAR FILTER ---------------- */}
        <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-[#DA5B86]" />
            <h2 className="font-bold text-lg text-gray-900">Filter Pilihan</h2>
          </div>

          {/* Pencarian */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Pencarian</h3>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kata kunci..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#DA5B86] focus:ring-2 focus:ring-[#FDF2F2] transition"
              />
            </div>
          </div>

          {/* Kategori */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Kategori</h3>

            {/* Semua Kategori */}
            <button
              type="button"
              onClick={() => selectCategory('ALL')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition mb-1.5 ${
                activeCategory === 'ALL'
                  ? 'bg-[#FDF2F2] text-[#8B3A4D] font-bold'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Semua Kategori
            </button>

            {/* Daftar Kategori (Accordion) */}
            <div className="space-y-1.5">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat.key;
                const isOpen = openCategory === cat.key;
                return (
                  <div key={cat.key}>
                    <button
                      type="button"
                      onClick={() => {
                        selectCategory(cat.key);
                        toggleCategoryOpen(cat.key);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? 'bg-[#FDF2F2] text-[#8B3A4D] border border-[#F2D3DC]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Sub Kategori */}
                    {isOpen && cat.sub.length > 0 && (
                      <div className="mt-1.5 ml-3 pl-3 border-l border-gray-200 space-y-0.5">
                        {cat.sub.map((sub) => {
                          const subActive = activeSub === sub;
                          return (
                            <button
                              key={sub}
                              type="button"
                              onClick={() => {
                                if (activeCategory !== cat.key)
                                  selectCategory(cat.key);
                                selectSub(sub);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition ${
                                subActive
                                  ? 'bg-[#DA5B86] text-white font-semibold'
                                  : 'text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2]'
                              }`}
                            >
                              {sub}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tipe Kulit */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Tipe Kulit</h3>
            <div className="flex flex-wrap gap-2">
              {SKIN_TYPES.map((type) => {
                const active = activeSkinTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleSkinType(type)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition ${
                      active
                        ? 'bg-[#DA5B86] text-white border-[#DA5B86]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#DA5B86] hover:text-[#8B3A4D]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Filter */}
          <button
            type="button"
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#DA5B86] hover:text-[#8B3A4D] transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filter
          </button>
        </aside>

        {/* ---------------- GRID PRODUK ---------------- */}
        <section>
          {/* Info hasil + chip filter aktif */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-sm text-gray-500">
              Menampilkan{' '}
              <strong className="text-gray-900">
                {filteredProducts.length}
              </strong>{' '}
              produk
            </p>
            {hasActiveFilter && (
              <div className="flex flex-wrap items-center gap-2">
                {activeCategory !== 'ALL' && (
                  <span className="px-2.5 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-semibold">
                    {
                      CATEGORY_FILTERS.find((c) => c.key === activeCategory)
                        ?.label
                    }
                  </span>
                )}
                {activeSub && (
                  <span className="px-2.5 py-1 rounded-full bg-[#DA5B86] text-white text-[11px] font-semibold">
                    {activeSub}
                  </span>
                )}
                {activeSkinTypes.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-14 text-center">
              <div className="w-14 h-14 rounded-full bg-[#FDF2F2] text-[#DA5B86] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Produk tidak ditemukan
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Tidak ada produk yang cocok dengan filter yang kamu pilih. Coba
                ubah kategori atau reset filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-sm font-semibold transition"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product) => {
                const isOutOfStock =
                  product.status === 'Out of Stock' ||
                  Number(product.stock) <= 0;
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col"
                  >
                    <div className="aspect-square bg-[#FDF2F2] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {isOutOfStock ? (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-gray-900/80 text-white text-[9px] font-bold uppercase">
                          Habis
                        </span>
                      ) : (
                        product.isFlashSale && (
                          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-extrabold uppercase shadow">
                            <Zap className="w-2.5 h-2.5 fill-white" />-
                            {product.discountPercent || 20}%
                          </span>
                        )
                      )}
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#DA5B86]">
                          {product.category}
                        </p>
                        <h3 className="font-serif font-bold text-sm text-gray-900 group-hover:text-[#8B3A4D] line-clamp-1 mt-0.5 transition">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 line-clamp-1">
                          {product.subtitle}
                        </p>

                        <div className="flex items-center gap-1 mt-1.5">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">
                            ({product.reviews || 80})
                          </span>
                        </div>

                        {product.isFlashSale ? (
                          <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-bold text-sm text-[#8B3A4D]">
                              {product.flashSalePrice || product.price}
                            </span>
                            <span className="text-[11px] text-gray-400 line-through">
                              {product.originalPrice || product.price}
                            </span>
                          </div>
                        ) : (
                          <p className="font-bold text-sm text-gray-900 mt-1.5">
                            {product.price}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-bold transition ${
                          isOutOfStock
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#DA5B86] hover:bg-[#C84873] text-white'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {isOutOfStock ? 'Stok Habis' : '+ Keranjang'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Toast tambah keranjang */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-[#8B3A4D] rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-md">
          <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gray-900">Masuk Keranjang!</p>
            <p className="text-gray-500 mt-0.5">{addedToast}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="px-3.5 py-2 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 transition"
          >
            Buka Keranjang →
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
