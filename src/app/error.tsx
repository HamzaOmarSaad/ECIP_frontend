"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Global } from "iconsax-react";
import { btnSun, container, display, focus } from "../common/utils/sharedStyle";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section
      className="relative isolate flex min-h-[min(760px,calc(100svh-80px))] items-center overflow-hidden bg-[#0b2a35] py-28 text-white"
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

      <div
        className={`${container} relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]`}
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#5fd0c5]/30 bg-[#5fd0c5]/10 px-4 py-2 text-sm font-semibold text-[#8ee4da]">
            <Global size={18} variant="Bulk" color="currentColor" />
            Climate map update
          </p>
          <h1 className={`${display} mt-8 text-[clamp(36px,5vw,64px)] font-bold leading-[1.08]`}>
            A forecast hiccup.
            <span className="block text-[#ffb347]">We&apos;re on it.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg text-[#b9ccd6]">
            Something went wrong while loading this page. Try again, or head
            back to the home page and continue exploring.
          </p>
          {error.digest && (
            <p className="mt-4 text-xs text-[#9fb2be]">
              Error reference: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={retry}
              className={`${btnSun} inline-flex items-center gap-2`}
            >
              Try again
              <ArrowRight size={18} variant="Linear" color="currentColor" />
            </button>
            <Link
              href="/"
              className={`inline-flex items-center rounded-full border border-white/20 px-[18px] py-2.5 text-[15px] font-semibold text-white transition hover:bg-white/10 ${focus}`}
            >
              Back to home
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto grid aspect-square w-full max-w-[390px] place-items-center rounded-full border border-white/10 bg-white/[0.04] sm:max-w-[440px]"
        >
          <div className="absolute inset-[11%] rounded-full border border-dashed border-[#5fd0c5]/30" />
          <div className="absolute inset-[24%] rounded-full border border-white/10" />
          <div className="absolute inset-[37%] rounded-full border border-white/10" />
          <span className="absolute left-[18%] top-[28%] size-3 rounded-full bg-[#5fd0c5] shadow-[0_0_28px_8px_rgba(95,208,197,0.25)]" />
          <span className="absolute bottom-[23%] right-[21%] size-2.5 rounded-full bg-[#ffb347] shadow-[0_0_26px_7px_rgba(255,179,71,0.25)]" />
          <span
            className={`${display} text-[clamp(38px,7vw,64px)] font-bold tracking-[0.12em] text-white/90`}
          >
            ECIP
          </span>
        </div>
      </div>
    </section>
  );
}
