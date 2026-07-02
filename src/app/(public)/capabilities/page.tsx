import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/utils/servicesData";

export default function CapabilitiesPage() {
  return (
    <>
      <section className="bg-[#0A1628] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-medium text-blue-400 uppercase tracking-wider">Our Capabilities</p>
          <h1 className="mb-4 text-4xl font-bold">6 Manufacturing Disciplines.</h1>
          <p className="text-lg text-gray-300">
            From single precision components to complete assemblies — all from Korea&apos;s vetted manufacturing network, all managed through formadikor.
          </p>
        </div>
      </section>

      {/* ── FROM OUR PRODUCTION FLOOR ────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <p className="mb-2 text-sm font-medium text-[#0066FF] uppercase tracking-wider">Customer Projects</p>
          <h2 className="mb-3 text-3xl font-bold text-[#1A1A2E]">From Our Production Floor</h2>
          <p className="text-[#6B7280] max-w-2xl">
            Real projects. Real tolerances. Real customers. Each order managed by a dedicated Korean account team.
          </p>
        </div>

        {/* Featured Case 1 — Partner_01 / Injection Molding */}
        <div className="border-t border-[#E5E7EB]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="relative lg:col-span-3 min-h-[400px]">
              <Image
                src="/Partner_01.webp"
                alt="Production injection mold tooling at Korean partner facility"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center p-10 bg-white">
              <span className="mb-4 self-start rounded-sm border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#0066FF] uppercase tracking-wider">
                Injection Molding
              </span>
              <h3 className="mb-5 text-2xl font-bold text-[#1A1A2E] leading-snug">
                Production Injection Mold Tooling — 50K Units
              </h3>
              <blockquote className="mb-6 border-l-2 border-[#0066FF] pl-4 text-base italic text-[#1A1A2E] leading-relaxed">
                &ldquo;Tool turnaround in 3 weeks versus 6 domestically. Part quality on first shots matched our US toolmaker&apos;s standards.&rdquo;
              </blockquote>
              <div className="mb-6">
                <p className="font-semibold text-[#1A1A2E]">David Chen</p>
                <p className="text-sm text-[#6B7280]">VP of Operations, Torque Robotics</p>
              </div>
              <div className="inline-flex self-start items-center rounded-sm bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                3-week tool delivery
              </div>
            </div>
          </div>
        </div>

        {/* Featured Case 2 — Partner_02 / CNC Machining (reversed) */}
        <div className="border-t border-[#E5E7EB] bg-[#F7F9FC]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 flex flex-col justify-center p-10 order-2 lg:order-1">
              <span className="mb-4 self-start rounded-sm border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#0066FF] uppercase tracking-wider">
                CNC Machining
              </span>
              <h3 className="mb-5 text-2xl font-bold text-[#1A1A2E] leading-snug">
                5-Axis Aluminum Robotics Housing
              </h3>
              <blockquote className="mb-6 border-l-2 border-[#0066FF] pl-4 text-base italic text-[#1A1A2E] leading-relaxed">
                &ldquo;Lead time from RFQ to first articles was 11 days. The DFM feedback caught two issues before we cut steel — saved us a full rework cycle.&rdquo;
              </blockquote>
              <div className="mb-6">
                <p className="font-semibold text-[#1A1A2E]">Sarah Mitchell</p>
                <p className="text-sm text-[#6B7280]">Mechanical Engineering Lead, Aria Systems</p>
              </div>
              <div className="inline-flex self-start items-center rounded-sm bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                11-day first article
              </div>
            </div>
            <div className="relative lg:col-span-3 min-h-[400px] order-1 lg:order-2">
              <Image
                src="/Partner_02.webp"
                alt="5-axis CNC machined aluminum component at Korean partner facility"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((svc) => (
              <div
                key={svc.slug}
                className="group flex flex-col rounded-sm border border-[#E5E7EB] bg-white shadow-sm hover:border-[#0066FF]/30 hover:shadow-md transition-all"
              >
                <div className="flex-1 p-6">
                  <h2 className="mb-2 text-xl font-bold text-[#1A1A2E]">{svc.name}</h2>
                  <p className="mb-4 text-sm text-[#6B7280] leading-relaxed">{svc.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {svc.heroStats.slice(0, 3).map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-sm border border-[#E5E7EB] px-3 py-0.5 text-xs font-medium text-[#1A1A2E]"
                      >
                        {stat.label}: <span className="text-[#0066FF] font-semibold">{stat.value}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {svc.certifications.slice(0, 2).map((cert) => (
                      <span
                        key={cert}
                        className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs text-[#6B7280]"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] p-4">
                  <Link
                    href={`/capabilities/${svc.slug}`}
                    className="flex items-center justify-between text-sm font-semibold text-[#0066FF] group-hover:gap-2 transition-all"
                  >
                    Explore Capabilities
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#1A1A2E]">Not Sure Which Process Fits Your Part?</h2>
          <p className="mb-6 text-[#6B7280]">
            Submit your CAD file or drawing and your dedicated account manager will recommend the optimal process, material, and production route.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-sm bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get a Free Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
