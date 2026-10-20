// Single source of truth for all portfolio copy.
// Everything here is taken from Vinothini's portfolio PDF and the SkillKart report.

export const person = {
  name: "Vinothini S",
  first: "Vinothini",
  positioning: ["Fashion", "Branding", "Marketing"],
  edition: "Selected Works / 2026",
  email: "vinosundar77@gmail.com",
  phone: "+91 98437 50288",
  phoneHref: "tel:+919843750288",
  about:
    "A fashion business student with a creative foundation and a strong interest in branding, marketing and visual storytelling. I enjoy combining creative thinking with a business perspective to create engaging, brand-focused ideas across retail, digital and e-commerce.",
};

export const experience = [
  { org: "The Bear House", role: "E-commerce Marketplace Intern", when: "Jun–Jul 2026" },
  { org: "Effilo", role: "Customer Service & Logistics Intern", when: "Jun–Jul 2024" },
  { org: "Pearloze", role: "Design Intern", when: "Jan–Jun 2024" },
];

export const education = [
  { course: "MBA — Fashion & Lifestyle Business Management", school: "Pearl Academy", when: "2025–2027" },
  { course: "B.Sc. — Fashion Design", school: "VIT Chennai", when: "2022–2025", note: "GPA 9.03" },
];

export const skillList = [
  "Visual Concept Development",
  "Moodboarding & Design",
  "Digital Campaign Planning",
  "Event Planning & Coordination",
  "Marketplace Cataloguing & Listing Management",
  "Negotiation Skills",
  "Shopify (Product Listings)",
];

export const tools = ["Adobe Illustrator", "Canva", "MS Excel"];

// Interactive skill wall: each skill points to evidence in the portfolio.
export const skillEvidence = [
  { skill: "Visual Concept Development", evidence: "Koskii / NIRVAA", target: "koskii", image: "/media/env-veiled-blue.webp" },
  { skill: "Moodboarding", evidence: "Koskii × Bridgerton", target: "koskii", image: "/media/env-wild-bloom.webp" },
  { skill: "Campaign Planning", evidence: "SNITCH", target: "snitch", image: "/media/snitch-poster.jpg" },
  { skill: "E-commerce", evidence: "The Bear House", target: "profile", image: null },
  { skill: "Retail", evidence: "Koskii / Zouk", target: "zouk", image: "/media/zouk-store.webp" },
  { skill: "Coordination", evidence: "Event Planning & Coordination", target: "profile", image: null },
];

export type ProjectIndexItem = {
  id: string;
  num: string;
  name: string;
  short: string;
  tags: string;
  preview: string;
};

export const projects: ProjectIndexItem[] = [
  {
    id: "koskii",
    num: "01",
    name: "Koskii × Bridgerton",
    short: "Koskii × Bridgerton",
    tags: "Brand Collaboration · Collection Concept · Visual Experience",
    preview: "/media/window-display.webp",
  },
  {
    id: "zouk",
    num: "02",
    name: "Zouk",
    short: "Zouk",
    tags: "Retail Strategy · Customer Experience · Omnichannel",
    preview: "/media/zouk-hero.webp",
  },
  {
    id: "nirvaa",
    num: "03",
    name: "NIRVAA",
    short: "NIRVAA",
    tags: "Brand Extension · Product Innovation · Marketing Strategy",
    preview: "/media/nirvaa-box.webp",
  },
  {
    id: "snitch",
    num: "04",
    name: "SNITCH",
    short: "SNITCH",
    tags: "Digital Campaign · Content Strategy",
    preview: "/media/snitch-poster.jpg",
  },
  {
    id: "skillkart",
    num: "05",
    name: "SkillKart",
    short: "SkillKart",
    tags: "Design Thinking · User Research · Product Concept",
    preview: "/media/sk-cover.webp",
  },
];

