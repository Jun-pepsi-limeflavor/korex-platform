export interface ServiceSpec {
  metric: string;
  value: string;
  benchmark?: string;
}

export interface ServiceTechnology {
  name: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  process: string;
  tagline: string;
  heroStats: { label: string; value: string }[];
  description: string;
  technologies: ServiceTechnology[];
  specs: ServiceSpec[];
  materials: string[];
  certifications: string[];
  dfmGuidelines: string[];
  industries: string[];
  costNote?: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "cnc-machining",
    name: "CNC Machining",
    process: "cnc_machining",
    tagline: "±0.005mm Tolerances. 3-Day Lead Times. Korean Precision.",
    heroStats: [
      { label: "Min Lead Time", value: "3 Days" },
      { label: "Standard Tolerance", value: "±0.01mm" },
      { label: "Precision Tolerance", value: "±0.005mm" },
      { label: "Materials", value: "50+" },
    ],
    description:
      "Korean CNC shops routinely operate Doosan (±0.0005\" capability), Hwacheon, and Hyundai WIA equipment, achieving tolerances comparable to Japanese and German standards at 30–40% lower cost at current KRW/USD rates.",
    technologies: [
      { name: "CNC Milling", description: "3-axis, 4-axis, 5-axis simultaneous; vertical & horizontal machining centers" },
      { name: "CNC Turning", description: "Live tooling turning centers; Swiss-type CNC for small precision components" },
      { name: "EDM (Wire & Sinker)", description: "Wire EDM for complex 2D profiles; sinker EDM for deep cavities and mold work" },
      { name: "Gear Hobbing", description: "Precision involute gear production; spur, helical, and worm gear capability" },
      { name: "Surface Grinding", description: "Precision flatness to Ra 0.2μm surface finish" },
    ],
    specs: [
      { metric: "Standard Tolerance", value: "±0.01 mm (±0.0004\")", benchmark: "Industry platform standard (premium tier)" },
      { metric: "Precision Tolerance", value: "±0.005 mm (±0.0002\")", benchmark: "Equivalent to Japanese tier-1 suppliers" },
      { metric: "Ultra-Precision", value: "±0.002 mm (±0.00008\")", benchmark: "Available from select partner shops" },
      { metric: "Min Lead Time", value: "3 business days", benchmark: "Domestic US expedited service: 1–2 business days" },
      { metric: "Standard Lead Time", value: "7–14 business days", benchmark: "Industry average Asia: 10–21 days" },
      { metric: "Max Part Size", value: "1,500 × 800 × 600 mm", },
      { metric: "Min Feature Size", value: "0.3 mm" },
      { metric: "Surface Finish", value: "Ra 0.4μm to Ra 6.3μm (and custom)" },
    ],
    materials: [
      "Aluminium (6061, 7075, 5052)", "Stainless Steel (304, 316, 17-4PH)",
      "Carbon Steel", "Tool Steel", "Titanium (Grade 5)", "Inconel 625/718",
      "Copper / Brass", "PEEK", "Delrin (POM)", "Nylon", "UHMWPE",
    ],
    certifications: ["ISO 9001:2015", "ISO 14001", "IATF 16949", "AS9100D (select partners)"],
    dfmGuidelines: [
      "Avoid deep narrow slots — aim for depth:width ratio ≤ 4:1",
      "Design threads to standard size; custom threads increase lead time",
      "Add at least 0.5mm radius to internal corners where possible",
      "Specify only required tolerances — over-tolerancing increases cost",
      "Indicate surface finish requirements on drawing; as-machined is default",
    ],
    industries: ["Aerospace", "Medical Devices", "Automotive", "Robotics", "Defense", "Semiconductor Equipment"],
    costNote: "25–40% below US domestic equivalent at KRW 1,550",
  },
  {
    slug: "injection-molding",
    name: "Injection Molding",
    process: "injection_molding",
    tagline: "3-Week Prototype Tooling. Automotive-Grade Quality. KORUS FTA Pricing.",
    heroStats: [
      { label: "Prototype Tooling", value: "3–4 Weeks" },
      { label: "Standard Tolerance", value: "±0.1mm" },
      { label: "Clamping Force", value: "Up to 2,000T" },
      { label: "Materials", value: "30+" },
    ],
    description:
      "Korean mold makers supply major automotive and consumer electronics OEM supply chains — meaning their quality baseline is production-grade from day one. Under KORUS FTA, molds and molded parts generally enter the US at 0% duty.",
    technologies: [
      { name: "Prototype Tooling", description: "Aluminum (P20/7075) tooling for 500–5,000 shot validation runs" },
      { name: "Production Tooling", description: "Hardened steel (H13, S7) tooling for 500K–1M+ shot life" },
      { name: "Multi-cavity Molds", description: "2, 4, 8, 16, 32-cavity tooling for high-volume production" },
      { name: "Overmolding", description: "2-shot and insert overmolding; rubber-over-plastic, metal-insert" },
      { name: "Gas-Assist Molding", description: "Nitrogen gas injection for structural hollow parts" },
    ],
    specs: [
      { metric: "Tooling Lead Time (Prototype)", value: "3–4 weeks (aluminum tooling)" },
      { metric: "Tooling Lead Time (Production)", value: "5–8 weeks (hardened steel)" },
      { metric: "Dimensional Tolerance", value: "±0.1 mm standard; ±0.05 mm precision" },
      { metric: "Clamping Force Range", value: "50–2,000 tons" },
      { metric: "Min Order Quantity", value: "100 pieces (prototype); 1,000 pieces (production)" },
      { metric: "Part Size", value: "Up to 600 × 400 × 300 mm" },
      { metric: "Surface Finishes", value: "SPI A1–D3; VDI 3400; custom texture / grain" },
    ],
    materials: [
      "ABS", "PC (Polycarbonate)", "PP (Polypropylene)", "PE", "Nylon PA6/PA66",
      "POM (Acetal)", "TPE", "TPU", "PEEK", "LCP", "PPS", "PC/ABS blend",
    ],
    certifications: ["ISO 9001:2015", "IATF 16949", "ISO 14001"],
    dfmGuidelines: [
      "Maintain uniform wall thickness (2–4mm ideal) to prevent sink marks",
      "Add 1–2° draft angle on all vertical walls",
      "Avoid undercuts where possible; use side actions only when necessary",
      "Design ribs to 50–60% of wall thickness to prevent sink",
      "Provide gate location preference or let the moldmaker advise",
    ],
    industries: ["Consumer Electronics", "Automotive", "Medical Devices", "Industrial Equipment", "Packaging"],
    costNote: "Prototype tooling 35–45% lower than US domestic; per-unit 30–40% lower at 10K+ volume",
  },
  {
    slug: "sheet-metal",
    name: "Sheet Metal Fabrication",
    process: "sheet_metal",
    tagline: "Fiber Laser to Finished Assembly. ±0.1mm. 5–7 Day Prototypes.",
    heroStats: [
      { label: "Prototype Lead Time", value: "5–7 Days" },
      { label: "Laser Cut Tolerance", value: "±0.1mm" },
      { label: "Stamping Tolerance", value: "±0.05mm" },
      { label: "Max Sheet Size", value: "3,000×1,500mm" },
    ],
    description:
      "Korea's sheet metal sector serves leading automotive, consumer electronics, and defense manufacturers. Equipment base (Trumpf, Amada, Bystronic laser; Aida stamping presses) matches European standards.",
    technologies: [
      { name: "Laser Cutting", description: "Fiber laser 2D cutting up to 25mm steel, 20mm aluminum; 5-axis contour cutting" },
      { name: "CNC Punching", description: "Turret punching; combination punch-laser; micro-perforation" },
      { name: "Press Brake Bending", description: "CNC press brake up to 8m length; ±0.1° angular tolerance" },
      { name: "Precision Stamping", description: "Progressive die, transfer die, and compound die; tolerances to ±0.05mm" },
      { name: "Welding & Assembly", description: "TIG, MIG, spot, laser welding; certified to AWS D1.1 and ASME Section IX" },
      { name: "Surface Treatment", description: "Powder coat, e-coat, zinc plating, chromate, anodize, brushed/bead blast" },
    ],
    specs: [
      { metric: "Laser Cut Tolerance", value: "±0.1mm positional; ±0.05mm feature-to-feature" },
      { metric: "Bend Tolerance", value: "±0.2mm / ±0.5°" },
      { metric: "Stamping Tolerance", value: "±0.05mm (precision dies)" },
      { metric: "Material Thickness Range", value: "0.3mm – 25mm (steel); 0.5mm – 20mm (aluminum)" },
      { metric: "Max Sheet Size", value: "3,000 × 1,500 mm" },
      { metric: "Lead Time (Prototypes)", value: "5–7 business days" },
      { metric: "Lead Time (Production)", value: "2–4 weeks depending on volume" },
    ],
    materials: ["SPCC", "SPCD", "SECC (galvanized)", "SUS304", "SUS316", "Aluminum 5052", "Aluminum 6061", "Copper", "Titanium"],
    certifications: ["ISO 9001:2015", "AWS D1.1 Welding Certification", "ASME Section IX"],
    dfmGuidelines: [
      "Minimum bend radius = material thickness",
      "Maintain consistent bend direction to minimize setups",
      "Avoid features too close to bend lines (≥ 2× material thickness clearance)",
      "Design holes ≥ material thickness diameter and away from edges",
      "Specify weld symbol or weld callout on drawing",
    ],
    industries: ["Industrial Equipment", "Enclosures & Chassis", "Automotive", "Aerospace", "Construction", "Electronics"],
    costNote: "15–30% below US domestic fabrication costs at KRW 1,550",
  },
  {
    slug: "die-casting",
    name: "Die Casting",
    process: "die_casting",
    tagline: "IATF 16949 Quality. 25–40% Below US Domestic Cost.",
    heroStats: [
      { label: "Tooling + First Parts", value: "4–6 Weeks" },
      { label: "HPDC Tolerance", value: "±0.1mm as-cast" },
      { label: "Min Wall Thickness", value: "1.0mm (Al)" },
      { label: "MOQ (HPDC)", value: "500 pcs" },
    ],
    description:
      "Korea's die casting sector is deeply integrated with automotive and electronics industries. Korean die casters operate high-pressure aluminum and zinc die casting machines (Bühler, LK, Ube) alongside precision investment casting lines.",
    technologies: [
      { name: "High-Pressure Aluminum Die Casting (HPDC)", description: "Thin-wall structural components; A380, A383, ADC12 alloys" },
      { name: "Zinc Die Casting", description: "Zamak #3, #5; high-detail small components" },
      { name: "Investment Casting", description: "Lost-wax process; complex geometries; stainless, carbon steel, alloy steel" },
      { name: "Gravity Die Casting", description: "Permanent mold casting for medium-complexity aluminum/bronze parts" },
      { name: "Secondary Machining", description: "In-house CNC finish machining of cast blanks; one-source accountability" },
    ],
    specs: [
      { metric: "HPDC Dimensional Tolerance", value: "±0.1mm (as-cast); ±0.02mm (machined features)" },
      { metric: "Investment Casting Tolerance", value: "±0.1–0.3mm per 25mm" },
      { metric: "Surface Finish (As-Cast)", value: "Ra 1.6–3.2 μm" },
      { metric: "Min Wall Thickness (HPDC)", value: "1.0mm aluminum; 0.5mm zinc" },
      { metric: "Casting Weight Range", value: "0.05 kg – 50 kg" },
      { metric: "MOQ", value: "500 pieces (HPDC); 50 pieces (investment casting)" },
      { metric: "Lead Time (Tooling + First Parts)", value: "4–6 weeks" },
      { metric: "Production Lead Time", value: "2–3 weeks" },
    ],
    materials: ["A380 Aluminum", "A383 Aluminum", "ADC12 Aluminum", "Zamak #3 Zinc", "Zamak #5 Zinc", "Stainless Steel (investment)", "Carbon Steel (investment)"],
    certifications: ["ISO 9001:2015", "IATF 16949", "NADCA Standards"],
    dfmGuidelines: [
      "Maintain uniform wall thickness (2–4mm for aluminum HPDC)",
      "Add 1–3° draft to all surfaces parallel to die pull direction",
      "Place parting line at largest cross-section",
      "Design generous fillets (min 1mm) to improve metal flow",
      "Cores and slides increase tooling cost — minimize undercuts",
    ],
    industries: ["Automotive", "Consumer Electronics", "Industrial Equipment", "Lighting", "Telecommunications"],
    costNote: "25–40% below US domestic production at KRW 1,550",
  },
  {
    slug: "construction-components",
    name: "Modular Construction Components",
    process: "construction",
    tagline: "Factory-Built Precision. 25–35% Below US Fabrication Cost.",
    heroStats: [
      { label: "Lead Time Ex-Factory", value: "4–8 Weeks" },
      { label: "Steel Frame Tolerance", value: "±2mm/3m span" },
      { label: "Facade Panel Tolerance", value: "±1mm" },
      { label: "Logistics to West Coast", value: "12–15 Days" },
    ],
    description:
      "Korea's modular construction sector leverages 1,000+ robots per 10,000 workers — the world's highest automation density — increasingly applied to prefabricated construction production lines. For North American buyers, Korean factory-built components bypass on-site labor costs for standardized elements.",
    technologies: [
      { name: "Structural Steel Frames", description: "Precision-welded light gauge steel frames; column-beam subassemblies; CNC-punched stud framing" },
      { name: "Facade & Envelope Systems", description: "Unitized curtain wall panels; preformed metal cladding; composite panel systems (ACM/HPL)" },
      { name: "MEP Prefab Modules", description: "Bathroom pods; kitchen pods; utility chase assemblies; pre-plumbed mechanical rooms" },
      { name: "Interior Cassettes", description: "Factory-finished floor, ceiling, and wall cassettes; dimensionally-toleranced for modular assembly" },
      { name: "Structural Connectors", description: "High-tensile cast steel connection nodes; custom bracket assemblies (CNC machined)" },
    ],
    specs: [
      { metric: "Structural Tolerance (Steel Frame)", value: "±2mm per 3-meter span (CNC-fabricated)" },
      { metric: "Facade Panel Tolerance", value: "±1mm dimensional; ±0.5mm flatness" },
      { metric: "Factory Finish Level", value: "Pre-primed to paint-ready; powder coat available" },
      { metric: "Standard Lead Time (Components)", value: "4–8 weeks ex-factory (FOB Incheon)" },
      { metric: "Delivery to US West Coast", value: "+12–15 days sea freight; +2 days air" },
      { metric: "Fire Rating", value: "UL/FM standards upon request" },
    ],
    materials: ["ASTM A36 Structural Steel", "ASTM A572 High-Strength Steel", "Aluminum 6061/6063", "ACM (Aluminum Composite)", "HPL (High Pressure Laminate)", "Galvanized Steel"],
    certifications: ["ASTM A36/A572 equivalent", "AWS D1.1 Seismic-grade welding", "UL/FM (upon request)"],
    dfmGuidelines: [
      "Provide structural drawings with connection details and tolerances",
      "Coordinate MEP rough-in dimensions before pod fabrication begins",
      "Specify finish level (pre-prime, primer+topcoat, or galvanized)",
      "Confirm shipping unit dimensions for container optimization",
      "Allow 2-week engineering review for custom connection systems",
    ],
    industries: ["Commercial Construction", "Multifamily Residential", "Hospitality", "Healthcare Facilities", "Data Centers"],
    costNote: "Steel framing 25–35% below US fab cost; MEP pods 20–30% below US manufacturers. Add $800–1,400/TEU logistics cost.",
  },
  {
    slug: "electronics-pcb",
    name: "Electronics / PCB Assembly",
    process: "electronics",
    tagline: "IPC Class 2/3 Quality. 3-Day Quick-Turn PCB. US-Ally Supply Chain.",
    heroStats: [
      { label: "Quick-Turn PCB", value: "3–5 Days" },
      { label: "PCBA Lead Time", value: "7–14 Days" },
      { label: "Min Trace/Space", value: "75μm/75μm" },
      { label: "Layer Count", value: "1–20 Layers" },
    ],
    description:
      "South Korea exported $20.9B of electrical/electronic equipment to the United States in 2024. Korea Circuit Co., ISU Petasys, and the broader Korean EMS ecosystem serve global automotive and consumer electronics Tier-1 OEMs.",
    technologies: [
      { name: "PCB Fabrication", description: "1–20 layer rigid PCB; flexible circuits (FPC); rigid-flex; HDI" },
      { name: "PCB Assembly (PCBA)", description: "SMT pick-and-place; through-hole; BGA/QFN/micro-component" },
      { name: "Box Build Assembly", description: "Full product assembly; cable harness; mechanical integration" },
      { name: "Testing & QC", description: "AOI, X-ray inspection, ICT, functional test" },
      { name: "Conformal Coating", description: "Acrylic, silicone, urethane; IPC-CC-830 compliant" },
    ],
    specs: [
      { metric: "Min PCB Trace/Space", value: "75μm / 75μm (standard); 50μm / 50μm (HDI)" },
      { metric: "Min Via Drill (Mechanical)", value: "0.15mm" },
      { metric: "Min Via Drill (Laser)", value: "0.075mm" },
      { metric: "Layer Count", value: "1–20 layers standard; 24+ on request" },
      { metric: "Surface Finish", value: "HASL, Lead-free HASL, ENIG, ENEPIG, OSP, Immersion Silver" },
      { metric: "IPC Standard", value: "IPC Class 2 standard; IPC Class 3 available for medical/aerospace" },
      { metric: "SMT Component Range", value: "01005 passive; 0.3mm pitch BGA" },
      { metric: "Lead Time (Quick-turn PCB)", value: "3–5 days" },
      { metric: "Lead Time (PCBA)", value: "7–14 days (parts in stock)" },
    ],
    materials: ["FR4 Standard", "FR4 High-Tg", "Rogers 4003C/4350B (RF)", "Polyimide (FPC)", "Metal Core (MCPCB)", "Halogen-Free"],
    certifications: ["IPC-A-610", "IPC Class 2/3", "IPC-CC-830", "ISO 9001:2015", "IATF 16949"],
    dfmGuidelines: [
      "Provide Gerber files (RS-274X) + drill file + BOM + centroid file",
      "Define IPC class requirement on fabrication notes",
      "Specify controlled impedance requirements with target values",
      "Identify any no-clean vs. wash-clean flux requirements",
      "Provide test coverage requirement (AOI only, X-ray, ICT, functional)",
    ],
    industries: ["Consumer Electronics", "Industrial Controls", "Medical Devices", "Telecommunications", "Automotive Electronics", "Defense"],
    costNote: "15–25% below US domestic EMS at equivalent quality tier",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
