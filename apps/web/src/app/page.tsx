import Link from "next/link";

const workspaces = [
  [
    "01 / Contractor",
    "Keep delivery moving.",
    "Documents, milestones, payments, and blockers.",
    "bg-[var(--teal)]",
  ],
  [
    "02 / Client PM",
    "See the whole portfolio.",
    "Stages, approvals, blockers, and contractor health.",
    "bg-[var(--cyan)]",
  ],
  [
    "03 / HSE",
    "Make site access safer.",
    "Certifications, inspections, incidents, and reviews.",
    "bg-[var(--orange)]",
  ],
  [
    "04 / Finance",
    "Keep the cash moving.",
    "Milestones, overdue payments, holds, and approvals.",
    "bg-[var(--ocean)]",
  ],
];
const stages = ["Bid", "Award", "Mobilization", "Execution", "Commissioning"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--white)] text-[var(--deep-dark)] font-sans">
      <div className="mx-auto max-w-[1240px] px-6">
        <nav className="flex items-center justify-between border-b border-[var(--steel)]/30 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="grid size-[18px] rotate-45 place-items-center border-2 border-[var(--ocean)]">
              <span className="-rotate-45 text-[0px]">CF</span>
            </span>{" "}
            CONTRACTFLOW
          </Link>
          <div className="hidden gap-10 text-sm text-[var(--steel)] md:flex">
            <a href="#workflow" className="transition hover:text-[var(--teal)]">
              Workflow
            </a>
            <a
              href="#workspaces"
              className="transition hover:text-[var(--teal)]"
            >
              Workspaces
            </a>
            <a href="#plan" className="transition hover:text-[var(--teal)]">
              Delivery plan
            </a>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/login"
              className="text-[var(--steel)] transition hover:text-[var(--teal)]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-[var(--orange)] px-5 py-2.5 text-white transition hover:bg-[var(--rust)]"
            >
              Start a workspace
            </Link>
          </div>
        </nav>
      </div>

      <section className="bg-[var(--deep-dark)] text-[var(--white)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-6 py-[72px] md:grid-cols-[1.05fr_.95fr] md:py-28">
          <div>
            <p className="mb-4 font-mono text-xs tracking-wider text-[var(--cyan)]">
              CONTRACTFLOW / PORTFOLIO CONTROL / 2026
            </p>
            <h1 className="max-w-[15ch] text-4xl font-semibold leading-tight tracking-tight md:text-[3.3rem]">
              Contract operations for teams working furthest from the
              spreadsheet.
            </h1>
            <p className="mt-6 max-w-[44ch] text-lg text-[#b9c6d6]">
              Track every contract from bid through commissioning, with
              compliance, documents, milestones, and payments moving against one
              shared record.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="bg-[var(--orange)] px-6 py-3.5 text-base font-medium transition hover:-translate-y-0.5 hover:bg-[var(--rust)]"
              >
                Start a workspace
              </Link>
              <a
                href="#workflow"
                className="border-b border-[#3e5972] px-1 py-1 text-[var(--white)]"
              >
                View the workflow
              </a>
            </div>
          </div>
          <div className="relative h-[460px] overflow-hidden border border-[#2e4a63] bg-[var(--ocean)] p-6">
            <img
              src="/contractflow%20image.jpg"
              alt="ContractFlow partners reviewing project documents at an industrial construction site"
              className="absolute inset-0 size-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,42,.72),rgba(11,27,42,.08)_52%,rgba(11,27,42,.82))]" />
            <div className="relative z-10 flex justify-between font-mono text-[.7rem] text-[var(--white)]">
              <span>CONTRACT RECORD / 01</span>
              <span>LIVE CONTROL</span>
            </div>
            <span className="absolute bottom-6 left-6 z-10 font-mono text-xs text-[var(--white)]">
              BID -&gt; COMMISSIONING
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] grid-cols-2 border-b border-x border-[var(--steel)]/30 md:grid-cols-4">
        <Metric value="24" label="Active contracts" />
        <Metric value="92.4%" label="Compliance health" />
        <Metric value="07" label="Milestones pending" />
        <Metric value="0" label="Missed handoffs" />
      </div>
      <section
        id="workflow"
        className="mx-auto grid max-w-[1240px] gap-16 px-6 py-28 md:grid-cols-[.8fr_1.2fr]"
      >
        <div>
          <p className="font-mono text-xs text-[var(--teal)]">
            01 / THE OPERATING MODEL
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            One contract.
            <br />
            <span className="text-[var(--ocean)]">Every team aligned.</span>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[var(--steel)]">
            Each team gets the same contract record, seen through the lens of
            the work they own.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px border border-[var(--steel)]/40 bg-[var(--steel)]/40 md:grid-cols-5">
          {stages.map((stage, i) => (
            <article key={stage} className="min-h-40 bg-[var(--white)] p-5">
              <p className="font-mono text-xs text-[var(--cyan)]">0{i + 1}</p>
              <h3 className="mt-5 font-semibold">{stage}</h3>
              <p className="mt-2 text-xs text-[var(--steel)]">
                {
                  [
                    "Shape the opportunity",
                    "Lock the agreement",
                    "Prepare the site",
                    "Deliver the work",
                    "Close with confidence",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <section id="workspaces" className="mx-auto max-w-[1240px] px-6 pb-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-xs text-[var(--teal)]">
              02 / ROLE-BASED WORKSPACES
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              A sharper view for
              <br />
              <span className="text-[var(--ocean)]">every responsibility.</span>
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="border-b border-[var(--steel)] text-sm text-[var(--teal)]"
          >
            Explore dashboard -&gt;
          </Link>
        </div>
        <div className="grid gap-px border border-[var(--steel)]/40 bg-[var(--steel)]/40 md:grid-cols-2 lg:grid-cols-4">
          {workspaces.map(([role, title, text, color]) => (
            <article key={role} className={`${color} min-h-64 p-6 text-white`}>
              <p className="font-mono text-xs opacity-80">{role}</p>
              <h3 className="mt-16 text-2xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm text-white/80">{text}</p>
              <Link
                href="/dashboard"
                className="mt-7 inline-block border-b border-white/50 text-sm"
              >
                Open preview -&gt;
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section
        id="plan"
        className="mx-auto grid max-w-[1240px] gap-16 px-6 pb-28 md:grid-cols-[.8fr_1.2fr]"
      >
        <div>
          <p className="font-mono text-xs text-[var(--teal)]">
            03 / BUILT FOR THE PILOT
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            The plan is already
            <br />
            <span className="text-[var(--ocean)]">in motion.</span>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[var(--steel)]">
            A focused MVP that turns the existing data model into a working
            operating system for one real contract, one contractor, and one
            client.
          </p>
        </div>
        <div className="divide-y divide-[var(--steel)]/30 border-y border-[var(--steel)]/30">
          {[
            ["01", "Foundation", "Schema, auth, RBAC", "Complete"],
            ["02", "Workspaces", "Wireframes and sign-off", "In progress"],
            ["03", "Live contract", "Core entities and routing", "Next"],
            ["04", "Pilot readiness", "UAT, training, go-live", "Oct 23"],
          ].map(([number, title, text, status]) => (
            <div
              key={number}
              className="grid min-h-[72px] grid-cols-[50px_1fr_auto] items-center gap-4"
            >
              <b className="font-mono text-[var(--cyan)]">{number}</b>
              <span>
                <strong className="block">{title}</strong>
                <small className="text-[var(--steel)]">{text}</small>
              </span>
              <em className="font-sans text-xs not-italic text-[var(--steel)]">
                {status}
              </em>
            </div>
          ))}
        </div>
      </section>
      <footer className="mx-auto flex max-w-[1240px] flex-col gap-3 border-t border-[var(--steel)]/30 px-6 py-10 text-xs text-[var(--steel)] md:flex-row md:items-center md:justify-between">
        <span className="font-semibold text-[var(--deep-dark)]">
          CONTRACTFLOW
        </span>
        <span>Contract operations for the work that matters.</span>
        <span>NDI Group 2 / 2026</span>
      </footer>
    </main>
  );
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <article className="border-r border-[var(--steel)]/30 bg-[var(--white)] px-6 py-10 last:border-0">
      <strong className="block font-mono text-3xl font-medium text-[var(--ocean)]">
        {value}
      </strong>
      <span className="mt-2 block text-sm text-[var(--steel)]">{label}</span>
    </article>
  );
}
