/* Global Tile Properties */
let spriteWidth = 16; // Size in Px of tiles in sprites.png
let spriteHeight = 16;
let spriteSheetSpacing = 1; // Px between sprites.
let spriteSheetXOffset = 0; // Think of this as the X location of the top left corner of the first sprite in the sheet.
let spriteSheetYOffset = 0;
let tileWidth = 32; // Size in Px to draw tiles onscreen.
let tileHeight = 32;
let animationSpeed = 8; // Number of ingame frames to wait between tile animation steps.

/*  Defines a Tile and allows it to be drawn. 
 *  Provide content with the name of a sprite from the tiles map to draw it.
 *  Provide an array of sprite names to create an animated tile. */
class Tile2 {
	constructor(content, selection) {
		this.animated = Array.isArray(content);
		this.selection = typeof selection !== 'undefined' ? selection : 0;
		this.sprite = null;
		this.sprites = null;
		this.spriteIndex = null;
		
		if (this.animated) {
			this.sprites = content;
			this.spriteIndex = 0;
			this.setSprite(this.sprites[this.spriteIndex]);
		} else {
			this.setSprite(content, this.alternate);
		}
	}
	
	setSprite(sprite, selection) {
		if (spriteCollection.has(sprite)) {
			this.sprite = new Sprite(spriteCollection.get(sprite), selection);
			this.spriteX = this.sprite.position.x;
			this.spriteY = this.sprite.position.y;
			//console.log(sprite + " Collision Type " + this.sprite.collisionType);
			this.collisionType = this.sprite.collisionType;
			this.collider = this.sprite.collider;
		} else {
			console.error("Error: '" + sprite + "' is not a valid sprite name.");
		}
	}
	
	/* 	Can only be run after preload completes. 
	 * 	x and y define where in the environment to draw this tile.
	 * 	scale is optional, and will size up the sprite. */
	draw(x, y, scale) {
		scale = typeof scale != 'undefined' ? scale : 1;
		push();
		//tint(hue, saturation, lightness, alpha); //Disabled due to performance hit.
		noSmooth();
		translate(x, y);
		image(sprites,
			[sx = 0],
			[sy = 0],
			[sWidth = tileWidth * scale],
			[sHeight = tileWidth * scale],
			[dx = (spriteWidth + spriteSheetSpacing) * this.spriteX + spriteSheetXOffset],
			[dy = (spriteHeight + spriteSheetSpacing) * this.spriteY + spriteSheetYOffset],
			[spriteWidth],
			[spriteHeight]);
		pop();
		
		if (InputBuffer.instance.get("debug")) { // Draw debug information.
			push();
			noFill();
			stroke(330, 60, 90, 100);
			rect(x, y, tileWidth * scale, tileHeight * scale);
			pop();
			
			push();
			if (typeof this.collider !== 'undefined') {
				this.collider.draw(x, y);
			}
			pop();
		}
	}
	
	/*  Only does anything if animated. Progresses the animation forward. 
	 *  If you want to pause animation, don't call this.
	 *  Provide an index between 0 and the number of frames if you just want to skip to a certain frame. */
	step(index) {
		if (typeof index != 'undefined') {
			if (index >= 0 && index < sprites.length) {
				this.spriteIndex = index;
				this.setSprite(this.sprites[this.spriteIndex]);
			}
		} else {
			if (this.animated && frameCount % animationSpeed == 0) {
				this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
				this.setSprite(this.sprites[this.spriteIndex]);
			}
		}
	}
}

/* Maps the 47 blob tile values to positions in blob.png */
let blob = new Map();
blob.set(16, [[0, 32]]);//
blob.set(28, [[1, 32], [20, 3]]);//
blob.set(124, [[2, 32]]);//
blob.set(112, [[3, 32], [21, 3]]);//
blob.set(20, [[4, 32], [20, 3]]);//
blob.set(84, [[5, 32]]);//
blob.set(80, [[6, 32], [21, 3]]);//
blob.set(247, [[7, 32]]);//
blob.set(215, [[8, 32]]);//
blob.set(223, [[9, 32]]);//

