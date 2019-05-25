/* Because browsers won't load json locally due to xss worries, approximates json for later. */
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

/*  This is basically a factory. 
 *  Input a sprite representation from spriteCollection, and a selection.
 *  Returns everything you need in order to draw a sprite. 
 */
class Sprite {
	constructor(representation, selection) {
		this.name = representation.name;
		this.blob = representation.blob;
		
		// Determine the specific tile that this sprite references.
		switch(representation.selectionType) {
			default:
			case 'sequential':
				if (selection >= 0 && selection < representation.positions.length) {
					break;
				}
				selection = 0;
				break;
			case 'random':
				selection = Math.floor(Math.random() * representation.positions.length);
				break;
		}
		this.position = representation.positions[selection];
		
		// Create the collider that this tile uses.
		switch(representation.collider.type) { 
			case 'shape':
				var points = new Array();
				representation.collider.points.forEach(function(point) {
					points.push(createVector(point.x, point.y));
				});
				this.collider = new PositionlessShape(points);
				break;
			case 'aabb':
				this.collider = new PositionlessAABB(representation.width, representation.height);
				break;
			case 'circle':
				this.collider = undefined;
				console.error("TODO: Implement Circle Collision");
				break;
			case 'none':
			default:
				this.collider = undefined;
		}
	}
}

/* A "Singleton" representing a collection of sprites to be read from json on pageload. */
class SpriteCollection {
	constructor() {
		this.nameMap = new Map();
		this.blobMap = new Map();
		var self = this;
		SpriteJson.forEach(function(sprite) { // TODO: whenever proper hosting is figured out, use actual json with read/write
			if (sprite.blob >= 0) {
				self.blobMap.set(sprite.blob, sprite);
			}
			self.nameMap.set(sprite.name, sprite);
		});
	}
	
	get(content) {
		if (this.nameMap.has(content)) {
			return this.nameMap.get(content);
		}
		if (this.blobMap.has(content)) {
			return this.blobMap.get(content);
		}
		return null;
	}
	
	has(content) {
		return this.nameMap.has(content) || this.blobMap.has(content)
	}
}
const spriteCollection = new SpriteCollection();
Object.freeze(spriteCollection);