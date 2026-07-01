# Copy Changelog — formadikor

All wording changes made to align the platform with professional B2B tone, remove unverifiable brand associations, and eliminate misleading or non-native-sounding phrases.

**Total changes: 22 instances across 6 files**

---

## Change Categories

| Tag | Description |
|-----|-------------|
| `[Brand]` | Removed unverifiable brand name associations (Samsung, LG, Hyundai/Kia) |
| `[CTA]` | Fixed misleading "Instant Quote" CTA — quotes take 24 hours |
| `[Competitor]` | Removed competitor name (Fictiv) from public-facing specs |
| `[Tone]` | Replaced casual/hyperbolic phrases with professional B2B language |
| `[Phrasing]` | Fixed awkward or non-native word choices |

---

## 1. `src/components/layout/Navbar.tsx`

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 1 | Desktop CTA button | Get Instant Quote | Get a Quote | `[CTA]` |
| 2 | Mobile CTA button | Get Instant Quote | Get a Quote | `[CTA]` |

**Reason:** Quotes are delivered within 24 business hours — not instantly. "Get Instant Quote" creates a false expectation for B2B buyers and undermines credibility when they discover the actual turnaround.

---

## 2. `src/app/(public)/page.tsx`

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 3 | Hero subtitle | Access South Korea's **elite** manufacturing network | Access South Korea's **advanced** manufacturing network | `[Tone]` |
| 4 | Hero CTA button | Get Instant Quote | Get a Quote | `[CTA]` |
| 5 | Services section heading | What Can We Make For You? | Our Manufacturing Capabilities | `[Tone]` |
| 6 | How It Works subtitle | No sourcing agents. No mystery markups. **No offshore headaches.** | No sourcing agents. No hidden markups. **Transparent offshore process.** | `[Tone]` |
| 7 | Why Korea section subtitle | Four structural advantages that **no other manufacturing region can match simultaneously**. | Four structural advantages that **make Korea a compelling manufacturing source**. | `[Tone]` |
| 8 | Value Prop 2 (Precision) | ...±0.005mm is our standard, **not our limit**. | ...±0.005mm is our standard; **tighter tolerances are available from select partner facilities**. | `[Phrasing]` |
| 9 | CTA banner heading | Ready to Source From **Korea's Best**? | Ready to Source from Korea? | `[Tone]` |
| 10 | CTA banner button | Get Instant Quote | Get a Quote | `[CTA]` |

**Reasons:**
- `[3]` "elite" reads as casual marketing copy, not B2B-appropriate. "advanced" is factual and measured.
- `[5]` "What Can We Make For You?" is informal, closer to B2C retail tone. B2B procurement decisions are made by engineers and ops leads who expect a professional voice.
- `[6]` "No offshore headaches" is dismissive — it frames overseas sourcing as inherently problematic, which may alienate buyers already running global supply chains. "Transparent offshore process" describes the actual value proposition.
- `[7]` "No other manufacturing region can match simultaneously" is an absolute claim with no third-party backing. Overstating creates skepticism in B2B buyers.
- `[8]` "not our limit" is a marketing flair that weakens credibility. The factual replacement conveys the same capability with more substance.
- `[9]` "Korea's Best" is vague and unverifiable. B2B audiences are experienced skeptics — unsubstantiated superlatives reduce trust.

---

## 3. `src/lib/utils/servicesData.ts`

| # | Service | Section | Before | After | Tag |
|---|---------|---------|--------|-------|-----|
| 11 | CNC Machining | Description | achieving tolerances that **equal or exceed** Japanese and German benchmarks | achieving tolerances **comparable to** Japanese and German standards | `[Phrasing]` |
| 12 | CNC Machining | Specs benchmark | **Fictiv** standard: ±0.005mm (premium tier) | **Industry platform** standard (premium tier) | `[Competitor]` |
| 13 | CNC Machining | Specs benchmark | **Fictiv**: 1 day (domestic USA premium) | **Domestic US expedited service**: 1–2 business days | `[Competitor]` |
| 14 | Injection Molding | Description | Korean mold makers serve **Hyundai, Samsung, and LG** supply chains | Korean mold makers supply **major automotive and consumer electronics OEM** supply chains | `[Brand]` |
| 15 | Sheet Metal | Description | Korea's sheet metal sector **feeds Hyundai/Kia, Samsung Electronics, LG**, and major defense contractors | Korea's sheet metal sector **serves leading automotive, consumer electronics, and defense** manufacturers | `[Brand]` |
| 16 | Modular Construction | Description | **now penetrating** prefab construction production lines | **increasingly applied to** prefabricated construction production lines | `[Phrasing]` |
| 17 | Electronics/PCB | Description | serve **Samsung, LG, Hyundai**, and global Tier-1 OEMs | serve **global automotive and consumer electronics** Tier-1 OEMs | `[Brand]` |

