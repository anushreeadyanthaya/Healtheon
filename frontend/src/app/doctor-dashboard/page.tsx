"use client";

import { useState } from "react";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Anushka Rao",
      date: "11 Aug 2026",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Rahul Kumar",
      date: "11 Aug 2026",
      time: "12:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Priya Shetty",
      date: "12 Aug 2026",
      time: "09:30 AM",
      status: "Confirmed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addAppointment = () => {
    if (!patient || !date || !time) {
      alert("Please fill all appointment details.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patient,
      date,
      time,
      status: "Pending",
    };

    setAppointments([...appointments, newAppointment]);

    setPatient("");
    setDate("");
    setTime("");
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-[#f4faf8]">
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
              {
                appointments.filter(
                  (appointment) => appointment.status === "Confirmed"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-[#dceee9] bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-500">
              {
                appointments.filter(
                  (appointment) => appointment.status === "Pending"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Appointments */}
        <div className="rounded-2xl border border-[#dceee9] bg-white shadow-sm">

          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#dceee9] p-6 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your patient appointments
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-xl bg-[#176B5B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#12594c]"
            >
              {showForm ? "Close" : "+ Add Appointment"}
            </button>
          </div>

          {/* Add Appointment Form */}
          {showForm && (
            <div className="border-b border-[#dceee9] bg-[#f4faf8] p-6">

              <h3 className="mb-4 text-lg font-semibold text-slate-800">
                Add New Appointment
              </h3>

              <div className="grid gap-4 md:grid-cols-3">

                {/* Patient */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#176B5B] focus:ring-2 focus:ring-[#dff1ec]"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 15 Aug 2026"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#176B5B] focus:ring-2 focus:ring-[#dff1ec]"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Time
                  </label>

                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#176B5B] focus:ring-2 focus:ring-[#dff1ec]"
                  />
                </div>
              </div>

              <button
                onClick={addAppointment}
                className="mt-5 rounded-xl bg-[#176B5B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12594c]"
              >
                Save Appointment
              </button>
            </div>
          )}

          {/* Appointment List */}
          <div className="divide-y divide-[#edf6f3]">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col gap-4 p-6 transition hover:bg-[#f4faf8] md:flex-row md:items-center md:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff1ec] font-semibold text-[#176B5B]">
                    {appointment.patient
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {appointment.patient}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.date} • {appointment.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-[#dff1ec] text-[#176B5B]"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {appointment.status}
                </span>

              </div>
            ))}

          </div>
        </div>
      </section>
    </main>
  );
}