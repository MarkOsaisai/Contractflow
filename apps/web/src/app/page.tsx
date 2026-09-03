import Link from "next/link";

const workspaces = [
  ["Contracts", "Manage bids, awards, execution, and commissioning."],
  ["Compliance", "Track HSE certificates, permits, and verification."],
  ["Documents", "Access controlled project documents and revisions."],
  ["Payments", "Review milestone status and payment approvals."],
];

export default function Home() {
  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">Operations Platform</p>
          <h1>ContractFlow</h1>
        </div>
        <Link className="button-link" href="/login">
          Sign in
        </Link>
      </header>
      <section className="overview" aria-labelledby="overview-heading">
        <p className="eyebrow">Portfolio overview</p>
        <h2 id="overview-heading">
          Contracts, compliance, and delivery in one operating view.
        </h2>
        <div className="metrics">
          <article>
            <strong>0</strong>
            <span>Active contracts</span>
          </article>
          <article>
            <strong>0</strong>
            <span>Compliance reviews</span>
          </article>
          <article>
            <strong>0</strong>
            <span>Pending milestones</span>
          </article>
        </div>
      </section>
      <section className="workspace-grid" aria-label="Workspaces">
        {workspaces.map(([title, description]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link href="/dashboard">Open workspace</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
