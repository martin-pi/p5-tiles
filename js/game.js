var version = 0.01;
console.log("Game\nVersion " + version);

// ------------------------------------------------------------------------------------------------
// Game-wide variables

// Creating tiles with and without animation
let cursor = new Tile("cursor2");
let error = new Tile("error");
let tree = new Tile(["tree", "grass1", "grass2", "grass3"]);
let exampleWalls = new Tile(["s_topleft","s_top","s_topright","s_left","s_right","s_bottomleft","s_bottom","s_bottomright","s_angle_topleft","s_angle_topright","s_angle_bottomleft","s_angle_bottomright","s_decor_center","s_decor_bottomright","s_decor_bottomleft","s_decor_topright","s_decor_topleft"]);
let character = new Tile(["char_a_stand_l","char_a_walk1_l","char_a_walk2_l","char_a_jump_l","char_a_fall_l","char_a_sleep_l"]);
let characterWalk = new Tile(["char_a_walk1_l","char_a_walk2_l"]);

// Manually creating TileGroups
let group = new TileGroup(2, 3);
group.set(error, 0, 0);
group.set(tree, 0, 2);
group.set(error, 1, 0);
var wallArr = [
	[new Tile("s_topleft"), new Tile("s_left"), new Tile("s_bottomleft")],
	[new Tile("s_top"), new Tile("s_decor_center"), new Tile("s_bottom")],
	[new Tile("s_top"), new Tile("s_decor_bottomright"), new Tile("s_bottom")],
	[new Tile("s_topright"), new Tile("s_right"), new Tile("s_angle_bottomright")]
];
let wallGroup = new TileGroup(wallArr);

// Creating TileStrings
var str = "asdf ASDF :.% *Error";
let string = new TileString(str);
var str2 = "This is a very long string that should be split into multiple lines."
let multiline = new TileString(str2, 20);

// Creating Props
let ladder = new Ladder(480, 224, 5);
let grass2 = new Decor(520, 224, "s_decor_grass");
let sign = new Decor(550, 224, "s_sign1");
let spring = new Spring(608, 224);

var destinations = [[640, 256], [720, 256]];
let platform = new Platform(640, 256, 3, destinations, 1, 40);
let platform2 = new Platform(816, 256, 2);

// Working with BlobFactories
var blobArr = [[1,1,0,1,0], [0,1,1,1,0], [2,1,1,1,2], [1,0,2,1,1], [1,0,0,1,0], [1,1,1,0,1], [1,1,1,1,0], [2,1,1,0,1]];
let blobAssm = new BlobFactory(blobArr); // This is a TileGroup, not a prop or BlobFactory!

// Creating complex Characters
let characterProp = new Character(64, 128);

// Physics Colliders
let aabb1 = new AABB(128, 128, 64, 32);

let shape1;
function initialize() {
	
	shape1 = new Shape(100, 200);
	
	shape2 = new Shape(100, 220);
}

// ------------------------------------------------------------------------------------------------
// Game-wide functions
function preload() {
	sprites = loadImage("assets/sprites2.png");
	blob = loadImage("assets/blob.png");
	console.log("Preload complete!");
}

function setup() {
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
	
	exampleWalls.step();
	exampleWalls.draw(16, 16);
	
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
