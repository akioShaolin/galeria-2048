export type Article = {
	id: string;
	type: "ARTIGO / REFERÊNCIA TÉCNICA";
	code: string;
	label: string;
	title: string;
	description: string;
	image: string;
	path: string;
	areas: { label: string; tone: string }[];
	keywords: string[];
};

export const articles: Article[] = [
	{
		id: "ed100-hardware-rs485",
		type: "ARTIGO / REFERÊNCIA TÉCNICA",
		code: "ED100",
		label: "ARTIGO / REFERÊNCIA TÉCNICA",
		title: "ED100 — DE DATALOGGER A PLATAFORMA RS485",
		description: "Mapeamento independente do hardware, desenvolvimento de uma bridge transparente e uso da mesma placa como ferramenta de diagnóstico RS485.",
		image: "/images/artigos/ed100/ed100-hardware.jpg",
		path: "/artigos/ed100-hardware-rs485/",
		areas: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["ED100", "ESP32", "RS485", "bridge", "sniffer", "JBD", "BMS", "datalogger", "engenharia reversa"],
	},
	{
		id: "solarview-ubox",
		type: "ARTIGO / REFERÊNCIA TÉCNICA",
		code: "UBOX",
		label: "ARTIGO / REFERÊNCIA TÉCNICA",
		title: "SOLARVIEW UBOX — DO PRIMEIRO LED AO MODBUS",
		description: "Mapeamento independente e reaproveitamento experimental de um datalogger baseado em ESP-07/ESP8266, do primeiro firmware próprio às ferramentas Modbus.",
		image: "/images/artigos/ubox/ubox-exterior.jpg",
		path: "/artigos/solarview-ubox/",
		areas: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["SolarView", "uBox", "AWC", "AWC03", "ESP8266", "ESP-07", "datalogger", "Arduino", "GPIO2", "RS485", "Modbus", "firmware", "engenharia reversa", "mapeamento de hardware", "reaproveitamento"],
	},
];
