export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-[#faf8f5] to-amber-50/50" />

      <div className="aurora-band aurora-band-1" />
      <div className="aurora-band aurora-band-2" />

      <div className="absolute inset-0 bg-[#faf8f5]/72" />
    </div>
  );
}
