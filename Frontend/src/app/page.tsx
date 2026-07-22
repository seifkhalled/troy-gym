import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-64 -top-64 size-[40rem] rounded-full bg-primary/5 blur-[160px]" />
        <div className="absolute -bottom-64 -right-64 size-[40rem] rounded-full bg-secondary/5 blur-[160px]" />
        <div className="absolute left-1/3 top-1/3 size-96 rounded-full bg-cyan/5 blur-[120px]" />
      </div>

      {/* Nav */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between h-20 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-primary">ACHILLES</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#features">Features</a>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/body">Explorer</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/body"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-all active:scale-95"
              style={{ boxShadow: "0 0 20px oklch(0.72 0.18 200 / 0.3)" }}
            >
              Begin Discovery
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Next Gen Fitness Intelligence</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 uppercase tracking-tighter">
            Unleash Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inner Warrior</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Elite-level digital coaching. Precision anatomy mapping meets AI-driven performance tracking. Built for those who demand mastery.
          </p>
          <Link
            href="/body"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-heading text-base font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
            style={{ boxShadow: "0 0 30px oklch(0.72 0.18 200 / 0.4)" }}
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative flex items-center gap-2">
              Start Exploring
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Precision Engineering for the Human Body</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every tool designed to bridge the gap between understanding and performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large: Anatomy Explorer */}
          <div className="md:col-span-7 bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 flex flex-col relative group hover:border-primary/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
            <div className="mb-8 z-10">
              <span className="text-3xl mb-4 block text-primary">🦾</span>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Interactive Body Explorer</h3>
              <p className="text-muted-foreground max-w-md">Isolate muscle groups, analyze movement patterns, and understand the deep biomechanics of your performance.</p>
            </div>
            <div className="mt-auto relative h-64 w-full rounded-xl overflow-hidden border border-border bg-card/50">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-all duration-700">
                <svg className="w-48 h-72" viewBox="0 0 200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="60" r="30" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M90 90 L110 90 L115 120 L85 120 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M50 120 Q100 110 150 120 L160 160 Q100 180 40 160 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M60 165 L140 165 L130 280 Q100 300 70 280 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M45 130 L15 240 L25 320 L45 310 L35 240 L60 160 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M155 130 L185 240 L175 320 L155 310 L165 240 L140 160 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M70 290 L50 440 L40 560 L65 560 L75 440 L95 300 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                  <path d="M130 290 L150 440 L160 560 L135 560 L125 440 L105 300 Z" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-md border border-border text-[10px] font-semibold text-primary">Quadriceps</span>
                <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-md border border-border text-[10px] font-semibold text-muted-foreground">Targeted</span>
              </div>
            </div>
          </div>
          {/* Small: AI Coach */}
          <div className="md:col-span-5 bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 flex flex-col relative group hover:border-primary/30 transition-colors duration-500">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all duration-700 pointer-events-none" />
            <span className="text-3xl mb-4 block text-primary">🧠</span>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">AI-Driven Coaching</h3>
            <p className="text-muted-foreground mb-8">Personalized training protocols adapting in real-time to your recovery metrics and performance data.</p>
            <div className="mt-auto p-4 rounded-xl bg-background/50 border border-border flex items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">98%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Recovery Status</p>
                <p className="text-sm font-semibold text-primary">Optimal for Load</p>
              </div>
            </div>
          </div>
          {/* Small: Exercise Library */}
          <div className="md:col-span-5 bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 flex flex-col relative group hover:border-primary/30 transition-colors duration-500">
            <span className="text-3xl mb-4 block text-primary">🏋️</span>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Curated Exercise Library</h3>
            <p className="text-muted-foreground">Video-guided exercises and stretches for every muscle group, sourced from top trainers.</p>
          </div>
          {/* Small: Performance Analytics */}
          <div className="md:col-span-7 bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 flex flex-col relative group hover:border-primary/30 transition-colors duration-500">
            <span className="text-3xl mb-4 block text-primary">📊</span>
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Anatomy-Driven Analytics</h3>
            <p className="text-muted-foreground max-w-lg">Understand recovery times, weekly volume recommendations, and fatigue levels for each muscle — data-driven training decisions.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to transform your training?</h2>
          <p className="text-muted-foreground mb-8">Join the warriors who train with precision, not guesswork.</p>
          <Link
            href="/body"
            className="inline-flex px-8 py-4 bg-primary text-primary-foreground font-heading text-base font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
            style={{ boxShadow: "0 0 30px oklch(0.72 0.18 200 / 0.4)" }}
          >
            Enter the Arena
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 max-w-7xl mx-auto gap-8">
          <span className="font-heading text-xl font-bold tracking-tighter text-primary">ACHILLES</span>
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">
            © 2026 ACHILLES PERFORMANCE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
