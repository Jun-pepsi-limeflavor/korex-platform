import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/utils/servicesData";

const FILTER_LABELS: Record<string, string> = {
  all: "All",
  cnc_machining: "Machining",
  injection_molding: "Molding",
  sheet_metal: "Fabrication",
  electronics: "Electronics",
  construction: "Construction",
};

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

      <section className="bg-[#F7F9FC] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((svc) => (
              <div
                key={svc.slug}
                className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:border-[#0066FF]/30 hover:shadow-md transition-all"
              >
                <div className="flex-1 p-6">
                  <h2 className="mb-2 text-xl font-bold text-[#1A1A2E]">{svc.name}</h2>
                  <p className="mb-4 text-sm text-[#6B7280] leading-relaxed">{svc.description}</p>

                  {/* Key specs as pills */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {svc.heroStats.slice(0, 3).map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-[#E5E7EB] px-3 py-0.5 text-xs font-medium text-[#1A1A2E]"
                      >
                        {stat.label}: <span className="text-[#0066FF] font-semibold">{stat.value}</span>
                      </span>
                    ))}
                  </div>

                  {/* Certifications */}
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

      {/* CTA */}
      <section className="bg-white py-16 border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#1A1A2E]">Not Sure Which Process Fits Your Part?</h2>
          <p className="mb-6 text-[#6B7280]">
            Submit your CAD file or drawing and your dedicated account manager will recommend the optimal process, material, and production route.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get a Free Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
