import React, { useState } from 'react';
import {
  Navigate,
  NavLink,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  LayoutDashboard,
  FileEdit,
  Stethoscope,
  Tags,
  Package,
  Users,
  ShoppingBag,
  Truck,
  LogOut,
  Sparkles,
  ExternalLink,
  Zap,
  Images,
  Building2,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Konten Clinic', path: '/admin/content', icon: FileEdit },
  { name: 'Konten Produk', path: '/admin/product-content', icon: Images },
  { name: 'Treatment', path: '/admin/treatments', icon: Stethoscope },
  { name: 'Data Klinik', path: '/admin/clinics', icon: Building2 },
  { name: 'Kategori Produk', path: '/admin/categories', icon: Tags },
  { name: 'Data Barang', path: '/admin/products', icon: Package },
  { name: 'Flash Sale', path: '/admin/flash-sale', icon: Zap },
  { name: 'Customer & Guest', path: '/admin/customers', icon: Users },
  { name: 'Pembelian Produk', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Pengiriman', path: '/admin/shipments', icon: Truck },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const adminEmail =
    localStorage.getItem('adminEmail') || 'hsksecret.admin@gmail.com';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  const currentNav = navItems.find((item) =>
    location.pathname.startsWith(item.path)
  );
  const pageTitle = currentNav ? currentNav.name : 'Admin Portal';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-16 px-5 flex items-center gap-2.5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-[#DA5B86] flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="leading-tight">
          <span className="text-sm font-bold text-gray-900 block">
            HSK SECRET
          </span>
          <span className="text-[10px] tracking-[0.18em] text-gray-400 uppercase block">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#FDF2F2] text-[#8B3A4D] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <div className="pt-3 mt-3 border-t border-gray-100 space-y-0.5">
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Preview Web
          </p>
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
          >
            <span>Halaman Klinik</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
          >
            <span>Halaman Produk</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F9FAFB] text-gray-800">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block w-60 bg-white border-r border-gray-200 shrink-0">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Right column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:border-[#DA5B86] hover:text-[#8B3A4D] transition"
            >
              <span>Lihat Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-sm font-medium text-gray-800">HSK Admin</p>
                <p className="text-[11px] text-gray-400">{adminEmail}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#DA5B86] text-white text-sm font-bold flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-[#F9FAFB] p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