**Reasons:**
- `[11]` "equal or exceed" without third-party measurement data is an overreach. "Comparable to" communicates the same confidence with appropriate epistemic caution.
- `[12–13]` Naming a competitor (Fictiv) in public-facing spec benchmarks is atypical in enterprise software and manufacturing. It signals insecurity rather than confidence, and invites direct comparison. Genericized benchmarks ("Industry platform standard", "Domestic US expedited") convey the same positioning without the liability.
- `[14–15, 17]` Samsung, LG, Hyundai/Kia are used as implicit credential ("our partners serve these brands"). Without confirmed authorization from those brands, this creates legal and credibility risk. A prospect could ask "are you listed as an approved supplier for Samsung?" — and the answer may be no. Replacing with category descriptors ("major automotive OEMs", "consumer electronics manufacturers") conveys the same tier-level quality claim accurately.
- `[16]` "penetrating" is unusual diction in the construction industry and reads as non-native. "Increasingly applied to" is natural and accurate.

---

## 4. `src/app/(public)/industries/page.tsx`

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 18 | Medical Devices card | **ISO 13485 awareness** | **ISO 13485-aligned quality processes** | `[Phrasing]` |
| 19 | Automotive card | Korean facilities serve **Hyundai/Kia Tier-1** supply chains | Korean facilities serve **major automotive Tier-1** supply chains | `[Brand]` |
| 20 | Consumer Electronics card | **Samsung and LG supply chain quality** | **Consumer electronics-grade quality standards** | `[Brand]` |
| 21 | Bottom CTA body text | serves **Samsung, LG, Hyundai**, and global Tier-1 OEMs | serving **leading global automotive and consumer electronics** manufacturers | `[Brand]` |

**Reasons:**
- `[18]` "ISO 13485 awareness" is ambiguous and weak — medical device procurement managers know what certification means. "ISO 13485-aligned quality processes" honestly reflects capability without overclaiming a certification the facility may not hold.
- `[19–21]` Same rationale as items 14–15, 17 — brand name references in the supply chain context without verified authorization.

---

## 5. `src/components/layout/Footer.tsx`

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 22 | Brand tagline | Access South Korea's **elite** manufacturing network. | Access South Korea's **advanced** manufacturing network. | `[Tone]` |

**Reason:** Consistency with Hero section (item 3). "Elite" as a qualifier belongs in B2C or lifestyle copy — "advanced" communicates the same differentiation in B2B-appropriate language.

---

## 6. `src/app/layout.tsx` (SEO Metadata)

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 23 | meta description | Access South Korea's **elite** manufacturing network. | Access South Korea's **advanced** manufacturing network. | `[Tone]` |

**Reason:** The `<meta description>` tag is the first text many prospects see in search results. Consistency with the Hero and Footer copy — "elite" → "advanced".

---

## 7. `src/app/(public)/how-it-works/page.tsx`

| # | Section | Before | After | Tag |
|---|---------|--------|-------|-----|
| 24 | Bottom CTA button | Get Instant Quote | Get a Quote | `[CTA]` |

**Reason:** Same as items 1, 2, 4, 10.

---

## Summary by Category

| Category | Count |
|----------|-------|
| `[Brand]` — Samsung/LG/Hyundai removed | 7 |
| `[CTA]` — "Instant Quote" corrected | 5 |
| `[Competitor]` — Fictiv removed from specs | 2 |
| `[Tone]` — Casual/hyperbolic phrasing tightened | 6 |
| `[Phrasing]` — Awkward word choices corrected | 3 |
| **Total** | **23** |
