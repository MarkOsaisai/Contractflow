"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type Contract = {
  id: string;
  reference: string;
  title: string;
  stage: string;
  status: string;
};
type Workspace = "Contractor" | "Client PM" | "HSE" | "Finance";

type WorkspaceData = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Array<[string, string, string, "good" | "warn" | "bad"]>;
  queueTitle: string;
  queue: Array<[string, string, string]>;
};

const workspaceData: Record<Workspace, WorkspaceData> = {
  Contractor: {
    eyebrow: "Contractor workspace / delivery view",
    title: "Your work, in motion.",
    description:
      "Stay ahead of the documents, milestones, and blockers that affect site delivery.",
    metrics: [
      [
        "Compliance status",
        "Compliant",
        "Across your active contracts",
        "good",
      ],
      ["Expiring in 30 days", "04", "Certificates and permits", "warn"],
      ["Documents expired", "01", "Blocking site access", "bad"],
      [
        "Current contract stage",
        "Execution",
        "Offshore Wellhead Maintenance",
        "good",
      ],
      ["Next milestone due", "$480K", "Mechanical completion / 18 Sep", "warn"],
      ["Payment status", "Pending", "Awaiting client approval", "warn"],
      ["Open blockers", "02", "Assigned to your team", "bad"],
    ],
    queueTitle: "Your action queue",
    queue: [
      [
        "Upload renewed insurance certificate",
        "Pipeline Integrity Program",
        "Due in 2 days",
      ],
      [
        "Confirm mechanical completion evidence",
        "Offshore Wellhead Maintenance",
        "Due 18 Sep",
      ],
      [
        "Resolve site access blocker",
        "Terminal Expansion - Phase 2",
        "High priority",
      ],
    ],
  },
  "Client PM": {
    eyebrow: "Client PM workspace / portfolio view",
    title: "The portfolio, at a glance.",
    description:
      "Move contracts forward, clear blockers, and keep every contractor accountable.",
    metrics: [
      ["Active contracts by stage", "24", "Across 7 lifecycle stages", "good"],
      [
        "Contracts needing attention",
        "05",
        "3 blocked / 2 non-compliant",
        "bad",
      ],
      ["Average time per stage", "18 days", "Down 4 days this month", "good"],
      ["Open blockers by source", "09", "HSE 4 / Finance 3 / Other 2", "warn"],
      ["Milestones pending approval", "07", "$1.24M total value", "warn"],
      [
        "Contractor compliance rate",
        "92.4%",
        "22 of 24 fully compliant",
        "good",
      ],
      ["Stalled contracts", "03", "No movement in 14+ days", "bad"],
    ],
    queueTitle: "Portfolio requiring review",
    queue: [
      [
        "Review tender submissions",
        "Marine Logistics Support",
        "4 submissions received",
      ],
      [
        "Escalate stalled contract",
        "Pipeline Integrity Program",
        "No movement for 16 days",
      ],
      [
        "Approve milestone evidence",
        "Offshore Wellhead Maintenance",
        "$480K pending",
      ],
    ],
  },
  HSE: {
    eyebrow: "HSE workspace / compliance view",
    title: "Make every site visit safer.",
    description:
      "Catch expiry risk early and keep certification, inspections, and incidents in view.",
    metrics: [
      [
        "Certifications expiring",
        "04 / 11",
        "Next 7 days / next 30 days",
        "warn",
      ],
      ["Certifications expired", "03", "Across 2 contractors", "bad"],
      ["Open incidents", "06", "1 high / 5 low-medium", "warn"],
      ["Incident response time", "2.4 hrs", "Average to investigating", "good"],
      ["Inspection pass rate", "96.2%", "This quarter", "good"],
      ["Non-compliant contractors", "02", "Restricted from site access", "bad"],
      ["Pending document reviews", "12", "8 certificates / 4 permits", "warn"],
    ],
    queueTitle: "Compliance review queue",
    queue: [
      [
        "Verify safety certificate",
        "Apex Industrial / CTR-2411",
        "Expires in 2 days",
      ],
      [
        "Review incident report",
        "Offshore Wellhead Maintenance",
        "High severity",
      ],
      [
        "Approve permit to work",
        "Terminal Expansion - Phase 2",
        "12 documents pending",
      ],
    ],
  },
  Finance: {
    eyebrow: "Finance workspace / cash flow view",
    title: "Keep the cash moving.",
    description:
      "Connect milestone approval to payment with a clear view of what is due and held.",
    metrics: [
      ["Total milestone value", "$8.9M", "Across active contracts", "good"],
      ["Payments due this period", "08", "$1.42M due in 30 days", "warn"],
      ["Payments overdue", "02", "$190K past due", "bad"],
      ["Average payment cycle", "11 days", "Down 2 days this month", "good"],
      ["Disputes / held invoices", "03", "2 PO mismatch / 1 query", "warn"],
      ["Processed this period", "$2.6M", "Week to date", "good"],
      ["Approval backlog", "07", "$1.24M awaiting sign-off", "warn"],
    ],
    queueTitle: "Payment work queue",
    queue: [
      [
        "Approve milestone payment",
        "Offshore Wellhead Maintenance",
        "$480K / due 18 Sep",
      ],
      ["Resolve held invoice", "Apex Industrial", "PO mismatch"],
      [
        "Chase client approval",
        "Terminal Expansion - Phase 2",
        "$210K pending",
      ],
    ],
  },
};