blob.set(17, [[0, 33]]);//
blob.set(31, [[1, 33]]);//
blob.set(255, [[2, 33]]);//
blob.set(241, [[3, 33]]);//
blob.set(21, [[4, 33]]);//
blob.set(0, [[5, 33]]);//
blob.set(81, [[6, 33]]);//
blob.set(245, [[7, 33]]);//
blob.set(85, [[8, 33]]);//
blob.set(95, [[9, 33]]);//

blob.set(1, [[0, 34]]);//
blob.set(7, [[1, 34], [20, 4]]);//
blob.set(199, [[2, 34]]);//
blob.set(193, [[3, 34], [21, 4]]);//
blob.set(5, [[4, 34], [20, 4]]);//
blob.set(69, [[5, 34]]);//
blob.set(65, [[6, 34], [21, 4]]);//
blob.set(253, [[7, 34]]);//
blob.set(125, [[8, 34]]);//
blob.set(127, [[9, 34]]);//

blob.set(4, [[1, 35]]);//
blob.set(68, [[2, 35]]);//
blob.set(64, [[3, 35]]);//
blob.set(116, [[4, 35]]);//
blob.set(209, [[5, 35]]);//
blob.set(23, [[6, 35]]);//
blob.set(92, [[7, 35]]);//
blob.set(213, [[8, 35]]);//
blob.set(87, [[9, 35]]);//

blob.set(221, [[2, 36]]);//
blob.set(119, [[3, 36]]);//
blob.set(29, [[4, 36]]);//
blob.set(71, [[5, 36]]);//
blob.set(197, [[6, 36]]);//
blob.set(113, [[7, 36]]);//
blob.set(117, [[8, 36]]);//
blob.set(93, [[9, 36]]);//

/* Maps a tile name to the position of that tile in sprites.png */
let tiles = new Map();
tiles.set("error", [23, 0]);//
tiles.set("cursor1", [19 ,22]);
tiles.set("cursor2", [20 ,22]);//
tiles.set("cursor3", [21 ,22]);
tiles.set("cursor4", [22 ,22]);
tiles.set("empty", [0, 0]);//

tiles.set(" ", [0, 0]);
tiles.set("0", [19, 29]);
tiles.set("1", [20, 29]);
tiles.set("2", [21, 29]);
tiles.set("3", [22, 29]);
tiles.set("4", [23, 29]);
tiles.set("5", [24, 29]);
tiles.set("6", [25, 29]);
tiles.set("7", [26, 29]);
tiles.set("8", [27, 29]);
tiles.set("9", [28, 29]);
tiles.set(":", [29, 29]);
tiles.set(".", [30, 29]);
tiles.set("%", [31, 29]);
tiles.set("a", [19, 30]);
tiles.set("b", [20, 30]);
tiles.set("c", [21, 30]);
tiles.set("d", [22, 30]);
tiles.set("e", [23, 30]);
tiles.set("f", [24, 30]);
tiles.set("g", [25, 30]);
tiles.set("h", [26, 30]);
tiles.set("i", [27, 30]);
tiles.set("j", [28, 30]);
tiles.set("k", [29, 30]);
tiles.set("l", [30, 30]);
tiles.set("m", [31, 30]);
tiles.set("n", [19, 31]);
tiles.set("o", [20, 31]);
tiles.set("p", [21, 31]);
tiles.set("q", [22, 31]);
tiles.set("r", [23, 31]);
tiles.set("s", [24, 31]);
tiles.set("t", [25, 31]);
tiles.set("u", [26, 31]);
tiles.set("v", [27, 31]);
tiles.set("w", [28, 31]);
tiles.set("x", [29, 31]);
tiles.set("y", [30, 31]);
tiles.set("z", [31, 31]);

tiles.set("grass1", [1, 0]);
tiles.set("gravel", [2, 0]);
tiles.set("cobblestones", [3, 0]);
tiles.set("pavingstones", [4, 0]);
tiles.set("grass2", [5, 0]);
tiles.set("flowers", [6, 0]);
tiles.set("grass3", [7, 0]);
tiles.set("tree", [0, 1]);//

