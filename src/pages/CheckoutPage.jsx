import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, parseRupiah, formatRupiah } from '../context/StoreContext';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  User,
  Phone,
  ShoppingBag,
  Sparkles,
  FileText,
  QrCode,
  Building2,
  Wallet,
} from 'lucide-react';

const shippingOptions = [
  {
    id: 'jne-reg',
    name: 'JNE Reguler',
    desc: 'Estimasi tiba 2 – 3 hari kerja',
    cost: 20000,
    etaDays: 3,
  },
  {
    id: 'jnt-exp',
    name: 'J&T Express',
    desc: 'Estimasi tiba 2 – 3 hari kerja',
    cost: 22000,
    etaDays: 2,
  },
  {
    id: 'sicepat-best',
    name: 'SiCepat BEST',
    desc: 'Besok Sampai Tujuan (1 – 2 hari)',
    cost: 25000,
    etaDays: 2,
  },
  {
    id: 'jne-yes',
    name: 'JNE YES (Yakin Esok Sampai)',
    desc: 'Prioritas 1 hari sampai',
    cost: 35000,
    etaDays: 1,
  },
  {
    id: 'instant-courier',
    name: 'Instant Courier (GoSend / GrabExpress)',
    desc: 'Pengiriman instan 2 – 4 jam hari ini',
    cost: 45000,
    etaDays: 0,
  },
  {
    id: 'free-ongkir',
    name: 'Promo Gratis Ongkir HSK SECRET',
    desc: 'Khusus pembelian minimal Rp 500.000',
    cost: 0,
    etaDays: 3,
    minSubtotal: 500000,
  },
];