const workspaceIcons: Record<Workspace, string> = {
  Contractor: "C",
  "Client PM": "P",
  HSE: "H",
  Finance: "F",
};

export default function DashboardPage() {
  const router = useRouter();
  const { isReady, session, user, signOut } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [workspace, setWorkspace] = useState<Workspace>("Contractor");
  const [error, setError] = useState("");
  const data = workspaceData[workspace];

  useEffect(() => {
    if (isReady && !session) router.replace("/login");
  }, [isReady, router, session]);
  useEffect(() => {
    if (!session) return;
    apiRequest<Contract[]>("/contracts", {}, session.accessToken)
      .then(setContracts)
      .catch(() =>
        setError(
          "Live contract data is unavailable. Showing workspace preview data.",
        ),
      );
  }, [session]);

  if (!isReady || !session)
    return <main className="loading-page">Loading workspace...</main>;

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" href="/">
          <span className="brand-mark">CF</span>
          <b>ContractFlow</b>
        </Link>
        <div className="org-switcher">
          <span className="org-mark">N</span>
          <span>
            <b>Northridge Operations</b>
            <small>Organization workspace</small>
          </span>
          <span className="muted-arrow">⌄</span>
        </div>
        <p className="nav-label">Workspace</p>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="selected" href="#overview">
            ▦ <span>Overview</span>
          </a>
          <a href="#contracts">
            ▤ <span>Contracts</span>
            <em>24</em>
          </a>
          <a href="#compliance">
            ✓ <span>Compliance</span>
            <em>3</em>
          </a>
          <a href="#documents">
            □ <span>Documents</span>
          </a>
          <a href="#payments">
            ₦ <span>Payments</span>
          </a>
          <p className="nav-label">Manage</p>
          <a href="#vendors">
            ♧ <span>Vendors</span>
          </a>
          <a href="#reports">
            ▥ <span>Reports</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <a href="#settings">
            ⚙ <span>Settings</span>
          </a>
          <div className="user-chip">
            <span className="avatar">
              {user?.displayName?.slice(0, 2).toUpperCase() ?? "AM"}
            </span>
            <span>
              <b>{user?.displayName ?? "Alex Morgan"}</b>
              <small>{user?.role ?? "Project Director"}</small>
            </span>
            <button
              aria-label="Sign out"
              onClick={() => {
                signOut();
                router.replace("/login");
              }}
            >
              ↗
            </button>
          </div>
        </div>
      </aside>
      <main className="dashboard-content">
        <header className="dashboard-topbar">
          <Link className="dashboard-header-brand" href="/">
            <span className="dashboard-header-mark">CF</span>
            <span>Northridge Operations</span>
          </Link>
          {/* <nav className="dashboard-header-nav" aria-label="Dashboard sections">
            <a href="#overview">Overview</a>
            <a href="#contracts">Contracts</a>
            <a href="#compliance">Compliance</a>
            <a href="#activity">Activity</a>
          </nav> */}
          <div className="dashboard-actions">
            <button className="top-icon" aria-label="Search">
              ⌕
            </button>
            <button
              className="top-icon notification"
              aria-label="Notifications"
            >
              ♢<i />
            </button>
            <button className="help-button">? Help</button>
            <button className="top-avatar">
              {user?.displayName?.slice(0, 2).toUpperCase() ?? "AM"}
            </button>
          </div>
        </header>
        <section className="dashboard-heading" id="overview">
          <div>
            <p className="kicker">{data.eyebrow}</p>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
          <button className="new-action">
            +{" "}
            <span>
              {workspace === "Finance"
                ? "Record payment"
                : workspace === "HSE"
                  ? "Upload document"
                  : "New contract"}
            </span>
          </button>
        </section>
        <div
          className="workspace-tabs"
          role="tablist"
          aria-label="Department workspaces"
        >
          {(Object.keys(workspaceData) as Workspace[]).map((item) => (
            <button
              key={item}
              className={
                workspace === item ? "workspace-tab active" : "workspace-tab"
              }
              onClick={() => setWorkspace(item)}
              role="tab"
              aria-selected={workspace === item}
            >
              <span>{workspaceIcons[item]}</span>
              {item}
            </button>
          ))}
        </div>
        {error && <p className="dashboard-notice">{error}</p>}
        <section
          className="dashboard-metrics"
          aria-label={`${workspace} key performance indicators`}
        >
          {data.metrics.map(([label, value, note, tone]) => (
            <article className={`dashboard-metric ${tone}`} key={label}>
              <span className="metric-label">{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>
        <div className="dashboard-columns">
          <section className="dashboard-panel contract-panel" id="contracts">
            <div className="dashboard-panel-heading">
              <div>
                <p className="kicker">Shared contract record</p>
                <h2>Active contracts</h2>
              </div>
              <a href="#all-contracts">View all -&gt;</a>
            </div>
            <div className="contract-table">
              <div className="contract-row table-header">
                <span>Contract</span>
                <span>Stage</span>
                <span>Status</span>
                <span>Updated</span>
              </div>
              {contracts.length
                ? contracts.slice(0, 4).map((contract) => (
                    <div className="contract-row" key={contract.id}>
                      <span>
                        <b>{contract.reference}</b>
                        <strong>{contract.title}</strong>
                      </span>
                      <span>{contract.stage.replaceAll("_", " ")}</span>
                      <span className="status-pill">
                        {contract.status.replaceAll("_", " ")}
                      </span>
                      <span>
                        Today{" "}
                        <button
                          className="row-arrow"
                          aria-label={`Open ${contract.title}`}
                        >
                          -&gt;
                        </button>
                      </span>
                    </div>
                  ))
                : [
                    "Offshore Wellhead Maintenance",
                    "Pipeline Integrity Program",
                    "Terminal Expansion - Phase 2",
                  ].map((title, index) => (
                    <div className="contract-row" key={title}>
                      <span>
                        <b>CTR-24{index + 8}</b>
                        <strong>{title}</strong>
                      </span>
                      <span>
                        {["Execution", "Mobilization", "Commissioning"][index]}
                      </span>
                      <span className="status-pill">
                        {index === 1 ? "At risk" : "On track"}
                      </span>
                      <span>
                        Today{" "}
                        <button
                          className="row-arrow"
                          aria-label={`Open ${title}`}
                        >
                          -&gt;
                        </button>
                      </span>
                    </div>
                  ))}
            </div>
          </section>
          <section className="dashboard-panel queue-panel" id="compliance">
            <div className="dashboard-panel-heading">
              <div>
                <p className="kicker">Priority queue</p>
                <h2>{data.queueTitle}</h2>
              </div>
              <span className="queue-count">{data.queue.length}</span>
            </div>
            <div className="queue-list">
              {data.queue.map(([title, detail, due]) => (
                <article key={title}>
                  <span className="queue-icon">!</span>
                  <span>
                    <b>{title}</b>
                    <small>{detail}</small>
                    <em>{due}</em>
                  </span>
                  <button aria-label={`Review ${title}`}>-&gt;</button>
                </article>
              ))}
            </div>
            <a className="queue-footer" href="#queue">
              Open full queue -&gt;
            </a>
          </section>
        </div>
        <section className="dashboard-panel activity-strip">
          <div className="dashboard-panel-heading">
            <div>
              <p className="kicker">Activity log</p>
              <h2>Latest updates</h2>
            </div>
            <a href="#activity">View all -&gt;</a>
          </div>
          <div className="activity-items">
            <span>
              <i className="activity-green">+</i>
              <b>Certificate uploaded</b>
              <small>12 min ago</small>
            </span>
            <span>
              <i className="activity-blue">₦</i>
              <b>Milestone approved</b>
              <small>1 hr ago</small>
            </span>
            <span>
              <i className="activity-amber">↗</i>
              <b>Stage advanced</b>
              <small>3 hrs ago</small>
            </span>
            <span>
              <i className="activity-coral">!</i>
              <b>Review requested</b>
              <small>Yesterday</small>
            </span>
          </div>
        </section>
        <footer className="dashboard-footer">
          ContractFlow <span>•</span> NDI Group 2 <span>•</span>{" "}
          <a href="#support">Support center</a>
        </footer>
      </main>
    </div>
  );
}
