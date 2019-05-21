function Decor (x, y, content) {
	this.x = x;
	this.y = y;
	this.tile = undefined;
	this.tileGroup = undefined;
	this.isGroup = Array.isArray(content);
	
	if (this.isGroup) {
		this.tileGroup = new TileGroup(content);
	} else {
		this.tile = new Tile(content);
	}
	
	this.draw = function() {
		if (this.isGroup) {
			this.tileGroup.draw(this.x, this.y);
		} else {
			this.tile.draw(this.x, this.y);
		}
	}
	
	this.step = function() {
		
	}
}

function Ladder (x, y, height) {
	this.x = x;
	this.y = y;
	
	this.tileGroup = new TileGroup(1, height);
	this.tileGroup.set(new Tile("s_ladder_top"), 0, 0);
	for (var i = 1; i < height; i++) {
		this.tileGroup.set(new Tile("s_ladder"), 0, i);
	}
	
	this.draw = function() {
		this.tileGroup.draw(this.x, this.y);
	};
	
	this.step = function() {
		
	};
};

function WallBlock (x, y, content, height) {
	//content is either an array of 1s and 0s to feed into a shape generator, or a width.
}

function Spring (x, y) {
	this.x = x;
	this.y = y;
	
	this.state = new Spring.inactive(this);

	
	this.changeState = function(state) {
		this.state = state;
	};
	
	this.step = function() {
		this.state.step();
	};
	
	this.draw = function() {
		this.state.draw(this.x, this.y);
	};
}

Spring.active = function (spring) {
	this.spring = spring;
	this.tile = new Tile(["s_spring2", "s_spring3", "s_spring2", "s_spring1"]);
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		// if the animation is complete, move to the inactive state.
		if (this.tile.spriteIndex == 3) {
			this.spring.changeState(new Spring.inactive(this.spring));
		}
	};
}
Spring.inactive = function (spring) {
	this.spring = spring;
	this.tile = new Tile("s_spring1");
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		// Check for an upward collision and move to the active state if detected.
		if (frameCount % 180 == 0) {
			this.spring.changeState(new Spring.active(this.spring));
		}
	};
}

function Platform (x, y, width, destinations, speed, wait) {
	// Destinations is an array of x,y pairs that this platform will travel between in a loop.
	this.destinations = destinations;
	this.destinationIndex = 0;
	this.wait = typeof wait != 'undefined' ? wait : 0;
	this.speed = typeof wait != 'undefined' ? speed : 1;
	this.state = new Platform.move(this);
	
	this.x = x;
	this.y = y;
	this.tileGroup = new TileGroup(width, 1);
	if (width == 1) {
		this.tileGroup.set(new Tile("s_platform_middle"), 0, 0);
	} else {
		this.tileGroup.set(new Tile("s_platform_left"), 0, 0);
		this.tileGroup.set(new Tile("s_platform_right"), width - 1, 0);
		for (var i = 1; i < width - 1; i++) {
			this.tileGroup.set(new Tile("s_platform_middle"), i, 0);
		}
	}
	
	this.changeState = function(state) {
		this.state = state;
	};
	
	this.draw = function() {
		this.tileGroup.draw(this.x, this.y);
	};
	
	this.step = function() {
		this.state.step();
	};
}

Platform.move = function(platform) {
	this.platform = platform;
	
	this.step = function() {
		if (typeof this.platform.destinations != undefined) {
			var destination = this.platform.destinations[this.platform.destinationIndex];
			// If you have reached your destination, get a new one.
			if (this.platform.x == destination[0] && this.platform.y == destination[1]) {
				this.platform.destinationIndex = (this.platform.destinationIndex + 1) % this.platform.destinations.length;
				this.platform.changeState(new Platform.wait(this.platform));
			}
			// Step towards your new destination.
			var toDest = createVector(destination[0] - this.platform.x, destination[1] - this.platform.y).limit(this.platform.speed);
			this.platform.x += toDest.x;
			this.platform.y += toDest.y;
		}
	};
}
Platform.wait = function(platform) {
	this.platform = platform;
	this.timeLeft = this.platform.wait;
	
	this.step = function() {
		if (this.timeLeft <= 1) {
			this.platform.changeState(new Platform.move(this.platform));
		}
		this.timeLeft -= 1;
	};
}


