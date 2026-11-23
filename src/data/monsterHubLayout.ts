import type { MonsterHubGraph } from "./monsterHub";

export const HUB_NODE_WIDTH = 230;
export const HUB_NODE_HEIGHT = 124;
const COLUMN_STEP = HUB_NODE_WIDTH + 156;
const ROW_STEP = HUB_NODE_HEIGHT + 56;
const COMPONENT_GAP = 200;
const compareId = (a: string, b: string) => a.localeCompare(b, "pt-BR") || (a < b ? -1 : a > b ? 1 : 0);

type Point = { x: number; y: number };
type Edge = MonsterHubGraph["edges"][number]["data"];
type LaneLink = { left: string; right: string };
type Score = [crossings: number, parentLength: number, secondaryLength: number];

const better = (a: Score, b: Score) => a[0] < b[0] ||
	(a[0] === b[0] && (a[1] < b[1] || (a[1] === b[1] && a[2] < b[2])));

function connectedComponents(ids: string[], links: Map<string, Set<string>>) {
	const seen = new Set<string>();
	const components: string[][] = [];
	for (const id of ids) {
		if (seen.has(id)) continue;
		const group = [id];
		seen.add(id);
		for (const member of group) {
			for (const neighbor of links.get(member) ?? []) {
				if (seen.has(neighbor)) continue;
				seen.add(neighbor);
				group.push(neighbor);
			}
		}
		components.push(group.sort(compareId));
	}
	return components.sort((a, b) => b.length - a.length || compareId(a[0], b[0]));
}

function assignColumns(ids: string[], edges: Edge[]) {
	const next = new Map(ids.map((id) => [id, new Set<string>()]));
	const degree = new Map(ids.map((id) => [id, 0]));
	const append = ({ source, target }: Edge) => {
		next.get(source)!.add(target);
		degree.set(target, degree.get(target)! + 1);
	};
	for (const edge of edges) if (edge.kind === "parentesco") append(edge);

	const reaches = (start: string, goal: string) => {
		const stack = [start];
		const seen = new Set<string>();
		while (stack.length) {
			const id = stack.pop()!;
			if (id === goal) return true;
			if (seen.has(id)) continue;
			seen.add(id);
			stack.push(...next.get(id)!);
		}
		return false;
	};
	// Prioritize ancestry: a conflicting influence can point backward but cannot break the hierarchy.
	for (const edge of edges) {
		if (edge.kind === "influencia" && !reaches(edge.target, edge.source)) append(edge);
	}

	const columns = new Map(ids.map((id) => [id, 0]));
	const order = ids.filter((id) => degree.get(id) === 0);
	for (const id of order) {
		for (const target of next.get(id)!) {
			columns.set(target, Math.max(columns.get(target)!, columns.get(id)! + 1));
			degree.set(target, degree.get(target)! - 1);
			if (degree.get(target) === 0) order.push(target);
		}
	}
	if (order.length !== ids.length) throw new Error("[monster-hub] Ciclo nas colunas de parentesco.");

	// Move short branches toward their destination instead of starting every root at column zero.
	for (const id of order.reverse()) {
		const targets = [...next.get(id)!];
		if (targets.length) columns.set(id, Math.min(...targets.map((target) => columns.get(target)!)) - 1);
	}

	const directed = new Set(edges.filter(({ kind }) => kind !== "paralelo").flatMap(({ source, target }) => [source, target]));
	const parallels = new Map(ids.map((id) => [id, new Set<string>()]));
	for (const edge of edges) {
		if (edge.kind !== "paralelo") continue;
		parallels.get(edge.source)!.add(edge.target);
		parallels.get(edge.target)!.add(edge.source);
	}
	const anchors = ids.filter((id) => directed.has(id));
	if (!anchors.length) {
		anchors.push([...ids].sort((a, b) => parallels.get(b)!.size - parallels.get(a)!.size || compareId(a, b))[0]);
	}
	const placed = new Set(anchors);
	for (const id of anchors) {
		for (const peer of parallels.get(id)!) {
			if (placed.has(peer)) continue;
			placed.add(peer);
			columns.set(peer, columns.get(id)! + 1);
			anchors.push(peer);
		}
	}
	return columns;
}

