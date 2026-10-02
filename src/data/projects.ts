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
		id: "carregador-supervisionado",
		type: "PROJETO",
		number: "015",
		title: "CARREGADOR V1",
		description: "Uma improvisação para recuperar o Monza virou ferramenta de bancada — e revelou, no uso, por que controlar corrente não basta.",
		image: "/images/carregador-supervisionado/prototipo-funcional.jpg",
		path: "/projetos/carregador-supervisionado/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
			{ label: "REPARO", tone: "reparo" },
		],
		keywords: ["carregador supervisionado", "controle de corrente", "LM324", "MOSFET", "resistor shunt", "bateria chumbo-ácido", "tuktuk", "CC", "CC/CV", "placa perfurada", "bancada", "Monza"],
		page: {
			code: "CARREGADOR V1",
			subtitle: "Do transformador improvisado no Monza a uma ferramenta de bancada útil — e ao incidente que revelou, fisicamente, tudo o que ainda faltava nela.",
			status: [
				{ label: "ESTADO", value: "● FUNCIONAL / SUPERVISIONADO", tone: "eletronica" },
				{ label: "VERSÃO VALIDADA", value: "V1 / PLACA PERFURADA" },
				{ label: "PRINCIPAL LIMITE", value: "SEM TÉRMINO AUTOMÁTICO" },
			],
			timeline: [
				{ year: "ORIGEM", title: "A bateria do Monza", text: "Transformador, diodo e lâmpada H4 formaram a primeira solução para recuperar a bateria e continuar os testes de ignição." },
				{ year: "06–07/2026", title: "V1 funcional", text: "O mesmo transformador ganhou controle analógico de corrente com LM324, MOSFET e resistor shunt." },
				{ year: "TUKTUK", title: "Cinco baterias", text: "Cinco ramos com resistores de 1,2 Ω ajudaram a distribuir a corrente antes do barramento comum." },
				{ year: "USO", title: "Ferramenta de bancada", text: "Além do tuktuk, a V1 foi reutilizada em duas baterias de moto e adiou a compra de um carregador comercial." },
				{ year: "LIMITE", title: "O pack de lítio", text: "Um pack sem BMS foi destruído depois de permanecer conectado durante a noite, expondo a ausência de término e supervisão de tensão." },
				{ year: "DEPOIS", title: "2.0 e 3.0", text: "Dois esquemáticos exploraram arquiteturas mais completas, mas permaneceram como conceito não testado e estudo incompleto." },
			],
			specifications: [
				{ name: "Função validada", value: "Controle analógico de corrente" },
				{ name: "Montagem", value: "Placa perfurada" },
				{ name: "Amplificador operacional", value: "LM324" },
				{ name: "Elemento de potência", value: "MOSFET com dissipador" },
				{ name: "Corrente máxima observada", value: "Aproximadamente 0,93 A" },
				{ name: "Operação", value: "Somente sob supervisão" },
			],
		},
	},
	{
		id: "monza-ignicao-emergencial",
		type: "EXPERIMENTO",
		number: "014",
		title: "MONZA SEM FAÍSCA",
		description: "Uma tentativa real de improvisar a ignição com 555 e MOSFET que não moveu o carro, mas ajudou a isolar um pickup aberto.",
		image: "/images/monza-ignicao-emergencial/capa-hero.png",
		path: "/projetos/monza-ignicao-emergencial/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
			{ label: "REPARO", tone: "reparo" },
		],
		keywords: ["Monza", "ignição eletrônica", "NE555", "IRFZ44N", "bobina impulsora", "pickup", "distribuidor", "Bosch 9 220 087 006", "diagnóstico automotivo", "reparo automotivo", "oscilador", "centelha"],
		page: {
			code: "MONZA / IGNIÇÃO",
			subtitle: "Uma tentativa real de improvisar a ignição com 555 e MOSFET que não colocou o carro em funcionamento, mas ajudou a isolar um pickup aberto.",
			status: [
				{ label: "ESTADO ATUAL", value: "● REPARADO", tone: "reparo" },
				{ label: "VEÍCULO", value: "MONZA SL/E 1988/1989 · 1.8 GASOLINA" },
				{ label: "RESULTADO", value: "EXPERIMENTO ENCERRADO / CAUSA CONFIRMADA" },
			],
			timeline: [
				{ year: "ORIGEM", title: "Depois da lavagem", text: "A limpeza do motor e a troca do conector do distribuidor antecederam a falha que deixou o carro sem centelha." },
				{ year: "DIAGNÓSTICO", title: "Alimentação sem ignição", text: "A bateria e a alimentação da bobina foram verificadas, mas não havia centelha durante a partida." },
				{ year: "EXPERIMENTO", title: "555, MOSFET e bobina", text: "Um oscilador ajustável gerou frequência e centelha em bancada, mas não conseguiu assumir a função da ignição do motor." },
				{ year: "MUDANÇA", title: "Simular o pickup", text: "A investigação passou da bobina para a tentativa de reproduzir o sinal que acionava o módulo original." },
				{ year: "CONFIRMAÇÃO", title: "Pickup aberto", text: "A bobina impulsora apresentou resistência infinita; sua substituição confirmou a causa e devolveu o carro ao funcionamento." },
			],
			specifications: [
				{ name: "Veículo", value: "Chevrolet Monza SL/E 1988/1989" },
				{ name: "Motor", value: "1.8 · gasolina" },
				{ name: "Módulo identificado", value: "Bosch 9 220 087 006" },
				{ name: "Circuito experimental", value: "NE555 + IRFZ44N" },
				{ name: "Falha confirmada", value: "Bobina impulsora / pickup aberto" },
				{ name: "Imobilização", value: "Aproximadamente 10 dias" },
			],
		},
	},
	{
		id: "tr-serial-proxy",
		type: "PROJETO",
		number: "013",
		title: "tr_serialProxy",
		description: "Um proxy serial transparente que registra e retransmite os bytes entre um software e um equipamento, observando somente as portas COM necessárias.",
		image: "/images/tr-serial-proxy/serial-proxy-concept.png",
		path: "/projetos/tr-serial-proxy/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "DIAGNÓSTICO", tone: "diagnostico" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["tr_serialProxy", "proxy serial", "bridge serial", "logger bidirecional", "Python", "pySerial", "com0com", "porta COM", "RS485", "USB-TTL", "JSONL", "engenharia reversa", "diagnóstico"],
		page: {
			code: "tr_serialProxy",
			subtitle: "Do Wireshark a uma ferramenta menor: um proxy serial transparente para registrar e retransmitir somente o tráfego das portas COM escolhidas.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "VERSÃO", value: "0.1.0" },
				{ label: "PLATAFORMA", value: "WINDOWS / PYTHON 3.10+" },
				{ label: "NÚCLEO", value: "PYTHON / PYSERIAL" },
			],
			timeline: [],
			specifications: [
				{ name: "Função", value: "Proxy serial bidirecional" },
				{ name: "Logs", value: "Texto / JSONL reversível" },
				{ name: "Portas", value: "COM virtual + COM física" },
				{ name: "Par virtual validado", value: "COM13 ↔ COM14" },
			],
		},
	},
	{
		id: "vital-registro",
		type: "PROJETO",
		number: "012",
		title: "VITALREGISTRO",
		description: "Um aplicativo Android local e open source para registrar pressão, pulso e peso — de uma necessidade pessoal a um APK documentado e verificável.",
		image: "/images/vital-registro/apresentacao.png",
		path: "/projetos/vital-registro/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["VitalRegistro", "Android", "Python", "Kivy", "SQLite", "pressão arterial", "pulso", "peso", "CSV", "Buildozer", "python-for-android", "Google Colab", "Storage Access Framework", "build reproduzível", "open source"],
		page: {
			code: "VITALREGISTRO",
			subtitle: "Um aplicativo Android open source para registrar pressão arterial, pulso e peso localmente — criado a partir de uma necessidade pessoal e levado até um APK verificável.",
			status: [
				{ label: "STATUS", value: "● PRIMEIRO MARCO FUNCIONAL", tone: "programacao" },
				{ label: "VERSÃO", value: "v0.1.0 / DEBUG" },
				{ label: "PLATAFORMA", value: "ANDROID / ARM64-V8A" },
				{ label: "LICENÇA", value: "MIT" },
			],
			timeline: [
				{ year: "ORIGEM", title: "Onde guardar as medições?", text: "A compra de um aparelho de pressão criou uma necessidade simples: registrar medições com data, horário e observações." },
				{ year: "DESENVOLVIMENTO", title: "Python, Kivy e SQLite", text: "A planilha possível deu lugar a um aplicativo local, editável e sem dependência de servidor." },
				{ year: "BUILD", title: "Do Python ao APK", text: "A mudança do Colab para Python 3.13 exigiu revisar a cadeia com Buildozer, python-for-android, SDK e NDK atuais." },
				{ year: "30/09/2026", title: "Primeiro teste em hardware", text: "Instalação, inicialização, criação, persistência, histórico e gráfico com uma medição foram confirmados no Samsung Galaxy M55 com Android 16." },
				{ year: "v0.1.0", title: "Primeira release pública", text: "O APK debug ARM64 e sua evidência de build formam o primeiro marco funcional publicado." },
			],
			specifications: [
				{ name: "Aplicação", value: "Python / Kivy 2.3.1" },
				{ name: "Persistência", value: "SQLite local" },
				{ name: "Gráficos", value: "Pressão · pulso · peso" },
				{ name: "Períodos", value: "7 dias · 30 dias · todos" },
				{ name: "Exportação Android", value: "CSV / Storage Access Framework" },
				{ name: "Artefato", value: "DEBUG · ARM64-V8A" },
			],
		},
	},
	{
		id: "6ear",
		type: "PROJETO",
		number: "011",
		title: "6ear",
		description: "Um problema de engrenagens em duas fresadoras virou uma experiência com Python — do Tkinter ao Android, passando por combinatória, threads e Buildozer.",
		image: "/images/6ear/marca-6ear.svg",
		path: "/projetos/6ear/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["6ear", "GearSix", "Python", "Tkinter", "Kivy", "Android", "Buildozer", "python-for-android", "engrenagens", "fresadora", "Sanches Blanes", "Victória", "análise combinatória", "permutations", "threads", "Clock.schedule_once", "PyInstaller", "Google Colab"],
		page: {
			code: "6ear",
			subtitle: "Um problema real de oficina que começou com combinações de engrenagens e terminou como aplicativo para Windows e Android.",
			status: [
				{ label: "STATUS", value: "● FUNCIONAL / HISTÓRICO", tone: "programacao" },
				{ label: "ORIGEM", value: "MAIO DE 2025 / CURSO DE MECÂNICA" },
				{ label: "PLATAFORMAS", value: "WINDOWS / ANDROID" },
				{ label: "LICENÇA", value: "MIT" },
			],
			timeline: [
				{ year: "06/05/2025", title: "A pergunta inicial", text: "Uma dúvida de análise combinatória sobre doze tipos de engrenagens deu início ao programa." },
				{ year: "07/05/2025", title: "Desktop e mobile", text: "A implementação em Tkinter já resolvia relações, enquanto começava a discussão sobre levar a ferramenta para o celular." },
				{ year: "12/05/2025", title: "O desafio do APK", text: "Buildozer, python-for-android e a toolchain Android exigiram várias tentativas até a compilação prática no Google Colab." },
				{ year: "13/05/2025", title: "Versão 2.0 e threads", text: "Estoque físico, permutações e processamento em uma worker passaram a aproximar o resultado da oficina sem congelar a interface." },
				{ year: "14/05/2025", title: "Interface Kivy amadurecida", text: "A navegação, os controles de toque e a apresentação tabular consolidaram a versão mobile preservada." },
				{ year: "2026", title: "Recuperação do acervo", text: "Quatro variantes históricas foram reunidas e publicadas sem inventar um histórico Git para o desenvolvimento original." },
			],
			specifications: [
				{ name: "Linguagem", value: "Python" },
				{ name: "Desktop", value: "Tkinter / PyInstaller" },
				{ name: "Mobile", value: "Kivy" },
				{ name: "Android build", value: "Buildozer / python-for-android" },
				{ name: "Cálculo", value: "1, 2 ou 3 pares de engrenagens" },
				{ name: "Máquinas", value: "Sanches Blanes / Victória" },
				{ name: "Critério", value: "Relação alvo + tolerância" },
				{ name: "Processamento mobile", value: "Worker thread + Kivy Clock" },
				{ name: "Licença", value: "MIT" },
			],
		},
	},
	{
		id: "bridge-ttl-rs485",
		type: "PROJETO",
		number: "010",
		title: "BRIDGE TTL/RS485",
		description: "Bridge binária desenvolvida sobre uma placa ED100 reaproveitada para interligar UART TTL e RS485 e apoiar diagnóstico de bancada.",
		image: "/images/bridge-ttl-rs485/esp-rs485-bridge-hardware.webp",
		path: "/projetos/bridge-ttl-rs485/",
		categories: [
			{ label: "ELETRÔNICA", tone: "eletronica" },
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "EXPERIMENTAÇÃO", tone: "experimentacao" },
		],
		keywords: ["Bridge TTL/RS485", "ESP RS485 Bridge", "ED100", "ESP32", "ST485E", "UART", "RS485", "sniffer", "JBD", "BMS", "diagnóstico"],
		page: {
			code: "BRIDGE TTL/RS485",
			subtitle: "Uma aplicação binária transparente entre UART TTL e RS485, construída e validada sobre o hardware reaproveitado de uma unidade ED100.",
			status: [
				{ label: "STATUS", value: "● EM TESTE", tone: "programacao" },
				{ label: "PLATAFORMA", value: "ED100 / ESP32-WROOM-32E" },
				{ label: "INTERFACES", value: "UART0 TTL / UART2 RS485" },
				{ label: "VALIDAÇÃO", value: "BMS JBD / 9600 8N1" },
			],
			timeline: [],
			specifications: [],
		},
	},
	{
		id: "modbus-rtu-slave-sim",
		type: "PROJETO",
		number: "009",
		title: "MODBUS RTU SLAVE SIMULATOR",
		description: "Simulador Modbus RTU no uBox 2.0, com registradores configuráveis pelo navegador, persistência e atraso de resposta para testar clientes e timeouts.",
		image: "/images/modbus-rtu-slave-sim/capa-ubox-2.webp",
		path: "/projetos/modbus-rtu-slave-sim/",
		categories: [
			{ label: "PROGRAMAÇÃO", tone: "programacao" },
			{ label: "AUTOMAÇÃO", tone: "automacao" },
			{ label: "ELETRÔNICA", tone: "eletronica" },
		],
		keywords: ["Modbus RTU Slave Simulator", "Modbus RTU", "slave", "simulador", "uBox 2.0", "ESP-07", "ESP8266", "RS485", "InverterModbusLib", "FC03", "FC04", "FC06", "FC10", "Holding Register", "Input Register", "timeout", "EEPROM", "CRC32", "Arduino IDE"],
		page: {
			code: "MODBUS RTU SLAVE SIM",
			subtitle: "Um mapa Modbus controlável no uBox 2.0 para desenvolver clientes, conferir interpretações e provocar condições de erro sem depender de um inversor real.",
			status: [
				{ label: "STATUS", value: "● EM TESTE", tone: "programacao" },
				{ label: "HARDWARE", value: "UBOX 2.0 / ESP-07" },
				{ label: "FIRMWARE ATUAL", value: "1.0.1" },
				{ label: "LICENÇA", value: "MIT" },
			],
			timeline: [
				{ year: "ORIGEM", title: "Teste sem inversor", text: "A necessidade de validar clientes e mapas Modbus motivou um slave configurável com valores conhecidos." },
				{ year: "EVOLUÇÃO", title: "AP próprio", text: "A configuração por WiFiManager e rede externa foi substituída por um ponto de acesso local direto, mais simples para a bancada." },
				{ year: "BANCADA", title: "Leitura, exceção e escrita", text: "Sete cenários demonstraram FC03, FC04, FC10, exceção por endereço ausente e confirmação dos valores por releitura." },
				{ year: "ATUAL", title: "Firmware 1.0.1", text: "O código público acrescenta diagnóstico; as capturas preservadas documentam a interface da etapa 1.0.0." },
			],
			specifications: [
				{ name: "Plataforma", value: "uBox 2.0 / ESP-07 (ESP8266)" },
				{ name: "Protocolo", value: "Modbus RTU slave" },
				{ name: "Mapa", value: "Até 50 registradores de 16 bits" },
				{ name: "Funções", value: "FC03 · FC04 · FC06 · FC10" },
				{ name: "Configuração", value: "AP local + interface web" },
				{ name: "Persistência", value: "EEPROM emulada + CRC32" },
				{ name: "Desenvolvimento", value: "Arduino IDE" },
				{ name: "Rede local", value: "ESP07-Modbus-Sim · 192.168.4.1" },
			],
		},
	},
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
		keywords: ["Infinity Light", "iluminação de bancada", "ESP8266", "NodeMCU", "PWM", "MOSFET", "IRFZ44N", "fita de LED", "WebSocket", "Wi-Fi Manager", "mDNS", "EEPROM", "curva gamma", "placa ilhada", "Fritzing", "12 V"],
		page: {
			code: "INFINITY LIGHT",
			subtitle: "Um projeto de iluminação pensado para o quarto, interrompido por falta de planejamento e retomado três anos depois como uma ferramenta real de bancada.",
			status: [
				{ label: "STATUS", value: "● EM DESENVOLVIMENTO", tone: "programacao" },
				{ label: "ORIGEM", value: "2023 / INFINITY LIGHT" },
				{ label: "RETOMADA", value: "2026 / BANCADA" },
				{ label: "DRIVER", value: "REVISÃO 2.0 DOCUMENTADA" },
			],
			timeline: [
				{ year: "2023", title: "Infinity Light", text: "A ideia de iluminar o quarto combinava fitas de LED, ESP8266, PWM e controle pelo celular." },
				{ year: "2023", title: "Primeira execução", text: "Cerca de 13 metros de fita funcionaram, mas a instalação com fontes e fiação expostas não era segura nem definitiva." },
				{ year: "2023", title: "Documentação interrompida", text: "Testes, placa e planejamento avançaram, mas a execução era mais natural do que transformar o processo em um registro consistente." },
				{ year: "2026", title: "Do quarto à bancada", text: "O escopo mudou para uma iluminação PWM útil na bancada construída com materiais reaproveitados." },
				{ year: "2026", title: "Revisão do driver", text: "Medições levaram ao ajuste dos pull-ups, à troca do regulador linear por buck, à simplificação do circuito e à substituição de um IRFZ44N danificado." },
				{ year: "AGORA", title: "Controle unificado", text: "Interface web, WebSocket e automações experimentais compartilham comandos SET:0 a SET:100." },
			],
			specifications: [
				{ name: "Controlador", value: "ESP8266 / NodeMCU" },
				{ name: "Potência", value: "Driver de MOSFET / IRFZ44N" },
				{ name: "Iluminação", value: "Fita de LED 12 V" },
				{ name: "PWM", value: "D2 / GPIO4 · 14 bits · 1 kHz" },
				{ name: "Correção de brilho", value: "Gamma 2,2" },
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
		image: "/images/gtr-01/guitarra-estado-atual.webp",
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
					text: "Quatro peças de bambu foram cortadas para formar duas molduras finais e instaladas em caráter experimental; colagem em pares, parafusos, correção do buraco no corpo e acabamentos finais continuam pendentes.",
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
				{ label: "STATUS", value: "● EM RECUPERAÇÃO", tone: "experimentacao" },
				{ label: "INÍCIO", value: "2020" },
				{ label: "RESULTADO", value: "REV. 1 EM DIAGNÓSTICO" },
			],
			timeline: [
				{ year: "2020", title: "Redesenho", text: "O circuito de referência foi refeito no Fritzing e organizado como uma placa didática de componentes PTH." },
				{ year: "2020", title: "Fabricação", text: "Dez placas foram fabricadas no exterior depois que o orçamento nacional se mostrou incompatível com o caráter de protótipo do projeto." },
				{ year: "MONTAGEM", title: "Estrutura em escala", text: "Bornes banana e pernas impressas em 3D aproximaram visualmente a placa de um circuito integrado de oito pinos." },
				{ year: "TESTE", title: "Um pulso e travamento", text: "Na configuração astável, o circuito produziu um único acionamento próximo ao intervalo RC esperado e depois permaneceu travado." },
				{ year: "RECUPERAÇÃO", title: "Diagnóstico por blocos", text: "A Rev. 1 será preservada e investigada por blocos antes da migração para KiCad ou de qualquer nova fabricação." },
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
		description: "Dois ED100 transformando dados reais de uma bateria DMS em diagnóstico, ajustes e ensaios comparáveis.",
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
			subtitle: "Logger portátil com dois ED100 para registrar um BMS JBD em movimento, manter o painel original e transformar dados de campo em diagnóstico e ajustes de bateria.",
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
				{ year: "24–25/09/2026", title: "Ensaios após os ajustes", text: "Com capacidade configurada em 48 Ah e limite Sport de 72 A, dois conjuntos de dados chegaram a 0% e 0 Ah sem nova ocorrência de CellUV_P." },
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
		image: "/images/inverter-modbus-lib-arquitetura.png",
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
		description: "Suíte para pesquisar equipamentos, calcular arranjos e comparar combinações entre módulos e inversores fotovoltaicos.",
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
				{ label: "VERSÃO ATUAL", value: "v2.6.0" },
			],
			timeline: [
				{ year: "2022", title: "Excel", text: "Primeira versão criada para agilizar verificações recorrentes entre módulos e inversores." },
				{ year: "POSTERIORMENTE", title: "VBA", text: "Automações foram adicionadas conforme a necessidade de repetir e organizar os cálculos aumentou." },
				{ year: "DEPOIS", title: "Python", text: "Novas formas de organizar e executar os cálculos passaram a ser experimentadas em Python." },
				{ year: "v2.5.0", title: "Motor reutilizável e matriz", text: "O cálculo de compatibilidade ganhou um motor reutilizável, e a comparação de várias combinações passou a ter um aplicativo próprio." },
				{ year: "11 SET 2026", title: "Versão 2.6.0", text: "A suíte passou a reunir pesquisa avançada, cadastros unificados e uma interface revisada nos três aplicativos para Windows." },
			],
			specifications: [],
		},
	},
].sort((first, second) => Number(second.number) - Number(first.number));

export function getProject(id: string): Project | undefined {
	return projects.find((project) => project.id === id);
}
