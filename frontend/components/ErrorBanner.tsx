"use client";

interface Props {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div
      className="mt-6 flex items-start gap-3 p-4 rounded-2xl animation-smooth"
      style={{
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.04) 100%)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        animation: "slideUp 0.3s ease forwards",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Icon */}
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ 
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.08) 100%)" 
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm mb-0.5 text-red-700">
          Something went wrong
        </p>
        <p className="text-xs leading-relaxed break-words text-red-600">
          {message}
        </p>
        <div className="mt-2 text-xs text-red-500">
          💡 Tip: Make sure the URL is publicly accessible and supported by yt-dlp.
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:opacity-70 hover:bg-red-500/10 text-red-600"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
