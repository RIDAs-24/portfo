/**
 * SectionSkeleton — a lightweight height placeholder used as Suspense fallback.
 *
 * Matches approximate section heights to prevent layout shift (CLS) while
 * lazy-loaded section JS is being downloaded.
 * Uses CSS `@apply` classes only — no JS, renders in SSR/RSC context.
 */
export default function SectionSkeleton({ height = 'h-[500px]' }: { height?: string }) {
  return (
    <div
      className={`w-full ${height} flex items-center justify-center`}
      aria-hidden="true"
    >
      <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500/60 rounded-full animate-spin" />
    </div>
  );
}