tiles.set("s_topleft", [18, 0]);
tiles.set("s_top", [19, 0]);
tiles.set("s_topright", [20, 0]);
tiles.set("s_left", [18, 1]);
tiles.set("s_right", [20, 1]);
tiles.set("s_bottomleft", [18, 2]);
tiles.set("s_bottom", [19, 2]);
tiles.set("s_bottomright", [20, 2]);
tiles.set("s_angle_topleft", [20, 3]);
tiles.set("s_angle_topright", [21, 3]);
tiles.set("s_angle_bottomleft", [20, 4]);
tiles.set("s_angle_bottomright", [21, 4]);
tiles.set("s_platform_left", [21, 6]);//
tiles.set("s_platform_middle", [22, 6]);//
tiles.set("s_platform_right", [23, 6]);//

tiles.set("s_decor_center", [19, 1]);
tiles.set("s_decor_bottomright", [18, 3]);
tiles.set("s_decor_bottomleft", [19, 3]);
tiles.set("s_decor_topright", [18, 4]);
tiles.set("s_decor_topleft", [19, 4]);

tiles.set("s_ladder", [21, 1]);//
tiles.set("s_ladder_top", [21, 0]);//
tiles.set("s_spikes", [22, 0]);//
tiles.set("s_sign1", [0, 7]);//
tiles.set("s_sign2", [1, 7]);//
tiles.set("s_flag", [17, 9]);//
tiles.set("s_coin", [22, 4]);//
tiles.set("s_gem", [23, 4]);//
tiles.set("s_spring1", [21, 5]);//
tiles.set("s_spring2", [22, 5]);//
tiles.set("s_spring3", [23, 5]);//
tiles.set("s_decor_grass", [21, 2]);//

tiles.set("char_a_stand_r", [18, 7]);//
tiles.set("char_a_walk1_r", [19, 7]);//
tiles.set("char_a_walk2_r", [20, 7]);//
tiles.set("char_a_jump_r", [21, 7]);//
tiles.set("char_a_fall_r", [22, 7]);//
tiles.set("char_a_sleep_r", [23, 7]);//
tiles.set("char_a_stand_l", [10, 32]);//
tiles.set("char_a_walk1_l", [11, 32]);//
tiles.set("char_a_walk2_l", [12, 32]);//
tiles.set("char_a_jump_l", [13, 32]);//
tiles.set("char_a_fall_l", [14, 32]);//
tiles.set("char_a_sleep_l", [15, 32]);//

tiles.set("char_b_stand", [18, 8]);
tiles.set("char_b_walk1", [19, 8]);
tiles.set("char_b_walk2", [20, 8]);
tiles.set("char_b_jump", [21, 8]);
tiles.set("char_b_fall", [22, 8]);
tiles.set("char_b_sleep", [23, 8]);

tiles.set("char_c_stand", [18, 9]);
tiles.set("char_c_walk1", [19, 9]);
tiles.set("char_c_walk2", [20, 9]);
tiles.set("char_c_jump", [21, 9]);
tiles.set("char_c_fall", [22, 9]);
tiles.set("char_c_sleep", [23, 9]);

/*  Defines a Tile and allows it to be drawn. 
 *  Provide content with the name of a sprite from the tiles map to draw it.
 *  Provide an array of sprite names to create an animated tile. */
