import type { Contact } from "@/data/profile";

type HeroProps = {
  name: string;
  role: string;
  tagline: string;
  contacts: Contact[];
  resumeHref: string;
};

export default function Hero({
  name,
  role,
  tagline,
  contacts,
  resumeHref,
}: HeroProps) {
  return (
    <div className="flex min-h-[58vh] flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">{name}</h1>
      <p className="mt-5 text-xl text-[#a1a1aa] md:text-2xl">{role}</p>
      <p className="mt-8 max-w-2xl text-sm text-[#a1a1aa] md:text-base">{tagline}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
        {contacts.map((contact) => (
          <div key={contact.label}>
            {contact.href ? (
              <a
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer" : undefined}
                className="text-[#a1a1aa] transition-colors hover:text-white"
              >
                {contact.label}
              </a>
            ) : (
              <span className="text-[#a1a1aa]">{contact.label}: {contact.value}</span>
            )}
          </div>
        ))}
      </div>

      <a
        href={resumeHref}
        className="mt-10 inline-flex border border-[#27272a] px-5 py-2 text-sm transition-colors hover:border-white"
      >
        Download Resume
      </a>
    </div>
  );
}
