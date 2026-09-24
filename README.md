# Galeria -2048

Acervo pessoal e público de **akioShaolin** para documentar projetos, experimentos, reparos e processos técnicos ou criativos.

> Construir para entender. Documentar para não deixar o que foi aprendido desaparecer em alguma pasta.

**IDEIAS EM SINAL.**

## Sobre

A Galeria -2048 reúne trabalhos relacionados a:

- eletrônica;
- programação;
- automação;
- áudio;
- luthieria;
- experimentação.

O acervo não funciona apenas como portfólio de projetos concluídos. Versões intermediárias, hipóteses, erros, medições, modificações, soluções abandonadas e projetos em desenvolvimento também fazem parte da documentação.

## Tecnologia

- Astro;
- HTML e CSS nativos;
- JavaScript pequeno e localizado;
- geração estática;
- GitHub Pages.

O projeto evita frameworks e dependências externas quando os recursos do Astro e da plataforma web são suficientes.

## Desenvolvimento

Requisito: Node.js `22.12.0` ou superior.

```sh
npm install
npm run dev
```

O servidor de desenvolvimento do Astro fica disponível normalmente em `http://localhost:4321`.

## Comandos

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Visualiza localmente o build de produção |
| `npm run astro -- --help` | Exibe os comandos disponíveis do Astro |

## Estrutura

```text
public/                 Recursos estáticos e imagens
public/downloads/       Arquivos reproduzíveis disponibilizados ao visitante
public/previews/        Apresentações autônomas mantidas fora das rotas Astro
src/components/         Componentes Astro reutilizáveis
src/data/               Projetos, artigos, oficina, acervo, áreas e relações
src/layouts/            Layout base do site
src/pages/              Rotas e páginas
src/styles/global.css   Tokens e estilos globais
AGENTS.md               Referência visual, editorial e técnica
CLAUDE.md               Espelho das instruções para outros agentes
```

## Organização do acervo

O conteúdo público está dividido em:

- projetos, em `src/data/projects.ts` e `src/pages/projetos/`;
- artigos e referências técnicas, em `src/data/articles.ts` e `src/pages/artigos/`;
- casos de oficina, em `src/data/workshop.ts` e `src/pages/oficina/`;
- índice pesquisável unificado, montado por `src/data/archive.ts`;
- áreas temáticas, definidas em `src/data/areas.ts`;
- linhagem, paralelos e influências, cadastrados em `src/data/relationships.ts`.

Os dados compartilhados — título, resumo, categorias, imagem, status e histórico estruturado — devem permanecer nas fontes centrais sempre que o modelo comportar a informação. As páginas guardam a narrativa e os estilos específicos de cada conteúdo.

Cards com páginas publicadas funcionam como links. Projetos futuros são apresentados como cards marcados `EM DESENVOLVIMENTO`, sem links provisórios.

Imagens ampliáveis usam `EditorialImage.astro` junto de `ImageLightbox.astro`. Relações entre conteúdos são apresentadas por `LineageGraph.astro` sem duplicar relações direcionais no cadastro.

## Publicação

A publicação é automatizada no GitHub Pages pela workflow `.github/workflows/astro.yml`, executada em alterações na branch `main`. O domínio próprio configurado é:

```text
https://galeria-2048.com.br
```

O workflow instala as dependências com `npm ci`, executa `npm run build` e publica o conteúdo estático de `dist/`. O arquivo `public/CNAME` deve ser preservado.

## Validação antes de publicar

1. executar `npm run build`;
2. conferir as rotas alteradas em desktop e mobile;
3. verificar imagens, textos alternativos e lightbox;
4. confirmar que não existem links-placeholder ou arquivos públicos sem finalidade;
5. revisar o diff para não incluir dados pessoais, segredos ou artefatos gerados.

## Identidade pública

O projeto é mantido publicamente como **akioShaolin**. Informações pessoais, confidenciais ou irrelevantes ao acervo não devem ser adicionadas automaticamente.

Consulte o `AGENTS.md` antes de alterar identidade visual, estrutura editorial, páginas de projeto ou regras de conteúdo.
