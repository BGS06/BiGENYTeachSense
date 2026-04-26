'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Users, BarChart3, BookOpen, FileEdit, Sparkles,
  Search, AlertCircle, CheckCircle, ChevronRight,
  TrendingUp, Activity, FileText, Plus, Edit, Trash2,
  Eye, Download, Loader2, X, Mail, Target, BookX
} from 'lucide-react';
import { useState } from 'react';

// ─── DUMMY DATA ──────────────────────────────────────────────────────────────
const initialMhsList = [
  { id: '130121001', nama: 'Efran Gustine', status: 'Kritis', skor: 42, hadir: '100%', tren: 'down', lemah: 'Recursion' },
  { id: '130121002', nama: 'Amanda Shafira', status: 'Aman', skor: 88, hadir: '100%', tren: 'up', lemah: 'Tree' },
  { id: '130121003', nama: 'Bima Satria', status: 'Aman', skor: 76, hadir: '85%', tren: 'up', lemah: 'Sorting' },
  { id: '130121004', nama: 'Cindy Aulia', status: 'Perhatian', skor: 65, hadir: '100%', tren: 'down', lemah: 'Arrays' },
  { id: '130121005', nama: 'Dimas Pratama', status: 'Aman', skor: 92, hadir: '100%', tren: 'up', lemah: 'Graph' },
];

const initialMateriList = [
  { id: 1, judul: 'Bab 1: Pengenalan Logika Dasar', tipe: 'Video & PDF', status: 'Published', views: 32 },
  { id: 2, judul: 'Bab 2: Struktur Data Array', tipe: 'Modul Interaktif', status: 'Published', views: 32 },
  { id: 3, judul: 'Bab 3: Fungsi Rekursif & Call Stack', tipe: 'Video & Kuis', status: 'Published', views: 28 },
  { id: 4, judul: 'Bab 4: Object Oriented Programming', tipe: 'Draft', status: 'Draft', views: 0 },
];

const initialKuisList = [
  { id: 1, judul: 'Kuis 1: Pemahaman Array', deadline: '12 Apr 2026', kumpul: 32, rata: 85 },
  { id: 2, judul: 'Tugas Praktikum: Rekursif', deadline: '20 Apr 2026', kumpul: 28, rata: 62 },
  { id: 3, judul: 'Ujian Tengah Semester (UTS)', deadline: '30 Apr 2026', kumpul: 0, rata: 0 },
];

const chartData = [
  { topik: 'Logic', skor: 85, color: '#10b981' },
  { topik: 'Arrays', skor: 68, color: '#fb923c' },
  { topik: 'Recursion', skor: 42, color: '#ef4444' },
  { topik: 'OOP', skor: 78, color: '#34d399' },
  { topik: 'Tree', skor: 55, color: '#f97316' },
];

