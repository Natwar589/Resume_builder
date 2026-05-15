export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
}

export const resumeTemplates: TemplateConfig[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Ultra-clean layout with maximum whitespace"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate design with a strong header"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated serif design for senior roles"
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Modern two-column layout with a dark sidebar"
  },
  {
    id: "bold",
    name: "Bold",
    description: "Striking single-column design with heavy headers"
  },
  {
    id: "classic",
    name: "Classic",
    description: "Simple single-column ATS resume"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean modern ATS resume"
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense one-page optimized layout"
  },
  {
    id: "two-column",
    name: "Two Column",
    description: "Sidebar layout with clean content hierarchy"
  }
];
