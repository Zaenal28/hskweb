import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';

/* Akun demo untuk mencoba login */
const DEMO_PHONE = '081234567890';
const DEMO_PASSWORD = 'password123';

/* Input dengan ikon di kiri (dipakai di form Masuk & Daftar) */
const Field = ({ label, icon: Icon, right, ...inputProps }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
    <span className="relative block">
      <Icon className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        {...inputProps}
        className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA5B86]/25 focus:border-[#DA5B86] transition"
      />
      {right}
    </span>
  </label>
);

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

  // Form Masuk (No. HP/WA & Password)
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form Daftar (No. HP/WA, Nama, Password)
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

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccessMsg('');
    setShowPassword(false);
  };

  // Masuk dengan Nomor HP / WA & Password
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

  // Daftar akun baru
  const handleCustomerRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!regPhone.trim() || !regName.trim() || !regPassword.trim()) {
      setError('Mohon lengkapi Nomor HP/WA, Nama, dan Password.');
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
    setSuccessMsg('Akun berhasil dibuat! Mengarahkan ke halaman produk...');
    setTimeout(() => navigate('/products'), 600);
  };

  // Masuk sebagai Tamu -> langsung ke halaman produk
  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/products');
  };

  const fillDemo = () => {
    setLoginPhone(DEMO_PHONE);
    setLoginPassword(DEMO_PASSWORD);
    setError('');
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#DA5B86] transition"
      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  const isLogin = activeTab === 'login';

  return (
    <div className="min-h-screen bg-[#FDF2F2] flex flex-col items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        {/* Kembali */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#DA5B86] mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Toko
        </Link>

        <div className="bg-white rounded-3xl shadow-[0_10px_40px_-12px_rgba(218,91,134,0.25)] p-7 sm:p-9">
          {/* Logo & Judul */}
          <div className="text-center mb-7">
            <img
              src="/hsk-logo.png"
              alt="HSK SECRET"
              className="h-12 w-auto object-contain mx-auto mb-5"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              {isLogin
                ? 'Masuk untuk melanjutkan belanja Anda'
                : 'Daftar gratis, cukup dengan nomor HP / WhatsApp'}
            </p>
          </div>

          {/* Sudah login */}
          {currentUser && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 text-sm text-emerald-800 flex items-center justify-between gap-3">
              <span>
                Anda masuk sebagai <strong>{currentUser.name}</strong>
              </span>
              <Link to="/products" className="font-semibold text-emerald-700 hover:underline shrink-0">
                Ke Toko →
              </Link>
            </div>
          )}

          {/* Tab Masuk / Daftar */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-gray-100 mb-6">
            {[
              { key: 'login', label: 'Masuk' },
              { key: 'register', label: 'Daftar' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => switchTab(t.key)}
                className={`py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === t.key
                    ? 'bg-white text-[#DA5B86] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Pesan error / sukses */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-sm text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ===== Form Masuk ===== */}
          {isLogin && (
            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <Field
                label="Nomor HP / WhatsApp"
                icon={Phone}
                type="tel"
                required
                value={loginPhone}
                onChange={(e) => {
                  setLoginPhone(e.target.value);
                  setError('');
                }}
                placeholder="08xxxxxxxxxx"
              />
              <Field
                label="Password"
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan password"
                right={passwordToggle}
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-semibold text-sm shadow-md shadow-[#DA5B86]/25 transition"
              >
                Masuk
              </button>

              <p className="text-center text-xs text-gray-400">
                Ingin mencoba?{' '}
                <button
                  type="button"
                  onClick={fillDemo}
                  className="font-semibold text-[#DA5B86] hover:underline"
                >
                  Gunakan akun demo
                </button>
              </p>
            </form>
          )}

          {/* ===== Form Daftar ===== */}
          {!isLogin && (
            <form onSubmit={handleCustomerRegister} className="space-y-4">
              <Field
                label="Nama Lengkap"
                icon={User}
                type="text"
                required
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                  setError('');
                }}
                placeholder="Nama Anda"
              />
              <Field
                label="Nomor HP / WhatsApp"
                icon={Phone}
                type="tel"
                required
                value={regPhone}
                onChange={(e) => {
                  setRegPhone(e.target.value);
                  setError('');
                }}
                placeholder="08xxxxxxxxxx"
              />
              <Field
                label="Password"
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                required
                value={regPassword}
                onChange={(e) => {
                  setRegPassword(e.target.value);
                  setError('');
                }}
                placeholder="Buat password"
                right={passwordToggle}
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-semibold text-sm shadow-md shadow-[#DA5B86]/25 transition"
              >
                Daftar Sekarang
              </button>
            </form>
          )}

          {/* Pemisah */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">atau</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Masuk sebagai Tamu */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3.5 rounded-xl border border-gray-200 hover:border-[#DA5B86] hover:bg-[#FDF2F2] text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-4 h-4 text-[#DA5B86]" />
            Belanja sebagai Tamu
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            Tanpa daftar, langsung lihat &amp; beli produk
          </p>

          {/* Ganti mode */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button
              type="button"
              onClick={() => switchTab(isLogin ? 'register' : 'login')}
              className="font-semibold text-[#DA5B86] hover:underline"
            >
              {isLogin ? 'Daftar' : 'Masuk'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 HSK SECRET Beauty
        </p>
      </div>
    </div>
  );
};

export default Login;
