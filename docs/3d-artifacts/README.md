# Artefatos 3D na Galeria -2048

Preserve dois arquivos com papéis diferentes: o **original**, que registra o projeto e pode ser baixado, e o **GLB**, gerado localmente para ser explorado na web. O GLB não substitui os arquivos históricos nem as fotos de um objeto real.

- Originais aprovados: `public/downloads/<projeto>/`.
- Modelos de visualização: `public/models/<projeto>/`.
- Visualizador compartilhado: `src/components/ModelViewer3D.astro`, com carregamento sob demanda. O modo padrão é `pcb`; use `viewMode="object"` para peças mecânicas. `initialOrbit` ajusta o enquadramento por artefato e o botão **Reenquadrar** volta a essa vista.

## Conversão local

- **STL:** confira eixos, escala, integridade e normais antes de converter. Preserve as proporções e compare o resultado com fotos, desenho ou medidas verificáveis. Se a unidade for desconhecida, não divulgue dimensões nem trate a cor do material neutro como histórica.
- **Gerber/Excellon:** gere contorno, cobre, pads, máscara, serigrafia e recortes a partir do pacote original. Use o mesmo sistema de fabricação para malha, furação e texturas. A vista inferior no visualizador vem da câmera: não aplique à textura 3D o espelhamento de uma vista 2D pronta. Confira os centros de furação contra os pads nas duas faces e confirme que os recortes realmente atravessam a malha. Se o pacote não declarar a espessura, trate a profundidade do modelo como apresentação, não medida histórica.
- **STEP, 3MF, OBJ e outros:** mantenha o original separado e avalie o que a conversão perde. Não preencha lacunas com componentes, montagem, material ou geometria inventados.

Converta uma vez, fora do runtime. O navegador recebe GLBs autocontidos, não conversores ou bibliotecas de fabricação. Use visualizadores separados para peças independentes; uma montagem adicional só faz sentido quando há referência para a posição relativa.

## Validação

1. Compare a orientação e a proporção com a fonte. Em PCBs, inspecione as duas faces, os furos, a visibilidade das trilhas e a ausência de superfícies sobrepostas.
2. Compare o download com o original e revise os metadados de ambos. Não inclua caminhos locais, nomes de computador ou dados pessoais.
3. Meça o tamanho dos GLBs. Reduza o peso sem apagar furos, encaixes, trilhas ou serigrafia.
4. Abra cada modelo no componente. Confira enquadramento, rotação, zoom, deslocamento, toque, rolagem da página, controles por teclado, foco, carregamento e fallback. Com várias instâncias, teste se os controles agem apenas no visualizador correto.
5. Confira desktop e mobile, os links dos originais, o console e `npm run build`. Na página, explique que os modelos são versões de visualização geradas a partir do acervo.
