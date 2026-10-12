"use client";
import React, { useState } from "react";
import {
  Sun1,
  Drop,
  Ruler,
  Flash,
  Wind2,
  Tree,
  Global,
  Location,
  ArrowRight,
  HambergerMenu,
  CloseCircle,
  Warning2,
} from "iconsax-react";

import { display, focus, container } from "../common/utils/sharedStyle";
/* ------------------------------------------------------------------ */
/* Types & data                                                        */
/* ------------------------------------------------------------------ */

type HazardId = "heat" | "water" | "sea" | "flash" | "dust" | "farm";

type IconType = React.ComponentType<{
  size?: number | string;
  color?: string;
  variant?: "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
  className?: string;
}>;

interface Hazard {
  id: HazardId;
  name: string;
  blurb: string;
  color: string;
  Icon: IconType;
  span?: "wide";
}

const HAZARDS: Hazard[] = [
  {
    id: "heat",
    name: "Extreme heat",
    blurb:
      "More days above 40°C, hotter nights, and heat stress in dense cities.",
    color: "#ff7a45",
    Icon: Sun1,
    span: "wide",
  },
  {
    id: "water",
    name: "Water scarcity",
    blurb:
      "Growing demand and a fixed Nile share squeeze drinking and irrigation water.",
    color: "#4cc3ff",
    Icon: Drop,
  },
  {
    id: "sea",
    name: "Sea level rise",
    blurb:
      "Erosion and saltwater intrusion along the low-lying northern Delta coast.",
    color: "#2dd4bf",
    Icon: Ruler,
  },
  {
    id: "flash",
    name: "Flash floods",
    blurb:
      "Short, intense storms can flood wadis, roads, and towns in Sinai, the Red Sea, and Upper Egypt.",
    color: "#a78bfa",
    Icon: Flash,
  },
  {
    id: "dust",
    name: "Sandstorms and dust",
    blurb:
      "Spring winds and dust events affect health, travel, and air quality.",
    color: "#f5b94a",
    Icon: Wind2,
  },
  {
    id: "farm",
    name: "Farmland and salinity",
    blurb:
      "Heat and salty soil can cut yields of wheat, rice, cotton, and vegetables.",
    color: "#7ddc8c",
    Icon: Tree,
  },
];

