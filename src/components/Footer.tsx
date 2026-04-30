const linkSections: [string, string[], string[]][] = [
  [
    "Services",
    ["Brand architecture", "Content engine", "Listing launches", "Paid acquisition", "CRM & follow-up"],
    ["#packages", "#packages", "#packages", "#packages", "#packages"],
  ],
  [
    "Studio",
    ["Why PMO", "Results", "Packages", "Contact"],
    ["#why", "#results", "#packages", "mailto:praise@pmo-media.com"],
  ],
  [
    "Connect",
    ["Instagram", "YouTube", "LinkedIn", "Email"],
    ["#", "#", "#", "mailto:praise@pmo-media.com"],
  ],
];

export default function Footer() {
  return (
    <footer
      className="bg-ink-900 text-bone-200 border-t border-white/[0.06]"
      style={{ padding: "64px 0 32px" }}
    >
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4.5">
              <img
                src="/logo.png"
                alt="PMO Media LLC"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-display font-bold text-lg tracking-[0.04em] text-white">
                PMO MEDIA
              </span>
            </div>
            <p className="text-bone-100/70 text-sm leading-[1.6] max-w-[360px] mb-4">
              PMO Media LLC is a digital brand partner for top-producing realtors, brokerages, and property teams. Brand, content, paid acquisition, and CRM — on retainer.
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:praise@pmo-media.com"
                className="text-forest-300 text-sm hover:text-forest-200"
              >
                praise@pmo-media.com
              </a>
              <a href="tel:+12027094554" className="text-forest-300 text-sm hover:text-forest-200">
                (202) 709-4554
              </a>
            </div>
          </div>
          {linkSections.map(([heading, links, hrefs]) => (
            <div key={heading}>
              <h4 className="caps text-forest-300 mb-4.5">{heading}</h4>
              <ul className="list-none flex flex-col gap-2.5">
                {links.map((l, i) => (
                  <li key={l}>
                    <a
                      href={hrefs[i]}
                      className="text-bone-100/[0.78] text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/[0.08] flex flex-wrap justify-between gap-4 text-bone-100/55 text-[13px]">
          <span>© 2026 PMO Media LLC · All rights reserved</span>
          <span>Washington, DC · Serving markets nationwide</span>
        </div>
      </div>
    </footer>
  );
}