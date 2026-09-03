export type WorkshopEntry = {
	id: string;
	type: "OFICINA";
	subtype: "DIAGNÓSTICO" | "REPARO" | "INVESTIGAÇÃO" | "DESMONTAGEM TÉCNICA";
	code: string;
	title: string;
	description: string;
	image: string;
	path: string;
	areas: { label: string; tone: string }[];
	keywords: string[];
};

export const workshop: WorkshopEntry[] = [
	{
		id: "dolce-gusto-pj2401b1",
		type: "OFICINA",
		subtype: "REPARO",
		code: "PJ2401B1 / 127 V",
		title: "DOLCE GUSTO PJ2401B1 — RECUPERAÇÃO DE PLACA APÓS LIGAÇÃO EM 220 V",
		description: "Uma cafeteira 127 V aparentemente condenada por sobretensão, investigada por etapas até a recuperação da placa original.",
		image: "/images/oficina/dolce-gusto-pj2401b1/hero.webp",
		path: "/oficina/dolce-gusto-pj2401b1/",
		areas: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Dolce Gusto", "cafeteira", "PJ2401B1", "127 V", "220 V", "220V", "sobretensão", "triac", "BTA316", "BTA204", "MOV", "varistor", "14K271", "placa eletrônica", "reparo", "diagnóstico", "investigação", "lâmpada série", "C17", "C18", "PCB", "eletrônica de potência", "eletrodomésticos"],
	},
];
