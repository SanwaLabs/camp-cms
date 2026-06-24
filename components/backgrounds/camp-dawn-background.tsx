export function CampDawnBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-50/95" />

      <div className="camp-blob camp-blob-1" />
      <div className="camp-blob camp-blob-2" />
      <div className="camp-blob camp-blob-3" />
      <div className="camp-blob camp-blob-4" />
      <div className="camp-blob camp-blob-5" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath fill='none' stroke='%230f172a' stroke-width='1' d='M0 80 Q100 60 200 80 T400 80 M0 160 Q100 140 200 160 T400 160 M0 240 Q100 220 200 240 T400 240 M0 320 Q100 300 200 320 T400 320'/%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
        }}
      />
    </div>
  );
}
