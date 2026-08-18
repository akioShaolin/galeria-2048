export const areas = [
	{ label: "ELETRÔNICA", slug: "eletronica", tone: "eletronica" },
	{ label: "PROGRAMAÇÃO", slug: "programacao", tone: "programacao" },
	{ label: "AUTOMAÇÃO", slug: "automacao", tone: "automacao" },
	{ label: "ÁUDIO", slug: "audio", tone: "audio" },
	{ label: "LUTHIERIA", slug: "luthieria", tone: "luthieria" },
	{ label: "EXPERIMENTAÇÃO", slug: "experimentacao", tone: "experimentacao" },
] as const;

export type Area = (typeof areas)[number];
export type AreaSlug = Area["slug"];

export function getArea(slug: string): Area | undefined {
	return areas.find((area) => area.slug === slug);
}

export function getAreaByLabel(label: string): Area | undefined {
	return areas.find((area) => area.label === label);
}

export function getAreaPath(area: Pick<Area, "slug">): string {
	return `/areas/${area.slug}/`;
}
