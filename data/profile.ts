export type Contact = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export const profile = {
  name: "Luke Chu",
  role: "Backend Engineer",
  tagline: "Building reliable backend systems and AI-powered applications.",
  resumeHref: "/resume.pdf",
  contacts: [
    {
      label: "Email",
      value: "luke.chu@example.com",
      href: "mailto:luke.chu@example.com",
    },
    {
      label: "Github",
      value: "github.com/luke-chu",
      href: "https://github.com/luke-chu",
      external: true,
    },
    {
      label: "Location",
      value: "Xi'an, China",
    },
  ] satisfies Contact[],
};
