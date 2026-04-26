'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Building2, Upload, FileText, Settings,
  TrendingUp, Activity, Shield, Database, Plus, Edit, Trash2,
  Download, AlertCircle, CheckCircle, XCircle, Search, Filter,
  RefreshCw, Eye, MoreVertical, Server, Cpu, HardDrive, Wifi,
  X, Loader2, Save
} from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'kelas', label: 'Class Management', icon: Building2 },
  { id: 'import', label: 'Import CSV', icon: Upload },
  { id: 'logs', label: 'Audit Logs', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── DUMMY DATA AWAL ─────────────────────────────────────────────────────────
const initialUserList = [
  { id: 1, nama: 'Ahmad Haris', email: 'ahmadh@student.univ.ac.id', role: 'Mahasiswa', kelas: 'Pemweb A', status: 'Aktif' },
  { id: 2, nama: 'Dr. Reza Aditya', email: 'reza@dosen.univ.ac.id', role: 'Dosen', kelas: 'Pemweb A, B', status: 'Aktif' },
  { id: 3, nama: 'Budi Santoso', email: 'budis@student.univ.ac.id', role: 'Mahasiswa', kelas: 'Pemweb A', status: 'Aktif' },
  { id: 4, nama: 'Citra Dewi', email: 'citrad@student.univ.ac.id', role: 'Mahasiswa', kelas: 'Pemweb A', status: 'Remedial' },
  { id: 5, nama: 'Prof. Susanti', email: 'susanti@dosen.univ.ac.id', role: 'Dosen', kelas: 'Algoritma C', status: 'Aktif' },
  { id: 6, nama: 'Dimas Pratama', email: 'dimasp@student.univ.ac.id', role: 'Mahasiswa', kelas: 'Pemweb B', status: 'Aktif' },
];

const initialKelasList = [
  { id: 1, nama: 'Pemrograman Web A', dosen: 'Dr. Reza Aditya', mhs: 30, semester: 'Genap 2025', status: 'Aktif' },
  { id: 2, nama: 'Pemrograman Web B', dosen: 'Dr. Reza Aditya', mhs: 28, semester: 'Genap 2025', status: 'Aktif' },
  { id: 3, nama: 'Algoritma & Pemrograman C', dosen: 'Prof. Susanti', mhs: 32, semester: 'Genap 2025', status: 'Aktif' },
  { id: 4, nama: 'Basis Data D', dosen: 'Dr. Irawan', mhs: 0, semester: 'Gasal 2025', status: 'Arsip' },
];

const auditLogs = [
  { time: '25 Apr 2025 09:12', user: 'Dr. Reza Aditya', action: 'Upload materi JavaScript Fundamentals', type: 'info' },
  { time: '25 Apr 2025 08:47', user: 'Ahmad Haris', action: 'Gagal kuis JavaScript #1 (skor 62)', type: 'warning' },
  { time: '25 Apr 2025 08:30', user: 'System AI', action: 'Generate 10 soal remedial otomatis untuk Pemweb A', type: 'success' },
  { time: '25 Apr 2025 07:55', user: 'Super Admin', action: 'Import 30 data mahasiswa dari CSV', type: 'success' },
  { time: '24 Apr 2025 16:20', user: 'Citra Dewi', action: 'Login gagal (3x percobaan)', type: 'error' },
  { time: '24 Apr 2025 15:10', user: 'Dr. Reza Aditya', action: 'Kirim notifikasi remedial ke 12 mahasiswa', type: 'info' },
];

// ─── TAB DASHBOARD ───────────────────────────────────────────────────────────
function TabDashboard() {
  return (
    <div className="fade-up space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500 text-sm mt-1">TeachSense+ Admin Control Panel</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-700 font-semibold text-sm">Semua sistem normal</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Pengguna', value: '186', sub: 'Aktif bulan ini', bg: 'bg-blue-500' },
          { icon: Building2, label: 'Total Kelas', value: '12', sub: 'Semester ini', bg: 'bg-red-500' },
          { icon: TrendingUp, label: 'Rata-rata Mastery', value: '74%', sub: 'Seluruh kelas', bg: 'bg-emerald-500' },
          { icon: Activity, label: 'Aktivitas Hari Ini', value: '342', sub: 'Aksi tercatat', bg: 'bg-purple-500' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-3xl p-5 text-white shadow-sm`}>
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mb-1">{s.value}</p>
            <p className="text-white/80 text-sm font-medium">{s.label}</p>
            <p className="text-white/60 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">System Health</h2>
          <div className="space-y-4">
            {[
              { icon: Server, label: 'API Server', status: '99.9% uptime', ok: true },
              { icon: Database, label: 'Database', status: '98.2% uptime', ok: true },
              { icon: Cpu, label: 'AI Engine', status: '97.8% uptime', ok: true },
              { icon: HardDrive, label: 'Storage', status: '68% digunakan (34/50 GB)', ok: true },
              { icon: Wifi, label: 'CDN', status: '100% uptime', ok: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.status}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Distribusi Pengguna</h2>
          <div className="space-y-4">
            {[
              { role: 'Mahasiswa', count: 156, pct: 84, color: 'bg-blue-500' },
              { role: 'Dosen', count: 18, pct: 10, color: 'bg-red-500' },
              { role: 'Admin', count: 4, pct: 2, color: 'bg-violet-500' },
              { role: 'Inactive', count: 8, pct: 4, color: 'bg-slate-300' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-sm text-slate-700 w-24 flex-shrink-0">{item.role}</p>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-700 w-10 text-right">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">Last 24h registrations</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-black text-slate-900">+3</p>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">pengguna baru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB USERS (INTERAKTIF) ──────────────────────────────────────────────────
function TabUsers() {
  const [users, setUsers] = useState(initialUserList);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Semua');
  
  // State Modal
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ nama: '', email: '', role: 'Mahasiswa', kelas: '', status: 'Aktif' });

  const filtered = users.filter((u) => {
    const matchSearch = u.nama.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'Semua' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ nama: '', email: '', role: 'Mahasiswa', kelas: '', status: 'Aktif' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = () => {
    if(!formData.nama || !formData.email) return;

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
    } else {
      setUsers([{ ...formData, id: Date.now() }, ...users]);
    }
    setShowModal(false);
  };

  return (
    <div className="fade-up space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">{users.length} pengguna terdaftar</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-200 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Tambah User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium outline-none focus:border-red-400 transition-colors shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['Semua', 'Mahasiswa', 'Dosen', 'Admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-colors flex-shrink-0 shadow-sm ${roleFilter === r ? 'bg-red-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Nama', 'Email', 'Role', 'Kelas', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="py-4 px-5 text-slate-500 font-bold text-xs uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
               <tr><td colSpan="6" className="py-10 text-center text-slate-400 font-medium">Tidak ada data ditemukan.</td></tr>
            ) : filtered.map((u) => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                      {u.nama.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-800">{u.nama}</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-slate-500 font-medium">{u.email}</td>
                <td className="py-4 px-5">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.role === 'Dosen' ? 'bg-violet-100 text-violet-700' : u.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-5 text-slate-600 font-medium">{u.kelas || '-'}</td>
                <td className="py-4 px-5">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(u)} className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors text-red-500 active:scale-95">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL USER */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-6">{editingUser ? 'Edit Data User' : 'Tambah User Baru'}</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input 
                  type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alamat Email</label>
                <input 
                  type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                  placeholder="john@univ.ac.id"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role</label>
                  <select 
                    value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                  >
                    <option>Mahasiswa</option>
                    <option>Dosen</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                  <select 
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                  >
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                    <option>Remedial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Kelas (Opsional)</label>
                <input 
                  type="text" value={formData.kelas} onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                  placeholder="Misal: Pemweb A"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleSave} className="flex-[2] bg-red-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-red-200 hover:bg-red-700 transition-colors">
                {editingUser ? 'Simpan Perubahan' : 'Tambahkan User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB KELAS (INTERAKTIF) ──────────────────────────────────────────────────
function TabKelas() {
  const [kelas, setKelas] = useState(initialKelasList);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({ nama: '', dosen: '', semester: '', mhs: 0, status: 'Aktif' });

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({ nama: '', dosen: '', semester: 'Genap 2026', mhs: 0, status: 'Aktif' });
    setShowModal(true);
  };

  const openEditModal = (kls) => {
    setModalMode('edit');
    setFormData({ ...kls });
    setSelectedClass(kls);
    setShowModal(true);
  };

  const openViewModal = (kls) => {
    setModalMode('view');
    setSelectedClass(kls);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Yakin ingin menghapus/mengarsipkan kelas ini?")) {
      setKelas(kelas.filter(k => k.id !== id));
    }
  };

  const handleSave = () => {
    if(!formData.nama) return;
    if (modalMode === 'edit') {
      setKelas(kelas.map(k => k.id === selectedClass.id ? { ...formData, id: k.id } : k));
    } else {
      setKelas([{ ...formData, id: Date.now() }, ...kelas]);
    }
    setShowModal(false);
  };

  return (
    <div className="fade-up space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Class Management</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola kelas aktif & arsip ({kelas.length} Kelas)</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-200 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Buat Kelas Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {kelas.map((k) => (
          <div key={k.id} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 ${k.status === 'Arsip' ? 'opacity-60 bg-slate-50' : ''}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${k.status === 'Aktif' ? 'bg-red-100' : 'bg-slate-200'}`}>
              <Building2 className={`w-6 h-6 ${k.status === 'Aktif' ? 'text-red-600' : 'text-slate-500'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg text-slate-800">{k.nama}</h3>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${k.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
                  {k.status}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Dosen: <span className="text-slate-700">{k.dosen}</span> · {k.mhs} Mahasiswa · {k.semester}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openViewModal(k)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" title="Lihat Detail">
                <Eye className="w-4 h-4" />
              </button>
              <button onClick={() => openEditModal(k)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" title="Edit Kelas">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(k.id)} className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors text-red-500 active:scale-95" title="Hapus Kelas">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL KELAS */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-black text-slate-800 mb-6">
              {modalMode === 'create' ? 'Buat Kelas Baru' : modalMode === 'edit' ? 'Edit Data Kelas' : 'Detail Kelas'}
            </h3>

            {modalMode === 'view' ? (
              // TAMPILAN VIEW
              <div className="space-y-6 mb-8">
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Nama Kelas</p>
                    <p className="font-black text-lg text-red-700 leading-none">{selectedClass.nama}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dosen Pengampu</p>
                    <p className="font-bold text-slate-700">{selectedClass.dosen}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Semester</p>
                    <p className="font-bold text-slate-700">{selectedClass.semester}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Mahasiswa</p>
                    <p className="font-bold text-slate-700">{selectedClass.mhs} Orang</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider inline-block mt-1 ${selectedClass.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {selectedClass.status}
                    </span>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-full bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm hover:bg-slate-200 transition-colors">Tutup Panel</button>
              </div>
            ) : (
              // TAMPILAN FORM (CREATE / EDIT)
              <>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Kelas</label>
                    <input 
                      type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                      placeholder="Misal: Pemrograman Web A"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dosen Pengampu</label>
                    <input 
                      type="text" value={formData.dosen} onChange={(e) => setFormData({...formData, dosen: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                      placeholder="Nama Dosen"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Semester</label>
                      <input 
                        type="text" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                        placeholder="Gasal 2026"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                      <select 
                        value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-red-400"
                      >
                        <option>Aktif</option>
                        <option>Arsip</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm hover:bg-slate-200 transition-colors">Batal</button>
                  <button onClick={handleSave} className="flex-[2] bg-red-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-red-200 hover:bg-red-700 transition-colors">
                    {modalMode === 'edit' ? 'Simpan Perubahan' : 'Buat Kelas'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB IMPORT ──────────────────────────────────────────────────────────────
function TabImport() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Import Data CSV</h1>
        <p className="text-slate-500 text-sm mt-1">Upload file CSV dari sistem Akademik / LMS lama</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
        className={`border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all ${dragOver ? 'border-red-400 bg-red-50' : uploaded ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 bg-white hover:border-slate-400'}`}
      >
        {uploaded ? (
          <div className="animate-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="font-bold text-emerald-700 text-lg">File berhasil diupload!</p>
            <p className="text-emerald-600 text-sm mt-1">mahasiswa_genap_2025.csv · 156 baris terdeteksi</p>
            <button
              onClick={() => setUploaded(false)}
              className="mt-4 text-sm text-slate-500 hover:text-slate-700 underline font-medium"
            >
              Upload file lain
            </button>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-slate-700 text-lg">Drag & drop file CSV di sini</p>
            <p className="text-slate-500 text-sm mt-1">atau</p>
            <button
              onClick={() => setUploaded(true)}
              className="mt-4 bg-red-600 text-white px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-200"
            >
              Pilih File
            </button>
            <p className="text-xs text-slate-400 mt-4">Format: .csv — Maks. 10MB</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-4">Format CSV yang Didukung</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { label: 'Data Mahasiswa', fields: 'nim, nama, email, kelas, semester', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { label: 'Data Dosen', fields: 'nidn, nama, email, mata_kuliah', color: 'bg-violet-50 border-violet-200 text-violet-700' },
            { label: 'Alur Kelas (CalDE)', fields: 'kelas_id, dosen_id, semester, status', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          ].map((f, i) => (
            <div key={i} className={`rounded-2xl border p-4 ${f.color}`}>
              <p className="font-bold text-sm mb-2">{f.label}</p>
              <p className="text-xs font-mono opacity-80">{f.fields}</p>
              <button className="mt-3 flex items-center gap-1 text-xs font-bold hover:underline opacity-90">
                <Download className="w-3 h-3" /> Download Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB LOGS ────────────────────────────────────────────────────────────────
function TabLogs() {
  return (
    <div className="fade-up space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Riwayat aktivitas sistem secara real-time</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {auditLogs.map((log, i) => {
          const config = {
            info: { icon: AlertCircle, bg: 'bg-blue-50', iconColor: 'text-blue-500', border: 'border-blue-100' },
            warning: { icon: AlertCircle, bg: 'bg-orange-50', iconColor: 'text-orange-500', border: 'border-orange-100' },
            success: { icon: CheckCircle, bg: 'bg-emerald-50', iconColor: 'text-emerald-500', border: 'border-emerald-100' },
            error: { icon: XCircle, bg: 'bg-red-50', iconColor: 'text-red-500', border: 'border-red-100' },
          };
          const { icon: Icon, bg, iconColor, border } = config[log.type];
          return (
            <div key={i} className={`flex items-start gap-4 rounded-2xl p-4 border ${bg} ${border} bg-white shadow-sm`}>
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{log.action}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">oleh {log.user}</p>
              </div>
              <span className="text-xs font-bold text-slate-400 flex-shrink-0 whitespace-nowrap">{log.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TAB SETTINGS (INTERAKTIF) ───────────────────────────────────────────────
function TabSettings() {
  const [kkm, setKkm] = useState(75);
  const [notif, setNotif] = useState(true);
  const [autoRemedial, setAutoRemedial] = useState(true);
  
  // State untuk interaksi tombol simpan
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulasi menyimpan ke server
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      // Kembalikan tombol ke keadaan semula setelah 2 detik
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Konfigurasi platform TeachSense+</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden">
          <h2 className="font-black text-slate-900 border-b border-slate-50 pb-4">Pengaturan Akademik</h2>
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-2">Batas KKM (Kriteria Ketuntasan Minimum)</label>
            <div className="flex items-center gap-4">
              <input
                type="range" min={60} max={100} value={kkm}
                onChange={(e) => setKkm(Number(e.target.value))}
                className="flex-1 accent-red-600"
              />
              <span className="text-2xl font-black text-red-600 w-12 text-right">{kkm}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div>
              <p className="text-sm font-bold text-slate-700">Notifikasi Remedial Otomatis</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Kirim notif ke mahasiswa saat skor di bawah KKM</p>
            </div>
            <button
              onClick={() => setNotif(!notif)}
              className={`w-14 h-7 rounded-full transition-colors relative ${notif ? 'bg-red-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${notif ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div>
              <p className="text-sm font-bold text-slate-700">Auto Generate Soal Remedial</p>
              <p className="text-xs font-medium text-slate-500 mt-1">AI otomatis generate soal saat ada mahasiswa remedial</p>
            </div>
            <button
              onClick={() => setAutoRemedial(!autoRemedial)}
              className={`w-14 h-7 rounded-full transition-colors relative ${autoRemedial ? 'bg-red-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoRemedial ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <h2 className="font-black text-slate-900 border-b border-slate-50 pb-4">Informasi Sistem</h2>
          <div className="space-y-4 flex-1">
            {[
              { label: 'Versi Platform', value: 'TeachSense+ v2.4.1' },
              { label: 'Environment', value: 'Production' },
              { label: 'Database', value: 'PostgreSQL 15.2' },
              { label: 'AI Model', value: 'Claude Sonnet (Adaptive)' },
              { label: 'Last Backup', value: '25 Apr 2025 03:00 WIB' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="text-sm font-bold text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-50 mt-auto">
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`w-full font-bold py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                isSaved 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200' 
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 disabled:opacity-80'
              }`}
            >
              {isSaving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan Konfigurasi...</>
              ) : isSaved ? (
                <><CheckCircle className="w-5 h-5" /> Pengaturan Tersimpan!</>
              ) : (
                <><Save className="w-5 h-5" /> Simpan Perubahan</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeTab = searchParams.get('tab') || 'dashboard';

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <TabDashboard />;
      case 'users': return <TabUsers />;
      case 'kelas': return <TabKelas />;
      case 'import': return <TabImport />;
      case 'logs': return <TabLogs />;
      case 'settings': return <TabSettings />;
      default: return <TabDashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white border-b border-slate-100 px-6 flex-shrink-0 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => router.push(`/admin?tab=${tab.id}`)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  isActive ? 'border-red-600 text-red-600' : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-t-lg'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8 bg-slate-50">
        {renderTab()}
      </div>
    </div>
  );
}