const paymentMethods = [
  {
    id: 'qris',
    name: 'QRIS Instant (GoPay, OVO, DANA, ShopeePay, m-Banking)',
    badge: 'Verifikasi Otomatis',
    icon: QrCode,
    accountInfo: 'Scan QRIS HSK SECRET Official Merchant',
  },
  {
    id: 'bca-va',
    name: 'BCA Virtual Account',
    badge: 'Dicek Otomatis',
    icon: Building2,
    accountInfo: 'No. VA BCA: 8801 0812 3456 7890 (a/n HSK SECRET)',
  },
  {
    id: 'mandiri-va',
    name: 'Mandiri Virtual Account',
    badge: 'Dicek Otomatis',
    icon: Building2,
    accountInfo: 'No. VA Mandiri: 8902 0812 3456 7890 (a/n HSK SECRET)',
  },
  {
    id: 'bni-bri-va',
    name: 'BNI / BRI Virtual Account',
    badge: 'Dicek Otomatis',
    icon: Building2,
    accountInfo: 'No. VA BNI/BRI: 8810 0812 3456 7890 (a/n HSK SECRET)',
  },
  {
    id: 'transfer-bca',
    name: 'Transfer Bank BCA Manual',
    badge: 'Transfer Bank',
    icon: CreditCard,
    accountInfo: 'Rekening BCA: 5420-8899-11 a/n PT HSK SECRET BEAUTY',
  },
  {
    id: 'cod',
    name: 'COD (Bayar di Tempat saat Barang Sampai)',
    badge: 'Bayar ke Kurir',
    icon: Wallet,
    accountInfo: 'Siapkan uang pas saat kurir mengantarkan paket Anda',
  },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartTotalItems,
    cartSubtotal,
    currentUser,
    recipientAddresses,
    createOrderTransaction,
  } = useStore();

  const primaryAddr =
    recipientAddresses.find((a) => a.isPrimary) || recipientAddresses[0];

  // State Input Data Pembeli & Alamat (Otomatis Terisi dari Profile Customer/Guest)
  const [buyerName, setBuyerName] = useState(
    currentUser?.name && currentUser.name !== 'Tamu / Guest HSK'
      ? currentUser.name
      : primaryAddr?.recipientName || ''
  );
  const [buyerPhone, setBuyerPhone] = useState(
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

  const handleSelectSavedAddress = (addr) => {
    setBuyerName(addr.recipientName || '');
    setBuyerPhone(addr.phone || '');
    setAddress(addr.address || '');
    setCity(addr.city || '');
    setPostalCode(addr.postalCode || '');
    setNotes(addr.notes || '');
  };

  // State Pilihan Ongkir Pengiriman
  const [selectedShippingId, setSelectedShippingId] = useState(
    cartSubtotal >= 500000 ? 'free-ongkir' : 'jne-reg'
  );

  // State Pilihan Metode Pembayaran
  const [selectedPaymentId, setSelectedPaymentId] = useState('qris');

  // State Bukti Transaksi Selesai
  const [completedReceipt, setCompletedReceipt] = useState(null);

  const selectedShipping =
    shippingOptions.find((s) => s.id === selectedShippingId) ||
    shippingOptions[0];
  const selectedPayment =
    paymentMethods.find((p) => p.id === selectedPaymentId) || paymentMethods[0];

  const shippingCostNum = selectedShipping.cost;
  const grandTotalNum = cartSubtotal + shippingCostNum;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + (selectedShipping.etaDays || 2));
    const estimatedDays = etaDate.toISOString().slice(0, 10);

    const receipt = createOrderTransaction({
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: notes.trim(),
      courierName: selectedShipping.name,
      shippingCostNum,
      estimatedDays,
      paymentMethod: selectedPayment.name,
    });

    setCompletedReceipt({
      ...receipt,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: notes.trim(),
      paymentInfo: selectedPayment,
      shippingInfo: selectedShipping,
      grandTotalFormatted: formatRupiah(grandTotalNum),
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
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

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Keranjang</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {completedReceipt ? (
          /* ==================== BUKTI TRANSAKSI / INVOICE BERHASIL ==================== */
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-[#DA5B86] text-white p-8 text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/15 text-white flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#FDF2F2]/80 font-bold">
                TRANSAKSI PEMBELIAN BERHASIL
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Terima Kasih Atas Pesanan Anda!
              </h1>
              <p className="text-xs text-[#FDF2F2]/90 max-w-md mx-auto">
                Pesanan Anda telah tercatat di sistem HSK SECRET dan sedang
                diproses untuk pengiriman.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Info Invoice & Nomor Resi */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FDF2F2] border border-[#8B3A4D]/15">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block">
                    Nomor Invoice
                  </span>
                  <span className="font-mono text-sm font-bold text-[#8B3A4D]">
                    {completedReceipt.order.invoice}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block">
                    Nomor Resi Pengiriman
                  </span>
                  <span className="font-mono text-sm font-bold text-gray-900">
                    {completedReceipt.shipment.trackingNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block">
                    Status Pembayaran
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                    {completedReceipt.order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Detail Pembeli, Alamat, Kurir & Pembayaran */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="p-4 rounded-2xl border border-gray-100 bg-[#F9FAFB] space-y-1.5">
                  <p className="font-bold uppercase tracking-wider text-[#8B3A4D] mb-1">
                    Data Pembeli &amp; Alamat Pengiriman
                  </p>
                  <p className="font-bold text-sm text-gray-900">
                    {completedReceipt.buyerName}
                  </p>
                  <p className="text-gray-600">
                    No. Telp / WA: <strong>{completedReceipt.buyerPhone}</strong>
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Alamat: {completedReceipt.shipment.address}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-100 bg-[#F9FAFB] space-y-1.5">
                  <p className="font-bold uppercase tracking-wider text-[#8B3A4D] mb-1">
                    Ekspedisi Ongkir &amp; Metode Pembayaran
                  </p>
                  <p className="text-gray-700">
                    Kurir: <strong>{completedReceipt.shipment.courier}</strong>{' '}
                    ({completedReceipt.order.shippingCost})
                  </p>
                  <p className="text-gray-700">
                    Metode Bayar:{' '}
                    <strong>{completedReceipt.order.paymentMethod}</strong>
                  </p>
                  <p className="text-gray-500 text-[11px] pt-1">
                    {completedReceipt.paymentInfo.accountInfo}
                  </p>
                </div>
              </div>

              {/* Rincian Barang yang Dibeli */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8B3A4D]" />
                  <span>Rincian Barang yang Dibeli</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {completedReceipt.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-gray-500">
                            {item.qty} x {item.price}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        {formatRupiah(parseRupiah(item.price) * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#FDF2F2] px-5 py-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Total Pembayaran (Termasuk Ongkir)
                  </span>
                  <span className="font-serif text-xl font-bold text-[#8B3A4D]">
                    {completedReceipt.grandTotalFormatted}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-bold uppercase tracking-widest shadow-md transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Kembali ke Halaman Utama Produk</span>
                </Link>
                <Link
                  to="/"
                  className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#8B3A4D] hover:text-[#8B3A4D] transition"
                >
                  Ke Halaman Klinik
                </Link>
              </div>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#8B3A4D] mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Keranjang Belanja Kosong
            </h2>
            <p className="text-xs text-gray-500">
              Silakan pilih produk terlebih dahulu di halaman Produk sebelum
              melakukan checkout.
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 rounded-xl bg-[#DA5B86] text-white text-xs font-bold uppercase tracking-widest"
            >
              Ke Halaman Produk
            </Link>
          </div>
        ) : (
          /* ==================== FORM TRANSAKSI, ONGKIR & METODE PEMBAYARAN ==================== */
          <div>
            {/* Stepper Progress */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-bold uppercase tracking-wider">
              <Link
                to="/cart"
                className="flex items-center gap-2 text-emerald-600 hover:underline"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  ✓
                </span>
                <span>1. Keranjang Belanja</span>
              </Link>
              <div className="w-8 sm:w-16 h-0.5 bg-[#DA5B86]" />
              <div className="flex items-center gap-2 text-[#8B3A4D]">
                <span className="w-7 h-7 rounded-full bg-[#DA5B86] text-white flex items-center justify-center">
                  2
                </span>
                <span>2. Transaksi, Ongkir &amp; Metode Pembayaran</span>
              </div>
            </div>

            <form
              onSubmit={handleCheckoutSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Kolom Kiri (8 Col): Input Data Pembeli + Pilih Ongkir + Pilih Metode Pembayaran */}
              <div className="lg:col-span-8 space-y-6">
                {/* BAGIAN 1: INPUT DATA PEMBELI & ALAMAT PENGIRIMAN */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                          1. Input Data Pembeli &amp; Alamat Pengiriman
                        </h2>
                        <p className="text-xs text-gray-500">
                          Lengkapi nama penerima, nomor WhatsApp, dan alamat
                          lengkap pengiriman paket.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                      <span className="px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[10px] font-bold uppercase tracking-wider">
                        Mode:{' '}
                        {currentUser?.accountType === 'Customer'
                          ? `Customer (${currentUser.name})`
                          : 'Guest / Tamu'}
                      </span>
                      <Link
                        to="/profile"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#DA5B86] hover:bg-[#C84873] text-white text-[10px] font-bold uppercase tracking-wider transition"
                      >
                        <User className="w-3 h-3" />
                        <span>Kelola di Profile</span>
                      </Link>
                    </div>
                  </div>

                  {/* Pilihan Cepat dari Data Penerima Tersimpan di Profile */}
                  {recipientAddresses.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-[#FDF2F2]/70 border border-[#8B3A4D]/15 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#8B3A4D]">
                          Pilih Data Penerima dari Profile:
                        </span>
                        <Link
                          to="/profile"
                          className="text-[11px] font-bold text-[#8B3A4D] hover:underline"
                        >
                          + Tambah / Ubah di Profile →
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recipientAddresses.map((addr) => (
                          <button
                            key={addr.id}
                            type="button"
                            onClick={() => handleSelectSavedAddress(addr)}
                            className="px-3 py-1.5 rounded-xl bg-white border border-[#8B3A4D]/25 hover:border-[#8B3A4D] text-left text-xs transition shadow-sm"
                          >
                            <span className="font-bold text-gray-900 block">
                              {addr.recipientName} ({addr.label})
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {addr.phone} · {addr.city}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Nama Lengkap Pembeli / Penerima *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Masukkan nama lengkap penerima"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        No. Telepon / WhatsApp (WA) Aktif *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          placeholder="Contoh: 0812-3456-7890"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Alamat Lengkap Pengiriman (Jalan, No. Rumah, RT/RW,
                        Kecamatan) *
                      </label>
                      <textarea
                        rows="2"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Contoh: Jl. Senopati Raya No. 45, RT 04/RW 02, Kel. Senayan, Kec. Kebayoran Baru"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                      />
                    </div>

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

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Catatan untuk Kurir (Opsional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Contoh: Rumah pagar putih, titip di pos satpam jika sedang keluar"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                      />
                    </div>
                  </div>
                </div>

                {/* BAGIAN 2: MEMILIH ONGKIR PENGIRIMAN */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                        2. Pilih Ongkir &amp; Kurir Pengiriman
                      </h2>
                      <p className="text-xs text-gray-500">
                        Pilih layanan ekspedisi dan ongkos kirim yang sesuai
                        dengan kebutuhan Anda.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {shippingOptions.map((option) => {
                      const isDisabled =
                        option.minSubtotal && cartSubtotal < option.minSubtotal;
                      const isSelected = selectedShippingId === option.id;

                      return (
                        <label
                          key={option.id}
                          className={`relative rounded-2xl border p-4 flex items-start justify-between gap-3 transition ${
                            isDisabled
                              ? 'opacity-50 bg-gray-50 border-gray-200 cursor-not-allowed'
                              : isSelected
                              ? 'border-2 border-[#8B3A4D] bg-[#FDF2F2]/60 cursor-pointer shadow-sm'
                              : 'border-gray-200 bg-white hover:border-[#8B3A4D]/40 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="shippingOption"
                              disabled={isDisabled}
                              checked={isSelected}
                              onChange={() => setSelectedShippingId(option.id)}
                              className="mt-1 accent-[#8B3A4D]"
                            />
                            <div>
                              <p className="text-xs font-bold text-gray-900">
                                {option.name}
                              </p>
                              <p className="text-[11px] text-gray-500 mt-0.5">
                                {option.desc}
                              </p>
                            </div>
                          </div>

                          <span className="font-serif text-xs sm:text-sm font-bold text-[#8B3A4D] shrink-0">
                            {option.cost === 0
                              ? 'Rp 0 (Gratis)'
                              : formatRupiah(option.cost)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* BAGIAN 3: CHECKOUT MEMILIH METODE PEMBAYARAN */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                        3. Pilih Metode Pembayaran
                      </h2>
                      <p className="text-xs text-gray-500">
                        Pilih metode pembayaran yang paling mudah dan nyaman
                        untuk transaksi Anda.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedPaymentId === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`rounded-2xl border p-4 flex flex-col justify-between gap-2 cursor-pointer transition ${
                            isSelected
                              ? 'border-2 border-[#8B3A4D] bg-[#FDF2F2]/60 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-[#8B3A4D]/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <input
                                type="radio"
                                name="paymentMethod"
                                checked={isSelected}
                                onChange={() => setSelectedPaymentId(method.id)}
                                className="mt-1 accent-[#8B3A4D]"
                              />
                              <div>
                                <p className="text-xs font-bold text-gray-900">
                                  {method.name}
                                </p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white text-[#8B3A4D] border border-[#8B3A4D]/20 text-[10px] font-semibold">
                                  {method.badge}
                                </span>
                              </div>
                            </div>
                            <Icon className="w-4 h-4 text-[#8B3A4D] shrink-0" />
                          </div>

                          {isSelected && (
                            <div className="mt-2 pt-2 border-t border-[#8B3A4D]/15 text-[11px] text-gray-600 font-medium">
                              {method.accountInfo}
                            </div>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan (4 Col): Ringkasan Pesanan & Tombol Checkout */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-7 space-y-5 sticky top-28">
                <h2 className="font-serif text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Ringkasan Transaksi
                </h2>

                {/* Daftar Singkat Barang */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover shrink-0 bg-[#FDF2F2]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-gray-400">
                            {item.qty} x {item.price}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 shrink-0">
                        {formatRupiah(parseRupiah(item.price) * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Kalkulasi Harga + Ongkir */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal Barang ({cartTotalItems} Pcs)</span>
                    <span className="font-semibold text-gray-900">
                      {formatRupiah(cartSubtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Ongkir ({selectedShipping.name})</span>
                    <span className="font-semibold text-[#8B3A4D]">
                      {shippingCostNum === 0
                        ? 'Rp 0 (Gratis)'
                        : formatRupiah(shippingCostNum)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Metode Pembayaran</span>
                    <span className="font-semibold text-gray-900 text-right max-w-[160px] truncate">
                      {selectedPayment.name}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      Total Pembayaran
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#8B3A4D]">
                      {formatRupiah(grandTotalNum)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Checkout &amp; Bayar Sekarang</span>
                </button>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-2.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-[#8B3A4D] shrink-0" />
                  <span>
                    Pesanan otomatis terhubung ke sistem Pengiriman &amp;
                    Invoice Resmi HSK SECRET.
                  </span>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
