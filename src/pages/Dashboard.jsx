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
  Images,
  Zap,
  Building2,
  ArrowRight,
} from 'lucide-react';

const Dashboard = () => {
  const { treatments, categories, products, users, orders, shipments, clinics } =
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
  const paidOrders = orders.filter((o) => o.paymentStatus === 'Paid').length;

  const stats = [
    {
      label: 'Pesanan',
      value: orders.length,
      sub: `${paidOrders} lunas`,
      icon: ShoppingBag,
      link: '/admin/orders',
    },
    {
      label: 'Pengiriman',
      value: shipments.length,
      sub: `${activeShipments} dikirim`,
      icon: Truck,
      link: '/admin/shipments',
    },
    {
      label: 'Akun',
      value: users.length,
      sub: `${customerCount} cust · ${guestCount} guest`,
      icon: Users,
      link: '/admin/customers',
    },
    {
      label: 'Produk',
      value: products.length,
      sub: `${categories.length} kategori · ${totalStock} stok`,
      icon: Package,
      link: '/admin/products',
    },
  ];

  const quickLinks = [
    { title: 'Konten Web', badge: 'Klinik & Produk', path: '/admin/content', icon: FileEdit },
    { title: 'Konten Produk', badge: 'Banner', path: '/admin/product-content', icon: Images },
    { title: 'Treatment', badge: `${treatments.length} layanan`, path: '/admin/treatments', icon: Stethoscope },
    { title: 'Data Klinik', badge: `${clinics.length} cabang`, path: '/admin/clinics', icon: Building2 },
    { title: 'Kategori Produk', badge: `${categories.length} kategori`, path: '/admin/categories', icon: Tags },
    { title: 'Data Barang', badge: `${products.length} barang`, path: '/admin/products', icon: Package },
    { title: 'Flash Sale', badge: 'Promo', path: '/admin/flash-sale', icon: Zap },
    { title: 'Customer & Guest', badge: `${users.length} akun`, path: '/admin/customers', icon: Users },
    { title: 'Pembelian', badge: `${orders.length} invoice`, path: '/admin/orders', icon: ShoppingBag },
    { title: 'Pengiriman', badge: `${shipments.length} resi`, path: '/admin/shipments', icon: Truck },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Intro */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Pusat Kendali HSK SECRET
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Ringkasan klinik &amp; e-commerce — kelola semua dari satu tempat.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              to={s.link}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#DA5B86]/40 hover:shadow-sm transition block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {s.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Menu Pengelolaan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickLinks.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.path}
                to={q.path}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-[#DA5B86]/40 hover:shadow-sm transition flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center shrink-0 group-hover:bg-[#DA5B86] group-hover:text-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {q.title}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">{q.badge}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pesanan terbaru */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Pesanan Terbaru
            </h3>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8B3A4D] hover:underline"
            >
              Semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.slice(0, 4).map((o) => (
              <div
                key={o.id}
                className="py-2.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {o.customerName}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">
                    {o.invoice}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {o.totalAmount}
                  </p>
                  <span className="text-[11px] text-emerald-600">
                    {o.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengiriman terbaru */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Pengiriman Terbaru
            </h3>
            <Link
              to="/admin/shipments"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8B3A4D] hover:underline"
            >
              Semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {shipments.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="py-2.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {s.recipientName}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">
                    {s.trackingNumber} · {s.courier}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FDF2F2] text-[#8B3A4D] shrink-0">
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
