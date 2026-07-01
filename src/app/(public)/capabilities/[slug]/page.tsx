import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getServiceBySlug, SERVICES_DATA } from "@/lib/utils/servicesData";

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0A1628] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/capabilities"
            className="mb-6 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            ← All Capabilities
          </Link>
          <h1 className="mb-3 text-4xl font-bold">{svc.name}</h1>
          <p className="mb-8 text-lg text-gray-300 max-w-2xl">{svc.tagline}</p>

          {/* Hero stats bar */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {svc.heroStats.map((stat) => (
              <div key={stat.label} className="rounded-sm bg-white/5 border border-white/10 p-4">
                <div className="spec-value text-xl font-bold text-[#0066FF]">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* What We Offer */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-[#1A1A2E]">What We Offer</h2>
              <div className="overflow-hidden rounded-sm border border-[#E5E7EB]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F7F9FC] border-b border-[#E5E7EB]">
                      <th className="px-4 py-3 text-left font-semibold text-[#1A1A2E] w-1/3">Technology</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#1A1A2E]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {svc.technologies.map((tech) => (
                      <tr key={tech.name} className="hover:bg-[#F9FAFB]">
                        <td className="px-4 py-3 font-medium text-[#1A1A2E]">{tech.name}</td>
                        <td className="px-4 py-3 text-[#6B7280]">{tech.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-[#1A1A2E]">Performance Specifications</h2>
              <div className="overflow-hidden rounded-sm border border-[#E5E7EB]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F7F9FC] border-b border-[#E5E7EB]">
                      <th className="px-4 py-3 text-left font-semibold text-[#1A1A2E] w-1/3">Metric</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#1A1A2E] w-1/3">Specification</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#1A1A2E]">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {svc.specs.map((spec) => (
                      <tr key={spec.metric} className="hover:bg-[#F9FAFB]">
                        <td className="px-4 py-3 font-medium text-[#1A1A2E]">{spec.metric}</td>
                        <td className="px-4 py-3 spec-value text-sm font-semibold text-[#0066FF]">{spec.value}</td>
                        <td className="px-4 py-3 text-xs text-[#6B7280]">{spec.benchmark ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Materials */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-[#1A1A2E]">Materials & Finishes</h2>
              <div className="flex flex-wrap gap-2">
                {svc.materials.map((mat) => (
                  <span
                    key={mat}
                    className="rounded-sm border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#1A1A2E]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </section>

            {/* DFM Guidelines */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-[#1A1A2E]">Design Guidelines</h2>
              <div className="rounded-sm border border-[#E5E7EB] bg-[#F7F9FC] p-6">
                <ul className="space-y-3">
                  {svc.dfmGuidelines.map((guideline, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A2E]">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Industries */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-[#1A1A2E]">Industries Served</h2>
              <div className="flex flex-wrap gap-2">
                {svc.industries.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-sm bg-blue-50 px-3 py-1.5 text-sm font-medium text-[#0066FF]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-[#1A1A2E]">Quality & Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {svc.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-sm border border-[#E5E7EB] bg-white px-3 py-1 text-sm text-[#1A1A2E]"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-sm border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-[#1A1A2E]">Get a Quote</h3>
              <p className="mb-4 text-sm text-[#6B7280]">
                Fixed price quote delivered within 24 business hours. DFM feedback included.
              </p>

              {svc.costNote && (
                <div className="mb-4 rounded-sm bg-green-50 border border-green-100 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-800">Cost Advantage</p>
                  <p className="text-xs text-green-700 mt-0.5">{svc.costNote}</p>
                </div>
              )}

              <Link
                href="/signup"
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-sm bg-[#0066FF] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Start Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-sm border border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#1A1A2E] hover:bg-[#F7F9FC]"
              >
                Talk to an Expert
              </Link>

              <hr className="my-4 border-[#E5E7EB]" />

              <div className="space-y-2 text-xs text-[#6B7280]">
                <p>✓ Response within 24 business hours</p>
                <p>✓ DFM review included at no charge</p>
                <p>✓ Files encrypted at rest (AES-256)</p>
                <p>✓ NDA available upon request</p>
                <p>✓ KORUS FTA — 0% import duty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
