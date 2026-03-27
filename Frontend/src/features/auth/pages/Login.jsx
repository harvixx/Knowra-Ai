import React, { useState, useEffect, useRef } from "react";
import { Send, Plus, Settings, LogOut, Terminal, User, Cpu, ChevronRight } from "lucide-react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "SYSTEM_CORE_ENGAGED: I am processing your request. How else can I assist your workflow?" },
      ]);
    }, 8000); // Realistic slight delay
  };

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)] font-mono transition-all duration-300">
      
      {/* Subtle background grid (from your Login page) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-[color-mix(in_srgb,var(--text)_12%,transparent)] flex flex-col relative z-10 hidden md:flex">
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-6 h-6 border-2 border-[var(--text)] flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rotate-45 bg-[var(--text)]" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight">Knowra</span>
            <span className="text-[8px] border border-[color-mix(in_srgb,var(--text)_20%,transparent)] px-1 py-0.5 opacity-50">AI</span>
          </div>

          <button className="w-full border border-[color-mix(in_srgb,var(--text)_20%,transparent)] py-2 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[color-mix(in_srgb,var(--text)_5%,transparent)] transition-all">
            <Plus size={14} /> New Session
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <p className="text-[9px] uppercase tracking-widest opacity-30 mb-4 px-2">History_Log</p>
          {/* Dummy History Items */}
          {["System_Analysis_v1", "Neural_Network_Query", "Market_Logic_Draft"].map((item, i) => (
            <div key={i} className="text-[11px] p-2 opacity-50 hover:opacity-100 hover:bg-[color-mix(in_srgb,var(--text)_3%,transparent)] cursor-pointer flex items-center gap-2 truncate">
              <ChevronRight size={10} /> {item}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[color-mix(in_srgb,var(--text)_10%,transparent)] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <Settings size={14} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors">
            <LogOut size={14} /> Terminate
          </button>
        </div>
      </aside>

      {/* --- MAIN CHAT AREA --- */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* Chat Header */}
        <header className="h-16 border-b border-[color-mix(in_srgb,var(--text)_8%,transparent)] flex items-center justify-between px-8">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">
            Node: 01 // Status: <span className="text-green-500">Active</span>
          </div>
          <div className="text-[10px] border px-2 py-1 border-[color-mix(in_srgb,var(--text)_15%,transparent)] opacity-50">
            v2.0.4-LTS
          </div>
        </header>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
              <Terminal size={48} strokeWidth={1} className="mb-4" />
              <h2 className="text-2xl font-serif italic uppercase tracking-widest">Awaiting Command</h2>
              <p className="text-xs mt-2 font-mono tracking-tighter">Enter query to begin neural processing</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`max-w-3xl mx-auto flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-8 h-8 shrink-0 flex items-center justify-center border ${msg.role === 'ai' ? 'border-[var(--text)]' : 'border-[color-mix(in_srgb,var(--text)_30%,transparent)] opacity-50'}`}>
                    {msg.role === 'ai' ? <Cpu size={16} /> : <User size={16} />}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] opacity-30">
                      {msg.role === 'ai' ? 'Core_Knowra' : 'Authorized_User'}
                    </p>
                    <div className={`text-[13px] leading-relaxed font-light p-4 ${
                      msg.role === 'ai' 
                      ? 'bg-[color-mix(in_srgb,var(--text)_3%,transparent)] border-l border-[var(--text)] shadow-[8px_8px_0_0_color-mix(in_srgb,var(--text)_2%,transparent)]' 
                      : 'opacity-80'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-12 pt-0">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto relative group">
            {/* Corner Brackets for Input (Identity) */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--text)] opacity-40 group-focus-within:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--text)] opacity-40 group-focus-within:opacity-100 transition-opacity" />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Execute query..."
              className="w-full bg-transparent border border-[color-mix(in_srgb,var(--text)_15%,transparent)] focus:border-[var(--text)] p-4 pr-14 text-sm font-light outline-none transition-all resize-none min-h-[56px] placeholder:opacity-20"
              rows={1}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend(e))}
            />
            
            <button
              type="submit"
              className="absolute right-3 bottom-3 p-2 text-[var(--text)] opacity-40 hover:opacity-100 transition-opacity"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-4 opacity-20 text-[8px] uppercase tracking-[0.4em]">
            Neural Protocol Active // Data Encrypted 256-Bit
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;