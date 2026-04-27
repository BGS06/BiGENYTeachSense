'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Users, Activity, AlertCircle, Search, TrendingUp, Sparkles,
  CheckCircle, Loader2, X, Mail, Target, BookX, BookOpen,
  Edit, Trash2, Plus, Eye, Download, FileText, ChevronDown, 
  BookKey, MessageSquare, Save, Upload
} from 'lucide-react';
import { useState } from 'react';

// ─── DUMMY DATA LENGKAP (MULTI-KELAS) ────────────────────────────────────────
const initialClassesData = [
  {
    id: 'IF-44-01',
    nama: 'IF-44-01',
    matkul: 'Struktur Data & Algoritma',
    topikKritis: 'Recursion',
    topikKritisDesc: '65% mahasiswa mendapatkan skor di bawah KKM pada topik ini.',
    students: [
      { id: '130121001', nama: 'Efran Gustine', skor: 42, hadir: '100%', tren: 'down', lemah: 'Recursion' },
      { id: '130121002', nama: 'Amanda Shafira', skor: 88, hadir: '100%', tren: 'up', lemah: 'Tree' },
      { id: '130121003', nama: 'Bima Satria', skor: 76, hadir: '85%', tren: 'up', lemah: 'Sorting' },
      { id: '130121004', nama: 'Cindy Aulia', skor: 65, hadir: '100%', tren: 'down', lemah: 'Arrays' },
      { id: '130121005', nama: 'Dimas Pratama', skor: 92, hadir: '100%', tren: 'up', lemah: 'Graph' },
      { id: '130121006', nama: 'Fajar Nugroho', skor: 58, hadir: '90%', tren: 'down', lemah: 'Logic' },
      { id: '130121007', nama: 'Gita Permata', skor: 85, hadir: '100%', tren: 'up', lemah: 'OOP' },
      { id: '130121008', nama: 'Hadi Sucipto', skor: 68, hadir: '80%', tren: 'down', lemah: 'Recursion' },
      { id: '130121009', nama: 'Indah Pertiwi', skor: 78, hadir: '100%', tren: 'up', lemah: 'Arrays' },
      { id: '130121010', nama: 'Joko Anwar', skor: 80, hadir: '100%', tren: 'up', lemah: 'Sorting' },
      { id: '130121011', nama: 'Kevin Sanjaya', skor: 95, hadir: '100%', tren: 'up', lemah: 'Graph' },
      { id: '130121012', nama: 'Lesti Kejora', skor: 72, hadir: '100%', tren: 'up', lemah: 'OOP' },
      { id: '130121013', nama: 'Muhammad Iqbal', skor: 84, hadir: '85%', tren: 'down', lemah: 'Logic' },
      { id: '130121014', nama: 'Nadia Vega', skor: 79, hadir: '100%', tren: 'up', lemah: 'Tree' },
      { id: '130121015', nama: 'Oscar Lawalata', skor: 81, hadir: '100%', tren: 'up', lemah: 'Arrays' },
      { id: '130121016', nama: 'Putri Marino', skor: 89, hadir: '100%', tren: 'up', lemah: 'Recursion' },
      { id: '130121017', nama: 'Qori Sandi', skor: 75, hadir: '90%', tren: 'down', lemah: 'Sorting' },
      { id: '130121018', nama: 'Reza Rahadian', skor: 91, hadir: '100%', tren: 'up', lemah: 'Graph' },
      { id: '130121019', nama: 'Siska Salman', skor: 83, hadir: '100%', tren: 'up', lemah: 'OOP' },
      { id: '130121020', nama: 'Tora Sudiro', skor: 77, hadir: '100%', tren: 'up', lemah: 'Logic' },
      { id: '130121021', nama: 'Uus', skor: 70, hadir: '100%', tren: 'down', lemah: 'Tree' },
      { id: '130121022', nama: 'Vidi Aldiano', skor: 82, hadir: '85%', tren: 'up', lemah: 'Arrays' },
      { id: '130121023', nama: 'Wika Salim', skor: 86, hadir: '100%', tren: 'up', lemah: 'Recursion' },
      { id: '130121024', nama: 'Xena', skor: 90, hadir: '100%', tren: 'up', lemah: 'Sorting' },
      { id: '130121025', nama: 'Yuni Shara', skor: 74, hadir: '100%', tren: 'down', lemah: 'Graph' },
      { id: '130121026', nama: 'Zaskia Gotik', skor: 87, hadir: '90%', tren: 'up', lemah: 'OOP' },
      { id: '130121027', nama: 'Ahmad Dhani', skor: 73, hadir: '100%', tren: 'up', lemah: 'Logic' },
      { id: '130121028', nama: 'Bunga Citra', skor: 94, hadir: '100%', tren: 'up', lemah: 'Tree' },
      { id: '130121029', nama: 'Chelsea Islan', skor: 88, hadir: '80%', tren: 'down', lemah: 'Arrays' },
      { id: '130121030', nama: 'Deddy Corbuzier', skor: 71, hadir: '100%', tren: 'up', lemah: 'Recursion' },
      { id: '130121031', nama: 'Ello', skor: 85, hadir: '100%', tren: 'up', lemah: 'Sorting' },
      { id: '130121032', nama: 'Fatin Shidqia', skor: 93, hadir: '100%', tren: 'up', lemah: 'Graph' },
    ],
    materi: [
      { id: 1, judul: 'Bab 1: Pengenalan Logika Dasar', tipe: 'Video & PDF', status: 'Published', views: 32 },
      { id: 2, judul: 'Bab 2: Struktur Data Array', tipe: 'Modul Interaktif', status: 'Published', views: 32 },
      { id: 3, judul: 'Bab 3: Fungsi Rekursif & Call Stack', tipe: 'Video & Kuis', status: 'Published', views: 28 },
      { id: 4, judul: 'Bab 4: Object Oriented Programming', tipe: 'Draft', status: 'Draft', views: 0 },
    ],
    kuis: [
      { id: 1, judul: 'Kuis 1: Pemahaman Array', deadline: '12 Apr 2026', kumpul: 32, rata: 85 },
      { id: 2, judul: 'Tugas Praktikum: Rekursif', deadline: '20 Apr 2026', kumpul: 28, rata: 62 },
      { id: 3, judul: 'Ujian Tengah Semester (UTS)', deadline: '30 Apr 2026', kumpul: 0, rata: 0 },
    ],
    chart: [
      { topik: 'Logic', skor: 85, color: '#10b981' },
      { topik: 'Arrays', skor: 68, color: '#fb923c' },
      { topik: 'Recursion', skor: 42, color: '#ef4444' },
      { topik: 'OOP', skor: 78, color: '#34d399' },
      { topik: 'Tree', skor: 55, color: '#f97316' },
    ]
  },
  {
    id: 'IF-44-02',
    nama: 'IF-44-02',
    matkul: 'Pemrograman Web Frontend',
    topikKritis: 'JavaScript DOM',
    topikKritisDesc: 'Sistem mendeteksi mahasiswa kesulitan memanipulasi elemen DOM dan menggunakan Event Listener.',
    students: [
      { id: '130121051', nama: 'Rizky Febian', skor: 55, hadir: '90%', tren: 'down', lemah: 'JavaScript DOM' },
      { id: '130121052', nama: 'Mahalini', skor: 92, hadir: '100%', tren: 'up', lemah: 'React State' },
      { id: '130121053', nama: 'Tiara Andini', skor: 85, hadir: '100%', tren: 'up', lemah: 'CSS Grid' },
      { id: '130121054', nama: 'Lyodra Ginting', skor: 68, hadir: '85%', tren: 'down', lemah: 'JavaScript DOM' },
      { id: '130121055', nama: 'Ziva Magnolya', skor: 88, hadir: '100%', tren: 'up', lemah: 'API Fetch' },
      { id: '130121056', nama: 'Keisya Levronka', skor: 94, hadir: '100%', tren: 'up', lemah: 'CSS Animations' },
      { id: '130121057', nama: 'Marion Jola', skor: 62, hadir: '80%', tren: 'down', lemah: 'JavaScript DOM' },
      { id: '130121058', nama: 'Brisia Jodie', skor: 78, hadir: '100%', tren: 'up', lemah: 'API Fetch' },
    ],
    materi: [
      { id: 1, judul: 'Bab 1: Semantic HTML & Accessibility', tipe: 'Video & PDF', status: 'Published', views: 8 },
      { id: 2, judul: 'Bab 2: Advanced CSS (Flexbox & Grid)', tipe: 'Modul Interaktif', status: 'Published', views: 8 },
      { id: 3, judul: 'Bab 3: JavaScript DOM Manipulation', tipe: 'Video & Kuis', status: 'Published', views: 6 },
    ],
    kuis: [
      { id: 1, judul: 'Kuis Praktik Layouting CSS', deadline: '15 Apr 2026', kumpul: 8, rata: 88 },
      { id: 2, judul: 'Mini Project: To-Do List (JS DOM)', deadline: '25 Apr 2026', kumpul: 5, rata: 65 },
    ],
    chart: [
      { topik: 'HTML', skor: 95, color: '#10b981' },
      { topik: 'CSS Layout', skor: 88, color: '#34d399' },
      { topik: 'JS DOM', skor: 55, color: '#ef4444' },
      { topik: 'React.js', skor: 0, color: '#94a3b8' },
    ]
  },
  {
    id: 'IT-45-01',
    nama: 'IT-45-01',
    matkul: 'Basis Data',
    topikKritis: 'SQL JOIN',
    topikKritisDesc: 'Mahasiswa masih sering tertukar antara INNER JOIN, LEFT JOIN, dan RIGHT JOIN saat mengambil relasi data.',
    students: [
      { id: '130122001', nama: 'Andi Rianto', skor: 48, hadir: '100%', tren: 'down', lemah: 'SQL JOIN' },
      { id: '130122002', nama: 'Siti Nurhaliza', skor: 82, hadir: '100%', tren: 'up', lemah: 'Normalization' },
      { id: '130122003', nama: 'Bagus Prakoso', skor: 65, hadir: '90%', tren: 'down', lemah: 'SQL JOIN' },
      { id: '130122004', nama: 'Dian Sastro', skor: 95, hadir: '100%', tren: 'up', lemah: 'Indexing' },
      { id: '130122005', nama: 'Eko Patrio', skor: 58, hadir: '80%', tren: 'down', lemah: 'SQL JOIN' },
    ],
    materi: [
      { id: 1, judul: 'Pertemuan 1: ERD & Relasi', tipe: 'Video & PDF', status: 'Published', views: 5 },
      { id: 2, judul: 'Pertemuan 2: Normalisasi Data', tipe: 'Modul Interaktif', status: 'Published', views: 5 },
      { id: 3, judul: 'Pertemuan 3: Query SQL Dasar & JOIN', tipe: 'Video & Kuis', status: 'Published', views: 4 },
    ],
    kuis: [
      { id: 1, judul: 'Kuis 1: Mendesain ERD', deadline: '10 Apr 2026', kumpul: 5, rata: 85 },
      { id: 2, judul: 'Tugas Praktikum: Relasi & JOIN', deadline: '22 Apr 2026', kumpul: 4, rata: 60 },
    ],
    chart: [
      { topik: 'ERD', skor: 90, color: '#10b981' },
      { topik: 'Normalisasi', skor: 82, color: '#34d399' },
      { topik: 'SQL Dasar', skor: 75, color: '#fb923c' },
      { topik: 'SQL JOIN', skor: 48, color: '#ef4444' },
    ]
  }
];

