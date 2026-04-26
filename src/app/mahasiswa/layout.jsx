'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Home, AlertTriangle, BookOpen, ClipboardList, MessageCircle, User
} from 'lucide-react';

export default function MahasiswaLayout({ children }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  // Komponen Navigasi Interaktif
  const NavItem = ({ id, href, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
          isActive 
            ? 'bg-white/10 text-white shadow-inner' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[#fbfcfe] overflow-hidden font-sans">
      {/* Sidebar Kiri (Merah) */}
      <aside className="w-72 flex-shrink-0 bg-[#da251d] flex flex-col py-8 px-5 overflow-y-auto z-20 shadow-2xl">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-white rounded-[14px] flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[#da251d] font-black text-base">T+</span>
          </div>
          <div>
            <h1 className="text-white font-black text-xl leading-none tracking-tight">TeachSense</h1>
            <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mt-1.5">Portal Mahasiswa</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 border border-white/5 rounded-[1.25rem] p-4 mb-8 flex items-center gap-4 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-base shrink-0">
            BI
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm truncate">Bintang</p>
            <p className="text-white/60 text-[10px] font-mono mt-1">220411100042</p>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <div className="flex-1 space-y-8">
          <div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest px-4 mb-3">Menu Utama</p>
            <nav className="flex flex-col gap-1">
              <NavItem id="dashboard" href="/mahasiswa?tab=dashboard" icon={Home} label="Dashboard" />
              <NavItem id="remedial" href="/mahasiswa?tab=remedial" icon={AlertTriangle} label="Remedial Center" />
              <NavItem id="materi" href="/mahasiswa?tab=materi" icon={BookOpen} label="Materi & Modul" />
              <NavItem id="kuis" href="/mahasiswa?tab=kuis" icon={ClipboardList} label="Kuis & Latihan" />
            </nav>
          </div>

          <div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest px-4 mb-3">Lainnya</p>
            <nav className="flex flex-col gap-1">
              <NavItem id="chat" href="/mahasiswa?tab=chat" icon={MessageCircle} label="Chat AI Tutor" />
              <NavItem id="profil" href="/mahasiswa?tab=profil" icon={User} label="Profil Saya" />
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <button className="flex items-center gap-4 px-4 py-2 text-sm font-bold text-white/70 hover:text-white transition-colors w-full group">
            <div className="w-10 h-10 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            Keluar
          </button>
        </div>
      </aside>

      {/* Area Konten Kanan */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}