export const koskii = {
  season: "S/S 2028 · Conceptual Brand Collaboration",
  brief:
    "Reimagining Bridgerton's Regency romance through Koskii's Indian occasion wear, blending romance, heritage and contemporary celebration.",
  consumer:
    "Three consumer mindsets — from romantic, trend-led shoppers to craft-conscious occasion buyers — informed the three collection stories.",
  collections: [
    {
      name: "Veiled in Blue",
      image: "/media/env-veiled-blue.webp",
      text: "An ethereal interpretation of Regency romance, expressed through soft blues, delicate fabrics and graceful occasion-wear silhouettes.",
    },
    {
      name: "Wild Bloom",
      image: "/media/env-wild-bloom.webp",
      text: "A whimsical take on Regency romance, bringing together soft florals, dreamy pastels and delicate fabrics in a youthful, nature-inspired collection.",
    },
    {
      name: "Woven Legacy",
      image: "/media/env-woven-legacy.webp",
      text: "A celebration of Indian heritage through a Regency-inspired lens, combining rich silks, traditional weaves and intricate craftsmanship with an opulent colour palette.",
    },
  ],
  execution: [
    { k: "Focal Product", v: "Final developed garment" },
    { k: "Colour Story", v: "Pastels inspired by the collection" },
    { k: "Props & Styling", v: "Florals · Accessories · Drapery" },
    { k: "Ambience", v: "Soft lighting · Romantic · Regency-inspired" },
  ],
  executionNote:
    "The collection was brought to life through a physical window display, translating the Koskii × Bridgerton visual language into a retail environment through the final garment, draped fabrics, lighting and curated props.",
};

export const zouk = {
  context:
    "Zouk's “Modern Indian Classic” identity is expressed through Indian prints, craftsmanship and functional products. Its stores strengthen this identity through purpose-led merchandising, tactile product experiences and craft-led visual storytelling.",
  opportunity:
    "Connect Zouk's strong in-store experience with its digital ecosystem to create a seamless and consistent customer journey.",
  recommendations: [
    {
      num: "01",
      title: "Brand Positioning Through Aesthetic Enhancement",
      text: "Strengthen Zouk's Modern Indian identity through craft-inspired stores and consistent visual branding across retail and digital.",
      image: "/media/zouk-store.webp",
    },
    {
      num: "02",
      title: "Tier 2 & Tier 3 Retail Expansion",
      text: "Expand through stores, pop-ups and shop-in-shops in high-footfall emerging markets, supported by localised offerings.",
      image: "/media/zouk-popup.webp",
    },
    {
      num: "03",
      title: "Technology & Omnichannel Integration",
      text: "Create a seamless retail journey through Click & Collect, Ship-from-Store, AR visualisation, unified CRM and real-time inventory integration.",
      image: "/media/zouk-omni.webp",
    },
    {
      num: "04",
      title: "Customer Co-Creation & Engagement",
      text: "Launch “Design with Zouk”, inviting customers to contribute designs and preferences through polls, rewards and limited-edition drops.",
      image: "/media/zouk-cocreate.webp",
    },
  ],
};

export const nirvaa = {
  story: [
    {
      k: "What was already there",
      v: "Kama Ayurveda had built a premium identity around authentic Ayurveda, natural ingredients, heritage and ritual-based self-care.",
    },
    {
      k: "The opportunity",
      v: "The shift towards holistic wellness, sustainability and mindful living presented an opportunity to extend Kama Ayurveda beyond beauty into lifestyle fashion.",
    },
    {
      k: "What we created",
      v: "NIRVAA — sustainable, aromatherapy-infused loungewear combining Ayurveda, fashion and wellness to transform everyday comfort into a mindful ritual.",
    },
  ],
  product:
    "Herbal-dyed loungewear made from organic cotton, bamboo and hemp, featuring mini inner pockets for refillable essential-oil capsules.",
  target:
    "Urban millennials & professionals aged 22–40, along with conscious-luxury consumers, yoga practitioners and wellness enthusiasts.",
  value:
    "Combining Ayurvedic science, sustainable fashion and modern design to transform daily comfort into a therapeutic ritual.",
  aromas: [
    { mood: "Calm", blend: "Lavender + Chamomile", benefit: "Deep Sleep & Relaxation", image: "/media/lavender.webp", tone: "#E7E1EA", ink: "#4B3A55" },
    { mood: "Focus", blend: "Tulsi + Lemongrass", benefit: "Mental Clarity & Energy", image: "/media/lemongrass.webp", tone: "#E4E7D6", ink: "#45503A" },
    { mood: "Ground", blend: "Sandalwood + Vetiver", benefit: "Stress Relief & Grounding", image: "/media/sandalwood.webp", tone: "#EEDCC8", ink: "#6A3A22" },
  ],
  strategy: ["Expand Capsule Variants", "Sleep & Wellness Accessories", "Personalised Capsule Sets", "Reusable Diffuser Capsules"],
  sevenPs: [
    { p: "Product", v: "Aromatherapy-infused sustainable loungewear." },
    { p: "Price", v: "Premium, value-based pricing." },
    { p: "Place", v: "Boutiques, pop-ups & premium online channels." },
    { p: "Promotion", v: "Influencers, experiential events & PR." },
    { p: "People", v: "Trained wellness advisors & experts." },
    { p: "Process", v: "Sustainable production & refill journey." },
    { p: "Physical Evidence", v: "Eco-packaging & spa-inspired retail." },
  ],
};

