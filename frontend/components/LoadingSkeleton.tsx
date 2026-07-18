"use client";

export default function LoadingSkeleton() {
  return (
    <div className="mt-8 space-y-4 animate-fade-in">
      {/* Video card skeleton */}
      <div className="glass-card overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail skeleton */}
          <div className="sm:w-72 h-40 shimmer flex-shrink-0" />

          {/* Info skeleton */}
          <div className="flex-1 p-5 space-y-3">
            <div className="h-5 rounded-lg shimmer w-3/4" />
            <div className="h-4 rounded-lg shimmer w-1/2" />
            <div className="h-4 rounded-lg shimmer w-1/3" />
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-24 rounded-full shimmer" />
              <div className="h-6 w-20 rounded-full shimmer" />
            </div>
          </div>
        </div>
      </div>



      {/* Quality grid skeleton */}
      <div className="glass-card p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl shimmer" />
          <div className="h-5 w-40 rounded-lg shimmer" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 p-1 rounded-xl bg-slate-100">
          <div className="flex-1 h-9 rounded-lg shimmer" />
          <div className="flex-1 h-9 rounded-lg shimmer" style={{ opacity: 0.5 }} />
        </div>

      

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-2xl p-4 space-y-3 glass-card"
              style={{ 
                animation: `shimmer 1.5s infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="h-6 w-14 rounded-full shimmer" />
                  <div className="h-3 w-20 rounded shimmer" />
                </div>
              </div>
              <div className="h-3 w-16 rounded shimmer" />
              <div className="h-9 rounded-xl shimmer" />
            </div>
          ))}
        </div>

        {/* Analyzing status */}
        <div className="mt-5 flex items-center justify-center gap-3 text-slate-600">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span className="text-sm font-medium">Analyzing video and detecting all available formats...</span>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
