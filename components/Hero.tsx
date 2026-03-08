import type { Contact } from "@/data/profile";

type HeroProps = {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  focus: string[];
  contacts: Contact[];
  resumeHref: string;
};

export default function Hero({
  name,
  role,
  tagline,
  intro,
  focus,
  contacts,
  resumeHref,
}: HeroProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">{name}</h1>
      <p className="mt-4 text-lg text-black/70 md:text-2xl">{role}</p>
      <p className="mt-8 max-w-3xl text-base leading-relaxed text-black/70">{tagline}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/55 md:text-base">{intro}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {focus.map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/15 bg-white px-4 py-1.5 text-xs text-black/65"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
        {contacts.map((contact) => (
          <div key={contact.label} className="text-black/60">
            <span className="mr-2 text-black/40">{contact.label}</span>
            {contact.href ? (
              <a
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer" : undefined}
                className="transition-colors hover:text-black"
              >
                {contact.value}
              </a>
            ) : (
              <span>{contact.value}</span>
            )}
          </div>
        ))}
      </div>

      <a
        href={resumeHref}
        className="mt-10 inline-flex rounded-full border border-black/20 bg-black px-6 py-2.5 text-sm text-white transition-colors hover:bg-black/85"
      >
        下载简历
      </a>
    </div>
  );
}
