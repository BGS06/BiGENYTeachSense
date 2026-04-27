'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Users, Building2, Upload, FileText, Settings,
  TrendingUp, Activity, Database, Plus, Edit, Trash2,
  Download, AlertCircle, CheckCircle, XCircle, Search, 
  RefreshCw, Eye, Server, Cpu, HardDrive, Wifi, X, Loader2, Save
} from 'lucide-react';

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium mt-1">TeachSense+ Admin Control Panel</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-2.5 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-700 font-bold text-sm">Semua sistem normal</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Users, label: 'Total Pengguna', value: '186', sub: 'Aktif bulan ini', bg: 'bg-gradient-to-br from-blue-500 to-blue-600' },
          { icon: Building2, label: 'Total Kelas', value: '12', sub: 'Semester ini', bg: 'bg-gradient-to-br from-red-500 to-red-600' },
          { icon: TrendingUp, label: 'Rata-rata Mastery', value: '74%', sub: 'Seluruh kelas', bg: 'bg-gradient-to-br from-emerald-400 to-emerald-500' },
          { icon: Activity, label: 'Aktivitas Hari Ini', value: '342', sub: 'Aksi tercatat', bg: 'bg-gradient-to-br from-purple-500 to-indigo-500' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-[2rem] p-6 text-white shadow-lg shadow-slate-200`}>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6" />
            </div>
            <p className="text-4xl font-black mb-1 tracking-tight">{s.value}</p>
            <p className="text-white/90 text-sm font-bold">{s.label}</p>
            <p className="text-white/70 text-xs font-medium">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-800 mb-6">System Health</h2>
          <div className="space-y-5">
            {[
              { icon: Server, label: 'API Server', status: '99.9% uptime', ok: true },
              { icon: Database, label: 'Database', status: '98.2% uptime', ok: true },
              { icon: Cpu, label: 'AI Engine', status: '97.8% uptime', ok: true },
              { icon: HardDrive, label: 'Storage', status: '68% digunakan (34/50 GB)', ok: true },
              { icon: Wifi, label: 'CDN', status: '100% uptime', ok: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs font-medium text-slate-500">{item.status}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-800 mb-6">Distribusi Pengguna</h2>
          <div className="space-y-5">
            {[
              { role: 'Mahasiswa', count: 156, pct: 84, color: 'bg-blue-500' },
              { role: 'Dosen', count: 18, pct: 10, color: 'bg-red-500' },
              { role: 'Admin', count: 4, pct: 2, color: 'bg-violet-500' },
              { role: 'Inactive', count: 8, pct: 4, color: 'bg-slate-300' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-sm font-bold text-slate-700 w-24 flex-shrink-0">{item.role}</p>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-sm font-black text-slate-700 w-10 text-right">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last 24h registrations</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-3xl font-black text-slate-900">+3</p>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-widest">pengguna baru</span>
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-medium mt-1">{users.length} pengguna terdaftar di sistem</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3.5 rounded-2xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Tambah User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:border-red-400 transition-colors shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['Semua', 'Mahasiswa', 'Dosen', 'Admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-6 py-4 rounded-2xl text-sm font-bold transition-all flex-shrink-0 shadow-sm ${roleFilter === r ? 'bg-red-600 text-white shadow-red-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Nama', 'Email', 'Role', 'Kelas', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="py-5 px-6 text-slate-400 font-bold text-xs uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
               <tr><td colSpan="6" className="py-10 text-center text-slate-400 font-medium">Tidak ada data ditemukan.</td></tr>
            ) : filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-sm flex-shrink-0">
                      {u.nama.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-800 text-base">{u.nama}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-500 font-medium">{u.email}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.role === 'Dosen' ? 'bg-violet-100 text-violet-700' : u.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600 font-medium">{u.kelas || '-'}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(u)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors text-red-500 active:scale-95">
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
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">{editingUser ? 'Edit Data User' : 'Tambah User Baru'}</h3>
            
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input 
                  type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Email</label>
                <input 
                  type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="john@univ.ac.id"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Role</label>
                  <select 
                    value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                  >
                    <option>Mahasiswa</option>
                    <option>Dosen</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                  <select 
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                  >
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                    <option>Remedial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Kelas (Opsional)</label>
                <input 
                  type="text" value={formData.kelas} onChange={(e) => setFormData({...formData, kelas: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="Misal: Pemweb A"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl text-sm hover:bg-slate-200 transition-colors active:scale-95">Batal</button>
              <button onClick={handleSave} className="flex-[2] bg-red-600 text-white font-bold py-4 rounded-2xl text-sm shadow-xl shadow-red-200 hover:bg-red-700 transition-colors active:scale-95">
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Class Management</h1>
          <p className="text-slate-500 font-medium mt-1">Kelola kelas aktif & arsip ({kelas.length} Kelas)</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3.5 rounded-2xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Buat Kelas Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {kelas.map((k) => (
          <div key={k.id} className={`bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6 transition-all hover:shadow-md ${k.status === 'Arsip' ? 'opacity-60 bg-slate-50/50' : ''}`}>
            <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 ${k.status === 'Aktif' ? 'bg-red-50' : 'bg-slate-100'}`}>
              <Building2 className={`w-8 h-8 ${k.status === 'Aktif' ? 'text-red-600' : 'text-slate-400'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{k.nama}</h3>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${k.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                  {k.status}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">Dosen: <span className="text-slate-800 font-bold">{k.dosen}</span> · {k.mhs} Mahasiswa · {k.semester}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openViewModal(k)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" title="Lihat Detail">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => openEditModal(k)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" title="Edit Kelas">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(k.id)} className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors text-red-500 active:scale-95" title="Hapus Kelas">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL KELAS */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">
              {modalMode === 'create' ? 'Buat Kelas Baru' : modalMode === 'edit' ? 'Edit Data Kelas' : 'Detail Kelas'}
            </h3>

            {modalMode === 'view' ? (
              // TAMPILAN VIEW
              <div className="space-y-6 mb-8">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Nama Kelas</p>
                    <p className="font-black text-xl text-red-700 leading-none">{selectedClass.nama}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Dosen Pengampu</p>
                    <p className="font-bold text-slate-800 text-sm">{selectedClass.dosen}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Semester</p>
                    <p className="font-bold text-slate-800 text-sm">{selectedClass.semester}</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Mahasiswa</p>
                    <p className="font-bold text-slate-800 text-sm">{selectedClass.mhs} Orang</p>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider inline-block ${selectedClass.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {selectedClass.status}
                    </span>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl text-sm hover:bg-slate-200 transition-colors active:scale-95">Tutup Panel</button>
              </div>
            ) : (
              // TAMPILAN FORM (CREATE / EDIT)
              <>
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Kelas</label>
                    <input 
                      type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                      placeholder="Misal: Pemrograman Web A"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dosen Pengampu</label>
                    <input 
                      type="text" value={formData.dosen} onChange={(e) => setFormData({...formData, dosen: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                      placeholder="Nama Dosen"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Semester</label>
                      <input 
                        type="text" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                        placeholder="Gasal 2026"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                      <select 
                        value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-red-400 transition-colors"
                      >
                        <option>Aktif</option>
                        <option>Arsip</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl text-sm hover:bg-slate-200 transition-colors active:scale-95">Batal</button>
                  <button onClick={handleSave} className="flex-[2] bg-red-600 text-white font-bold py-4 rounded-2xl text-sm shadow-xl shadow-red-200 hover:bg-red-700 transition-colors active:scale-95">
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Import Data CSV</h1>
        <p className="text-slate-500 font-medium mt-1">Upload massal data dari sistem Akademik lama</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
        className={`border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-300 ${dragOver ? 'border-red-400 bg-red-50 scale-[1.02]' : uploaded ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
      >
        {uploaded ? (
          <div className="animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <p className="font-black text-emerald-700 text-2xl mb-2">File berhasil diupload!</p>
            <p className="text-emerald-600 font-medium">mahasiswa_genap_2025.csv · 156 baris terdeteksi</p>
            <button
              onClick={() => setUploaded(false)}
              className="mt-8 text-sm text-slate-500 hover:text-slate-800 font-bold transition-colors underline underline-offset-4"
            >
              Upload file lain
            </button>
          </div>
        ) : (
          <div>
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-slate-400" />
            </div>
            <p className="font-black text-slate-800 text-2xl mb-2">Drag & drop file CSV di sini</p>
            <p className="text-slate-500 font-medium mb-8">atau</p>
            <button
              onClick={() => setUploaded(true)}
              className="bg-red-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 active:scale-95"
            >
              Pilih File Manual
            </button>
            <p className="text-[11px] font-bold text-slate-400 mt-8 uppercase tracking-widest">Format Didukung: .csv — Maks. 10MB</p>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h2 className="text-lg font-black text-slate-800 mb-6">Format CSV yang Didukung</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { label: 'Data Mahasiswa', fields: 'nim, nama, email, kelas', color: 'bg-blue-50 border-blue-100 text-blue-700' },
            { label: 'Data Dosen', fields: 'nidn, nama, email, matkul', color: 'bg-violet-50 border-violet-100 text-violet-700' },
            { label: 'Data Kelas', fields: 'id, nama, dosen, semester', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
          ].map((f, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${f.color}`}>
              <p className="font-bold text-sm mb-2">{f.label}</p>
              <p className="text-xs font-mono opacity-80 mb-4 bg-white/50 p-2 rounded-lg">{f.fields}</p>
              <button className="flex items-center gap-1.5 text-xs font-bold hover:underline opacity-90 transition-all">
                <Download className="w-4 h-4" /> Download Template
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Audit Logs</h1>
          <p className="text-slate-500 font-medium mt-1">Riwayat aktivitas sistem secara real-time</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
            <RefreshCw className="w-5 h-5" /> Refresh
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
            <Download className="w-5 h-5" /> Export Logs
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
            <div key={i} className={`flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5 border ${bg} ${border} bg-white/50 hover:bg-white shadow-sm transition-colors`}>
              <Icon className={`w-6 h-6 flex-shrink-0 ${iconColor}`} />
              <div className="flex-1">
                <p className="font-bold text-slate-800">{log.action}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Diakses oleh: <span className="text-slate-700 font-bold">{log.user}</span></p>
              </div>
              <div className="md:text-right">
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap">{log.time}</span>
              </div>
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
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Konfigurasi platform TeachSense+</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Pengaturan Akademik</h2>
          
          <div>
            <label className="text-sm font-bold text-slate-700 block mb-4">Batas KKM Global (Kriteria Ketuntasan Minimum)</label>
            <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <input
                type="range" min={60} max={100} value={kkm}
                onChange={(e) => setKkm(Number(e.target.value))}
                className="flex-1 accent-red-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-3xl font-black text-red-600 w-16 text-right">{kkm}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">Notifikasi Remedial Otomatis</p>
              <p className="text-xs font-medium text-slate-500 mt-1 max-w-xs">Kirim email ke mahasiswa saat skor di bawah KKM.</p>
            </div>
            <button
              onClick={() => setNotif(!notif)}
              className={`w-14 h-8 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${notif ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${notif ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Auto Generate AI Remedial</p>
              <p className="text-xs font-medium text-slate-500 mt-1 max-w-xs">AI otomatis membuat draf soal remedial saat dibutuhkan.</p>
            </div>
            <button
              onClick={() => setAutoRemedial(!autoRemedial)}
              className={`w-14 h-8 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${autoRemedial ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${autoRemedial ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Informasi Sistem</h2>
          <div className="space-y-4 flex-1">
            {[
              { label: 'Versi Platform', value: 'TeachSense+ v2.4.1' },
              { label: 'Environment', value: 'Production' },
              { label: 'Database', value: 'PostgreSQL 15.2' },
              { label: 'AI Model', value: 'Claude Sonnet (Adaptive)' },
              { label: 'Last Backup', value: '25 Apr 2026 03:00 WIB' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <p className="text-sm font-bold text-slate-500">{item.label}</p>
                <p className="text-sm font-black text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 mt-auto">
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`w-full font-black py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 active:scale-95 shadow-xl disabled:opacity-80 ${
                isSaved 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200' 
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
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

// ─── MAIN PAGE (TANPA TOP NAVBAR) ────────────────────────────────────────────
export default function AdminPage() {
  const searchParams = useSearchParams();
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
    <div className="flex flex-col h-full relative">
      {/* KONTEN HALAMAN LANGSUNG, TANPA NAVBAR ATAS */}
      <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-12 bg-[#fbfcfe]">
        <div className="max-w-6xl mx-auto">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}