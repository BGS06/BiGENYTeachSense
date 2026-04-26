import Link from 'next/link';
import { GraduationCap, Presentation, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function RootLandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfe] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Decoration Halus */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-100 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-full mb-8 shadow-sm border border-red-100 font-bold text-xs tracking-widest uppercase">
          <Sparkles className="w-4 h-4 mr-2" />
          Prototipe Inovasi LIDM 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
          Selamat datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">BiGenyTeachsense</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Platform Learning Management System (LMS) adaptif berbasis Artificial Intelligence. Silakan pilih akses masuk di bawah ini untuk mencoba prototipe.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        
        {/* Card Mahasiswa */}
        <Link href="/mahasiswa" className="group bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-200 hover:border-orange-400 transition-all cursor-pointer flex flex-col items-center text-center active:scale-95 duration-300">
          <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">Portal Mahasiswa</h2>
          <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">Akses materi adaptif, kerjakan evaluasi, dan berinteraksi langsung dengan Chatbot AI Tutor.</p>
          <div className="mt-auto flex items-center justify-center w-full gap-2 text-orange-600 font-bold text-sm bg-orange-50 border border-orange-100 px-6 py-4 rounded-2xl group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-colors">
            Masuk Simulasi <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card Dosen */}
        <Link href="/dosen" className="group bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200 hover:border-blue-400 transition-all cursor-pointer flex flex-col items-center text-center active:scale-95 duration-300">
          <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
            <Presentation className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">Portal Dosen</h2>
          <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">Pantau analitik kelas, deteksi kesulitan belajar mahasiswa, dan dapatkan insight rekomendasi AI.</p>
          <div className="mt-auto flex items-center justify-center w-full gap-2 text-blue-600 font-bold text-sm bg-blue-50 border border-blue-100 px-6 py-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
            Masuk Simulasi <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card Admin */}
        <Link href="/admin" className="group bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-200 hover:border-red-400 transition-all cursor-pointer flex flex-col items-center text-center active:scale-95 duration-300">
          <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-600 mb-8 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">Admin Panel</h2>
          <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed">Kelola database pengguna, manajemen kelas, pengaturan sistem, dan import data CSV.</p>
          <div className="mt-auto flex items-center justify-center w-full gap-2 text-red-600 font-bold text-sm bg-red-50 border border-red-100 px-6 py-4 rounded-2xl group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors">
            Masuk Simulasi <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

      </div>
      
      <div className="relative z-10 mt-16 text-center">
        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">
          BiGENY — Telkom University
        </p>
      </div>
    </div>
  );
}