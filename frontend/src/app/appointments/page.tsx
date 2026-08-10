"use client";

import { FormEvent, useEffect, useState } from "react";
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
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const getAppointments = async () => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
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
      console.error("Appointments error:", error);
      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleCreateAppointment = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setCreating(true);

    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      setError("Please enter both the appointment date and time.");
      setCreating(false);
      return;
    }

    const combinedDateTime = `${appointmentDate}T${appointmentTime}`;

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId,
            doctorName,
            appointmentDate: combinedDateTime,
            reason,
            status: "scheduled",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create appointment.");
        return;
      }

      setSuccess("Appointment created successfully.");

      setDoctorId("");
      setDoctorName("");
      setAppointmentDate("");
      setAppointmentTime("");
      setReason("");

      await getAppointments();
    } catch (error) {
      console.error("Create appointment error:", error);
      setError(
        "Unable to connect to Healtheon. Please make sure the backend is running."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7faf9] text-[#17221f]">
      <header className="border-b border-[#e1ebe7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#176b5b] text-lg font-bold text-white">
              H
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Healtheon
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-[#dce7e3] px-4 py-2 text-sm font-medium text-[#34423e] transition hover:border-[#176b5b] hover:text-[#176b5b]"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176b5b]">
            Healthcare scheduling
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Appointments
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#71807b] sm:text-base">
            Request appointments and keep track of your upcoming healthcare
            visits.
          </p>
        </section>

        <section className="mt-10 rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
              New appointment
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Request an appointment
            </h2>

            <p className="mt-2 text-sm text-[#71807b]">
              Enter the appointment details below.
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

          <form
            onSubmit={handleCreateAppointment}
            className="mt-7 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="doctorId"
                className="mb-2 block text-sm font-medium text-[#34423e]"
              >
                Doctor ID
              </label>

              <input
                id="doctorId"
                type="text"
                placeholder="Enter doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="doctorName"
                className="mb-2 block text-sm font-medium text-[#34423e]"
              >
                Doctor name
              </label>

              <input
                id="doctorName"
                type="text"
                placeholder="Enter doctor's name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="appointmentDate"
                className="mb-2 block text-sm font-medium text-[#34423e]"
              >
                Appointment date
              </label>

              <input
                id="appointmentDate"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="appointmentTime"
                className="mb-2 block text-sm font-medium text-[#34423e]"
              >
                Appointment time
              </label>

              <input
                id="appointmentTime"
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-[#34423e]"
              >
                Reason for visit
              </label>

              <input
                id="reason"
                type="text"
                placeholder="Example: General consultation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#dce7e3] bg-[#fbfdfc] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a0ada8] focus:border-[#176b5b] focus:bg-white focus:ring-4 focus:ring-[#176b5b]/10"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-2xl bg-[#176b5b] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,107,91,0.18)] transition hover:-translate-y-0.5 hover:bg-[#125848] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creating
                  ? "Creating appointment..."
                  : "Request appointment"}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#176b5b]">
                Your appointments
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Appointment history
              </h2>
            </div>

            <span className="rounded-full bg-[#e8f5f1] px-3 py-1 text-xs font-semibold text-[#176b5b]">
              {appointments.length}{" "}
              {appointments.length === 1
                ? "appointment"
                : "appointments"}
            </span>
          </div>

          {loading && (
            <div className="mt-6 rounded-[28px] border border-[#e1ebe7] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dcebe6] border-t-[#176b5b]" />

              <p className="mt-4 text-sm text-[#71807b]">
                Loading your appointments...
              </p>
            </div>
          )}

          {!loading && appointments.length === 0 && (
            <div className="mt-6 rounded-[28px] border border-[#e1ebe7] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8f5f1] text-2xl">
                📅
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                No appointments yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71807b]">
                Your appointments will appear here after you request one.
              </p>
            </div>
          )}

          {!loading && appointments.length > 0 && (
            <div className="mt-6 space-y-5">
              {appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#176b5b]">
                        Appointment
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

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                        Doctor
                      </p>

                      <p className="mt-2 break-all text-sm font-semibold text-[#34423e]">
                        {appointment.doctor_name ||
                          appointment.doctor_id ||
                          "Not available"}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}