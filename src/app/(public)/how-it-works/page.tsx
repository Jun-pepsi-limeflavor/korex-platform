import Link from "next/link";
import { ArrowRight, Upload, MessageSquare, Package, CheckCircle } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Upload & Configure",
    description: "Upload your CAD file or drawing. Select manufacturing process, material, finish, quantity, and target delivery date. Our system generates a preliminary assessment within minutes.",
    details: [
      "STEP, STP, IGES, DXF, DWG, STL, PDF, ZIP — up to 500MB",
      "Files encrypted at rest (AES-256) and in transit",
      "No CAD file? Describe requirements in text; manager advises",
      "Multi-process projects handled in a single quote submission",
    ],
  },
  {
    num: "02",
    icon: MessageSquare,
    title: "Quote & Review",
    description: "Your dedicated account manager reviews DFM (Design for Manufacturability), confirms specifications, and delivers a fixed price quote with guaranteed lead time — typically within 24 hours.",
    details: [
      "DFM feedback identifies potential issues before manufacturing",
      "Fixed price — no surprise invoices",
      "Guaranteed lead time from quote acceptance",
      "Request revisions or alternative materials/processes",
    ],
  },
  {
    num: "03",
    icon: Package,
    title: "Manufacture & Deliver",
    description: "Parts are produced at our vetted Korean partner facilities, inspected to spec, and shipped directly to your facility. Track every step in your dashboard.",
    details: [
      "ISO/AS9100/IATF 16949 certified Korean partner facilities",
      "In-process and final QC inspection per your requirements",
      "Incheon → LAX in 24h (air); 12–15 days sea freight",
      "KORUS FTA — 0% import duty on most manufactured goods",
    ],
  },
];

const FAQS = [
  {
    q: "What file formats do you accept?",
    a: "STEP, STP, IGES, IGS, DXF, DWG, STL, OBJ, 3MF, PDF, ZIP. Maximum 500 MB per file, 2 GB per quote. No CAD file? We can work from drawings or a detailed description.",
  },
  {
    q: "How long does it take to get a quote?",
    a: "Your dedicated account manager delivers a formal quote within 24 business hours of receiving your files and specifications. For complex multi-part assemblies, we may request a 30-minute clarification call.",
  },
  {
    q: "Are there import duties on Korean parts?",
    a: "Under the Korea-US Free Trade Agreement (KORUS FTA), the majority of manufactured goods — including CNC parts, sheet metal, and electronics — enter the United States at 0% import duty. This is a significant advantage over Chinese-sourced components, which face 25%+ tariffs.",
  },
  {
    q: "What quality documentation can you provide?",
    a: "We can provide Certificate of Conformance (CoC), First Article Inspection (FAI) reports, Material Test Reports (MTR), and PPAP documentation on request. Specify during the quote request.",
  },
  {
    q: "What's the minimum order quantity?",
    a: "MOQ varies by process: CNC Machining — 1 piece; Sheet Metal — 1 piece; Injection Molding — 100 pieces (prototype tooling); HPDC Die Casting — 500 pieces; PCB Assembly — 1 piece.",
  },
  {
    q: "How is my IP protected?",
    a: "All uploaded files are encrypted at rest (AES-256). NDAs are available upon request — just email hello@korex.io before submitting files. We operate under strict confidentiality agreements with all partner facilities.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-[#0A1628] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-4xl font-bold">How KOREX Works</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            From file upload to finished parts — a transparent, account-manager-driven process designed for North American buyers.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    {i < STEPS.length - 1 && <div className="mt-4 flex-1 w-px bg-[#E5E7EB]" style={{ minHeight: 80 }} />}
                  </div>
                  <div className="pb-8">
                    <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[#0066FF]">Step {step.num}</div>
                    <h2 className="mb-3 text-2xl font-bold text-[#1A1A2E]">{step.title}</h2>
                    <p className="mb-4 text-[#6B7280] leading-relaxed">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#1A1A2E]">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1A1A2E]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                <h3 className="mb-2 font-semibold text-[#1A1A2E]">{faq.q}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0066FF] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-bold">Ready to Start?</h2>
          <p className="mb-6 text-blue-100">Create a free account and submit your first quote in under 5 minutes.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-3 text-base font-semibold text-[#0066FF] hover:bg-blue-50"
          >
            Get Instant Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
