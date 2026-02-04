'use client';

import Editor from '@monaco-editor/react';
import { 
  ArrowRight, Loader2, Code2, Copy, Check, Zap, 
  Shield, Database, Sparkles, Terminal, FileCode, 
  Cpu, Github, Command
} from 'lucide-react';
import { useState, useRef } from 'react'; 
import { motion } from 'framer-motion'; 
import Snowfall from 'react-snowfall';

export default function Home() {
  const [editorValue, setEditorValue] = useState('');
  const [convertedCode, setConvertedCode] = useState('// Hasil code Next.js akan muncul di sini...');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  // Hapus type definition <'laravel' | 'next'>
  const [activeTab, setActiveTab] = useState('laravel'); 
  
  // Hapus type definition <HTMLDivElement>
  const editorRef = useRef(null); 

  // Logic convert 
  const handleRunConvert = async () => {
    if (!editorValue) return;
    setIsLoading(true);
    setConvertedCode('// 🧠 Gemini is analyzing logic...'); 
    
    // Simulasi delay
    await new Promise(r => setTimeout(r, 1500)); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: editorValue }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setConvertedCode(data.result);
    } catch (error) { // Hapus : any
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
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* 1. ANIMATED GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-violet-600 opacity-10 blur-[120px]"></div>
        <Snowfall />
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-2xl shadow-black/50 ring-1 ring-white/5"
        >
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-blue-600 p-1.5 rounded-md">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Laravert<span className="text-cyan-500">.ai</span>
            </span>
          </div>
          
          <div className="hidden md:flex gap-6 text-xs font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">How it works</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <button onClick={scrollToEditor} className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-6 hover:bg-white/10 transition-colors cursor-default">
            <Sparkles size={10} />
            <span>Gemini 2.5 Flash</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
            Php Code ?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Rewrite the code.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop rewriting boilerplate. Instantly convert Laravel Controllers into 
            <span className="text-white font-semibold"> Type-Safe Next.js Server Actions </span> 
            with AI precision.
          </p>

          <div className="flex justify-center gap-4">
            <button 
              onClick={scrollToEditor} 
              className="group relative bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Start Converting <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
            
            <button className="px-8 py-4 rounded-xl font-bold text-gray-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
              <Github size={18} /> Star on Github
            </button>
          </div>
        </motion.div>
      </section>

      {/* 4. THE EDITOR INTERFACE */}
      <section ref={editorRef} className="py-10 px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-[1400px] mx-auto"
        >
          {/* Main Window */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
            
            {/* Toolbar Header */}
            <div className="bg-[#111] px-4 h-12 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                {/* Tabs Simulation */}
                <div className="flex gap-1 ml-4 bg-black/20 p-1 rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#1e1e1e] border border-white/5 text-xs text-blue-400">
                    <FileCode size={12} /> ProductController.php
                  </div>
                  <ArrowRight size={10} className="text-gray-600" />
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#1e1e1e] border border-white/5 text-xs text-cyan-400">
                    <Terminal size={12} /> action.ts
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <button 
                  onClick={handleRunConvert}
                  disabled={isLoading || !editorValue}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-1.5 rounded-md text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-cyan-900/20"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
                  {isLoading ? 'PROCESSING...' : 'CONVERT'}
                </button>
              </div>
            </div>

            {/* Split View Editors */}
            <div className="flex flex-col md:flex-row h-[600px] relative">
              
              {/* Left: Input */}
              <div className="flex-1 border-b md:border-b-0 md:border-r border-white/5 relative bg-[#090909]">
                <Editor
                  height="100%"
                  defaultLanguage="php"
                  theme="vs-dark"
                  value={editorValue}
                  onChange={(val) => setEditorValue(val || '')}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14, 
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    padding: { top: 20 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'none',
                    scrollBeyondLastLine: false,
                  }}
                  className="bg-transparent"
                />
                 {/* Watermark Logo BG */}
                 {!editorValue && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="text-center">
                      <FileCode size={48} className="mx-auto mb-2 text-gray-500" />
                      <p className="text-gray-500 text-sm">Paste Laravel Controller here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Output */}
              <div className="flex-1 bg-[#050505] relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={convertedCode}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14, 
                    readOnly: true, 
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                  }}
                />
                
                {/* Floating Copy Button */}
                <button 
                  onClick={handleCopy} 
                  className="absolute top-4 right-6 bg-white/10 backdrop-blur hover:bg-white/20 text-white p-2 rounded-lg border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>}
                </button>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="h-8 bg-[#1a1a1a] border-t border-white/5 flex items-center px-4 justify-between text-[10px] text-gray-500">
               <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Command size={10} /> Ready</span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"><Database size={10} /> Prisma</span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"><Shield size={10} /> Zod</span>
               </div>
               <div>
                 Ln 1, Col 1
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. FEATURES GRID (Bento Style) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why use Laravert?</h2>
            <p className="text-gray-400">Transform your workflow without changing your mindset.</p>
         </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: <Shield className="text-cyan-400" />, 
              title: "Auto Zod Schemas", 
              desc: "Laravel validation rules are automatically converted to Zod schemas for end-to-end type safety." 
            },
            { 
              icon: <Database className="text-purple-400" />, 
              title: "Eloquent → Prisma", 
              desc: "Complex Eloquent relationships and scopes are translated into optimized Prisma queries." 
            },
            { 
              icon: <Cpu className="text-blue-400" />, 
              title: "Server Actions Native", 
              desc: "No more API routes. Get pure Server Actions ready to be imported into your Client Components." 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ring-1 ring-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center">
               <span className="font-bold text-white text-xs">LV</span>
            </div>
            <span className="font-semibold text-gray-300">Laravert.ai</span>
          </div>
          <p className="text-gray-600 text-xs">
            © 2026 Hackathon Project.by Fatih, Nawfal, Narayana, Arya.
          </p>
        </div>
      </footer>
    </div>
  );
}