"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import API_URL from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      if (data.token) {
        localStorage.setItem("healtheon_token", data.token);
      }

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to Healtheon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#17221f]">
      <div className="relative flex min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dff1eb] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-[#e5f0ec] blur-3xl" />

        <div className="relative z-10 flex w-full items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            <div className="mb-8 flex items-center justify-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176b5b] text-lg font-bold text-white">
                  H
                </div>

                <span className="text-xl font-semibold tracking-tight">
                  Healtheon
                </span>
              </Link>
            </div>

            <div className="rounded-[32px] border border-[#e1ebe7] bg-white p-8 shadow-[0_25px_70px_rgba(34,70,61,0.10)] sm:p-10">

              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#176b5b]">
                  Welcome back
                </p>

                <h1 className="mt-3 text-3xl font-semibold">
                  Sign in to Healtheon
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#71807b]">
                  Access your appointments, medical records and healthcare
                  information in one place.
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-2xl border border-[#f0d3d0] bg-[#fff6f5] px-4 py-3 text-sm text-[#a34f47]">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#34423e]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none focus:border-[#176b5b] focus:ring-4 focus:ring-[#176b5b]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#34423e]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-[#176b5b]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none focus:border-[#176b5b] focus:ring-4 focus:ring-[#176b5b]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#176b5b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#125848] disabled:opacity-60"
                >
                  {loading ? "Signing you in..." : "Sign in"}
                </button>

              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e8efec]" />

                <span className="text-xs text-[#9aa7a2]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#e8efec]" />
              </div>

              <p className="text-center text-sm text-[#71807b]">
                Don't have a Healtheon account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#176b5b]"
                >
                  Create one
                </Link>
              </p>

            </div>

            <p className="mt-6 text-center text-xs text-[#9aa7a2]">
              Your healthcare information is handled with security in mind.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

