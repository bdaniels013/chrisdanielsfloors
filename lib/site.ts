// Single source of truth for site copy, contact info, and structural metadata.
// Edit here once and the whole site updates.

export const site = {
  name: "Chris Daniels Floors",
  shortName: "Chris Daniels",
  owner: "Chris Daniels",
  established: 1995,
  yearsExperience: 30,
  domain: "chrisdanielsfloors.com",
  url: "https://chrisdanielsfloors.com",
  description:
    "Hardwood, tile, and luxury vinyl plank — installed by hand, finished tight, signed with a name. Free in-home estimates across the Mississippi Gulf Coast.",
  shortDescription:
    "Thirty years of honest flooring on the Mississippi Gulf Coast.",
  taglines: {
    primary: "Built right. Built to stay.",
    trade: "Thirty years on the Coast.",
    service: "Free in-home estimates.",
  },
  serviceArea: "Mississippi Gulf Coast",
  city: "Biloxi",
  state: "MS",
  postal: "39530",
  hours: [
    { day: "Mon – Fri", time: "9:00 am – 5:00 pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  phone: {
    display: "(228) 596-0472",
    href: "tel:+12285960472",
    sms: "sms:+12285960472",
    raw: "+12285960472",
  },
  email: "chris@chrisdanielsfloors.com", // placeholder — replace with real address
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Knox Collection", href: "/knox" },
  { label: "Nora Collection", href: "/nora" },
  { label: "Installation", href: "/installation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
