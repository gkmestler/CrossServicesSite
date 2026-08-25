/* ==========================================================================
   SERVICES — the single most important file on the site.

   This one file drives:
     • the services index page
     • all twelve service detail pages
     • the Services dropdown in the header
     • the mobile menu
     • the checkboxes in the quote form
     • the footer services list
     • the sitemap that Google reads

   TO ADD ANOTHER SERVICE: copy an existing block below, change the fields,
   drop the photos into /public/images/services/, and you are done. No other
   file needs touching.

   COPY STATUS:
     • `includes` lists are taken word for word from the current live site.
     • `intro` paragraphs are DRAFT — rewritten from the current site copy so
       they speak to homeowners and property managers in the same breath.
     • `faqs` are DRAFT. Nothing in them states a price, a timeframe or a
       certification. Review and correct before launch.
   ========================================================================== */

export type ServiceGroup =
  | "grounds" // Grounds & exterior
  | "cleaning" // Cleaning
  | "repairs" // Repairs & projects
  | "property" // Property management
  | "vehicles"; // Vehicles

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  /** One sentence. Shown on cards and under the page heading. */
  tagline: string;
  /** Overrides `tagline` as the description under this service's checkbox on the quote form. */
  quoteDescription?: string;
  /** Overrides the default "Residential & commercial" tag, for services offered to only one audience. */
  audienceLabel?: string;
  /** Two or three sentences at the top of the detail page. */
  intro: string;
  /** The "What's included" checklist. Also feeds the service schema's itemListElement. */
  includes: string[];
  /** Optional label shown above the "What's included" checklist, e.g. "Maintenance Service:". */
  includesHeading?: string;
  /** Splits "What's included" into multiple labelled groups instead of one flat list, e.g. "Maintenance Service:" and "Snow Management:". When set, this drives the display and `includes` should list the same items flattened, for the service schema. */
  includesGroups?: { heading: string; items: string[] }[];
  /** Which portfolio company does this work. `null` means Cross does it directly. */
  brandId: string | null;
  /** A second company, e.g. The Furies covering Cape Cod. */
  secondaryBrandId?: string;
  /** Set only for a card that links straight out to a portfolio company's own site instead of an internal detail page. */
  externalUrl?: string;
  /** Two or three other service slugs customers usually book alongside this one. */
  related: string[];
  heroImage: string;
  gallery: string[];
  /** A matched pair for the before/after slider, where good photos exist. */
  beforeAfter?: { before: string; after: string; caption: string };
  faqs: { q: string; a: string }[];
  /** The old Squarespace address, if this service had one. Used to build the redirects in next.config.ts. */
  legacyPath?: string;
};

/** Display names and running order for the five groups. */
export const serviceGroups: { id: ServiceGroup; name: string }[] = [
  { id: "grounds", name: "Grounds & Exterior" },
  { id: "cleaning", name: "Cleaning" },
  { id: "repairs", name: "Repairs & Projects" },
  { id: "property", name: "Property Management" },
  { id: "vehicles", name: "Vehicles" },
];

