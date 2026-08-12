# 1. Sobre o projeto

A **Galeria -2048** é um acervo pessoal e público mantido por **AkioShaolin**.

O objetivo é documentar projetos, experimentos, reparos, desenvolvimento de software, eletrônica, automação, áudio, luthieria e outros trabalhos técnicos ou criativos relacionados.

A Galeria não deve funcionar apenas como um portfólio de projetos concluídos.

Um dos princípios centrais é registrar também:

- versões intermediárias;
- hipóteses;
- erros;
- tentativas;
- medições;
- reparos;
- modificações;
- soluções abandonadas;
- aprendizados;
- projetos ainda em desenvolvimento.

A ideia central é:

> Construir para entender. Documentar para não deixar o que foi aprendido desaparecer em alguma pasta.

A frase de identidade usada no site é:

> IDEIAS EM SINAL.

---

# 2. Autor / identidade pública

A identidade pública utilizada no projeto é:

**AkioShaolin**

"Akio" e "Shaolin" fazem parte da identidade usada pelo autor online.

Evitar adicionar automaticamente informações pessoais que não sejam necessárias para o projeto.

Não adicionar sem solicitação explícita:

- endereço;
- telefone;
- informações financeiras;
- informações familiares;
- informações médicas;
- detalhes pessoais irrelevantes;
- informações internas de empregadores;
- informações confidenciais de terceiros.

O site deve apresentar principalmente o trabalho, os experimentos e o processo criativo/técnico.

---

# 3. Filosofia da Galeria

A Galeria deve transmitir curiosidade técnica.

O visitante deve ter a sensação de estar olhando para um acervo de bancada, laboratório, oficina e desenvolvimento.

Projetos não precisam estar finalizados para serem publicados.

Uma página pode permanecer marcada como:

`EM DESENVOLVIMENTO`

por tempo indeterminado.

Quando um projeto evoluir, preferir registrar a nova etapa em vez de apagar completamente a anterior.

Sempre que fizer sentido, preservar:

- contexto;
- problema;
- hipótese;
- tentativa;
- resultado;
- conclusão;
- próxima etapa.

O processo é tão importante quanto o resultado.

---

# 4. Tecnologia

O site utiliza:

- Astro;
- HTML;
- CSS;
- JavaScript quando necessário;
- geração estática;
- Git;
- GitHub;
- GitHub Pages como destino planejado de publicação.

Evitar adicionar frameworks ou dependências sem necessidade real.

Priorizar:

1. HTML/CSS nativos;
2. recursos do Astro;
3. JavaScript pequeno e simples;
4. dependências externas apenas quando justificadas.

O site deve permanecer leve e majoritariamente estático.

---

# 5. Identidade visual

## Fundo

A identidade principal utiliza fundo praticamente preto.

Valor utilizado atualmente:

```css
--bg: #050708;
```

O fundo pode receber grades, gradientes radiais e variações muito discretas de luminosidade. Esses recursos devem permanecer sutis e nunca competir com o conteúdo.

## Paleta completa

Os tokens globais ficam em `src/styles/global.css` e são a fonte de verdade da identidade visual.

```css
--bg: #050708;
--surface: #090c0e;
--surface-hover: #0d1114;
--line: #293238;

--text: #f0f2f2;
--muted: #9aa4a9;

--eletronica: #cfff00;
--programacao: #00d9ff;
--automacao: #ff8a00;
--audio: #ff20c7;
--luthieria: #ffe000;
--experimentacao: #a95cff;

--white-neon: #ffffff;
```

Associação entre cores e áreas:

- verde-limão: eletrônica;
- ciano: programação;
- laranja: automação;
- magenta: áudio;
- amarelo: luthieria;
- violeta: experimentação;
- branco: identidade geral e letreiro.

Não trocar arbitrariamente a cor de uma área entre páginas. Cores neon devem atuar como sinal, estado, categoria ou destaque pontual. Evitar grandes superfícies preenchidas com essas cores.

Linhas, bordas e grades devem usar principalmente `--line` ou branco com opacidade baixa. Texto corrido deve usar `--text` ou `--muted`, nunca uma cor neon em parágrafos extensos.

## Tipografia

A hierarquia tipográfica utiliza três famílias conceituais:

1. **Sans-serif** (`Arial`, `Helvetica`, `sans-serif`) para identidade, marca, títulos de grande impacto e navegação.
2. **Serif** (`Georgia`, `Times New Roman`, `serif`) para narrativa, texto editorial e leitura longa.
3. **Monoespaçada** (`Courier New`, `Courier`, `monospace` ou `monospace`) para caminhos, códigos, categorias, status, datas, especificações e informações de sistema.

Regras de legibilidade:

- evitar texto informativo importante abaixo de `14px` (`0.875rem`);
- usar aproximadamente `14px` para labels e metadados;
- usar `15px` a `16px` para descrições compactas;
- usar aproximadamente `18px` para texto editorial longo;
- manter `line-height` entre `1.7` e `1.85` em parágrafos longos;
- manter `line-height` entre `1.4` e `1.55` em informações de sistema;
- títulos podem usar `line-height` mais fechado quando isso fizer parte da composição;
- não aumentar globalmente toda a tipografia para resolver um problema localizado.

