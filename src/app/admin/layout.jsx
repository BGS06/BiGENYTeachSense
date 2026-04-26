import Link from 'next/link';
import { 
  LayoutDashboard, Users, Building2, 
  Upload, FileText, Settings, LogOut 
} from 'lucide-react';

export const metadata = {
  title: 'TeachSense+ | Admin Panel',
  description: 'Admin Control Panel TeachSense+',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Merah (Disesuaikan dengan Dosen & Mahasiswa) */}
      <aside className="w-64 flex-shrink-0 bg-red-600 flex flex-col py-6 px-4 gap-2 overflow-y-auto">
        {/* Logo */}
        <div className="px-2 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <span className="text-red-600 font-black text-sm">T+</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">TeachSense+</span>
          </div>
          <p className="text-red-200 text-xs pl-10">Admin Panel</p>
        </div>

        {/* User card */}
        <div className="bg-white/15 rounded-2xl p-3 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">Super Admin</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-red-200 text-[10px] uppercase tracking-wider font-bold">Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          <p className="text-red-300 text-xs font-semibold uppercase tracking-wider px-3 pt-2 pb-1">Overview</p>
          <Link href="/admin?tab=dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <p className="text-red-300 text-xs font-semibold uppercase tracking-wider px-3 pt-4 pb-1">Manajemen</p>
          <Link href="/admin?tab=users" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <Users className="w-5 h-5" />
            User Management
          </Link>
          <Link href="/admin?tab=kelas" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <Building2 className="w-5 h-5" />
            Class Management
          </Link>
          <Link href="/admin?tab=import" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <Upload className="w-5 h-5" />
            Import Data CSV
          </Link>

          <p className="text-red-300 text-xs font-semibold uppercase tracking-wider px-3 pt-4 pb-1">System</p>
          <Link href="/admin?tab=logs" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <FileText className="w-5 h-5" />
            Audit Logs
          </Link>
          <Link href="/admin?tab=settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        {/* Bottom logout */}
        <div className="mt-auto pt-4 border-t border-red-500">
          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-200 hover:bg-white/10 transition-all w-full">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}