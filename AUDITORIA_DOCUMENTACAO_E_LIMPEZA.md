# Auditoria de documentação e limpeza

Data da revisão: 24 de setembro de 2026.

## Objetivo

Revisar a documentação do repositório diante da estrutura atual da Galeria -2048, remover recursos comprovadamente obsoletos ou duplicados e preservar materiais com valor editorial, histórico ou operacional.

## Documentação revisada

- `README.md`: atualizado para descrever projetos, artigos, oficina, índice unificado, áreas, relações, downloads, previews e a publicação ativa no GitHub Pages.
- `AGENTS.md`: atualizado com os componentes, fontes de dados, rotas e semântica pública de relações existentes.
- `CLAUDE.md`: mantido em sincronia com `AGENTS.md`.

## Arquivos removidos

| Arquivo | Motivo |
| --- | --- |
| `public/images/6ear/marca-6ear.png` | versão raster sem referência; a identidade publicada usa `marca-6ear.svg` |
| `public/images/gtr-01.jpeg` | duplicata byte a byte de `public/images/gtr-01/moldes-papelao.jpg` |
| `public/images/inverter-modbus-lib.svg` | capa anterior substituída por `inverter-modbus-lib-arquitetura.png` |
| `public/images/modbus-rtu-slave-sim/capa-interface.webp` | capa anterior sem referência, substituída pela imagem atual do projeto |
| `public/images/luthieria.svg` | recurso genérico sem referência no código ou nos dados |
| `public/images/optimus-sun.svg` | capa anterior substituída por `public/images/optimus-sun/identidade.png` |
| `public/images/pd-02/esquematico-referencia.jpg` | duplicata byte a byte de `professor-bairros-jfet-referencia.jpg`, que permanece referenciada |

Total removido: 7 arquivos, 180.138 bytes.

## Arquivos órfãos preservados intencionalmente

- `public/CNAME`: necessário ao domínio personalizado do GitHub Pages.
- `public/previews/sniffing-usb-wireshark.html`: apresentação autônoma solicitada para compartilhamento.
- `public/images/optimus-sun/interface-1.png` a `interface-4.png`: registros de uma interface anterior, preservados pelo valor histórico do processo.
- `public/favicon.ico` e `public/favicon.svg`: recursos implícitos de identidade e navegador.

## Critério adotado

Uma ausência de referência no código não foi considerada, sozinha, motivo suficiente para exclusão. A limpeza ficou limitada a duplicatas confirmadas por SHA-256, capas substituídas e recursos genéricos sem função atual. Fotografias, capturas intermediárias e registros de versões anteriores foram preservados quando ainda podiam documentar a evolução do projeto.

## Validação

- referências públicas cruzadas com `src/`;
- duplicatas verificadas por SHA-256;
- `AGENTS.md` e `CLAUDE.md` mantidos idênticos;
- build estático executado após as alterações;
- verificação final com `git diff --check`.
