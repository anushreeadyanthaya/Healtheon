"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_URL from "@/lib/api";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
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
          `${API_URL}/api/users/profile`,
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
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#17221f]">
      {/* Header */}
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

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#dce7e3] px-4 py-2 text-sm font-medium text-[#34423e] transition hover:border-[#176b5b] hover:text-[#176b5b]"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-[#176b5b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#125848]"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Heading */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#176b5b] p-8 text-white shadow-[0_20px_60px_rgba(23,107,91,0.18)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-medium text-[#cce9e0]">
              Your Healtheon account
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#d9eee8] sm:text-base">
              View your account information and Healtheon profile details.
            </p>
          </div>
        </section>

        {/* Profile Card */}
        <section className="mt-8 rounded-[32px] border border-[#e1ebe7] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-5 border-b border-[#edf1ef] pb-8 sm:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e4f3ee] text-3xl font-bold text-[#176b5b]">
              {user?.full_name?.charAt(0).toUpperCase() || "H"}
            </div>

            <div className="text-center sm:text-left">
              <p className="text-2xl font-semibold text-[#26332f]">
                {user?.full_name || "Healtheon User"}
              </p>

              <p className="mt-1 text-sm text-[#71807b]">
                {user?.email || "Email not available"}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-[#e8f5f0] px-3 py-1 text-xs font-semibold capitalize text-[#176b5b]">
                {user?.role || "patient"}
              </span>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
              Account information
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#26332f]">
              Your details
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  Email address
                </p>

                <p className="mt-2 break-all text-sm font-semibold text-[#34423e]">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7faf9] p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                  Account role
                </p>

                <p className="mt-2 text-sm font-semibold capitalize text-[#34423e]">
                  {user?.role || "Patient"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7faf9] p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                  Account status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2ba886]" />

                  <p className="text-sm font-semibold text-[#34423e]">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/appointments"
            className="group rounded-[24px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,70,61,0.08)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5f1] text-lg">
              📅
            </div>

            <h3 className="mt-4 font-semibold text-[#26332f]">
              My appointments
            </h3>

            <p className="mt-2 text-sm text-[#71807b]">
              View and manage your upcoming appointments.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#176b5b] transition group-hover:text-[#125848]">
              View appointments →
            </p>
          </Link>

          <Link
            href="/medical-records"
            className="group rounded-[24px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,70,61,0.08)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5f1] text-lg">
              🩺
            </div>

            <h3 className="mt-4 font-semibold text-[#26332f]">
              Medical records
            </h3>

            <p className="mt-2 text-sm text-[#71807b]">
              Access your diagnoses, prescriptions and medical history.
            </p>

            <p className="mt-4 text-sm font-semibold text-[#176b5b] transition group-hover:text-[#125848]">
              View records →
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
