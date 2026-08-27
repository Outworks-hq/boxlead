import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, type Role } from "@/lib/session";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode: Mode } => ({
    mode: search.mode === "signup" ? "signup" : "login",
  }),
  head: () => ({
    meta: [
      { title: "Log in or sign up — BoxLead" },
      {
        name: "description",
        content: "Access your BoxLead company or obtainer account to manage recurring service relationships.",
      },
      { property: "og:title", content: "Log in or sign up — BoxLead" },
      { property: "og:description", content: "Manage your recurring service relationships on BoxLead." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("company");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isSignup = mode === "signup";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    signIn({
      role,
      name: name.trim() || (role === "company" ? "Northbeam Labs" : "Marcus Johnson"),
      email: email.trim() || "demo@boxlead.app",
      fresh: false,
    });
    navigate({ to: role === "company" ? "/company" : "/obtainer" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="surface-ink hidden flex-col justify-between p-12 lg:flex">
        <Logo tone="light" />
        <div>
          <h1 className="max-w-sm text-4xl font-extrabold leading-tight text-ink-foreground">
            Work that repeats. Relationships that last.
          </h1>
          <p className="mt-5 max-w-sm text-sm text-ink-muted">
            Recurring services with an agreed scope, an agreed price and a rhythm both sides confirm.
          </p>
        </div>
        <p className="text-xs text-ink-muted">Demo build — sign in with anything.</p>
      </div>

      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-8 text-2xl font-extrabold lg:mt-0">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isSignup ? "Choose how you'll use BoxLead." : "Sign in to your BoxLead account."}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2 rounded-full bg-secondary p-1">
            {(["company", "obtainer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-full py-2 text-sm font-semibold capitalize transition-colors",
                  role === r ? "bg-ink text-ink-foreground" : "text-muted-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            {isSignup ? (
              <div className="space-y-1.5">
                <Label htmlFor="name">{role === "company" ? "Company name" : "Full name"}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={role === "company" ? "Northbeam Labs" : "Marcus Johnson"} />
              </div>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" variant="ink" size="lg" className="w-full">
              {isSignup ? "Create account" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {isSignup ? "Already have an account? " : "New to BoxLead? "}
            <Link
              to="/auth"
              search={{ mode: isSignup ? "login" : "signup" }}
              className="font-semibold text-primary hover:underline"
            >
              {isSignup ? "Log in" : "Create one"}
            </Link>
          </p>
          <p className="mt-6 rounded-xl border border-dashed border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
            Demo build — no real accounts are created. Signing in loads a sample {role} workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
