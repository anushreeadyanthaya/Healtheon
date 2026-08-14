"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_URL from "@/lib/api";

type MedicalRecord = {
  id: string;
  patient_id: string;
  diagnosis: string;
  notes: string;
  prescription: string;
  record_date: string;
  created_at: string;
};

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("healtheon_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const getRecords = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/medical-records`,
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

          setError(data.message || "Unable to load medical records.");
          return;
        }

        setRecords(data.records || []);
      } catch (error) {
        console.error("Medical records error:", error);
        setError(
          "Unable to connect to Healtheon. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    getRecords();
  }, []);

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
            Health history
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Medical Records
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#71807b] sm:text-base">
            View your diagnoses, notes and prescriptions securely in one
            place.
          </p>
        </section>

        {loading && (
          <div className="mt-10 rounded-[28px] border border-[#e1ebe7] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dcebe6] border-t-[#176b5b]" />

            <p className="mt-4 text-sm text-[#71807b]">
              Loading your medical records...
            </p>

          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-[28px] border border-[#f0d3d0] bg-[#fff6f5] p-6 text-sm text-[#a34f47]">
            {error}
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="mt-10 rounded-[28px] border border-[#e1ebe7] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8f5f1] text-2xl">
              🩺
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No medical records yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71807b]">
              Your medical records will appear here once they are added to
              your Healtheon account.
            </p>

          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <section className="mt-10 space-y-5">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Your records
              </h2>

              <span className="rounded-full bg-[#e8f5f1] px-3 py-1 text-xs font-semibold text-[#176b5b]">
                {records.length}{" "}
                {records.length === 1 ? "record" : "records"}
              </span>
            </div>

            {records.map((record) => (
              <article
                key={record.id}
                className="rounded-[28px] border border-[#e1ebe7] bg-white p-6 shadow-sm transition hover:shadow-[0_15px_40px_rgba(34,70,61,0.07)] sm:p-8"
              >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#176b5b]">
                      Diagnosis
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {record.diagnosis || "No diagnosis provided"}
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-[#f7faf9] px-4 py-3 text-left sm:text-right">

                    <p className="text-xs text-[#9aa7a2]">
                      Record date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#34423e]">
                      {record.record_date
                        ? new Date(record.record_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Not available"}
                    </p>

                  </div>

                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  <div className="rounded-2xl bg-[#f7faf9] p-5">

                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                      Notes
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#34423e]">
                      {record.notes || "No notes available."}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#f7faf9] p-5">

                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9aa7a2]">
                      Prescription
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#34423e]">
                      {record.prescription || "No prescription available."}
                    </p>

                  </div>

                </div>

                <div className="mt-5 border-t border-[#edf2f0] pt-4">

                  <p className="text-xs text-[#9aa7a2]">
                    Record ID: {record.id}
                  </p>

                </div>

              </article>
            ))}

          </section>
        )}

      </div>

    </main>
  );
}
