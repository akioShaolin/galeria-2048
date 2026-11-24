import { archive, type ArchiveItem } from "./archive";

export const relationshipKinds = ["parentesco", "influencia", "paralelo"] as const;

export type RelationshipKind = (typeof relationshipKinds)[number];

export type ContentRelationship = {
	id: string;
	source: string;
	target: string;
	kind: RelationshipKind;
	subtype?: string;
	label?: string;
	description?: string;
};

export const relationshipLabels: Record<RelationshipKind, string> = {
	parentesco: "PARENTESCO",
	influencia: "INFLUÊNCIA",
	paralelo: "PARALELO",
};

// Cada ligação é cadastrada uma única vez. O sentido inverso é derivado pelos helpers.
// Relações somente devem entrar aqui depois de confirmação factual do autor.
export const relationships: ContentRelationship[] = [
	{
		id: "rtc-ds1307__solarview-ubox",
		source: "rtc-ds1307",
		target: "solarview-ubox",
		kind: "influencia",
		subtype: "conhecimento_reutilizado",
		label: "CONHECIMENTO REUTILIZADO NA IDENTIFICAÇÃO",
		description: "O conhecimento adquirido com o RTC DS1307 foi reutilizado na identificação do circuito presente no SolarView uBox.",
	},
	{
		id: "monza-ignicao-emergencial__carregador-supervisionado",
		source: "monza-ignicao-emergencial",
		target: "carregador-supervisionado",
		kind: "influencia",
		subtype: "desdobramento",
		label: "NASCEU DURANTE O DIAGNÓSTICO",
		description: "A bateria enfraquecida durante o diagnóstico do Monza criou a necessidade que deu origem ao carregador.",
	},
	{
		id: "sniffing-usb-wireshark__tr-serial-proxy",
		source: "sniffing-usb-wireshark",
		target: "tr-serial-proxy",
		kind: "parentesco",
		subtype: "desdobramento",
		label: "DERIVADO DO ARTIGO",
		description: "A investigação sobre captura de tráfego USB levou ao desenvolvimento de uma ferramenta própria para observar comunicação serial.",
	},
	{
		id: "solarview-ubox__sniffer-rs485",
		source: "solarview-ubox",
		target: "sniffer-rs485",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O hardware do SolarView uBox foi reaproveitado no desenvolvimento do sniffer RS-485.",
	},
	{
		id: "modbus-reader-writer__esp07-jbd-bms-monitor",
		source: "modbus-reader-writer",
		target: "esp07-jbd-bms-monitor",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O hardware do SolarView uBox foi transformado em uma plataforma de monitoramento para o BMS JBD utilizando as escritas e leituras.",
	},
	{
		id: "esp07-jbd-bms-monitor__dms-portable-logger",
		source: "esp07-jbd-bms-monitor",
		target: "dms-portable-logger",
		kind: "influencia",
		subtype: "inspiracao",
		label: "INSPIROU O LOGGER",
		description: "O monitor embarcado veio antes do DMS Portable Logger e inspirou sua abordagem de registro independente.",
	},
	{
		id: "solarview-ubox__ed100-hardware-rs485",
		source: "solarview-ubox",
		target: "ed100-hardware-rs485",
		kind: "influencia",
		subtype: "metodo",
		label: "CONTRIBUIU PARA A INVESTIGAÇÃO",
		description: "A experiência adquirida com o SolarView uBox influenciou a investigação posterior do hardware ED100.",
	},
	{
		id: "ed100-hardware-rs485__dms-portable-logger",
		source: "ed100-hardware-rs485",
		target: "dms-portable-logger",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE ED100 REAPROVEITADO",
		description: "Unidades ED100 foram reaproveitadas fisicamente como base do DMS Portable Logger.",
	},
	{
		id: "modbus-reader-writer__modbus-rtu-slave-sim",
		source: "modbus-reader-writer",
		target: "modbus-rtu-slave-sim",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O hardware do SolarView uBox foi reaproveitado fisicamente para construir o simulador Modbus RTU utilizando escritas e leituras.",
	},
	{
		id: "modbus-rtu-slave-sim__inverter-modbus-lib",
		source: "modbus-rtu-slave-sim",
		target: "inverter-modbus-lib",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "USADOS EM CONJUNTO",
		description: "O simulador Modbus RTU é usado para testar a InverterModbusLib; os dois projetos cumprem papéis complementares na mesma bancada.",
	},
	{
		id: "modbus-reader-writer__grid-export-lab",
		source: "modbus-reader-writer",
		target: "grid-export-lab",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O hardware do SolarView uBox foi reaproveitado como parte do laboratório de controle de exportação.",
	},
	{
		id: "grid-export-lab__inverter-modbus-lib",
		source: "grid-export-lab",
		target: "inverter-modbus-lib",
		kind: "influencia",
		subtype: "limitacao_descoberta",
		label: "MOTIVOU A REVISÃO NÃO BLOQUEANTE",
		description: "As necessidades observadas no Grid Export Lab motivaram a revisão não bloqueante da InverterModbusLib.",
	},
	{
		id: "esp07-jbd-bms-monitor__tr-serial-proxy",
		source: "esp07-jbd-bms-monitor",
		target: "tr-serial-proxy",
		kind: "influencia",
		subtype: "conhecimento_reaproveitado",
		label: "CONHECIMENTO REAPROVEITADO",
		description: "O protocolo observado no Monitor levaram ao entendimento mais completo aplicado ao Serial Proxy.",
	},
	{
		id: "sniffer-rs485__bridge-ttl-rs485",
		source: "sniffer-rs485",
		target: "bridge-ttl-rs485",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O Hardware do ED100 foi reaproveitado na Bridge",
	},
	{
		id: "ed100-hardware-rs485__bridge-ttl-rs485",
		source: "ed100-hardware-rs485",
		target: "bridge-ttl-rs485",
		kind: "parentesco",
		subtype: "conhecimento_reaproveitado",
		label: "A BRIDGE TTL-RS485 CONTÉM UM MODO SNIFFER",
		description: "Não só uma ponte entre meios físicos, mas uma ferramenta de engenharia reversa.",
	},
	{
		id: "gtr-01__pd-01",
		source: "gtr-01",
		target: "pd-01",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "UTILIZADOS JUNTOS",
		description: "Inseria um som de distorção pesada, bem característico.",
	},
	{
		id: "gtr-01__pd-02",
		source: "gtr-01",
		target: "pd-02",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "UTILIZADOS JUNTOS",
		description: "Deixava o som da guitarra Clean ou com leve distorção. Muito bem juntos",
	},
	{
		id: "gtr-01__controle-iluminacao-bancada",
		source: "gtr-01",
		target: "controle-iluminacao-bancada",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "UTILIZADOS JUNTOS",
		description: "Antes de se tornar um projeto de bancada, participaram juntos de apresentações",
	},
	{
		id: "greenway-bms-rs485__bridge-ttl-rs485",
		source: "greenway-bms-rs485",
		target: "bridge-ttl-rs485",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "UTILIZADOS JUNTOS",
		description: "A bridge TTL-RS485 foi utilizada para se comunicar com a bateria Greenway.",
	},
	{
		id: "solarview-ubox__modbus-reader-writer",
		source: "solarview-ubox",
		target: "modbus-reader-writer",
		kind: "parentesco",
		subtype: "hardware_reaproveitado",
		label: "HARDWARE REAPROVEITADO",
		description: "O Solar View foi utilizado para conseguir ler e escrever registradores em Modbus/RS485",
	},
	{
		id: "sniffer-rs485__modbus-reader-writer",
		source: "sniffer-rs485",
		target: "modbus-reader-writer",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "OBSERVAR E INTERAGIR COM O MESMO BARRAMENTO",
		description: "Enquanto o Reader / Writer gerava e interpretava transações Modbus, o Sniffer observava passivamente os bytes presentes no RS485. Os dois foram desenvolvidos no mesmo contexto de investigação e cumpriam papéis complementares",
	},
	{
		id: "pd-01__a-pa-em-220v",
		source: "pd-01",
		target: "a-pa-em-220v",
		kind: "paralelo",
		subtype: "ferramentas_complementares",
		label: "COMPARTILHARAM SHOWS",
		description: "Já foram utilizadas no mesmo show",
	},
];

