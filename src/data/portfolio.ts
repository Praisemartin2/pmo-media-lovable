/**
 * Portfolio data. The client hand-picks clips later, so there is no work grid — only the concise
 * Ekabo Home case study and the single real client testimonial.
 */

export const caseStudy = {
  client: "Ekabo Home",
  handle: "@ekabohome",
  market: "Atlanta, GA",
  summary:
    "An investor-focused Atlanta brokerage with a strong track record and a social presence that did not match it. In eight weeks PMO built the system and shipped 50 pieces across four platforms — podcast clips, carousels and See You At 75, an original animated series.",
  window: "Jul – Aug 2026",
  outcomes: [
    "50 pieces produced & published in 8 weeks",
    "Followers ~100 → 1,500+ in under 12 months (client-reported)",
    "5-episode original animated series across 4 platforms",
  ],
  /** One still from the series. Components must paint a gradient behind it in case the file is missing. */
  image: "/portfolio/sya75_ep5.jpg",
  imageAlt: "Still from See You At 75, episode 5 — the original animated series PMO Media produced for Ekabo Home.",
};

export const testimonial = {
  name: "Niyi Adewole",
  role: "Ekabo Home Realty · Atlanta",
  video: "/portfolio/testimonial_niyi.mp4",
  poster: "/portfolio/testimonial_niyi.jpg",
  quote:
    "They took the Ekabo Home Realty team from about a hundred followers to over 1,500 in less than 12 months. When I didn't have material to hand over, they found creative ways to stay aligned with our goals — podcast clips, even an AI cartoon that delivered our message. Highly recommend. They crushed it for us and continue to.",
};
