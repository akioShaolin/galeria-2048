import { archive } from "./archive";
import {
	relationshipLabels,
	relationships,
	validateRelationships,
	type RelationshipKind,
} from "./relationships";

export type MonsterHubNodeData = {
	id: string;
	label: string;
	graphLabel: string;
	type: string;
	code?: string;
	url: string;
	image?: string;
	description: string;
	areas: string[];
};

export type MonsterHubEdgeData = {
	id: string;
	source: string;
	target: string;
	kind: RelationshipKind;
	subtype?: string;
	label: string;
	description?: string;
};

export type MonsterHubGraph = {
	nodes: Array<{ data: MonsterHubNodeData }>;
	edges: Array<{ data: MonsterHubEdgeData }>;
};

export function buildMonsterHubGraph(): MonsterHubGraph {
	validateRelationships();

	const publishedItems = archive
		.filter((item): item is typeof item & { url: string } => Boolean(item.url))
		.sort((a, b) => a.id.localeCompare(b.id, "pt-BR"));
	const publishedIds = new Set(publishedItems.map((item) => item.id));
	const publishedRelationships = relationships
		.filter(({ source, target }) => publishedIds.has(source) && publishedIds.has(target))
		.sort((a, b) => a.id.localeCompare(b.id, "pt-BR"));
	const connectedIds = new Set(
		publishedRelationships.flatMap(({ source, target }) => [source, target]),
	);

	return {
		nodes: publishedItems.filter((item) => connectedIds.has(item.id)).map((item) => ({
			data: {
				id: item.id,
				label: item.title,
				graphLabel: `[ ${item.type.split("/")[0].trim()} ]\n${item.title}`,
				type: item.type,
				code: item.code,
				url: item.url,
				image: item.image,
				description: item.description,
				areas: item.areas.map((area) => area.label),
			},
		})),
		edges: publishedRelationships.map((relation) => ({
				data: {
					id: relation.id,
					source: relation.source,
					target: relation.target,
					kind: relation.kind,
					subtype: relation.subtype,
					label: relation.label ?? relationshipLabels[relation.kind],
					description: relation.description,
				},
			})),
	};
}
