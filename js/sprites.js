let SpriteJson = [
	{ // Prototype for customizeable json tile definitions. allows users to search by name or blob, and build an entire fully featured tile with the results.
		name: 'tree',
		blob: -1,
		positions: [{x:1, y:1}, {x:0, y:1}],
		selectionType: 'sequential', // sequential, random, default
		collider: {
			type: 'shape', // shape, aabb, circle
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}], // Numbers as a (0.0-1.0) percentage of tileWidth and tileHeight
			collision: 'solid' // solid, dynamic, platform, or none
		}
	},
	{ 
		name: 'tree',
		blob: -1,
		positions: [{x:1, y:1}, {x:0, y:1}],
		selectionType: 'sequential',
		collider: {
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}
	}
];