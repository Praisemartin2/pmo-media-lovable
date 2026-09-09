export type WorkItem = {
  id: string;
  title: string;
  kind: "reel" | "series" | "carousel" | "static" | "recap";
  campaign: string;
  video?: string;   // /portfolio/<slug>.mp4
  poster?: string;  // /portfolio/<slug>.jpg
  slides?: string[];
  image?: string;
  blurb: string;
  /** Client the piece was made for. Omitted when the data does not say. */
  client?: string;
};

export const caseStudy = {
  client: "Ekabo Home",
  handle: "@ekabohome",
  market: "Atlanta, GA",
  summary:
    "Investor-friendly realtors with 178 deals closed — and a social presence that didn't match. In 8 weeks PMO produced and published 50 pieces across four platforms: podcast clip reels, educational carousels, a community recap, and See You At 75 — an original five-episode animated series built around their message.",
  window: "Jul – Aug 2026",
  outcomes: [
    "50 finished deliverables in 8 weeks",
    "Followers grew from ~100 to 1,500+ in under 12 months (client-reported)",
    "5-episode original animated series (See You At 75)",
    "Podcast clipped into 30+ vertical reels with beat-mapped b-roll",
  ],
};

export const testimonial = {
  name: "Niyi Adewole",
  role: "Ekabo Home Realty · Atlanta",
  video: "/portfolio/testimonial_niyi.mp4",
  poster: "/portfolio/testimonial_niyi.jpg",
  quote:
    "They took the Ekabo Home Realty team from about a hundred followers to over 1,500 in less than 12 months. When I didn't have material to hand over, they found creative ways to stay aligned with our goals — podcast clips, even an AI cartoon that delivered our message. Highly recommend. They crushed it for us and continue to.",
};

export const work: WorkItem[] = [
  { id: "sya75_ep5", title: "See You At 75 — EP5 “The Shrug”", kind: "series", campaign: "Original animated series", video: "/portfolio/sya75_ep5.mp4", poster: "/portfolio/sya75_ep5.jpg", client: caseStudy.client, blurb: "A lead-magnet episode built on researched real stories — ends on a comment-keyword CTA." },
  { id: "ep169_clip1", title: "Podcast clip — The Cost of Selling Too Soon", kind: "reel", campaign: "Podcast clips", video: "/portfolio/ep169_clip1.mp4", poster: "/portfolio/ep169_clip1.jpg", client: caseStudy.client, blurb: "Host on camera, captions synced to the word, AI b-roll cut to the argument." },
  { id: "victory_sundays", title: "Victory Sundays recap", kind: "recap", campaign: "Community", video: "/portfolio/victory_sundays.mp4", poster: "/portfolio/victory_sundays.jpg", client: caseStudy.client, blurb: "Closing-table wins cut from the archive into a 30-second brand film." },
  { id: "sya75_ep4", title: "See You At 75 — EP4 “New Management”", kind: "series", campaign: "Original animated series", video: "/portfolio/sya75_ep4.mp4", poster: "/portfolio/sya75_ep4.jpg", client: caseStudy.client, blurb: "Office comedy with a financial-freedom spine." },
  { id: "ep169_clip2", title: "Podcast clip — 3 Most Expensive Decisions", kind: "reel", campaign: "Podcast clips", video: "/portfolio/ep169_clip2.mp4", poster: "/portfolio/ep169_clip2.jpg", client: caseStudy.client, blurb: "Sell. Refi. 1031. Know your rules." },
  { id: "sya75_ep3", title: "See You At 75 — EP3 “The Day Off”", kind: "series", campaign: "Original animated series", video: "/portfolio/sya75_ep3.mp4", poster: "/portfolio/sya75_ep3.jpg", client: caseStudy.client, blurb: "Episode three of the series." },
  { id: "carousel_reddit", title: "Reddit story carousel", kind: "carousel", campaign: "Carousels", slides: Array.from({ length: 7 }, (_, i) => `/portfolio/carousels/reddit_mortgage/slide_${i + 1}.jpg`), client: caseStudy.client, blurb: "A viral thread turned into a seven-slide story." },
  { id: "carousel_loans", title: "5 loans every investor should know", kind: "carousel", campaign: "Carousels", slides: Array.from({ length: 5 }, (_, i) => `/portfolio/carousels/5_loans/slide_${i + 1}.jpg`), client: caseStudy.client, blurb: "Educational swipe post in the brand system." },
  { id: "carousel_10checks", title: "10 checks before you buy", kind: "carousel", campaign: "Carousels", slides: Array.from({ length: 7 }, (_, i) => `/portfolio/carousels/10_checks/slide_${i + 1}.jpg`), client: caseStudy.client, blurb: "Checklist carousel." },
  { id: "static_hh", title: "House hacking by the numbers", kind: "static", campaign: "Statics", image: "/portfolio/Ekabo_HouseHacking-By-The-Numbers.jpg", client: caseStudy.client, blurb: "One idea, one frame." },
  { id: "static_rent", title: "Rent is 100% interest", kind: "static", campaign: "Statics", image: "/portfolio/Ekabo_Rent-Is-100pct-Interest.jpg", client: caseStudy.client, blurb: "Quotable static." },
  { id: "woodbury", title: "Summer in the Park — event recap", kind: "recap", campaign: "Client event film", video: "/portfolio/woodbury_recap.mp4", poster: "/portfolio/woodbury_recap.jpg", blurb: "A back-to-school community event cut as a 90s-sitcom-flavored recap (Woodbury Park)." },
];
