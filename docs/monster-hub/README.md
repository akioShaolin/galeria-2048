# Monster Hub

O Monster Hub é o grafo de relações da Galeria -2048. Ele apresenta projetos, artigos e casos de oficina como uma constelação formada pela trajetória técnica de akioShaolin.

O mapa não é uma árvore genealógica rígida nem um grafo de dependências de software. Uma relação pode registrar herança de código, hardware ou material, influência de conhecimento, uma necessidade criada por outro trabalho ou o desenvolvimento paralelo de ferramentas complementares.

Toda relação precisa ter uma razão histórica real e confirmada pelo autor.

## Arquitetura

```text
projects.ts + articles.ts + workshop.ts
                    ↓
                archive.ts
                    +
             relationships.ts
                    ↓
              monsterHub.ts
                    ↓
         nós + arestas do Cytoscape
                    ↓
   MonsterHub.astro + /monster-hub/
```

### `src/data/archive.ts`

Reúne o catálogo público. É a fonte dos metadados dos nós: título, tipo, código, descrição, imagem, áreas e URL.

Não copie esses campos para `relationships.ts`.

### `src/data/relationships.ts`

É a fonte de verdade das conexões históricas. Cada relação é registrada uma vez, recebe um ID estável e passa pelas validações estruturais durante o build.

### `src/data/monsterHub.ts`

O adaptador `buildMonsterHubGraph()` combina o acervo publicado com as relações e produz o formato consumido pelo Cytoscape.

### `src/components/LineageGraph.astro`

É a visão local e centrada em um conteúdo. A partir da mesma base canônica, deriva ascendentes, descendentes, influências e paralelos para as páginas individuais.

### `src/components/MonsterHub.astro`

É a visão global. Astro gera a estrutura da página, os controles, o painel de detalhes e a alternativa textual acessível. O JavaScript inicializa o Cytoscape e controla zoom, layout, filtros, pesquisa e seleção.

### `src/pages/monster-hub.astro`

É a rota pública `/monster-hub/` e contém a introdução, a legenda e a explicação editorial do mapa.

## Conceitos básicos do Cytoscape.js

### Node

Um nó representa um conteúdo publicado da Galeria. Seu ID é o mesmo usado em `projects.ts`, `articles.ts` ou `workshop.ts`.

### Edge

Uma aresta representa uma relação cadastrada em `relationships.ts`.

### `source`

É a origem da relação. Seu significado depende do tipo:

- parentesco: ascendente;
- influência: influenciador;
- paralelo: apenas um dos dois lados, sem hierarquia.

### `target`

É o destino da relação:

- parentesco: descendente;
- influência: influenciado;
- paralelo: o outro lado da relação simétrica.

### Elements

É o conjunto de nós e arestas entregue ao Cytoscape.

### Layout

O Astro calcula as posições em `src/data/monsterHubLayout.ts` e as entrega ao Cytoscape como layout `preset`. As relações de `parentesco` determinam a ordem obrigatória das colunas, da esquerda (ascendentes) para a direita (descendentes). Uma `influencia` pode orientar a posição nesse mesmo sentido se não criar um ciclo. `paralelo` não impõe uma direção nem muda o parentesco.

Depois de atribuir as colunas, o cálculo ordena os blocos familiares e ajusta a altura dos nós. Uma aresta de parentesco entre colunas vizinhas é reta; quando atravessa várias colunas, passa por espaços reservados, sem atravessar caixas. Influências e paralelos usam curvas e podem cruzar outras linhas. O método reduz cruzamentos, sem garantir uma solução ótima em toda topologia.

O cálculo é determinístico: IDs resolvem empates e os componentes desconectados são distribuídos em fileiras previsíveis. Filtros, seleção, zoom e redimensionamento não recalculam o layout. As caixas ficam fixas para preservar as passagens reservadas; arrastar move o mapa. Selecionar um nó destaca sua vizinhança e atualiza o painel lateral.

## Regras de orientação e roteamento visual

A disposição visual do Monster Hub deve favorecer a leitura da trajetória técnica da esquerda para a direita. Essas regras pertencem à camada de apresentação e não alteram o significado histórico das relações cadastradas em `relationships.ts`.

### Parentesco

Relações de `parentesco` formam a estrutura principal do grafo.

A orientação preferencial é:

```text
ascendente → descendente
esquerda      direita
```

Sempre que a topologia permitir:

