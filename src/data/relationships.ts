import { archive, type ArchiveItem } from "./archive";

export const relationshipTypes = [
	"evoluiu_para",
	"base_tecnica",
	"contribuiu_para",
	"usado_em_conjunto",
] as const;

export type RelationshipType = (typeof relationshipTypes)[number];

export type ContentRelationship = {
	from: string;
	to: string;
	type: RelationshipType;
	label?: string;
};

export const relationshipLabels: Record<RelationshipType, string> = {
	evoluiu_para: "EVOLUIU PARA",
	base_tecnica: "BASE TÉCNICA",
	contribuiu_para: "CONTRIBUIU PARA",
	usado_em_conjunto: "USADO EM CONJUNTO",
};

// Semântica pública, separada dos nomes históricos usados no cadastro.
// `base_tecnica` descreve atualmente contexto técnico/conceitual, não derivação direta.
export const genealogicalRelationshipTypes: RelationshipType[] = ["evoluiu_para"];
export const influenceRelationshipTypes: RelationshipType[] = ["base_tecnica", "contribuiu_para"];

// Cada ligação é cadastrada uma única vez. O sentido inverso é derivado pelos helpers.
// Relações somente devem entrar aqui depois de confirmação factual do autor.
export const relationships: ContentRelationship[] = [
	{ from: "solarview-ubox", to: "modbus-rtu-slave-sim", type: "base_tecnica" },
	{ from: "modbus-rtu-slave-sim", to: "inverter-modbus-lib", type: "usado_em_conjunto" },
];

export function getRelatedArchiveItem(id: string): (ArchiveItem & { url: string }) | undefined {
	return archive.find((item): item is ArchiveItem & { url: string } => item.id === id && Boolean(item.url));
}

function hasPublishedEndpoints(relation: ContentRelationship): boolean {
	return Boolean(getRelatedArchiveItem(relation.from) && getRelatedArchiveItem(relation.to));
}

export function getIncomingRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.type !== "usado_em_conjunto" && relation.to === id && hasPublishedEndpoints(relation)
	);
}

export function getOutgoingRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.type !== "usado_em_conjunto" && relation.from === id && hasPublishedEndpoints(relation)
	);
}

export function getParallelRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.type === "usado_em_conjunto" &&
		(relation.from === id || relation.to === id) &&
		hasPublishedEndpoints(relation)
	);
}

export function getAncestorRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		genealogicalRelationshipTypes.includes(relation.type) && relation.to === id && hasPublishedEndpoints(relation)
	);
}

export function getDescendantRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		genealogicalRelationshipTypes.includes(relation.type) && relation.from === id && hasPublishedEndpoints(relation)
	);
}

export function getInfluenceRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		influenceRelationshipTypes.includes(relation.type) &&
		(relation.from === id || relation.to === id) &&
		hasPublishedEndpoints(relation)
	);
}
