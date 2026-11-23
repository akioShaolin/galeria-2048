# Guia Editorial para Agentes — Galeria -2048

Este documento define como agentes de IA devem pesquisar, escrever, editar e implementar conteúdo na Galeria -2048.

Ele complementa o `AGENTS.md` da raiz. O `AGENTS.md` continua sendo a orientação principal do repositório.

---

# 1. Regra de idioma

As instruções de trabalho, prompts, READMEs técnicos e materiais de apoio podem estar em inglês ou português.

O conteúdo público da Galeria deve ser escrito em **português do Brasil**, salvo solicitação explícita em contrário.

Isso inclui:

- títulos;
- subtítulos;
- legendas;
- textos editoriais;
- botões;
- labels visíveis;
- explicações técnicas;
- metadados destinados ao visitante.

Não traduzir nomes próprios, nomes oficiais de projetos, nomes de bibliotecas, protocolos, comandos, registradores ou termos técnicos quando a tradução prejudicar precisão.

---

# 2. O agente não é o autor da história

A Galeria documenta a trajetória real de akioShaolin.

O agente deve:

- organizar;
- comparar fontes;
- estruturar;
- revisar;
- explicar;
- implementar;
- melhorar clareza;
- apontar inconsistências antes da publicação.

O agente não deve:

- inventar acontecimentos;
- completar lacunas narrativas por plausibilidade;
- criar datas;
- fabricar medições;
- atribuir motivações que não foram relatadas;
- criar causalidade onde só existe coincidência ou hipótese;
- transformar uma possibilidade em fato;
- criar relações entre projetos sem confirmação histórica.

Quando houver material antigo, preservar a história real mesmo que ela seja confusa, improvisada ou tecnicamente imperfeita.

---

# 3. Hierarquia prática das fontes

Antes de escrever, identificar quais fontes realmente existem para a tarefa.

Em geral, considerar:

1. instruções explícitas do autor para a tarefa atual;
2. arquivos e evidências primárias do projeto;
3. código-fonte, logs, esquemas, medições, fotos e vídeos;
4. README e documentação produzida durante ou depois do projeto;
5. páginas já publicadas na Galeria;
6. históricos de conversa e resumos históricos;
7. fontes externas, quando realmente necessárias.

Não substituir uma fonte primária por conhecimento genérico.

Quando duas fontes internas divergem de forma relevante, não escolher silenciosamente a versão mais conveniente.

Perguntar ao autor antes de publicar a divergência, salvo quando uma fonte posterior claramente documenta uma correção factual.

---

# 4. Preflight obrigatório

Antes de editar uma página ou criar uma nova:

- ler a página atual, quando existir;
- ler o item correspondente em `src/data/`;
- verificar componentes reutilizáveis;
- verificar relações existentes em `src/data/relationships.ts`;
- examinar os arquivos fornecidos para a tarefa;
- examinar fotos e vídeos relevantes;
- verificar links internos relacionados;
- verificar se há README ou documentação específica daquele projeto/feature.

Não começar a reescrever uma história depois de olhar apenas uma foto, um snippet ou a descrição do prompt.

Se uma feature possuir documentação própria, lê-la antes de alterar a feature.

Exemplo:

```text
docs/monster-hub/README.md
```

deve ser lido antes de mudanças estruturais no Monster Hub.

---

# 5. Não inventar — mas também não escrever como auditor

Esta regra é central.

## 5.1 Se um fato importante estiver incerto

Perguntar ao autor **antes de publicar**.

Exemplos:

- origem exata de um circuito;
- qual equipamento aparece em uma imagem;
- qual versão foi realmente utilizada;
- relação histórica entre dois projetos;
- causa de uma falha quando há mais de uma hipótese relevante.

## 5.2 Se o detalhe incerto não for necessário

Omitir.

Não criar uma ressalva apenas para mencionar algo que a página não precisava dizer.

## 5.3 Se a incerteza fizer parte da própria história

Escrever de forma natural e histórica.

Preferir:

> Na época, a principal hipótese era falha no pickup.

> A causa definitiva daquele travamento não chegou a ser determinada.

> O teste sugeriu essa possibilidade, então a investigação seguiu por esse caminho.

Evitar linguagem metadiscursiva de IA ou auditoria.

### Não publicar frases como:

> Com base nas evidências disponíveis...

> Minha impressão é...

> Os fatos não são suficientes para afirmar...

> Não foi possível confirmar...

> Segundo os relatos fornecidos...

> De acordo com as imagens enviadas...

> A evidência disponível sugere...

> Com base no README...

> Segundo o usuário...

> Não há informações suficientes para concluir...

Essas frases podem ser úteis durante a análise privada ou no relatório de planejamento, mas normalmente **não pertencem ao texto público da Galeria**.

A Galeria deve contar a história, não explicar o processo interno de verificação do agente.