- o descendente deve ficar à direita do ascendente;
- uma linha de parentesco não deve atravessar uma caixa de conteúdo;
- linhas de parentesco não devem cruzar outras linhas de parentesco;
- trajetos entre colunas podem utilizar segmentos intermediários para contornar nós;
- a rota deve permanecer tão simples e direta quanto possível.

Quando não for possível satisfazer todas as condições simultaneamente, a prioridade visual é:

```text
1. não atravessar entidades
2. evitar cruzamento entre parentescos
3. preservar a direção esquerda → direita
4. reduzir comprimento e quantidade de desvios
```

Parentesco é a espinha dorsal visual do Monster Hub. Relações secundárias não devem forçar a genealogia principal a uma disposição pior.

### Influência

`influencia` também é uma relação direcionada:

```text
influenciador → influenciado
```

Sempre que possível, o influenciador deve aparecer à esquerda do influenciado.

Diferentemente do parentesco, linhas de influência podem:

- usar curvas suaves;
- atravessar outras linhas de influência;
- atravessar linhas de paralelo;
- contornar entidades por trajetos menos rígidos.

Uma influência pode apontar para a esquerda quando a estrutura genealógica do grafo tornar isso necessário. Ela não deve deslocar ascendentes e descendentes apenas para preservar sua própria orientação.

### Paralelo

`paralelo` não possui direção hierárquica:

```text
projeto A ↔ projeto B
```

Sua rota pode ser escolhida livremente para preservar a legibilidade da composição.

Linhas de paralelo podem usar curvas, desvios e cruzamentos com outras relações secundárias. Elas não devem determinar níveis ou gerações do grafo.

### Ramificações

Quando várias relações partirem de uma mesma região do grafo, seus trajetos podem compartilhar parcialmente um corredor visual antes de se separarem, desde que cada relação continue identificável.

Esse comportamento é especialmente útil para reduzir poluição visual em grupos com muitos descendentes ou influências.

Não fundir semanticamente arestas diferentes: o compartilhamento é apenas visual.

### Posicionamento dos nós

As entidades podem ser posicionadas livremente desde que as regras de orientação e cruzamento acima sejam respeitadas.

O algoritmo deve priorizar:

```text
parentesco
→ estrutura das colunas e gerações

influência
→ preferência secundária esquerda → direita

paralelo
→ ajuste visual sem hierarquia
```

As coordenadas não devem ser cadastradas manualmente por projeto.

### Blocos familiares entre colunas

Não centralize cada nó só para equilibrar a coluna. Os descendentes diretos de um mesmo ascendente devem formar uma faixa vertical contínua na coluna seguinte, mesmo que isso deixe áreas vazias. Uma convergência de parentescos pode justificar exceções: um descendente com vários ascendentes não é atribuído arbitrariamente a uma única família.

O ascendente deve ficar próximo da mediana vertical dos descendentes diretos. Com um único descendente, prefira a mesma linha horizontal; com vários, procure distribuir o bloco aproximadamente acima e abaixo do ascendente. Se A está acima de B, os descendentes exclusivos de A devem ficar, de preferência, acima dos de B. Essa ordem vale entre cada par de colunas, não apenas na primeira geração.

Depois de fixar as colunas, avalie a ordem vertical nesta sequência:

1. Reduzir cruzamentos entre relações de parentesco.
2. Manter as linhas de parentesco fora das caixas. Os corredores reservados garantem isso no layout; não se aceita uma rota que corte uma caixa.
3. Evitar inversões entre famílias e nós de outro ramo no meio dos irmãos.
4. Aproximar ascendentes e descendentes na vertical.
5. Reduzir o comprimento das ligações de parentesco.

O algoritmo faz passagens de ordenação pela mediana da esquerda para a direita e no sentido inverso, comparando propostas com e sem blocos. Também tenta fechar lacunas deslocando um grupo e ajustando as colunas vizinhas em conjunto. Depois de escolhida a ordem, ajusta a posição vertical pelas medianas sem reduzir o espaçamento mínimo nem trocar os nós de lugar. IDs estáveis resolvem empates. Influência e paralelo se adaptam à ordem genealógica e não deslocam famílias para encurtar suas linhas.

Não preencha uma lacuna se isso separar irmãos, cruzar um ramo ou criar uma diagonal longa. Relações que pulam colunas passam por corredores horizontais reservados nas colunas intermediárias, ligados por segmentos entre colunas. Trajetos de uma mesma família podem compartilhar parte de um corredor se as arestas ainda puderem ser distinguidas.

O resultado deve deixar visível **quem gerou quem** antes mesmo da leitura dos rótulos. Uma coluna assimétrica é preferível a uma família espalhada.

