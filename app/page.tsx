import AppShell from "../src/components/AppShell";

export default function Home() {
  return (
    <AppShell>
      <section className="max-w-4xl mx-auto py-24">
        <div className="rounded-xl p-12 bg-brand-gradient text-white shadow-glass-md">
          <h1 className="text-4xl font-bold mb-4">Powerdesk — Modern UI for teams</h1>
          <p className="text-lg text-white/90 mb-6">Premium look with glass, gradients, and dark mode. Start building your workspace.</p>
          <div className="flex gap-3">
            <a href="/login" className="rounded-full bg-white/10 px-4 py-2 font-medium">Get started</a>
            <a href="/dashboard" className="rounded-full bg-white/6 px-4 py-2 font-medium">Open dashboard</a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
          <div className="p-6 rounded-lg glass">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted">Powerdesk helps teams ship faster with a focused workspace and beautiful design tokens.</p>
          </div>
          <div className="p-6 rounded-lg glass">
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-muted">hello@powerdesk.local — We will wire up contact forms later.</p>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
