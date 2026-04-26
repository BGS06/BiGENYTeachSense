'use client';

import { useState } from 'react';
import {
  Home, AlertTriangle, BookOpen, ClipboardList, MessageCircle, User,
  TrendingUp, Star, Clock, CheckCircle, XCircle, Brain, Zap,
  ChevronRight, Play, Lock, Award, BarChart2, RefreshCw, Send,
  ArrowRight, Target, Flame, Shield
} from 'lucide-react';

// ─── TAB CONFIG ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'remedial', label: 'Remedial Center', icon: AlertTriangle },
  { id: 'materi', label: 'Materi & Modul', icon: BookOpen },
  { id: 'kuis', label: 'Kuis & Latihan', icon: ClipboardList },
  { id: 'chat', label: 'Chat AI Tutor', icon: MessageCircle },
];

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────
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
  { role: 'assistant', text: 'Tentu! Berikut penjelasannya:\n\n**var** — Scope function, bisa di-redeclare, di-hoist. Hindari di kode modern.\n\n**let** — Scope block, tidak bisa di-redeclare, bisa di-reassign. Digunakan untuk variabel yang nilainya berubah.\n\n**const** — Scope block, tidak bisa di-redeclare maupun di-reassign. Digunakan untuk nilai tetap (referensi objek/array bisa berubah isinya).\n\nContoh:\n```js\nconst nama = "Ahmad"; // tidak bisa diubah\nlet nilai = 85;       // bisa diubah: nilai = 90\n```\n\nApakah ada yang ingin ditanyakan lebih lanjut?' },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, gradient }) {
  return (
    <div className={`${gradient} rounded-3xl p-5 text-white`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-white/70 text-xs font-medium">{sub}</span>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-white/80 text-sm font-medium">{label}</p>
    </div>
  );
}

function MasteryBar({ topik, nilai, kurang }) {
  const color = nilai >= 75 ? 'bg-emerald-500' : nilai >= 50 ? 'bg-orange-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-slate-700 w-44 flex-shrink-0 truncate">{topik}</p>
      <div className="flex-1 progress-bar">
        <div className={`progress-fill ${color}`} style={{ width: `${nilai}%` }} />
      </div>
      <span className={`text-xs font-bold w-10 text-right ${nilai >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{nilai}%</span>
      {kurang && <span className="badge bg-orange-100 text-orange-700 text-xs">⚠</span>}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
function TabDashboard() {
  return (
    <div className="fade-up space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Selamat Datang, Bintang! 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Pemrograman Web — Semester Genap 2025</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-orange-700 font-semibold text-sm">5 hari streak belajar!</span>
        </div>
      </div>

      {/* Alert Remedial */}
      <div className="remedial-gradient rounded-3xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-orange-800">Kamu perlu mengerjakan Remedial</p>
          <p className="text-orange-700 text-sm mt-0.5">Skor kuis JavaScript #1 kamu (62) di bawah batas kelulusan (75). Selesaikan latihan adaptif untuk unlock materi berikutnya.</p>
        </div>
        <button className="flex-shrink-0 bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-2xl hover:bg-orange-600 transition-colors">
          Mulai Sekarang
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Mastery Index" value="72%" sub="Overall" gradient="stat-red" />
        <StatCard icon={CheckCircle} label="Materi Selesai" value="2/6" sub="Modul" gradient="stat-blue" />
        <StatCard icon={Star} label="Rata-rata Skor" value="78.5" sub="Kuis" gradient="stat-green" />
        <StatCard icon={Clock} label="Total Belajar" value="24 Jam" sub="Minggu ini" gradient="stat-purple" />
      </div>

      {/* Mastery per Topik */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-900">Mastery per Topik</h2>
          <span className="badge bg-slate-100 text-slate-600">Real-time</span>
        </div>
        <div className="space-y-4">
          <MasteryBar topik="HTML & Struktur Dokumen" nilai={92} kurang={false} />
          <MasteryBar topik="CSS Styling & Layout" nilai={88} kurang={false} />
          <MasteryBar topik="JavaScript Variables" nilai={62} kurang={true} />
          <MasteryBar topik="JavaScript Functions" nilai={55} kurang={true} />
          <MasteryBar topik="DOM Manipulation" nilai={30} kurang={true} />
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-bold text-slate-900 mb-4">Aktivitas Terakhir</h2>
          <div className="space-y-3">
            {[
              { icon: CheckCircle, color: 'text-emerald-500', text: 'Menyelesaikan Modul HTML & CSS', time: '2 jam lalu' },
              { icon: XCircle, color: 'text-red-500', text: 'Gagal Kuis JavaScript #1 (62)', time: '1 hari lalu' },
              { icon: Play, color: 'text-blue-500', text: 'Mulai Materi JavaScript Variables', time: '1 hari lalu' },
              { icon: Award, color: 'text-yellow-500', text: 'Badge "HTML Master" diperoleh', time: '3 hari lalu' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
                <p className="text-sm text-slate-700 flex-1">{item.text}</p>
                <span className="text-xs text-slate-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card ai-gradient border-violet-200">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-violet-600" />
            <h2 className="font-bold text-slate-900">Rekomendasi AI</h2>
          </div>
          <div className="space-y-3">
            {[
              'Pelajari ulang konsep Scope di JavaScript',
              'Kerjakan 3 latihan Adaptive Quiz tentang Functions',
              'Tonton video "Closure di JS" sebelum lanjut',
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-2 bg-white/60 rounded-2xl p-3">
                <Zap className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabRemedial() {
  const [method, setMethod] = useState('quiz');
  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Remedial Center</h1>
        <p className="text-slate-500 text-sm mt-1">Latihan adaptif untuk topik yang belum dikuasai</p>
      </div>

      {/* Topik remedial */}
      <div className="card border-orange-200 bg-orange-50/50">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-orange-800">Topik yang Perlu Diperkuat</h2>
        </div>
        <div className="space-y-3">
          {[
            { topik: 'JavaScript Variables & Scope', skor: 62, target: 75 },
            { topik: 'JavaScript Functions', skor: 55, target: 75 },
            { topik: 'DOM Manipulation', skor: 30, target: 75 },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm">{item.topik}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 progress-bar">
                    <div className="progress-fill bg-orange-400" style={{ width: `${(item.skor / 100) * 100}%` }} />
                  </div>
                  <span className="text-xs text-orange-600 font-bold">{item.skor} / {item.target}</span>
                </div>
              </div>
              <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors flex-shrink-0">
                Latihan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pilih metode */}
      <div className="card">
        <h2 className="font-bold text-slate-900 mb-4">Pilih Metode Penguatan</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setMethod('quiz')}
            className={`p-5 rounded-3xl border-2 text-left transition-all ${method === 'quiz' ? 'border-violet-400 bg-violet-50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <Brain className={`w-7 h-7 mb-3 ${method === 'quiz' ? 'text-violet-600' : 'text-slate-400'}`} />
            <p className={`font-bold text-sm ${method === 'quiz' ? 'text-violet-800' : 'text-slate-700'}`}>Adaptive Quiz</p>
            <p className="text-xs text-slate-500 mt-1">Soal menyesuaikan tingkat kemampuanmu secara otomatis</p>
          </button>
          <button
            onClick={() => setMethod('coding')}
            className={`p-5 rounded-3xl border-2 text-left transition-all ${method === 'coding' ? 'border-violet-400 bg-violet-50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <Zap className={`w-7 h-7 mb-3 ${method === 'coding' ? 'text-violet-600' : 'text-slate-400'}`} />
            <p className={`font-bold text-sm ${method === 'coding' ? 'text-violet-800' : 'text-slate-700'}`}>Coding Lab</p>
            <p className="text-xs text-slate-500 mt-1">Praktik langsung dengan editor kode interaktif</p>
          </button>
        </div>

        <button className="mt-5 w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <Play className="w-5 h-5" />
          Mulai {method === 'quiz' ? 'Adaptive Quiz' : 'Coding Lab'} Sekarang
        </button>
      </div>

      {/* Rekomendasi AI */}
      <div className="card ai-gradient border-violet-200">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-violet-600" />
          <h2 className="font-bold text-slate-900">Tips dari AI Tutor</h2>
        </div>
        <div className="space-y-2">
          {[
            'Fokus pada pemahaman konsep Closure terlebih dahulu',
            'Coba buat 3 fungsi sederhana setiap hari selama seminggu',
            'Gunakan console.log untuk debug dan pahami alur program',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/60 rounded-xl p-3">
              <span className="w-5 h-5 bg-violet-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
              <p className="text-sm text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabMateri() {
  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Materi & Modul</h1>
        <p className="text-slate-500 text-sm mt-1">Akses materi pembelajaran berdasarkan progress mastery kamu</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {materiList.map((m) => (
          <div
            key={m.id}
            className={`card flex items-center gap-5 ${m.locked ? 'opacity-60' : ''}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${m.progress === 100 ? 'bg-emerald-100' : m.locked ? 'bg-slate-100' : 'bg-red-100'}`}>
              {m.locked ? (
                <Lock className="w-5 h-5 text-slate-400" />
              ) : m.progress === 100 ? (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              ) : (
                <BookOpen className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-slate-800 truncate">{m.title}</p>
                <span className={`badge flex-shrink-0 ${m.badge === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : m.badge === 'Aktif' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                  {m.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{m.topik} topik</p>
              {!m.locked && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 progress-bar">
                    <div
                      className={`progress-fill ${m.progress === 100 ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium w-10 text-right">{m.progress}%</span>
                </div>
              )}
            </div>
            <button
              disabled={m.locked}
              className={`flex-shrink-0 flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${m.locked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              {m.progress === 100 ? 'Review' : m.locked ? 'Terkunci' : 'Lanjut'}
              {!m.locked && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabKuis() {
  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kuis & Latihan</h1>
        <p className="text-slate-500 text-sm mt-1">Riwayat dan jadwal kuis kamu</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-sm text-center">
          <p className="text-2xl font-bold text-emerald-600">1</p>
          <p className="text-xs text-slate-500 mt-1">Lulus</p>
        </div>
        <div className="card-sm text-center">
          <p className="text-2xl font-bold text-red-500">1</p>
          <p className="text-xs text-slate-500 mt-1">Remedial</p>
        </div>
        <div className="card-sm text-center">
          <p className="text-2xl font-bold text-slate-400">2</p>
          <p className="text-xs text-slate-500 mt-1">Belum</p>
        </div>
      </div>

      <div className="space-y-3">
        {kuisList.map((k) => (
          <div key={k.id} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-black ${k.status === 'Lulus' ? 'bg-emerald-100 text-emerald-700' : k.status === 'Remedial' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
              {k.skor ?? '–'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{k.title}</p>
              <p className="text-xs text-slate-500">{k.topik} · {k.tanggal}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`badge ${k.status === 'Lulus' ? 'bg-emerald-100 text-emerald-700' : k.status === 'Remedial' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                {k.status}
              </span>
              <div className="mt-2">
                {k.status === 'Remedial' && (
                  <button className="text-xs bg-orange-500 text-white px-3 py-1 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                    Remedial
                  </button>
                )}
                {k.status === 'Belum' && (
                  <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    Mulai
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabChat() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Terima kasih pertanyaannya! Saya sedang menganalisis... Fitur AI live akan aktif setelah integrasi API. Sementara itu, kamu bisa cek materi terkait di modul pembelajaran.' },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fade-up flex flex-col h-full" style={{ height: 'calc(100vh - 3rem)' }}>
      <div className="mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-100 rounded-2xl flex items-center justify-center">
          <Brain className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Chat AI Tutor</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot" />
            <span className="text-xs text-slate-500">Online · siap membantu</span>
          </div>
        </div>
      </div>

      <div className="flex-1 card overflow-y-auto space-y-4 min-h-0" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Brain className="w-4 h-4 text-violet-600" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-3xl px-4 py-3 text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-red-600 text-white rounded-br-lg' : 'bg-slate-100 text-slate-800 rounded-bl-lg'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center">
              <Brain className="w-4 h-4 text-violet-600" />
            </div>
            <div className="bg-slate-100 rounded-3xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map((d) => (
                <div key={d} className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tanya sesuatu tentang materi..."
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-red-400 transition-colors"
        />
        <button
          onClick={handleSend}
          className="bg-red-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MahasiswaPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <TabDashboard />;
      case 'remedial': return <TabRemedial />;
      case 'materi': return <TabMateri />;
      case 'kuis': return <TabKuis />;
      case 'chat': return <TabChat />;
      default: return <TabDashboard />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-slate-100 px-6 py-0 flex-shrink-0">
        <div className="flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-all ${isActive ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {renderTab()}
      </div>
    </div>
  );
}