const rowCoordinates = (layers: string[][]) => new Map(layers.flatMap((layer) =>
	layer.map((id, index) => [id, index - (layer.length - 1) / 2] as const),
));

function orderRows(layers: string[][], boundaries: LaneLink[][], secondary: Edge[]) {
	const score = (candidate: string[][]): Score => {
		const rows = rowCoordinates(candidate);
		let crossings = 0;
		let parentLength = 0;
		for (const links of boundaries) {
			for (const [i, a] of links.entries()) {
				parentLength += Math.abs(rows.get(a.left)! - rows.get(a.right)!);
				for (const b of links.slice(i + 1)) {
					if ((rows.get(a.left)! - rows.get(b.left)!) * (rows.get(a.right)! - rows.get(b.right)!) < 0) crossings++;
				}
			}
		}
		const secondaryLength = secondary.reduce((sum, { source, target }) => sum + Math.abs(rows.get(source)! - rows.get(target)!), 0);
		return [crossings, parentLength, secondaryLength];
	};

	let best = layers.map((layer) => [...layer]);
	let bestScore = score(best);
	const keepBest = (candidate: string[][]) => {
		const cost = score(candidate);
		if (better(cost, bestScore)) {
			best = candidate.map((layer) => [...layer]);
			bestScore = cost;
		}
	};

	// Follow connected lanes in alternating sweeps; only keep layouts that improve the score.
	const candidate = layers.map((layer) => [...layer]);
	const columns = [...candidate.keys()];
	for (let pass = 0; pass < 8; pass++) {
		const forward = pass % 2 === 0;
		for (const index of forward ? columns.slice(1) : columns.slice(0, -1).reverse()) {
			const rows = rowCoordinates(candidate);
			const links = boundaries[forward ? index - 1 : index];
			const weight = (id: string) => {
				const neighbors = links.filter((link) => (forward ? link.right : link.left) === id);
				return neighbors.length
					? neighbors.reduce((sum, link) => sum + rows.get(forward ? link.left : link.right)!, 0) / neighbors.length
					: rows.get(id)!;
			};
			const weights = new Map(candidate[index].map((id) => [id, weight(id)]));
			candidate[index].sort((a, b) => weights.get(a)! - weights.get(b)! || rows.get(a)! - rows.get(b)!);
		}
		keepBest(candidate);
	}

	// Fix local inversions that survived the sweeps without giving up any primary improvement.
	const refined = best.map((layer) => [...layer]);
	for (let pass = 0; pass < 8; pass++) {
		let improved = false;
		for (const layer of refined) {
			for (let i = 0; i + 1 < layer.length; i++) {
				[layer[i], layer[i + 1]] = [layer[i + 1], layer[i]];
				const cost = score(refined);
				if (better(cost, bestScore)) {
					bestScore = cost;
					improved = true;
				} else {
					[layer[i], layer[i + 1]] = [layer[i + 1], layer[i]];
				}
			}
		}
		if (!improved) break;
	}
	return refined;
}

