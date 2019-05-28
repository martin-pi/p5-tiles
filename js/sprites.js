/* Because browsers won't load json locally due to xss worries, approximates json for later. */
let SpriteJson = [
	{ // Prototype for customizeable json tile definitions. allows users to search by name or blob, and build an entire fully featured tile with the results.
		name: 'error',
		blob: -1,
		selectionType: 'default', // sequential (input a position index.), random (disregard input, return positions[random]), default (positions[0])
		positions: [{x:23, y:0}],
		colliders: [{
			type: 'aabb', // shape, aabb, circle, none
			width: 1,
			height: 1,
			collision: 'solid' // solid, dynamic, platform, liquid?
		}]
	},
	{
		name: 'empty',
		blob: -1,
		selectionType: 'default',
		positions: [{x:0, y:0}],
		colliders: [{
			type: 'none'
		}]
	},
	{
		name: 'cursor2',
		blob: -1,
		selectionType: 'default',
		positions: [{x:20, y:22}],
		colliders: [{
			type: 'none'
		}]
	},
	{ 
		name: 'tree',
		blob: -1,
		selectionType: 'sequential',
		positions: [{x:1, y:1}, {x:0, y:1}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'ladder',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:1}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'ladder_top',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:0}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0.2}, {x:1, y:0.2}, {x:1, y:1}, {x:0, y:1}],
			collision: 'none'
		}]
	},
	{
		name: 'spikes',
		blob: -1,
		selectionType: 'default',
		positions: [{x:22, y:0}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0.2}, {x:1, y:0.2}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'sign1',
		blob: -1,
		selectionType: 'default',
		positions: [{x:0, y:7}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'sign2',
		blob: -1,
		selectionType: 'default',
		positions: [{x:1, y:7}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'flag',
		blob: -1,
		selectionType: 'default',
		positions: [{x:17, y:9}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'coin',
		blob: -1,
		selectionType: 'default',
		positions: [{x:22, y:4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'gem',
		blob: -1,
		selectionType: 'default',
		positions: [{x:23, y:4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'grass',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:2}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'none'
		}]
	},
	{
		name: 'spring1',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:5}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0.5}, {x:1, y:0.5}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'spring2',
		blob: -1,
		selectionType: 'default',
		positions: [{x:22, y:5}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0.25}, {x:1, y:0.25}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'spring3',
		blob: -1,
		selectionType: 'default',
		positions: [{x:23, y:5}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'platform_left',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:6}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:0.5}, {x:0.5, y:0.5}],
			collision: 'solid'
		}]
	},
	{
		name: 'platform_middle',
		blob: -1,
		selectionType: 'default',
		positions: [{x:22, y:6}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 0.5,
			collision: 'none'
		}]
	},
	{
		name: 'platform_right',
		blob: -1,
		selectionType: 'default',
		positions: [{x:23, y:6}],
		colliders: [{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:0.5, y:0.5}, {x:0, y:0.5}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_stand_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:18, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_walk1_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:19, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_walk2_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:20, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_jump_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:21, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_fall_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:22, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_sleep_r',
		blob: -1,
		selectionType: 'default',
		positions: [{x:23, y:7}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_stand_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:10, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_walk1_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:11, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_walk2_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:12, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_jump_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:13, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_fall_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:14, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: 'char_a_sleep_l',
		blob: -1,
		selectionType: 'default',
		positions: [{x:15, y:32}],
		colliders: [{
			type: 'shape',
			points: [{x:0.125, y:0.25}, {x:0.875, y:0.25}, {x:0.875, y:1}, {x:0.125, y:1}],
			collision: 'solid'
		}]
	},
	//---------------------------------------------------------------
	{
		name: undefined,
		blob: 16,
		selectionType: 'sequential',
		positions: [{x:0, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 28,
		selectionType: 'sequential',
		positions: [{x:1, y:32}, {x: 20, y: 3}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 124,
		selectionType: 'sequential',
		positions: [{x:2, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 112,
		selectionType: 'sequential',
		positions: [{x:3, y:32}, {x: 21, y: 3}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 20,
		selectionType: 'sequential',
		positions: [{x:4, y:32}, {x: 20, y: 3}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:1, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 84,
		selectionType: 'sequential',
		positions: [{x:5, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 80,
		selectionType: 'sequential',
		positions: [{x:6, y:32}, {x: 21, y: 3}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:1}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 247,
		selectionType: 'sequential',
		positions: [{x:7, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 215,
		selectionType: 'sequential',
		positions: [{x:8, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 223,
		selectionType: 'sequential',
		positions: [{x:9, y:32}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	//---------------------------------------------------------------
	{
		name: undefined,
		blob: 17,
		selectionType: 'sequential',
		positions: [{x:0, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 31,
		selectionType: 'sequential',
		positions: [{x:1, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 255,
		selectionType: 'sequential',
		positions: [{x:2, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 241,
		selectionType: 'sequential',
		positions: [{x:3, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 21,
		selectionType: 'sequential',
		positions: [{x:4, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 0,
		selectionType: 'sequential',
		positions: [{x:5, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 81,
		selectionType: 'sequential',
		positions: [{x:6, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 245,
		selectionType: 'sequential',
		positions: [{x:7, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 85,
		selectionType: 'sequential',
		positions: [{x:8, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 95,
		selectionType: 'sequential',
		positions: [{x:9, y:33}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	//---------------------------------------------------------------
	{
		name: undefined,
		blob: 1,
		selectionType: 'sequential',
		positions: [{x:0, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 7,
		selectionType: 'sequential',
		positions: [{x:1, y:34}, {x: 20, y: 4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 199,
		selectionType: 'sequential',
		positions: [{x:2, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 193,
		selectionType: 'sequential',
		positions: [{x:3, y:34}, {x: 21, y: 4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 5,
		selectionType: 'sequential',
		positions: [{x:4, y:34}, {x: 20, y: 4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 69,
		selectionType: 'sequential',
		positions: [{x:5, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 65,
		selectionType: 'sequential',
		positions: [{x:6, y:34}, {x: 21, y: 4}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		},
		{
			type: 'shape',
			points: [{x:0, y:0}, {x:1, y:0}, {x:0, y:1}],
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 253,
		selectionType: 'sequential',
		positions: [{x:7, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 125,
		selectionType: 'sequential',
		positions: [{x:8, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 127,
		selectionType: 'sequential',
		positions: [{x:9, y:34}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	//---------------------------------------------------------------
	{
		name: undefined,
		blob: 4,
		selectionType: 'sequential',
		positions: [{x:1, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 68,
		selectionType: 'sequential',
		positions: [{x:2, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 64,
		selectionType: 'sequential',
		positions: [{x:3, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 116,
		selectionType: 'sequential',
		positions: [{x:4, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 209,
		selectionType: 'sequential',
		positions: [{x:5, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 23,
		selectionType: 'sequential',
		positions: [{x:6, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 92,
		selectionType: 'sequential',
		positions: [{x:7, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 213,
		selectionType: 'sequential',
		positions: [{x:8, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 87,
		selectionType: 'sequential',
		positions: [{x:9, y:35}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	//---------------------------------------------------------------
	{
		name: undefined,
		blob: 221,
		selectionType: 'sequential',
		positions: [{x:2, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 119,
		selectionType: 'sequential',
		positions: [{x:3, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 29,
		selectionType: 'sequential',
		positions: [{x:4, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 71,
		selectionType: 'sequential',
		positions: [{x:5, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 197,
		selectionType: 'sequential',
		positions: [{x:6, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 113,
		selectionType: 'sequential',
		positions: [{x:7, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 117,
		selectionType: 'sequential',
		positions: [{x:8, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
	{
		name: undefined,
		blob: 93,
		selectionType: 'sequential',
		positions: [{x:9, y:36}],
		colliders: [{
			type: 'aabb',
			width: 1,
			height: 1,
			collision: 'solid'
		}]
	},
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
		this.collisionType = representation.colliders[selection].type;
		switch(representation.colliders[selection].type) { 
			case 'shape':
				var points = new Array();
				representation.colliders[selection].points.forEach(function(point) {
					points.push(createVector(point.x * tileWidth, point.y * tileHeight));
				});
				this.collider = new PositionlessShape(points);
				break;
			case 'aabb':
				this.collider = new PositionlessAABB(representation.colliders[selection].width * tileWidth, representation.colliders[selection].height * tileHeight);
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
			if (typeof sprite.name !== 'undefined') {
				self.nameMap.set(sprite.name, sprite);
			}
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