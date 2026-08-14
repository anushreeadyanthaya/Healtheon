"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import API_URL from "@/lib/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      if (data.token) {
        localStorage.setItem("healtheon_token", data.token);
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);
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
                  Get started
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Create your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#71807b]">
                  Join Healtheon and manage your healthcare journey in one
                  secure place.
                </p>

              </div>

              {error && (
                <div className="mt-6 rounded-2xl border border-[#f0d3d0] bg-[#fff6f5] px-4 py-3 text-sm text-[#a34f47]">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-6 rounded-2xl border border-[#cfe8df] bg-[#f0faf6] px-4 py-3 text-sm text-[#176b5b]">
                  {success}
                </div>
              )}

              <form onSubmit={handleRegister} className="mt-8 space-y-5">

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-[#34423e]"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
                  />
                </div>

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
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#34423e]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
                  />

                  <p className="mt-2 text-xs text-[#9aa7a2]">
                    Use at least 6 characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-[#34423e]"
                  >
                    I am a
                  </label>

                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#176b5b] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,107,91,0.18)] transition hover:-translate-y-0.5 hover:bg-[#125848] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}
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
                Already have a Healtheon account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-[#176b5b] transition hover:text-[#125848]"
                >
                  Sign in
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

