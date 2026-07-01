import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Industry {
  name: string;
  image: string;
  description: string;
  services: string[];
  highlight: string;
}

const INDUSTRIES: Industry[] = [
  {
    name: "Aerospace & Defense",
    image: "/i_aeorospace.jpg",
    description: "AS9100D certified partner network. Titanium, Inconel, and aluminum structural components. ITAR-compliant supply chain.",
    services: ["CNC Machining", "Sheet Metal", "Die Casting"],
    highlight: "AS9100D Certified",
  },
  {
    name: "Medical Devices",
    image: "/i_medical.jpg",
    description: "ISO 13485-aligned quality processes. PEEK, titanium, and stainless steel precision components. IPC Class 3 PCB assembly for FDA-regulated products.",
    services: ["CNC Machining", "Electronics / PCB", "Injection Molding"],
    highlight: "IPC Class 3 · Medical-grade materials",
  },
  {
    name: "Automotive",
    image: "/i_car.png",
    description: "IATF 16949 certified die casting and injection molding. Korean facilities serve major automotive Tier-1 supply chains — production-grade from day one.",
    services: ["Die Casting", "Injection Molding", "Sheet Metal"],
    highlight: "IATF 16949 Certified",
  },
  {
    name: "Robotics & Industrial",
    image: "/i_robot.jpg",
    description: "5-axis CNC for complex actuator housings and structural frames. Precision tolerances for servo mounts and linear rail interfaces.",
    services: ["CNC Machining", "Sheet Metal", "Die Casting"],
    highlight: "±0.005mm Standard Tolerance",
  },
  {
    name: "Consumer Electronics",
    image: "/i_custom.jpg",
    description: "Consumer electronics-grade quality standards. HPDC aluminum enclosures, injection-molded housings, SMT PCB assembly at scale.",
    services: ["Die Casting", "Injection Molding", "Electronics / PCB"],
    highlight: "Consumer Electronics Grade",
  },
  {
    name: "Hardware Startups",
    image: "/i_Hardware_startup.png",
    description: "Prototype-to-production in one relationship. No sourcing agents required. Account manager guides material selection, DFM, and production ramp.",
    services: ["CNC Machining", "Injection Molding", "Electronics / PCB"],
    highlight: "1-pc MOQ · 3-day quick turn",
  },
  {
    name: "Industrial Equipment",
    image: "/i_Industrial Equipment.jpg",
    description: "Structural weldments, machined housings, stamped brackets. AWS D1.1 and ASME Section IX certified welding. Volume production programs.",
    services: ["Sheet Metal", "CNC Machining", "Die Casting"],
    highlight: "AWS D1.1 Certified Welding",
  },
  {
    name: "Construction & AEC",
    image: "/i_Construction_AEC.jpg",
    description: "Factory-built modular components for multifamily, commercial, and data center projects. 25–35% below US fabrication cost with ±2mm structural tolerance.",
    services: ["Modular Construction Components"],
    highlight: "ASTM A36/A572 · AWS D1.1 Seismic",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-[#0A1628] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-bold">Industries Served</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Korean manufacturing quality reaches every sector. Same precision infrastructure — applied to your industry&apos;s specific standards and requirements.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="overflow-hidden rounded-sm border border-[#E5E7EB] bg-white hover:shadow-sm hover:border-[#0066FF]/20 transition-all"
              >
                <div className="relative aspect-[5/3] w-full">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="p-5">
                  <h2 className="mb-2 font-bold text-[#1A1A2E]">{ind.name}</h2>
                  <p className="mb-3 text-sm text-[#6B7280] leading-relaxed">{ind.description}</p>
                  <div className="mb-3">
                    <span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-[#0066FF]">
                      {ind.highlight}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ind.services.map((s) => (
                      <span key={s} className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs text-[#6B7280]">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#1A1A2E]">Your Industry. Korean Standards.</h2>
          <p className="mb-8 text-[#6B7280]">
            Korea&apos;s manufacturing sector is the most robotized in the world, serving leading global automotive and consumer electronics manufacturers. Every component produced through formadikor benefits from that industrial baseline — whatever your sector.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-sm bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get a Quote for Your Industry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
