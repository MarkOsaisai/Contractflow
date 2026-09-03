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

export default function DashboardPage() {
  const router = useRouter();
  const { isReady, session, user, signOut } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isReady && !session) router.replace("/login");
  }, [isReady, router, session]);

  useEffect(() => {
    if (!session) return;
    apiRequest<Contract[]>("/contracts", {}, session.accessToken)
      .then(setContracts)
      .catch(() =>
        setError(
          "Contracts could not be loaded. Check that the API is running.",
        ),
      );
  }, [session]);

  if (!isReady || !session)
    return <main className="loading-page">Loading workspace...</main>;

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">Organization workspace</p>
          <h1>ContractFlow</h1>
        </div>
        <div className="account-actions">
          <span>{user?.displayName}</span>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.replace("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <section className="overview" aria-labelledby="dashboard-heading">
        <p className="eyebrow">Portfolio overview</p>
        <h2 id="dashboard-heading">
          Contracts under your organization’s control.
        </h2>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        {contracts.length === 0 ? (
          <p className="empty-state">
            No contracts are available yet. Create a contract from the API to
            begin the lifecycle.
          </p>
        ) : (
          <div className="contract-list">
            {contracts.map((contract) => (
              <article key={contract.id}>
                <p className="eyebrow">{contract.reference}</p>
                <h3>{contract.title}</h3>
                <p>
                  {contract.stage.replaceAll("_", " ")} /{" "}
                  {contract.status.replaceAll("_", " ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="workspace-grid" aria-label="Workspaces">
        <article>
          <h2>Contractor</h2>
          <p>Manage lifecycle progress, documents, and delivery obligations.</p>
          <Link href="/dashboard">Open workspace</Link>
        </article>
        <article>
          <h2>Client PM</h2>
          <p>Review delivery status, compliance, and project evidence.</p>
          <Link href="/dashboard">Open workspace</Link>
        </article>
        <article>
          <h2>HSE</h2>
          <p>Track certificates, permits, and approaching expiry dates.</p>
          <Link href="/dashboard">Open workspace</Link>
        </article>
        <article>
          <h2>Finance</h2>
          <p>Review payment milestones and approval status.</p>
          <Link href="/dashboard">Open workspace</Link>
        </article>
      </section>
    </main>
  );
}
