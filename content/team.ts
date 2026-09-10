/* ==========================================================================
   LEADERSHIP TEAM — shown on the About page.

   A person with no bio and no photo still renders correctly: they get their
   initials in a circle and just a name and title. Never put a company logo
   in a headshot slot.

   To add a headshot: drop the file into /public/images/team/ and set `photo`
   to its path, e.g. "/images/team/megan-griffith.jpg".
   ========================================================================== */

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  /** Path to the headshot, or null if we do not have one yet. */
  photo: string | null;
  /** Full bio, or null. A missing bio simply hides the "Read bio" control. */
  bio: string | null;
  /** True for the leads of a specific service division, shown in their own group. */
  isDivisionHead?: boolean;
};

export const team: TeamMember[] = [
  {
    id: "warren-cross-jr",
    name: "Warren Cross Jr.",
    title: "President and CEO",
    photo: "/images/team/warren-cross-jr.png",
    bio: "Warren founded Cross Services Group in 1989, after graduating college, and serves as the President & CEO of the company. A classic serial entrepreneur, Warren loves the challenge of starting or acquiring businesses that have complimentary features.\n\nIn 2007, Warren developed Cross Courts Squash and Fitness Center. Cross Courts now boasts one of the most active Junior Programs in the country with over 175 juniors. Cross Courts also has a very active adult program. The Club has (4) International Squash Courts, (4) Squash Professionals, Fitness facilities, Yoga/Stretch Studio, Lounge area and well appointed Locker Rooms.\n\nBesides his service businesses, Warren is the owner of six commercial buildings, totaling approximately 130,000 square feet, in various Natick Business Parks and Needham.\n\nWarren graduated from Belmont Hill School, University of Richmond and received his Executive MBA from Northeastern University. Warren lives in South Natick with his wife and three children. He and his wife also have three beautiful granddaughters.\n\nWarren is a Trustee at Tenacre Country Day School, where he is the Treasurer and Chairs the Finance Committee, a Trustee at Belmont Hill School, where he sits on the Facility Committee and Audit Committee, a Trustee at Babson College, where he is Co-Vice Chair of The Board and is Chair of the Facilities Committee. He has recently joined the Board of Advisors at Newton-Wellesley Hospital. Warren is a former Trustee at Dana Hall School and at Lynchburg College in Virginia.\n\nWarren enjoys spending time with his family, playing paddle tennis, tennis and working out. He also loves spending time at his homes in Jackson, NH and Osterville, MA.",
  },
  {
    id: "warren-cross-iii",
    name: "Warren Cross III",
    title: "Vice President",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "chris-mastrodicasa",
    name: "Chris Mastrodicasa",
    title: "Chief Financial Officer",
    photo: "/images/team/chris-mastrodicasa.png",
    bio: "Chris joined Cross Services Group in October of 2022. With a Business degree from Babson College, focusing on Accounting and Finance, Chris began an entrepreneurial career by joining a first-generation family manufacturing business. Before being named president of the business, Chris was responsible for managing the administrative and financial operations of the company. His involvement in the development of operational strategy, key performance indicators and processes lead to greater responsibilities. His outstanding time-management and organization along with excellent communication, and leadership skills advanced Chris to President of the manufacturing business within four years.\n\nChris is a problem solver with a critical thinker mindset. Working as a change agent he reinvented how the business operated over the course of 35 years by having great insight, inspiration, and influence on key employees, empowering, and supporting them with change implementation and continuous improvement.\n\nAfter the sale of what became a 60-year-old second-generation business Chris found an opportunity to assist another successful family operated company. Utilizing his expansive experience in all business operations Chris was able to bring greater stability to the administrative and financial operations of the company. During his tenure Chris assisted the company in the sale and transitioning of the business to a multimillion-dollar national organization. Working through the due diligence and transition plan Chris helped with the adaptation of new processes and systems.\n\nContributing to the growth and success of others, remaining open to new thoughts and ideas, staying hungry for knowledge, and engaging in the never-ending process of self-improvement brings Chris endless satisfaction.",
  },
  {
    id: "chip-tarbell",
    name: "Chip Tarbell",
    title: "Vice President of Operations",
    photo: null, // [NEEDS INPUT] headshot
    bio: "Chip joined Cross Services Group in July of 2018 and oversees many of the day-to-day projects within the organization. He graduated from St. Lawrence University with a BA in Economics in 1981, where he played Football & ran Track and Field. His career started with local commercial property owner, Haynes Management of Wellesley, running the landscape division of D.M. Bernardi for a number of years, as well as having project management responsibilities on the contracting side. He was Director of Facilities at the Belmont Hill School for 12 years, where he coached football and wrestling.\n\nChip lives in Wakefield with his wife and has two grown children and one grandchild. In his free time, he is an avid New England sports fan and enjoys time in Rockport, MA with his family and friends.",
  },
  {
    id: "campbell-armstrong",
    name: "Campbell Armstrong",
    title: "Business Development and Real Estate Manager",
    photo: "/images/team/campbell-armstrong.png",
    bio: "Campbell joined Cross Services Group in July of 2015 after moving from his hometown Malvern, Pennsylvania. He is responsible for running the ‘New-View’ division, which provides customers with Window Cleaning, Power Washing and Gutter Cleaning services. Being one of the more tenured employees, Campbell provides his insight across many divisions and also oversees the fitness center, Cross Courts. In addition, Campbell has his real estate license and enjoys connecting tenants to Cross’s real estate portfolio and helping clients prepare and sell their home, as well as, supporting and educating them with the process of a new purchase.\n\nHe was previously an Analyst in Investment Manager Services for SEI Investments Company and worked as a Marketing Intern for software company, Scala Inc., while in college. Campbell graduated with a Bachelor of Arts from Lynchburg College and was a four-year member and team captain of the men’s lacrosse team.\n\nIn his free time, Campbell enjoys spending time with his wife and 4 kids, golfing, skiing, playing the guitar and building lifelong connections.",
  },
  {
    id: "megan-griffith",
    name: "Megan Griffith",
    title: "Customer Development Manager",
    photo: "/images/team/megan-griffith.png",
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "grace-silva",
    name: "Grace Silva",
    title: "House Cleaning",
    photo: "/images/team/grace-silva.png",
    bio: "Grace joined Cross Services Group in January of 2020 and manages the residential house cleaning division.\n\nOriginally from São Paulo, Brazil, Grace has an extensive educational background, graduating from College Progresso (2002) in Tech Turismo & Hotelaria and later a degree in Administration & Marketing from University Torricelli (2006). After many years working as an administrative assistant, she joined the public sector in 2008, adding a degree in Financial Management at the College Eniac (2012) and an MBA in Coaching for People Management at Unopar (2016) where she ultimately lead teams for major political campaigns, surrounding São Paulo-Brazil. Working as direct Secretary to the President of a political party and coordinator of political campaigns, she ended her career in Brazil as Director at the Sports Secretariat in Gru, Brazil.\n\nIn 2018, Grace moved to the USA and was able to use her past experiences to start a new form of work. She established a cleaning business for vacation homes, residences and offices and, in 2022, to further her academic curriculum, she added a professional license in house cleaning from ARCSI. Now at Cross Services, she continues to lead and loves working with all types of people.\n\nIn her free time, Grace enjoys spending time with her husband, traveling, seeing family and relaxing.",
    isDivisionHead: true,
  },
  {
    id: "marcio-de-arruda",
    name: "Marcio De Arruda",
    title: "Power Washing, Window Cleaning, Gutter Cleaning",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
    isDivisionHead: true,
  },
  {
    id: "kevin-tiberi",
    name: "Kevin Tiberi",
    title: "Landscaping",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
    isDivisionHead: true,
  },
  {
    id: "brian-rothwell",
    name: "Brian Rothwell",
    title: "Technology",
    photo: "/images/team/brian-rothwell.webp",
    bio: null, // [NEEDS INPUT] bio
    isDivisionHead: true,
  },
  {
    id: "irrigation-lead",
    name: "Irrigation Lead", // [NEEDS INPUT] real name
    title: "Irrigation",
    photo: null, // [NEEDS INPUT] headshot
    bio: null,
    isDivisionHead: true,
  },
  {
    id: "car-detailing-lead",
    name: "Car Detailing Lead", // [NEEDS INPUT] real name
    title: "Car Detailing",
    photo: null, // [NEEDS INPUT] headshot
    bio: null,
    isDivisionHead: true,
  },
  {
    id: "chip-tarbell-painting-handyman",
    name: "Chip Tarbell",
    title: "Painting & Handyman",
    photo: null, // [NEEDS INPUT] headshot
    bio: null,
    isDivisionHead: true,
  },
  {
    id: "chip-tarbell-property-management",
    name: "Chip Tarbell",
    title: "Property Management",
    photo: null, // [NEEDS INPUT] headshot
    bio: null,
    isDivisionHead: true,
  },
  {
    id: "abby-schlom",
    name: "Abby Schlom",
    title: "Executive Assistant",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "michael-fair",
    name: "Michael Fair",
    title: "Business Development",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "tina-boss",
    name: "Tina Boss",
    title: "Office Administrator",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "office-administrator-2",
    name: "", // [NEEDS INPUT] name
    title: "Office Administrator",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
];

/** "Warren Cross Jr." -> "WC". Used for the initials circle. */
export function initialsOf(name: string): string {
  const parts = name
    .replace(/\b(Jr\.?|Sr\.?|II|III|IV)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
