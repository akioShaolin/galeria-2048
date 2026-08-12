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
		page: {
			code: "GTR-01",
			subtitle: "Uma guitarra em constante reconstrução. Um projeto que começou muito antes de existir um lugar para documentá-lo.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "luthieria" },
				{ label: "INÍCIO", value: "ANOS ATRÁS" },
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
		id: "pedal-audio",
		type: "EXPERIMENTO",
		number: "002",
		title: "PEDAL DE ÁUDIO",
		description: "Circuitos analógicos observados da entrada à saída.",
		image: "/images/pedal.svg",
		categories: [
			{ label: "ÁUDIO", tone: "audio" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
		],
	},
	{
		id: "modbus-sniffer",
		type: "PROJETO",
		number: "003",
		title: "MODBUS SNIFFER",
		description: "Monitoramento e diagnóstico de barramentos RS485.",
		image: "/images/sniffer.svg",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
		],
	},
];

export function getProject(id: string): Project | undefined {
	return projects.find((project) => project.id === id);
}
