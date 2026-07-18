"use client";

import { KeyboardEvent, useRef } from "react";

interface Props {
  url: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  buttonText?: string;
}

export default function UrlInput({ url, onChange, onSubmit, loading, buttonText }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) onSubmit();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text.trim());
    } catch {
      // Clipboard read not permitted, ignore
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group flex-col sm:flex-row focus-within:ring-4 focus-within:ring-indigo-200"
        style={{
          background: "linear-gradient(90deg, rgba(99,102,241,0.04), rgba(255,255,255,0.6))",
          border: "1px solid rgba(99, 102, 241, 0.22)",
          boxShadow: "0 6px 18px rgba(99,102,241,0.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* URL icon */}
        <div className="pl-3 flex-shrink-0 transition-all duration-300 hidden sm:block">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            style={{ color: "var(--accent-3)" }}
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Paste video URL here — YouTube, TikTok, Instagram..."
          disabled={loading}
          className="url-input flex-1 bg-transparent text-sm py-3 px-2 sm:px-4 transition-all duration-300 w-full sm:w-auto text-slate-900 placeholder-slate-400 focus:outline-none"
          style={{
            caretColor: "var(--accent-3)",
            fontSize: "14px",
          }}
          spellCheck={false}
          autoComplete="off"
        />

        {/* Paste button */}
        <button
          onClick={handlePaste}
          disabled={loading}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-slate-100 text-slate-600"
          style={{ 
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.15)"
          }}
          title="Paste from clipboard"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          </svg>
          Paste
        </button>

        {/* Clear button */}
        {url && !loading && (
          <button
            onClick={() => onChange("")}
            className="flex-shrink-0 p-2 rounded-xl transition-all duration-200 hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}

        {/* Analyze button */}
        <button
          onClick={onSubmit}
          disabled={loading || !url.trim()}
          className="glow-btn flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
          style={{
            background: loading 
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)" 
              : "linear-gradient(135deg, var(--accent-3) 0%, var(--accent) 100%)",
            color: "#fff",
            boxShadow: url.trim() && !loading 
              ? "0 4px 12px rgba(59, 130, 246, 0.25)" 
              : "none",
          }}
        >
          {loading ? (
            <>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{ animationDelay: `${i * 0.15}s`, height: 14 }}
                  />
                ))}
              </div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>{buttonText ?? "Analyze"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
