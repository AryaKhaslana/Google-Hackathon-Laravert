'use client';

import Editor from '@monaco-editor/react';
import { ArrowRight, Loader2, Code2, FileCode, Copy, Check, Zap, Shield, Database, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react'; 

export default function Home() {
  const [editorValue, setEditorValue] = useState('');
  const [convertedCode, setConvertedCode] = useState('// Hasil code Next.js akan muncul di sini...');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef(null);

  // Logic convert (Gak berubah, tetep pake fetch yang aman)
  const handleRunConvert = async () => {
    if (!editorValue) return;
    setIsLoading(true);
    setConvertedCode('// 🧠 Gemini is thinking...'); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: editorValue }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setConvertedCode(data.result);
    } catch (error) {
      setConvertedCode(`// Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToEditor = () => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Background Utama (Gradient Gelap Mewah)
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Efek Glow di Background (Biar gak sepi) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Laraview {/* <-- GANTI NAMA APLIKASI DISINI */}
            </span>
          </div>
          <button 
            onClick={scrollToEditor} 
            className="hidden sm:block bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all border border-white/10"
          >
            Try Demo
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 text-center max-w-5xl mx-auto">
        {/* Badge Kecil */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-medium mb-8 animate-fade-in-up">
          <Sparkles size={12} />
          <span>Powered by Gemini 1.5 Flash</span> {/* <-- GANTI TEKS BADGE */}
        </div>

        {/* Headline Gede */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Modernize your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Legacy Codebase.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transformasi kode <strong>Laravel Controller</strong> lo jadi <strong>Next.js Server Actions</strong> dalam hitungan detik. Cerdas, rapi, dan Type-Safe.
          {/* <-- GANTI DESKRIPSI DI ATAS SESUAI SELERA */}
        </p>

        {/* Tombol CTA */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={scrollToEditor} 
            className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] flex items-center gap-2"
          >
            Start Migrating 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* EDITOR SECTION (The Main Tool) */}
      <section ref={editorRef} className="py-10 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Window Frame (Style ala macOS) */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f]">
            
            {/* Window Header / Toolbar */}
            <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              {/* Traffic Lights (Hiasan doang biar keren) */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Tombol Action Tengah (Convert) */}
              <button 
                onClick={handleRunConvert}
                disabled={isLoading || !editorValue}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
              >
                {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} fill="currentColor" />}
                {isLoading ? 'Converting...' : 'RUN CONVERT'}
              </button>

               {/* Tombol Kanan (Copy) */}
               <button 
                onClick={handleCopy} 
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10"
              >
                {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            {/* Area Editor Kiri-Kanan */}
            <div className="flex flex-col md:flex-row h-[600px]">
              {/* Kiri: Input Laravel */}
              <div className="flex-1 border-b md:border-b-0 md:border-r border-white/5 relative group">
                {/* Label Kecil Mengambang */}
                <div className="absolute top-4 right-6 z-10 px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono tracking-wide uppercase">
                  PHP / Laravel
                </div>
                <Editor
                  height="100%"
                  defaultLanguage="php"
                  theme="vs-dark"
                  value={editorValue}
                  onChange={(value) => setEditorValue(value || '')} 
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14, 
                    fontFamily: 'JetBrains Mono, monospace', // Font coding keren
                    padding: { top: 24, bottom: 24 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true
                  }}
                />
              </div>

              {/* Kanan: Output Next.js */}
              <div className="flex-1 bg-[#0c0c0c] relative">
                 {/* Label Kecil Mengambang */}
                 <div className="absolute top-4 right-6 z-10 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-wide uppercase">
                  TS / Next.js
                </div>
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={convertedCode}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14, 
                    readOnly: true, 
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: { top: 24, bottom: 24 },
                    smoothScrolling: true
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Biar kelihatan profesional) */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Zod Validation</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Otomatis mengubah validasi <code>$request</code> Laravel menjadi skema <strong>Zod</strong> yang type-safe di sisi klien & server.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Eloquent to Prisma</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Menerjemahkan query Eloquent yang kompleks menjadi syntax <strong>Prisma ORM</strong> yang efisien dan mudah dibaca.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 hover:bg-white/[0.04] transition-all group">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Server Actions</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Mengonversi Controller logic langsung menjadi <strong>Next.js Server Actions</strong>, siap pakai tanpa perlu setup API route manual.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm mb-2">
            Built for <strong>Google Gemini Hackathon 2026</strong>
          </p>
          <p className="text-slate-600 text-xs">
            Crafted by <span className="text-slate-400 font-medium">Fatih, Nawfal, Narayana, & You</span> {/* <-- GANTI NAMA TIM DISINI */}
          </p>
        </div>
      </footer>
    </div>
  );
}