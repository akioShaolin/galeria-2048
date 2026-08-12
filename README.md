# Galeria -2048

Acervo pessoal e público de **AkioShaolin** para documentar projetos, experimentos, reparos e processos técnicos ou criativos.

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
src/components/         Componentes Astro reutilizáveis
src/data/projects.ts    Fonte central dos dados dos projetos
src/layouts/            Layout base do site
src/pages/              Rotas e páginas
src/styles/global.css   Tokens e estilos globais
AGENTS.md               Referência visual, editorial e técnica
```

## Conteúdo dos projetos

Os resumos, categorias, estados, históricos e especificações ficam centralizados em `src/data/projects.ts`.

Cards com páginas publicadas funcionam como links. Projetos futuros são apresentados como artigos marcados `EM DESENVOLVIMENTO`, sem links provisórios.

## Publicação

O destino planejado é o GitHub Pages com domínio próprio:

```text
https://galeria-2048.com.br
```

A publicação deve usar GitHub Actions a partir da branch `main`, gerando o conteúdo estático de `dist/`.

## Identidade pública

O projeto é mantido publicamente como **AkioShaolin**. Informações pessoais, confidenciais ou irrelevantes ao acervo não devem ser adicionadas automaticamente.

Consulte o `AGENTS.md` antes de alterar identidade visual, estrutura editorial, páginas de projeto ou regras de conteúdo.