export function getRelatedArchiveItem(id: string): (ArchiveItem & { url: string }) | undefined {
	return archive.find((item): item is ArchiveItem & { url: string } => item.id === id && Boolean(item.url));
}

function hasPublishedEndpoints(relation: ContentRelationship): boolean {
	return Boolean(getRelatedArchiveItem(relation.source) && getRelatedArchiveItem(relation.target));
}

export function getIncomingRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind !== "paralelo" && relation.target === id && hasPublishedEndpoints(relation)
	);
}

export function getOutgoingRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind !== "paralelo" && relation.source === id && hasPublishedEndpoints(relation)
	);
}

export function getParallelRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind === "paralelo" &&
		(relation.source === id || relation.target === id) &&
		hasPublishedEndpoints(relation)
	);
}

export function getAncestorRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind === "parentesco" && relation.target === id && hasPublishedEndpoints(relation)
	);
}

export function getDescendantRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind === "parentesco" && relation.source === id && hasPublishedEndpoints(relation)
	);
}

export function getInfluenceRelations(id: string): ContentRelationship[] {
	return relationships.filter((relation) =>
		relation.kind === "influencia" &&
		(relation.source === id || relation.target === id) &&
		hasPublishedEndpoints(relation)
	);
}

export function validateRelationships(relations = relationships): void {
	const knownIds = new Set(archive.map((item) => item.id));
	const publishedIds = new Set(archive.filter((item) => Boolean(item.url)).map((item) => item.id));
	const relationshipIds = new Set<string>();
	const directedKeys = new Set<string>();
	const parallelKeys = new Set<string>();
	const parentPairs = new Set<string>();
	const influencePairs = new Set<string>();
	const errors: string[] = [];

	for (const relation of relations) {
		const prefix = `[monster-hub] Relação "${relation.id}"`;

		if (!relation.id.trim()) errors.push("[monster-hub] Relação com ID vazio.");
		if (relationshipIds.has(relation.id)) errors.push(`${prefix}: ID duplicado.`);
		relationshipIds.add(relation.id);

		if (!knownIds.has(relation.source)) errors.push(`${prefix}: origem desconhecida "${relation.source}".`);
		if (!knownIds.has(relation.target)) errors.push(`${prefix}: destino desconhecido "${relation.target}".`);
		if (knownIds.has(relation.source) && !publishedIds.has(relation.source)) errors.push(`${prefix}: origem sem rota publicada "${relation.source}".`);
		if (knownIds.has(relation.target) && !publishedIds.has(relation.target)) errors.push(`${prefix}: destino sem rota publicada "${relation.target}".`);
		if (relation.source === relation.target) errors.push(`${prefix}: autorrelação não é permitida.`);

		if (relation.kind === "paralelo") {
			const parallelKey = [relation.source, relation.target].sort().join("::");
			if (parallelKeys.has(parallelKey)) errors.push(`${prefix}: paralelo simétrico duplicado.`);
			parallelKeys.add(parallelKey);
		} else {
			const directedKey = `${relation.kind}::${relation.source}::${relation.target}`;
			if (directedKeys.has(directedKey)) errors.push(`${prefix}: relação direcionada duplicada.`);
			directedKeys.add(directedKey);
		}

		const pair = `${relation.source}::${relation.target}`;
		if (relation.kind === "parentesco") parentPairs.add(pair);
		if (relation.kind === "influencia") influencePairs.add(pair);
	}

	for (const pair of parentPairs) {
		if (influencePairs.has(pair)) {
			errors.push(`[monster-hub] Conflito: "${pair}" está cadastrado como parentesco e influência.`);
		}
	}

	const parentGraph = new Map<string, string[]>();
	for (const relation of relations.filter(({ kind }) => kind === "parentesco")) {
		parentGraph.set(relation.source, [...(parentGraph.get(relation.source) ?? []), relation.target]);
	}

	const visited = new Set<string>();
	const visiting = new Set<string>();
	const stack: string[] = [];
	const visit = (node: string): void => {
		if (visiting.has(node)) {
			const cycleStart = stack.indexOf(node);
			const cycle = [...stack.slice(cycleStart), node].join(" -> ");
			errors.push(`[monster-hub] Ciclo de parentesco detectado: ${cycle}.`);
			return;
		}
		if (visited.has(node)) return;

		visiting.add(node);
		stack.push(node);
		for (const child of parentGraph.get(node) ?? []) visit(child);
		stack.pop();
		visiting.delete(node);
		visited.add(node);
	};

	for (const node of parentGraph.keys()) visit(node);

	if (errors.length) throw new Error(errors.join("\n"));
}

validateRelationships();
