export function ParallaxBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-indigo-200/20 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-purple-100/25 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-[360px] h-[360px] rounded-full bg-sky-100/25 blur-3xl" />
    </div>
  );
}
