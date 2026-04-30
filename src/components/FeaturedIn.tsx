const publications = ["INMAN", "FORBES", "ENTREPRENEUR", "INC.", "HUFFPOST", "YAHOO FINANCE"];

export default function FeaturedIn() {
  return (
    <section className="bg-bone-50 border-t border-ink-900/10" style={{ padding: "64px 0" }}>
      <div className="container-x">
        <div className="text-center mb-8">
          <div className="caps text-ink-600">PMO Media · Featured In</div>
        </div>
        <div className="flex justify-center items-center gap-8 md:gap-14 flex-wrap">
          {publications.map((p) => (
            <span
              key={p}
              className="font-display font-bold text-[22px] tracking-[0.02em] text-ink-500 opacity-70 hover:opacity-100 hover:text-ink-800 transition-all"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}