---

# 6. Distinguir fato, hipótese e retrospectiva sem poluir o texto

A precisão deve aparecer na formulação.

### Fato observado

> O pickup apresentou resistência infinita.

### Hipótese da época

> Isso reforçou a hipótese de que a bobina impulsora estava aberta.

### Resultado

> A substituição do pickup resolveu a falha de partida.

### Reflexão atual

> Hoje eu faria a medição e a validação de outra forma.

Não transformar reflexões atuais em conhecimento que o autor supostamente tinha na época.

Quando houver aprendizado posterior, deixar explícita a distância temporal:

> Na época eu não considerei...

> Hoje eu também verificaria...

Isso é parte importante da identidade da Galeria.

---

# 7. Preservar a voz de akioShaolin

O texto deve parecer escrito por uma pessoa que realmente viveu o projeto.

Características desejadas:

- primeira pessoa quando a história for pessoal;
- técnica quando necessário;
- curiosidade;
- investigação;
- humor natural;
- reconhecimento de erros;
- reflexão posterior;
- linguagem compreensível sem perder precisão.

Evitar:

- voz corporativa;
- marketing;
- “case de sucesso”;
- frases motivacionais genéricas;
- excesso de adjetivos;
- elogios artificiais ao autor;
- linguagem excessivamente formal;
- jargão usado apenas para parecer técnico.

Expressões espontâneas e humor podem permanecer quando ajudam a contar a história.

Não transformar toda frase engraçada do autor em título ou bordão.

---

# 8. O processo importa tanto quanto o resultado

Não comprimir automaticamente:

```text
problema -> solução final
```

quando a trajetória relevante foi:

```text
problema
-> hipótese
-> tentativa
-> falha
-> nova hipótese
-> ferramenta improvisada
-> medição
-> correção
-> resultado
```

Preservar:

- versões intermediárias;
- caminhos abandonados relevantes;
- erros úteis;
- descobertas;
- improvisações;
- mudanças de estratégia.

Não reescrever o passado como se a solução final fosse óbvia desde o início.

---

# 9. Cronologia

Quando houver datas ou arquivos datados:

- respeitar a ordem real;
- não reorganizar eventos apenas para a narrativa ficar mais “limpa”;
- permitir processos paralelos quando foi assim que aconteceram;
- evitar fórmulas simplificadoras como “primeiro X, depois Y” quando X e Y aconteceram simultaneamente.

Se a cronologia for essencial e estiver ambígua, perguntar ao autor antes da publicação.

---

# 10. Profundidade técnica

Explicar o suficiente para o visitante entender por que uma decisão ou observação importa.

Não transformar toda página em:

- tutorial completo;
- documentação de API;
- datasheet reescrito;
- curso de eletrônica;
- listagem exaustiva de código.

Quando o repositório já contém a implementação detalhada:

- a Galeria conta a história e explica os pontos técnicos relevantes;
- o GitHub pode guardar a referência completa.

Código longo deve ser reduzido a trechos realmente editoriais.

---

# 11. Correções técnicas de material histórico

É permitido corrigir explicações antigas tecnicamente erradas.

Porém:

- não esconder que o entendimento antigo existiu quando isso fizer parte do aprendizado;
- não atribuir ao autor conhecimento que ele adquiriu depois;
- não ridicularizar a solução antiga.

Uma boa abordagem é:

> Na época tratei X dessa forma. Hoje eu faria Y, porque...

A evolução do conhecimento é conteúdo da Galeria.

---

# 12. Fotos e vídeos são evidências e narrativa

Antes de adicionar mídia:

- comparar com o que já está publicado;
- identificar o papel editorial de cada arquivo;
- evitar imagens repetitivas;
- preferir fotografia histórica real a imagem genérica quando ambas cumprem a mesma função;
- preservar imagens técnicas que expliquem algo que a fotografia não explica.

Classificações úteis durante a revisão:

```text
REPLACE
ADD
SUPPORTING
SKIP
REDACT/EDIT FIRST
```

Não publicar todo arquivo simplesmente porque ele existe.

---

# 13. Privacidade

Antes de publicar imagem, vídeo, log ou screenshot, revisar:

- senhas;
- SSIDs;
- IPs;
- MAC addresses;
- tokens;
- documentos;
- placas de veículos;
- endereços;
- números de série;
- nomes;
- dados de clientes;
- telas ao fundo;
- etiquetas e QR codes.

Uma informação visível no arquivo-fonte **não é automaticamente autorizada para publicação**.

Usar apenas o que foi explicitamente permitido ou que já é claramente público e apropriado.

Quando o autor tiver censurado uma parte da imagem, não tentar recuperar, inferir ou reproduzir o conteúdo censurado.

---

# 14. Pessoas e terceiros

Nomes de terceiros só devem ser usados quando:

