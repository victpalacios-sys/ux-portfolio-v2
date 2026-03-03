export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-foreground)' }}>Victor Palacios</h1>
        <p className="font-sans" style={{ color: 'var(--color-muted)' }}>Design tokens working</p>
        <div className="mt-4 w-8 h-8 rounded-full mx-auto" style={{ background: 'var(--color-gold)' }}></div>
      </div>
    </main>
  );
}