export const services: Service[] = [
  /* ---------------------------------------------------------------- GROUNDS */
  {
    slug: "landscaping",
    name: "Landscaping",
    group: "grounds",
    tagline: "Year-round grounds care, from spring clean-up to fall leaf removal.",
    intro:
      "The first thing anyone sees when they arrive at your home or your building is the grounds. Our landscape crews handle design, planting, weekly maintenance and seasonal clean-ups, whether it is a residential property or commercial sites.",
    includes: [
      "Spring & Fall cleanups",
      "Edging & mulching",
      "Weeding",
      "Weekly Mowing",
      "Fertilizing",
      "Lawn renovations",
      "New lawn installations",
      "Aeration, de-thatching, seeding",
      "Trimming of trees and shrubs",
      "Installation of trees, shrubs and perennials",
      "Design services",
      "Snowplowing",
      "Shoveling",
      "Melting and de-icing services",
      "Snow removal",
    ],
    includesGroups: [
      {
        heading: "Maintenance Services:",
        items: [
          "Spring & Fall cleanups",
          "Edging & mulching",
          "Weeding",
          "Weekly Mowing",
          "Fertilizing",
          "Lawn renovations",
          "New lawn installations",
          "Aeration, de-thatching, seeding",
          "Trimming of trees and shrubs",
        ],
      },
      {
        heading: "Planting:",
        items: ["Installation of trees, shrubs and perennials", "Design services"],
      },
      {
        heading: "Snow Management",
        items: ["Snowplowing", "Shoveling", "Melting and de-icing services", "Snow removal"],
      },
    ],
    brandId: null,
    related: ["irrigation", "power-washing", "gutter-cleaning"],
    heroImage: "/images/services/landscaping-hero-2.webp",
    gallery: [
      "/images/services/landscaping-1.png",
      "/images/services/landscaping-2.jpg",
      "/images/services/landscaping-3.jpg",
    ],
    beforeAfter: {
      before: "/images/services/landscaping-before.jpg",
      after: "/images/services/landscaping-after.jpg",
      caption: "A front bed rebuilt and replanted.",
    },
    faqs: [
      {
        q: "Do you take on weekly maintenance as well as one-off projects?",
        a: "Both. All of our clients are on a year-round maintenance plan covering spring clean-up, weekly mowing, mulch, pruning, fall cleanups. But we also have clients we do work for that bring us in for a single project such as a bed redesign or a new patio.",
      },
      {
        q: "Do you work on commercial properties?",
        a: "We do. Cross maintains the grounds at many commercial buildings.",
      },
      {
        q: "Do you offer a free estimate before starting work?",
        a: "Yes. We walk the property with you and put together a plan and a price before anything is scheduled.",
      },
    ],
    legacyPath: "/landscaping-copy",
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    group: "grounds",
    tagline: "Sprinkler systems designed, installed, repaired and winterized.",
    intro:
      "A lawn is only as good as the water it gets. Our irrigation technicians design, install, repair and winterize automated sprinkler systems for homes and commercial properties, and we regularly take over systems we did not originally install.",
    includes: [
      "Full design services for new automated sprinkler systems",
      "Installation of new irrigation systems",
      "Redesign or adjustments to existing systems",
      "Annual irrigation maintenance programs",
      "General repairs to existing systems",
    ],
    brandId: null,
    related: ["landscaping", "power-washing", "property-management"],
    heroImage: "/images/services/irrigation-hero.webp",
    gallery: [],
    faqs: [
      {
        q: "Can you repair an irrigation system you did not install?",
        a: "Yes. We regularly take over existing systems, walk the zones with you, and either repair what is there or redesign the parts that are not doing their job.",
      },
      {
        q: "Do you handle spring start-up and fall winterizing?",
        a: "Yes, and most clients put it on an annual maintenance program.",
      },
      {
        q: "Do you install brand-new systems as well as repair old ones?",
        a: "Both. We design and install new automated sprinkler systems from scratch, and redesign or adjust existing ones that are not covering the yard properly.",
      },
      {
        q: "Do you work on commercial properties?",
        a: "We do. Cross maintains irrigation at many commercial buildings.",
      },
    ],
  },
  {
    slug: "power-washing",
    name: "Power Washing",
    group: "grounds",
    tagline: "Houses, siding, decks, patios, driveways and walkways.",
    intro:
      "New England weather can take a toll on your home and commercial property. Our experienced team provides professional power washing for siding, roofs, decks, patios, walkways, driveways, and other exterior surfaces using environmentally responsible cleaning solutions. It's one of the fastest and most effective ways to restore your property's appearance and keep it looking its best year-round.",
    includes: [
      "House siding",
      "Bluestone patio and wood deck",
      "Roof shingles",
      "Walkways and pavement",
      "Outdoor furniture",
      "Tennis and basketball courts",
      "Stonewalls",
      "Awnings",
    ],
    brandId: "new-view",
    related: ["window-washing", "gutter-cleaning", "landscaping"],
    heroImage: "/images/services/power-washing-hero-4.webp",
    gallery: [],
    beforeAfter: {
      before: "/images/services/power-washing-before.jpg",
      after: "/images/services/power-washing-after.jpg",
      caption: "Vinyl siding, one pass.",
    },
    faqs: [
      {
        q: "Will the pressure damage my siding or my plants?",
        a: "No. We match the pressure and the cleaning solution to the surface.",
      },
      {
        q: "Can you clean moss and staining off a roof?",
        a: "Yes. Roof shingles are one of the surfaces we treat, using a low-pressure approach so the shingles are not stripped.",
      },
      {
        q: "Can you do a whole commercial building or a parking area?",
        a: "Yes. Walkways, pavement, entryways and full building exteriors are all regular work for our team.",
      },
    ],
    legacyPath: "/power-washing",
  },
  {
    slug: "window-washing",
    name: "Window Washing",
    group: "grounds",
    tagline: "Spot and streak free glass, inside and out.",
    intro:
      "Over time, dirt, dust, and debris can build up on your windows, reducing their clarity and appearance. Our crews clean interior and exterior windows, storm windows, screens, and sills to let more natural light into your home and leave your glass sparkling. We also provide professional window cleaning for office buildings and retail storefronts, helping businesses make a great first impression with clean, streak-free windows.",
    includes: [
      "Interior and exterior washing",
      "Storm window washing",
      "Chandelier and outdoor light cleaning",
      "Screens and sills wiped down",
      "Office buildings and retail storefronts",
    ],
    brandId: "new-view",
    related: ["power-washing", "gutter-cleaning", "residential-cleaning"],
    heroImage: "/images/services/window-washing-hero.webp",
    gallery: [],
    faqs: [
      {
        q: "Do you clean screens and sills too, or just the glass?",
        a: "Screens and sills are wiped down as part of the service. So are storm windows.",
      },
      {
        q: "How often should windows be washed?",
        a: "Most homeowners in MetroWest have us out once or twice a year. Storefronts and offices usually want a more frequent schedule.",
      },
      {
        q: "Can you reach windows on high story houses and buildings?",
        a: "Yes. Our team is set up for multi-storey homes and commercial glass, including outdoor light fixtures and chandeliers.",
      },
    ],
    legacyPath: "/window-washing",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    group: "grounds",
    tagline: "Clear gutters and downspouts, without you going up a ladder.",
    intro:
      "Clogged gutters can lead to costly water damage, making regular gutter maintenance one of the simplest ways to protect your home or business. Our crews remove leaves and debris, clear downspouts, and inspect your gutter system to ensure water flows properly. We also repair and seal leaking gutters, helping protect your property and keep your gutter system performing its best year-round.",
    includes: [
      "Annual or bi-annual gutter cleaning, spring and fall",
      "Downspout and drain clearing",
      "Gutter repair and caulking",
    ],
    brandId: "new-view",
    related: ["power-washing", "window-washing", "painting-handyman"],
    heroImage: "/images/services/gutter-cleaning-hero.webp",
    gallery: [
      "/images/services/gutter-cleaning-1.jpg",
      "/images/services/gutter-cleaning-2.jpg",
    ],
    faqs: [
      {
        q: "How often do gutters need clearing?",
        a: "Twice a year suits most properties in this area, in spring and again in fall once the leaves are down. Properties under heavy tree cover often want the fall visit split into two.",
      },
      {
        q: "Do you fix gutters as well as clean them?",
        a: "Yes. Repair and caulking can be a part of the service by request.",
      },
      {
        q: "Can you put this on a standing schedule?",
        a: "Yes. Most clients set it as an annual or bi-annual visit so it happens without a phone call.",
      },
    ],
    legacyPath: "/gutter-cleaning",
  },

  /* --------------------------------------------------------------- CLEANING */
  {
    slug: "residential-cleaning",
    name: "Residential Cleaning",
    group: "cleaning",
    tagline: "Regular house cleaning, plus spring, move-out and post-construction.",
    audienceLabel: "Residential",
    intro:
      "With the never ending list of daily tasks in our lives, it is hard to keep up with a clean home. We offer regular weekly or bi-weekly visits from our residential house cleaners, and one-time cleans for spring, a move, a special event or a post-construction cleaning.",
    includes: [
      "Flexible weekly or bi-weekly cleaning schedules",
      "One-time cleanings: spring cleaning, moving, post-construction or a special event",
      "Office and janitorial cleanings, nights or early mornings",
      "Cleaning supplies provided",
    ],
    brandId: null,
    secondaryBrandId: "the-furies",
    related: ["window-washing", "junk-removal", "janitorial-cleaning"],
    heroImage: "/images/services/residential-cleaning-hero.webp",
    gallery: [
      "/images/services/residential-cleaning-1.jpg",
      "/images/services/residential-cleaning-2.jpg",
    ],
    faqs: [
      {
        q: "Do I need to supply cleaning products?",
        a: "No. Our cleaners bring their own supplies. If you would rather we used a specific product in your home, tell us and we will.",
      },
      {
        q: "Is it the same cleaner every visit?",
        a: "We keep clients with the same team wherever we can, because knowing a house makes the work better.",
      },
      {
        q: "Can you do a one-off clean rather than a schedule?",
        a: "Yes. Spring cleaning, move-out cleaning, post-construction cleaning and cleaning before or after an event are all regular work for us.",
      },
      {
        q: "Do you clean on Cape Cod?",
        a: "On the Cape, residential cleaning is handled by our sister company The Furies. Same standard, call 508-349-1145 today to learn more!",
      },
    ],
    legacyPath: "/residential-cleaning",
  },
  {
    slug: "janitorial-cleaning",
    name: "Janitorial Cleaning",
    group: "cleaning",
    tagline: "Nightly commercial cleaning with one person to call.",
    audienceLabel: "Commercial",
    intro:
      "With the never ending list of daily tasks, it is hard to keep up with a clean work space. Our commercial cleaning business offers convenient nightly visits from professionally trained cleaning staff, on a schedule built around your building rather than ours.",
    includes: [
      "Flexible cleaning schedules, nights or early mornings",
      "Consistent, timely and thorough service",
      "Responsive office staff and a relationship manager",
      "Customized cleaning proposals",
      "Cleaning supplies provided or on demand",
    ],
    brandId: null,
    related: ["property-management", "window-washing", "junk-removal"],
    heroImage: "/images/services/janitorial-cleaning-hero.webp",
    gallery: [],
    faqs: [
      {
        q: "Can you clean outside our business hours?",
        a: "Yes. Nights are how most of our commercial accounts run, so the building is ready before anyone arrives.",
      },
      {
        q: "Do you provide the supplies and consumables?",
        a: "We can provide supplies as part of the contract, or restock on demand if you would rather buy your own. We will set it up whichever way suits your budget.",
      },
      {
        q: "Can you cover more than the cleaning?",
        a: "Yes, and most of our commercial clients do exactly that. Janitorial usually sits alongside window washing, grounds care and handyman work under one point of contact.",
      },
    ],
    legacyPath: "/janitorial-cleaning",
  },
  /* ---------------------------------------------------------------- REPAIRS */
  {
    slug: "painting-handyman",
    name: "Painting & Handyman",
    group: "repairs",
    tagline: "The lingering to-do list, finally done.",
    intro:
      "Are there projects lingering in the back of your mind? The air filters that need changing, the light bulbs in the ceiling, the room that has needed repainting for two years. Our carpenters and painters take on full interior and exterior painting for homes and commercial spaces, and handyman work by the hour or by the project, so the whole list goes at once.",
    includes: [
      "Full painting services for residential or commercial projects",
      "Painting by the hour or by the project",
      "Handyman services — everything on the to-do list",
      "Carpentry – Repairs, renovations, trim work, doors, framing, and general woodwork",
      "Interior Construction – Drywall installation, ceiling work, flooring, wall modifications, room updates, and interior build-outs",
      "Christmas and holiday decorations",
    ],
    brandId: null,
    related: ["gutter-cleaning", "junk-removal", "audio-video"],
    heroImage: "/images/services/painting-handyman-hero.jpeg",
    gallery: [
      "/images/services/painting-handyman-1.jpg",
      "/images/services/painting-handyman-2.jpg",
    ],
    faqs: [
      {
        q: "Is there a minimum size of job?",
        a: "No. We work by the hour as well as by the project, which is how the small jobs nobody else will come out for actually get done.",
      },
      {
        q: "Do you paint exteriors as well as interiors?",
        a: "Both, for homes and for commercial spaces. If the exterior needs washing first, our power washing crew handles that on the same job.",
      },
      {
        q: "Can I hand over a whole list at once?",
        a: "Please do. One visit, one crew, one invoice, list gone.",
      },
    ],
    legacyPath: "/painting-handyman",
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    group: "repairs",
    tagline: "We sort it, load it and take it away.",
    intro:
      "At Cross Junk Removal we handle everything from sorting and lifting to loading and disposal, so the only thing you have to do is point. Furniture, appliances, construction debris, an old hot tub or a full estate clear-out it goes in one visit. We clear garages, attics, basements, storage units, offices and yards for homeowners, realtors and property managers.",
    includes: [
      "Furniture, appliances and mattresses",
      "Swing sets, sheds, fences and decks",
      "Construction debris and scrap metal",
      "Yard waste",
      "Office furniture",
      "Hot tubs",
      "Carpet removal",
      "Garage, attic and basement cleanouts",
      "Estate and storage unit cleanouts",
      "Office and yard cleanouts",
    ],
    brandId: null,
    related: ["residential-cleaning", "painting-handyman", "property-management"],
    heroImage: "/images/services/junk-removal-hero.webp",
    gallery: [],
    faqs: [
      {
        q: "Do I have to move anything to the curb?",
        a: "No. Our team does the sorting, lifting, loading and disposal. It can stay exactly where it is until we get there.",
      },
      {
        q: "Will you take a hot tub, a shed or a deck?",
        a: "Yes. Hot tubs, sheds, swing sets, fences and decks are all things we dismantle and remove.",
      },
      {
        q: "Can you handle a full estate cleanout?",
        a: "Yes. We can follow the removal with a full clean so the space is ready to list.",
      },
    ],
    legacyPath: "/junk-removal",
  },
  {
    slug: "audio-video",
    name: "Audio & Video",
    group: "repairs",
    tagline: "Tv's, sound, cameras and networks.",
    intro:
      "Our Technology Service Division provides solutions that enhance entertainment, convenience, and peace of mind. From whole-home audio and home theater systems to surveillance cameras, our skilled technicians ensure every system is seamlessly integrated and easy to use. We work with both residential and commercial properties, using high-quality equipment and clean, professional installations. Whether you're upgrading existing systems or starting from scratch, we handle every detail so you can sit back, relax, and enjoy a smarter, more secure space.",
    includes: [
      "Audio and video systems",
      "Network cameras",
      "Data networking",
      "Tech consulting",
      "Hosted phone systems",
      "Video conference solutions",
    ],
    brandId: null,
    related: ["painting-handyman", "property-management", "residential-cleaning"],
    heroImage: "/images/services/audio-video-hero.jpeg",
    gallery: ["/images/services/audio-video-1.jpg", "/images/services/audio-video-2.jpg"],
    faqs: [
      {
        q: "Do you work on existing systems or only new installs?",
        a: "Both. A lot of our work is taking over equipment somebody else installed, working out what is actually wrong, and making it reliable.",
      },
      {
        q: "Can you install security cameras at a commercial building?",
        a: "Yes. Network cameras and the data networking behind them are a core part of what this division does.",
      },
      {
        q: "Do you handle phones and conference rooms?",
        a: "Yes. Hosted phone systems and video conference setups are both on the list, including the cabling.",
      },
    ],
    legacyPath: "/new-page-2",
  },

  /* --------------------------------------------------------------- PROPERTY */
  {
    slug: "property-management",
    name: "Property Management",
    group: "property",
    tagline: "One point of contact for the whole property, all year.",
    intro:
      "Have peace of mind knowing that your home is being cared for when you cannot be there and that all your needs are being met. Frequent home inspections will ensure safety from weather and security related events. With frequent walk-throughs our team will monitor all automobiles, entryways and doors as well as monitor the temperature and alarm systems. All potential repair or maintenance needs will be accompanied with a suggested action plan to ensure proper correction at your preference.",
    includes: [
      "Routine maintenance",
      "Preventative care",
      "Management of large or small projects",
      "24/7 emergency contact",
      "Low monthly fee",
    ],
    brandId: null,
    related: ["janitorial-cleaning", "landscaping", "painting-handyman"],
    heroImage: "/images/services/property-management-hero.webp",
    gallery: [
      "/images/services/property-management-1.jpg",
      "/images/services/property-management-2.jpg",
    ],
    faqs: [
      {
        q: "What does routine maintenance actually cover?",
        a: "We build the schedule around the property: seasonal systems, filters, gutters, grounds, the checks that stop a small thing becoming a problem.",
      },
      {
        q: "Who do I call in an emergency?",
        a: "Us, at any hour. A 24/7 emergency contact is part of the arrangement.",
      },
      {
        q: "Do you manage commercial buildings?",
        a: "Yes, we manage several commercial buildings throughout Natick, Weston, Needham and more.",
      },
    ],
    legacyPath: "/property-management",
  },

  /* --------------------------------------------------------------- VEHICLES */
  {
    slug: "car-detailing",
    name: "Car Detailing",
    group: "vehicles",
    tagline: "Mobile detailing at your home or office.",
    quoteDescription: "We come to your home or office.",
    intro:
      "Keep your car, truck, or van looking and feeling like new. Your vehicle is an investment, and it deserves professional care. Founded in 1989 as the first Cross Services Group business, Classic Shine offers complete interior and exterior detailing, hand washes, mobile detailing at your home or workplace, recurring on-site detailing for businesses, offices, fleet detailing, and seasonal vehicle storage with free pick-up and delivery within five miles.",
    includes: [
      "Full detail",
      "Exterior or interior detail only",
      "Hand wash",
      "Free pick-up and delivery within 5 miles",
      "Mobile detailing",
      "Car storage",
    ],
    brandId: "classic-shine",
    related: ["residential-cleaning", "power-washing", "property-management"],
    heroImage: "/images/services/car-detailing-hero.webp",
    gallery: [],
    beforeAfter: {
      before: "/images/services/car-detailing-before.jpg",
      after: "/images/services/car-detailing-after.jpg",
      caption: "Interior detail, front to back.",
    },
    faqs: [
      {
        q: "Do you come to me?",
        a: "We can. Mobile detailing brings the work to your driveway or your office.",
      },
      {
        q: "Can I book interior only?",
        a: "Yes. Full detail, exterior only, interior only or a hand wash — you pick.",
      },
      {
        q: "Do you store cars over the winter?",
        a: "Yes, car storage is one of the services we offer. Call today to learn more!",
      },
      {
        q: "Can you provide mobile detailing for my office on a regular basis?",
        a: "Yes. We can set up a repeating schedule so our mobile team is at your office on the same day every week or month.",
      },
    ],
    legacyPath: "/car-detailing",
  },
];

/* --------------------------------------------------------------------------
   Helpers used by the pages. You should not need to edit anything below here.
   -------------------------------------------------------------------------- */

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesInGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

/** Services bucketed into the five groups, in the order set above. */
export function servicesByGroup(): {
  id: ServiceGroup;
  name: string;
  services: Service[];
}[] {
  return serviceGroups.map((g) => ({ ...g, services: getServicesInGroup(g.id) }));
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

export const serviceSlugs = services.filter((s) => !s.externalUrl).map((s) => s.slug);
