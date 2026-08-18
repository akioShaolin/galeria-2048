import { articles } from "./articles";
import { projects } from "./projects";

export type ArchiveArea = {
	label: string;
	tone: string;
};

export type ArchiveItem = {
	id: string;
	type: string;
	code?: string;
	title: string;
	description: string;
	areas: ArchiveArea[];
	keywords: string[];
	url?: string;
	image?: string;
};

export const archive: ArchiveItem[] = [
	...projects.map((project) => ({
		id: project.id,
		type: project.type,
		code: project.page?.code,
		title: project.title,
		description: project.description,
		areas: project.categories,
		keywords: project.keywords,
		url: project.path,
		image: project.image,
	})),
	...articles.map((article) => ({
		id: article.id,
		type: article.type,
		code: article.code,
		title: article.title,
		description: article.description,
		areas: article.areas,
		keywords: article.keywords,
		url: article.path,
		image: article.image,
	})),
];

export function getArchiveByArea(label: string): ArchiveItem[] {
	return archive.filter((item) => item.areas.some((area) => area.label === label));
}
