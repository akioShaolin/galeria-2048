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
			{ label: "REPARO", tone: "reparo" },
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Dolce Gusto", "cafeteira", "PJ2401B1", "127 V", "220 V", "220V", "sobretensão", "triac", "BTA316", "BTA204", "MOV", "varistor", "14K271", "placa eletrônica", "reparo", "diagnóstico", "investigação", "lâmpada série", "C17", "C18", "PCB", "eletrônica de potência", "eletrodomésticos"],
	},
	{
		id: "caso-2-transposicao-usb",
		type: "OFICINA",
		subtype: "REPARO",
		code: "CASO 2 / W0 ↔ W01",
		title: "CASO 2 — QUANDO A COR DOS FIOS MENTE",
		description: "Uma porta USB danificada, dois chicotes aparentemente compatíveis e uma primeira tentativa que falhou até a pinagem ser reconstruída por função elétrica.",
		image: "/images/oficina/caso-2-transposicao-usb/hero.webp",
		path: "/oficina/caso-2-transposicao-usb/",
		areas: [
			{ label: "REPARO", tone: "reparo" },
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
		],
		keywords: ["WEG", "SIW400G T075 W0", "SIW400G T075 W01", "inversor fotovoltaico", "USB", "stick de comunicação", "pinagem", "continuidade", "chicote", "transposição de terminais", "reparo", "diagnóstico"],
	},
	{
		id: "caso-1-weg-siw400-st075",
		type: "OFICINA",
		subtype: "DIAGNÓSTICO",
		code: "CASO 1 / SIW400 ST075",
		title: "WEG SIW400 ST075 — INVESTIGANDO UM INVERSOR TRIFÁSICO DE 75 kW",
		description: "Um inversor de 75 kW sem histórico confiável, investigado da energização controlada à desmontagem completa para compreender sua arquitetura, seus módulos de potência e os limites do retrabalho.",
		image: "/images/oficina/caso-1-weg-siw400-st075/hero.webp",
		path: "/oficina/caso-1-weg-siw400-st075/",
		areas: [
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["WEG", "SIW400 ST075", "inversor fotovoltaico", "75 kW", "eletrônica de potência", "IGBT", "NXH160T120L2Q2F2S1G", "MPPT", "barramento CC", "diagnóstico", "desmontagem técnica", "estudo de bancada"],
	},
	{
		id: "caso-0-inversores-doadores",
		type: "OFICINA",
		subtype: "REPARO",
		code: "CASO 0 / INVERSORES FV",
		title: "CASO 0 — QUANDO UM INVERSOR VIRA DOADOR DE PEÇAS",
		description: "A origem de uma prática de bancada: diagnosticar falhas localizadas, recuperar peças verificadas e aprender com inversores que já não voltariam ao campo.",
		image: "/images/oficina/caso-0-inversores-doadores/hero.webp",
		path: "/oficina/caso-0-inversores-doadores/",
		areas: [
			{ label: "REPARO", tone: "reparo" },
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["inversor fotovoltaico", "conector FV", "reparo", "diagnóstico", "doador de peças", "reaproveitamento", "eletrônica de potência", "Huawei SUN2000-60KTL-M0", "60 kW", "WEG SIW400 ST075", "manutenção", "energia solar"],
	},
];
