export function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-background" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0 h-[60vh] dark:hidden"
        style={{
          background:
            'radial-gradient(80% 60% at 50% -10%, hsl(33 60% 55% / 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[60vh] hidden dark:block"
        style={{
          background:
            'radial-gradient(80% 60% at 50% -10%, hsl(33 40% 20% / 0.28) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '160px 160px',
        }}
      />
    </div>
  );
}
