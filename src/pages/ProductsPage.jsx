import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Search,
  User,
  ShoppingBag,
  CheckCircle2,
  HeartHandshake,
  Sparkles,
  Leaf,
  Truck,
  RotateCcw,
  Lock,
  Gift,
  Star,
  Percent,
  ArrowRight,
  Instagram,
  Facebook,
  Globe,
  Plus,
  LogOut,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
  Mail,
  Store,
  CreditCard,
} from 'lucide-react';

const HERO_SLIDE_INTERVAL_MS = 5000;

/* Heading kecil untuk kolom-kolom footer */
const FooterHeading = ({ children }) => (
  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
    {children}
  </h4>
);

/* Ikon WhatsApp sederhana (lucide tidak menyediakan brand WhatsApp) */
const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* Media sosial footer */
const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { name: 'Website', href: '#', Icon: Globe },
];

/* Metode pembayaran yang ditampilkan di footer */
const PAYMENT_METHODS = [
  { name: 'BCA', render: () => <span className="text-[13px] font-extrabold text-[#0066AE]">BCA</span> },
  { name: 'Mandiri', render: () => <span className="text-[13px] font-extrabold text-[#003d79]">Mandiri</span> },
  { name: 'BNI', render: () => <span className="text-[13px] font-extrabold text-[#f15a22]">BNI</span> },
  { name: 'QRIS', render: () => <span className="text-[13px] font-extrabold text-[#111]">QRIS</span> },
  { name: 'GoPay', render: () => <span className="text-[13px] font-extrabold text-[#00aed6]">GoPay</span> },
  { name: 'OVO', render: () => <span className="text-[13px] font-extrabold text-[#4c3494]">OVO</span> },
  { name: 'Visa', render: () => <span className="text-[13px] font-extrabold italic text-[#1a1f71]">VISA</span> },
  { name: 'Mastercard', render: () => <span className="text-[13px] font-extrabold text-[#eb001b]">MC</span> },
];

