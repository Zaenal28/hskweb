import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  UserCheck,
  Award,
  ShieldCheck,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const SLIDE_INTERVAL_MS = 5000;

const ClinicHome = () => {
  const navigate = useNavigate();
  const { content, clinicSlides, treatments } = useStore();

  const activeSlides =
    clinicSlides && clinicSlides.filter((s) => s.status !== 'Hidden').length > 0
      ? clinicSlides.filter((s) => s.status !== 'Hidden')
      : [
          {
            id: 1,
            subtitle: content.clinicHeroSubtitle,
            titleLine1: content.clinicHeroTitleLine1,
            titleLine2: content.clinicHeroTitleLine2,
            description: content.clinicHeroDescription,
            discountTop: 'NEW CLIENTS',
            discountMain: content.clinicDiscountBadge,
            discountBottom: 'FIRST TREATMENT',
            buttonPrimary: 'Book Your Appointment',
            buttonSecondary: 'Explore Products',
            image: content.clinicHeroImage,
          },
        ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const safeIndex =
    currentSlideIndex >= activeSlides.length ? 0 : currentSlideIndex;

  // Auto-slide reaktif tepat setiap 5 detik (5000ms)
  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const slideTimer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      clearTimeout(slideTimer);
    };
  }, [safeIndex, activeSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? activeSlides.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const activeTreatments = treatments.filter((t) => t.status !== 'Hidden');

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
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
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <Link
              to="/"
              className="text-[#8B3A4D] border-b-2 border-[#8B3A4D] pb-1"
            >
              Home
            </Link>
            <Link to="/about" className="hover:text-[#8B3A4D] transition">
              About Us
            </Link>
            {/* Menu Treatment dengan Sub-Bar Kategori: Face, Body, Hair, Wellness, All Treatment */}
            <div className="relative group py-6">
              <Link
                to="/treatments"
                className="hover:text-[#8B3A4D] transition inline-flex items-center gap-1"
              >
                <span>Treatment</span>
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full w-[560px] bg-white shadow-xl border border-gray-100 rounded-xl py-4 px-8 flex items-center justify-between text-xs font-medium normal-case tracking-normal text-gray-800 z-50">
                {['Face', 'Body', 'Hair', 'Wellness'].map((cat) => (
                  <Link
                    key={cat}
                    to={`/treatments?category=${cat}`}
                    className="hover:text-[#8B3A4D] font-semibold transition"
                  >
                    {cat}
                  </Link>
                ))}
                <Link
                  to="/treatments"
                  className="hover:text-[#8B3A4D] font-semibold transition"
                >
                  All Treatment
                </Link>
              </div>
            </div>
            {/* Navigates to Page 2: Products Page */}
            <Link
              to="/products"
              className="text-[#8B3A4D] bg-[#FDF2F2] px-3 py-1.5 rounded-full hover:bg-[#DA5B86] hover:text-white transition"
            >
              Products
            </Link>
          </nav>

          {/* CTA & Icons */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="lg:hidden text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-lg bg-[#FDF2F2] text-[#8B3A4D]"
            >
              Products
            </Link>
            <a
              href="#treatments"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-semibold tracking-widest uppercase transition shadow-sm"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section (Auto-Slide Reaktif 5 Detik — Ukuran Konten & Full Gambar Disesuaikan) */}
      <section className="bg-[#FDF2F2] overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative overflow-hidden h-[560px] sm:h-[580px] lg:h-[600px]">
          {/* Horizontal Sliding Track untuk Seluruh Slide */}
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${safeIndex * 100}%)` }}
          >
            {activeSlides.map((slide) => (
              <div key={slide.id} className="w-full h-full shrink-0">
                {slide.isFullImage ? (
                  /* SLIDE FULL GAMBAR SAJA (Disesuaikan dengan Ukuran Konten Hero) */
                  <div className="w-full h-full relative overflow-hidden bg-[#FDF2F2]">
                    <img
                      src={slide.image}
                      alt={slide.titleLine2 || 'HSK SECRET Slide'}
                      style={{
                        objectFit: slide.imageFit || 'cover',
                        objectPosition: slide.imagePosition || 'center',
                      }}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  /* SLIDE UTAMA: KONTEN TEKS KIRI + GAMBAR FULL KANAN TANPA CELAH */
                  <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                    {/* Left Content */}
                    <div className="lg:col-span-6 px-6 sm:px-12 py-8 lg:py-10 flex flex-col justify-between h-full">
                      <div className="space-y-4 my-auto">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8B3A4D]">
                          {slide.subtitle}
                        </p>
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.12] text-gray-900">
                          {slide.titleLine1} <br />
                          <span className="text-[#8B3A4D] font-normal">
                            {slide.titleLine2}
                          </span>
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
                          {slide.description}
                        </p>

                        {/* Hero Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          <Link
                            to="/treatments"
                            className="px-6 py-3.5 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-widest shadow-sm transition"
                          >
                            {slide.buttonPrimary || 'Book Your Appointment'}
                          </Link>
                          <button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="px-6 py-3.5 rounded-md border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-semibold uppercase tracking-widest transition"
                          >
                            {slide.buttonSecondary || 'Explore Products'}
                          </button>
                        </div>
                      </div>

                      {/* 4 Trust Badges */}
                      <div className="hidden sm:grid grid-cols-4 gap-3 pt-5 border-t border-[#8B3A4D]/15">
                        {[
                          {
                            icon: UserCheck,
                            title: 'EXPERT THERAPISTS',
                            sub: 'Highly trained & fully qualified',
                          },
                          {
                            icon: Award,
                            title: 'PREMIUM PRODUCTS',
                            sub: 'We use the highest quality products',
                          },
                          {
                            icon: ShieldCheck,
                            title: 'SAFE & HYGIENIC',
                            sub: 'Your safety and comfort are our priority',
                          },
                          {
                            icon: Heart,
                            title: 'CLIENT FOCUSED',
                            sub: 'Personalised care and amazing results',
                          },
                        ].map((badge) => {
                          const Icon = badge.icon;
                          return (
                            <div
                              key={badge.title}
                              className="text-center space-y-1"
                            >
                              <div className="w-8 h-8 mx-auto rounded-full bg-white text-[#8B3A4D] flex items-center justify-center shadow-sm">
                                <Icon className="w-4 h-4" />
                              </div>
                              <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">
                                {badge.title}
                              </h3>
                              <p className="text-[10px] text-gray-500 leading-tight">
                                {badge.sub}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Hero Image — Full Height Sesuai Ukuran Konten */}
                    <div className="hidden lg:block lg:col-span-6 relative h-full w-full overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.titleLine2}
                        style={{
                          objectFit: slide.imageFit || 'cover',
                          objectPosition: slide.imagePosition || 'center',
                        }}
                        className="w-full h-full"
                      />

                      {/* Circular Discount Badge */}
                      <div className="absolute bottom-8 right-8 sm:right-12 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#DA5B86]/95 text-white flex flex-col items-center justify-center text-center p-4 shadow-2xl border-2 border-white/40">
                        <span className="text-xs">✦</span>
                        <span className="text-[9px] tracking-[0.2em] uppercase mt-0.5">
                          {slide.discountTop || 'NEW CLIENTS'}
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-bold leading-tight my-0.5">
                          {slide.discountMain || content.clinicDiscountBadge}
                        </span>
                        <span className="text-[8px] tracking-[0.18em] uppercase text-[#FDF2F2]/90">
                          {slide.discountBottom || 'FIRST TREATMENT'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating Left/Right Arrows untuk Geser Slide */}
          {activeSlides.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-[#DA5B86] text-[#8B3A4D] hover:text-white flex items-center justify-center shadow-lg transition z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-[#DA5B86] text-[#8B3A4D] hover:text-white flex items-center justify-center shadow-lg transition z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Our Popular Treatments Section (Running / Marquee Style) */}
      <section id="treatments" className="py-16 sm:py-20 bg-[#F9FAFB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase text-gray-900">
              Our Popular Treatments
            </h2>
            <div className="w-16 h-0.5 bg-[#DA5B86] mx-auto mt-3" />
          </div>
        </div>

        {/* Infinite Running Track (Seperti Running Teks) */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Left & Right Soft Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10" />

          <div className="animate-marquee-treatments gap-6 px-3">
            {[...activeTreatments, ...activeTreatments].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => navigate(`/treatments/${item.id}`)}
                className="cursor-pointer w-60 sm:w-64 shrink-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col border border-gray-100 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-semibold">
                    {item.duration || '45 Menit'}
                  </span>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#DA5B86] text-white flex items-center justify-center shadow ring-4 ring-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-5 pt-7 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#8B3A4D] min-h-[32px] flex items-center justify-center transition">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Mulai{' '}
                      <span className="font-serif text-sm font-bold text-[#8B3A4D] block mt-0.5">
                        {item.price}
                      </span>
                    </p>
                    <Link
                      to={`/treatments/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-[#8B3A4D] border-b border-gray-300 hover:border-[#8B3A4D] pb-0.5 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/treatments"
            className="inline-block px-7 py-3 rounded-md bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-widest shadow-sm transition"
          >
            Lihat Semua &amp; Filter Treatment
          </Link>
        </div>
      </section>

      {/* About Us Split Section */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-[#DA5B86] text-white px-8 sm:px-14 py-16 flex flex-col justify-center space-y-5">
          <p className="font-serif italic text-lg text-[#F8E4E6]">
            {content.clinicAboutSubtitle}
          </p>
          <h2 className="font-serif text-3xl tracking-[0.15em] uppercase">
            {content.clinicAboutTitle}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {content.clinicAboutDescription}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 border border-white/60 hover:bg-white hover:text-[#DA5B86] text-[11px] font-semibold uppercase tracking-widest transition"
            >
              Explore Our Skincare Line
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 h-80 sm:h-[400px] relative">
          <img
            src={
              content.clinicAboutImage ||
              'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85'
            }
            alt="HSK SECRET Clinic Reception"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-8">
            <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-lg shadow">
              <p className="font-serif text-sm font-bold tracking-widest text-[#8B3A4D]">
                HSK SECRET CLINIC &amp; BOUTIQUE
              </p>
              <p className="text-[11px] text-gray-600">
                Luxury Aesthetic Lounge &amp; Skincare Sanctuary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Stats Strip */}
      <section className="bg-[#FDF2F2] py-10 border-y border-[#8B3A4D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {[
            { top: '20+', bottom: 'YEARS EXPERIENCE' },
            { top: '2000+', bottom: 'HAPPY CLIENTS' },
            { top: 'ADVANCED', bottom: 'TECHNOLOGY' },
            { top: '5 STAR', bottom: 'RATED ON GOOGLE' },
            { top: 'SAFE &', bottom: 'PROFESSIONAL' },
          ].map((stat) => (
            <div
              key={stat.bottom}
              className="flex items-center justify-center gap-3"
            >
              <Star className="w-6 h-6 text-[#8B3A4D] shrink-0" />
              <div className="text-left">
                <p className="font-serif text-lg font-bold text-[#8B3A4D] leading-none">
                  {stat.top}
                </p>
                <p className="text-[10px] font-semibold tracking-widest text-gray-600 uppercase mt-1">
                  {stat.bottom}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Maroon Footer */}
      <footer id="contact" className="bg-[#DA5B86] text-white/85 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white block">
                HSK SECRET
              </span>
              <span className="text-[9px] tracking-[0.28em] text-[#F8E4E6]/70 uppercase block mt-0.5">
                BEAUTY &amp; AESTHETICS
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Enhancing your natural beauty with advanced treatments and
              exceptional care.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DA5B86] flex items-center justify-center transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DA5B86] flex items-center justify-center transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DA5B86] flex items-center justify-center transition"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-[#F8E4E6] font-semibold hover:underline"
                >
                  Products (HSK SECRET Shop)
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">
                  Login Customer / Guest
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white">
                  Login Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              {activeTreatments.slice(0, 6).map((t) => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F8E4E6]" />
                <span>{content.clinicPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F8E4E6]" />
                <span>{content.clinicEmail}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F8E4E6] shrink-0 mt-0.5" />
                <span>{content.clinicAddress}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F8E4E6] shrink-0 mt-0.5" />
                <span>{content.clinicHours}</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Stay Connected */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Subscribe to get the latest offers and beauty tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-[#F8E4E6] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#DA5B86] hover:bg-[#C84873] text-[11px] font-semibold uppercase tracking-wider text-white transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© 2026 HSK SECRET Beauty &amp; Aesthetics. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms &amp; Conditions</span>
            <span className="ml-4 text-white/80 font-semibold">
              BCA · Mandiri · QRIS · VISA · Mastercard
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicHome;
