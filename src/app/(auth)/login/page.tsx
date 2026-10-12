"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Global } from "iconsax-react";
import { btnSun, container, display, focus } from "../../../common/utils/sharedStyle";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");
const LOGIN_URL = `${API_BASE_URL}/auth/login`;

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage = `Sign-in failed (${response.status}). Please check your details and try again.`;

        if (responseText) {
          try {
            const errorData: unknown = JSON.parse(responseText);
            if (
              typeof errorData === "object" &&
              errorData !== null &&
              "detail" in errorData &&
              typeof errorData.detail === "string"
            ) {
              errorMessage = errorData.detail;
            } else if (
              typeof errorData === "object" &&
              errorData !== null &&
              "message" in errorData &&
              typeof errorData.message === "string"
            ) {
              errorMessage = errorData.message;
            }
          } catch {
            errorMessage = responseText;
          }
        }

        setMessage(errorMessage);
        return;
      }

      router.push("/dashboard");
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[#f6f8f9] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[17px] leading-relaxed text-[#0a1620] antialiased">
      <section
        className="relative isolate overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(900px 500px at 85% -10%, rgba(255,179,71,.35), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(95,208,197,.22), transparent 60%), linear-gradient(180deg, #071a22 0%, #0b2a35 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
          }}
        />
        <div className={`${container} relative grid items-center gap-12 pb-20 pt-32 lg:min-h-[min(760px,100svh)] lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-40`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#5fd0c5]/30 bg-[#5fd0c5]/10 px-4 py-2 text-sm font-semibold text-[#8ee4da]">
              <Global size={18} variant="Bulk" color="currentColor" />
              Egypt Climate Map
            </p>
            <h1 className={`${display} mt-7 text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.08]`}>
              Your climate insights, all in one place.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[19px] text-[#b9ccd6]">
              Sign in to explore local climate risks and continue your work
              helping communities across Egypt.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-[#b9ccd6]">
              <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/[0.07]">
                <Global size={20} variant="Bulk" color="#5fd0c5" />
              </span>
              Local insight for every Egyptian community
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-9">
            <h2 className={`${display} text-[28px] font-semibold sm:text-[32px]`}>
              Welcome back
            </h2>
            <p className="mt-2 text-[15px] text-[#b9ccd6]">
              Sign in to continue to your account.
            </p>

            <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#e5eef2]" htmlFor="email">
                  Email address
                </label>
                <input
                  className={`h-12.5 w-full rounded-xl border border-white/20 bg-white px-4 text-[15px] text-[#0a1620] outline-none transition placeholder:text-[#7d8990] focus:border-[#5fd0c5] focus:ring-2 focus:ring-[#5fd0c5]/30 ${focus}`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#e5eef2]" htmlFor="password">
                  Password
                </label>
                <input
                  className={`h-12.5 w-full rounded-xl border border-white/20 bg-white px-4 text-[15px] text-[#0a1620] outline-none transition placeholder:text-[#7d8990] focus:border-[#5fd0c5] focus:ring-2 focus:ring-[#5fd0c5]/30 ${focus}`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-[#c8d9e2]">
                <input
                  className="size-4 accent-[#5fd0c5]"
                  type="checkbox"
                  name="remember"
                />
                <span>Remember me</span>
              </label>

              <button
                className={`${btnSun} mt-1 inline-flex min-h-12.5 items-center justify-center gap-2 rounded-xl disabled:cursor-wait disabled:opacity-70`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                <ArrowRight size={18} variant="Linear" color="currentColor" />
              </button>

              <p
                className="-mt-2 min-h-5 text-sm leading-normal text-[#ffbf9c]"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            </form>

            <p className="mt-2 border-t border-white/10 pt-5 text-center text-sm text-[#9fb2be]">
              Need help? Contact your administrator.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