### Determinismo

A mesma combinação de nós e relações deve produzir a mesma disposição visual, ou uma disposição efetivamente equivalente, em todas as renderizações.

IDs estáveis devem ser usados para resolver empates de ordenação.

Recarregar a página, filtrar relações, alterar o zoom ou redimensionar a janela não deve reorganizar aleatoriamente as entidades.

Adicionar ou remover uma relação pode naturalmente modificar o layout, mas o resultado correspondente ao mesmo conjunto de dados precisa ser previsível.

### Princípio geral

O Monster Hub não deve buscar a disposição geometricamente mais compacta a qualquer custo.

A prioridade é tornar a trajetória compreensível:

```text
primeiro preservar a genealogia
depois reduzir cruzamentos
depois aproximar relações secundárias
e somente então compactar o desenho
```

A clareza histórica é mais importante que a simetria visual.

### Style

São as regras visuais aplicadas a nós e arestas. Parentesco, influência e paralelo também se diferenciam por padrão de linha e seta, não apenas pela cor.

### Events

Eventos de clique ou toque selecionam nós e arestas, destacam a vizinhança e alimentam o painel de detalhes.

### Viewport

É a área navegável do grafo. Cytoscape controla zoom, pan, enquadramento e centralização da pesquisa.

Layout e viewport têm responsabilidades separadas: o layout define onde os nós ficam; o viewport decide qual região aparece na tela. A primeira abertura enquadra a vizinhança do nó mais conectado do maior componente. Em telas largas, inclui mais um passo nas ramificações de parentesco; em telas estreitas, mantém o nó central à vista. O botão `AJUSTAR` enquadra o grafo completo.

O zoom permitido fica entre `0.1` e `2.6`. O enquadramento inicial usa um piso responsivo para preservar rótulos legíveis, enquanto `AJUSTAR` pode usar qualquer zoom necessário para mostrar o conjunto inteiro. O usuário também pode navegar com roda, pinça, arraste e os controles `+`, `−`, `AJUSTAR` e `LIMPAR`.

Um `ResizeObserver` chama `cy.resize()` quando o painel muda de tamanho. Antes da primeira interação, o enquadramento inicial pode ser recalculado para acompanhar a largura disponível. Depois que o usuário move ou amplia o mapa, o centro do modelo e o zoom corrente são preservados durante redimensionamentos e alterações do zoom do navegador; o layout não é executado novamente.

Cytoscape cuida da visualização e da interação. Ele não define a verdade histórica: essa responsabilidade continua em `relationships.ts`.

### Tela cheia

**TELA CHEIA** amplia a área de trabalho na janela, com o mesmo grafo, filtros, busca, controles e painel de seleção. Em desktop, o painel permanece à direita. Em telas estreitas, tocar em um nó ou relação abre os detalhes na parte inferior. **DETALHES** e **FECHAR DETALHES** alternam a gaveta sem apagar a seleção.

**SAIR DA TELA CHEIA** ou **Esc** restaura a rolagem da página e devolve o foco ao botão. Enquanto o modo está ativo, o restante da página não recebe foco. O observador de tamanho conserva o ponto do mapa que estava no centro e o nível de zoom, sem recriar a instância do Cytoscape ou recalcular as posições.

## Tipos de relação

```ts
type RelationshipKind =
  | "parentesco"
  | "influencia"
  | "paralelo";
```

### Parentesco

É direcionado:

```text
ascendente -> descendente
```

Use quando existe derivação real, inclusive:

- hardware ou material reaproveitado;
- equipamento transformado fisicamente;
- código diretamente derivado;
- arquitetura herdada;
- experimento que se tornou a base de outro projeto.

Um projeto pode ter vários ascendentes e vários descendentes.

### Influência

É direcionada:

```text
influenciador -> influenciado
```

Use quando um trabalho afetou outro sem ser seu ascendente direto. Isso inclui necessidade de uso, método, inspiração, referência técnica, ferramenta complementar ou limitação descoberta.

Não cadastre influência e parentesco para o mesmo par na mesma direção. O parentesco direto é a relação mais forte e deve prevalecer.

### Paralelo

É simétrico:

```text
projeto A <-> projeto B
```

Use para projetos desenvolvidos lado a lado, abordagens alternativas ou ferramentas que cumprem papéis complementares sem descendência entre elas.

`A <-> B` e `B <-> A` são a mesma relação. Cadastre somente uma.

## Herança material

Material doado ou reaproveitado pode criar parentesco. O ponto decisivo é a derivação: parte do projeto anterior passou a constituir o posterior ou foi fisicamente transformada nele.

