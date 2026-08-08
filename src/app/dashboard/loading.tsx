export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-xl bg-muted/60 dark:bg-white/[0.06] animate-pulse" />
          <div className="h-4 w-72 rounded-lg bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 rounded-xl bg-muted/60 dark:bg-white/[0.06] animate-pulse" />
          <div className="h-10 w-36 rounded-xl bg-primary/20 animate-pulse" />
        </div>
      </div>

      {/* Main Card Skeleton */}
      <div className="p-6 md:p-8 rounded-2xl border border-border/70 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/80 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 dark:border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-5 w-36 rounded-lg bg-muted/60 dark:bg-white/[0.06] animate-pulse" />
              <div className="h-3.5 w-48 rounded-md bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
            </div>
          </div>
          <div className="h-9 w-24 rounded-xl bg-muted/60 dark:bg-white/[0.06] animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="h-12 w-full rounded-xl bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
          <div className="h-28 w-full rounded-xl bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-[#0c1017]/60 backdrop-blur-xl flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-muted/60 dark:bg-white/[0.06] animate-pulse shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-28 rounded-md bg-muted/60 dark:bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-36 rounded-md bg-muted/40 dark:bg-white/[0.03] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
