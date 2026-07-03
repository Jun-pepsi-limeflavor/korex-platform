import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const OUTCOMES = [
  { label: "Reject rate", value: "0.9%" },
  { label: "Landed cost", value: "−22%" },
  { label: "Import duty", value: "0% (KORUS FTA)" },
  { label: "RFQ to first articles", value: "14 days" },
];

const COMPARISON_ROWS = [
  { metric: "Reject rate", before: "~8.0%", after: "0.9% (↓ 89%)" },
  { metric: "Import duty", before: "25% (Section 301)", after: "0% (KORUS FTA)" },
  { metric: "Landed unit cost", before: "baseline", after: "−22%" },
  { metric: "Tool + design files", before: "Held by supplier", after: "Owned by Northwind" },
  { metric: "Point of contact", before: "Broker email chain", after: "One account manager" },
  { metric: "Color consistency (lot-to-lot)", before: "Visible drift", after: "Within spec, all lots" },
];

export function NorthwindCaseStudy() {
  return (
    <section className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E5E7EB] py-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#0066FF]">
            Case Study · Consumer Electronics
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#1A1A2E] lg:text-4xl">
            The reject rate that almost killed a launch — and the supply chain that fixed it.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#6B7280]">
            A US consumer-electronics brand had a great product and a supplier problem: a China-sourced enclosure line running an 8% reject rate, a tooling file it couldn&apos;t get back, and a tariff bill that grew every quarter. Here&apos;s how the program moved to Korea in six weeks.
          </p>
          <p className="mt-3 text-sm italic text-[#6B7280]">Written by the forma di kor team</p>
        </div>

        <div className="grid grid-cols-2 gap-px border-b border-[#E5E7EB] bg-[#E5E7EB] lg:grid-cols-4">
          {OUTCOMES.map((item) => (
            <div key={item.label} className="bg-white px-5 py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">{item.label}</p>
              <p className="spec-value mt-1 text-xl font-bold text-[#0066FF]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-sm border border-[#E5E7EB]">
          <Image
            src="/Partner_01.webp"
            alt="Injection-molded enclosure production at Korean partner facility"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        <article className="pb-16">
          <p className="mb-10 text-base leading-relaxed text-[#1A1A2E]">
            The email that started it wasn&apos;t dramatic. It was a photo of a scuffed plastic housing, a cracked boss, and one line from a frustrated quality manager: <em>&ldquo;This is the third lot this quarter. We can&apos;t ship these.&rdquo;</em>
          </p>
          <p className="mb-10 text-base leading-relaxed text-[#1A1A2E]">
            The company — call them <strong>Northwind Acoustics</strong>, a mid-sized US consumer-electronics brand shipping premium wireless speakers — had built a good business on a product people loved. What they hadn&apos;t built was a supply chain they could trust. Their enclosure program lived with a single contract manufacturer in Guangdong, chosen years earlier for one reason: it was cheap.
          </p>
          <p className="mb-12 text-base leading-relaxed text-[#1A1A2E]">
            By early 2026, &ldquo;cheap&rdquo; had quietly stopped being true, and it had never been the whole story.
          </p>

          <CaseSection
            number="01"
            title="The three problems hiding inside one supplier"
            lead="When Northwind's procurement lead sat down to actually audit the relationship, the enclosure program had three failures stacked on top of each other — and each one was the kind that ends careers, not just quarters."
          >
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 font-semibold text-[#1A1A2E]">Quality drift.</h4>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  The reject rate on the injection-molded enclosures had climbed to roughly 8%. Sink marks, flash on the parting line, and inconsistent color between lots. Every rejected unit was scrap, rework, or worse — a return from a customer who&apos;d paid a premium price for a product that looked cheap. Incoming inspection had gone from a formality to a full-time headache.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-[#1A1A2E]">An IP gap they couldn&apos;t close.</h4>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  The tooling had been paid for by Northwind, but the tool itself — and, more importantly, the current tool design files — sat on the supplier&apos;s floor. There was no clean, documented handoff. Trying to dual-source meant either starting tooling from scratch or asking a competitor&apos;s neighbor to copy a competitor&apos;s tool. Northwind&apos;s CTO put it bluntly in a planning meeting: they didn&apos;t own their own product&apos;s most important part.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-[#1A1A2E]">Tariff exposure that only moved one direction.</h4>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  Section 301 duties had added 25% to the landed cost of the China-sourced housings, and every trade-policy headline threatened to add more. Procurement couldn&apos;t forecast landed cost more than a quarter out, which meant finance couldn&apos;t forecast margin. In a consumer category where retail price is fixed by the shelf next to you, an unpredictable input cost is an existential problem.
                </p>
              </div>
            </div>
            <blockquote className="mt-8 border-l-2 border-[#0066FF] bg-[#F7F9FC] px-5 py-4">
              <p className="text-sm font-semibold text-[#1A1A2E]">Why this pattern is so common.</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                None of these problems were unusual. They&apos;re the default failure mode of a supply chain that was optimized for unit price and nothing else. Quality, IP control, and geopolitical exposure don&apos;t show up on the first PO — they show up eighteen months later, all at once.
              </p>
            </blockquote>
          </CaseSection>

          <CaseSection
            number="02"
            title="What Northwind actually needed (and it wasn't &quot;a cheaper factory&quot;)"
            lead="Northwind's procurement team had been down the &quot;find another low-cost supplier&quot; road before. It solves the price line on a spreadsheet and recreates every other problem within a year. This time they wrote down what they actually needed, in order:"
          >
            <ul className="space-y-3 text-sm leading-relaxed text-[#6B7280]">
              <li>
                A region where <strong className="text-[#1A1A2E]">precision was the baseline, not the upsell.</strong>
              </li>
              <li>
                A supply relationship where the <strong className="text-[#1A1A2E]">tooling and its documentation belonged to them.</strong>
              </li>
              <li>
                A landed cost they could <strong className="text-[#1A1A2E]">forecast without watching trade policy.</strong>
              </li>
              <li>
                And — the part most sourcing conversations skip — <strong className="text-[#1A1A2E]">a single accountable person</strong> instead of a time-zone-lagged email chain routed through a broker taking an invisible cut.
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-[#6B7280]">
              That list is why they looked at Korea, and it&apos;s why they called us.
            </p>
            <blockquote className="mt-8 border-l-2 border-[#0066FF] px-5 py-1">
              <p className="text-base italic leading-relaxed text-[#1A1A2E]">
                &ldquo;We weren&apos;t trying to save fifteen cents a unit. We were trying to stop losing sleep. The fact that Korea also came out cheaper landed was almost the least interesting part.&rdquo;
              </p>
              <footer className="mt-3 text-xs text-[#6B7280]">
                — Procurement Lead, Northwind Acoustics (illustrative)
              </footer>
            </blockquote>
          </CaseSection>

          <CaseSection
            number="03"
            title="Six weeks, start to first articles"
            lead="Here's how the transition actually ran through the forma di kor platform. No sourcing agent flew to Seoul. No one learned to negotiate in a second language."
          >
            <div className="space-y-6">
              <TimelineBlock
                label="Days 1–3 — Upload and DFM."
                body="Northwind's engineer uploaded the existing STEP files and the 2D drawings they did have. Their dedicated account manager returned a Design-for-Manufacturability review that flagged two root causes of the sink-mark problem: a wall-thickness transition that was too abrupt for consistent packing, and a gate location fighting the flow front. Neither had ever been raised by the previous supplier. Both were fixable in the tool design."
              />
              <TimelineBlock
                label="Days 4–10 — Quote, tool ownership, and matching."
                body="The program was matched to an IATF 16949–certified Korean molder inside our partner network — the same precision base that supplies Korea's automotive and electronics tiers. The quote was fixed, itemized, and came with a guaranteed lead time. Critically, the tooling agreement was written so Northwind owned the tool and received the full, documented tool design package. The IP gap closed on paper before a single part was cut."
              />
              <TimelineBlock
                label="Days 11–24 — Tooling and first articles."
                body="New production tooling was cut with the corrected geometry. First articles shipped Incheon-to-LAX by air in about a day of transit, arriving 14 days after the RFQ was approved. Incoming inspection measured what the DFM review had promised."
              />
            </div>

            <div className="mt-10 overflow-hidden rounded-sm border border-[#E5E7EB]">
              <p className="border-b border-[#E5E7EB] bg-[#F7F9FC] px-4 py-3 text-sm font-semibold text-[#1A1A2E]">
                Enclosure program · before vs. after (illustrative figures)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-white">
                      <th className="px-4 py-3 font-semibold text-[#1A1A2E]">Metric</th>
                      <th className="px-4 py-3 font-semibold text-[#6B7280]">China supplier</th>
                      <th className="px-4 py-3 font-semibold text-[#0066FF]">Korea (forma di kor)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.metric} className="border-b border-[#E5E7EB] last:border-0">
                        <td className="px-4 py-3 font-medium text-[#1A1A2E]">{row.metric}</td>
                        <td className="px-4 py-3 text-[#6B7280]">{row.before}</td>
                        <td className="px-4 py-3 font-medium text-[#1A1A2E]">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CaseSection>

          <CaseSection
            number="04"
            title="What a buyer should take from this"
          >
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Northwind is a composite, but the mechanics are not. If your overseas program has quietly accumulated the same three problems — quality you inspect around instead of trust, tooling you don&apos;t really control, and a landed cost you can&apos;t forecast — the fix isn&apos;t a cheaper version of the same risk.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
              Korea gives a US buyer a rare combination in one place: automotive-grade precision as the standard, tariff-free access under KORUS FTA, tool ownership written into the agreement, and a single account manager who answers for the whole program. You upload a file. You get a DFM review, a fixed quote, and a guaranteed lead time — typically inside 24 hours. No sourcing agents. No mystery markups. No offshore headaches.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
              That&apos;s not a story about one company. It&apos;s the default outcome when the supply chain is built for something other than the lowest sticker price.
            </p>
          </CaseSection>

          <div className="mt-12 border-t border-[#E5E7EB] pt-10">
            <h3 className="mb-3 text-xl font-bold text-[#1A1A2E]">
              Your overseas program has a reject rate too.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[#6B7280]">
              Most buyers don&apos;t find out what their supply chain is really costing them until a lot gets rejected or a tariff moves. Send us a file and see the Korean number.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Get an Instant Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#1A1A2E] hover:border-[#0066FF]/30"
              >
                Talk to an Account Manager
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="mt-16 border-t border-[#E5E7EB] pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Note — Illustrative Scenario
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-[#9CA3AF]">
              The following is an illustrative scenario created to demonstrate forma di kor&apos;s manufacturing capabilities and real operating processes. The company name (Northwind Acoustics) and personnel are a composite example, not a specific customer, and do not refer to any real company or individual. The manufacturing capabilities, workflow (file upload → DFM review → quote → tooling → first-article delivery), certification standards, KORUS FTA duty treatment, and logistics lead times described here reflect forma di kor&apos;s actual operations. Figures cited in the scenario (reject rates, cost savings, etc.) are representative examples based on typical program requirements. Real customer references are available on request under NDA.
            </p>
          </aside>
        </article>
      </div>
    </section>
  );
}

function CaseSection({
  number,
  title,
  lead,
  children,
}: {
  number: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-14 border-t border-[#E5E7EB] pt-10">
      <p className="spec-value mb-2 text-xs font-bold uppercase tracking-widest text-[#0066FF]">
        {number}
      </p>
      <h3 className="mb-4 text-2xl font-bold text-[#1A1A2E]">{title}</h3>
      {lead && (
        <p className="mb-6 text-sm leading-relaxed text-[#6B7280]">{lead}</p>
      )}
      {children}
    </section>
  );
}

function TimelineBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-l-2 border-[#E5E7EB] pl-4">
      <p className="mb-1 text-sm font-semibold text-[#1A1A2E]">{label}</p>
      <p className="text-sm leading-relaxed text-[#6B7280]">{body}</p>
    </div>
  );
}