`--muted` possui contraste suficiente sobre o fundo principal e deve ser usado para conteúdo secundário. Não reduzir simultaneamente contraste, tamanho e peso de um texto necessário à compreensão.

## Letreiro e efeitos neon

O letreiro `GALERIA -2048` é um elemento de identidade, não um banner publicitário.

- preservar o fundo transparente;
- preservar a separação cromática dos números;
- manter as animações curtas e não contínuas;
- permitir que a animação seja repetida ao ativar o letreiro;
- manter navegação por teclado e foco visível;
- respeitar `prefers-reduced-motion`;
- evitar efeitos que prejudiquem a leitura das letras.

## Espaçamentos

Não existe uma grade rígida única, mas os espaçamentos devem seguir uma progressão coerente baseada aproximadamente em:

```text
8 / 10 / 14 / 20 / 24 / 30 / 40 / 55 / 70 / 100 / 120 px
```

Uso recomendado:

- `8–14px`: distância interna entre label, valor, tag e ícone;
- `20–30px`: padding de cards, painéis, navegação e rodapé;
- `40–70px`: separação entre blocos dentro de uma seção;
- `70–120px`: ritmo vertical entre grandes seções editoriais.

Evitar valores novos muito próximos de tokens existentes sem uma razão visual. Em telas menores, reduzir grandes vazios antes de reduzir a tipografia.

Containers atuais:

- páginas internas: até `1180px`, com margem lateral mínima de `24px`;
- página inicial: até `1380px`, com margem lateral maior no desktop;
- texto editorial: preferencialmente entre `650px` e `760px` de largura.

## Bordas, superfícies e composição

- utilizar bordas de `1px` com `--line` como estrutura visual;
- usar `--surface` em cards e painéis;
- aplicar `--surface-hover` somente a elementos interativos;
- reservar sombras luminosas para indicadores, traços neon e estados ativos;
- não introduzir cantos muito arredondados sem necessidade, pois a linguagem atual é técnica e modular;
- grades de fundo devem permanecer com baixa opacidade.

---

# 6. Responsividade

Breakpoints atualmente utilizados:

- até `950px`: reorganização principal da home;
- até `800px`: reorganização de páginas internas e grids;
- até `600px`: empilhamento do rodapé e pequenos ajustes finais.

Comportamento esperado:

- transformar grids de várias colunas em uma coluna quando o conteúdo perder legibilidade;
- empilhar o letreiro no mobile;
- permitir rolagem horizontal controlada no menu da home quando necessário;
- empilhar painéis de status sem duplicar bordas;
- manter imagens dentro do viewport;
- preservar no mínimo `24px` de margem lateral nas páginas internas;
- manter labels e metadados importantes com pelo menos `14px` também no mobile;
- reduzir títulos grandes com `clamp()`, sem criar quebras imprevisíveis;
- reduzir espaçamentos verticais excessivos antes de comprimir textos.

Testar, no mínimo, larguras próximas de `375px`, `768px`, `1024px` e desktop amplo.

---

# 7. Arquitetura visual e componentes

Elementos comuns devem ser implementados como componentes Astro pequenos e sem dependências desnecessárias.

Componentes existentes:

- `BaseLayout.astro`: documento, `<head>`, metadados e importação global;
- `SiteHeader.astro`: cabeçalho de páginas internas e estado especial da página 404;
- `SiteFooter.astro`: rodapé compartilhado;
- `ProjectCard.astro`: resumo publicado ou futuro de um projeto;
- `Tag.astro`: categoria com cor temática;
- `StatusGrid.astro`: painel de status e metadados;
- `NeonSign.astro`: letreiro interativo da página inicial.

Reutilizar esses componentes antes de copiar marcação. Manter estilos específicos junto da página quando eles só fizerem sentido naquele contexto.

Os dados dos projetos ficam em `src/data/projects.ts`. Evitar duplicar títulos, números, categorias, imagens, status, histórico ou especificações nas páginas.

Quando o acervo crescer de forma significativa, avaliar a migração para Astro Content Collections, preservando o modelo editorial existente.

---

# 8. Convenções para páginas de projeto

Cada projeto deve possuir um identificador estável, preferencialmente curto e legível, por exemplo:

```text
gtr-01
modbus-sniffer
pedal-audio
```

Uma página de projeto deve informar, quando aplicável:

- tipo e número do registro;
- título ou código;
- resumo curto;
- categorias;
- status atual;
- data ou período de início;
- última atualização;
- imagem principal;
- contexto e motivação;
- histórico ou linha do tempo;
- estado atual e especificações;
- problemas encontrados;
- próxima etapa.

Cards publicados devem ser links. Itens ainda sem página devem ser `<article>` e indicar claramente `EM DESENVOLVIMENTO`. Não usar `href="#"` como placeholder.

Rotas de projetos devem ficar preferencialmente em:

```text
src/pages/projetos/<id>.astro
```

---

# 9. Estrutura narrativa recomendada

