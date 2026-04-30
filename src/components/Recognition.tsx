const items = [
  "5★ Google Rated",
  "Inman Featured",
  "Top Marketer 2024",
  "Forbes Cited",
  "40+ Brands Partnered",
  "$340M Closed",
];

export default function Recognition() {
  return (
    <section className="bg-bone-200 border-y border-ink-900/10" style={{ padding: "56px 0" }}>
      <div className="container-x">
        <div className="text-center mb-8">
          <div className="caps text-ink-600">Trusted, recognized, reviewed</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {items.map((r) => (
            <div
              key={r}
              className="flex items-center justify-center p-4 bg-bone-50 border border-ink-900/10 rounded min-h-[70px] font-display font-semibold text-[13px] text-ink-700 text-center leading-[1.3]"
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}