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
		id: "controle-iluminacao-bancada",
		type: "PROJETO",
		number: "008",
		title: "CONTROLE DE ILUMINAÇÃO DA BANCADA",
		description: "O Infinity Light de 2023 retomado como um sistema PWM útil, conectado e melhor documentado para a bancada.",
		image: "/images/controle-iluminacao-bancada/bancada-pronta.webp",
		path: "/projetos/controle-iluminacao-bancada/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Infinity Light", "iluminação de bancada", "ESP8266", "NodeMCU", "PWM", "MOSFET", "IRFZ44N", "fita de LED", "WebSocket", "Wi-Fi Manager", "mDNS", "EEPROM", "curva gamma", "controle por áudio", "placa ilhada", "Fritzing", "12 V"],
		page: {
			code: "INFINITY LIGHT",
			subtitle: "Um projeto de iluminação pensado para o quarto, interrompido por falta de planejamento e retomado três anos depois como uma ferramenta real de bancada.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "ORIGEM", value: "2023 / INFINITY LIGHT" },
				{ label: "RETOMADA", value: "2026 / BANCADA" },
				{ label: "MÍDIA ATUAL", value: "BANCADA DOCUMENTADA" },
			],
			timeline: [
				{ year: "2023", title: "Infinity Light", text: "A ideia de iluminar o quarto combinava fitas de LED, ESP8266, PWM e controle pelo celular." },
				{ year: "2023", title: "Primeira execução", text: "Cerca de 13 metros de fita funcionaram, mas a instalação com fontes e fiação expostas não era segura nem definitiva." },
				{ year: "2023", title: "Documentação interrompida", text: "Testes, placa e planejamento avançaram, mas a execução era mais natural do que transformar o processo em um registro consistente." },
				{ year: "2026", title: "Do quarto à bancada", text: "O escopo mudou para uma iluminação PWM útil na bancada construída com materiais reaproveitados." },
				{ year: "AGORA", title: "Controle unificado", text: "Interface web, WebSocket e automações experimentais compartilham comandos SET:0 a SET:100." },
			],
			specifications: [
				{ name: "Controlador", value: "ESP8266 / NodeMCU" },
				{ name: "Potência", value: "Driver de MOSFET / IRFZ44N" },
				{ name: "Iluminação", value: "Fita de LED 12 V" },
				{ name: "Interface", value: "Web + WebSocket" },
				{ name: "Comando lógico", value: "SET:0 a SET:100" },
				{ name: "Estado", value: "Último percentual em EEPROM" },
			],
		},
	},
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
		id: "555-discreto",
		type: "PROJETO",
		number: "002",
		title: "555 DISCRETO",
		description: "Um temporizador 555 reconstruído com transistores e resistores para estudar o circuito por dentro.",
		image: "/images/555-discreto/placa-montada.jpg",
		path: "/projetos/555-discreto/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["555 discreto", "NE555", "timer", "temporizador", "transistores", "eletrônica analógica", "Fritzing", "PCB", "circuito discreto"],
		page: {
			code: "555 DISCRETO",
			subtitle: "Uma tentativa de reconstruir o temporizador 555 em escala visível para entender a roda por dentro — inclusive onde ela deixou de girar.",
			status: [
				{ label: "STATUS", value: "● PAUSADO", tone: "experimentacao" },
				{ label: "INÍCIO", value: "2020" },
				{ label: "RESULTADO", value: "PROTÓTIPO NÃO VALIDADO" },
			],
			timeline: [
				{ year: "2020", title: "Redesenho", text: "O circuito de referência foi refeito no Fritzing e organizado como uma placa didática de componentes PTH." },
				{ year: "2020", title: "Fabricação", text: "Dez placas foram fabricadas no exterior depois que o orçamento nacional se mostrou incompatível com o caráter de protótipo do projeto." },
				{ year: "MONTAGEM", title: "Estrutura em escala", text: "Bornes banana e pernas impressas em 3D aproximaram visualmente a placa de um circuito integrado de oito pinos." },
				{ year: "TESTE", title: "Um pulso e travamento", text: "Na configuração astável, o circuito produziu um único acionamento próximo ao intervalo RC esperado e depois permaneceu travado." },
				{ year: "PRÓXIMA ETAPA", title: "Diagnóstico por blocos", text: "A retomada depende de revisar esquema, pinagens, limiares, latch, descarga e continuidade antes de uma nova revisão de placa." },
			],
			specifications: [
				{ name: "Arquitetura", value: "555 com componentes discretos" },
				{ name: "Montagem", value: "Transistores e resistores PTH" },
				{ name: "Placa", value: "75 × 100 mm" },
				{ name: "Conexões", value: "Bornes banana fêmea" },
				{ name: "Projeto eletrônico", value: "Fritzing" },
				{ name: "Lote fabricado", value: "10 PCBs" },
			],
		},
	},
	{
		id: "dms-portable-logger",
		type: "PROJETO",
		number: "006",
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
		id: "pd-01",
		type: "PROJETO",
		number: "004",
		title: "MINI FUZZ DO BERTOLA",
		description: "Meu primeiro pedal: um fuzz em placa universal, funcional na eletrônica e inacabado na mecânica.",
		image: "/images/pd-01/montagem-fechada.jpg",
		path: "/projetos/pd-01/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "ÁUDIO", tone: "audio" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["fuzz", "pedal", "guitarra", "baixo", "áudio analógico", "transistor", "Darlington", "C945", "placa universal", "GTR-01", "Bertola", "Darta Effects"],
		page: {
			code: "PD-01",
			subtitle: "Meu primeiro pedal: um fuzz construído em placa universal, modificado com os componentes que eu tinha e testado na guitarra e no baixo.",
			status: [
				{ label: "CIRCUITO", value: "● FUNCIONAL", tone: "audio" },
				{ label: "DESIGN NO FRITZING", value: "DOCUMENTADO" },
				{ label: "USO EM SHOW", value: "REALIZADO / 21.06.2024" },
				{ label: "ESQUEMÁTICO FINAL", value: "PENDENTE" },
			],
			timeline: [
				{ year: "2024", title: "Construção do PD-01", text: "O circuito foi redesenhado no Fritzing e montado em placa universal com os componentes disponíveis, provavelmente por volta de março." },
				{ year: "2024", title: "Testes na GTR-01", text: "A eletrônica funcional foi registrada em uso com a guitarra." },
				{ year: "2024", title: "Testes no baixo", text: "O fuzz também foi testado no instrumento que motivou parte da experiência." },
				{ year: "21/06/2024", title: "Show em Guaíra", text: "O PD-01 foi usado no baixo durante uma apresentação real da banda." },
				{ year: "FUTURO", title: "Completar a documentação", text: "Localizar ou reconstruir com segurança o esquemático correspondente exatamente à versão montada." },
			],
			specifications: [
				{ name: "Circuito-base", value: "Mini Fuzz do Bertola" },
				{ name: "Transistores", value: "2 × C945 em Darlington" },
				{ name: "Diodo", value: "1N4148" },
				{ name: "Capacitores de sinal", value: "220 nF na entrada e na saída" },
				{ name: "Controles", value: "Volume e ganho" },
				{ name: "Montagem", value: "Placa universal" },
				{ name: "Alimentação", value: "Bateria de 9 V" },
			],
		},
	},
	{
		id: "pd-02",
		type: "PROJETO",
		number: "005",
		title: "AMPLIFICADOR JFET",
		description: "Um pré-amplificador simples que mudou a forma como eu ouvia minha guitarra e despertou novas perguntas sobre amplificação.",
		image: "/images/pd-02/montagem-completa.jpg",
		path: "/projetos/pd-02/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "ÁUDIO", tone: "audio" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["PD-02", "JFET", "BF245C", "pré-amplificador", "amplificador", "guitarra", "baixo", "áudio", "eletrônica analógica", "common source", "fonte comum", "clipping", "hard clipping", "soft clipping", "distorção", "9 V", "placa universal", "Professor Bairros"],
		page: {
			code: "PD-02",
			subtitle: "Um pré-amplificador simples com JFET que transformou o som da minha guitarra e abriu meus ouvidos para outra forma de amplificação.",
			status: [
				{ label: "CIRCUITO", value: "● FUNCIONAL", tone: "audio" },
				{ label: "MONTAGEM EM PLACA", value: "CONCLUÍDA" },
				{ label: "GABINETE", value: "NÃO DESENVOLVIDO" },
				{ label: "DOCUMENTAÇÃO", value: "HISTÓRICA" },
			],
			timeline: [
				{ year: "ORIGEM", title: "Circuito do Professor Bairros", text: "Um estágio JFET simples de 9 V se tornou o ponto de partida para a montagem." },
				{ year: "MONTAGEM", title: "Placa universal", text: "O circuito funcional foi transferido para uma placa perfurada com potenciômetro, jacks e bateria externos." },
				{ year: "GUITARRA", title: "Uma resposta marcante", text: "O som limpo e a transição para a distorção despertaram interesse por JFETs, válvulas e clipping." },
				{ year: "BAIXO", title: "Outra resposta", text: "O resultado mais quadrado e desagradável levantou hipóteses sobre nível de entrada, polarização e headroom." },
				{ year: "ESTADO ATUAL", title: "Funcional, sem gabinete", text: "O circuito cumpriu sua função nos testes domésticos, mas nunca recebeu case definitivo nem foi usado em show." },
			],
			specifications: [
				{ name: "Topologia", value: "JFET em fonte comum" },
				{ name: "Transistor de referência", value: "BF245C" },
				{ name: "Alimentação", value: "9 V" },
				{ name: "RD / RS / RG", value: "1 kΩ / 220 Ω / 120 kΩ" },
				{ name: "C1 / C2", value: "10 µF / 10 µF" },
				{ name: "Construção", value: "Placa universal sem gabinete" },
			],
		},
	},
	{
		id: "inverter-modbus-lib",
		type: "PROJETO",
		number: "007",
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
		number: "003",
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
].sort((first, second) => Number(second.number) - Number(first.number));

export function getProject(id: string): Project | undefined {
	return projects.find((project) => project.id === id);
}