function layoutComponent(ids: string[], edges: Edge[]) {
	const columns = assignColumns(ids, edges);
	const ranks = [...new Set(columns.values())].sort((a, b) => a - b);
	const rankIndex = new Map(ranks.map((rank, index) => [rank, index]));
	const layers = ranks.map(() => [] as string[]);
	const boundaries = ranks.slice(1).map(() => [] as LaneLink[]);
	const laneIds = new Map<string, string[]>();
	for (const id of ids) layers[rankIndex.get(columns.get(id)!)!].push(id);
	for (const { id, source, target, kind } of edges) {
		if (kind !== "parentesco") continue;
		const first = rankIndex.get(columns.get(source)!)!;
		const last = rankIndex.get(columns.get(target)!)!;
		const lanes: string[] = [];
		let previous = source;
		for (let index = first + 1; index < last; index++) {
			// Virtual lanes are layout-only; never add dummy nodes to the public graph.
			const lane = `\0${id}:${index}`;
			lanes.push(lane);
			layers[index].push(lane);
			boundaries[index - 1].push({ left: previous, right: lane });
			previous = lane;
		}
		boundaries[last - 1].push({ left: previous, right: target });
		laneIds.set(id, lanes);
	}

	const ordered = orderRows(layers, boundaries, edges.filter(({ kind }) => kind !== "parentesco"));
	const height = HUB_NODE_HEIGHT + (Math.max(...ordered.map((layer) => layer.length)) - 1) * ROW_STEP;
	const rows = rowCoordinates(ordered);
	const positions = new Map(ordered.flatMap((layer, index) => layer.map((id) => [
		id, { x: HUB_NODE_WIDTH / 2 + index * COLUMN_STEP, y: height / 2 + rows.get(id)! * ROW_STEP },
	] as const)));

	const bends = [...laneIds].map(([id, lanes]) => [id, lanes.flatMap((lane) => {
		const { x, y } = positions.get(lane)!;
		return [{ x: x - HUB_NODE_WIDTH / 2, y }, { x: x + HUB_NODE_WIDTH / 2, y }];
	})] as const);
	return {
		positions: ids.map((id) => [id, positions.get(id)!] as const),
		bends,
		width: HUB_NODE_WIDTH + (layers.length - 1) * COLUMN_STEP,
		height,
	};
}

export function buildMonsterHubLayout(graph: MonsterHubGraph) {
	const ids = graph.nodes.map(({ data }) => data.id).sort(compareId);
	const edges = graph.edges.map(({ data }) => data).sort((a, b) => compareId(a.id, b.id));
	const neighbors = new Map(ids.map((id) => [id, new Set<string>()]));
	const strength = new Map(ids.map((id) => [id, 0]));
	for (const { source, target, kind } of edges) {
		neighbors.get(source)!.add(target);
		neighbors.get(target)!.add(source);
		for (const id of [source, target]) strength.set(id, strength.get(id)! + (kind === "parentesco" ? 5 : 1));
	}
	const groups = connectedComponents(ids, neighbors);
	const components = groups.map((group) => {
		const members = new Set(group);
		return layoutComponent(group, edges.filter(({ source }) => members.has(source)));
	});
	const area = components.reduce((sum, { width, height }) => sum + (width + COMPONENT_GAP) * (height + COMPONENT_GAP), 0);
	const shelfWidth = Math.max(Math.sqrt(area) * 1.25, ...components.map(({ width }) => width));
	const positions: Record<string, Point> = Object.create(null);
	const parentBends: Record<string, Point[]> = Object.create(null);
	let x = 0;
	let y = 0;
	let rowHeight = 0;
	for (const component of components) {
		if (x > 0 && x + component.width > shelfWidth) {
			x = 0;
			y += rowHeight + COMPONENT_GAP;
			rowHeight = 0;
		}
		const offset = (point: Point) => ({ x: x + point.x, y: y + point.y });
		for (const [id, point] of component.positions) positions[id] = offset(point);
		for (const [id, points] of component.bends) parentBends[id] = points.map(offset);
		x += component.width + COMPONENT_GAP;
		rowHeight = Math.max(rowHeight, component.height);
	}

	const initialFocusNodeId = [...(groups[0] ?? [])]
		.sort((a, b) => strength.get(b)! - strength.get(a)! || compareId(a, b))[0];
	return { positions, parentBends, initialFocusNodeId };
}

/** Convert absolute bends to Cytoscape's projection along/across the explicit edge endpoints. */
export function parentSegmentStyle(source: Point, target: Point, bends: Point[]) {
	const x = source.x + HUB_NODE_WIDTH / 2;
	const dx = target.x - HUB_NODE_WIDTH / 2 - x;
	const dy = target.y - source.y;
	const length = Math.hypot(dx, dy);
	return {
		"segment-weights": bends.map((bend) => ((bend.x - x) * dx + (bend.y - source.y) * dy) / (length * length)).join(" "),
		"segment-distances": bends.map((bend) => ((bend.y - source.y) * dx - (bend.x - x) * dy) / length).join(" "),
	};
}
