"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-[#f6faf8] text-[#14201d]"
    >
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#dce8e3]/80 bg-[#f6faf8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          <a href="#top" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#176b5b] text-lg font-bold text-white shadow-[0_8px_24px_rgba(23,107,91,0.2)]">
              H
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#f6faf8] bg-[#63c8aa]" />
            </div>

            <div>
              <p className="text-[19px] font-semibold tracking-[-0.02em] text-[#17221f]">
                Healtheon
              </p>

              <p className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[#84938d] sm:block">
                Connected healthcare
              </p>
            </div>
          </a>


          {/* Navigation */}
          <div className="hidden items-center gap-8 text-[13px] font-medium text-[#63716d] md:flex">

            <a
              href="#features"
              className="transition duration-200 hover:text-[#176b5b]"
            >
              Features
            </a>

            <a
              href="#experience"
              className="transition duration-200 hover:text-[#176b5b]"
            >
              Experience
            </a>

            <a
              href="#about"
              className="transition duration-200 hover:text-[#176b5b]"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition duration-200 hover:text-[#176b5b]"
            >
              Contact
            </a>

          </div>


          <div className="flex items-center gap-2">

            <button className="hidden rounded-full px-4 py-2.5 text-[13px] font-medium text-[#3b4945] transition hover:bg-[#e9f1ee] sm:block">
              Log in
            </button>

            <button className="rounded-full bg-[#176b5b] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(23,107,91,0.17)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#125848] hover:shadow-[0_12px_30px_rgba(23,107,91,0.25)]">
              Get started
            </button>

          </div>

        </div>
      </nav>


      {/* Hero */}
      <section className="relative scroll-mt-24">

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

          <div className="absolute left-[2%] top-[-180px] h-[550px] w-[550px] rounded-full bg-[#d8eee7] opacity-60 blur-[100px]" />

          <div className="absolute right-[-160px] top-[80px] h-[500px] w-[500px] rounded-full bg-[#e4f0f3] opacity-70 blur-[100px]" />

          <div className="absolute left-[45%] top-[35%] h-[280px] w-[280px] rounded-full bg-[#e9f3ef] opacity-60 blur-[90px]" />

          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(#cddbd6 1px, transparent 1px), linear-gradient(90deg, #cddbd6 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(circle at center top, black 0%, transparent 72%)",
            }}
          />

        </div>


        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[0.96fr_1.04fr] lg:px-8 lg:pb-32 lg:pt-28">

          {/* Left */}
          <div className="relative z-10">

            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#cfe2dc] bg-white/75 px-4 py-2 text-[12px] font-semibold text-[#176b5b] shadow-[0_5px_20px_rgba(23,107,91,0.05)] backdrop-blur">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#63c8aa] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ba886]" />
              </span>

              Healthcare, simplified.

            </div>


            <h1 className="max-w-3xl text-[52px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#14201d] sm:text-[64px] lg:text-[76px]">

              Better care
              <br />

              starts with
              <br />

              <span className="relative inline-block text-[#176b5b]">

                better connection.

                <svg
                  className="absolute -bottom-3 left-1/2 w-[88%] -translate-x-1/2"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M4 8C72 3 204 3 296 7"
                    stroke="#8bcfbd"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

              </span>

            </h1>


            <p className="mt-8 max-w-xl text-[17px] leading-8 text-[#65746f]">
              Healtheon brings patients, doctors, appointments and medical
              records together in one simple, secure healthcare platform.
            </p>


            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <button className="group rounded-full bg-[#176b5b] px-7 py-3.5 text-[13px] font-semibold text-white shadow-[0_14px_35px_rgba(23,107,91,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#125848] hover:shadow-[0_18px_40px_rgba(23,107,91,0.27)]">

                Get started

                <span className="ml-2 inline-block transition group-hover:translate-x-1">
                  →
                </span>

              </button>


              <a
                href="#features"
                className="rounded-full border border-[#cbdcd6] bg-white/80 px-7 py-3.5 text-center text-[13px] font-semibold text-[#35433f] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#9bbcb1] hover:bg-white"
              >
                Explore Healtheon
              </a>

            </div>


            <div className="mt-11 flex items-center gap-4">

              <div className="flex -space-x-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#f6faf8] bg-[#d6ebe4] text-[11px] font-bold text-[#176b5b]">
                  P
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#f6faf8] bg-[#e9dfd3] text-[11px] font-bold text-[#765c43]">
                  D
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#f6faf8] bg-[#dfe6f2] text-[11px] font-bold text-[#53678f]">
                  +
                </div>

              </div>

              <div className="h-8 w-px bg-[#d7e3de]" />

              <div>

                <p className="text-[12px] font-semibold text-[#34423e]">
                  Built for modern healthcare
                </p>

                <p className="mt-0.5 text-[11px] text-[#899690]">
                  Patients · Doctors · Care teams
                </p>

              </div>

            </div>

          </div>


          {/* Dashboard */}
          <div className="relative mx-auto w-full max-w-[570px] lg:translate-x-3">

            <div className="pointer-events-none absolute -inset-8 rounded-[50px] border border-[#dcebe5]/60" />

            <div className="pointer-events-none absolute -inset-14 rounded-[70px] border border-[#e5efeb]/70" />


            <div className="relative rounded-[34px] border border-white/90 bg-white/95 p-5 shadow-[0_40px_100px_rgba(29,68,57,0.16)] backdrop-blur-xl sm:p-6">

              {/* Browser */}
              <div className="mb-5 flex items-center gap-1.5">

                <span className="h-2.5 w-2.5 rounded-full bg-[#d9e5e1]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9e5e1]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9e5e1]" />

                <div className="ml-4 flex h-6 flex-1 items-center rounded-md bg-[#f5f8f7] px-3">
                  <span className="text-[8px] text-[#b0bbb7]">
                    app.healtheon
                  </span>
                </div>

              </div>


              <div className="flex items-center justify-between border-b border-[#edf1ef] pb-5">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#2ba886]" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#94a19d]">
                      Patient overview
                    </p>

                  </div>

                  <h2 className="mt-1.5 text-[20px] font-semibold tracking-[-0.025em] text-[#17221f]">
                    Good morning
                  </h2>

                </div>


                <div className="flex items-center gap-3">

                  <div className="hidden h-8 w-8 items-center justify-center rounded-lg border border-[#e5ece9] text-[#7d8a86] sm:flex">
                    ♧
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f3ee] text-[12px] font-bold text-[#176b5b]">
                    A
                  </div>

                </div>

              </div>


              {/* Health */}
              <div className="mt-5 rounded-[22px] bg-[#f1f8f5] p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <p className="text-[12px] font-medium text-[#697973]">
                        Health overview
                      </p>

                      <span className="rounded-full bg-[#dff0e9] px-2 py-0.5 text-[8px] font-semibold text-[#176b5b]">
                        LIVE
                      </span>

                    </div>

                    <p className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-[#17221f]">
                      Looking good
                    </p>

                    <p className="mt-1 text-[10px] text-[#8b9994]">
                      Your health information is up to date
                    </p>

                  </div>


                  <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full border-[6px] border-[#b9ded3]">

                    <div className="absolute inset-0 rotate-[25deg] rounded-full border-[6px] border-transparent border-t-[#2ba886]" />

                    <span className="text-[14px] font-bold text-[#176b5b]">
                      92%
                    </span>

                  </div>

                </div>


                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#d9e9e3]">

                  <div className="h-full w-[92%] rounded-full bg-[#2ba886]" />

                </div>

              </div>


              {/* Appointment */}
              <div className="mt-4 rounded-[22px] border border-[#e8efec] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#eaf3f7] text-[17px] text-[#4f7180]">
                      +
                    </div>

                    <div>

                      <p className="text-[12px] font-semibold text-[#25312d]">
                        Upcoming appointment
                      </p>

                      <p className="mt-1 text-[10px] text-[#87938f]">
                        Today · 10:30 AM
                      </p>

                    </div>

                  </div>

                  <span className="rounded-full bg-[#e8f5f0] px-3 py-1.5 text-[9px] font-semibold text-[#176b5b]">
                    Confirmed
                  </span>

                </div>


                <div className="mt-4 flex items-center justify-between border-t border-[#edf1ef] pt-3">

                  <span className="text-[10px] text-[#899590]">
                    General consultation
                  </span>

                  <span className="text-[10px] font-semibold text-[#176b5b]">
                    View details →
                  </span>

                </div>

              </div>


              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">

                <div className="rounded-[22px] bg-[#fff9f1] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[10px] font-medium text-[#8d7d69]">
                      Medical records
                    </p>

                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-[10px] text-[#a06c2b] shadow-sm">
                      □
                    </span>

                  </div>

                  <p className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-[#42372b]">
                    08
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#9b8e7f]">
                    Secure records
                  </p>

                </div>


                <div className="rounded-[22px] bg-[#f2f0fa] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[10px] font-medium text-[#756f8b]">
                      Appointments
                    </p>

                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-[10px] text-[#63558e] shadow-sm">
                      +
                    </span>

                  </div>

                  <p className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-[#443e59]">
                    03
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#89839b]">
                    This month
                  </p>

                </div>

              </div>

            </div>


            {/* Floating notification */}
            <div className="absolute -left-10 top-[27%] hidden rounded-[20px] border border-white bg-white p-4 shadow-[0_22px_55px_rgba(34,70,61,0.13)] lg:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f4ee] text-[15px] font-bold text-[#176b5b]">
                  ✓
                </div>

                <div>

                  <p className="text-[9px] font-medium uppercase tracking-wider text-[#96a29e]">
                    Appointment
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold text-[#27332f]">
                    Successfully booked
                  </p>

                </div>

              </div>

            </div>


            {/* Security */}
            <div className="absolute -bottom-8 -right-7 hidden rounded-[20px] border border-[#2d7565] bg-[#176b5b] px-5 py-4 text-white shadow-[0_25px_60px_rgba(23,107,91,0.25)] sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[13px]">
                  ✓
                </div>

                <div>

                  <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#a9d8cc]">
                    Security
                  </p>

                  <p className="mt-1 text-[11px] font-semibold">
                    Your data stays protected
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Stats */}
      <section className="relative border-y border-[#dce8e3] bg-white">

        <div className="mx-auto grid max-w-7xl divide-y divide-[#e6eeeb] px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

          <div className="px-6 py-8">

            <div className="flex items-center gap-4">

              <p className="text-[31px] font-semibold tracking-[-0.04em] text-[#176b5b]">
                01
              </p>

              <div>

                <p className="text-[12px] font-semibold text-[#303e3a]">
                  Connected platform
                </p>

                <p className="mt-1 text-[10px] text-[#899690]">
                  Patients, doctors & records
                </p>

              </div>

            </div>

          </div>


          <div className="px-6 py-8">

            <div className="flex items-center gap-4">

              <p className="text-[31px] font-semibold tracking-[-0.04em] text-[#176b5b]">
                24/7
              </p>

              <div>

                <p className="text-[12px] font-semibold text-[#303e3a]">
                  Healthcare access
                </p>

                <p className="mt-1 text-[10px] text-[#899690]">
                  Your information when needed
                </p>

              </div>

            </div>

          </div>


          <div className="px-6 py-8">

            <div className="flex items-center gap-4">

              <p className="text-[31px] font-semibold tracking-[-0.04em] text-[#176b5b]">
                100%
              </p>

              <div>

                <p className="text-[12px] font-semibold text-[#303e3a]">
                  Focused on secure care
                </p>

                <p className="mt-1 text-[10px] text-[#899690]">
                  Privacy at the center
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        id="features"
        className="scroll-mt-24 bg-white px-6 py-28 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#176b5b]">
                One connected experience
              </p>

              <h2 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#17221f] sm:text-[52px]">
                Everything your
                <br />
                care journey needs.
              </h2>

            </div>


            <p className="max-w-xl text-[16px] leading-8 text-[#6c7b76] lg:pb-2">
              From booking an appointment to accessing your medical history,
              Healtheon keeps the important parts of your healthcare journey
              together.
            </p>

          </div>


          <div className="mt-16 grid gap-5 md:grid-cols-3">

            <div className="group relative overflow-hidden rounded-[30px] border border-[#e0eae6] bg-[#f7fbf9] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#c5ddd5] hover:shadow-[0_25px_60px_rgba(23,107,91,0.1)]">

              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#dff1eb] opacity-70 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#dff1eb] text-xl text-[#176b5b]">
                    +
                  </div>

                  <span className="text-[10px] font-bold tracking-widest text-[#a2aea9]">
                    01
                  </span>

                </div>

                <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.02em] text-[#26332f]">
                  Appointments
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#71807b]">
                  Book and manage appointments without the usual back and
                  forth. Keep upcoming consultations visible and organized.
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-[#e1ebe7] pt-5">

                  <span className="text-[12px] font-semibold text-[#176b5b]">
                    Simple scheduling
                  </span>

                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>

            </div>


            <div className="group relative overflow-hidden rounded-[30px] border border-[#e0eae6] bg-[#f9f8fc] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d8d1ec] hover:shadow-[0_25px_60px_rgba(92,76,130,0.1)]">

              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#e8e4f5] opacity-70 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#e8e4f5] text-xl text-[#63558e]">
                    □
                  </div>

                  <span className="text-[10px] font-bold tracking-widest text-[#a2aea9]">
                    02
                  </span>

                </div>

                <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.02em] text-[#26332f]">
                  Medical records
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#71807b]">
                  Keep diagnoses, notes and prescriptions organized and
                  accessible when important health information is needed.
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-[#e5e1ef] pt-5">

                  <span className="text-[12px] font-semibold text-[#63558e]">
                    Stay organized
                  </span>

                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>

            </div>


            <div className="group relative overflow-hidden rounded-[30px] border border-[#e0eae6] bg-[#fcfaf6] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#eadbc2] hover:shadow-[0_25px_60px_rgba(145,105,54,0.1)]">

              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#fff0d9] opacity-70 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#fff0d9] text-xl text-[#a06c2b]">
                    ◉
                  </div>

                  <span className="text-[10px] font-bold tracking-widest text-[#a2aea9]">
                    03
                  </span>

                </div>

                <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.02em] text-[#26332f]">
                  Doctor care
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#71807b]">
                  Connect healthcare providers and patients through a
                  centralized platform built around clearer coordination.
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-[#eee5d8] pt-5">

                  <span className="text-[12px] font-semibold text-[#a06c2b]">
                    Better coordination
                  </span>

                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Experience */}
      <section
        id="experience"
        className="scroll-mt-24 relative overflow-hidden border-y border-[#dce8e3] bg-[#f5faf8] px-6 py-28 lg:px-8"
      >

        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#dff1eb] opacity-50 blur-[110px]" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#176b5b]">
              Your care, connected
            </p>

            <h2 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#17221f] sm:text-[52px]">
              Less searching.
              <br />
              More clarity.
            </h2>

            <p className="mt-6 max-w-lg text-[16px] leading-8 text-[#6c7b76]">
              Healtheon is designed around the way a real healthcare journey
              happens — from a patient profile to an appointment and finally
              to a medical record.
            </p>


            <div className="mt-9 space-y-4">

              <div className="flex items-center gap-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dff1eb] text-[11px] font-bold text-[#176b5b]">
                  01
                </div>

                <p className="text-[13px] font-medium text-[#394743]">
                  Patient information stays organized
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf3f7] text-[11px] font-bold text-[#4f7180]">
                  02
                </div>

                <p className="text-[13px] font-medium text-[#394743]">
                  Appointments stay easy to follow
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8e4f5] text-[11px] font-bold text-[#63558e]">
                  03
                </div>

                <p className="text-[13px] font-medium text-[#394743]">
                  Medical history remains accessible
                </p>

              </div>

            </div>

          </div>


          <div className="relative">

            <div className="rounded-[34px] border border-white bg-white/90 p-5 shadow-[0_35px_90px_rgba(31,68,58,0.12)] backdrop-blur-xl sm:p-7">

              <div className="flex items-center justify-between border-b border-[#edf1ef] pb-5">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a19d]">
                    Care journey
                  </p>

                  <p className="mt-1 text-[17px] font-semibold text-[#26332f]">
                    Everything stays connected
                  </p>

                </div>

                <span className="rounded-full bg-[#e8f5f0] px-3 py-1.5 text-[9px] font-semibold text-[#176b5b]">
                  ACTIVE
                </span>

              </div>


              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-4 rounded-[19px] border border-[#e7efec] bg-[#f9fbfa] p-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#dff1eb] text-[12px] font-bold text-[#176b5b]">
                    P
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <p className="text-[12px] font-semibold text-[#2d3a36]">
                        Patient profile
                      </p>

                      <span className="text-[9px] font-medium text-[#176b5b]">
                        Complete
                      </span>

                    </div>

                    <p className="mt-1 text-[9px] text-[#8a9893]">
                      Personal information securely stored
                    </p>

                  </div>

                </div>


                <div className="ml-[22px] h-5 border-l border-dashed border-[#bcd4cc]" />


                <div className="flex items-center gap-4 rounded-[19px] border border-[#e7efec] bg-[#f9fbfa] p-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#eaf3f7] text-[16px] text-[#4f7180]">
                    +
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <p className="text-[12px] font-semibold text-[#2d3a36]">
                        Appointment
                      </p>

                      <span className="rounded-full bg-[#e8f5f0] px-2.5 py-1 text-[8px] font-semibold text-[#176b5b]">
                        CONFIRMED
                      </span>

                    </div>

                    <p className="mt-1 text-[9px] text-[#8a9893]">
                      Today · 10:30 AM · General consultation
                    </p>

                  </div>

                </div>


                <div className="ml-[22px] h-5 border-l border-dashed border-[#bcd4cc]" />


                <div className="flex items-center gap-4 rounded-[19px] border border-[#e7efec] bg-[#f9fbfa] p-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#e8e4f5] text-[14px] text-[#63558e]">
                    □
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <p className="text-[12px] font-semibold text-[#2d3a36]">
                        Medical record
                      </p>

                      <span className="text-[9px] font-medium text-[#63558e]">
                        Updated
                      </span>

                    </div>

                    <p className="mt-1 text-[9px] text-[#8a9893]">
                      Consultation notes and prescription
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-5 flex items-center gap-3 rounded-[17px] bg-[#f1f8f5] px-4 py-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff1eb] text-[11px] font-bold text-[#176b5b]">
                  ✓
                </div>

                <p className="text-[10px] font-medium text-[#53635e]">
                  Your healthcare information is connected and ready when you
                  need it.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 bg-white px-6 py-28 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#176b5b]">
                Why Healtheon
              </p>

              <h2 className="mt-4 max-w-2xl text-[42px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#17221f] sm:text-[52px]">
                Healthcare should feel connected, not complicated.
              </h2>

              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#6c7b76]">
                Healtheon is built to make everyday healthcare workflows
                easier to understand and easier to manage — for patients,
                doctors and care teams.
              </p>


              <div className="mt-8 flex flex-wrap gap-2.5">

                <span className="rounded-full border border-[#d9e6e1] bg-[#f7faf9] px-4 py-2 text-[11px] font-medium text-[#566560]">
                  Patient focused
                </span>

                <span className="rounded-full border border-[#d9e6e1] bg-[#f7faf9] px-4 py-2 text-[11px] font-medium text-[#566560]">
                  Secure by design
                </span>

                <span className="rounded-full border border-[#d9e6e1] bg-[#f7faf9] px-4 py-2 text-[11px] font-medium text-[#566560]">
                  Simple workflows
                </span>

              </div>

            </div>


            <div className="relative">

              <div className="absolute -inset-5 rounded-[40px] bg-[#e8f3ef] opacity-50 blur-2xl" />

              <div className="relative rounded-[30px] border border-[#e0ebe7] bg-[#f7faf9] p-6">

                <div className="rounded-[23px] border border-[#e3ebe8] bg-white p-6 shadow-sm">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a19d]">
                        Healtheon
                      </p>

                      <p className="mt-1 text-[16px] font-semibold text-[#27332f]">
                        Built around better care
                      </p>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f3ee] text-[12px] font-bold text-[#176b5b]">
                      H
                    </div>

                  </div>


                  <div className="mt-7 grid grid-cols-2 gap-3">

                    <div className="rounded-[18px] bg-[#f2f8f6] p-4">

                      <p className="text-[9px] text-[#7f8d88]">
                        Patients
                      </p>

                      <p className="mt-2 text-[22px] font-semibold text-[#176b5b]">
                        01
                      </p>

                      <p className="mt-1 text-[8px] text-[#9aa6a2]">
                        Connected
                      </p>

                    </div>


                    <div className="rounded-[18px] bg-[#f4f2f9] p-4">

                      <p className="text-[9px] text-[#7f8a86]">
                        Records
                      </p>

                      <p className="mt-2 text-[22px] font-semibold text-[#63558e]">
                        08
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a94a8]">
                        Organized
                      </p>

                    </div>

                  </div>


                  <div className="mt-3 rounded-[18px] border border-[#e6ecea] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0d9] text-[11px] text-[#a06c2b]">
                        ◉
                      </div>

                      <div className="flex-1">

                        <p className="text-[10px] font-semibold text-[#35423e]">
                          Secure care journey
                        </p>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf1ef]">

                          <div className="h-full w-[86%] rounded-full bg-[#2ba886]" />

                        </div>

                      </div>

                      <span className="text-[9px] font-semibold text-[#176b5b]">
                        86%
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="px-6 pb-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[38px] bg-[#123e35] px-8 py-16 sm:px-16 sm:py-20">

            <div className="pointer-events-none absolute -right-24 -top-28 h-[330px] w-[330px] rounded-full bg-[#38a98c]/20 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-[300px] w-[300px] rounded-full bg-[#79d3bc]/10 blur-[80px]" />


            <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#3b6f64] bg-white/5 px-3 py-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#68cdb0]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a9d8cc]">
                    Your healthcare, connected
                  </span>

                </div>

                <h2 className="mt-5 max-w-2xl text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[52px]">
                  A simpler way to manage healthcare.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#b7d0c9]">
                  Appointments, medical records and patient care — brought
                  together through Healtheon.
                </p>

              </div>


              <button className="group w-fit shrink-0 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-[#153d35] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#edf7f4]">

                Get started

                <span className="ml-2 inline-block transition group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer
        id="contact"
        className="scroll-mt-24 border-t border-[#dce8e3] bg-[#f6faf8]"
      >

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <a href="#top" className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#176b5b] text-sm font-bold text-white">
                  H
                </div>

                <span className="font-semibold tracking-[-0.02em] text-[#26332f]">
                  Healtheon
                </span>

              </a>

              <p className="mt-3 max-w-xs text-[11px] leading-5 text-[#82908b]">
                Building a better, simpler and more connected healthcare
                experience.
              </p>

            </div>


            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-medium text-[#687873]">

              <a href="#features" className="transition hover:text-[#176b5b]">
                Features
              </a>

              <a
                href="#experience"
                className="transition hover:text-[#176b5b]"
              >
                Experience
              </a>

              <a href="#about" className="transition hover:text-[#176b5b]">
                About
              </a>

              <a href="#contact" className="transition hover:text-[#176b5b]">
                Contact
              </a>

            </div>

          </div>


          <div className="mt-8 flex flex-col gap-2 border-t border-[#dce8e3] pt-6 text-[10px] text-[#8a9792] sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 Healtheon. All rights reserved.
            </p>

            <p>
              Designed for better connected care.
            </p>

          </div>

        </div>

      </footer>


      {/* Back to top */}
      <button
        onClick={goToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-[#176b5b] text-lg font-semibold text-white shadow-[0_15px_35px_rgba(23,107,91,0.25)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-[#125848] ${
          showTopButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        ↑
      </button>

    </main>
  );
}