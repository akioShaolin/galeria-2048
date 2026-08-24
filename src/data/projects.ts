export type ProjectCategory = {
	label: string;
	tone: string;
};

export type ProjectStatus = {
	label: string;
	value: string;
	tone?: string;
};

export type ProjectTimelineEntry = {
	year: string;
	title: string;
	text: string;
};

export type ProjectSpecification = {
	name: string;
	value: string;
};

export type Project = {
	id: string;
	type: "PROJETO" | "EXPERIMENTO";
	number: string;
	title: string;
	description: string;
	image: string;
	path?: string;
	categories: ProjectCategory[];
	keywords: string[];
	page?: {
		code: string;
		subtitle: string;
		status: ProjectStatus[];
		timeline: ProjectTimelineEntry[];
		specifications: ProjectSpecification[];
	};
};

export const projects: Project[] = [
	{
		id: "gtr-01",
		type: "PROJETO",
		number: "001",
		title: "GUITARRA",
		description: "Instrumentos, elétrica, modificações e restauração.",
		image: "/images/gtr-01.jpeg",
		path: "/projetos/gtr-01/",
		categories: [
			{ label: "LUTHIERIA", tone: "luthieria" },
			{ label: "ÁUDIO", tone: "audio" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
		],
		keywords: ["guitarra", "captadores", "humbucker", "mini humbucker", "single coil", "bambu", "blindagem", "JFET", "ponte", "luthieria elétrica"],
		page: {
			code: "GTR-01",
			subtitle: "Uma guitarra em constante reconstrução. Um projeto que começou muito antes de existir um lugar para documentá-lo.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "luthieria" },
				{ label: "INÍCIO", value: "DÉCADA DE 2010" },
				{ label: "ÚLTIMA ATUALIZAÇÃO", value: "2026" },
			],
			timeline: [
				{
					year: "—",
					title: "Antes da Galeria",
					text: "A guitarra já carregava uma história de anos, passando por uso, modificações e períodos parada. Esta página começa como uma tentativa de reconstruir e documentar essa trajetória.",
				},
				{
					year: "2026",
					title: "Retomando o projeto",
					text: "Desmontagem, limpeza e avaliação geral do instrumento. A partir daqui, as alterações deixam de existir apenas como lembranças e começam a ser registradas.",
				},
				{
					year: "2026",
					title: "Nova configuração elétrica",
					text: "Revisão completa da elétrica, substituição de componentes, blindagem e experimentação com diferentes configurações de captadores e controles.",
				},
				{
					year: "2026",
					title: "Peças e acabamento",
					text: "Desenvolvimento de novas molduras, tampa traseira, knobs e outros detalhes mecânicos e estéticos.",
				},
				{
					year: "AGORA",
					title: "Eletrônica ativa",
					text: "Desenvolvimento e experimentação com pré-amplificadores JFET, buscando novas possibilidades sonoras sem abandonar a personalidade do instrumento.",
				},
			],
			specifications: [
				{ name: "Captador do braço", value: "Mini humbucker / dual rail" },
				{ name: "Captador da ponte", value: "Humbucker" },
				{ name: "Potenciômetros", value: "500 kΩ" },
				{ name: "Tone", value: "3,3 nF" },
				{ name: "Controles", value: "Volumes independentes" },
				{ name: "Pré-amplificador", value: "Em desenvolvimento" },
			],
		},
	},
	{
		id: "dms-portable-logger",
		type: "PROJETO",
		number: "005",
		title: "DMS PORTABLE LOGGER",
		description: "Dois ED100 e um gateway read-only registrando o comportamento real de uma bateria DMS em movimento.",
		image: "/images/dms-portable-logger/prototipo-instalado.png",
		path: "/projetos/dms-portable-logger/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["DMS Portable Logger", "DMS", "ED100", "ESP32", "JBD", "BMS", "RS485", "UART", "gateway", "logger", "DMS-Link", "LittleFS", "DMSLOG2", "RTC", "read-only", "diagnóstico de bateria", "SOC", "telemetria", "motocicleta elétrica"],
		page: {
			code: "DMS PORTABLE LOGGER",
			subtitle: "Dois ED100, um BMS JBD e um gateway read-only para registrar o comportamento real de uma bateria durante o uso da motocicleta.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "FIRMWARE DOCUMENTADO", value: "v0.1.0 PRE-RELEASE" },
				{ label: "CORREÇÕES", value: "UNRELEASED / REVALIDAÇÃO PENDENTE" },
			],
			timeline: [
				{ year: "20/08/2026", title: "Estrutura inicial", text: "A arquitetura com dois ED100, os barramentos separados e o formato de registro começou a ser organizada." },
				{ year: "21/08/2026", title: "Validação estacionária", text: "BMS, DMS-Link, resposta ao painel e gravação foram verificados com a motocicleta parada." },
				{ year: "21/08/2026", title: "v0.1.0 pre-release", text: "A primeira versão documentada do firmware foi publicada para preservar o estado testado." },
				{ year: "TESTE DE CAMPO", title: "Percurso de aproximadamente 60 km", text: "O ensaio chegou a 0% de carga e revelou perda prolongada de comunicação com o BMS, reinicialização do Master e uma inconsistência na listagem dos logs." },
				{ year: "PÓS-TESTE", title: "Recuperação e consolidação", text: "Treze DMSLOG2 válidos foram recuperados do LittleFS e os segmentos Master e Slave foram correlacionados." },
				{ year: "UNRELEASED", title: "Correções implementadas", text: "Listagem, exclusão, rotação e política de cache foram corrigidas no código; a revalidação física em bancada permanece pendente." },
			],
			specifications: [
				{ name: "Controladores", value: "2 × ED100 / ESP32-WROOM-32E" },
				{ name: "BMS e painel", value: "RS485 · 9600 baud · 8N1" },
				{ name: "DMS-Link", value: "UART · 230400 baud" },
				{ name: "Armazenamento", value: "LittleFS · DMSLOG2" },
				{ name: "Relógio", value: "PCF8563" },
				{ name: "Política", value: "Somente leitura no BMS" },
			],
		},
	},
	{
		id: "inverter-modbus-lib",
		type: "PROJETO",
		number: "006",
		title: "INVERTER MODBUS LIB",
		description: "Uma camada comum para ler e controlar inversores fotovoltaicos via Modbus RTU.",
		image: "/images/inverter-modbus-lib.svg",
		path: "/projetos/inverter-modbus-lib/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["InverterModbusLib", "Modbus", "Modbus RTU", "RS485", "Arduino", "C++", "ESP8266", "ESP32", "inversor", "inversor fotovoltaico", "energia solar", "export limit", "generation scheduling", "geração programada", "controle de geração", "potência ativa", "setPowerLimit", "setPowerLimitPercent", "map", "descriptor", "feature", "handler", "monitoramento", "controle"],
		page: {
			code: "INVERTER MODBUS LIB",
			subtitle: "Uma biblioteca Arduino/C++ criada para organizar mapas Modbus, padronizar leituras e preparar aplicações de controle de geração com múltiplos inversores.",
			status: [
				{ label: "STATUS", value: "● ALPHA / EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "PLATAFORMA ATUAL", value: "ESP8266" },
				{ label: "BRANCH ATIVA", value: "refactor/nonblocking-modbus" },
			],
			timeline: [
				{ year: "ORIGEM", title: "Mapas específicos", text: "Leituras e comandos eram adaptados novamente a cada fabricante, modelo e mapa Modbus." },
				{ year: "BIBLIOTECA", title: "API comum", text: "Maps, descriptors e features passaram a concentrar as diferenças dos equipamentos." },
				{ year: "AGORA", title: "Barramento não bloqueante", text: "A branch ativa reorganiza as transações para vários inversores compartilharem um barramento sem paralisar o loop principal." },
				{ year: "OBJETIVO", title: "Controle coordenado", text: "A abstração deve servir como base para geração programada e export limit multi-inversor." },
			],
			specifications: [
				{ name: "Linguagem", value: "Arduino / C++" },
				{ name: "Protocolo", value: "Modbus RTU sobre RS485" },
				{ name: "Plataforma validada", value: "ESP8266" },
				{ name: "ESP32", value: "Compatibilidade planejada" },
				{ name: "Arquitetura atual", value: "Não bloqueante por barramento" },
				{ name: "Licença", value: "BSD 3-Clause" },
			],
		},
	},
	{
		id: "optimus-sun",
		type: "PROJETO",
		number: "004",
		title: "OPTIMUS SUN",
		description: "Ferramenta de apoio para analisar combinações entre módulos e inversores fotovoltaicos.",
		image: "/images/optimus-sun/identidade.png",
		path: "/projetos/optimus-sun/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Optimus Sun", "fotovoltaico", "energia solar", "inversor", "módulo fotovoltaico", "dimensionamento", "Excel", "VBA", "Python"],
		page: {
			code: "OPTIMUS SUN",
			subtitle: "Uma ferramenta criada para transformar o dimensionamento entre módulos e inversores fotovoltaicos em um processo mais rápido, reproduzível e fácil de consultar.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "INÍCIO", value: "2022" },
				{ label: "VERSÃO ATUAL", value: "v2.3.8" },
			],
			timeline: [
				{ year: "2022", title: "Excel", text: "Primeira versão criada para agilizar verificações recorrentes entre módulos e inversores." },
				{ year: "POSTERIORMENTE", title: "VBA", text: "Automações foram adicionadas conforme a necessidade de repetir e organizar os cálculos aumentou." },
				{ year: "DEPOIS", title: "Python", text: "Novas formas de organizar e executar os cálculos passaram a ser experimentadas em Python." },
			],
			specifications: [],
		},
	},
];

export function getProject(id: string): Project | undefined {
	return projects.find((project) => project.id === id);
}
