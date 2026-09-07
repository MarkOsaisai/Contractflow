"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ApiError, register } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const session = await register({
        email: String(form.get("email")),
        password: String(form.get("password")),
        displayName: String(form.get("displayName")),
        organizationName: String(form.get("organizationName")),
      });
      setSession(session);
      router.replace("/dashboard");
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "Unable to create the account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="register-heading">
        <p className="eyebrow">ContractFlow</p>
        <h1 id="register-heading">Create your workspace</h1>
        <p className="auth-copy">
          Register the contractor organization and its first administrator.
        </p>
        <form onSubmit={submit} className="auth-form">
          <label>
            Your name
            <input name="displayName" autoComplete="name" required />
          </label>
          <label>
            Organization
            <input
              name="organizationName"
              autoComplete="organization"
              required
            />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="auth-footer">
          Already registered? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
