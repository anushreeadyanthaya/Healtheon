"use client";

import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  patient_name?: string;
  full_name?: string;
  patient?: string;
  appointment_date: string;
  reason?: string;
  status: string;
};

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  const checkDoctorAccess = async () => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return false;
    }

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
        return false;
      }

      const user: User = data.user || data;

      if (user.role !== "doctor") {
        setError("Access denied. You do not have permission to access the Doctor Dashboard.");
        setLoading(false);
        return false;
      }

      setAuthorized(true);
      return true;
    } catch (error) {
      console.error("Profile check error:", error);

      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );

      setLoading(false);
      return false;
    }
  };

  const getDoctorAppointments = async () => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments/doctor/my-appointments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("healtheon_token");
          window.location.href = "/login";
          return;
        }

        setError(data.message || "Unable to load appointments.");
        return;
      }

      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Doctor appointments error:", error);

      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const hasAccess = await checkDoctorAccess();

      if (hasAccess) {
        await getDoctorAppointments();
      }
    };

    initializeDashboard();
  }, []);

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
        setError(data.message || "Unable to update appointment.");
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
    } catch (error) {
      console.error("Update appointment error:", error);

      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getPatientName = (appointment: Appointment) => {
    return (
      appointment.patient_name ||
      appointment.full_name ||
      appointment.patient ||
      "Patient"
    );
  };

  const getStatusLabel = (status: string) => {
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";
    if (status === "completed") return "Completed";
    if (status === "scheduled") return "Pending";

    return status || "Pending";
  };

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  ).length;

  const pendingCount = appointments.filter(
    (appointment) =>
      appointment.status === "scheduled" ||
      appointment.status === "pending"
  ).length;

  if (!authorized && error) {
    return (
      <main className="min-h-screen bg-[#f7fbfa]">
        <header className="border-b border-[#dceee9] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Doctor Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your appointments and patient visits
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dff1ec] font-semibold text-[#176B5B]">
                DS
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Healtheon
                </p>

                <p className="text-xs text-slate-500">
                  Healthcare Platform
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl border border-[#f0d3d0] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1ef] text-3xl">
              🔒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              Access Denied
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              You do not have permission to access the Doctor Dashboard.
              This page is available only to users with a doctor account.
            </p>

            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-6 rounded-xl bg-[#176B5B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12594c]"
            >
              Go Back
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (loading && !authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7fbfa]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dceee9] border-t-[#176B5B]" />

          <p className="mt-4 text-sm text-slate-500">
            Checking access...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbfa]">
      {/* Header */}
      <header className="border-b border-[#dceee9] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Doctor Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your appointments and patient visits
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dff1ec] font-semibold text-[#176B5B]">
              DS
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Dr. Sarah Smith
              </p>

              <p className="text-xs text-slate-500">
                Doctor
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome Banner */}
        <div className="mb-8 rounded-2xl bg-[#176B5B] p-7 text-white shadow-lg">
          <p className="text-sm font-medium text-[#dff1ec]">
            Welcome back, Doctor 👋
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Good to see you, Dr. Sarah!
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[#dff1ec]">
            Here is an overview of your appointments and today's schedule.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-[#f0d3d0] bg-[#fff6f5] px-5 py-4 text-sm text-[#a34f47]">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-[#dceee9] bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Appointments
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {appointments.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#dceee9] bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-[#176B5B]">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[#dceee9] bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-500">
              {pendingCount}
            </p>
          </div>

        </div>

        {/* Appointments */}
        <div className="rounded-2xl border border-[#dceee9] bg-white shadow-sm">

          {/* Section Header */}
          <div className="border-b border-[#dceee9] p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Patient Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage appointments requested by your patients
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-12 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dceee9] border-t-[#176B5B]" />

              <p className="mt-4 text-sm text-slate-500">
                Loading appointments...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && appointments.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#dff1ec] text-2xl">
                📅
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                No appointments yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Appointments requested by your patients will appear here.
              </p>
            </div>
          )}

          {/* Appointment List */}
          {!loading && appointments.length > 0 && (
            <div className="divide-y divide-[#edf6f3]">

              {appointments.map((appointment) => {
                const patientName = getPatientName(appointment);
                const statusLabel = getStatusLabel(
                  appointment.status
                );

                return (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-5 p-6 transition hover:bg-[#f4faf8] lg:flex-row lg:items-center lg:justify-between"
                  >

                    {/* Patient Information */}
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff1ec] font-semibold text-[#176B5B]">
                        {patientName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {patientName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
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
                            : "Date not available"}
                        </p>

                        {appointment.reason && (
                          <p className="mt-1 text-xs text-slate-400">
                            Reason: {appointment.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${
                          appointment.status === "confirmed"
                            ? "bg-[#dff1ec] text-[#176B5B]"
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : appointment.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {statusLabel}
                      </span>

                      {(appointment.status === "scheduled" ||
                        appointment.status === "pending") && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "confirmed"
                              )
                            }
                            disabled={
                              updatingId === appointment.id
                            }
                            className="rounded-xl bg-[#176B5B] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#12594c] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {updatingId === appointment.id
                              ? "Updating..."
                              : "Confirm"}
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "cancelled"
                              )
                            }
                            disabled={
                              updatingId === appointment.id
                            }
                            className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {appointment.status === "confirmed" && (
                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "completed"
                            )
                          }
                          disabled={
                            updatingId === appointment.id
                          }
                          className="rounded-xl border border-[#cfe8df] bg-white px-4 py-2 text-xs font-semibold text-[#176B5B] transition hover:bg-[#f0faf6] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId === appointment.id
                            ? "Updating..."
                            : "Mark Completed"}
                        </button>
                      )}

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}