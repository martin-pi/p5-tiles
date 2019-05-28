var version = 0.01;
console.log("Game\nVersion " + version);

// ------------------------------------------------------------------------------------------------
// Game-wide variables

// Creating tiles with and without animation
let cursor;
let error;
let tree;
let character;
let characterWalk;

// Manually creating TileGroups
let group = new TileGroup(2, 3);
group.set(error, 0, 0);
group.set(tree, 0, 2);
group.set(error, 1, 0);

let wallGroup;

let platform;
let platform2;
// Creating TileStrings
var str = "asdf ASDF :.% *Error";
let string = new TileString(str);
var str2 = "This is a very long string that should be split into multiple lines."
let multiline = new TileString(str2, 20);

// Creating Props
let ladder;
let grass2;
let sign;
let spring;



let blobAssm;

// Creating complex Characters
let characterProp = new Character(64, 128);

// Physics Colliders
let aabb1 = new AABB(128, 128, 64, 32);

let tile2 = new Tile2('error');
let tile3 = new Tile2(['error', 'tree']);

function initialize() {
	ladder = new Ladder(480, 224, 5);
	var destinations = [[640, 256], [720, 256]];
	platform = new Platform(640, 256, 3, destinations, 1, 40);
	platform2 = new Platform(816, 256, 2);
	grass2 = new Decor(520, 224, "grass");
	sign = new Decor(550, 224, "sign1");
	spring = new Spring(608, 224);
	
	cursor = new Tile2("cursor2");
	error = new Tile2("error");
	tree = new Tile("tree");
	character = new Tile2(["char_a_stand_l","char_a_walk1_l","char_a_walk2_l","char_a_jump_l","char_a_fall_l","char_a_sleep_l"]);
	characterWalk = new Tile2(["char_a_walk1_l","char_a_walk2_l"]);
	
	shape1 = new Shape(100, 200);
	
	shape2 = new Shape(110, 220);
	
	shape3 = new Shape(100, 300);
	mouseShape = new Shape(mouseX, mouseY, [createVector(-5, 0), createVector(0, 5), createVector(5, 0), createVector(0, -5)]);

	var wallArr = [
		[new Tile2(28, 0), new Tile2(31, 0), new Tile2(7, 0)],
		[new Tile2(124, 0), new Tile2(255, 0), new Tile2(199, 0)],
		[new Tile2(124, 0), new Tile2(247, 0), new Tile2(199, 0)],
		[new Tile2(112, 0), new Tile2(241, 0), new Tile2(193, 1)]
	];
	wallGroup = new TileGroup(wallArr);
	
	var blobArr = [[1,1,0,1,0], [0,1,1,1,0], [2,1,1,1,2], [1,0,2,1,1], [1,0,0,1,0], [1,1,1,0,1], [1,1,1,1,0], [2,1,1,0,1]];
	blobAssm = new BlobFactory(blobArr); // This is a TileGroup, not a prop or BlobFactory!
}

// ------------------------------------------------------------------------------------------------
// Game-wide functions
function preload() {
	sprites = loadImage("assets/sprites2.png");
	blob = loadImage("assets/blob.png");
	console.log("Preload complete!");
}

function setup() {
	var canvas = createCanvas(width, height);
	canvas.parent('game');
	initialize();
	frameRate(60);
	colorMode(HSB, 360, 100, 100, 100);
	resizeCanvas(windowWidth,windowHeight);
	console.log("Setup complete!");
}

function draw() {
	background(20);
	noCursor();

	
	
	tree.step();
	tree.draw(48, 16);
		
	character.step();
	character.draw(112, 16);
	characterWalk.step();
	characterWalk.draw(144, 16);
	
	error.draw(80, 16);
		
	group.draw(256, 256);
	
	wallGroup.draw(512, 256);
	
	string.draw(256, 96);
	
	multiline.draw(256, 144);
	
	push();
	fill(0, 0, 100);
	text(Math.floor(frameRate()), width - 40, 30)
	pop();
	
	cursor.draw(mouseX - 4, mouseY - 4);
	
	ladder.draw();
	grass2.draw();
	sign.draw();
	
	spring.step();
	spring.draw();
	
	platform.step();
	platform.draw();
	
	platform2.draw();
	
	blobAssm.draw(600, 16);
	
	characterProp.step();
	characterProp.draw();
	
	aabb1.draw();
	
	shape1.draw();
	shape2.draw();
	shape3.draw();
	
	mouseShape.move(mouseX, mouseY);
	mouseShape.draw();
	
	tile2.draw(64, 300);
	tile3.step();
	tile3.draw(96, 300);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
	//console.log("Click");
}

function keyPressed() {
	if (key) {
		switch (key) {
			case 'w':
				InputBuffer.instance.keyDown("up");
				break;
			case 'a':
				InputBuffer.instance.keyDown("left");
				break;
			case 's':
				InputBuffer.instance.keyDown("down");
				break;
			case 'd':
				InputBuffer.instance.keyDown("right");
				break;
			case '=':
				InputBuffer.instance.toggle("debug");
				break;
		}
	}
}

function keyReleased() {
	if (key) {
		switch (key) {
			case 'w':
				InputBuffer.instance.keyUp("up");
				break;
			case 'a':
				InputBuffer.instance.keyUp("left");
				break;
			case 's':
				InputBuffer.instance.keyUp("down");
				break;
			case 'd':
				InputBuffer.instance.keyUp("right");
				break;
		}
	}
}


// ------------------------------------------------------------------------------------------------
// Objects
