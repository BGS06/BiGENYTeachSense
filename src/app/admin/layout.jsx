'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  LayoutDashboard, Users, Building2, Upload, FileText, Settings
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

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
            <h1 className="text-white font-black text-xl leading-none tracking-tight">TeachSense+</h1>
            <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mt-1.5">Admin Panel</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 border border-white/5 rounded-[1.25rem] p-4 mb-8 flex items-center gap-4 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-base shrink-0">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm truncate">Super Admin</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Administrator</p>
            </div>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest px-4 mb-3">Overview</p>
            <nav className="flex flex-col gap-1">
              <NavItem id="dashboard" href="/admin?tab=dashboard" icon={LayoutDashboard} label="Dashboard" />
            </nav>
          </div>

          <div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest px-4 mb-3">Manajemen</p>
            <nav className="flex flex-col gap-1">
              <NavItem id="users" href="/admin?tab=users" icon={Users} label="User Management" />
              <NavItem id="kelas" href="/admin?tab=kelas" icon={Building2} label="Class Management" />
              <NavItem id="import" href="/admin?tab=import" icon={Upload} label="Import Data CSV" />
            </nav>
          </div>

          <div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest px-4 mb-3">System</p>
            <nav className="flex flex-col gap-1">
              <NavItem id="logs" href="/admin?tab=logs" icon={FileText} label="Audit Logs" />
              <NavItem id="settings" href="/admin?tab=settings" icon={Settings} label="Settings" />
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