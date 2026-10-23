import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  User,
  Phone,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  Truck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Home,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    recipientAddresses,
    saveProfileAndRecipient,
    setPrimaryRecipientAddress,
    deleteRecipientAddress,
    logoutCustomer,
    cartTotalItems,
    orders,
    shipments,
  } = useStore();

  const primaryAddr =
    recipientAddresses.find((a) => a.isPrimary) || recipientAddresses[0];

  const [accountType, setAccountType] = useState(
    currentUser?.accountType || primaryAddr?.accountType || 'Guest'
  );
  const [label, setLabel] = useState('Alamat Rumah Utama');
  const [recipientName, setRecipientName] = useState(
    currentUser?.name && currentUser.name !== 'Tamu / Guest HSK'
      ? currentUser.name
      : primaryAddr?.recipientName || ''
  );
  const [phone, setPhone] = useState(
    currentUser?.phone || primaryAddr?.phone || ''
  );
  const [address, setAddress] = useState(
    currentUser?.address || primaryAddr?.address || ''
  );
  const [city, setCity] = useState(
    currentUser?.city || primaryAddr?.city || ''
  );
  const [postalCode, setPostalCode] = useState(
    currentUser?.postalCode || primaryAddr?.postalCode || ''
  );
  const [notes, setNotes] = useState(
    currentUser?.notes || primaryAddr?.notes || ''
  );
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [savedToast, setSavedToast] = useState(false);

  const handleSaveRecipient = (e) => {
    e.preventDefault();
    saveProfileAndRecipient({
      accountType,
      label,
      recipientName,
      phone,
      address,
      city,
      postalCode,
      notes,
      editingAddressId,
    });
    setEditingAddressId(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  const handleSaveAndGoCheckout = () => {
    if (!recipientName.trim() || !phone.trim() || !address.trim()) return;
    saveProfileAndRecipient({
      accountType,
      label,
      recipientName,
      phone,
      address,
      city,
      postalCode,
      notes,
      editingAddressId,
    });
    navigate('/checkout');
  };

  const handleEditCard = (addr) => {
    setEditingAddressId(addr.id);
    setAccountType(addr.accountType || 'Guest');
    setLabel(addr.label || 'Alamat Pengiriman');
    setRecipientName(addr.recipientName || '');
    setPhone(addr.phone || '');
    setAddress(addr.address || '');
    setCity(addr.city || '');
    setPostalCode(addr.postalCode || '');
    setNotes(addr.notes || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewBlank = () => {
    setEditingAddressId(null);
    setLabel('Alamat Penerima Baru');
    setRecipientName('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      {/* Top Bar */}
      <div className="bg-[#F8E4E6] text-[#8B3A4D] text-[11px] font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>
            ✦ Halaman Profile Customer &amp; Guest — Pengaturan Data Penerima,
            Alamat &amp; No. Telepon
          </span>
          <span className="font-semibold">HSK SECRET Beauty &amp; Shop</span>
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
              to="/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D] whitespace-nowrap transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Produk</span>
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold whitespace-nowrap transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Keranjang ({cartTotalItems})</span>
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#DA5B86] hover:bg-[#C84873] text-white text-[11px] font-semibold whitespace-nowrap transition"
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Banner Info Profile Customer / Guest */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#DA5B86] text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md shrink-0">
              {(recipientName || currentUser?.name || 'G')
                .charAt(0)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-gray-900">
                  {recipientName ||
                    currentUser?.name ||
                    'Profile Pembeli (Customer / Guest)'}
                </h1>
                <span className="px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-widest">
                  Mode: {accountType}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Kelola data penerima barang pembelian, nomor telepon/WhatsApp,
                serta alamat pengiriman untuk kemudahan transaksi Anda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddNewBlank}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#FDF2F2] text-xs font-bold uppercase tracking-wider transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Penerima Baru</span>
            </button>
            {currentUser && (
              <button
                type="button"
                onClick={() => {
                  logoutCustomer();
                  navigate('/login');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 text-xs font-semibold transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            )}
          </div>
        </div>

        {savedToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Data Penerima, Alamat &amp; Nomor Telepon</strong>{' '}
                berhasil disimpan ke Profile dan siap digunakan saat Checkout!
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition"
            >
              Lanjut ke Checkout →
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI (7 COL): FORM TAMBAH / EDIT DATA PENERIMA BARANG, ALAMAT & NO TELPON */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-gray-900">
                    {editingAddressId
                      ? 'Edit Data Penerima Barang & Alamat'
                      : 'Input Data Penerima Barang, Alamat & No. Telpon'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Dapat diisi baik oleh pemilik akun{' '}
                    <strong>Customer</strong> maupun <strong>Guest/Tamu</strong>
                    .
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveRecipient} className="space-y-4">
              {/* Pilihan Status Pembeli (Customer / Guest) & Label Alamat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Status Akun Pembeli
                  </label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-bold text-[#8B3A4D] focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Customer">Customer (Pelanggan Terdaftar)</option>
                    <option value="Guest">Guest / Tamu (Belanja Tanpa Akun)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Label Alamat Pengiriman
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Contoh: Alamat Rumah / Kantor / Apartemen"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                    />
                  </div>
                </div>
              </div>

              {/* Nama Penerima & No Telpon / WA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Nama Lengkap Penerima Barang *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nama penerima paket pembelian"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    No. Telpon / WhatsApp (WA) Penerima *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 0812-3456-7890"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat Lengkap Pengiriman */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Alamat Lengkap Penerima Barang (Jalan, No. Rumah, RT/RW,
                  Kecamatan) *
                </label>
                <textarea
                  rows="3"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Contoh: Jl. Senopati Raya No. 45, RT 04/RW 02, Kel. Senayan, Kec. Kebayoran Baru"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              {/* Kota/Provinsi & Kode Pos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kota / Kabupaten &amp; Provinsi *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kode Pos *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Contoh: 12190"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>

              {/* Patokan / Catatan Kurir */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Patokan Alamat / Catatan Kurir (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Rumah pagar putih, hubungi WA sebelum sampai"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              {/* Tombol Simpan & Lanjut Checkout */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-widest shadow-md transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {editingAddressId
                      ? 'Update Data Penerima'
                      : 'Simpan Data Penerima & Alamat'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAndGoCheckout}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  <span>Simpan &amp; Lanjut ke Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* KOLOM KANAN (5 COL): DAFTAR BUKU ALAMAT PENERIMA TERSIMPAN & RIWAYAT PESANAN */}
          <div className="lg:col-span-5 space-y-6">
            {/* Daftar Buku Alamat Penerima */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Daftar Alamat Penerima Tersimpan ({recipientAddresses.length})
                </h3>
                <Sparkles className="w-4 h-4 text-[#8B3A4D]" />
              </div>

              <div className="space-y-3">
                {recipientAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border transition ${
                      addr.isPrimary
                        ? 'border-2 border-[#8B3A4D] bg-[#FDF2F2]/60 shadow-sm'
                        : 'border-gray-200 bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold text-[#8B3A4D] uppercase tracking-wider">
                            {addr.label}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-semibold text-gray-600">
                            {addr.accountType || 'Customer'}
                          </span>
                          {addr.isPrimary && (
                            <span className="px-2 py-0.5 rounded-full bg-[#DA5B86] text-white text-[10px] font-bold">
                              Utama (Aktif di Checkout)
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-sm text-gray-900 mt-1.5">
                          {addr.recipientName}
                        </p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">
                          No. Telp / WA: {addr.phone}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {addr.address}, {addr.city}{' '}
                          {addr.postalCode ? `(${addr.postalCode})` : ''}
                        </p>
                        {addr.notes && (
                          <p className="text-[11px] text-gray-500 italic mt-1">
                            Catatan: {addr.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-2">
                      {!addr.isPrimary ? (
                        <button
                          type="button"
                          onClick={() => setPrimaryRecipientAddress(addr.id)}
                          className="text-[11px] font-bold text-[#8B3A4D] hover:underline"
                        >
                          ✓ Gunakan untuk Checkout
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-700">
                          ✓ Digunakan otomatis saat Checkout
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditCard(addr)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D]"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        {recipientAddresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteRecipientAddress(addr.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Singkat Pengiriman & Pembelian */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B3A4D]" />
                  <span>Status Pengiriman Pembelian Terbaru</span>
                </h3>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {shipments.slice(0, 3).map((ship) => (
                  <div
                    key={ship.id}
                    className="p-3.5 rounded-2xl border border-gray-100 bg-[#F9FAFB] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#8B3A4D]">
                        {ship.trackingNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold">
                        {ship.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">
                      Penerima: {ship.recipientName}
                    </p>
                    <p className="text-gray-500">
                      Kurir: {ship.courier} ({ship.shippingCost})
                    </p>
                    <p className="text-gray-500 truncate">
                      Tujuan: {ship.address}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#8B3A4D] shrink-0" />
                <span>
                  Data penerima yang Anda simpan otomatis terisi di halaman
                  Checkout Pembelian.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
