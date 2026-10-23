import React from 'react';
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
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Kelola Konten Clinic', path: '/admin/content', icon: FileEdit },
  { name: 'Kelola Konten Produk', path: '/admin/product-content', icon: Images },
  { name: 'Kelola Treatment', path: '/admin/treatments', icon: Stethoscope },
  { name: 'Kelola Kategori Produk', path: '/admin/categories', icon: Tags },
  { name: 'Kelola Data Barang', path: '/admin/products', icon: Package },
  { name: 'Kelola Flash Sale', path: '/admin/flash-sale', icon: Zap },
  { name: 'Kelola Customer & Guest', path: '/admin/customers', icon: Users },
  { name: 'Kelola Pembelian Produk', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Kelola Pengiriman', path: '/admin/shipments', icon: Truck },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="min-h-screen flex bg-[#F9FAFB] font-sans text-gray-800">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#DA5B86] text-white flex flex-col justify-between shrink-0 shadow-xl">
        <div className="overflow-y-auto">
          {/* Brand Logo */}
          <div className="h-20 px-6 flex items-center gap-3 border-b border-white/15">
            <div className="w-9 h-9 rounded-lg bg-[#FDF2F2]/15 flex items-center justify-center text-[#FDF2F2]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest block leading-none">
                HSK SECRET
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#FDF2F2]/80 uppercase block mt-1">
                ADMIN PANEL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FDF2F2]/60">
              Manajemen Utama
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FDF2F2] text-[#8B3A4D] shadow-sm font-bold'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="pt-3 mt-3 border-t border-white/15 space-y-1">
              <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FDF2F2]/60">
                Preview Website
              </p>
              <Link
                to="/"
                className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium text-white/85 hover:bg-white/10 hover:text-white transition"
              >
                <span>Halaman Klinik</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium text-white/85 hover:bg-white/10 hover:text-white transition"
              >
                <span>Halaman Produk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t border-white/15">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-white/85 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Right Column: Top Navbar + Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200/80 px-8 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#8B3A4D] tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-xs text-gray-400">
              CMS, E-Commerce &amp; Logistics Management — HSK SECRET
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] text-xs font-semibold hover:bg-[#DA5B86] hover:text-white transition"
              >
                <span>Web Klinik</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] text-xs font-semibold hover:bg-[#DA5B86] hover:text-white transition"
              >
                <span>Web Produk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Admin User Avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">
                  HSK Admin
                </p>
                <p className="text-xs text-gray-400">{adminEmail}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#DA5B86] text-[#FDF2F2] font-serif font-bold flex items-center justify-center shadow-sm ring-4 ring-[#FDF2F2]">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#F9FAFB] p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
