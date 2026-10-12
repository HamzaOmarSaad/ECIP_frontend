import Link from "next/link";
import { ArrowLeft, Location } from "iconsax-react";
import { notFound } from "next/navigation";
import { GOVERNORATES } from "../../../common/data/governorates";
import { btnSun, container, display, focus } from "../../../common/utils/sharedStyle";

export default async function GovernmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const governorate = GOVERNORATES.find((item) => item.id === id);

  if (!governorate) {
    notFound();
  }

  const regionName =
    governorate.region === "upper" ? "Upper Egypt" : "Lower Egypt";

  return (
    <main className="bg-[#f6f8f9] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[17px] leading-relaxed text-[#0a1620] antialiased">
      <section
        className="relative isolate flex min-h-[min(680px,calc(100svh-80px))] items-center overflow-hidden py-32 text-white lg:py-40"
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
          <Link
            href="/government"
            className={`inline-flex items-center gap-2 text-sm font-semibold text-[#b9ccd6] transition hover:text-white ${focus}`}
          >
            <ArrowLeft size={18} variant="Linear" color="currentColor" />
            All governorates
          </Link>

          <div className="mt-8 max-w-3xl rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#5fd0c5]/30 bg-[#5fd0c5]/10 px-4 py-2 text-sm font-semibold text-[#8ee4da]">
              <Location size={18} variant="Bulk" color="currentColor" />
              {regionName}
            </p>
            <h1
              className={`${display} mt-6 text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.08]`}
            >
              {governorate.name}
            </h1>
            <p className="mt-4 max-w-[52ch] text-lg text-[#b9ccd6]">
              Governorate details and local climate information for{" "}
              {governorate.name} will be available here.
            </p>
            <Link
              href="/"
              className={`${btnSun} mt-8 inline-flex items-center gap-2`}
            >
              Explore climate risks
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