// ─── KOMPONEN MODAL DETAIL MAHASISWA REUSABLE ────────────────────────────────
function StudentDetailModal({ student, onClose }) {
  const [status, setStatus] = useState('idle');

  if (!student) return null;

  const handleAssign = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
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
          <div className={`transition-opacity duration-300 ${status === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 mb-8 mt-2">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                student.skor < 70 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {student.nama.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{student.nama}</h2>
                <p className="text-slate-400 font-mono text-xs">{student.id}</p>
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

// ─── TAB DASHBOARD KELAS ─────────────────────────────────────────────────────
function TabDashboard({ activeClass }) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  
  const atRiskStudents = activeClass.students.filter(m => m.skor < 70);
  const totalSkor = activeClass.students.reduce((acc, curr) => acc + curr.skor, 0);
  const avgSkor = activeClass.students.length > 0 ? (totalSkor / activeClass.students.length).toFixed(1) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Data Kelas: {activeClass.nama}</h1>
        <p className="text-slate-500 font-medium">Mata Kuliah: {activeClass.matkul}</p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Mahasiswa</p>
            <p className="text-3xl font-black text-slate-800">{activeClass.students.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Rata-rata Kelas</p>
            <p className="text-3xl font-black text-slate-800">{avgSkor}</p>
          </div>
        </div>
        
        {/* KARTU BUTUH PERHATIAN (INTERAKTIF) */}
        <div 
          onClick={() => setShowAttentionModal(true)}
          className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-red-100 hover:shadow-md hover:border-red-200 transition-all active:scale-95 group"
        >
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-red-400 uppercase tracking-widest">Butuh Perhatian</p>
            <p className="text-3xl font-black text-red-600 flex items-baseline gap-1">
              {atRiskStudents.length} <span className="text-sm font-bold text-red-400 mb-1">mhs (Klik)</span>
            </p>
          </div>
        </div>
      </div>

      {/* TABLE PREVIEW MAHASISWA */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 shrink-0">
          <h2 className="font-bold text-slate-800">Preview Mahasiswa</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari NIM / Nama..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-400 shadow-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-slate-50/95 backdrop-blur-sm text-xs font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-4 pl-6 border-b border-slate-100">Mahasiswa</th>
                <th className="p-4 border-b border-slate-100">Skor Rata-rata</th>
                <th className="p-4 border-b border-slate-100">Status</th>
                <th className="p-4 text-right pr-6 border-b border-slate-100">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeClass.students
                .filter(m => m.nama.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search))
                .map((mhs, idx) => (
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
                      mhs.skor < 70 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {mhs.skor < 70 ? 'Kritis' : 'Aman'}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button 
                      onClick={() => setSelectedStudent(mhs)}
                      className="text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors font-semibold text-xs inline-flex items-center gap-1 active:scale-95 border border-transparent hover:border-blue-100"
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

      {/* ================= MODAL MAHASISWA BUTUH PERHATIAN ================= */}
      {showAttentionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
            <button 
              onClick={() => setShowAttentionModal(false)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">Butuh Perhatian</h2>
                <p className="text-slate-500 text-sm font-medium">Daftar mahasiswa dengan skor di bawah KKM (70).</p>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {atRiskStudents.length === 0 ? (
                 <p className="text-center text-slate-400 font-medium py-4">Semua mahasiswa di kelas ini dalam status Aman.</p>
              ) : atRiskStudents.map(mhs => (
                <div key={mhs.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{mhs.nama}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{mhs.id} · Kendala: <span className="text-red-500 font-bold">{mhs.lemah}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-red-600">{mhs.skor}</span>
                    <button 
                      onClick={() => {
                        setShowAttentionModal(false);
                        setSelectedStudent(mhs);
                      }}
                      className="bg-white border border-slate-200 text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <button 
                onClick={() => setShowAttentionModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                Tutup Daftar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Detail Modal Khusus Mahasiswa */}
      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}

// ─── TAB ANALISIS KELAS ──────────────────────────────────────────────────────
function TabAnalisis({ activeClass, setClasses }) {
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const atRiskStudents = activeClass.students.filter(m => m.skor < 70);

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
          
          <div className="flex items-end justify-between flex-1 gap-4 px-4 mt-2">
            {activeClass.chart.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                <div className="w-full flex justify-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded-lg">{data.skor}%</span>
                </div>
                <div className="w-full max-w-[4rem] h-48 bg-slate-100 rounded-t-xl relative flex items-end overflow-hidden">
                  <div 
                    className="w-full rounded-t-xl transition-all duration-1000 ease-out" 
                    style={{ height: `${data.skor}%`, backgroundColor: data.color }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 mt-4 text-center truncate w-full px-1" title={data.topik}>{data.topik}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-center">
            <h3 className="font-bold text-red-600 mb-2 uppercase text-xs tracking-widest">Topik Paling Kritis</h3>
            <p className="text-3xl font-black text-red-600 mb-6">{activeClass.topikKritis}</p>
            <p className="text-sm text-red-500/80 mb-6 font-medium">{activeClass.topikKritisDesc}</p>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-red-200"
            >
              Buat Remedial Massal
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Mahasiswa Underperform</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {atRiskStudents.length === 0 ? (
                 <p className="text-sm text-slate-400 font-medium">Semua mahasiswa aman.</p>
              ) : atRiskStudents.map(mhs => (
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
              <button onClick={() => !isGenerating && setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95">
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <div>
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 text-center mb-2">Remedial AI Terpadu</h3>
                  <p className="text-slate-500 text-center mb-6 text-sm font-medium">
                    Sistem akan membuat modul latihan adaptif topik <span className="font-bold text-red-500">{activeClass.topikKritis}</span>.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Target Notifikasi:</p>
                    <ul className="text-sm font-bold text-slate-700 space-y-2 max-h-32 overflow-y-auto pr-2">
                      {atRiskStudents.length === 0 ? <li className="text-slate-400">Tidak ada mahasiswa kritis.</li> : atRiskStudents.map(mhs => (
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
                      disabled={isGenerating || atRiskStudents.length === 0}
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
                  <p className="text-slate-500 font-medium text-sm">Modul remedial berhasil di-generate dan dikirim ke dashboard mahasiswa.</p>
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
function TabMateri({ activeClass, setClasses }) {
  const [showForm, setShowForm] = useState(false);
  const [newMateri, setNewMateri] = useState({ judul: '', tipe: 'Video & PDF' });
  const [editingMateri, setEditingMateri] = useState(null);

  const handleAdd = () => {
    if(!newMateri.judul) return;
    const newM = { id: Date.now(), judul: newMateri.judul, tipe: newMateri.tipe, status: 'Draft', views: 0 };
    setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, materi: [...c.materi, newM] } : c));
    setNewMateri({ judul: '', tipe: 'Video & PDF' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, materi: c.materi.filter(m => m.id !== id) } : c));
  };

  const handleSaveEdit = () => {
    if(!editingMateri.judul) return;
    setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, materi: c.materi.map(m => m.id === editingMateri.id ? editingMateri : m) } : c));
    setEditingMateri(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Materi & Topik</h1>
          <p className="text-slate-500 font-medium">Kelola modul pembelajaran untuk kelas {activeClass.nama}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-colors active:scale-95">
          <Plus className="w-5 h-5" /> Tambah Materi Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeClass.materi.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center text-slate-500 font-medium">Belum ada materi untuk kelas ini.</div>
        ) : activeClass.materi.map((m) => (
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
                  <span className="text-xs text-slate-500 font-medium">• Dilihat: {m.views}/{activeClass.students.length} mhs</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingMateri(m)} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 active:scale-95">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(m.id)} className="p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-red-500 active:scale-95">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-black text-slate-800 mb-6">Tambah Materi Baru</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Modul</label>
                <input type="text" value={newMateri.judul} onChange={(e) => setNewMateri({...newMateri, judul: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400" placeholder="Contoh: Bab 5 - Sorting Algorithm" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipe Materi</label>
                <select value={newMateri.tipe} onChange={(e) => setNewMateri({...newMateri, tipe: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400">
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

      {editingMateri && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setEditingMateri(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-black text-slate-800 mb-6">Edit Materi & Topik</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Modul</label>
                <input type="text" value={editingMateri.judul} onChange={(e) => setEditingMateri({...editingMateri, judul: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipe Materi</label>
                <select value={editingMateri.tipe} onChange={(e) => setEditingMateri({...editingMateri, tipe: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400">
                  <option>Video & PDF</option><option>Modul Interaktif</option><option>Video & Kuis</option><option>Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status Visibilitas</label>
                <select value={editingMateri.status} onChange={(e) => setEditingMateri({...editingMateri, status: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400">
                  <option>Published</option><option>Draft</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditingMateri(null)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-sm transition-colors hover:bg-slate-200">Batal</button>
              <button onClick={handleSaveEdit} className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-blue-200 transition-colors hover:bg-blue-700 flex items-center justify-center gap-2"><Edit className="w-4 h-4" /> Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB KUIS & NILAI ────────────────────────────────────────────────────────
function TabKuis({ activeClass, setClasses }) {
  const [showForm, setShowForm] = useState(false);
  const [newKuis, setNewKuis] = useState('');
  const [viewingKuis, setViewingKuis] = useState(null);

  const handleAdd = () => {
    if(!newKuis) return;
    const newK = { id: Date.now(), judul: newKuis, deadline: 'Belum diatur', kumpul: 0, rata: 0 };
    setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, kuis: [...c.kuis, newK] } : c));
    setNewKuis('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, kuis: c.kuis.filter(k => k.id !== id) } : c));
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kuis & Penilaian</h1>
          <p className="text-slate-500 font-medium">Buat evaluasi dan pantau nilai mahasiswa kelas {activeClass.nama}</p>
        </div>
        <div className="flex gap-3 ml-auto">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors active:scale-95">
            <Download className="w-5 h-5" /> Export Rekap
          </button>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md shadow-red-200 hover:bg-red-700 transition-colors active:scale-95">
            <Plus className="w-5 h-5" /> Buat Kuis Baru
          </button>
        </div>
      </div>

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
            {activeClass.kuis.length === 0 ? (
               <tr><td colSpan="5" className="p-10 text-center text-slate-500 font-medium">Belum ada evaluasi/kuis.</td></tr>
            ) : activeClass.kuis.map((k, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors animate-in fade-in duration-300">
                <td className="p-5 pl-6 font-bold text-slate-800">{k.judul}</td>
                <td className="p-5 text-slate-500 font-medium">{k.deadline}</td>
                <td className="p-5">
                  <span className="font-bold text-slate-800">{k.kumpul}</span>
                  <span className="text-slate-400 text-xs"> / {activeClass.students.length} mhs</span>
                </td>
                <td className="p-5">
                  <span className={`font-bold ${k.rata >= 75 ? 'text-emerald-600' : k.rata > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                    {k.rata > 0 ? k.rata : '-'}
                  </span>
                </td>
                <td className="p-5 text-right pr-6 flex justify-end gap-2">
                  <button onClick={() => setViewingKuis(k)} className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors active:scale-95">Lihat Nilai</button>
                  <button onClick={() => handleDelete(k.id)} className="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-xl transition-colors active:scale-95"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-slate-800 mb-6">Buat Kuis Baru</h3>
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Evaluasi</label>
              <input type="text" value={newKuis} onChange={(e) => setNewKuis(e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400" placeholder="Contoh: Kuis 2 Algoritma" autoFocus />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl text-sm transition-colors hover:bg-slate-200">Batal</button>
              <button onClick={handleAdd} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-red-200 transition-colors hover:bg-red-700">Buat Draft</button>
            </div>
          </div>
        </div>
      )}

      {viewingKuis && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setViewingKuis(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95"><X className="w-5 h-5" /></button>
            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Rekap Nilai Mahasiswa</h3>
              <p className="text-slate-500 font-medium">{viewingKuis.judul}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pengumpulan</p>
                <p className="text-2xl font-black text-slate-700">{viewingKuis.kumpul} <span className="text-sm font-medium text-slate-400">/ {activeClass.students.length} mhs</span></p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rata-rata Skor</p>
                <p className={`text-2xl font-black ${viewingKuis.rata >= 75 ? 'text-emerald-600' : viewingKuis.rata > 0 ? 'text-red-500' : 'text-slate-400'}`}>{viewingKuis.rata > 0 ? viewingKuis.rata : 'Belum ada data'}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto border border-slate-100 rounded-[1.5rem]">
              <table className="w-full text-left text-sm relative">
                <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10">
                  <tr><th className="p-4 pl-6 border-b border-slate-100">Mahasiswa</th><th className="p-4 border-b border-slate-100">Waktu Kumpul</th><th className="p-4 border-b border-slate-100">Skor Kuis</th><th className="p-4 text-right pr-6 border-b border-slate-100">Aksi</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {viewingKuis.kumpul === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-400 font-medium">Belum ada mahasiswa yang mengumpulkan kuis ini.</td></tr>
                  ) : (
                    activeClass.students.slice(0, viewingKuis.kumpul).map((mhs, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">{mhs.nama.substring(0, 2).toUpperCase()}</div>
                          <div><p className="font-bold text-slate-800">{mhs.nama}</p><p className="text-[10px] text-slate-400 font-mono">{mhs.id}</p></div>
                        </td>
                        <td className="p-4 text-slate-500 text-xs font-medium">Hari ini, 14:30 WIB</td>
                        <td className="p-4"><span className={`font-black ${mhs.skor >= 75 ? 'text-emerald-500' : 'text-red-500'}`}>{mhs.skor}</span></td>
                        <td className="p-4 text-right pr-6"><button onClick={() => alert(`Membuka form feedback untuk ${mhs.nama}`)} className="text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-semibold text-xs active:scale-95">Beri Feedback</button></td>
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

// ─── TAB DATA MAHASISWA ──────────────────────────────────────────────────────
function TabMahasiswa({ activeClass }) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Direktori Mahasiswa</h1>
          <p className="text-slate-500 font-medium">Kelola data seluruh mahasiswa di kelas {activeClass.nama}</p>
        </div>
        <div className="relative w-72">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" placeholder="Cari NIM / Nama..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-red-400 shadow-sm transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-slate-50/95 backdrop-blur-sm text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 sticky top-0 z-10">
              <tr><th className="p-5 pl-6">Profil Mahasiswa</th><th className="p-5">Kehadiran</th><th className="p-5">Mastery Index</th><th className="p-5">Status Akademik</th><th className="p-5">Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeClass.students.filter(m => m.nama.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search)).map((mhs, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 pl-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">{mhs.nama.substring(0, 2).toUpperCase()}</div>
                    <div><p className="font-bold text-slate-800">{mhs.nama}</p><p className="text-[11px] text-slate-400 font-mono mt-0.5">{mhs.id}</p></div>
                  </td>
                  <td className="p-5 font-bold text-slate-700">{mhs.hadir}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-slate-700 w-6">{mhs.skor}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full w-24"><div className={`h-full rounded-full ${mhs.skor >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${mhs.skor}%` }} /></div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest ${mhs.skor >= 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {mhs.skor >= 70 ? 'Aman' : 'Kritis'}
                    </span>
                  </td>
                  <td className="p-5">
                    <button onClick={() => setSelectedStudent(mhs)} className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 active:scale-95" title="Lihat Raport"><Eye className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}

// ─── TAB REKOMENDASI AI & EDITOR SOAL REMEDIAL ───────────────────────────────
function TabRekomendasi({ activeClass, setClasses }) {
  const [status, setStatus] = useState('idle');
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [announceStatus, setAnnounceStatus] = useState('idle');
  const [announceText, setAnnounceText] = useState(
    `Halo kelas ${activeClass.nama},\n\nBerdasarkan hasil evaluasi terakhir, sistem mendeteksi banyak dari kalian yang masih terkendala pada pemahaman konsep "${activeClass.topikKritis}".\n\nSebagai penguatan materi, Bapak akan mengirimkan modul visualisasi interaktif ke dashboard kalian masing-masing. Tolong dipelajari sebelum pertemuan kita selanjutnya ya.\n\nTetap semangat!\nDr. Reza Aditya`
  );

  // State untuk Quiz Editor
  const [quizEditorMode, setQuizEditorMode] = useState(null); // 'ai', 'manual', atau 'upload'
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isSavingQuiz, setIsSavingQuiz] = useState(false);
  
  // State untuk Upload File Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Generate Soal Dummy AI
  const getDummyAIQuestions = (topik) => [
    {
      id: 1,
      question: `Apa penyebab paling umum terjadinya bug terkait ${topik}?`,
      options: ['Kurangnya memory', 'Logika alur yang tidak terstruktur', 'Koneksi internet lambat', 'Typo pada nama variabel'],
      correct: 1
    },
    {
      id: 2,
      question: `Bagaimana cara terbaik menyelesaikan masalah pada materi ${topik}?`,
      options: ['Membaca dokumentasi ulang', 'Menghapus semua kode', 'Mengabaikan error', 'Mencetak variabel ke console (debug)'],
      correct: 3
    }
  ];

  const handleGenerateAI = () => { 
    setStatus('loading'); 
    setTimeout(() => { 
      setQuizQuestions(getDummyAIQuestions(activeClass.topikKritis));
      setQuizEditorMode('ai');
      setStatus('idle'); 
    }, 2000); 
  };

  // 2. Buat Soal Manual
  const handleBuatManual = () => {
    setQuizQuestions([{ id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }]);
    setQuizEditorMode('manual');
  };

  // 3. Ekstrak dari File (Simulasi)
  const handleFileUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
      // Dummy data dari hasil ekstraksi file
      setQuizQuestions([
        {
          id: Date.now() + 1,
          question: `Berikan analisis kompleks mengenai keterkaitan ${activeClass.topikKritis} dengan efisiensi memori (Berdasarkan Modul).`,
          options: ['Sangat Efisien', 'Memakan banyak memori stack', 'Menyebabkan infinite loop jika tanpa base case', 'Tidak berdampak pada memori'],
          correct: 1
        },
        {
          id: Date.now() + 2,
          question: `Kasus penggunaan manakah yang paling ideal untuk ${activeClass.topikKritis} di industri nyata?`,
          options: ['Pencarian data berurutan', 'Manipulasi struktur direktori file', 'Perhitungan aritmatika sederhana', 'Desain UI/UX'],
          correct: 1
        }
      ]);
      setQuizEditorMode('upload');
    }, 2000); // Simulasi proses loading ekstraksi 2 detik
  };

  // CRUD Editor
  const updateQuestion = (id, field, value) => {
    setQuizQuestions(qs => qs.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId, optIndex, value) => {
    setQuizQuestions(qs => qs.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options];
        newOpts[optIndex] = value;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  const handleAddQuestion = () => {
    setQuizQuestions([...quizQuestions, { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const handleDeleteQuestion = (id) => {
    setQuizQuestions(quizQuestions.filter(q => q.id !== id));
  };

  const handleSaveQuiz = () => {
    setIsSavingQuiz(true);
    setTimeout(() => {
      const newKuis = {
        id: Date.now(),
        judul: `Remedial: ${activeClass.topikKritis}`,
        deadline: 'Tenggat: 3 Hari kedepan',
        kumpul: 0,
        rata: 0
      };
      setClasses(prev => prev.map(c => c.id === activeClass.id ? { ...c, kuis: [newKuis, ...c.kuis] } : c));
      
      setIsSavingQuiz(false);
      setQuizEditorMode(null);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleSendAnnounce = () => {
    if (!announceText) return;
    setAnnounceStatus('loading');
    setTimeout(() => {
      setAnnounceStatus('success');
      setTimeout(() => { setShowAnnounceModal(false); setAnnounceStatus('idle'); }, 2000);
    }, 1500);
  };

  return (
    <div className="h-[75vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3"><Sparkles className="w-8 h-8 text-purple-500" /> AI Insights</h1>
        <p className="text-slate-500 font-medium">Asisten pintar untuk strategi pengajaran adaptif Anda.</p>
      </header>

      <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[3rem] p-10 border border-purple-100 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner mt-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        {status === 'success' ? (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10" /></div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Soal Remedial Siap Terdistribusi!</h2>
            <p className="text-slate-600 font-medium mb-8">AI telah berhasil mempublikasikan soal interaktif untuk materi {activeClass.topikKritis}.</p>
            <button onClick={() => setStatus('idle')} className="bg-white border border-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all text-sm active:scale-95">Buat Rekomendasi Baru</button>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <Sparkles className={`w-16 h-16 text-purple-400 mb-6 ${status === 'loading' ? 'animate-spin' : 'animate-pulse'}`} />
            <h2 className="text-2xl font-black text-slate-800 mb-4 max-w-lg leading-tight">Sistem mendeteksi pola kebingungan pada materi <span className="text-purple-600">"{activeClass.topikKritis}"</span>.</h2>
            <p className="text-slate-600 mb-10 max-w-xl font-medium leading-relaxed">{activeClass.topikKritisDesc} Sistem menyarankan pendekatan latihan spesifik (Micro-Assessment).</p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={handleGenerateAI} disabled={status === 'loading'} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-purple-200 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-80">
                {status === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Menganalisis Data...</> : <><Sparkles className="w-5 h-5" /> Generate AI Remedial</>}
              </button>
              
              <button onClick={handleBuatManual} disabled={status === 'loading'} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2 disabled:opacity-80">
                <Edit className="w-5 h-5" /> Buat Manual
              </button>
              
              <button onClick={() => setShowUploadModal(true)} disabled={status === 'loading'} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2 disabled:opacity-80">
                <Upload className="w-5 h-5" /> Upload File Soal
              </button>
              
              <button onClick={() => setShowAnnounceModal(true)} disabled={status === 'loading'} className="bg-white border border-purple-100 text-purple-600 font-bold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-80">
                <MessageSquare className="w-5 h-5" /> Pengumuman
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL UPLOAD FILE SOAL ================= */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
            <button 
              onClick={() => !isUploading && setShowUploadModal(false)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Upload File Soal</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">Sistem AI akan mengekstrak pertanyaan dari file Anda secara otomatis.</p>
            
            <div 
              onClick={handleFileUpload}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center mb-6 transition-colors cursor-pointer group ${
                isUploading ? 'border-purple-400 bg-purple-50' : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50'
              }`}
            >
              {isUploading ? (
                <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                  <p className="text-sm font-bold text-purple-700">Mengekstrak soal dengan AI...</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-purple-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Upload className="w-7 h-7 text-slate-400 group-hover:text-purple-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">Klik atau Drag & Drop file di sini</p>
                  <p className="text-xs text-slate-500 font-medium">Mendukung .PDF, .DOCX, .TXT (Maks 10MB)</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL QUIZ EDITOR (AI / MANUAL / UPLOAD) ================= */}
      {quizEditorMode && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative border border-slate-100">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${
                  quizEditorMode === 'ai' ? 'bg-purple-500' : quizEditorMode === 'upload' ? 'bg-indigo-500' : 'bg-blue-500'
                }`}>
                  {quizEditorMode === 'ai' ? <Sparkles className="w-6 h-6" /> : quizEditorMode === 'upload' ? <Upload className="w-6 h-6" /> : <Edit className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="font-black text-slate-800 text-xl">
                    {quizEditorMode === 'ai' ? 'Review Soal Generate AI' : quizEditorMode === 'upload' ? 'Review Soal dari File' : 'Buat Soal Remedial Manual'}
                  </h2>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Topik: {activeClass.topikKritis}</p>
                </div>
              </div>
              <button onClick={() => setQuizEditorMode(null)} className="p-3 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors active:scale-95 border border-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-100 space-y-6">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">Soal {idx + 1}</span>
                    <button onClick={() => handleDeleteQuestion(q.id)} className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea 
                    value={q.question}
                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                    placeholder="Tuliskan pertanyaan di sini..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-purple-400 transition-colors mb-4 resize-none min-h-[80px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className={`flex items-center gap-3 p-3 border rounded-xl transition-colors ${q.correct === oIdx ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                        <input 
                          type="radio" 
                          name={`correct_${q.id}`} 
                          checked={q.correct === oIdx} 
                          onChange={() => updateQuestion(q.id, 'correct', oIdx)}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer"
                        />
                        <input 
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                          placeholder={`Opsi ${oIdx + 1}`}
                          className="flex-1 bg-transparent text-sm font-medium outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={handleAddQuestion} className="w-full border-2 border-dashed border-slate-300 text-slate-500 font-bold py-4 rounded-2xl hover:bg-white hover:border-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Tambah Soal Baru
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex justify-end gap-3">
              <button onClick={() => setQuizEditorMode(null)} className="px-8 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 text-sm">
                Batal
              </button>
              <button 
                onClick={handleSaveQuiz}
                disabled={isSavingQuiz || quizQuestions.length === 0}
                className="px-8 py-3.5 rounded-xl font-black text-white bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 text-sm"
              >
                {isSavingQuiz ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : <><Save className="w-5 h-5" /> Simpan & Kirim ke Mahasiswa</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL PENGUMUMAN ================= */}
      {showAnnounceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
            <button onClick={() => !announceStatus.includes('loading') && setShowAnnounceModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full transition-colors active:scale-95 disabled:opacity-50"><X className="w-5 h-5" /></button>
            {announceStatus === 'success' ? (
              <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce"><CheckCircle className="w-12 h-12" /></div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Terkirim!</h3>
                <p className="text-slate-500 font-medium text-sm">Pengumuman berhasil dikirim (Broadccast) ke dashboard seluruh mahasiswa {activeClass.nama}.</p>
              </div>
            ) : (
              <div className={`transition-opacity duration-300 ${announceStatus === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Pengumuman Kelas</h3>
                <p className="text-slate-500 text-sm font-medium mb-6">Sistem telah membuat draf otomatis berdasarkan hasil deteksi AI.</p>
                <div className="mb-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-1 mb-2">
                    <div className="px-3 py-2 text-xs font-bold text-slate-500 border-b border-slate-200">Kepada: <span className="text-slate-800">Semua Mahasiswa ({activeClass.nama})</span></div>
                    <textarea value={announceText} onChange={(e) => setAnnounceText(e.target.value)} className="w-full bg-transparent p-3 text-sm text-slate-700 outline-none resize-none min-h-[160px] font-medium leading-relaxed" placeholder="Ketik pengumuman di sini..." />
                  </div>
                  <p className="text-[10px] font-bold text-purple-500 text-right flex items-center justify-end gap-1"><Sparkles className="w-3 h-3" /> Auto-drafted by AI</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAnnounceModal(false)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-colors text-sm hover:bg-slate-50 active:scale-95">Batal</button>
                  <button onClick={handleSendAnnounce} disabled={announceStatus === 'loading'} className="flex-[2] bg-purple-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-purple-200 transition-colors text-sm hover:bg-purple-700 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-80">
                    {announceStatus === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : 'Kirim Pengumuman'}
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

  // State Global untuk Data Multi-Kelas
  const [classes, setClasses] = useState(initialClassesData);
  const [activeClassId, setActiveClassId] = useState(initialClassesData[0].id);
  
  const activeClass = classes.find(c => c.id === activeClassId);

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard': return <TabDashboard activeClass={activeClass} />;
      case 'analisis': return <TabAnalisis activeClass={activeClass} setClasses={setClasses} />;
      case 'rekomendasi': return <TabRekomendasi activeClass={activeClass} setClasses={setClasses} />;
      case 'materi': return <TabMateri activeClass={activeClass} setClasses={setClasses} />;
      case 'nilai': return <TabKuis activeClass={activeClass} setClasses={setClasses} />;
      case 'mahasiswa': return <TabMahasiswa activeClass={activeClass} />;
      default: return <TabDashboard activeClass={activeClass} />;
    }
  };

  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-12 bg-slate-50 min-h-full">
      
      {/* UI Pemilihan Kelas */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm animate-in fade-in duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
            <BookKey className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Konteks Kelas Aktif</p>
            <p className="font-black text-slate-800 text-lg leading-tight">{activeClass.matkul}</p>
          </div>
        </div>
        <div className="relative">
          <select
            value={activeClassId}
            onChange={(e) => setActiveClassId(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 pl-5 pr-12 rounded-2xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer text-sm shadow-sm"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.nama} — {c.matkul}</option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Area Konten Tab */}
      {renderContent()}

    </div>
  );
}