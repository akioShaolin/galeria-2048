import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMonsterHubLayout, HUB_NODE_HEIGHT, HUB_NODE_WIDTH, parentSegmentStyle } from "../src/data/monsterHubLayout.ts";

const graph = (ids, relations) => ({
	nodes: ids.map((id) => ({ data: { id } })),
	edges: relations.map(([source, target, kind = "parentesco"]) => ({
		data: { source, target, kind, id: `${source}-${target}` },
	})),
});

test("a ordem dos dados não muda o desenho, incluindo grupos desconectados", () => {
	const input = graph(["a", "b", "c", "d", "e"], [["a", "b"], ["a", "c"], ["d", "e", "paralelo"]]);
	assert.deepEqual(buildMonsterHubLayout(input), buildMonsterHubLayout({
		nodes: input.nodes.toReversed(), edges: input.edges.toReversed(),
	}));
});

test("o parentesco tem prioridade sobre uma influência em sentido contrário", () => {
	const { positions } = buildMonsterHubLayout(graph(["a", "b", "c", "d"], [
		["a", "b"], ["b", "c"], ["c", "a", "influencia"], ["c", "d", "influencia"],
	]));
	assert.ok(positions.a.x < positions.b.x && positions.b.x < positions.c.x);
	assert.ok(positions.c.x < positions.d.x);
});

test("troca a ordem das linhas quando o desempate por ID cruzaria parentescos", () => {
	const { positions } = buildMonsterHubLayout(graph(["a", "b", "c", "x", "y"], [
		["a", "x"], ["b", "y"], ["x", "c"], ["y", "c"],
	]));
	// The first two branches can be read as a pair of uninterrupted paths before converging.
	assert.equal(Math.sign(positions.a.y - positions.b.y), Math.sign(positions.x.y - positions.y.y));

	const reversed = buildMonsterHubLayout(graph(["a", "b", "c", "x", "y"], [
		["a", "y"], ["b", "x"], ["x", "c"], ["y", "c"],
	])).positions;
	assert.equal(Math.sign(reversed.a.y - reversed.b.y), Math.sign(reversed.y.y - reversed.x.y));
});

test("uma relação longa usa um corredor fora da caixa intermediária", () => {
	const { positions, parentBends } = buildMonsterHubLayout(graph(["a", "b", "c"], [
		["a", "b"], ["b", "c"], ["a", "c"],
	]));
	const bends = parentBends["a-c"];
	assert.equal(bends.length, 2);
	assert.equal(bends[0].x, positions.b.x - HUB_NODE_WIDTH / 2);
	assert.equal(bends[1].x, positions.b.x + HUB_NODE_WIDTH / 2);
	assert.equal(bends[0].y, bends[1].y);
	assert.ok(Math.abs(bends[0].y - positions.b.y) > HUB_NODE_HEIGHT / 2);
	assert.ok(Object.values(parentSegmentStyle(positions.a, positions.c, bends)).every(
		(value) => value.split(" ").length === 2 && value.split(" ").every((number) => Number.isFinite(Number(number))),
	));
});

const columnOrder = (positions, id) => Object.keys(positions)
	.filter((member) => positions[id].x === positions[member].x)
	.sort((a, b) => positions[a].y - positions[b].y);

test("irmãos de duas famílias ficam contíguos, ordenados pelos pais e alinhados pelas medianas", () => {
	const { positions } = buildMonsterHubLayout(graph(
		["pai-a", "pai-b", "a", "b", "c", "d", "e", "destino-comum"],
		[["pai-a", "a"], ["pai-b", "b"], ["pai-a", "c"], ["pai-b", "d"], ["pai-a", "e"],
			...["a", "b", "c", "d", "e"].map((id) => [id, "destino-comum"])],
	));
	const column = columnOrder(positions, "a");
	const siblings = ["a", "c", "e"].map((id) => column.indexOf(id)).sort((a, b) => a - b);
	const otherSiblings = ["b", "d"].map((id) => column.indexOf(id)).sort((a, b) => a - b);
	assert.equal(siblings[2] - siblings[0], 2);
	assert.equal(otherSiblings[1] - otherSiblings[0], 1);
	assert.equal(Math.sign(positions["pai-a"].y - positions["pai-b"].y), Math.sign(siblings[1] - otherSiblings[0]));
	assert.equal(positions["pai-a"].y, positions[column[siblings[1]]].y);
	assert.equal(positions["pai-b"].y, (positions.b.y + positions.d.y) / 2);
	assert.equal(positions[column[siblings[1]]].y - positions[column[siblings[0]]].y,
		positions[column[siblings[2]]].y - positions[column[siblings[1]]].y);
});

test("um descendente único preserva a linha do pai em uma coluna com outro bloco", () => {
	const { positions } = buildMonsterHubLayout(graph(
		["pai-a", "pai-b", "a", "b", "c", "d", "destino-comum"],
		[["pai-a", "a"], ["pai-b", "b"], ["pai-a", "c"], ["pai-a", "d"],
			...["a", "b", "c", "d"].map((id) => [id, "destino-comum"])],
	));
	assert.equal(positions["pai-b"].y, positions.b.y);
});

test("reagrupar irmãos pode deslocar um ramo com convergência e corredor em conjunto", () => {
	const { positions, parentBends } = buildMonsterHubLayout(graph(
		["raiz", "sniffer", "leitor", "referencia", "ponte", "logger", "monitor", "controle", "simulador"],
		[["raiz", "sniffer"], ["raiz", "leitor"], ["raiz", "referencia", "influencia"],
			["sniffer", "ponte"], ["referencia", "ponte"], ["referencia", "logger"],
			["leitor", "monitor"], ["leitor", "controle"], ["leitor", "simulador"],
			["monitor", "logger", "influencia"]],
	));
	const column = columnOrder(positions, "leitor");
	assert.equal(Math.abs(column.indexOf("leitor") - column.indexOf("sniffer")), 1);
	assert.equal(positions.raiz.y, (positions.leitor.y + positions.sniffer.y) / 2);
	assert.equal(parentBends["referencia-logger"].length, 2);
	const [lane] = parentBends["referencia-logger"];
	for (const id of columnOrder(positions, "ponte")) assert.ok(Math.abs(lane.y - positions[id].y) > HUB_NODE_HEIGHT / 2);
});

test("relações secundárias não reordenam famílias quando as colunas já são as mesmas", () => {
	const ids = ["pai-a", "pai-b", "a", "b", "c", "d", "destino-comum"];
	const parentage = [["pai-a", "a"], ["pai-b", "b"], ["pai-a", "c"], ["pai-b", "d"],
		...["a", "b", "c", "d"].map((id) => [id, "destino-comum"])];
	const base = buildMonsterHubLayout(graph(ids, parentage));
	const secondary = buildMonsterHubLayout(graph(ids, [
		...parentage, ["pai-a", "d", "influencia"], ["b", "c", "paralelo"],
	]));
	assert.deepEqual(secondary.positions, base.positions);
	assert.deepEqual(secondary.parentBends, base.parentBends);
});
