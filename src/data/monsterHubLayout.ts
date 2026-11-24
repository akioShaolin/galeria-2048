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
const isLane = (id: string) => id.startsWith("\0");

const better = (a: number[], b: number[]) => {
	const firstDifference = a.findIndex((value, i) => value !== b[i]);
	return firstDifference >= 0 && a[firstDifference] < b[firstDifference];
};

function median(values: number[]) {
	const sorted = [...values].sort((a, b) => a - b);
	return (sorted[Math.floor((sorted.length - 1) / 2)] + sorted[Math.floor(sorted.length / 2)]) / 2;
}

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

function indexParentage(boundaries: LaneLink[][]) {
	const incoming = new Map<string, string[]>();
	const outgoing = new Map<string, string[]>();
	for (const { left, right } of boundaries.flat()) {
		incoming.set(right, [...(incoming.get(right) ?? []), left]);
		outgoing.set(left, [...(outgoing.get(left) ?? []), right]);
	}
	return { incoming, outgoing };
}

function orderRows(layers: string[][], boundaries: LaneLink[][], { incoming, outgoing }: ReturnType<typeof indexParentage>) {
	const families = layers.slice(0, -1).map((layer) => layer.filter((id) => !isLane(id)).flatMap((parent) => {
		const children = (outgoing.get(parent) ?? []).filter((id) => !isLane(id));
		return children.length ? [{ parent, children, exclusive: children.filter((id) => incoming.get(id)!.length === 1) }] : [];
	}));
	const score = (candidate: string[][]) => {
		const rows = rowCoordinates(candidate);
		const visibleOrder = new Map(candidate.flatMap((layer) => layer.filter((id) => !isLane(id))
			.map((id, index) => [id, index] as const)));
		let crossings = 0;
		let inversions = 0;
		let familyGaps = 0;
		let parentDrift = 0;
		let routeLength = 0;
		for (const links of boundaries) {
			for (const [i, a] of links.entries()) {
				const drift = ROW_STEP * (rows.get(a.left)! - rows.get(a.right)!);
				parentDrift += Math.abs(drift);
				routeLength += Math.hypot(COLUMN_STEP - HUB_NODE_WIDTH, drift);
				for (const b of links.slice(i + 1)) {
					if ((rows.get(a.left)! - rows.get(b.left)!) * (rows.get(a.right)! - rows.get(b.right)!) < 0) crossings++;
				}
			}
		}
		// Each route crosses intermediate columns only inside its own reserved lane,
		// so box intersections are excluded by construction.
		const gaps = (ids: string[]) => {
			if (ids.length < 2) return 0;
			const indices = ids.map((id) => visibleOrder.get(id)!);
			return Math.max(...indices) - Math.min(...indices) + 1 - indices.length;
		};
		for (const boundary of families) {
			for (const family of boundary) familyGaps += gaps(family.children) + gaps(family.exclusive);
			const exclusive = boundary.filter((family) => family.exclusive.length).map(({ parent, exclusive }) => ({
				parent: visibleOrder.get(parent)!,
				center: median(exclusive.map((id) => visibleOrder.get(id)!)),
			}));
			for (const [i, a] of exclusive.entries()) {
				for (const b of exclusive.slice(i + 1)) {
					if ((a.parent - b.parent) * (a.center - b.center) < 0) inversions++;
				}
			}
		}
		return [crossings, inversions, familyGaps, parentDrift, routeLength];
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
	const sweepLayer = (candidate: string[][], index: number, forward: boolean, groupFamilies: boolean) => {
		const rows = rowCoordinates(candidate);
		const neighbors = forward ? incoming : outgoing;
		const weight = (id: string) => {
			const ids = neighbors.get(id) ?? [];
			return ids.length ? median(ids.map((peer) => rows.get(peer)!)) : rows.get(id)!;
		};
		const siblingBlocks = groupFamilies && index > 0
			? families[index - 1].filter(({ exclusive }) => exclusive.length > 1).map(({ exclusive }) => exclusive)
			: [];
		const grouped = new Set(siblingBlocks.flat());
		const comparator = (a: string, b: string) => weight(a) - weight(b) || compareId(a, b);
		const blocks = [...siblingBlocks.map((siblings) => [...siblings].sort(comparator)),
			...candidate[index].filter((id) => !grouped.has(id)).map((id) => [id])];
		const weighted = blocks.map((ids) => ({ ids, weight: median(ids.map(weight)) }));
		weighted.sort((a, b) => a.weight - b.weight || compareId(a.ids[0], b.ids[0]));
		candidate[index] = weighted.flatMap(({ ids }) => ids);
	};

	// Compare grouped and unconstrained median sweeps. Shared children are never
	// assigned to one family arbitrarily; on conflict they follow all their parents.
	for (const groupFamilies of [true, false]) {
		const candidate = best.map((layer) => [...layer]);
		const columns = [...candidate.keys()];
		const seen = new Set<string>();
		for (let round = 0; round < 8; round++) {
			const signature = JSON.stringify(candidate);
			if (seen.has(signature)) break;
			seen.add(signature);
			for (const forward of [true, false]) {
				for (const index of forward ? columns.slice(1) : columns.slice(0, -1).reverse()) {
					sweepLayer(candidate, index, forward, groupFamilies);
					keepBest(candidate);
				}
			}
		}
	}

	// A family can be split even in a layout with zero crossings. Closing the
	// gap may need its neighbors to move together, so try coordinated proposals.
	for (let pass = 0; pass < 4; pass++) {
		const previousBest = bestScore;
		for (const [boundary, groups] of families.entries()) {
			const index = boundary + 1;
			for (const family of groups) {
				for (const memberIds of [family.exclusive, family.children]) {
					if (memberIds.length < 2) continue;
					const members = new Set(memberIds);
					const before = best[index];
					const siblings = before.filter((id) => members.has(id));
					const visible = before.filter((id) => !isLane(id));
					if (visible.indexOf(siblings.at(-1)!) - visible.indexOf(siblings[0]) === siblings.length - 1) continue;
					const others = before.filter((id) => !members.has(id));
					const first = before.indexOf(siblings[0]);
					const last = before.indexOf(siblings.at(-1)!);
					for (const at of new Set([first, last - siblings.length + 1])) {
						const candidate = best.map((layer) => [...layer]);
						candidate[index] = [...others.slice(0, at), ...siblings, ...others.slice(at)];
						keepBest(candidate);
						for (let i = index + 1; i < layers.length; i++) sweepLayer(candidate, i, true, true);
						for (let i = index - 1; i >= 0; i--) sweepLayer(candidate, i, false, true);
						keepBest(candidate);
					}
				}
			}
		}
		if (bestScore === previousBest) break;
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

// Fit each node or lane as close to its preferred Y as possible without changing
// the column order or reducing clearance. Merge neighboring groups that collide;
// fitting their median in offset-free coordinates preserves the minimum spacing.
function fitColumn(targets: number[]) {
	type Pack = { first: number; values: number[]; center: number };
	const packs: Pack[] = [];
	for (const [index, target] of targets.entries()) {
		const value = target - index * ROW_STEP;
		packs.push({ first: index, values: [value], center: value });
		while (packs.length > 1 && packs.at(-2)!.center > packs.at(-1)!.center) {
			const bottom = packs.pop()!;
			const top = packs.at(-1)!;
			top.values.push(...bottom.values);
			top.center = median(top.values);
		}
	}
	return packs.flatMap(({ first, center, values }) => values.map((_, i) => center + (first + i) * ROW_STEP));
}

function alignRows(layers: string[][], boundaries: LaneLink[][], { incoming, outgoing }: ReturnType<typeof indexParentage>) {
	const closeNeighbors = (ids: string[] = []) => {
		const real = ids.filter((id) => !isLane(id));
		return real.length ? real : ids;
	};
	const rows = new Map([...rowCoordinates(layers)].map(([id, row]) => [id, row * ROW_STEP]));
	const links = boundaries.flat();
	const families = layers.flat().filter((id) => !isLane(id)).map((id) => ({
		id, children: closeNeighbors(outgoing.get(id)),
	})).filter(({ children }) => children.length);
	const score = () => [
		families.reduce((sum, { id, children }) => sum + Math.abs(rows.get(id)! - median(children.map((child) => rows.get(child)!))), 0),
		links.reduce((sum, { left, right }) => sum + Math.abs(rows.get(left)! - rows.get(right)!), 0),
		links.reduce((sum, { left, right }) => sum + Math.hypot(COLUMN_STEP - HUB_NODE_WIDTH, rows.get(left)! - rows.get(right)!), 0),
	];
	let best = new Map(rows);
	let bestScore = score();
	for (let round = 0; round < 16; round++) {
		const previous = new Map(rows);
		for (const forward of [true, false]) {
			for (const layer of forward ? layers : [...layers].reverse()) {
				const targets = layer.map((id) => {
					const parents = closeNeighbors(incoming.get(id));
					const children = closeNeighbors(outgoing.get(id));
					const primary = forward ? parents : children;
					const fallback = forward ? children : parents;
					const neighbors = primary.length ? primary : fallback;
					return neighbors.length ? median(neighbors.map((neighbor) => rows.get(neighbor)!)) : rows.get(id)!;
				});
				fitColumn(targets).forEach((row, i) => rows.set(layer[i], row));
			}
			const cost = score();
			if (better(cost, bestScore)) {
				best = new Map(rows);
				bestScore = cost;
			}
		}
		if ([...rows].every(([id, row]) => Math.abs(row - previous.get(id)!) < 0.01)) break;
	}
	return best;
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

	const parentage = indexParentage(boundaries);
	const ordered = orderRows(layers, boundaries, parentage);
	const rows = alignRows(ordered, boundaries, parentage);
	const top = Math.min(...rows.values());
	const height = HUB_NODE_HEIGHT + Math.max(...rows.values()) - top;
	const positions = new Map(ordered.flatMap((layer, index) => layer.map((id) => [
		id, { x: HUB_NODE_WIDTH / 2 + index * COLUMN_STEP, y: HUB_NODE_HEIGHT / 2 + rows.get(id)! - top },
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