- já forem públicos no contexto;
- ou o autor tiver autorizado seu uso para aquela publicação.

Não inferir informações pessoais sobre terceiros.

Ao falar de criadores, fontes ou inspirações, focar na relação deles com a trajetória da Galeria, não em biografias especulativas.

---

# 15. Git e publicação — regra inegociável

Sem autorização explícita no prompt atual:

- **NÃO fazer commit**;
- **NÃO fazer push**;
- **NÃO abrir pull request**;
- **NÃO criar tag ou release**;
- **NÃO fazer deploy**;
- **NÃO alterar repositório remoto**;
- **NÃO publicar automaticamente**.

É permitido editar a working tree local quando isso fizer parte da tarefa solicitada.

Ao terminar, relatar os arquivos modificados e testes realizados.

A autorização para editar arquivos localmente **não** implica autorização para commit, push ou deploy.

Uma autorização dada em uma tarefa anterior não deve ser presumida para uma tarefa nova.

---

# 16. Aprovação antes de escrever

Nem toda tarefa exige uma rodada extra de aprovação.

Seguir estas regras:

- se o prompt pedir explicitamente planejamento/proposta antes da edição, parar e aguardar aprovação;
- se o prompt trouxer um `approval gate`, respeitá-lo;
- se houver ambiguidade histórica importante, perguntar antes de publicar;
- se a tarefa for claramente “implemente isto agora”, implementar sem inventar uma nova etapa burocrática.

Não pedir confirmação apenas por hábito.

---

# 17. Preservar trabalho existente

Não alterar arquivos não relacionados só para:

- reformatar;
- “limpar”;
- modernizar;
- reorganizar;
- aplicar preferências pessoais do agente.

Não reverter alterações recentes do autor.

Antes de grandes refactors, verificar se eles são realmente necessários para a tarefa.

---

# 18. Dependências

Não instalar bibliotecas por conveniência quando HTML, CSS, Astro ou JavaScript simples resolvem.

Dependência nova deve ter justificativa clara.

Quando uma dependência for realmente adequada — por exemplo Cytoscape.js para o Monster Hub — usar o gerenciador de pacotes normalmente e atualizar o lockfile corretamente.

Não editar `package-lock.json` manualmente.

---

# 19. Build e verificação

Depois de mudanças implementadas, quando aplicável:

```bash
npm run build
```

Também revisar:

- rota alterada;
- desktop;
- mobile;
- links internos;
- mídia;
- console do navegador quando houver JavaScript;
- acessibilidade básica;
- ausência de placeholders quebrados.

Não declarar que algo foi testado se o teste não foi executado.

Se uma validação não puder ser executada, relatar isso no resumo técnico — não inserir essa limitação na narrativa pública.

---

# 20. Metadados e banco central

Antes de duplicar informação dentro de páginas, verificar as fontes centrais em:

```text
src/data/projects.ts
src/data/articles.ts
src/data/workshop.ts
src/data/archive.ts
src/data/areas.ts
src/data/relationships.ts
```

Título, código, categorias, status, imagens e relações devem preferencialmente ter uma única fonte de verdade.

Não criar bancos paralelos para resolver uma tarefa local sem justificar a arquitetura.

---

# 21. Relações entre projetos

Não inventar parentesco, influência ou paralelismo.

Compartilhar:

- ESP32;
- RS485;
- Python;
- uma época;
- uma área técnica;

não cria automaticamente uma relação histórica.

O Monster Hub deve representar a trajetória real do autor.

Quando trabalhar nele, ler também:

```text
docs/monster-hub/README.md
```

se o arquivo existir.

---

# 22. Links externos e pesquisa

Quando uma tarefa depender de um site, repositório, datasheet, canal ou documentação externa:

- abrir a fonte real;
- não inventar conteúdo porque a URL parece indicar algo;
- preferir documentação oficial e fonte primária;
- não tornar estatísticas voláteis parte essencial da narrativa sem necessidade.

Se a página externa não estiver acessível e o detalhe for indispensável, pedir material ao autor.

---

# 23. Antes de finalizar qualquer tarefa

Perguntar internamente:

1. Li os arquivos realmente relevantes?
2. Inventei algum fato?
3. Transformei uma hipótese em certeza?
4. Acrescentei ressalvas de IA que poderiam simplesmente ser omitidas?
5. Preservei a voz da Galeria?
6. Preservei a cronologia?
7. Revelei algum dado que não precisava ser público?
8. Dupliquei informação que deveria vir de `src/data/`?
9. Alterei algo fora do escopo?
10. Fiz commit, push ou deploy sem autorização?
11. Testei o que digo ter testado?
12. O texto público conta a história ou parece um relatório de auditoria?

Se a resposta a 2, 3, 7, 8, 9 ou 10 for “sim”, corrigir antes de encerrar.