function Character(x, y) {
	this.x = x;
	this.y = y;
	//this.position = createVector(x, y);
	//this.velocity = createVector(0, 0);
	
	this.state = new Character.stand(this);

	
	this.changeState = function(state) {
		this.state = state;
	};
	
	this.step = function() {
		//console.log(this.state);
		this.state.step();
	};
	
	this.draw = function() {
		this.state.draw(this.x, this.y);
	};
}

Character.stand = function (character, direction) {
	this.character = character;
	this.direction = direction;
	if (direction > 0) {
		this.tile = new Tile(["char_a_stand_r"]);
	} else {
		this.tile = new Tile(["char_a_stand_l"]);
	}
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		if (InputBuffer.instance.get("left")) {
			this.character.changeState(new Character.walk(this.character, -1));
		}
		if (InputBuffer.instance.get("right")) {
			this.character.changeState(new Character.walk(this.character, 1));
		}
		if (InputBuffer.instance.get("up")) {
			this.character.changeState(new Character.jump(this.character, this.direction));
		}
	};
}
Character.walk = function (character, direction) {
	this.character = character;
	this.direction = direction;
	if (direction > 0) {
		this.tile = new Tile(["char_a_walk1_r", "char_a_walk2_r"]);
	} else {
		this.tile = new Tile(["char_a_walk1_l", "char_a_walk2_l"]);
	}
	
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		if (!InputBuffer.instance.get("left") && !InputBuffer.instance.get("right")) {
			this.character.changeState(new Character.stand(this.character, this.direction));
		}
		if (this.direction > 0 && !InputBuffer.instance.get("right")) {
			if (InputBuffer.instance.get("left")) {
				this.character.changeState(new Character.walk(this.character, -1));
			}
		}
		if (this.direction < 0 && !InputBuffer.instance.get("left")) {
			if (InputBuffer.instance.get("right")) {
				this.character.changeState(new Character.walk(this.character, 1));
			}
		}
		if (InputBuffer.instance.get("up")) {
			this.character.changeState(new Character.jump(this.character, this.direction));
		}
	};
}
Character.jump = function (character, direction) {
	this.character = character;
	this.direction = direction;
	if (direction > 0) {
		this.tile = new Tile(["char_a_jump_r"]);
	} else {
		this.tile = new Tile(["char_a_jump_l"]);
	}
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		if (frameCount % 50 == 0) {
			this.character.changeState(new Character.fall(this.character, this.direction));
		}
	};
}
Character.fall = function (character, direction) {
	this.character = character;
	this.direction = direction;
	if (direction > 0) {
		this.tile = new Tile(["char_a_fall_r"]);
	} else {
		this.tile = new Tile(["char_a_fall_l"]);
	}
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		if (frameCount % 50 == 0) {
			this.character.changeState(new Character.land(this.character, this.direction));
		} else {
			if (InputBuffer.instance.get("left")) {
				this.character.changeState(new Character.fall(this.character, -1));
			}
			if (InputBuffer.instance.get("right")) {
				this.character.changeState(new Character.fall(this.character, 1));
			}
		}
	};
}
Character.land = function (character, direction) {
	this.character = character;
	this.direction = direction;
	if (direction > 0) {
		this.tile = new Tile(["char_a_sleep_r", "char_a_jump_r", "char_a_stand_r"]);
	} else {
		this.tile = new Tile(["char_a_sleep_l", "char_a_jump_l", "char_a_stand_l"]);
	}
	
	
	this.draw = function(x, y) {
		this.tile.draw(x, y);
	};
	
	this.step = function() {
		this.tile.step();
		if (this.tile.spriteIndex == 2) {
			this.character.changeState(new Character.stand(this.character, this.direction));
		}
	};
}