import Link from "next/link";

const features = [
  [
    "Contract Lifecycles",
    "Easily monitor milestones and auto-renew templates with full safety buffers.",
  ],
  [
    "Payment Integration",
    "Keep track of active installments, overdue balances, and continuous receivables.",
  ],
  [
    "Compliance Automation",
    "Automatic audit checks keep documents and insurance certificates up to code.",
  ],
  [
    "Enterprise Security",
    "Centralized file storage backed with standard robust role access configurations.",
  ],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-zinc-900">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-[1452px] items-center justify-between px-6 py-5 md:px-20">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold tracking-tight"
          >
            <span className="size-7 rounded-md bg-indigo-500" />
            ContractFlow
          </Link>
          <div className="hidden gap-8 text-sm font-medium text-zinc-500 md:flex">
            <a href="#features" className="transition hover:text-indigo-500">
              Features
            </a>
            <a href="#solutions" className="transition hover:text-indigo-500">
              Solutions
            </a>
            <a href="#pricing" className="transition hover:text-indigo-500">
              Pricing
            </a>
            <a href="#contact" className="transition hover:text-indigo-500">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/login"
              className="font-semibold text-zinc-900 transition hover:text-indigo-500"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-indigo-500 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-600"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[1452px] items-center gap-12 px-6 py-16 md:grid-cols-[1fr_560px] md:px-20 md:py-20">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[13px] font-semibold text-indigo-500">
            Now with auto-compliance audits
          </span>
          <h1 className="max-w-[684px] text-5xl font-extrabold leading-[1.14] tracking-tight md:text-[56px]">
            Centralize contracts, payments, and compliance
          </h1>
          <p className="max-w-[684px] text-lg leading-7 text-zinc-500">
            Centralize your agreements, optimize recurring receivables, track
            critical milestones, and secure full system compliance - engineered
            specifically for growing teams.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-indigo-600"
            >
              Get Started for Free
            </Link>
            <a
              href="#contact"
              className="rounded-lg border border-zinc-300 px-7 py-3.5 text-base font-semibold transition hover:border-indigo-500 hover:text-indigo-500"
            >
              Book Demo
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-300 bg-zinc-100 p-6">
          <p className="mb-4 text-sm font-semibold text-zinc-500">
            WORKSPACE ACTIVITY PREVIEW
          </p>
          <div className="h-[120px] rounded-lg border border-zinc-200 bg-white" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="h-[150px] rounded-lg border border-zinc-200 bg-white" />
            <div className="h-[150px] rounded-lg border border-zinc-200 bg-white" />
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-zinc-100 px-6 py-16 md:px-20 md:py-20"
      >
        <div className="mx-auto max-w-[1452px]">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Engineered for absolute control
            </h2>
            <p className="mt-3 text-base text-zinc-500">
              Eliminate manual overhead and mitigate transaction risks
              effortlessly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl border border-zinc-200 bg-white p-6"
              >
                <div className="size-10 rounded-lg bg-indigo-50" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-[22px] text-zinc-500">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="border-t border-zinc-200 bg-white px-6 py-8 text-center text-sm text-zinc-500"
      >
        ContractFlow / NDI Group 2
      </footer>
    </main>
  );
}
