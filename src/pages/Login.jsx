import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Lock,
  Phone,
  User,
  Sparkles,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  UserPlus,
  LogIn,
  UserCheck,
  ShoppingBag,
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    loginCustomerByPhone,
    registerCustomerByPhone,
    loginAsGuest,
    currentUser,
  } = useStore();

  const initialMode = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'register'

  // State Form Login Customer (No Telpon/WA & Password)
  const [loginPhone, setLoginPhone] = useState('081234567890');
  const [loginPassword, setLoginPassword] = useState('password123');

  // State Form Daftar Akun Baru (No Telpon/WA, Nama, Password)
  const [regPhone, setRegPhone] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['login', 'register'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Handler 1: Login Customer dengan Nomor Telepon / WA & Password
  const handleCustomerLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = loginCustomerByPhone({
      phone: loginPhone,
      password: loginPassword,
    });
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate('/products');
  };

  // Handler 2: Daftar Akun dengan No Telpon/WA, Nama, dan Password
  const handleCustomerRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!regPhone.trim() || !regName.trim() || !regPassword.trim()) {
      setError('Mohon lengkapi Nomor Telepon/WA, Nama, dan Password.');
      return;
    }

    const res = registerCustomerByPhone({
      phone: regPhone,
      name: regName,
      password: regPassword,
    });

    if (!res.success) {
      setError(res.message);
      return;
    }

    setSuccessMsg(
      'Pendaftaran akun berhasil! Mengarahkan ke Halaman Utama Produk...'
    );
    setTimeout(() => {
      navigate('/products');
    }, 600);
  };

  // Handler 3: Login Sebagai Guest / Tamu -> Langsung ke Halaman Utama Produk (/products)
  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-[#FDF2F2] flex flex-col justify-center items-center px-4 py-10 font-sans">
      <div className="w-full max-w-lg mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B3A4D] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Halaman Klinik
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B3A4D] hover:underline"
        >
          <ShoppingBag className="w-4 h-4" />
          Halaman Utama Produk
        </Link>
      </div>

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-[#8B3A4D]/10 p-6 sm:p-9">
        {/* Brand Header Khusus Customer & Guest */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-14 w-auto object-contain"
            />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-widest mb-1">
            HALAMAN KHUSUS CUSTOMER &amp; GUEST
          </span>
          <p className="text-xs uppercase tracking-[0.22em] text-gray-400 mt-1">
            Login Customer · Daftar Akun · Guest / Tamu
          </p>
        </div>

        {/* Status Sesi Aktif (Jika Sudah Login) */}
        {currentUser && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
            <div>
              <span className="font-bold block">
                Aktif sebagai: {currentUser.name} ({currentUser.accountType})
              </span>
              {currentUser.phone && (
                <span className="text-[11px] text-emerald-600">
                  No. WA: {currentUser.phone}
                </span>
              )}
            </div>
            <Link
              to="/products"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold uppercase tracking-wider text-[10px] hover:bg-emerald-700 transition"
            >
              Ke Produk →
            </Link>
          </div>
        )}

        {/* Pilihan Tab: 1. Login | 2. Daftar | 3. Login Guest / Tamu */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#F9FAFB] border border-gray-200/80 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'login'
                ? 'bg-[#DA5B86] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#8B3A4D]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'register'
                ? 'bg-[#DA5B86] text-white shadow-sm'
                : 'text-gray-600 hover:text-[#8B3A4D]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Daftar</span>
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white border border-[#8B3A4D]/20 transition"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Guest / Tamu</span>
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ==================== TAB 1: HALAMAN LOGIN CUSTOMER (NO TELPON/WA & PASSWORD) ==================== */}
        {activeTab === 'login' && (
          <div className="space-y-5">
            <div className="p-3.5 rounded-xl bg-[#FDF2F2] border border-[#8B3A4D]/20 text-xs flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-[#8B3A4D] block">
                  Akun Demo Pelanggan:
                </span>
                <span className="text-gray-600">
                  No. WA: <strong>081234567890</strong> · Pass:{' '}
                  <strong>password123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginPhone('081234567890');
                  setLoginPassword('password123');
                  setError('');
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#DA5B86] text-white text-[10px] font-bold uppercase tracking-wider shrink-0"
              >
                Isi Otomatis
              </button>
            </div>

            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  No. Telpon / WhatsApp (WA)
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginPhone}
                    onChange={(e) => {
                      setLoginPhone(e.target.value);
                      setError('');
                    }}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Masukkan password Anda"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B3A4D]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-bold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition"
              >
                Login Customer Sekarang
              </button>
            </form>

            <div className="text-center text-xs text-gray-500">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="font-bold text-[#8B3A4D] hover:underline"
              >
                Daftar dengan Nomor Telepon / WA
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: HALAMAN DAFTAR AKUN (NO TELPON/WA, NAMA, PASSWORD) ==================== */}
        {activeTab === 'register' && (
          <form onSubmit={handleCustomerRegister} className="space-y-4">
            <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#8B3A4D]/15 text-xs text-[#8B3A4D]">
              Daftar akun menggunakan <strong>No. Telpon / WA</strong>,{' '}
              <strong>Nama</strong>, dan <strong>Password</strong> untuk mulai
              berbelanja produk HSK SECRET.
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                No. Telpon / WhatsApp (WA) *
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => {
                    setRegPhone(e.target.value);
                    setError('');
                  }}
                  placeholder="Contoh: 0812-8899-0011"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Nama Lengkap *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => {
                    setRegName(e.target.value);
                    setError('');
                  }}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Buat password akun Anda"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B3A4D]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-bold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition"
            >
              Daftar Akun Sekarang
            </button>

            <div className="text-center text-xs text-gray-500">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="font-bold text-[#8B3A4D] hover:underline"
              >
                Login di sini
              </button>
            </div>
          </form>
        )}

        {/* ==================== TOMBOL BESAR: LOGIN SEBAGAI GUEST / TAMU ==================== */}
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3.5 px-5 rounded-xl border-2 border-[#8B3A4D] bg-[#FDF2F2]/70 hover:bg-[#DA5B86] text-[#8B3A4D] hover:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-sm"
          >
            <UserCheck className="w-4 h-4" />
            <span>Login sebagai Guest / Tamu (Langsung ke Produk)</span>
          </button>

          <div className="pt-2 text-center text-[11px] text-gray-400">
            <span>© 2026 HSK SECRET Beauty · Khusus Pelanggan &amp; Tamu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