export const snitch = {
  objective:
    "A 5-day digital campaign designed to build anticipation, launch the collection and drive consumer engagement.",
  days: [
    { n: "01", t: "Tease", d: "Teaser reel · Product glimpse · Countdown" },
    { n: "02", t: "Engage", d: "Spin-the-wheel activation · Offers & Coupons" },
    { n: "03", t: "Launch", d: "Collection reveal · Product launch reel" },
    { n: "04", t: "Styling Snitch", d: "Influencer-led styling content" },
    { n: "05", t: "Validate", d: "Customer reviews · Social proof · Community engagement" },
  ],
};

export const skillkart = {
  credit: "Group project · Co-author",
  process: ["Research", "Insight", "Problem", "Ideation", "Solution", "Prototype"],
  problem:
    "Students have skills, passion and potential — but lack exposure, confidence, opportunities and flexible ways to earn. There is no single, accessible place to experiment with their skills, earn through small gigs and discover their path at their own pace.",
  research:
    "Surveys, simple conversations, quiet observations and secondary research revealed one truth: students have skills, but lack exposure, confidence and opportunities.",
  insights: [
    { t: "Skills exist, but visibility doesn't", d: "Students have abilities, but no structured way to showcase them." },
    { t: "Confidence is fragile", d: "Most hesitate to put themselves out there, even when they're good at something." },
    { t: "Opportunities are scattered", d: "There is no single place where students can find flexible, skill-based gigs." },
    { t: "Real-world exposure is missing", d: "Practical experience shapes passion, yet it's rarely accessible." },
  ],
  solution:
    "A student-focused skill marketplace where users can offer their skills or find a service, take on flexible gigs, earn, and build real experience — one small opportunity at a time.",
  journeys: {
    offer: ["Create profile", "Showcase skills", "Receive gigs", "Complete work", "Earn", "Build experience"],
    find: ["Explore", "Find student talent", "View skills & ratings", "Book", "Connect", "Review"],
  },
  screens: [
    { src: "/media/ph-01.webp", label: "Welcome" },
    { src: "/media/ph-02.webp", label: "Choose your journey" },
    { src: "/media/ph-04.webp", label: "Become a partner" },
    { src: "/media/ph-05.webp", label: "Partner dashboard" },
    { src: "/media/ph-06.webp", label: "Explore categories" },
    { src: "/media/ph-07.webp", label: "Discover talent" },
    { src: "/media/ph-08.webp", label: "Choose time & confirm" },
    { src: "/media/ph-09.webp", label: "Profile & insights" },
    { src: "/media/ph-10.webp", label: "Skill progress" },
    { src: "/media/ph-03.webp", label: "Community" },
    { src: "/media/ph-11.webp", label: "Feedback" },
  ],
  features: [
    { t: "Flexible Micro-Gigs", d: "Short opportunities designed around student schedules." },
    { t: "Verified Skill Profiles", d: "Skills, portfolios, ratings and experience in one place." },
    { t: "Earnings & Progress Dashboard", d: "Track gigs, earnings and personal growth." },
    { t: "Community & Support", d: "Join hubs and collaborate with peers." },
  ],
  before: ["No exposure", "Skills unnoticed", "Low confidence", "Limited opportunities"],
  after: ["Visible skills", "Real gigs", "Experience", "Earnings", "Reviews", "Confidence"],
  closing: "Every student carries a skill. All they need is a place to use it.",
  reportUrl: "https://heyzine.com/flip-book/b58dd032c9.html",
};