const RESOURCES: { title: string; note: string; Icon: IconType }[] = [
  {
    title: "Staying safe in extreme heat",
    note: "Guidance for homes, workplaces, and schools",
    Icon: Sun1,
  },
  {
    title: "Saving water at home and on the farm",
    note: "Practical ways to use less",
    Icon: Drop,
  },
  {
    title: "Before a flash flood",
    note: "How to prepare and where to go",
    Icon: Flash,
  },
  {
    title: "Report a weather or climate concern",
    note: "Tell local authorities what you see",
    Icon: Warning2,
  },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const NileMap: React.FC = () => (
  <svg
    viewBox="0 0 400 360"
    width="100%"
    role="img"
    aria-label="Stylized map of the Nile flowing north and splitting into the Delta"
  >
    <defs>
      <linearGradient id="river" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#5fd0c5" />
        <stop offset="1" stopColor="#4cc3ff" />
      </linearGradient>
    </defs>
    <rect
      x="30"
      y="20"
      width="340"
      height="330"
      rx="26"
      fill="rgba(255,255,255,.04)"
    />
    <path
      d="M200 340C196 290 212 250 198 210S190 150 200 120"
      fill="none"
      stroke="url(#river)"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <path
      d="M200 120 150 70M200 120 250 70M200 120V60M150 70 120 38M250 70 280 38M175 90 205 40"
      fill="none"
      stroke="url(#river)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M70 30C150 14 250 14 330 30"
      fill="none"
      stroke="#ffb347"
      strokeWidth="3"
      strokeDasharray="2 8"
      strokeLinecap="round"
    />
    {[
      [200, 300, "Aswan"],
      [200, 235, "Luxor"],
      [196, 168, "Cairo"],
      [120, 38, "Alexandria"],
    ].map(([x, y, n]) => (
      <g key={String(n)}>
        <circle cx={Number(x)} cy={Number(y)} r="5" fill="#fff" />
        <text
          x={Number(x) + 12}
          y={Number(y) + 4}
          fill="#c8d9e2"
          fontSize="12"
          fontFamily="Inter, sans-serif"
        >
          {String(n)}
        </text>
      </g>
    ))}
  </svg>
);

const HeatChart: React.FC<{ scenario: "lower" | "higher" }> = ({
  scenario,
}) => {
  // Illustrative values only.
  const years = [1901, 2000, 2020, 2040, 2060, 2080, 2100];
  const series = {
    lower: [55, 62, 72, 78, 84, 88, 90],
    higher: [55, 62, 72, 84, 100, 122, 145],
  }[scenario];
  const W = 560,
    H = 240,
    px = 40,
    py = 26,
    max = 160;
  const x = (i: number) => px + (i * (W - px * 2)) / (years.length - 1);
  const y = (v: number) => H - py - (v / max) * (H - py * 2);
  const pts = series.map((v, i) => [x(i), y(v)]);
  const line = pts.reduce((d, [ax, ay], i) => {
    if (i === 0) return `M${ax},${ay}`;
    const [cx, cy] = pts[i - 1];
    const mx = (cx + ax) / 2;
    return `${d} C${mx},${cy} ${mx},${ay} ${ax},${ay}`;
  }, "");
  const area = `${line} L${x(years.length - 1)},${H - py} L${x(0)},${H - py} Z`;
  const c = scenario === "lower" ? "#0f9d8a" : "#ff6a3d";
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Illustrative chart of very hot days per year"
    >
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity=".32" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 40, 80, 120, 160].map((v) => (
        <g key={v}>
          <line x1={px} x2={W - px} y1={y(v)} y2={y(v)} stroke="#e5ebef" />
          <text
            x={px - 8}
            y={y(v) + 4}
            fontSize="11"
            textAnchor="end"
            fill="#5b6b77"
          >
            {v}
          </text>
        </g>
      ))}
      {years.map((yr, i) => (
        <text
          key={yr}
          x={x(i)}
          y={H - 6}
          fontSize="11"
          textAnchor="middle"
          fill="#5b6b77"
        >
          {yr}
        </text>
      ))}
      <path d={area} fill="url(#fill)" />
      <path
        d={line}
        fill="none"
        stroke={c}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="6"
        fill="#fff"
        stroke={c}
        strokeWidth="3"
      />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Home: React.FC = () => {
  const [scenario, setScenario] = useState<"lower" | "higher">("higher");

  return (
    <div className="bg-[#f6f8f9] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[17px] leading-relaxed text-[#0a1620] antialiased">
      <style>{`@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}`}</style>
      <main id="top">
        {/* Hero */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(900px 500px at 85% -10%, rgba(255,179,71,.35), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(95,208,197,.22), transparent 60%), linear-gradient(180deg, #071a22 0%, #0b2a35 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12]"
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
            className={`${container} relative grid items-center gap-10 pb-24 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-40`}
          >
            <div>
              <h1
                className={`${display} text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.08] motion-safe:[animation:rise_.8s_cubic-bezier(.2,.7,.2,1)_both]`}
              >
                Egypt&apos;s national adaptation plan
              </h1>
              <p className="mt-5 max-w-[52ch] text-[19px] text-[#b9ccd6] motion-safe:[animation:rise_.8s_.12s_cubic-bezier(.2,.7,.2,1)_both]">
                A comprehensive platform for climate, risk, and geospatial data
                analysis to support decision-making
              </p>
            </div>
          </div>
        </section>

        {/* Hazards */}
        <section id="hazards" className="py-16 sm:py-24">
          <div className={container}>
            <div className="mb-11 max-w-[640px]">
              <h2
                className={`${display} text-[clamp(30px,4vw,46px)] font-bold leading-[1.1]`}
              >
                Six hazards shape life across Egypt
              </h2>
              <p className="mt-3.5 text-lg text-[#5b6b77]">
                From the Delta coast to the Sinai mountains, each hazard hits
                different places in different ways.
              </p>
            </div>

            <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HAZARDS.map((h) => (
                <article
                  key={h.id}
                  className={[
                    "flex flex-col justify-between gap-5 overflow-hidden rounded-3xl border p-6",
                    h.span === "wide" ? "sm:col-span-2" : "",
                    h.id === "heat"
                      ? "border-[#0b2a35] bg-[#0b2a35] text-white"
                      : "border-[#e2e8ec] bg-white",
                  ].join(" ")}
                >
                  <div
                    className="grid h-13 w-13 place-items-center rounded-2xl"
                    style={{ background: `${h.color}26` }}
                  >
                    <h.Icon size={28} variant="Bulk" color={h.color} />
                  </div>
                  <div>
                    <h3 className={`${display} text-[22px] font-semibold`}>
                      {h.name}
                    </h3>
                    <p
                      className={`mt-2 text-[15.5px] ${h.id === "heat" ? "text-[#a9c0cc]" : "text-[#5b6b77]"}`}
                    >
                      {h.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Nile */}
        <section
          id="nile"
          className="relative overflow-hidden bg-[#0b2a35] py-16 text-white sm:py-24"
        >
          <div
            className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-14`}
          >
            <div>
              <h2
                className={`${display} text-[clamp(30px,4vw,46px)] font-bold leading-[1.1]`}
              >
                A country built along one river
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg text-[#b3c8d3]">
                Nearly all of Egypt&apos;s people live on about 5% of its land,
                along the Nile and across the Delta. That narrow strip faces
                rising heat, tighter water supplies, saltwater moving into
                farmland, and a Mediterranean coast being slowly lost to the
                sea.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  ["~5%", "of land is inhabited"],
                  ["1", "main water source"],
                  ["2", "coasts at risk"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    className="rounded-2xl border border-white/15 bg-white/[0.08] px-[18px] py-3.5 text-sm text-[#c8d9e2]"
                  >
                    <b className={`${display} block text-[22px] text-white`}>
                      {n}
                    </b>
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f4c5c] to-[#0b2a35] p-4">
              <NileMap />
            </div>
          </div>
        </section>

        {/* Explorer */}
        <section id="explorer" className="pb-16  py-16 sm:pb-24">
          <div
            className={`${container} grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12`}
          >
            <div>
              <h2
                className={`${display} text-[clamp(30px,4vw,46px)] font-bold leading-[1.1]`}
              >
                See how summers are changing
              </h2>
              <p className="mt-3.5 text-lg text-[#5b6b77]">
                Compare past summers with two possible futures. The gap between
                them shows how much today&apos;s choices matter.
              </p>
              <div
                role="group"
                aria-label="Emissions scenario"
                className="mt-6 inline-flex rounded-full bg-[#e7edf0] p-1"
              >
                {(["lower", "higher"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={scenario === s}
                    onClick={() => setScenario(s)}
                    className={`rounded-full px-5 py-2.5 text-[15px] font-semibold transition ${focus} ${
                      scenario === s
                        ? "bg-white text-[#0a1620] shadow"
                        : "text-[#5b6b77]"
                    }`}
                  >
                    {s === "lower" ? "Lower emissions" : "Higher emissions"}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-[#e2e8ec] bg-white p-6">
              <h3 className="text-base font-bold">Days per year above 40°C</h3>
              <small className="text-[#5b6b77]">
                Upper Egypt example · illustrative data, not real measurements
              </small>
              <HeatChart scenario={scenario} />
            </div>
          </div>
        </section>

        {/* Resources */}
        <section
          id="resources"
          className="pb-16 sm:pb-24 bg-[#0b2a35] py-16 text-white"
        >
          <div className={container}>
            <div className="mb-11 max-w-[640px]">
              <h2
                className={`${display} text-[clamp(30px,4vw,46px)] font-bold leading-[1.1]`}
              >
                Take action
              </h2>
              <p className="mt-3.5 text-lg text-[#5b6b77]">
                Practical guidance to help you and your community prepare.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {RESOURCES.map((r) => (
                <a
                  key={r.title}
                  href="#resources"
                  className={`group flex items-center justify-between gap-4 rounded-[20px] border border-[#e2e8ec] bg-white px-6 py-5 transition hover:border-[#0f4c5c] ${focus}`}
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#e6f4f2]">
                      <r.Icon size={24} variant="Bulk" color="#0f4c5c" />
                    </span>
                    <span>
                      <b className="block text-lg">{r.title}</b>
                      <span className="text-[14.5px] text-[#5b6b77]">
                        {r.note}
                      </span>
                    </span>
                  </span>
                  <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-[#f6f8f9] transition group-hover:bg-[#0f4c5c]">
                    <ArrowRight
                      size={18}
                      variant="Linear"
                      color="currentColor"
                      className="text-[#0a1620] group-hover:text-white"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
