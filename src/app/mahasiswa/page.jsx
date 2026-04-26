'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  BookOpen, Wand2, MessageSquare, CheckCircle, Code, 
  AlertCircle, Clock, Trophy, FileEdit, Play,
  Terminal, Send, Bot, User, X, Loader2, ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ─── DUMMY DATA ──────────────────────────────────────────────────────────────
const materiList = [
  { id: 1, judul: 'Bab 1: Pengenalan Logika Dasar', tipe: 'Video & PDF', progress: 100, status: 'Selesai' },
  { id: 2, judul: 'Bab 2: Struktur Data Array', tipe: 'Modul Interaktif', progress: 100, status: 'Selesai' },
  { id: 3, judul: 'Bab 3: Fungsi Rekursif & Call Stack', tipe: 'Video & Kuis', progress: 45, status: 'Sedang Belajar' },
  { id: 4, judul: 'Bab 4: Object Oriented Programming', tipe: 'Terkunci', progress: 0, status: 'Terkunci' },
];

const kuisList = [
  { id: 1, judul: 'Kuis 1: Pemahaman Array', deadline: '12 Apr 2026', skor: 85, status: 'Selesai' },
  { id: 2, judul: 'Tugas Praktikum: Rekursif', deadline: '20 Apr 2026', skor: 42, status: 'Remedial' },
  { id: 3, judul: 'Ujian Tengah Semester (UTS)', deadline: '30 Apr 2026', skor: null, status: 'Belum Mulai' },
];

// ─── TAB DASHBOARD ───────────────────────────────────────────────────────────
function TabDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study Progress</h1>
        <p className="text-slate-500 font-medium">Selamat datang kembali, Efran Gustine! Mari selesaikan tantangan hari ini.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Mastery Index</p>
          <p className="text-7xl font-black text-red-600 tracking-tighter">82.4%</p>
        </div>
        
        <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Focus Topic</p>
              <h3 className="text-2xl font-bold text-slate-800">Recursion & Backtracking</h3>
            </div>
            <span className="text-red-500 font-bold text-sm italic">Kritis: 42/100</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[42%] rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
          </div>
          <p className="text-xs font-medium text-slate-400 mt-4 italic">Sistem mendeteksi hambatan pada logika pemanggilan fungsi rekursif.</p>
        </div>
      </div>

      <div className="bg-orange-600 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-2xl font-black italic">Remedial Center Diperlukan!</h2>
          </div>
          <p className="text-sm opacity-90 leading-relaxed font-medium mb-8 max-w-xl">
            Pemahamanmu pada topik Data Structure menurun di bawah standar. Jangan biarkan gap pengetahuan ini menghambat modul selanjutnya. Ambil penguatan sekarang.
          </p>
          <button 
            onClick={() => router.push('/mahasiswa?tab=remedial')}
            className="bg-white text-orange-600 hover:bg-orange-50 transition-all px-10 py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95"
          >
            Buka Remedial Center
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Sesi Belajar Terakhir</p>
            <p className="text-xs text-slate-500">2 jam yang lalu pada topik Array</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Pencapaian Pekan Ini</p>
            <p className="text-xs text-slate-500">Menyelesaikan 4/5 Micro-assessment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB REMEDIAL & MODALS ───────────────────────────────────────────────────
