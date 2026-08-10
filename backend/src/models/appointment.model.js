"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor_name?: string;
  appointment_date: string;
  reason: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export default function DoctorDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const loadDashboard = async () => {
      try {
        const profileResponse = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          localStorage.removeItem("healtheon_token");
          window.location.href = "/login";
          return;
        }

        const currentUser = profileData.user || profileData;

        setUser(currentUser);

        if (currentUser.role !== "doctor") {
          window.location.href = "/dashboard";
          return;
        }

        const appointmentsResponse = await fetch(
          "http://localhost:5000/api/appointments/doctor/my-appointments",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appointmentsData = await appointmentsResponse.json();

        if (!appointmentsResponse.ok) {
          if (appointmentsResponse.status === 401) {
            localStorage.removeItem("healtheon_token");
            window.location.href = "/login";
            return;
          }

          setError(
            appointmentsData.message ||
              "Unable to load your appointments."
          );
          return;
        }

        setAppointments(appointmentsData.appointments || []);
      } catch (error) {
        console.error("Doctor dashboard error:", error);

        setError(
          "Unable to connect to Healtheon. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("healtheon_token");
    window.location.href = "/login";
  };

  const updateStatus = async (
    appointmentId: string,
    status: string
  ) => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setUpdatingId(appointmentId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to update appointment status."
        );
        return;
      }

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: data.appointment?.status || status,
              }
            : appointment
        )
      );

      setSuccess("Appointment status updated successfully.");
    } catch (error) {
      console.error("Update appointment error:", error);

      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const scheduledCount = appointments.filter(
    (appointment) => appointment.status === "scheduled"
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "cancelled"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7faf9]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dcebe6] border-t-[#176b5b]" />

            <p className="mt-4 text-sm text-[#71807b]">
              Loading your doctor dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf9]">
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
              className="hidden rounded-xl border border-[#dce7e3] px-4 py-2 text-sm font-medium text-[#34423e] transition hover:border-[#176b5b] hover:text-[#176b5b] sm:block"
            >
              Patient view
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-[#dce7e3] px-4 py-2 text-sm font-medium text-[#34423e] transition hover:border-[#176b5b] hover:text-[#176b5b]"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="relative overflow-hidden rounded-[32px] bg-[#176b5b] p-8 text-white shadow-[0_20px_60px_rgba(23,107,91,0.18)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-medium text-[#cce9e0]">
              Doctor workspace
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back
              {user?.full_name
                ? `, Dr. ${user.full_name.split(" ")[0]}`
                : ""}{" "}
              👋
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d9eee8] sm:text-base">
              Manage your patient appointments, review requests and
              keep your schedule organized from one place.
            </p>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-[#f0d3d0] bg-[#fff6f5] px-5 py-4 text-sm text-[#a34f47]">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-2xl border border-[#cfe8df] bg-[#f0faf6] px-5 py-4 text-sm text-[#176b5b]">
            {success}
          </div>
        )}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              📅
            </div>

            <p className="mt-5 text-sm text-[#71807b]">
              Total appointments
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#34423e]">
              {appointments.length}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              🕐
            </div>

            <p className="mt-5 text-sm text-[#71807b]">
              Scheduled
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#34423e]">
              {scheduledCount}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              ✅
            </div>

            <p className="mt-5 text-sm text-[#71807b]">
              Confirmed
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#34423e]">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f1] text-xl">
              🩺
            </div>

            <p className="mt-5 text-sm text-[#71807b]">
              Completed
            </p>

            <p className="mt-1 text-3xl font-semibold text-[#34423e]">
              {completedCount}
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
                Patient schedule
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Appointment requests
              </h2>

              <p className="mt-2 text-sm text-[#71807b]">
                Review and manage appointments assigned to you.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#e8f5f1] px-3 py-1 text-xs font-semibold text-[#176b5b]">
              {appointments.length}{" "}
              {appointments.length === 1
                ? "appointment"
                : "appointments"}
            </span>
          </div>

          {appointments.length === 0 && (
            <div className="mt-6 rounded-[28px] border border-[#e1ebe7] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8f5f1] text-2xl">
                📅
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                No appointments yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71807b]">
                Patient appointment requests assigned to you will
                appear here.
              </p>
            </div>
          )}

          {appointments.length > 0 && (
            <div className="mt-6 space-y-5">
              {appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#176b5b]">
                        Patient appointment
                      </p>

                      <h3 className="mt-2 text-xl font-semibold">
                        {appointment.reason ||
                          "Healthcare appointment"}
                      </h3>
                    </div>

                    <span className="w-fit rounded-full bg-[#e8f5f1] px-3 py-1 text-xs font-semibold capitalize text-[#176b5b]">
                      {appointment.status || "scheduled"}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-[#f7faf9] p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                        Patient ID
                      </p>

                      <p className="mt-2 break-all text-sm font-semibold text-[#34423e]">
                        {appointment.patient_id}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7faf9] p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                        Date & time
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#34423e]">
                        {appointment.appointment_date
                          ? new Date(
                              appointment.appointment_date
                            ).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not available"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7faf9] p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                        Current status
                      </p>

                      <p className="mt-2 text-sm font-semibold capitalize text-[#34423e]">
                        {appointment.status || "scheduled"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#f7faf9] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                      Reason for visit
                    </p>

                    <p className="mt-2 text-sm font-medium text-[#34423e]">
                      {appointment.reason ||
                        "No reason provided"}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "confirmed"
                        )
                      }
                      disabled={
                        updatingId === appointment.id ||
                        appointment.status === "confirmed"
                      }
                      className="rounded-xl bg-[#176b5b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#125848] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingId === appointment.id
                        ? "Updating..."
                        : "Confirm"}
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "completed"
                        )
                      }
                      disabled={
                        updatingId === appointment.id ||
                        appointment.status === "completed"
                      }
                      className="rounded-xl border border-[#cfe8df] bg-[#f0faf6] px-4 py-2.5 text-sm font-semibold text-[#176b5b] transition hover:bg-[#e2f4ed] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Mark completed
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "cancelled"
                        )
                      }
                      disabled={
                        updatingId === appointment.id ||
                        appointment.status === "cancelled"
                      }
                      className="rounded-xl border border-[#ead8d5] bg-[#fff8f7] px-4 py-2.5 text-sm font-semibold text-[#a34f47] transition hover:bg-[#fff1ef] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
            Doctor profile
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Account information
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7faf9] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9aa7a2]">
                Name
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
                {user?.role || "Doctor"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}