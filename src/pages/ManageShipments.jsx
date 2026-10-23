import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  Plus,
  Edit3,
  Trash2,
  MapPin,
  CheckCircle2,
  Search,
  X,
  Save,
  Calendar,
} from 'lucide-react';

const emptyShipment = {
  trackingNumber: 'AWB-HSK-NEW',
  invoice: 'INV-HSK-2026-001',
  recipientName: '',
  accountType: 'Customer',
  courier: 'JNE YES',
  shippingCost: 'Gratis Ongkir (Rp 0)',
  address: '',
  estimatedArrival: new Date(Date.now() + 2 * 86400000)
    .toISOString()
    .slice(0, 10),
  status: 'Menunggu Kurir',
};

const ManageShipments = () => {
  const { shipments, setShipments } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyShipment);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      ...emptyShipment,
      trackingNumber: `AWB-HSK-${Math.floor(10000 + Math.random() * 90000)}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (shipment) => {
    setEditingId(shipment.id);
    setFormData(shipment);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setShipments((prev) => prev.filter((s) => s.id !== id));
  };

  const handleMarkDelivered = (id) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: 'Terkirim / Selesai' } : s
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setShipments((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...formData, id: editingId } : s
        )
      );
    } else {
      setShipments((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredShipments = shipments.filter(
    (s) =>
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Kelola Pengiriman Barang
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Atur nomor resi (AWB), ekspedisi kurir, alamat tujuan, dan lacak
            status pengiriman produk ke Customer &amp; Guest.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari resi, invoice, kurir..."
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
            <span>+ Input Resi Pengiriman</span>
          </button>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF2F2] text-[#8B3A4D] border-b border-[#8B3A4D]/10 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">No. Resi &amp; Invoice</th>
                <th className="py-4 px-6">Penerima</th>
                <th className="py-4 px-6">Alamat Tujuan</th>
                <th className="py-4 px-6">Ekspedisi &amp; Ongkir</th>
                <th className="py-4 px-6">Estimasi Tiba</th>
                <th className="py-4 px-6">Status Pengiriman</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredShipments.map((item) => {
                const isDelivered = item.status === 'Terkirim / Selesai';
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-mono text-xs font-bold text-[#8B3A4D]">
                        {item.trackingNumber}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Ref: {item.invoice}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-serif font-bold text-gray-900">
                        {item.recipientName}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.accountType === 'Customer'
                            ? 'bg-[#FDF2F2] text-[#8B3A4D]'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.accountType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 max-w-xs">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8B3A4D] shrink-0 mt-0.5" />
                        <span>{item.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-800 text-xs">
                        {item.courier}
                      </p>
                      <p className="text-[11px] text-[#8B3A4D] font-medium">
                        {item.shippingCost}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {item.estimatedArrival}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/20'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {!isDelivered && (
                          <button
                            type="button"
                            onClick={() => handleMarkDelivered(item.id)}
                            title="Tandai Selesai Terkirim"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold uppercase tracking-wider transition"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selesai</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Edit Pengiriman"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Hapus Pengiriman"
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

      {/* Modal Add / Edit Shipment */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId
                  ? 'Update Data Pengiriman'
                  : 'Input Resi Pengiriman Baru'}
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
                    Nomor Resi (AWB)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.trackingNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trackingNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    No. Invoice Pesanan
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recipientName: e.target.value,
                      })
                    }
                    placeholder="Sophia Marlowe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Tipe Akun
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
                  Alamat Lengkap Pengiriman
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Kurir Ekspedisi
                  </label>
                  <select
                    value={formData.courier}
                    onChange={(e) =>
                      setFormData({ ...formData, courier: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="DHL Luxury Express">
                      DHL Luxury Express
                    </option>
                    <option value="JNE YES">JNE YES</option>
                    <option value="SiCepat Best">SiCepat Best</option>
                    <option value="J&T Express">J&amp;T Express</option>
                    <option value="GrabExpress Instant">
                      GrabExpress Instant
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Ongkos Kirim
                  </label>
                  <input
                    type="text"
                    value={formData.shippingCost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingCost: e.target.value,
                      })
                    }
                    placeholder="Rp 25.000 / Gratis Ongkir"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Estimasi Tiba
                  </label>
                  <input
                    type="date"
                    value={formData.estimatedArrival}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedArrival: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Status Pengiriman
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                >
                  <option value="Menunggu Kurir">Menunggu Kurir</option>
                  <option value="Dalam Perjalanan">Dalam Perjalanan</option>
                  <option value="Sedang Diantar">
                    Sedang Diantar ke Alamat
                  </option>
                  <option value="Terkirim / Selesai">Terkirim / Selesai</option>
                </select>
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
                  Simpan Pengiriman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShipments;