Nem toda página precisa usar todas as seções, mas a narrativa deve preservar o processo.

Ordem recomendada:

1. **Identificação** — nome, código, categorias e status.
2. **Contexto** — de onde surgiu o projeto e qual problema motivou o trabalho.
3. **Hipótese ou objetivo** — o que se pretendia descobrir, construir ou corrigir.
4. **Tentativas** — abordagens, protótipos, versões e decisões intermediárias.
5. **Medições e evidências** — valores, fotografias, diagramas, código ou observações.
6. **Erros e caminhos abandonados** — o que não funcionou e por quê.
7. **Estado atual** — configuração, limitações e resultado disponível.
8. **Conclusão provisória** — o que foi aprendido até agora.
9. **Próxima etapa** — o que ainda pode mudar.

Não inventar medições, datas, resultados ou conclusões ausentes. Quando uma informação ainda não existir, omitir o campo ou marcá-lo de maneira honesta.

Preferir adicionar uma nova etapa ao histórico em vez de reescrever o passado como se o projeto sempre tivesse seguido o caminho final.

---

# 10. Status

Status recomendados:

- `EM DESENVOLVIMENTO` — trabalho ativo ou ainda incompleto;
- `EM TESTE` — versão disponível, mas ainda sendo verificada;
- `PAUSADO` — trabalho interrompido sem conclusão definitiva;
- `CONCLUÍDO` — objetivo atual alcançado;
- `ARQUIVADO` — mantido como referência, sem evolução planejada;
- `ABANDONADO` — abordagem encerrada, preservada pelo aprendizado.

Um projeto pode permanecer `EM DESENVOLVIMENTO` por tempo indeterminado.

O status deve descrever o estado real, sem transformar projetos abertos em falsos trabalhos concluídos. Mudanças de status relevantes devem aparecer no histórico.

---

# 11. Imagens e recursos visuais

Arquivos estáticos ficam em `public/`. Imagens de projetos devem ficar preferencialmente em:

```text
public/images/<projeto>/
```

Projetos pequenos ou já existentes podem manter arquivos diretamente em `public/images/` até que a reorganização seja justificada.

Regras:

- usar nomes de arquivo descritivos, estáveis e sem espaços;
- fornecer `alt` útil para imagens informativas;
- usar `alt=""` apenas em imagens realmente decorativas;
- não inserir informações pessoais ou confidenciais visíveis nas fotografias;
- revisar fundos, etiquetas, documentos, telas e metadados antes de publicar;
- evitar imagens maiores do que o necessário para a resolução exibida;
- preservar a proporção original;
- usar `object-fit: contain` quando o objeto inteiro for importante;
- usar `object-fit: cover` somente quando o corte for aceitável;
- registrar autoria ou origem quando o recurso não for produzido pelo autor;
- não depender apenas da cor para transmitir estado ou significado.

Placeholders devem indicar claramente que uma imagem ainda será adicionada. Quando a imagem real existir no repositório, preferir utilizá-la.

---

# 12. Histórico e preservação do processo

O histórico é parte central da Galeria -2048.

- manter entradas em ordem cronológica;
- usar datas exatas quando conhecidas e períodos honestos quando não forem;
- preservar versões intermediárias relevantes;
- registrar modificações importantes e seus motivos;
- associar medições, fotografias e arquivos à etapa correspondente quando possível;
- não apagar erros apenas para deixar a narrativa mais limpa;
- corrigir informações factualmente erradas, mas registrar mudanças de interpretação quando forem parte do aprendizado;
- distinguir claramente observação, hipótese, tentativa, resultado e conclusão;
- evitar afirmar causalidade quando existe apenas correlação ou suspeita;
- incluir a próxima etapa quando ela estiver definida.

O objetivo do histórico não é registrar cada ação trivial, mas preservar decisões, evidências e aprendizados que poderiam desaparecer.

---

# 13. Conteúdo, tom e privacidade

O texto deve ser direto, técnico quando necessário e compreensível para quem não acompanhou o projeto desde o início.

- explicar siglas na primeira ocorrência quando o contexto exigir;
- evitar linguagem promocional exagerada;
- não esconder incertezas;
- separar opinião de resultado medido;
- preservar a voz pessoal de AkioShaolin sem expor dados pessoais desnecessários;
- não publicar credenciais, chaves, números de série sensíveis, endereços de rede privados ou dados de terceiros;
- não adicionar automaticamente informações de empregadores ou clientes.

O trabalho deve permanecer o foco principal.

---

# 14. Critérios para novas alterações

Antes de concluir uma mudança:

1. verificar se a grafia `Galeria -2048` foi preservada;
2. confirmar que o design atual não foi descaracterizado;
3. testar as rotas afetadas;
4. verificar desktop e mobile;
5. conferir foco por teclado e contraste;
6. confirmar que não existem links-placeholder;
7. manter itens futuros claramente identificados;
8. executar o build ou validar pelo servidor de desenvolvimento;
9. evitar dependências que não tragam benefício proporcional;
10. preservar alterações do usuário não relacionadas à tarefa.
