'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  AlertTriangle, BookOpen, ClipboardList, MessageCircle, User,
  TrendingUp, Star, Clock, CheckCircle, XCircle, Brain, Zap,
  ChevronRight, Play, Lock, Award, BarChart2, RefreshCw, Send,
  ArrowRight, Target, Flame, Shield, Terminal, Loader2, X, Trophy, Bot, Info,
  Mail, GraduationCap, Key, Bell
} from 'lucide-react';

// ─── DUMMY DATA MAHASISWA ────────────────────────────────────────────────────
const materiList = [
  { id: 1, title: 'Pengantar Pemrograman Web', progress: 100, topik: 6, locked: false, badge: 'Selesai' },
  { id: 2, title: 'HTML & CSS Dasar', progress: 100, topik: 8, locked: false, badge: 'Selesai' },
  { id: 3, title: 'JavaScript Fundamentals', progress: 72, topik: 10, locked: false, badge: 'Aktif' },
  { id: 4, title: 'DOM Manipulation', progress: 30, topik: 7, locked: false, badge: 'Aktif' },
  { id: 5, title: 'React.js Dasar', progress: 0, topik: 12, locked: true, badge: 'Terkunci' },
  { id: 6, title: 'Next.js & Backend', progress: 0, topik: 9, locked: true, badge: 'Terkunci' },
];

const kuisList = [
  { id: 1, title: 'Kuis HTML & CSS', skor: 85, status: 'Lulus', tanggal: '18 Apr 2025', topik: 'HTML Dasar' },
  { id: 2, title: 'Kuis JavaScript #1', skor: 62, status: 'Remedial', tanggal: '20 Apr 2025', topik: 'JS Fundamentals' },
  { id: 3, title: 'Kuis JavaScript #2', skor: null, status: 'Belum', tanggal: '28 Apr 2025', topik: 'JS Lanjut' },
  { id: 4, title: 'Kuis DOM Manipulation', skor: null, status: 'Belum', tanggal: '5 Mei 2025', topik: 'DOM & Events' },
];

const chatHistory = [
  { role: 'assistant', text: 'Halo Bintang! Saya AI Tutor TeachSense+. Ada yang bisa saya bantu hari ini? 😊' },
  { role: 'user', text: 'Tolong jelaskan perbedaan let, const, dan var di JavaScript' },
  { role: 'assistant', text: 'Tentu! Berikut penjelasannya:\n\n**var** — Scope function, bisa di-redeclare, di-hoist. Hindari di kode modern.\n\n**let** — Scope block, tidak bisa di-redeclare, bisa di-reassign. Digunakan untuk variabel yang nilainya berubah.\n\n**const** — Scope block, tidak bisa di-redeclare maupun di-reassign. Digunakan untuk nilai tetap (referensi objek/array bisa berubah isinya).\n\nApakah ada yang ingin ditanyakan lebih lanjut?' },
];

// Dummy Soal untuk Kuis
const dummyQuizQuestions = [
  {
    id: 1,
    question: 'Apa output dari kode `typeof null` di JavaScript?',
    options: ['"null"', '"undefined"', '"object"', 'Error']
  },
  {
    id: 2,
    question: 'Method array manakah yang digunakan untuk menambahkan elemen baru di akhir array?',
    options: ['`push()`', '`pop()`', '`shift()`', '`unshift()`']
  },
  {
    id: 3,
    question: 'Keyword manakah yang BUKAN merupakan cara mendeklarasikan variabel di JavaScript modern?',
    options: ['`let`', '`const`', '`def`', '`var`']
  }
];

// Helper untuk merender teks dengan backtick menjadi tag <code>
const renderQuestionText = (text) => {
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) { 
      return <code key={index} className="text-red-500 bg-red-50 px-2 py-1 rounded-lg text-lg mx-1">{part}</code>;
    }
    return part;
  });
};

