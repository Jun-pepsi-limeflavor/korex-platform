import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/utils/servicesData";

interface CustomerCase {
  title: string;
  service: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const CUSTOMER_CASES: CustomerCase[] = [
  {
    title: "5-Axis Aluminum Robotics Housing",
    service: "CNC Machining",
    image: "/8.png",
    quote: "Lead time from RFQ to first articles was 11 days. The DFM feedback caught two issues before we cut steel — saved us a full rework cycle.",
    author: "Sarah Mitchell",
    role: "Mechanical Engineering Lead",
    company: "Aria Systems",
  },
  {
    title: "Production Injection Mold Tooling — 50K Units",
    service: "Injection Molding",
    image: "/8.png",
    quote: "Tool turnaround in 3 weeks versus 6 domestically. Part quality on first shots matched our US toolmaker's standards.",
    author: "David Chen",
    role: "VP of Operations",
    company: "Torque Robotics",
  },
  {
    title: "Stainless Steel Enclosure — Laser Cut & Welded",
    service: "Sheet Metal Fabrication",
    image: "/8.png",
    quote: "We consolidated three US vendors into one Korean program. Weld quality passed AWS D1.1 inspection on first submission.",
    author: "Michael Torres",
    role: "Manufacturing Director",
    company: "Gridline Industrial",
  },
  {
    title: "HPDC Aluminum Heat Sink — Automotive Grade",
    service: "Die Casting",
    image: "/8.png",
    quote: "IATF 16949 documentation was complete from day one. Casting porosity rates were lower than our previous China supplier.",
    author: "Lisa Nakamura",
    role: "Supply Chain Manager",
    company: "VoltDrive Motors",
  },
  {
    title: "IPC Class 3 PCB Assembly — 12-Layer Board",
    service: "Electronics / PCB",
    image: "/8.png",
    quote: "Quick-turn prototype in 3 days, production ramp in 4 weeks. AOI and X-ray reports included with every lot.",
    author: "James Park",
    role: "Co-Founder & CTO",
    company: "Lumen Hardware",
  },
  {
    title: "Modular Steel Frame — Data Center Pod",
    service: "Modular Construction",
    image: "/8.png",
    quote: "Structural tolerance held at ±2mm across 40 modules. 28% below our US fabrication quote with faster site delivery.",
    author: "Robert Kim",
    role: "Project Director",
    company: "Summit AEC Group",
  }
];

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

      <section className="bg-white py-16 border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="mb-2 text-3xl font-bold text-[#1A1A2E]">Customer Project Gallery</h2>
            <p className="text-[#6B7280] max-w-2xl">
              Real work commissioned through formadikor — from prototype to production. Each project managed by a dedicated account team.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CUSTOMER_CASES.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-sm border border-[#E5E7EB] bg-white"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-bold text-[#1A1A2E] leading-snug">{item.title}</h3>
                    <span className="shrink-0 rounded-sm border border-[#E5E7EB] px-2 py-0.5 text-xs font-medium text-[#0066FF]">
                      {item.service}
                    </span>
                  </div>
                  <p className="mb-4 border-t border-[#E5E7EB] pt-4 text-sm italic text-[#1A1A2E] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-sm font-medium text-[#1A1A2E]">{item.author}</p>
                  <p className="text-xs text-[#6B7280]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </article>
            ))}
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