## Uso não é parentesco

Usar um multímetro, computador, biblioteca ou ferramenta durante outro trabalho não torna essa ferramenta automaticamente ascendente. O uso precisa representar herança real para ser parentesco. Dependendo da história, ele pode ser influência, paralelo ou não precisar de uma aresta.

## Adicionando uma relação

Edite apenas `src/data/relationships.ts`:

```ts
{
  id: "projeto-origem__projeto-destino",
  source: "projeto-origem",
  target: "projeto-destino",
  kind: "influencia",
  subtype: "metodo",
  label: "MÉTODO REUTILIZADO",
  description: "O método desenvolvido no primeiro projeto foi aplicado na investigação do segundo.",
}
```

O ID deve ser estável, único e legível. Os IDs de `source` e `target` precisam existir no acervo.

Não adicione uma relação apenas porque dois projetos usam a mesma tecnologia.

## Subtipos

Subtipos descrevem a natureza específica da ligação sem alterar sua classe estrutural.

Exemplos já usados:

- `hardware_reaproveitado`;
- `desdobramento`;
- `conhecimento_reutilizado`;
- `metodo`;
- `inspiracao`;
- `limitacao_descoberta`;
- `ferramentas_complementares`.

A lista não é uma taxonomia fechada. Crie um subtipo somente quando ele melhorar a explicação e reutilize um existente quando o significado for realmente o mesmo.

## Labels e descrições

- `label`: texto curto exibido como síntese da relação;
- `description`: explicação do motivo histórico da conexão.

A descrição deve esclarecer o que aconteceu sem inventar causalidade, datas ou resultados.

## Validação

`validateRelationships()` é executado durante a importação dos dados e, portanto, durante o build. Ele rejeita:

- IDs de relação duplicados;
- origem ou destino inexistente no acervo;
- autorrelações;
- relações direcionais duplicadas;
- paralelos simétricos duplicados;
- parentesco e influência para o mesmo par direcionado;
- ciclos de parentesco.

As mensagens incluem o ID da relação ou o caminho do ciclo para facilitar o diagnóstico.

## Conteúdo publicado e planejado

O grafo público usa `archive.ts`, que atualmente representa o acervo publicado. A visualização inclui os conteúdos publicados que participam de pelo menos uma relação confirmada; itens ainda isolados permanecem no acervo e passam a aparecer no mapa quando recebem sua primeira relação. Destinos ausentes são tratados como erro para impedir links quebrados.

Se o repositório ganhar no futuro uma fonte canônica para itens planejados, o adaptador poderá aceitar um modo de desenvolvimento que una as duas fontes. Não crie uma segunda lista de backlog apenas para o Monster Hub.

## Como testar

```bash
node --test scripts/test-monster-hub-layout.mjs
npm run dev
npm run build
```

Verificações manuais:

1. abrir `/monster-hub/`;
2. recarregar a rota várias vezes e confirmar que nós e componentes mantêm as posições;
3. testar os quatro filtros e confirmar que as posições remanescentes não mudam;
4. pesquisar títulos e códigos;
5. selecionar vários nós sem reenquadramento automático;
6. selecionar arestas de todos os tipos;
7. abrir links do painel e da alternativa textual;
8. testar os botões `+`, `−`, `AJUSTAR` e `LIMPAR`;
9. testar zoom e pan com mouse e toque;
10. redimensionar a janela e confirmar que o mapa não recalcula o layout;
11. conferir a página em larguras próximas de 375, 768 e 1024 pixels e em desktop amplo;
12. repetir a conferência com zoom de página em 100%, 90%, 80%, 75% e 67%;
13. verificar as seções locais de linhagem nas páginas existentes;
14. entrar e sair da tela cheia com uma seleção e um filtro ativos; conferir zoom, centro, busca e retorno de foco;
15. em tela estreita, abrir e fechar os detalhes sem perder a seleção e conferir se os controles continuam alcançáveis;
16. confirmar que não há erros no console nem validações quebradas.

## Evolução futura

Possibilidades que não fazem parte da primeira versão:

- nós não publicados visíveis somente em desenvolvimento;
- foco de vizinhança com profundidade configurável;
- filtros por área ou tipo de conteúdo;
- modo de linha do tempo;
- histórico de alterações das relações;
- nós de influências externas;
- exportação em SVG ou PNG;
- estatísticas do grafo.

Essas extensões devem continuar consumindo a mesma base canônica, sem transferir verdade histórica para a camada visual.
