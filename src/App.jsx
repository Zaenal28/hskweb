import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import ClinicHome from './pages/ClinicHome';
import TreatmentsPage from './pages/TreatmentsPage';
import AboutPage from './pages/AboutPage';
import TreatmentDetail from './pages/TreatmentDetail';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import ManageContent from './pages/ManageContent';
import ManageProductContent from './pages/ManageProductContent';
import ManageTreatments from './pages/ManageTreatments';
import ManageCategories from './pages/ManageCategories';
import ManageProducts from './pages/ManageProducts';
import ManageFlashSale from './pages/ManageFlashSale';
import ManageUsers from './pages/ManageUsers';
import ManageOrders from './pages/ManageOrders';
import ManageShipments from './pages/ManageShipments';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Halaman 1: Halaman Klinik HSK SECRET (Default Route) */}
          <Route path="/" element={<ClinicHome />} />
          <Route path="/clinic" element={<ClinicHome />} />

          {/* Halaman Katalog & Filter Kategori Treatment */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />

          {/* Halaman Detail Treatment (Galeri Banyak Foto Proses, Keterangan & Durasi) */}
          <Route path="/treatments/:id" element={<TreatmentDetail />} />

          {/* Halaman 2: Halaman Produk & Detail Produk HSK SECRET */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Halaman Keranjang / Cart, Transaksi / Checkout & Profile Penerima */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Halaman Khusus Login Customer, Daftar (No Telpon/WA) & Login Guest/Tamu */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* Halaman Khusus Login Admin (Terpisah dari Login Customer & Guest) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content" element={<ManageContent />} />
            <Route path="product-content" element={<ManageProductContent />} />
            <Route path="treatments" element={<ManageTreatments />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="flash-sale" element={<ManageFlashSale />} />
            <Route path="customers" element={<ManageUsers />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="shipments" element={<ManageShipments />} />
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
