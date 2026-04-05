interface MarqueeProps {
  variant?: "dark" | "light";
}

const items = [
  { text: "GRIP", font: "font-headline text-lg md:text-xl tracking-wider" },
  { text: "Amsterdam", font: "font-sub font-normal text-base md:text-lg" },
  { text: "STRETCH", font: "font-headline text-lg md:text-xl tracking-wider" },
  { text: "Prestatie", font: "font-sub font-normal text-base md:text-lg" },
  { text: "STIJL", font: "font-headline text-lg md:text-xl tracking-wider" },
  { text: "Ontworpen voor jou", font: "font-sub font-normal text-base md:text-lg" },
];

function MarqueeStrip({ text, dot }: { text: string; dot: string }) {
  return (
    <div className="flex-shrink-0 flex whitespace-nowrap">
      {items.map((item, i) => (
        <span
          key={i}
          className={`flex-shrink-0 mx-8 md:mx-12 ${item.font} ${text} flex items-center gap-6 md:gap-8`}
        >
          {item.text}
          <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ variant = "dark" }: MarqueeProps) {
  const bg = variant === "dark" ? "bg-black" : "bg-sand";
  const text = variant === "dark" ? "text-taupe/50" : "text-taupe-dark/50";
  const dot = variant === "dark" ? "bg-taupe/30" : "bg-taupe-dark/30";
  const border = variant === "dark" ? "border-white/5" : "border-taupe/10";

  return (
    <div className={`${bg} py-4 overflow-hidden border-t ${border}`}>
      <div className="flex animate-marquee">
        <MarqueeStrip text={text} dot={dot} />
        <MarqueeStrip text={text} dot={dot} />
        <MarqueeStrip text={text} dot={dot} />
        <MarqueeStrip text={text} dot={dot} />
      </div>
    </div>
  );
}
