import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Plus,
  Edit3,
  Trash2,
  Truck,
  Search,
  X,
  Save,
  CreditCard,
} from 'lucide-react';

const emptyOrder = {
  invoice: 'INV-HSK-2026-NEW',
  customerName: '',
  accountType: 'Customer',
  itemsSummary: 'Radiance Glow Serum (1x)',
  qty: 1,
  totalAmount: 'Rp 490.000',
  paymentMethod: 'BCA Virtual Account',
  paymentStatus: 'Paid',
  orderStatus: 'Processing',
  orderDate: new Date().toISOString().slice(0, 10),
};

const ManageOrders = () => {
  const navigate = useNavigate();
  const { orders, setOrders, shipments, setShipments } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyOrder);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      ...emptyOrder,
      invoice: `INV-HSK-2026-00${orders.length + 1}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingId(order.id);
    setFormData(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleCreateShipment = (order) => {
    const existing = shipments.find((s) => s.invoice === order.invoice);
    if (!existing) {
      const newShipment = {
        id: Date.now(),
        trackingNumber: `AWB-HSK-${Math.floor(10000 + Math.random() * 90000)}`,
        invoice: order.invoice,
        recipientName: order.customerName,
        accountType: order.accountType,
        courier: 'JNE YES',
        shippingCost: 'Gratis Ongkir (Rp 0)',
        address: 'Alamat pengiriman pelanggan HSK SECRET',
        estimatedArrival: new Date(Date.now() + 2 * 86400000)
          .toISOString()
          .slice(0, 10),
        status: 'Dalam Perjalanan',
      };
      setShipments((prev) => [newShipment, ...prev]);
    }
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, orderStatus: 'Shipped' } : o
      )
    );
    navigate('/admin/shipments');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingId ? { ...formData, id: editingId } : o))
      );
    } else {
      setOrders((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.itemsSummary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Pembelian Produk
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Pantau dan kelola transaksi pembelian produk dari akun Customer
            maupun Guest Checkout.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari invoice / pembeli..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs focus:outline-none focus:border-[#8B3A4D]"
            />
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Pembelian</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">No. Invoice</th>
                <th className="py-4 px-6">Pembeli</th>
                <th className="py-4 px-6">Produk Dibeli</th>
                <th className="py-4 px-6">Total &amp; Metode</th>
                <th className="py-4 px-6">Pembayaran</th>
                <th className="py-4 px-6">Status Pesanan</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOrders.map((order) => {
                const isPaid = order.paymentStatus === 'Paid';
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-mono text-xs font-bold text-[#8B3A4D]">
                        {order.invoice}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {order.orderDate}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-serif font-bold text-gray-900">
                        {order.customerName}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.accountType === 'Customer'
                            ? 'bg-[#FDF2F2] text-[#8B3A4D]'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {order.accountType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 max-w-xs">
                      <p className="font-medium text-gray-800">
                        {order.itemsSummary}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Total Qty: {order.qty} item
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900">
                        {order.totalAmount}
                      </p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <CreditCard className="w-3 h-3 text-[#8B3A4D]" />
                        {order.paymentMethod}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/20">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCreateShipment(order)}
                          title="Proses ke Pengiriman"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDF2F2] text-[#8B3A4D] hover:bg-[#DA5B86] hover:text-white text-[11px] font-semibold transition"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Kirim</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(order)}
                          title="Edit Pembelian"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          title="Hapus Pembelian"
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId
                  ? 'Edit Transaksi Pembelian'
                  : 'Tambah Pembelian Produk Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Nomor Invoice
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.invoice}
                    onChange={(e) =>
                      setFormData({ ...formData, invoice: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Tipe Akun Pembeli
                  </label>
                  <select
                    value={formData.accountType}
                    onChange={(e) =>
                      setFormData({ ...formData, accountType: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Customer">Customer (Member)</option>
                    <option value="Guest">Guest (Tamu)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Nama Pembeli
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="Contoh: Sophia Marlowe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Daftar Produk yang Dibeli
                </label>
                <input
                  type="text"
                  required
                  value={formData.itemsSummary}
                  onChange={(e) =>
                    setFormData({ ...formData, itemsSummary: e.target.value })
                  }
                  placeholder="Radiance Glow Serum (1x), Hydra Boost Cream (1x)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Jumlah Item
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.qty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qty: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Total Harga
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.totalAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, totalAmount: e.target.value })
                    }
                    placeholder="Rp 930.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Metode Bayar
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="BCA Virtual Account">
                      BCA Virtual Account
                    </option>
                    <option value="Mandiri Transfer">Mandiri Transfer</option>
                    <option value="QRIS / GoPay">QRIS / GoPay</option>
                    <option value="OVO / ShopeePay">OVO / ShopeePay</option>
                    <option value="VISA / Mastercard">VISA / Mastercard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Status Pembayaran
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Paid">Paid (Lunas)</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Status Pesanan
                  </label>
                  <select
                    value={formData.orderStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        orderStatus: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  Simpan Pembelian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
