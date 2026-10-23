import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Stethoscope,
  Package,
  Tags,
  Users,
  ShoppingBag,
  Truck,
  FileEdit,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const Dashboard = () => {
  const { treatments, categories, products, users, orders, shipments } =
    useStore();

  const totalStock = products.reduce(
    (sum, item) => sum + (Number(item.stock) || 0),
    0
  );
  const customerCount = users.filter(
    (u) => u.accountType === 'Customer'
  ).length;
  const guestCount = users.filter((u) => u.accountType === 'Guest').length;
  const activeShipments = shipments.filter(
    (s) => s.status !== 'Terkirim / Selesai'
  ).length;

  const summaryCards = [
    {
      title: 'Pembelian Produk',
      value: `${orders.length} Pesanan`,
      change: `${
        orders.filter((o) => o.paymentStatus === 'Paid').length
      } lunas · Siap proses`,
      icon: ShoppingBag,
      link: '/admin/orders',
    },
    {
      title: 'Pengiriman Barang',
      value: `${shipments.length} Resi`,
      change: `${activeShipments} sedang dikirim ke tujuan`,
      icon: Truck,
      link: '/admin/shipments',
    },
    {
      title: 'Akun Customer & Guest',
      value: `${users.length} Akun`,
      change: `${customerCount} Customer · ${guestCount} Guest`,
      icon: Users,
      link: '/admin/customers',
    },
    {
      title: 'Barang & Kategori',
      value: `${products.length} Produk`,
      change: `${categories.length} Kategori · ${totalStock} Stok`,
      icon: Package,
      link: '/admin/products',
    },
  ];

  const managementModules = [
    {
      title: '1. Kelola Content Web',
      desc: 'Ubah banner, teks hero, diskon 10% & 20%, serta info kontak di Halaman Klinik & Produk.',
      path: '/admin/content',
      badge: 'Klinik & Produk',
      icon: FileEdit,
    },
    {
      title: '2. Kelola Treatment Klinik',
      desc: 'Tambah, edit, atau hapus daftar layanan kecantikan di Halaman Klinik.',
      path: '/admin/treatments',
      badge: `${treatments.length} Layanan`,
      icon: Stethoscope,
    },
    {
      title: '3. Kelola Kategori Produk',
      desc: 'Atur kategori Skincare, Makeup, Haircare, dll. pada ikon bulat di Halaman Produk.',
      path: '/admin/categories',
      badge: `${categories.length} Kategori`,
      icon: Tags,
    },
    {
      title: '4. Kelola Data Barang',
      desc: 'Kelola stok gudang, kode SKU, harga, dan foto produk skincare HSK SECRET.',
      path: '/admin/products',
      badge: `${products.length} Barang`,
      icon: Package,
    },
    {
      title: '5. Kelola Customer & Guest',
      desc: 'Kelola akun member (Registered Customer) dan akun tamu checkout (Guest).',
      path: '/admin/customers',
      badge: `${customerCount} Cust · ${guestCount} Guest`,
      icon: Users,
    },
    {
      title: '6. Kelola Pembelian Produk',
      desc: 'Pantau invoice pembelian, metode pembayaran, dan status pesanan produk.',
      path: '/admin/orders',
      badge: `${orders.length} Invoice`,
      icon: ShoppingBag,
    },
    {
      title: '7. Kelola Pengiriman',
      desc: 'Input nomor resi (AWB), pilih kurir ekspedisi, dan lacak status pengiriman.',
      path: '/admin/shipments',
      badge: `${shipments.length} Pengiriman`,
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Page Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Pusat Kendali HSK SECRET (Klinik &amp; E-Commerce)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kelola konten web, treatment klinik, kategori, stok barang, akun
            Customer &amp; Guest, pembelian, hingga pengiriman.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl bg-white text-[#8B3A4D] border border-[#8B3A4D]/20 hover:bg-[#FDF2F2] transition"
          >
            <span>Lihat Web Klinik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl bg-[#DA5B86] text-white hover:bg-[#C84873] transition shadow-sm"
          >
            <span>Lihat Web Produk</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#8B3A4D]/30 transition-all block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {card.title}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="font-serif text-3xl font-bold text-gray-900 mt-4">
                {card.value}
              </p>
              <p className="text-xs text-[#8B3A4D] font-medium mt-2">
                {card.change}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Semua Modul Pengelolaan */}
      <div>
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
          Menu Pengelolaan Admin HSK SECRET
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {managementModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.path}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#FDF2F2] text-[#8B3A4D] text-[11px] font-bold">
                      {mod.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-gray-900">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <Link
                  to={mod.path}
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  <span>Buka Modul</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Pembelian & Pengiriman Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pembelian Terbaru */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Pembelian Produk Terbaru
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-[#8B3A4D] hover:underline"
            >
              Semua Pesanan →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.slice(0, 4).map((o) => (
              <div
                key={o.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-serif text-sm font-bold text-gray-900">
                    {o.customerName}{' '}
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#8B3A4D] ml-1">
                      {o.accountType}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {o.invoice} · {o.itemsSummary}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm text-gray-900">
                    {o.totalAmount}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    {o.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Pengiriman Terbaru */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Status Pengiriman Barang
            </h3>
            <Link
              to="/admin/shipments"
              className="text-xs font-semibold text-[#8B3A4D] hover:underline"
            >
              Semua Pengiriman →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {shipments.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-mono text-xs font-bold text-[#8B3A4D]">
                    {s.trackingNumber}{' '}
                    <span className="font-sans font-normal text-gray-400">
                      ({s.courier})
                    </span>
                  </p>
                  <p className="text-xs font-semibold text-gray-800">
                    {s.recipientName} —{' '}
                    <span className="font-normal text-gray-500">
                      {s.address}
                    </span>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FDF2F2] text-[#8B3A4D] shrink-0">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
