import Link from "next/link";

const footerLinks = [
  { label: "Work", href: "/games" },
  { label: "Studio", href: "/studio" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-14 px-7">
      <div className="max-w-[1180px] mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex gap-6 flex-wrap justify-center font-label text-[12px] font-medium uppercase tracking-[0.06em]">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-paper/80 no-underline hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="font-label text-[11.5px] font-medium tracking-[0.06em] text-paper/50 uppercase">
          © 2026 Alejandro Endo · Game developer
        </div>
      </div>
    </footer>
  );
}