// ─── TAB DASHBOARD ───────────────────────────────────────────────────────────
function TabDashboard({ setActiveTab }) {
  const router = useRouter();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study Progress</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Selamat datang kembali, Bintang! Mari selesaikan tantangan hari ini.</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-5 py-2.5 shadow-sm w-fit">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-orange-700 font-bold text-sm">5 hari streak belajar!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-slate-50 rounded-full opacity-50 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Index Keseluruhan</p>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center" title="Nilai ini adalah rata-rata tertimbang dari seluruh mata kuliahmu.">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 relative z-10">
            <h2 className="text-7xl font-black text-slate-800 tracking-tighter">82.4<span className="text-4xl text-slate-400 font-bold">%</span></h2>
          </div>
          <div className="mt-6 space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>0%</span>
              <span className="text-emerald-500">Target Semester: 100%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[82.4%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            </div>
            <p className="text-xs font-medium text-slate-500 mt-3 leading-relaxed">
              Persentase ini merupakan akumulasi performa Anda di <strong>semua mata kuliah aktif</strong> semester ini.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-orange-50 transition-colors duration-500"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4"/> Topik Kritis
                </p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Recursion & Backtracking</h3>
              </div>
              <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] font-bold text-red-400 uppercase tracking-widest mb-0.5">Skor Evaluasi</span>
                <span className="text-xl font-black text-red-600">42<span className="text-sm">/100</span></span>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                "Sistem mendeteksi hambatan konsisten pada logika pemanggilan fungsi rekursif. Pemahamanmu saat ini berada di bawah standar ketuntasan kelas."
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('remedial')}
              className="bg-orange-500 text-white px-8 py-3.5 rounded-xl font-black text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <Target className="w-5 h-5" /> Buka Remedial Center Sekarang
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-800">Rincian Performa Mata Kuliah</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Status pemahaman dari setiap mata kuliah yang berkontribusi pada Mastery Index.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { matkul: 'Pemrograman Web (Frontend)', nilai: 92, status: 'Sangat Baik', color: 'emerald' },
            { matkul: 'Basis Data', nilai: 85, status: 'Baik', color: 'blue' },
            { matkul: 'Struktur Data & Algoritma', nilai: 65, status: 'Butuh Perhatian', color: 'orange' },
            { matkul: 'Kalkulus Lanjut', nilai: 88, status: 'Baik', color: 'emerald' },
          ].map((item, i) => (
            <div key={i} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-800">{item.matkul}</h4>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-${item.color}-100 text-${item.color}-700`}>
                    {item.status}
                  </span>
                </div>
                <span className={`text-2xl font-black text-${item.color}-600`}>{item.nilai}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-2">
                <div className={`bg-${item.color}-500 h-full rounded-full`} style={{ width: `${item.nilai}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sesi Belajar Terakhir</p>
            <p className="text-base font-black text-slate-800">2 jam yang lalu</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Mempelajari materi Struktur Data Array</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pencapaian Pekan Ini</p>
            <p className="text-base font-black text-slate-800">HTML & CSS Master</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Berhasil menyelesaikan 4/5 Micro-assessment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB REMEDIAL ────────────────────────────────────────────────────────────
function TabRemedial({ openModal }) {
  const [method, setMethod] = useState('quiz');
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Remedial Center</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Latihan adaptif untuk topik yang belum dikuasai</p>
      </div>

      <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h2 className="font-black text-orange-800 text-lg">Topik yang Perlu Diperkuat</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { topik: 'JavaScript Variables & Scope', skor: 62, target: 75 },
            { topik: 'JavaScript Functions', skor: 55, target: 75 },
            { topik: 'DOM Manipulation', skor: 30, target: 75 },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <p className="font-bold text-slate-800 text-sm mb-4 leading-relaxed">{item.topik}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(item.skor / 100) * 100}%` }} />
                </div>
                <span className="text-xs text-orange-600 font-black">{item.skor} / {item.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
        <h2 className="font-black text-slate-900 text-lg mb-6">Pilih Metode Latihan Adaptif</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button
            onClick={() => setMethod('quiz')}
            className={`p-6 rounded-3xl border-2 text-left transition-all active:scale-95 ${method === 'quiz' ? 'border-violet-400 bg-violet-50/50 shadow-md shadow-violet-100' : 'border-slate-100 hover:border-slate-300'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${method === 'quiz' ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-400'}`}>
               <Brain className="w-7 h-7" />
            </div>
            <p className={`font-black text-xl mb-2 ${method === 'quiz' ? 'text-violet-900' : 'text-slate-800'}`}>Adaptive Quiz</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Kuis cerdas dengan soal yang tingkat kesulitannya menyesuaikan kemampuanmu secara otomatis.</p>
          </button>
          
          <button
            onClick={() => setMethod('coding')}
            className={`p-6 rounded-3xl border-2 text-left transition-all active:scale-95 ${method === 'coding' ? 'border-blue-400 bg-blue-50/50 shadow-md shadow-blue-100' : 'border-slate-100 hover:border-slate-300'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${method === 'coding' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
               <Terminal className="w-7 h-7" />
            </div>
            <p className={`font-black text-xl mb-2 ${method === 'coding' ? 'text-blue-900' : 'text-slate-800'}`}>Coding Lab</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Asah logika pemrogramanmu lewat praktik langsung di editor kode interaktif secara real-time.</p>
          </button>
        </div>

        <button 
          onClick={() => openModal(method, { title: 'Latihan Remedial Terpadu' })}
          className={`mt-8 w-full text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 text-lg ${method === 'quiz' ? 'bg-violet-600 hover:bg-violet-700 shadow-violet-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
        >
          <Play className="w-6 h-6 fill-current" />
          Mulai Latihan Sekarang
        </button>
      </div>
    </div>
  );
}

// ─── TAB MATERI ──────────────────────────────────────────────────────────────
function TabMateri({ openModal }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Materi & Modul</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Akses materi pembelajaran berdasarkan progress mastery kamu</p>
      </div>

      <div className="space-y-5">
        {materiList.map((m) => (
          <div
            key={m.id}
            className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between ${m.locked ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-6 w-full max-w-3xl">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${m.badge === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : m.locked ? 'bg-slate-200 text-slate-400' : 'bg-red-100 text-red-600'}`}>
                {m.badge === 'Selesai' ? <CheckCircle className="w-6 h-6" /> : m.locked ? <Lock className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-slate-800">{m.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${m.badge === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : m.badge === 'Aktif' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
                    {m.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 mb-3">{m.topik} topik pembelajaran</p>
                {!m.locked && (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${m.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'}`} style={{ width: `${m.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 w-8">{m.progress}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="shrink-0 pl-6">
              <button
                disabled={m.locked}
                onClick={() => openModal('video', m)}
                className={`flex-shrink-0 flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl transition-all active:scale-95 ${m.locked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200'}`}
              >
                {m.progress === 100 ? 'Review' : m.locked ? 'Terkunci' : 'Lanjut'}
                {!m.locked && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB KUIS & LATIHAN ──────────────────────────────────────────────────────
function TabKuis({ openModal }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kuis & Latihan</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Riwayat dan jadwal evaluasi kamu</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
          <p className="text-4xl font-black text-emerald-500 mb-1">1</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lulus</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
          <p className="text-4xl font-black text-red-500 mb-1">1</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remedial</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
          <p className="text-4xl font-black text-slate-400 mb-1">2</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Belum Mulai</p>
        </div>
      </div>

      <div className="space-y-4">
        {kuisList.map((k) => (
          <div key={k.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black ${k.status === 'Lulus' ? 'bg-emerald-100 text-emerald-600' : k.status === 'Remedial' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
                {k.skor ?? '–'}
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-800">{k.title}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{k.topik} · {k.tanggal}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${k.status === 'Lulus' ? 'bg-emerald-50 text-emerald-600' : k.status === 'Remedial' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                {k.status}
              </span>
              
              {k.status === 'Lulus' ? (
                <button onClick={() => openModal('quiz-result', k)} className="text-sm text-emerald-600 font-bold hover:underline">Lihat Hasil</button>
              ) : k.status === 'Remedial' ? (
                <button onClick={() => openModal('quiz', k)} className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-orange-200 active:scale-95">Remedial</button>
              ) : (
                <button onClick={() => openModal('quiz', k)} className="text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md shadow-red-200 active:scale-95">Mulai Kerjakan</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAB CHATBOX AI ──────────────────────────────────────────────────────────
function TabChat() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setInput('');
    setLoading(true);
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Itu pertanyaan yang sangat relevan! Konsep utamanya adalah memecah masalah besar menjadi masalah kecil yang serupa. Ada lagi yang ingin didiskusikan mengenai topik ini?' },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-[80vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-4 shrink-0">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-inner">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h2 className="font-black text-slate-800 text-xl tracking-tight">TeachSense AI Tutor</h2>
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span> Online & Siap Membantu
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-red-100 text-red-600'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[75%] p-5 rounded-[1.5rem] text-sm font-medium whitespace-pre-wrap leading-relaxed shadow-sm ${
              msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none shadow-red-200' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center justify-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-5 h-5 text-red-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-[1.5rem] rounded-tl-none px-6 py-4 flex gap-1.5 shadow-sm">
              {[0, 1, 2].map((d) => (
                <div key={d} className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-6 border-t border-slate-100 bg-white flex gap-3 shrink-0">
        <form onSubmit={handleSend} className="flex-1 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu tentang materi hari ini..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-red-400 transition-colors shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-red-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md shadow-red-200 active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── TAB PROFIL SAYA ─────────────────────────────────────────────────────────
function TabProfil() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profil & Pengaturan</h1>
        <p className="text-slate-500 font-medium">Kelola informasi akun dan preferensi belajarmu.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-red-100 text-red-600 rounded-[2rem] flex items-center justify-center font-black text-4xl mb-6 shadow-inner">
            AB
          </div>
          <h2 className="text-2xl font-black text-slate-800">Bintang</h2>
          <p className="text-slate-500 font-medium mb-6">220411100042</p>
          
          <div className="w-full space-y-3">
            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 text-left">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                <p className="text-sm font-bold text-slate-700">bintang@student.univ.ac.id</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 text-left">
              <GraduationCap className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Program Studi</p>
                <p className="text-sm font-bold text-slate-700">S1 Informatika</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-black text-slate-800">Ubah Password</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password Saat Ini</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-red-400 transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password Baru</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-red-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Konfirmasi Password Baru</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-red-400 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-black text-slate-800">Preferensi Notifikasi</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-700">Notifikasi Jadwal Kuis</p>
                  <p className="text-xs font-medium text-slate-500">Kirim email pengingat H-1 sebelum kuis dimulai.</p>
                </div>
                <div className="w-12 h-6 bg-red-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-700">Peringatan Remedial AI</p>
                  <p className="text-xs font-medium text-slate-500">Notifikasi pop-up saat AI mendeteksi penurunan performa.</p>
                </div>
                <div className="w-12 h-6 bg-red-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-80"
            >
              {isSaving ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : saved ? <><CheckCircle className="w-5 h-5" /> Tersimpan!</> : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MahasiswaPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  
  // State untuk Interaktivitas Modal Simulasi
  const [activeModal, setActiveModal] = useState(null); // 'video' | 'quiz' | 'coding' | 'quiz-result'
  const [modalData, setModalData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State Khusus Kuis Timer & Navigasi
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const openModal = (type, data) => {
    setActiveModal(type);
    setModalData(data);
    setIsSubmitting(false);
    
    // Reset kuis jika yang dibuka adalah tipe kuis
    if (type === 'quiz') {
      setCurrentQIndex(0);
      setTimeLeft(15 * 60);
      setSelectedAnswers({});
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleSimulateSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveModal('quiz-result');
    }, 1500);
  };

  // Timer Logic untuk Kuis
  useEffect(() => {
    let timer;
    if (activeModal === 'quiz' && timeLeft > 0 && !isSubmitting) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && activeModal === 'quiz' && !isSubmitting) {
      handleSimulateSubmit(); // Otomatis kumpul jika waktu habis
    }
    return () => clearInterval(timer);
  }, [activeModal, timeLeft, isSubmitting]);

  // Format Detik ke MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <TabDashboard setActiveTab={(tab) => window.location.href = `/mahasiswa?tab=${tab}`} />;
      case 'remedial': return <TabRemedial openModal={openModal} />;
      case 'materi': return <TabMateri openModal={openModal} />;
      case 'kuis': return <TabKuis openModal={openModal} />;
      case 'chat': return <TabChat />;
      case 'profil': return <TabProfil />;
      default: return <TabDashboard setActiveTab={() => {}} />;
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-12 bg-[#fbfcfe]">
        <div className="max-w-6xl mx-auto">
          {renderTab()}
        </div>
      </div>

      {/* ================= GLOBAL MODAL SIMULATOR ================= */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative border border-slate-100">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${activeModal === 'video' ? 'bg-red-500' : activeModal === 'coding' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                  {activeModal === 'video' ? <Play className="w-6 h-6 fill-current ml-1" /> : activeModal === 'coding' ? <Terminal className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="font-black text-slate-800 text-xl">
                    {activeModal === 'video' ? modalData?.title : activeModal === 'coding' ? 'Coding Lab: Praktik Langsung' : 'Micro-Assessment'}
                  </h2>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {activeModal === 'video' ? 'Materi Pembelajaran' : modalData?.topik || modalData?.title || 'Evaluasi Adaptif AI'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal} className="p-3 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors active:scale-95 border border-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-100 flex flex-col">
              
              {activeModal === 'video' && (
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-100">
                  <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 shadow-2xl relative overflow-hidden group cursor-pointer border-[6px] border-slate-800">
                    <div className="w-24 h-24 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                      <Play className="w-12 h-12 text-white fill-current ml-2" />
                    </div>
                    <p className="font-bold text-slate-400">Klik untuk memutar materi interaktif</p>
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-slate-700"><div className="h-full bg-red-600 w-1/3"></div></div>
                  </div>
                </div>
              )}

              {/* 2. QUIZ SIMULATOR DENGAN TIMER & NEXT QUESTION */}
              {activeModal === 'quiz' && (
                <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center">
                  <div className="max-w-2xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-xs font-black text-orange-600 bg-orange-50 px-4 py-2 rounded-xl uppercase tracking-widest border border-orange-100">
                        Soal {currentQIndex + 1} / {dummyQuizQuestions.length}
                      </span>
                      <span className="text-sm font-bold text-slate-500 flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                        <Clock className="w-4 h-4 text-slate-400"/> {formatTime(timeLeft)} Tersisa
                      </span>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-8 leading-relaxed">
                      {renderQuestionText(dummyQuizQuestions[currentQIndex].question)}
                    </p>
                    <div className="space-y-4">
                      {dummyQuizQuestions[currentQIndex].options.map((opt, i) => (
                        <label 
                          key={i} 
                          className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                            selectedAnswers[currentQIndex] === i 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-slate-100 hover:border-orange-400 hover:bg-orange-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={`quiz_opt_${currentQIndex}`}
                            checked={selectedAnswers[currentQIndex] === i}
                            onChange={() => setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: i }))}
                            className="w-5 h-5 accent-orange-500" 
                          />
                          <span className="font-bold text-slate-700 text-lg">
                            {renderQuestionText(opt)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'coding' && (
                <div className="flex-1 bg-[#1e1e1e] p-8 flex flex-col">
                  <p className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-blue-400"/> Lengkapi fungsi di bawah ini agar mereturn array yang tersortir:</p>
                  <div className="flex-1 bg-black/40 rounded-[2rem] p-8 font-mono text-base text-green-400 shadow-inner overflow-x-auto border border-white/5">
                    <p><span className="text-blue-400">function</span> <span className="text-yellow-200">sortArray</span>(arr) {'{'}</p>
                    <p className="pl-6 text-slate-500 mt-2">// Tulis kodemu di baris ini</p>
                    <div className="pl-6 flex items-center gap-3 mt-2">
                      <span className="text-purple-400">return</span> 
                      <input type="text" placeholder="arr.sort()" className="bg-white/10 text-white px-4 py-2 rounded-xl outline-none border border-slate-600 w-72 focus:border-blue-400 transition-colors placeholder:text-slate-500" />
                      <span>;</span>
                    </div>
                    <p className="mt-4">{'}'}</p>
                  </div>
                </div>
              )}

              {activeModal === 'quiz-result' && (
                <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center mb-8 mx-auto bg-emerald-100 text-emerald-500 animate-bounce shadow-xl shadow-emerald-100 border-4 border-white">
                     <Trophy className="w-16 h-16" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Evaluasi Selesai</p>
                  <h3 className="text-7xl font-black mb-8 text-emerald-600 drop-shadow-sm">100</h3>
                  <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl max-w-xl mx-auto shadow-sm">
                    <p className="text-slate-600 font-bold leading-relaxed text-lg">
                      Kerja luar biasa! Pemahamanmu pada materi ini sudah sangat solid. Sistem AI mendeteksi logikamu dalam menyelesaikan masalah sudah 100% efisien.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex justify-end gap-3">
              {activeModal === 'quiz-result' || activeModal === 'video' ? (
                <button onClick={closeModal} className="px-8 py-4 rounded-2xl font-bold text-white bg-slate-800 hover:bg-slate-900 shadow-xl transition-all active:scale-95 text-sm">
                  Selesai & Tutup
                </button>
              ) : activeModal === 'quiz' && currentQIndex < dummyQuizQuestions.length - 1 ? (
                <button 
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="px-10 py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center gap-2 active:scale-95 bg-orange-500 hover:bg-orange-600 shadow-orange-200 text-sm"
                >
                  Selanjutnya <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleSimulateSubmit}
                  disabled={isSubmitting}
                  className={`px-10 py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 text-sm ${activeModal === 'coding' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200'}`}
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Memeriksa...</> : 'Kirim Jawaban Ke AI'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}