function Tile (content, alternate) {
	this.setSprite = function(sprite, alt) {
		if (tiles.has(sprite)) {
			this.sprite = sprite;
			this.spriteX = tiles.get(sprite)[0];
			this.spriteY = tiles.get(sprite)[1];
		} else if (blob.has(sprite)) {
			this.sprite = sprite;
			//TODO error checking for out of bounds alts.
			this.spriteX = blob.get(sprite)[alt][0];
			this.spriteY = blob.get(sprite)[alt][1];
		} else {
			console.error("Error: '" + sprite + "' is not a valid sprite name.");
			this.sprite = "error";
			this.spriteX = tiles.get("error")[0];
			this.spriteY = tiles.get("error")[1];
		}
	}
	
	this.sprite = null;
	this.sprites = null;
	this.alternate = typeof alternate !== 'undefined' ? alternate : 0;
	this.spriteIndex = null;
	this.animated = Array.isArray(content);
	
	if (this.animated) {
		this.sprites = content;
		this.spriteIndex = 0;
		this.setSprite(this.sprites[this.spriteIndex]);
	} else {
		this.setSprite(content, this.alternate);
	}
	
	/* 	Can only be run after preload completes. 
	 * 	x and y define where in the environment to draw this tile.
	 * 	hsla are optional, and will apply a color and alpha to the sprite. */
	this.draw = function(x, y, scale) { 
		scale = typeof scale != 'undefined' ? scale : 1;
		
		push();
		//tint(hue, saturation, lightness, alpha); //Disabled due to performance hit.
		noSmooth();
		translate(x, y);
		image(sprites,
			[sx = 0],
			[sy = 0],
			[sWidth = tileWidth * scale],
			[sHeight = tileWidth * scale],
			[dx = (spriteWidth + spriteSheetSpacing) * this.spriteX + spriteSheetXOffset],
			[dy = (spriteHeight + spriteSheetSpacing) * this.spriteY + spriteSheetYOffset],
			[spriteWidth],
			[spriteHeight]);
		pop();
		
		if (InputBuffer.instance.get("debug")) { // Draw debug information.
			push();
			noFill();
			stroke(330, 60, 90, 100);
			rect(x, y, tileWidth * scale, tileHeight * scale);
			pop();
		}
	};
	
	/*  Only does anything if animated. Progresses the animation forward. 
	 *  If you want to pause animation, don't call this.
	 *  Provide an index between 0 and the number of frames if you just want to skip to a certain frame. */
	this.step = function(index) {
		if (typeof index != 'undefined') {
			if (index >= 0 && index < sprites.length) {
				this.spriteIndex = index;
				this.setSprite(this.sprites[this.spriteIndex]);
			}
		} else {
			if (this.animated && frameCount % animationSpeed == 0) {
				this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
				this.setSprite(this.sprites[this.spriteIndex]);
			}
		}
	};
};

/*  Returns true if content can be used to create a valid Tile. */
Tile.isValid = function(content) {
	return tiles.has(content);
}

/*  Defines a group of Tiles that are aligned to each other.
 *  Provide a 2D array to start this group with that array.
 *  Alternately, provide a width and height to generate an empty TileGroup. */
function TileGroup (content, height) {
	this.array = null;
	
	arrayProvided = Array.isArray(content) && Array.isArray(content[0]);
	if (arrayProvided) {
		this.array = content;
	} else {
		this.array = new Array(content);
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = new Array(height);
		}
		
	}
	
	this.width = this.array.length;
	this.height = this.array[0].length;
	
	/*  Allows for setting of individual tiles.
	 *  Provide a Tile object, and an x and y position. 
	 *  This position is measured in tiles, from the top left corner of the TileGroup. */
	this.set = function(tile, x, y) {
		if (x < this.array.length && x >= 0 && y < this.array[x].length && y >= 0) {
			this.array[x][y] = tile;
		} else {
			console.error("Error: Invalid setTile. Is 0 < " + x + " < " + this.array.length + " and 0 < " + y + " < " + this.array[0].length + "?");
		}
	};
	
	this.get = function(x, y) {
		if (x < this.array.length && x >= 0 && y < this.array[x].length && y >= 0) {
			return this.array[x][y];
		} else {
			console.error("Error: Out of Bounds. Is 0 < " + x + " < " + this.array.length + " and 0 < " + y + " < " + this.array[0].length + "?");
		}
	};
	
	this.step = function() {
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[i].length; j++) {
				if (this.array[i][j].animated) {
					this.array[i][j].step();
				}
			}
		}
	};
	
	this.draw = function(x, y) {
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[i].length; j++) {
				if (typeof this.array[i][j] != 'undefined' && this.array[i][j].draw != 'undefined') {
					tileX = x + (i * tileWidth);
					tileY = y + (j * tileHeight);
					this.array[i][j].draw(tileX, tileY);
				}
			}
		}
	};
};

/* Uses a 2d array to create a TileMap of a cohesive object out of tiles.
 */
