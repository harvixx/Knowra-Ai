import React, { useState, useEffect, useRef } from "react";
import {
  Send, Plus, Settings, LogOut, Terminal,
  User, Cpu, ChevronRight, Zap, Hash, Clock,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   All colours come from CSS variables in index.css
   No colour literals here — only var(--*)
───────────────────────────────────────────────────────── */

const HISTORY = [
  "System_Analysis_v1",
  "Neural_Network_Query",
  "Data_Synthesis_03",
  "Protocol_Review",
];

const CHIPS = [
  { icon: <Zap size={10} />, label: "Analyze" },
  { icon: <Hash size={10} />, label: "Summarize" },
  { icon: <Clock size={10} />, label: "History" },
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const chatRef                 = useRef(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const handleSend = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [
        ...p,
        {
          role: "ai",
          content:
            "SYSTEM_CORE_READY: Processing your request in high-fidelity mode. All neural pathways are nominal.",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden relative"
         style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── Background grid ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Scanline overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[998]"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, var(--scanline) 2px, var(--scanline) 4px)`,
        }}
      />

      {/* ════════════════════════════════
          SIDEBAR
      ════════════════════════════════ */}
      <aside
        className="hidden md:flex w-64 flex-col shrink-0 relative z-10 border-r"
        style={{ background: "var(--surface)", borderColor: "var(--border-md)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border-md)" }}>
          <div className="flex items-center gap-3 mb-5">
            {/* Logo mark: outer rotating square + inner diamond */}
            <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
              <div
                className="absolute inset-0 border animate-logo"
                style={{ borderColor: "var(--border-strong)" }}
              />
              <div
                className="w-2.5 h-2.5 rotate-45"
                style={{ background: "var(--text)" }}
              />
            </div>
            <span
              className="text-base font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--text)" }}
            >
              Knowra
            </span>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 border text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-150"
            style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--text)";
              e.currentTarget.style.color      = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color      = "var(--text)";
            }}
          >
            <Plus size={12} /> New Session
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p
            className="text-[8px] font-bold uppercase tracking-[0.25em] px-2 mb-3 flex items-center gap-2"
            style={{ color: "var(--text-dim)" }}
          >
            History_Log
            <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </p>
          {HISTORY.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-2 text-[10px] cursor-pointer rounded-sm mb-0.5 border border-transparent transition-all duration-150 truncate"
              style={{ color: "var(--text-dim)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color        = "var(--text)";
                e.currentTarget.style.background   = "var(--chip-hover)";
                e.currentTarget.style.borderColor  = "var(--border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color        = "var(--text-dim)";
                e.currentTarget.style.background   = "transparent";
                e.currentTarget.style.borderColor  = "transparent";
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--text-muted)" }} />
              {item}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t" style={{ borderColor: "var(--border-md)" }}>
          {[
            { icon: <Settings size={12} />, label: "Settings", danger: false },
            { icon: <LogOut size={12} />,   label: "Terminate", danger: true  },
          ].map(({ icon, label, danger }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-150 mb-0.5"
              style={{ color: danger ? "rgba(200,60,60,0.75)" : "var(--text-dim)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = danger ? "rgba(200,60,60,0.08)" : "var(--chip-hover)";
                e.currentTarget.style.color      = danger ? "rgba(200,60,60,1)"    : "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color      = danger ? "rgba(200,60,60,0.75)" : "var(--text-dim)";
              }}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ════════════════════════════════
          MAIN
      ════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10" style={{ background: "var(--bg)" }}>

        {/* Header */}
        <header
          className="h-14 flex items-center justify-between px-7 shrink-0 border-b"
          style={{ background: "var(--surface)", borderColor: "var(--border-md)" }}
        >
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]"
               style={{ color: "var(--text-dim)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-blink"
              style={{ background: "var(--text)" }}
            />
            Node_01 // <span style={{ color: "var(--text)" }}>Online</span>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 border"
            style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
          >
            Knowra_OS_v2
          </span>
        </header>

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10"
        >
          {messages.length === 0 && !typing ? (
            /* ── Empty state ── */
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div
                className="w-16 h-16 flex items-center justify-center relative border"
                style={{ borderColor: "var(--border-strong)" }}
              >
                {/* Corner accents */}
                {["top-0 left-0 border-t border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                  <span
                    key={i}
                    className={`absolute w-2.5 h-2.5 ${cls}`}
                    style={{ borderColor: "var(--text)", margin: "-4px" }}
                  />
                ))}
                <Terminal size={26} style={{ color: "var(--text-dim)" }} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em]"
                 style={{ color: "var(--text-muted)" }}>
                Awaiting Command
              </p>
              <p className="text-[9px] tracking-[0.1em]"
                 style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                Initialize a query to begin session
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex animate-msg-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[84%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>

                    {/* Avatar */}
                    <div
                      className="w-9 h-9 shrink-0 flex items-center justify-center border"
                      style={{
                        borderColor: "var(--border-strong)",
                        background:  msg.role === "ai" ? "var(--text)" : "transparent",
                        color:       msg.role === "ai" ? "var(--bg)"  : "var(--text-dim)",
                      }}
                    >
                      {msg.role === "ai" ? <Cpu size={16} /> : <User size={16} />}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {/* Label */}
                      <p
                        className={`text-[8px] font-bold uppercase tracking-[0.18em] ${msg.role === "user" ? "text-right" : ""}`}
                        style={{ color: msg.role === "ai" ? "var(--text)" : "var(--text-dim)" }}
                      >
                        {msg.role === "ai" ? "[Knowra_Core]" : "[User_Verified]"}
                      </p>

                      {/* Bubble */}
                      <div
                        className="text-[13px] leading-relaxed px-4 py-3.5 border relative"
                        style={{
                          background:   msg.role === "ai" ? "var(--bubble-ai)" : "var(--bubble-user)",
                          borderColor:  "var(--border-md)",
                          boxShadow:    `3px 3px 0 0 var(--border)`,
                          borderRadius: msg.role === "ai" ? "1px 6px 6px 6px" : "6px 1px 6px 6px",
                        }}
                      >
                        {/* AI bubble top-line accent */}
                        {msg.role === "ai" && (
                          <span
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{ background: "var(--border-strong)" }}
                          />
                        )}
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start animate-msg-in">
                  <div className="flex gap-3 max-w-[84%]">
                    <div
                      className="w-9 h-9 shrink-0 flex items-center justify-center border"
                      style={{ borderColor: "var(--border-strong)", background: "var(--text)", color: "var(--bg)" }}
                    >
                      <Cpu size={16} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.18em]"
                         style={{ color: "var(--text)" }}>
                        [Knowra_Core]
                      </p>
                      <div
                        className="flex items-center gap-1.5 px-4 py-3.5 border"
                        style={{ borderColor: "var(--border-md)", background: "var(--bubble-ai)", boxShadow: `3px 3px 0 0 var(--border)` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-type-1" style={{ background: "var(--text)" }} />
                        <span className="w-1.5 h-1.5 rounded-full animate-type-2" style={{ background: "var(--text-dim)" }} />
                        <span className="w-1.5 h-1.5 rounded-full animate-type-3" style={{ background: "var(--text-muted)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Input area ── */}
        <div
          className="shrink-0 px-6 pt-3 pb-5 md:px-12 border-t"
          style={{ background: "var(--surface)", borderColor: "var(--border-md)" }}
        >
          {/* Quick chips */}
          <div className="max-w-3xl mx-auto flex gap-2 mb-3 flex-wrap">
            {CHIPS.map(({ icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] border rounded-sm transition-all duration-150"
                style={{ borderColor: "var(--border-md)", color: "var(--text-dim)" }}
                onClick={() => setInput(label + ": ")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.color       = "var(--text)";
                  e.currentTarget.style.background  = "var(--chip-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-md)";
                  e.currentTarget.style.color       = "var(--text-dim)";
                  e.currentTarget.style.background  = "transparent";
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Textarea row */}
          <form onSubmit={handleSend} className="max-w-3xl mx-auto">
            <div className="flex gap-2 items-end relative">
              {/* Corner brackets on input */}
              <span className="absolute -top-1.5 left-0 w-3 h-3 border-t border-l pointer-events-none z-10"
                    style={{ borderColor: "var(--border-strong)" }} />
              <span className="absolute -bottom-1.5 right-12 w-3 h-3 border-b border-r pointer-events-none z-10"
                    style={{ borderColor: "var(--border-strong)" }} />

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="TYPE_COMMAND_HERE..."
                rows={1}
                className="flex-1 resize-none px-4 py-3.5 text-[13px] font-medium outline-none border transition-all duration-150 placeholder:text-[11px] placeholder:tracking-widest"
                style={{
                  background:   "var(--input-bg)",
                  borderColor:  "var(--border-md)",
                  color:        "var(--text)",
                  fontFamily:   "'IBM Plex Mono', monospace",
                  placeholderColor: "var(--text-muted)",
                }}
                onFocus={(e)  => { e.target.style.background = "var(--input-focus)"; e.target.style.borderColor = "var(--border-strong)"; }}
                onBlur={(e)   => { e.target.style.background = "var(--input-bg)";    e.target.style.borderColor = "var(--border-md)"; }}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              />

              <button
                type="submit"
                className="w-12 h-12 shrink-0 flex items-center justify-center border transition-all duration-150"
                style={{ background: "var(--send-bg)", color: "var(--send-text)", borderColor: "var(--border-strong)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--send-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--send-bg)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Send size={17} />
              </button>
            </div>

            {/* Meta hint */}
            <div className="flex justify-between mt-2 px-0.5">
              <span className="text-[8px] tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--text-dim)" }}>Enter</span> to send ·{" "}
                <span style={{ color: "var(--text-dim)" }}>Shift+Enter</span> new line
              </span>
              <span className="text-[8px] tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>
                Session_01
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}