// ─── KOMPONEN MODAL DETAIL MAHASISWA ─────────────────────────────────────────
// ─── KOMPONEN MODAL DETAIL MAHASISWA ─────────────────────────────────────────
function StudentDetailModal({ student, onClose }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  if (!student) return null;

  const handleAssign = () => {
    setStatus('loading');
    // Simulasi loading AI meng-generate soal selama 1.5 detik
    setTimeout(() => {
      setStatus('success');
      // Tutup modal otomatis setelah pesan sukses tampil selama 2 detik
      setTimeout(() => {
        setStatus('idle'); // Reset status
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleHubungi = () => {
    alert(`Sistem akan membuka aplikasi Email/Pesan untuk menghubungi ${student.nama}`);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
        <button 
          onClick={onClose} 
          disabled={status === 'loading'}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          // --- TAMPILAN SUKSES ---
          <div className="text-center py-8 animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Remedial Terkirim!</h3>
            <p className="text-slate-500 font-medium text-sm">
              Latihan adaptif untuk topik <span className="font-bold text-slate-700">{student.lemah}</span> telah dikirimkan ke dasbor {student.nama}.
            </p>
          </div>
        ) : (
          // --- TAMPILAN DETAIL NORMAL ---
          <div className={`transition-opacity duration-300 ${status === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 mb-8 mt-2">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                student.skor < 70 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {student.nama.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{student.nama}</h2>
                <p className="text-slate-400 font-mono text-xs">{student.id} · IF-44-01</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mastery Index</p>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-black ${student.skor < 70 ? 'text-red-500' : 'text-emerald-500'}`}>{student.skor}%</span>
                  {student.tren === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kehadiran</p>
                <p className="text-3xl font-black text-slate-700">{student.hadir}</p>
              </div>
            </div>

            {/* Kotak Peringatan Topik Terlemah */}
            <div className="bg-red-50 p-5 rounded-2xl border border-red-100 mb-8 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <BookX className="w-24 h-24 text-red-500" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Topik Terlemah</p>
                <h3 className="text-lg font-black text-red-600 mb-2">{student.lemah}</h3>
                <p className="text-xs text-red-500/80 font-medium">Sistem merekomendasikan pemberian modul latihan tambahan khusus untuk topik ini.</p>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              <button 
                onClick={handleHubungi}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <Mail className="w-4 h-4" /> Hubungi
              </button>
              <button 
                onClick={handleAssign}
                disabled={status === 'loading'}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-red-200 transition-all text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-80"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
                ) : (
                  <><Target className="w-4 h-4" /> Assign Remedial</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB DASHBOARD ───────────────────────────────────────────────────────────
function TabDashboard() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Data Kelas: IF-44-01</h1>
        <p className="text-slate-500 font-medium">Mata Kuliah: Struktur Data & Algoritma</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Mahasiswa</p>
            <p className="text-3xl font-black text-slate-800">32</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Rata-rata Kelas</p>
            <p className="text-3xl font-black text-slate-800">76.4</p>
          </div>
        </div>
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-red-400 uppercase tracking-widest">Butuh Perhatian</p>
            <p className="text-3xl font-black text-red-600">4 <span className="text-base font-bold text-red-400">mhs</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-800">Preview Mahasiswa</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari NIM / Nama..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="p-4 pl-6">Mahasiswa</th>
                <th className="p-4">Skor Rata-rata</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {initialMhsList.filter(m => m.nama.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search)).slice(0, 3).map((mhs, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-slate-800">
                    {mhs.nama}
                    <p className="text-[10px] text-slate-400 font-mono font-normal">{mhs.id}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${mhs.skor < 70 ? 'text-red-500' : 'text-slate-700'}`}>{mhs.skor}</span>
                      {mhs.tren === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                      mhs.status === 'Aman' ? 'bg-emerald-100 text-emerald-700' : 
                      mhs.status === 'Kritis' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {mhs.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button 
                      onClick={() => setSelectedStudent(mhs)}
                      className="text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-semibold text-xs inline-flex items-center gap-1 active:scale-95"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Detail Modal */}
      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}

/// ─── TAB ANALISIS ────────────────────────────────────────────────────────────
function TabAnalisis() {
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBuatRemedial = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setIsSuccess(false);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analisis Pemahaman</h1>
        <p className="text-slate-500 font-medium">Visualisasi performa kelas berdasarkan topik materi.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
          <h2 className="font-bold text-slate-800 mb-8">Rata-rata Skor per Topik</h2>
          
          {/* ========================================================= */}
          {/* BAGIAN CHART YANG DIPERBAIKI (Tinggi dikunci menggunakan h-48) */}
          <div className="flex items-end justify-between flex-1 gap-4 px-4 mt-2">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                <div className="w-full flex justify-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded-lg">{data.skor}%</span>
                </div>
                {/* Kotak abu-abu (Background Bar) */}
                <div className="w-full max-w-[4rem] h-48 bg-slate-100 rounded-t-xl relative flex items-end overflow-hidden">
                  {/* Batang Warna (Foreground Bar) */}
                  <div 
                    className="w-full rounded-t-xl transition-all duration-1000 ease-out" 
                    style={{ height: `${data.skor}%`, backgroundColor: data.color }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 mt-4 text-center">{data.topik}</span>
              </div>
            ))}
          </div>
          {/* ========================================================= */}

        </div>

        <div className="space-y-6">
          <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-center">
            <h3 className="font-bold text-red-600 mb-2 uppercase text-xs tracking-widest">Topik Paling Kritis</h3>
            <p className="text-3xl font-black text-red-600 mb-6">Recursion</p>
            <p className="text-sm text-red-500/80 mb-6 font-medium">65% mahasiswa mendapatkan skor di bawah KKM pada topik ini.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-red-200"
            >
              Buat Remedial Massal
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Mahasiswa Underperform</h3>
            <div className="space-y-3">
              {initialMhsList.filter(m => m.skor < 75).map(mhs => (
                <div key={mhs.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{mhs.nama}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{mhs.id}</p>
                  </div>
                  <span className="text-red-500 font-black">{mhs.skor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL REMEDIAL MASSAL */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
              <button onClick={() => !isGenerating && setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <div>
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 text-center mb-2">Remedial AI Terpadu</h3>
                  <p className="text-slate-500 text-center mb-6 text-sm font-medium">
                    Sistem akan membuat modul latihan adaptif topik <span className="font-bold text-red-500">Recursion</span>.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Target Notifikasi:</p>
                    <ul className="text-sm font-bold text-slate-700 space-y-2">
                      {initialMhsList.filter(m => m.skor < 75).map(mhs => (
                        <li key={mhs.id} className="flex justify-between">
                          <span>• {mhs.nama}</span>
                          <span className="text-red-500">{mhs.skor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowModal(false)}
                      disabled={isGenerating}
                      className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-50"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleBuatRemedial}
                      disabled={isGenerating}
                      className="flex-[2] bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-80"
                    >
                      {isGenerating ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Generate & Kirim</>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Berhasil!</h3>
                  <p className="text-slate-500 font-medium text-sm">
                    Modul remedial berhasil di-generate dan dikirim ke dashboard mahasiswa.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB MATERI ──────────────────────────────────────────────────────────────
function TabMateri() {
  const [materi, setMateri] = useState(initialMateriList);
  
  // State untuk form Tambah Materi
  const [showForm, setShowForm] = useState(false);
  const [newMateri, setNewMateri] = useState({ judul: '', tipe: 'Video & PDF' });

  // State untuk form Edit Materi
  const [editingMateri, setEditingMateri] = useState(null);

  // Fungsi Tambah Data
  const handleAdd = () => {
    if(!newMateri.judul) return;
    setMateri([...materi, { 
      id: Date.now(), 
      judul: newMateri.judul, 
      tipe: newMateri.tipe, 
      status: 'Draft', 
      views: 0 
    }]);
    setNewMateri({ judul: '', tipe: 'Video & PDF' });
    setShowForm(false);
  };

  // Fungsi Hapus Data
  const handleDelete = (id) => {
    setMateri(materi.filter(m => m.id !== id));
  };

  // Fungsi Simpan Edit Data
  const handleSaveEdit = () => {
    if(!editingMateri.judul) return;
    // Update data array lama dengan data yang baru diedit
    setMateri(materi.map(m => m.id === editingMateri.id ? editingMateri : m));
    setEditingMateri(null); // Tutup modal edit
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Materi & Topik</h1>
          <p className="text-slate-500 font-medium">Kelola modul pembelajaran untuk kelas IF-44-01</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-colors active:scale-95"
        >
          <Plus className="w-5 h-5" /> Tambah Materi Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {materi.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${m.status === 'Published' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{m.judul}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${m.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {m.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Tipe: {m.tipe}</span>
                  <span className="text-xs text-slate-500 font-medium">• Dilihat: {m.views}/32 mhs</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingMateri(m)} // Membuka modal edit dengan data materi saat ini
                className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 active:scale-95"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(m.id)} 
                className="p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-red-500 active:scale-95"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL TAMBAH MATERI ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-6">Tambah Materi Baru</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Modul</label>
                <input 
                  type="text" 
                  value={newMateri.judul}
                  onChange={(e) => setNewMateri({...newMateri, judul: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400"
                  placeholder="Contoh: Bab 5 - Sorting Algorithm"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipe Materi</label>
                <select 
                  value={newMateri.tipe}
                  onChange={(e) => setNewMateri({...newMateri, tipe: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400"
                >
                  <option>Video & PDF</option>
                  <option>Modul Interaktif</option>
                  <option>Video & Kuis</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm transition-colors hover:bg-slate-200">Batal</button>
              <button onClick={handleAdd} className="flex-1 bg-red-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-red-200 transition-colors hover:bg-red-700">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT MATERI ================= */}
      {editingMateri && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setEditingMateri(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-6">Edit Materi & Topik</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Modul</label>
                <input 
                  type="text" 
                  value={editingMateri.judul}
                  onChange={(e) => setEditingMateri({...editingMateri, judul: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipe Materi</label>
                <select 
                  value={editingMateri.tipe}
                  onChange={(e) => setEditingMateri({...editingMateri, tipe: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
                >
                  <option>Video & PDF</option>
                  <option>Modul Interaktif</option>
                  <option>Video & Kuis</option>
                  <option>Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status Visibilitas</label>
                <select 
                  value={editingMateri.status}
                  onChange={(e) => setEditingMateri({...editingMateri, status: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400"
                >
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditingMateri(null)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm transition-colors hover:bg-slate-200">Batal</button>
              {/* Tombol Simpan di mode Edit menggunakan warna biru agar terlihat beda secara UX */}
              <button onClick={handleSaveEdit} className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-200 transition-colors hover:bg-blue-700 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── TAB KUIS & NILAI ────────────────────────────────────────────────────────
function TabKuis() {
  const [kuis, setKuis] = useState(initialKuisList);
  const [showForm, setShowForm] = useState(false);
  const [newKuis, setNewKuis] = useState('');
  
  // State baru untuk modal Lihat Nilai
  const [viewingKuis, setViewingKuis] = useState(null);

  const handleAdd = () => {
    if(!newKuis) return;
    setKuis([...kuis, { id: Date.now(), judul: newKuis, deadline: 'Belum diatur', kumpul: 0, rata: 0 }]);
    setNewKuis('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kuis & Penilaian</h1>
          <p className="text-slate-500 font-medium">Buat evaluasi dan pantau nilai mahasiswa</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors active:scale-95">
            <Download className="w-5 h-5" /> Export Rekap
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-colors active:scale-95"
          >
            <Plus className="w-5 h-5" /> Buat Kuis Baru
          </button>
        </div>
      </div>

      {/* Tabel Kuis Utama */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-5 pl-6">Judul Evaluasi</th>
              <th className="p-5">Batas Waktu</th>
              <th className="p-5">Pengumpulan</th>
              <th className="p-5">Rata-rata Skor</th>
              <th className="p-5 text-right pr-6">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {kuis.map((k, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors animate-in fade-in duration-300">
                <td className="p-5 pl-6 font-bold text-slate-800">{k.judul}</td>
                <td className="p-5 text-slate-500 font-medium">{k.deadline}</td>
                <td className="p-5">
                  <span className="font-bold text-slate-800">{k.kumpul}</span>
                  <span className="text-slate-400 text-xs"> / 32 mhs</span>
                </td>
                <td className="p-5">
                  <span className={`font-bold ${k.rata >= 75 ? 'text-emerald-600' : k.rata > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                    {k.rata > 0 ? k.rata : '-'}
                  </span>
                </td>
                <td className="p-5 text-right pr-6 flex justify-end gap-2">
                  <button 
                    onClick={() => setViewingKuis(k)} // Membuka modal detail nilai
                    className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors active:scale-95"
                  >
                    Lihat Nilai
                  </button>
                  <button onClick={() => setKuis(kuis.filter(item => item.id !== k.id))} className="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-xl transition-colors active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL BUAT KUIS BARU ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-slate-800 mb-6">Buat Kuis Baru</h3>
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Evaluasi</label>
              <input 
                type="text" 
                value={newKuis}
                onChange={(e) => setNewKuis(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400"
                placeholder="Contoh: Kuis 2 Algoritma"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl text-sm transition-colors hover:bg-slate-200">Batal</button>
              <button onClick={handleAdd} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-red-200 transition-colors hover:bg-red-700">Buat Draft</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL LIHAT NILAI ================= */}
      {viewingKuis && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setViewingKuis(null)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Rekap Nilai Mahasiswa</h3>
              <p className="text-slate-500 font-medium">{viewingKuis.judul}</p>
            </div>

            {/* Statistik Singkat */}
            <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pengumpulan</p>
                <p className="text-2xl font-black text-slate-700">{viewingKuis.kumpul} <span className="text-sm font-medium text-slate-400">/ 32 mhs</span></p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rata-rata Skor</p>
                <p className={`text-2xl font-black ${viewingKuis.rata >= 75 ? 'text-emerald-600' : viewingKuis.rata > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                  {viewingKuis.rata > 0 ? viewingKuis.rata : 'Belum ada data'}
                </p>
              </div>
            </div>

            {/* Tabel Nilai Mahasiswa */}
            <div className="flex-1 overflow-y-auto border border-slate-100 rounded-[1.5rem]">
              <table className="w-full text-left text-sm relative">
                <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest sticky top-0">
                  <tr>
                    <th className="p-4 pl-6">Mahasiswa</th>
                    <th className="p-4">Waktu Kumpul</th>
                    <th className="p-4">Skor Kuis</th>
                    <th className="p-4 text-right pr-6">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {viewingKuis.kumpul === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-10 text-center text-slate-400 font-medium">Belum ada mahasiswa yang mengumpulkan kuis ini.</td>
                    </tr>
                  ) : (
                    initialMhsList.map((mhs, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                            {mhs.nama.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{mhs.nama}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{mhs.id}</p>
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 text-xs font-medium">Hari ini, 14:30 WIB</td>
                        <td className="p-4">
                          <span className={`font-black ${mhs.skor >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {mhs.skor}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <button 
                            onClick={() => alert(`Membuka form feedback untuk ${mhs.nama}`)}
                            className="text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-semibold text-xs active:scale-95"
                          >
                            Beri Feedback
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB DATA MAHASISWA LENGKAP ──────────────────────────────────────────────
function TabMahasiswa() {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Direktori Mahasiswa</h1>
          <p className="text-slate-500 font-medium">Kelola data seluruh mahasiswa di kelas ini.</p>
        </div>
        <div className="relative w-72">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari NIM / Nama..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-red-400 shadow-sm transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-5 pl-6">Profil Mahasiswa</th>
              <th className="p-5">Kehadiran</th>
              <th className="p-5">Mastery Index</th>
              <th className="p-5">Status Akademik</th>
              <th className="p-5">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {initialMhsList.filter(m => m.nama.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search)).map((mhs, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-5 pl-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    {mhs.nama.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{mhs.nama}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{mhs.id}</p>
                  </div>
                </td>
                <td className="p-5 font-bold text-slate-700">{mhs.hadir}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-700 w-6">{mhs.skor}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full w-24">
                      <div className={`h-full rounded-full ${mhs.skor >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${mhs.skor}%` }} />
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest ${
                    mhs.status === 'Aman' ? 'bg-emerald-50 text-emerald-600' : 
                    mhs.status === 'Kritis' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {mhs.status}
                  </span>
                </td>
                <td className="p-5">
                  <button 
                    onClick={() => setSelectedStudent(mhs)}
                    className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" 
                    title="Lihat Raport"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}

// ─── TAB REKOMENDASI AI ──────────────────────────────────────────────────────
function TabRekomendasi() {
  const [status, setStatus] = useState('idle'); // idle, loading, success untuk Soal Remedial
  
  // State untuk Modal Pengumuman
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [announceStatus, setAnnounceStatus] = useState('idle');
  const [announceText, setAnnounceText] = useState(
    'Halo kelas IF-44-01,\n\nBerdasarkan hasil evaluasi terakhir, sistem mendeteksi banyak dari kalian yang masih terkendala pada pemahaman konsep "Call Stack dalam Rekursi".\n\nSebagai penguatan materi, Bapak akan mengirimkan modul visualisasi interaktif ke dashboard kalian masing-masing. Tolong dipelajari sebelum pertemuan kita selanjutnya ya.\n\nTetap semangat!\nDr. Reza Aditya'
  );

  // Fungsi Action Soal Remedial
  const handleGenerate = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 2500); 
  };

  // Fungsi Action Kirim Pengumuman
  const handleSendAnnounce = () => {
    if (!announceText) return;
    setAnnounceStatus('loading');
    // Simulasi proses pengiriman selama 1.5 detik
    setTimeout(() => {
      setAnnounceStatus('success');
      // Tutup otomatis setelah 2 detik
      setTimeout(() => {
        setShowAnnounceModal(false);
        setAnnounceStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="h-[75vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-500" /> AI Insights
        </h1>
        <p className="text-slate-500 font-medium">Asisten pintar untuk strategi pengajaran adaptif Anda.</p>
      </header>

      <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[3rem] p-10 border border-purple-100 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        {status === 'success' ? (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Soal Remedial Siap!</h2>
            <p className="text-slate-600 font-medium mb-8">AI telah membuat 5 soal interaktif khusus materi Call Stack.</p>
            <button onClick={() => setStatus('idle')} className="bg-white border border-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all text-sm active:scale-95">
              Buat Rekomendasi Baru
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <Sparkles className={`w-16 h-16 text-purple-400 mb-6 ${status === 'loading' ? 'animate-spin' : 'animate-pulse'}`} />
            <h2 className="text-2xl font-black text-slate-800 mb-4 max-w-lg leading-tight">
              Sistem mendeteksi pola kebingungan pada materi <span className="text-purple-600">"Call Stack dalam Rekursi"</span>.
            </h2>
            <p className="text-slate-600 mb-10 max-w-xl font-medium leading-relaxed">
              Berdasarkan analisis jawaban salah dari 12 mahasiswa, mereka kesulitan memvisualisasikan bagaimana fungsi ditumpuk di memori. Sistem menyarankan pendekatan visual.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={handleGenerate}
                disabled={status === 'loading'}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-purple-200 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-80"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Menganalisis Data...</>
                ) : (
                  <><FileText className="w-5 h-5" /> Generate Soal Remedial AI</>
                )}
              </button>
              <button 
                onClick={() => setShowAnnounceModal(true)}
                className="bg-white border border-purple-100 text-purple-600 font-bold px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                Buat Pengumuman Kelas
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL BUAT PENGUMUMAN ================= */}
      {showAnnounceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
            <button 
              onClick={() => !announceStatus.includes('loading') && setShowAnnounceModal(false)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            {announceStatus === 'success' ? (
              <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Terkirim!</h3>
                <p className="text-slate-500 font-medium text-sm">
                  Pengumuman berhasil dikirim (Broadccast) ke dashboard seluruh mahasiswa IF-44-01.
                </p>
              </div>
            ) : (
              <div className={`transition-opacity duration-300 ${announceStatus === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Pengumuman Kelas</h3>
                <p className="text-slate-500 text-sm font-medium mb-6">Sistem telah membuat draf otomatis berdasarkan hasil deteksi AI.</p>
                
                <div className="mb-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-1 mb-2">
                    <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-200">
                      Kepada: <span className="text-slate-800">Semua Mahasiswa (IF-44-01)</span>
                    </div>
                    <textarea 
                      value={announceText}
                      onChange={(e) => setAnnounceText(e.target.value)}
                      className="w-full bg-transparent p-3 text-sm text-slate-700 outline-none resize-none min-h-[160px] font-medium leading-relaxed"
                      placeholder="Ketik pengumuman di sini..."
                    />
                  </div>
                  <p className="text-[10px] font-bold text-purple-500 text-right flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3" /> Auto-drafted by AI
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowAnnounceModal(false)} 
                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-colors text-sm hover:bg-slate-50 active:scale-95"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleSendAnnounce}
                    disabled={announceStatus === 'loading'}
                    className="flex-[2] bg-purple-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-purple-200 transition-colors text-sm hover:bg-purple-700 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-80"
                  >
                    {announceStatus === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                    ) : (
                      'Kirim Pengumuman'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function DosenPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard': return <TabDashboard />;
      case 'analisis': return <TabAnalisis />;
      case 'rekomendasi': return <TabRekomendasi />;
      case 'materi': return <TabMateri />;
      case 'nilai': return <TabKuis />;
      case 'mahasiswa': return <TabMahasiswa />;
      default: return <TabDashboard />;
    }
  };

  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-12 bg-slate-50 min-h-full">
      {renderContent()}
    </div>
  );
}