function BlobFactory(content) {
	// Returns one of the 47 possible blob numbers to equate an x,y position with its blob tile.
	this.getBlob = function(x, y) {
		if (content[x][y] != 0) {
			var context = this.getContext(x, y);
			return (context[0]) + (context[1] * 2) + (context[2] * 4) + (context[3] * 8) + (context[4] * 16) + (context[5] * 32) + (context[6] * 64) + (context[7] * 128);
		}
		return "empty";
	}
	
	// returns an array of booleans representing the context of this object.
	// 7 0 1
	// 6 # 2  -> [0, 1, 2, 3, 4, 5, 6, 7]
	// 5 4 3
	this.getContext = function(x, y) {
		var context = new Array(8);	
		context[0] = Math.min(this.getPoint(x, y - 1), 1); 		// Top
		context[1] = Math.min(this.getPoint(x + 1, y - 1), 1);	// TopRight
		context[2] = Math.min(this.getPoint(x + 1, y), 1);		// Right
		context[3] = Math.min(this.getPoint(x + 1, y + 1), 1);	// BottomRight
		context[4] = Math.min(this.getPoint(x, y + 1), 1);		// Bottom
		context[5] = Math.min(this.getPoint(x - 1, y + 1), 1);	// BottomLeft
		context[6] = Math.min(this.getPoint(x - 1, y), 1);		// Left
		context[7] = Math.min(this.getPoint(x - 1, y - 1), 1);	// TopLeft
		
		// Only return angular connections if they are physically possible. (Thanks, Boris!)
		context[1] = context[0] == 0 || context[2] == 0 ? 0 : context[1];	// TopRight
		context[3] = context[4] == 0 || context[2] == 0 ? 0 : context[3];	// BottomRight
		context[5] = context[4] == 0 || context[6] == 0 ? 0 : context[5];	// BottomLeft
		context[7] = context[0] == 0 || context[6] == 0 ? 0 : context[7];	// TopLeft
		return context;
	}
	
	// Returns the value the x,y position provided in this.context, or 0 if x,y is out of bounds.
	this.getPoint = function(x, y) {
		if (x < 0 || y < 0 || x >= this.content.length || y >= this.content[x].length) {
			return 0;
		} else {
			return content[x][y];
		}
	}
	
	this.tileGroup = new TileGroup(content.length, content[0].length);
	this.content = content;
	
	for (var i = 0; i < content.length; i++) {
		for (var j = 0; j < content[i].length; j++) {
			var tile = new Tile(this.getBlob(i, j), this.getPoint(i, j) - 1);
			this.tileGroup.set(tile, i, j);
		}
	}
	
	return this.tileGroup;	
}

/*  Similar to a TileGroup, allows conversion from a string to an array of Tiles. 
 *  Input a string and (optionally) a max width to create a block of drawable text. */
function TileString(content, width) {
	this.multiline = typeof width != 'undefined';
	this.string = content;
	this.array;
	
	if (this.multiline) {
		this.array = new Array(Math.ceil(content.length / width));
		for (var i = 0; i < this.array.length; i++) {
			this.array[i] = new Array(width);
			for (var j = 0; j < width; j++) {
				if ((i * width) + j < content.length) {
					var character = content.charAt((i * width) + j).toLowerCase();
					if (Tile.isValid(character)) {
						this.array[i][j] = new Tile(character);
					} else {
						this.array[i][j] = new Tile("error");
					}
				}
			}
		}
	} else {
		this.array = new Array(content.length);
		for (var i = 0; i < this.array.length; i++) {
			var character = content.charAt(i).toLowerCase();
			if (Tile.isValid(character)) {
				this.array[i] = new Tile(character);
			} else {
				this.array[i] = new Tile("error");
			}
		}
	}
	
	this.draw = function(x, y) {
		if (this.multiline) {
			for (var i = 0; i < this.array.length; i++) {
				for (var j = 0; j < this.array[i].length; j++) {
					if (typeof this.array[i][j] != 'undefined' && this.array[i][j].draw != 'undefined') {
						tileX = x + (j * tileWidth * 0.5);
						tileY = y + (i * tileHeight * 0.5);
						this.array[i][j].draw(tileX, tileY, 0.5);
					}
				}
			}
		} else {
			for (var i = 0; i < this.array.length; i++) {
				if (typeof this.array[i] != 'undefined' && this.array[i].draw != 'undefined') {
					tileX = x + (i * tileWidth * 0.5);
					tileY = y + (0 * tileHeight * 0.5);
					this.array[i].draw(tileX, tileY, 0.5);
				}
			}
		}
	};
	
	this.toString = function() {
		return this.string;
	};
};


