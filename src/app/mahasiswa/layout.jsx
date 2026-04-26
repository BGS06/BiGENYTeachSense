import Link from 'next/link';

export const metadata = {
  title: 'TeachSense+ | Mahasiswa',
  description: 'Platform LMS Adaptif untuk Mahasiswa',
};

export default function MahasiswaLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-red-600 flex flex-col py-6 px-4 gap-2 overflow-y-auto">
        {/* Logo */}
        <div className="px-2 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <span className="text-red-600 font-black text-sm">T+</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">TeachSense+</span>
          </div>
          <p className="text-red-200 text-xs pl-10">Portal Mahasiswa</p>
        </div>

        {/* User card */}
        <div className="bg-white/15 rounded-2xl p-3 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AH
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">Efran Gustine</p>
            <p className="text-red-200 text-xs truncate">130121001</p>
          </div>
        </div>

        {/* Nav links — rendered as links but tab switching handled in page.jsx */}
        <nav className="flex flex-col gap-1">
          <p className="text-red-300 text-xs font-semibold uppercase tracking-wider px-3 pt-2 pb-1">Menu Utama</p>
          <Link href="/mahasiswa" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Dashboard
          </Link>
          <Link href="/mahasiswa?tab=remedial" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Remedial Center
          </Link>
          <Link href="/mahasiswa?tab=materi" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Materi & Modul
          </Link>
          <Link href="/mahasiswa?tab=kuis" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Kuis & Latihan
          </Link>

          <p className="text-red-300 text-xs font-semibold uppercase tracking-wider px-3 pt-4 pb-1">Lainnya</p>
          <Link href="/mahasiswa?tab=chat" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Chat AI Tutor
          </Link>
          <Link href="/mahasiswa?tab=profil" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/90 hover:bg-white/15 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Profil Saya
          </Link>
        </nav>

        {/* Bottom logout */}
        <div className="mt-auto pt-4 border-t border-red-500">
          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-200 hover:bg-white/10 transition-all w-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
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
