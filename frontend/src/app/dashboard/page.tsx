"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("healtheon_token");
          window.location.href = "/login";
          return;
        }

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("healtheon_token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf9]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dcebe6] border-t-[#176b5b]" />
          <p className="mt-4 text-sm text-[#71807b]">
            Loading your Healtheon dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#17221f]">

      <header className="border-b border-[#e1ebe7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176b5b] text-lg font-bold text-white">
              H
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Healtheon
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-[#dce7e3] px-4 py-2 text-sm font-medium text-[#34423e] transition hover:border-[#176b5b] hover:text-[#176b5b]"
          >
            Log out
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <section className="relative overflow-hidden rounded-[32px] bg-[#176b5b] p-8 text-white shadow-[0_20px_60px_rgba(23,107,91,0.18)] sm:p-10">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl">

            <p className="text-sm font-medium text-[#cce9e0]">
              Your Healtheon dashboard
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back
              {user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}! 👋
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#d9eee8] sm:text-base">
              Manage your healthcare information, appointments and medical
              records from one simple place.
            </p>

          </div>

        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            href={user?.role === "doctor" ? "/doctor-dashboard" : "/appointments"}
            className="group rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,70,61,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              📅
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Appointments
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71807b]">
              View and manage your healthcare appointments.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#176b5b] group-hover:text-[#125848]">
              View appointments →
            </p>
          </Link>

          <Link
            href="/medical-records"
            className="group rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,70,61,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              🩺
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Medical Records
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71807b]">
              Access your diagnoses, prescriptions and medical history.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#176b5b] group-hover:text-[#125848]">
              View records →
            </p>
          </Link>

          <Link
            href="/profile"
            className="group rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,70,61,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              👤
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              My Profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71807b]">
              View your Healtheon account information.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#176b5b] group-hover:text-[#125848]">
              View profile →
            </p>
          </Link>

          <div className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              🔐
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71807b]">
              Signed in as{" "}
              <span className="font-medium text-[#34423e]">
                {user?.role || "patient"}
              </span>
              .
            </p>

            <button
              onClick={handleLogout}
              className="mt-4 text-sm font-semibold text-[#176b5b] transition hover:text-[#125848]"
            >
              Log out →
            </button>

          </div>

        </section>

        <section className="mt-8 rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
                Account overview
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your information
              </h2>
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-[#f7faf9] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                Full name
              </p>

              <p className="mt-2 text-sm font-semibold text-[#34423e]">
                {user?.full_name || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7faf9] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-[#34423e]">
                {user?.email || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7faf9] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                Role
              </p>

              <p className="mt-2 text-sm font-semibold capitalize text-[#34423e]">
                {user?.role || "Patient"}
              </p>
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}