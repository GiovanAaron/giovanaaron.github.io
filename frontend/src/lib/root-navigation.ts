export const projectSlugs = {
  rendesco: "rendesco",
  chatgiopt: "chatgiopt",
  giving: "unifygiving",
  gum: "dont-touch-my-gum",
  carequill: "carequill",
} as const;

export type RootProjectId = keyof typeof projectSlugs;
export type PortfolioView = "home" | "about" | "products";

export function parseRootHash(hash: string): { view: PortfolioView; project: RootProjectId } {
  const slug = hash.replace(/^#/, "").toLowerCase();
  if (slug === "aboutme" || slug === "about-me") return { view: "about", project: "rendesco" };
  if (slug === "projects" || slug === "products" || slug.startsWith("projects-")) {
    const projectSlug = slug.slice("projects-".length);
    const project = (Object.keys(projectSlugs) as RootProjectId[])
      .find(id => projectSlugs[id] === projectSlug || id === projectSlug) ?? "rendesco";
    return { view: "products", project };
  }
  return { view: "home", project: "rendesco" };
}

export function rootHash(view: PortfolioView, project?: RootProjectId): string {
  if (view === "about") return "#aboutme";
  if (view === "products") return project ? `#projects-${projectSlugs[project]}` : "#projects";
  return "";
}
