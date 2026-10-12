"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Global, Location } from "iconsax-react";
import { GOVERNORATES } from "../../common/data/governorates";
import { container, display, focus } from "../../common/utils/sharedStyle";

const REGIONS = [
  {
    id: "lower",
    name: "Lower Egypt",
    description: "The Nile Delta, capital, and northern coast.",
    color: "#5fd0c5",
  },
  {
    id: "upper",
    name: "Upper Egypt",
    description: "The Nile Valley and governorates to the south.",
    color: "#ffb347",
  },
] as const;

export default function GovernmentPage() {
  const [selectedRegion, setSelectedRegion] = useState<
    (typeof REGIONS)[number]["id"]
  >("lower");

  const selectedRegionInfo = REGIONS.find(
    (region) => region.id === selectedRegion,
  );
  const regionGovernorates = GOVERNORATES.filter(
    (governorate) => governorate.region === selectedRegion,
  );

  return (
    <main className="bg-[#f6f8f9] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[17px] leading-relaxed text-[#0a1620] antialiased">
      <section
        className="relative isolate min-h-[min(760px,calc(100svh-80px))] overflow-hidden py-32 text-white lg:py-40"
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

        <div className={`${container} relative`}>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#5fd0c5]/30 bg-[#5fd0c5]/10 px-4 py-2 text-sm font-semibold text-[#8ee4da]">
              <Global size={18} variant="Bulk" color="currentColor" />
              Explore Egypt
            </p>
            <h1
              className={`${display} mt-6 text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.08]`}
            >
              Find your governorate.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[19px] text-[#b9ccd6]">
              Choose a region of Egypt, then select a governorate to view its
              details.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section
              aria-labelledby="region-heading"
              className="rounded-[28px] border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md sm:p-7"
            >
              <h2
                id="region-heading"
                className={`${display} text-xl font-semibold`}
              >
                Select a region
              </h2>
              <p className="mt-1 text-sm text-[#b9ccd6]">
                Egypt is divided here into two regions.
              </p>

              <div
                className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
                role="group"
                aria-label="Egypt regions"
              >
                {REGIONS.map((region) => {
                  const isSelected = selectedRegion === region.id;

                  return (
                    <button
                      key={region.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`group flex min-h-28 items-center gap-4 rounded-2xl border p-4 text-left transition sm:min-h-32 ${
                        isSelected
                          ? "border-[#5fd0c5]/70 bg-white/12 shadow-[0_0_0_1px_rgba(95,208,197,0.15)]"
                          : "border-white/10 bg-[#071a22]/35 hover:border-white/25 hover:bg-white/8"
                      } ${focus}`}
                    >
                      <span
                        aria-hidden="true"
                        className="relative flex h-20 w-14 flex-none items-center justify-center"
                      >
                        <svg
                          viewBox="0 0 56 96"
                          className="h-full w-full"
                          fill="none"
                        >
                          <path
                            d="M15 4 38 7 48 20 43 35 49 48 42 61 44 75 34 91 23 87 17 71 10 58 14 43 8 29 13 17Z"
                            fill="#173c48"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1.5"
                          />
                          <path
                            d={
                              region.id === "lower"
                                ? "M15 4 38 7 48 20 43 35 49 48 42 53 12 53 14 43 8 29 13 17Z"
                                : "M12 53 42 53 42 61 44 75 34 91 23 87 17 71 10 58Z"
                            }
                            fill={region.color}
                            fillOpacity={isSelected ? 0.95 : 0.45}
                            stroke={region.color}
                            strokeWidth="1.5"
                          />
                          <path
                            d="M25 17 29 34 24 49 30 66 28 82"
                            stroke="#f6f8f9"
                            strokeOpacity="0.75"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">
                          {region.name}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-[#b9ccd6]">
                          {region.description}
                        </span>
                      </span>
                      {isSelected && (
                        <span
                          className="size-2.5 flex-none rounded-full"
                          style={{ backgroundColor: region.color }}
                          aria-label="Selected"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section
              aria-labelledby="governorates-heading"
              className="rounded-[28px] border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md sm:p-7"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#8ee4da]">
                    Governorates
                  </p>
                  <h2
                    id="governorates-heading"
                    className={`${display} mt-1 text-2xl font-semibold`}
                  >
                    {selectedRegionInfo?.name}
                  </h2>
                </div>
                <span className="text-sm text-[#b9ccd6]">
                  {regionGovernorates.length} places
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {regionGovernorates.map((governorate) => (
                  <Link
                    key={governorate.id}
                    href={`/government/${governorate.id}`}
                    className={`group flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#071a22]/35 px-4 py-3 transition hover:border-[#5fd0c5]/50 hover:bg-white/8 ${focus}`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Location
                        size={19}
                        variant="Bulk"
                        color="#5fd0c5"
                        className="flex-none"
                      />
                      <span className="truncate font-medium text-white">
                        {governorate.name}
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      variant="Linear"
                      color="#9fb2be"
                      className="flex-none transition group-hover:translate-x-1 group-hover:text-[#ffb347]"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
