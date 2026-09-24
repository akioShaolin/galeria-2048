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
		id: "sniffing-usb-wireshark",
		type: "ARTIGO / REFERÊNCIA TÉCNICA",
		code: "USB / HID",
		label: "ARTIGO / INVESTIGAÇÃO DE PROTOCOLO",
		title: "DO MOVIMENTO AOS BYTES — EXPLORANDO USB HID COM WIRESHARK",
		description: "Um experimento com Wireshark e USBPcap que transformou movimentos do mouse, teclas e modificadores em bytes observáveis — e mostrou quanto trabalho existe entre capturar e compreender.",
		image: "/images/artigos/sniffing-usb-wireshark/wireshark-usb-hid-cover.png",
		path: "/artigos/sniffing-usb-wireshark/",
		areas: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Wireshark", "USBPcap", "USB", "HID", "sniffer", "engenharia reversa", "protocolos", "mouse", "teclado", "URB_INTERRUPT", "PCAPNG", "diagnóstico"],
	},
	{
		id: "sk1-project",
		type: "ARTIGO / REFERÊNCIA TÉCNICA",
		code: "SK1",
		label: "ARTIGO / EXPERIÊNCIA OPEN SOURCE",
		title: "sK1 Project",
		description: "Uma ferramenta que entrou no meu trabalho em 2020 e, anos depois, tornou-se também uma comunidade open source para a qual comecei a contribuir.",
		image: "/images/artigos/sk1-project/sk1-project-logo.png",
		path: "/artigos/sk1-project/",
		areas: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["sK1", "sK1 Project", "open source", "software livre", "GitHub", "Python", "wxPython", "contribuição", "comunidade", "IA", "Codex", "ChatGPT", "desenho vetorial", "energia solar"],
	},
	{
		id: "ed100-hardware-rs485",
		type: "ARTIGO / REFERÊNCIA TÉCNICA",
		code: "ED100",
		label: "ARTIGO / REFERÊNCIA TÉCNICA",
		title: "ED100 — DO PRIMEIRO BLINK A UMA PLATAFORMA DE EXPERIMENTAÇÃO",
		description: "Exploração independente do hardware ED100: do mapeamento e primeiro firmware próprio aos testes com LEDs que abriram caminho para projetos posteriores.",
		image: "/images/artigos/ed100/ed100-hardware.jpg",
		path: "/artigos/ed100-hardware-rs485/",
		areas: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["ED100", "ESP32", "ESP32-WROOM-32E", "firmware", "blink", "LED", "UART", "bootloader", "RS485", "mapeamento de hardware", "reaproveitamento", "engenharia reversa", "experimentação"],
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
