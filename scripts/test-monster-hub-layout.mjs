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
