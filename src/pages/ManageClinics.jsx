import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Building2,
  MapPin,
  Clock,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
} from 'lucide-react';

const emptyRoom = {
  tag: 'Treatment',
  title: '',
  desc: '',
  image:
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
};

const ManageClinics = () => {
  const { clinics, setClinics } = useStore();
  const [activeId, setActiveId] = useState(clinics[0]?.id ?? null);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [roomForm, setRoomForm] = useState(emptyRoom);

  const activeClinic =
    clinics.find((c) => c.id === activeId) || clinics[0] || null;

  /* ---------- Update field cabang ---------- */
  const updateClinicField = (field, value) => {
    setClinics((prev) =>
      prev.map((c) => (c.id === activeClinic.id ? { ...c, [field]: value } : c))
    );
  };

  /* ---------- Tambah cabang baru ---------- */
  const addClinic = () => {
    const newClinic = {
      id: Date.now(),
      name: 'Clinic Baru',
      city: 'Kota',
      address: 'Alamat lengkap cabang baru',
      hours: 'Setiap Hari · 09.00 – 18.00 WIB',
      building:
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
      rooms: [],
    };
    setClinics((prev) => [...prev, newClinic]);
    setActiveId(newClinic.id);
  };

  /* ---------- Hapus cabang ---------- */
  const deleteClinic = (id) => {
    const remaining = clinics.filter((c) => c.id !== id);
    setClinics(remaining);
    if (activeId === id) setActiveId(remaining[0]?.id ?? null);
  };

  /* ---------- Modal ruangan ---------- */
  const openAddRoom = () => {
    setEditingRoomId(null);
    setRoomForm(emptyRoom);
    setRoomModalOpen(true);
  };

  const openEditRoom = (room) => {
    setEditingRoomId(room.id);
    setRoomForm(room);
    setRoomModalOpen(true);
  };

  const deleteRoom = (roomId) => {
    setClinics((prev) =>
      prev.map((c) =>
        c.id === activeClinic.id
          ? { ...c, rooms: (c.rooms || []).filter((r) => r.id !== roomId) }
          : c
      )
    );
  };

  const saveRoom = (e) => {
    e.preventDefault();
    setClinics((prev) =>
      prev.map((c) => {
        if (c.id !== activeClinic.id) return c;
        const rooms = c.rooms || [];
        if (editingRoomId) {
          return {
            ...c,
            rooms: rooms.map((r) =>
              r.id === editingRoomId ? { ...roomForm, id: editingRoomId } : r
            ),
          };
        }
        return { ...c, rooms: [...rooms, { ...roomForm, id: Date.now() }] };
      })
    );
    setRoomModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8B3A4D]" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kelola Data Klinik
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Atur cabang klinik, alamat, dan foto bangunan serta ruangan yang
            tampil di halaman About Us.
          </p>
        </div>
        <button
          type="button"
          onClick={addClinic}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Cabang
        </button>
      </div>

      {/* Tab cabang */}
      <div className="flex flex-wrap gap-2">
        {clinics.map((c) => (
          <div key={c.id} className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`px-4 py-2 rounded-l-lg text-sm font-medium border transition ${
                activeClinic?.id === c.id
                  ? 'bg-[#FDF2F2] text-[#8B3A4D] border-[#F2D3DC] font-semibold'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {c.name}
            </button>
            <button
              type="button"
              onClick={() => deleteClinic(c.id)}
              title="Hapus cabang"
              className={`px-2 py-2 rounded-r-lg border border-l-0 transition ${
                activeClinic?.id === c.id
                  ? 'bg-[#FDF2F2] text-gray-400 border-[#F2D3DC] hover:text-red-600'
                  : 'bg-white text-gray-300 border-gray-200 hover:text-red-600'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {!activeClinic ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
          Belum ada cabang. Klik &quot;Tambah Cabang&quot; untuk membuat yang
          baru.
        </div>
      ) : (
        <>
          {/* Detail cabang */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Informasi Cabang
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Nama Cabang
                  </label>
                  <input
                    type="text"
                    value={activeClinic.name}
                    onChange={(e) => updateClinicField('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Kota
                  </label>
                  <input
                    type="text"
                    value={activeClinic.city}
                    onChange={(e) => updateClinicField('city', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Alamat Lengkap
                </label>
                <textarea
                  rows="2"
                  value={activeClinic.address}
                  onChange={(e) => updateClinicField('address', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Jam Operasional
                </label>
                <input
                  type="text"
                  value={activeClinic.hours}
                  onChange={(e) => updateClinicField('hours', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  <ImageIcon className="w-3 h-3 inline mr-1" />
                  URL Foto Gedung Depan
                </label>
                <input
                  type="text"
                  value={activeClinic.building}
                  onChange={(e) =>
                    updateClinicField('building', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
            </div>

            {/* Preview gedung */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Preview Gedung
              </h3>
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-gray-100">
                <img
                  src={activeClinic.building}
                  alt={activeClinic.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="flex items-start gap-2 text-sm text-gray-700 mt-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#8B3A4D]" />
                {activeClinic.address}
              </p>
            </div>
          </div>

          {/* Daftar ruangan */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Foto Ruangan ({(activeClinic.rooms || []).length})
              </h3>
              <button
                type="button"
                onClick={openAddRoom}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Ruangan
              </button>
            </div>

            {(activeClinic.rooms || []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                Belum ada foto ruangan.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeClinic.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="rounded-xl border border-gray-200 overflow-hidden group"
                  >
                    <div className="aspect-[4/3] bg-gray-100 relative">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[9px] font-bold uppercase text-[#8B3A4D]">
                        {room.tag}
                      </span>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          onClick={() => openEditRoom(room)}
                          className="w-7 h-7 rounded-lg bg-white/90 text-gray-600 hover:text-[#8B3A4D] flex items-center justify-center"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRoom(room.id)}
                          className="w-7 h-7 rounded-lg bg-white/90 text-gray-600 hover:text-red-600 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {room.title}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {room.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal tambah/edit ruangan */}
      {roomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden">
            <div className="px-5 py-3.5 bg-[#FDF2F2] border-b border-[#F2D3DC] flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#8B3A4D]">
                {editingRoomId ? 'Edit Ruangan' : 'Tambah Ruangan'}
              </h3>
              <button
                type="button"
                onClick={() => setRoomModalOpen(false)}
                className="text-gray-500 hover:text-[#8B3A4D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveRoom} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Label / Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={roomForm.tag}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, tag: e.target.value })
                    }
                    placeholder="Treatment"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Judul Ruangan
                  </label>
                  <input
                    type="text"
                    required
                    value={roomForm.title}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, title: e.target.value })
                    }
                    placeholder="Ruang Treatment Utama"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  value={roomForm.desc}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, desc: e.target.value })
                  }
                  placeholder="Sterilisasi udara UV-C rutin"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  URL Foto Ruangan
                </label>
                <input
                  type="text"
                  required
                  value={roomForm.image}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B3A4D]"
                />
              </div>
              {roomForm.image && (
                <div className="rounded-lg overflow-hidden aspect-[16/9] bg-gray-100">
                  <img
                    src={roomForm.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setRoomModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#DA5B86] hover:bg-[#C84873] text-white text-xs font-semibold transition"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClinics;
