import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Edit3,
  Trash2,
  Search,
  X,
  Save,
  Crown,
} from 'lucide-react';

const emptyUser = {
  code: 'USR-NEW',
  name: '',
  email: '',
  phone: '+62 ',
  accountType: 'Customer',
  tier: 'Regular Member',
  totalOrders: 0,
  totalSpent: 'Rp 0',
  joinedDate: new Date().toISOString().slice(0, 10),
  status: 'Active',
};

const ManageUsers = () => {
  const { users, setUsers } = useStore();
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyUser);

  const customerCount = users.filter(
    (u) => u.accountType === 'Customer'
  ).length;
  const guestCount = users.filter((u) => u.accountType === 'Guest').length;

  const openAddModal = (defaultType = 'Customer') => {
    setEditingId(null);
    setFormData({
      ...emptyUser,
      accountType: defaultType,
      tier: defaultType === 'Guest' ? 'Guest Checkout' : 'Regular Member',
      code:
        defaultType === 'Guest'
          ? `USR-GUEST-00${users.length + 1}`
          : `USR-CUST-00${users.length + 1}`,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingId(user.id);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleUpgradeToCustomer = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              accountType: 'Customer',
              tier: 'Regular Member',
              name: u.name.replace(' (Guest)', ''),
              code: u.code.replace('GUEST', 'CUST'),
            }
          : u
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((u) => {
    const matchesTab = filterType === 'ALL' || u.accountType === filterType;
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Kelola Akun User Customer &amp; Akun Guest
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Kelola data member terdaftar (Registered Customer) dan akun tamu
            checkout (Guest Account) di HSK SECRET.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => openAddModal('Guest')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#FDF2F2] text-xs font-semibold uppercase tracking-wider transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Akun Guest</span>
          </button>
          <button
            type="button"
            onClick={() => openAddModal('Customer')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition"
          >
            <UserCheck className="w-4 h-4" />
            <span>+ Tambah Akun Customer</span>
          </button>
        </div>
      </div>

      {/* Mini Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Semua Akun
            </p>
            <p className="font-serif text-2xl font-bold text-gray-900 mt-1">
              {users.length} Pengguna
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] text-[#8B3A4D] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Akun User Customer (Member)
            </p>
            <p className="font-serif text-2xl font-bold text-[#8B3A4D] mt-1">
              {customerCount} Customer
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Akun Guest (Tamu Checkout)
            </p>
            <p className="font-serif text-2xl font-bold text-amber-700 mt-1">
              {guestCount} Guest
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <UserX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: `Semua Akun (${users.length})` },
            { id: 'Customer', label: `Akun Customer (${customerCount})` },
            { id: 'Guest', label: `Akun Guest (${guestCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                filterType === tab.id
                  ? 'bg-[#DA5B86] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-[#FDF2F2] hover:text-[#8B3A4D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, atau kode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#8B3A4D] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF2F2] text-[#8B3A4D] border-b border-[#8B3A4D]/10 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">ID Pengguna</th>
                <th className="py-4 px-6">Nama &amp; Kontak</th>
                <th className="py-4 px-6">Tipe Akun</th>
                <th className="py-4 px-6">Tier / Level</th>
                <th className="py-4 px-6">Total Belanja</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredUsers.map((user) => {
                const isCustomer = user.accountType === 'Customer';
                const isActive = user.status === 'Active';
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-[#FDF2F2]/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-[#8B3A4D]">
                      {user.code}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-serif font-bold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-[11px] text-gray-400">{user.phone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          isCustomer
                            ? 'bg-[#FDF2F2] text-[#8B3A4D] border border-[#8B3A4D]/20'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isCustomer ? 'Registered Customer' : 'Guest Account'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs font-semibold text-gray-700">
                      {user.tier}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900">
                        {user.totalSpent}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {user.totalOrders}x transaksi
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-600 border border-red-200'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        {!isCustomer && (
                          <button
                            type="button"
                            onClick={() => handleUpgradeToCustomer(user.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#DA5B86] text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-[#C84873] transition"
                          >
                            Jadikan Member
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          title="Edit Akun"
                          className="p-2 rounded-lg text-gray-500 hover:text-[#8B3A4D] hover:bg-[#FDF2F2] transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          title="Hapus Akun"
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

      {/* Modal Add / Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#FDF2F2] border-b border-[#8B3A4D]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#8B3A4D]">
                {editingId
                  ? 'Edit Akun Customer / Guest'
                  : 'Tambah Akun Pengguna Baru'}
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
                    Tipe Akun
                  </label>
                  <select
                    value={formData.accountType}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        accountType: val,
                        tier:
                          val === 'Guest' ? 'Guest Checkout' : 'Regular Member',
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Customer">Customer (Member)</option>
                    <option value="Guest">Guest (Tamu Checkout)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Tier / Level Member
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData({ ...formData, tier: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="VIP Member">VIP Member</option>
                    <option value="Regular Member">Regular Member</option>
                    <option value="Guest Checkout">Guest Checkout</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Sophia Marlowe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email / Gmail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="user@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    No. WhatsApp / Telepon
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Jml Pesanan
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.totalOrders}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalOrders: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Total Belanja
                  </label>
                  <input
                    type="text"
                    value={formData.totalSpent}
                    onChange={(e) =>
                      setFormData({ ...formData, totalSpent: e.target.value })
                    }
                    placeholder="Rp 950.000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Status Akun
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
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
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
