import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

const ADMIN_GMAIL = 'hsksecret.admin@gmail.com';
const ADMIN_PASS = 'hsksecret123';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_GMAIL);
  const [password, setPassword] = useState(ADMIN_PASS);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmails = [ADMIN_GMAIL, 'admin@hsksecret.com'];
    if (
      validEmails.includes(email.trim().toLowerCase()) &&
      password === ADMIN_PASS
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('adminEmail', email.trim());
      navigate('/admin/dashboard');
    } else {
      setError(
        `Email atau Password Admin salah! Gunakan Gmail: ${ADMIN_GMAIL} & Password: ${ADMIN_PASS}`
      );
    }
  };

  const handleAutoFill = () => {
    setEmail(ADMIN_GMAIL);
    setPassword(ADMIN_PASS);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#DA5B86] flex flex-col justify-center items-center px-4 py-10 font-sans">
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FDF2F2]/80 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Halaman Klinik
        </Link>
        <Link
          to="/login"
          className="text-xs font-semibold uppercase tracking-wider text-[#FDF2F2]/80 hover:text-white transition"
        >
          Ke Login Customer / Guest →
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10">
        {/* Brand Header Khusus Admin */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#DA5B86] text-white mb-4 shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-widest mb-2">
            KHUSUS ADMINISTRATOR
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-widest text-gray-900 uppercase">
            HSK SECRET
          </h1>
          <p className="text-xs uppercase tracking-[0.22em] text-[#8B3A4D] font-semibold mt-1">
            Admin CMS &amp; Inventory Portal
          </p>
        </div>

        {/* Info Box Gmail & Password Admin */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FDF2F2] border border-[#8B3A4D]/20 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[#8B3A4D] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Kredensial Login Admin
            </span>
            <button
              type="button"
              onClick={handleAutoFill}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DA5B86] text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-[#C84873] transition"
            >
              <CheckCircle2 className="w-3 h-3" />
              Isi Otomatis
            </button>
          </div>
          <div className="text-gray-700 space-y-1 pt-1 border-t border-[#8B3A4D]/10">
            <p>
              <span className="font-semibold text-gray-500">Gmail Admin:</span>{' '}
              <code className="font-mono font-bold text-[#8B3A4D]">
                {ADMIN_GMAIL}
              </code>
            </p>
            <p>
              <span className="font-semibold text-gray-500">Password:</span>{' '}
              <code className="font-mono font-bold text-[#8B3A4D]">
                {ADMIN_PASS}
              </code>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Form Login Admin */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2"
            >
              Email Admin (Gmail)
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="hsksecret.admin@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D] transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2"
            >
              Password Admin
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-[#F9FAFB] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 focus:border-[#8B3A4D] transition"
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
            className="w-full py-3.5 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-bold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition duration-200"
          >
            Login ke Dashboard Admin
          </button>
        </form>

        <div className="mt-7 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Halaman Khusus Admin · © 2026 HSK SECRET
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
