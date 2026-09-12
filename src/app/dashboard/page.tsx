const stats = [
  ["Calls today", "0", "No calls yet"],
  ["Appointments", "0", "Ready to connect"],
  ["New leads", "0", "Ready to capture"],
  ["AI resolution", "—", "Needs call data"],
];

const nav = ["Overview", "AI Agents", "Phone Numbers", "Calls", "Contacts", "Calendar", "Knowledge", "Integrations"];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block">
        <div className="flex items-center gap-2 px-2 py-3 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--brand)] text-white">C</span>
          Clickly AI
        </div>
        <nav className="mt-8 space-y-1">
          {nav.map((item, index) => (
            <div key={item} className={`rounded-xl px-3 py-2.5 text-sm font-medium ${index === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
              {item}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-900 p-4 text-white">
          <p className="text-sm font-semibold">Your AI receptionist</p>
          <p className="mt-1 text-xs text-slate-300">Not connected yet</p>
          <button className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900">Set up agent</button>
        </div>
      </aside>

      <main className="lg:ml-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-10">
          <div>
            <p className="text-sm text-slate-500">Workspace</p>
            <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
          </div>
          <button className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">Create AI agent</button>
        </header>

        <section className="p-6 lg:p-10">
          <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-7 text-white shadow-xl">
            <p className="text-sm font-medium text-indigo-300">Welcome to Clickly AI</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Build your AI receptionist in minutes.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Connect a phone number, teach Clickly about your business, choose how your agent should behave, then test the experience before going live.</p>
            <button className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Start setup</button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
                <p className="mt-2 text-xs text-slate-400">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
              <h3 className="font-bold text-slate-900">Recent calls</h3>
              <div className="mt-8 rounded-xl border border-dashed border-slate-200 p-10 text-center">
                <p className="font-medium text-slate-600">No calls yet</p>
                <p className="mt-1 text-sm text-slate-400">Your call activity will appear here after your phone number is connected.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">Setup checklist</h3>
              <div className="mt-5 space-y-4 text-sm">
                {["Create your AI agent", "Add company knowledge", "Connect a phone number", "Connect Google Calendar", "Make your first test call"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-500">
                    <span className="h-5 w-5 rounded-full border border-slate-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