const testimonials = [
  {
    name: 'Sophia M.',
    role: 'Verified Buyer',
    quote: '“The quality is amazing! My skin has never felt better.”',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Emily R.',
    role: 'Verified Buyer',
    quote: '“Fast delivery and beautiful packaging. Love it!”',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jessica L.',
    role: 'Verified Buyer',
    quote: '“HSK Secret Beauty is now my go-to skincare brand!”',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const {
    content,
    productSlides,
    categories,
    products,
    flashSaleConfig,
    addToCart,
    cartTotalItems,
    currentUser,
    logoutCustomer,
  } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [addedToast, setAddedToast] = useState(null);

  // Slide Hero Produk (Konten + Gambar / Hanya Gambar) — fallback ke konten lama
  const visibleProductSlides = (productSlides || []).filter(
    (s) => s.status !== 'Hidden'
  );
  const heroSlides =
    visibleProductSlides.length > 0
      ? visibleProductSlides
      : [
          {
            id: 'default',
            isFullImage: false,
            subtitle: content.productHeroSubtitle,
            titleLine1: content.productHeroTitleLine1,
            titleLine2: content.productHeroTitleLine2,
            description: content.productHeroDescription,
            buttonPrimary: 'Shop Now',
            buttonSecondary: 'Explore Collections',
            showBadges: true,
            image: content.productHeroImage,
          },
        ];
  const [heroIndex, setHeroIndex] = useState(0);
  const safeHeroIndex = heroIndex >= heroSlides.length ? 0 : heroIndex;

  // Auto-slide setiap 5 detik
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const t = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [safeHeroIndex, heroSlides.length]);

  const handlePrevHero = () =>
    setHeroIndex(
      safeHeroIndex === 0 ? heroSlides.length - 1 : safeHeroIndex - 1
    );
  const handleNextHero = () =>
    setHeroIndex((safeHeroIndex + 1) % heroSlides.length);

  // State Countdown Timer Flash Sale
  const [secondsLeft, setSecondsLeft] = useState(
    (Number(flashSaleConfig?.countdownHours) || 4) * 3600 + 1845
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 14400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(
    2,
    '0'
  );
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const handleAddProductToCart = (product) => {
    addToCart(product, 1);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 3500);
  };

  const activeCategories = categories.filter((c) => c.status !== 'Hidden');
  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  const displayedProducts =
    selectedCategory === 'ALL'
      ? products
      : selectedCategory === 'OFFERS'
      ? products.filter((p) => p.isFlashSale)
      : products.filter(
          (p) => p.category.toUpperCase() === selectedCategory.toUpperCase()
        );

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Top Promo Strip (Running Text / Marquee) */}
      <div className="bg-[#F8E4E6] text-[#8B3A4D] text-[11px] font-medium py-2 overflow-hidden relative">
        <div className="animate-marquee-treatments gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="inline-flex items-center gap-16 shrink-0">
              <span>{content.productPromoLeft}</span>
              <span className="font-semibold">{content.productPromoCenter}</span>
              <span>✦ 24/7 Customer Support</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
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
              className="hover:text-[#8B3A4D] transition whitespace-nowrap"
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

      {/* Notifikasi Barang Masuk Keranjang */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-[#8B3A4D] rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-md">
          <div className="w-10 h-10 rounded-full bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gray-900">
              Berhasil Masuk ke Keranjang!
            </p>
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

      {/* Hero Section (Slide Otomatis: Konten + Gambar / Hanya Gambar Saja — dikelola di Admin) */}
      <section className="bg-[#FDF2F2] overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative overflow-hidden h-[560px] lg:h-[550px]">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${safeHeroIndex * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.id} className="w-full h-full shrink-0">
                {slide.isFullImage ? (
                  /* SLIDE HANYA GAMBAR SAJA */
                  <div className="w-full h-full relative overflow-hidden bg-[#FDF2F2]">
                    <img
                      src={slide.image}
                      alt={slide.titleLine2 || 'HSK SECRET Banner Produk'}
                      style={{
                        objectFit: slide.imageFit || 'cover',
                        objectPosition: slide.imagePosition || 'center',
                      }}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  /* SLIDE KONTEN TEKS + GAMBAR */
                  <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                    {/* Left Column */}
                    <div className="lg:col-span-6 px-6 sm:px-12 py-10 lg:py-16 flex flex-col justify-center space-y-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8B3A4D]">
                        {slide.subtitle}
                      </p>
                      <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.14] text-gray-900">
                        {slide.titleLine1} <br />
                        <span className="text-gray-800">{slide.titleLine2}</span>
                      </h1>
                      <p className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
                        {slide.description}
                      </p>

                      {/* Buttons */}
                      {(slide.buttonPrimary || slide.buttonSecondary) && (
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          {slide.buttonPrimary && (
                            <a
                              href="#featured"
                              className="px-7 py-3.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-widest shadow-sm transition"
                            >
                              {slide.buttonPrimary}
                            </a>
                          )}
                          {slide.buttonSecondary && (
                            <a
                              href="#categories"
                              className="px-7 py-3.5 rounded-md border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-semibold uppercase tracking-widest transition"
                            >
                              {slide.buttonSecondary}
                            </a>
                          )}
                        </div>
                      )}

                      {/* 4 Mini Guarantees */}
                      {slide.showBadges !== false && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#8B3A4D]/15">
                          {[
                            { icon: CheckCircle2, label: '100% Authentic Products' },
                            { icon: HeartHandshake, label: 'Cruelty Free & Vegan' },
                            { icon: Sparkles, label: 'Dermatologist Tested' },
                            { icon: Leaf, label: 'Eco-Friendly Packaging' },
                          ].map((item) => {
                            const Icon = item.icon;
                            return (
                              <div key={item.label} className="flex items-center gap-2.5">
                                <Icon className="w-5 h-5 text-[#8B3A4D] shrink-0" />
                                <span className="text-[11px] font-medium text-gray-700 leading-tight">
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right Hero Image */}
                    <div className="hidden lg:block lg:col-span-6 relative h-full overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.titleLine2 || 'HSK SECRET Luxury Skincare'}
                        style={{
                          objectFit: slide.imageFit || 'cover',
                          objectPosition: slide.imagePosition || 'center',
                        }}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigasi Slide */}
          {heroSlides.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevHero}
                aria-label="Slide sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8B3A4D] shadow flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextHero}
                aria-label="Slide berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8B3A4D] shadow flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {heroSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === safeHeroIndex
                        ? 'w-6 bg-[#DA5B86]'
                        : 'w-2 bg-white/80 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Circular Category Icons Row (Connected to ManageCategories) */}
      <section id="categories" className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 text-center">
          {activeCategories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(isSelected ? 'ALL' : cat.name)
                }
                className="group flex flex-col items-center gap-3 focus:outline-none"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-[#FDF2F2] p-1.5 border transition overflow-hidden flex items-center justify-center shadow-sm ${
                    isSelected
                      ? 'border-2 border-[#8B3A4D] ring-4 ring-[#FDF2F2]'
                      : 'border-[#8B3A4D]/15 group-hover:border-[#8B3A4D]'
                  }`}
                >
                  {cat.isOffer ? (
                    <div className="w-full h-full rounded-full bg-[#F8E4E6] text-[#8B3A4D] flex items-center justify-center">
                      <Percent className="w-7 h-7" />
                    </div>
                  ) : (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider transition ${
                    isSelected
                      ? 'text-[#8B3A4D] underline'
                      : 'text-gray-700 group-hover:text-[#8B3A4D]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ==================== FLASH SALE SECTION (DENGAN POTONGAN & HARGA CORET) ==================== */}
      {flashSaleConfig?.isActive !== false && flashSaleProducts.length > 0 && (
        <section
          id="flash-sale"
          className="pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-8"
        >
          <div className="rounded-3xl bg-[#FDF2F2] border border-[#8B3A4D]/15 p-6 sm:p-8 text-gray-800 shadow-sm">
            {/* Header Flash Sale & Countdown Timer */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#8B3A4D]/15">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DA5B86] text-white text-[10px] font-extrabold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>{flashSaleConfig?.badgeText || '⚡ FLASH SALE'}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase text-gray-900">
                  {flashSaleConfig?.title || 'FLASH SALE SPESIAL HSK SECRET'}
                </h2>
                <p className="text-xs text-gray-600">
                  {flashSaleConfig?.subtitle ||
                    'Promo potongan harga spesial waktu terbatas!'}
                </p>
              </div>

              {/* Countdown Box */}
              <div className="flex items-center gap-3 self-start md:self-auto bg-white px-4 py-2.5 rounded-2xl border border-[#8B3A4D]/15 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                  <Clock className="w-4 h-4 text-[#8B3A4D]" />
                  <span>Berakhir Dalam:</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-sm font-extrabold text-[#8B3A4D]">
                  <span className="px-2.5 py-1 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/15">
                    {hours}
                  </span>
                  <span>:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/15">
                    {minutes}
                  </span>
                  <span>:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#DA5B86] text-white">
                    {seconds}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Kartu Produk Flash Sale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
              {flashSaleProducts.map((product) => {
                const isOutOfStock =
                  product.status === 'Out of Stock' ||
                  Number(product.stock) <= 0;
                const quota = Number(product.flashSaleQuota) || 30;
                const sold = Number(product.flashSaleSold) || 15;
                const soldPercent = Math.min(
                  100,
                  Math.round((sold / quota) * 100)
                );

                return (
                  <div
                    key={`fs-${product.id}`}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="cursor-pointer bg-white text-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group flex flex-col"
                  >
                    <div className="h-52 bg-[#FDF2F2] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {/* Badge Potongan Persen */}
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                        <Zap className="w-3 h-3 fill-white" />
                        Hemat {product.discountPercent || 20}%
                      </span>
                      {isOutOfStock && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gray-900/80 text-white text-[10px] font-bold uppercase">
                          Habis
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-serif font-bold text-sm text-gray-900 group-hover:text-[#8B3A4D] line-clamp-1 transition">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {product.subtitle}
                        </p>

                        {/* Harga Coret & Harga Promo Flash Sale */}
                        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                          <span className="font-bold text-base text-[#8B3A4D]">
                            {product.flashSalePrice || product.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice || product.price}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Stok Flash Sale & Tombol Detail + Keranjang */}
                      <div className="space-y-2.5 pt-2 border-t border-gray-100">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1">
                            <span className="text-rose-600">
                              ⚡ Terjual {sold}/{quota}
                            </span>
                            <span>{soldPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-rose-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#DA5B86] to-rose-500 rounded-full"
                              style={{ width: `${soldPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product.id}`);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#8B3A4D]/30 bg-[#FDF2F2]/60 hover:bg-[#DA5B86] text-[#8B3A4D] hover:text-white text-[10px] font-bold whitespace-nowrap transition"
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddProductToCart(product);
                            }}
                            title="Masukkan Produk Flash Sale ke Keranjang"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap shrink-0 transition shadow-sm ${
                              isOutOfStock
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[#DA5B86] hover:bg-[#C84873] text-white'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                            <span>+ Keranjang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section id="featured" className="py-14 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-wider uppercase text-gray-900">
              Featured Products
            </h2>
            {selectedCategory !== 'ALL' && (
              <p className="text-xs text-[#8B3A4D] mt-1">
                Menampilkan kategori: <strong>{selectedCategory}</strong>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8B3A4D] hover:underline"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards (Running Text / Marquee Style agar Reaktif) */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Efek Gradasi Halus Kiri & Kanan */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="animate-marquee-treatments gap-6 px-3">
            {[...displayedProducts, ...displayedProducts].map(
              (product, idx) => {
                const isOutOfStock =
                  product.status === 'Out of Stock' ||
                  Number(product.stock) <= 0;
                return (
                  <div
                    key={`${product.id}-${idx}`}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="cursor-pointer w-64 sm:w-[275px] shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col"
                  >
                    <div className="h-56 bg-[#FDF2F2] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {isOutOfStock ? (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#DA5B86] text-white text-[10px] font-bold uppercase tracking-wider">
                          Out of Stock
                        </span>
                      ) : (
                        product.isFlashSale && (
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                            <Zap className="w-3 h-3 fill-white" />-
                            {product.discountPercent || 20}%
                          </span>
                        )
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-sm text-gray-900 group-hover:text-[#8B3A4D] transition">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {product.subtitle}
                        </p>
                        {product.isFlashSale ? (
                          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-bold text-sm text-[#8B3A4D]">
                              {product.flashSalePrice || product.price}
                            </span>
                            <span className="text-[11px] text-gray-400 line-through">
                              {product.originalPrice || product.price}
                            </span>
                          </div>
                        ) : (
                          <p className="font-bold text-sm text-gray-900 mt-2">
                            {product.price}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5">
                        <div className="flex items-center gap-1 min-w-0">
                          <div className="flex text-amber-400 shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 truncate">
                            ({product.reviews || 80})
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product.id}`);
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded-lg border border-[#8B3A4D]/30 bg-[#FDF2F2]/60 hover:bg-[#DA5B86] text-[#8B3A4D] hover:text-white text-[10px] font-bold text-center whitespace-nowrap transition"
                          >
                            Detail
                          </button>

                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddProductToCart(product);
                            }}
                            title="Masukkan ke Keranjang"
                            className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap shrink-0 transition shadow-sm ${
                              isOutOfStock
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[#DA5B86] hover:bg-[#C84873] text-white'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                            <span>+ Keranjang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Perks Pink Banner */}
        <div className="mt-14 bg-[#FDF2F2] rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border border-[#8B3A4D]/10">
          {[
            {
              icon: Truck,
              title: 'FREE SHIPPING',
              desc: 'Min. belanja Rp 500.000',
            },
            {
              icon: RotateCcw,
              title: 'EASY RETURNS',
              desc: '30-day return policy',
            },
            {
              icon: Lock,
              title: 'SECURE PAYMENT',
              desc: '100% secure checkout',
            },
            {
              icon: Gift,
              title: 'EXCLUSIVE OFFERS',
              desc: 'Save more with deals',
            },
          ].map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white text-[#8B3A4D] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Loved By Thousands Reviews */}
      <section id="reviews" className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wider uppercase text-gray-900">
            Loved By Thousands
          </h2>
          <a
            href="#reviews"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8B3A4D] hover:underline"
          >
            <span>See All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex text-amber-400 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">{item.role}</p>
                </div>
              </div>
              <p className="font-serif italic text-gray-600 text-sm leading-relaxed">
                {item.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Exclusive Offer 20% OFF Banner */}
      <section className="my-10 bg-[#F8E4E6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 h-72 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
              alt="HSK SECRET Collection Offer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-14 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B3A4D]">
              EXCLUSIVE OFFER
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 leading-tight">
              Get 20% OFF <br />
              Your First Order
            </h2>
            <div>
              <span className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                Use Code:{' '}
                <strong className="text-[#8B3A4D]">
                  {content.productOfferCode}
                </strong>
              </span>
            </div>
            <div className="pt-2">
              <a
                href="#featured"
                className="inline-block px-7 py-3 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-widest shadow-sm transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        id="footer"
        className="relative bg-gradient-to-b from-white to-[#FDF2F2] border-t border-[#F2D3DC]"
      >
        {/* Garis aksen atas */}
        <div className="h-1 w-full bg-gradient-to-r from-[#F8E4E6] via-[#DA5B86] to-[#F8E4E6]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-10">
          {/* Baris atas: Brand + 3 kolom informasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="lg:col-span-3 space-y-4">
              <img
                src="/hsk-logo.png"
                alt="HSK SECRET"
                className="h-12 w-auto object-contain"
              />
              <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
                Skincare &amp; perawatan kecantikan berkualitas dari HSK Secret
                untuk kulit sehat dan glowing setiap hari.
              </p>
            </div>

            {/* Let's Stay in Touch */}
            <div className="lg:col-span-3 space-y-4">
              <FooterHeading>Let&apos;s Stay in Touch</FooterHeading>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={name}
                    aria-label={name}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F47AA3] to-[#DA5B86] text-white flex items-center justify-center shadow-md shadow-[#DA5B86]/25 hover:-translate-y-0.5 hover:shadow-lg transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-gray-500">
                Ikuti kami untuk promo &amp; tips kecantikan terbaru.
              </p>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 space-y-4">
              <FooterHeading>Contact HSK Secret</FooterHeading>
              <a
                href="https://wa.me/6281809607187"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-full bg-[#FDF2F2] border border-[#F2D3DC] text-[#DA5B86] flex items-center justify-center group-hover:bg-[#DA5B86] group-hover:text-white transition">
                  <WhatsAppIcon className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-semibold text-gray-700 group-hover:text-[#DA5B86] transition">
                    +62 818-0960-7187
                  </span>
                </span>
              </a>
              <a
                href="mailto:CS@hsksecret.id"
                className="group flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-full bg-[#FDF2F2] border border-[#F2D3DC] text-[#DA5B86] flex items-center justify-center group-hover:bg-[#DA5B86] group-hover:text-white transition">
                  <Mail className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">
                    Email
                  </span>
                  <span className="block text-sm font-semibold text-gray-700 group-hover:text-[#DA5B86] transition">
                    CS@hsksecret.id
                  </span>
                </span>
              </a>
            </div>

            {/* Delivery */}
            <div className="lg:col-span-3 space-y-4">
              <FooterHeading>Delivery Service</FooterHeading>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <span className="w-7 h-7 rounded-md bg-[#E3262B] text-white flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </span>
                  <span className="leading-none">
                    <span className="block text-sm font-black italic text-[#E3262B] tracking-tight">
                      SICEPAT
                    </span>
                    <span className="block text-[8px] font-semibold tracking-[0.2em] text-gray-400">
                      EKSPRES
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#F2D3DC] shadow-sm">
                  <span className="w-7 h-7 rounded-md bg-[#FDF2F2] text-[#DA5B86] flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </span>
                  <span className="leading-none">
                    <span className="block text-[9px] text-gray-500">Ambil di</span>
                    <span className="block text-sm font-extrabold text-[#DA5B86] tracking-wide">
                      KLINIK
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-12 pt-8 border-t border-[#F2D3DC]">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4 text-[#DA5B86]" />
              <FooterHeading>Payment Method</FooterHeading>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {PAYMENT_METHODS.map((p) => (
                <div
                  key={p.name}
                  title={p.name}
                  className="h-10 min-w-[88px] px-3 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#DA5B86] hover:shadow-md transition"
                >
                  {p.render()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#DA5B86] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p className="font-medium">
              © {new Date().getFullYear()} HSK SECRET. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-white/85">
              <Link to="/login" className="hover:text-white hover:underline">
                Login Customer / Guest
              </Link>
              <Link to="/admin/login" className="hover:text-white hover:underline">
                Login Admin
              </Link>
              <span>Privacy Policy</span>
              <span>Terms &amp; Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;
