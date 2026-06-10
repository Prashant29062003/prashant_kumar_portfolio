export const SITE = {
  name: "Prashant Kumar",
  url: "https://prashantkumar.dev",
  email: "pkumar.work@outlook.com",
  title: "Software Engineer",
  tagline:
    "Software Engineer focused on backend systems, authentication, and scalable web applications.",
  description:
    "Building production web applications with React, Next.js, Node.js, TypeScript, PostgreSQL, and MongoDB.",
  metaDescription:
    "Building authentication systems, backend APIs, and scalable SaaS foundations.",
  resumeUrl: "/resume.pdf",
} as const;

export const SOCIAL = {
  github: "https://github.com/Prashant29062003",
  linkedin: "https://www.linkedin.com/in/prashant-kumar-374290249/",
} as const;

export interface EmploymentEntry {
  _id: string;
  role: string;
  company: string;
  companyShort: string;
  startDate: string;
  endDate: string;
  current?: boolean;
}

export const EMPLOYMENT: EmploymentEntry[] = [
  {
    _id: "e-sutra",
    role: "Full Stack Developer Intern",
    company: "E-Sutra Technologies Private Limited",
    companyShort: "E-Sutra Technologies",
    startDate: "Jan 2026",
    endDate: "Present",
    current: true,
  },
] as const;

export const NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;