function TabRemedial() {
  const [activeModal, setActiveModal] = useState(null); // 'quiz' | 'coding' | null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setActiveModal(null);
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Remedial Center</h1>
        <p className="text-slate-500 font-medium">Latihan adaptif untuk menutup celah pemahaman Anda.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onClick={() => setActiveModal('quiz')} className="group p-10 border-2 border-slate-100 rounded-[3rem] hover:border-orange-500 transition-all cursor-pointer bg-white text-center flex flex-col items-center justify-center shadow-sm hover:shadow-xl active:scale-95">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-black text-2xl text-slate-800 mb-2">Adaptive Quiz</h3>
          <p className="text-sm text-slate-500 max-w-xs mb-6">Kuis cerdas yang menyesuaikan tingkat kesulitan berdasarkan kemampuan Anda saat ini.</p>
          <span className="text-xs font-bold text-orange-600 underline decoration-2 underline-offset-8 uppercase tracking-widest">Mulai Latihan</span>
        </div>

        <div onClick={() => setActiveModal('coding')} className="group p-10 border-2 border-slate-100 rounded-[3rem] hover:border-blue-500 transition-all cursor-pointer bg-white text-center flex flex-col items-center justify-center shadow-sm hover:shadow-xl active:scale-95">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <Code className="w-10 h-10" />
          </div>
          <h3 className="font-black text-2xl text-slate-800 mb-2">Coding Lab</h3>
          <p className="text-sm text-slate-500 max-w-xs mb-6">Uji logika pemrograman Anda dengan sistem penilaian otomatis secara real-time.</p>
          <span className="text-xs font-bold text-blue-600 underline decoration-2 underline-offset-8 uppercase tracking-widest">Mulai Coding</span>
        </div>
      </div>

      {/* MODAL SIMULASI LATIHAN */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${activeModal === 'quiz' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                  {activeModal === 'quiz' ? <CheckCircle className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-black text-slate-800">{activeModal === 'quiz' ? 'Micro-Assessment: Recursion' : 'Coding Challenge: Factorial'}</h2>
                  <p className="text-xs font-medium text-slate-500">Soal Adaptif AI - Level 2</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-white flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center animate-in zoom-in duration-300">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Trophy className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">Luar Biasa!</h3>
                  <p className="text-slate-500 font-medium">Pemahamanmu pada materi ini meningkat +15%. Kembali ke Dashboard.</p>
                </div>
              ) : activeModal === 'quiz' ? (
                <div className="max-w-2xl mx-auto w-full">
                  <p className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">Apa yang akan terjadi jika fungsi rekursif dipanggil tanpa adanya *Base Case* (Kondisi Berhenti)?</p>
                  <div className="space-y-3">
                    {['Fungsi akan mengembalikan nilai 0.', 'Akan terjadi Infinite Loop (Stack Overflow).', 'Sistem akan otomatis memperbaiki kodenya.', 'Program akan berjalan lebih cepat.'].map((opt, i) => (
                      <label key={i} className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all">
                        <input type="radio" name="quiz" className="w-5 h-5 accent-orange-500" />
                        <span className="font-medium text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto w-full">
                  <p className="text-sm font-bold text-slate-800 mb-4">Lengkapi fungsi rekursif di bawah ini untuk mencari nilai Faktorial:</p>
                  <div className="bg-[#1e1e1e] rounded-2xl p-6 font-mono text-sm text-green-400 shadow-inner overflow-x-auto">
                    <p><span className="text-blue-400">function</span> <span className="text-yellow-200">factorial</span>(n) {'{'}</p>
                    <p className="pl-4 text-slate-400">// Tulis Base Case di sini</p>
                    <p className="pl-4"><span className="text-purple-400">if</span> (n === <span className="text-orange-300">0</span>) <span className="text-purple-400">return</span> <span className="text-orange-300">1</span>;</p>
                    <br/>
                    <p className="pl-4 text-slate-400">// Recursive Call</p>
                    <div className="pl-4 flex items-center gap-2">
                      <span className="text-purple-400">return</span> 
                      <input type="text" defaultValue="n * factorial(n - 1)" className="bg-white/10 text-white px-2 py-1 rounded outline-none border-b border-slate-500 w-48 focus:border-blue-400 transition-colors" />
                      <span>;</span>
                    </div>
                    <p>{'}'}</p>
                  </div>
                </div>
              )}
            </div>

            {!isSuccess && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-2 ${activeModal === 'quiz' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} disabled:opacity-70`}
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Memeriksa...</> : 'Kirim Jawaban'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB MATERI ──────────────────────────────────────────────────────────────
function TabMateri() {
  const [activeMaterial, setActiveMaterial] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Materi & Modul</h1>
        <p className="text-slate-500 font-medium">Lanjutkan pembelajaranmu pada mata kuliah Struktur Data.</p>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {materiList.map((m) => (
          <div key={m.id} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between ${m.status === 'Terkunci' ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-5 w-full max-w-2xl">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${m.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : m.status === 'Terkunci' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600'}`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800">{m.judul}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${m.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : m.status === 'Terkunci' ? 'bg-slate-200 text-slate-500' : 'bg-red-100 text-red-700'}`}>
                    {m.status}
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden hidden md:block">
                    <div className={`h-full ${m.progress === 100 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">{m.progress}%</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              {m.status === 'Sedang Belajar' ? (
                <button 
                  onClick={() => setActiveMaterial(m)}
                  className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-200 flex items-center gap-2 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" /> Lanjutkan
                </button>
              ) : m.status === 'Selesai' ? (
                <button 
                  onClick={() => setActiveMaterial(m)}
                  className="bg-slate-50 text-slate-600 font-bold px-6 py-3 rounded-xl text-sm hover:bg-slate-100 transition-colors border border-slate-200 active:scale-95"
                >
                  Ulas Kembali
                </button>
              ) : (
                <button disabled className="bg-slate-100 text-slate-400 font-bold px-6 py-3 rounded-xl text-sm cursor-not-allowed">
                  Terkunci
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SIMULASI PEMUTAR MATERI */}
      {activeMaterial && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-slate-800">{activeMaterial.judul}</h2>
                  <p className="text-xs font-medium text-slate-500">{activeMaterial.tipe}</p>
                </div>
              </div>
              <button onClick={() => setActiveMaterial(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors active:scale-95">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Area Konten / Video */}
            <div className="flex-1 p-8 overflow-y-auto bg-slate-100 flex flex-col items-center justify-center">
              <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-3xl flex flex-col items-center justify-center text-slate-300 shadow-xl relative overflow-hidden group cursor-pointer border-4 border-slate-800">
                <div className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                  <Play className="w-10 h-10 text-white fill-current ml-2" />
                </div>
                <p className="font-medium text-sm text-slate-400">Klik untuk memutar video simulasi</p>
                
                {/* Dummy progress bar video */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-700">
                  <div className="h-full bg-red-600 w-1/3"></div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex justify-end">
              <button 
                onClick={() => setActiveMaterial(null)} 
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Tandai Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB KUIS & LATIHAN ──────────────────────────────────────────────────────
function TabKuis() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizMode, setQuizMode] = useState('taking'); // 'taking' | 'result'

  const handleOpenQuiz = (quiz, mode) => {
    setQuizMode(mode);
    setActiveQuiz(quiz);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kuis & Latihan</h1>
        <p className="text-slate-500 font-medium">Evaluasi pemahamanmu dari materi yang telah dipelajari.</p>
      </header>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-5 pl-6">Judul Evaluasi</th>
              <th className="p-5">Batas Waktu</th>
              <th className="p-5">Nilai Kamu</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right pr-6">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {kuisList.map((k, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-5 pl-6 font-bold text-slate-800 flex items-center gap-3">
                  <FileEdit className={`w-5 h-5 ${k.status === 'Selesai' ? 'text-emerald-500' : k.status === 'Remedial' ? 'text-red-500' : 'text-slate-400'}`} />
                  {k.judul}
                </td>
                <td className="p-5 text-slate-500 font-medium">{k.deadline}</td>
                <td className="p-5">
                  <span className={`font-black text-lg ${k.skor >= 75 ? 'text-emerald-600' : k.skor !== null ? 'text-red-500' : 'text-slate-400'}`}>
                    {k.skor !== null ? k.skor : '-'}
                  </span>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    k.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : 
                    k.status === 'Remedial' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {k.status}
                  </span>
                </td>
                <td className="p-5 text-right pr-6">
                  {k.status === 'Belum Mulai' ? (
                    <button 
                      onClick={() => handleOpenQuiz(k, 'taking')}
                      className="bg-red-600 text-white hover:bg-red-700 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md shadow-red-200 active:scale-95"
                    >
                      Kerjakan
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleOpenQuiz(k, 'result')}
                      className="bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors active:scale-95"
                    >
                      Lihat Hasil
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL KUIS INTERAKTIF */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="font-black text-slate-800">{activeQuiz.judul}</h2>
              <button onClick={() => setActiveQuiz(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors active:scale-95">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 bg-white">
              {quizMode === 'taking' ? (
                // STATE 1: SEDANG MENGERJAKAN
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-lg uppercase tracking-widest">Soal 1 / 15</span>
                    <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-slate-400"/> 44:59 Tersisa
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-slate-800 leading-relaxed mb-6">
                    Manakah dari pernyataan berikut yang paling tepat mendeskripsikan struktur data Array dalam pemrograman?
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Kumpulan data dengan tipe berbeda yang saling terhubung.', 
                      'Kumpulan elemen yang dialokasikan berdampingan di memori dengan tipe data sama.', 
                      'Struktur data dinamis yang menggunakan prinsip LIFO (Last In First Out).', 
                      'Kumpulan node yang dihubungkan melalui pointer.'
                    ].map((opt, i) => (
                      <label key={i} className="flex items-center gap-4 p-5 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-red-400 hover:bg-red-50 transition-all">
                        <input type="radio" name="quiz_reg" className="w-5 h-5 accent-red-600" />
                        <span className="font-medium text-slate-700 leading-relaxed">{opt}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => setQuizMode('result')} 
                      className="px-8 py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
                    >
                      Kirim & Lihat Hasil
                    </button>
                  </div>
                </div>
              ) : (
                // STATE 2: MELIHAT HASIL
                <div className="text-center py-8">
                  <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 mx-auto ${
                    (activeQuiz.skor >= 75 || activeQuiz.skor === null) ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500'
                  }`}>
                     <Trophy className="w-14 h-14" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Nilai Akhir Evaluasi</p>
                  <h3 className={`text-6xl font-black mb-6 ${
                    (activeQuiz.skor >= 75 || activeQuiz.skor === null) ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {activeQuiz.skor !== null ? activeQuiz.skor : '100'}
                  </h3>
                  
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-lg mx-auto mb-8">
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {(activeQuiz.skor >= 75 || activeQuiz.skor === null)
                        ? 'Kerja luar biasa! Pemahamanmu pada materi ini sudah sangat solid. Sistem mendeteksi logikamu dalam menyelesaikan masalah sangat efisien.' 
                        : 'Nilaimu masih di bawah batas KKM (75). Sistem AI TeachSense+ merekomendasikan kamu untuk mengambil sesi penguatan di Remedial Center.'}
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => setActiveQuiz(null)} 
                      className="px-8 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
                    >
                      Tutup
                    </button>
                    {(activeQuiz.skor < 75 && activeQuiz.skor !== null) && (
                      <button 
                        onClick={() => setActiveQuiz(null)}
                        className="px-8 py-3.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center gap-2"
                      >
                         Buka Remedial Center <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── TAB CHATBOX AI ──────────────────────────────────────────────────────────
function TabChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Halo Efran! Saya AI Tutor TeachSense+. Ada yang membuatmu bingung tentang materi Recursion hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e?.preventDefault();
    if(!input.trim()) return;

    // Tambah pesan user
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Simulasi AI membalas setelah 1.5 detik
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'ai', 
        text: 'Itu pertanyaan yang sangat bagus! Konsep utama dari Recursion adalah fungsi yang memanggil dirinya sendiri. Syarat wajibnya adalah harus memiliki "Base Case" agar tidak terjadi Infinite Loop. Mau saya berikan contoh kodenya?' 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[75vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      {/* Header Chat */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-black text-slate-800">TeachSense AI Tutor</h2>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online & Siap Membantu
          </p>
        </div>
      </div>

      {/* Area Pesan */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-red-600 text-white rounded-tr-none shadow-md shadow-red-200' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu tentang materi hari ini..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95 shadow-md shadow-indigo-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MahasiswaPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard': return <TabDashboard />;
      case 'remedial': return <TabRemedial />;
      case 'materi': return <TabMateri />;
      case 'kuis': return <TabKuis />;
      case 'chat': return <TabChat />;
      default: return <TabDashboard />;
    }
  };

  return (
    <div className="p-8 md:p-12 lg:px-16 lg:py-12 bg-slate-50 min-h-full">
      {renderContent()}
    </div>
  );
}