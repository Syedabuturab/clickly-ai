import Link from "next/link";

const features = [
  { title: "Answer every call", text: "Give customers instant, natural answers using your business knowledge." },
  { title: "Book appointments", text: "Let your AI receptionist check availability and schedule customers." },
  { title: "Capture leads", text: "Collect names, phone numbers, intent and follow-up details automatically." },
  { title: "Transfer to humans", text: "Move important or complex conversations to your team when needed." },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--brand)] text-white">C</span>
          Clickly AI
        </div>
        <Link href="/dashboard" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          Open dashboard
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            AI phone receptionist for your business
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-7xl">
            Never miss a customer call again.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Clickly AI answers your business calls, understands your company, books appointments, captures leads and brings in a human when necessary.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-xl bg-[var(--brand)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 hover:opacity-90">
              Build your AI receptionist
            </Link>
            <a href="#features" className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-50">
              See how it works
            </a>
          </div>
        </div>

        <div id="features" className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
