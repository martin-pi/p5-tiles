/* Axis Aligned Bounding Boxes are quick and simple rectangular colliders. */
function AABB (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.intersectsAABB = function(other) {
		if (other instanceof AABB) {
			var oTop = other.y;
			var oBottom = other.y + other.height;
			var oLeft = other.x;
			var oRight = other.x + other.width;
			
			console.log("Other:" + oLeft + "," + oTop + "   " + oRight + "," + oBottom);
			
			var tTop = this.y;
			var tBottom = this.y + this.height;
			var tLeft = this.x;
			var tRight = this.x + this.width;
			
			console.log("This:" + tLeft + "," + tTop + "   " + tRight + "," + tBottom);
			
			console.log(tLeft, "<=", oRight);
			console.log(tLeft <= oRight);
			console.log(tRight, ">=",oLeft);
			console.log(tRight >= oLeft);
			console.log(tBottom, "<=",oTop);
			console.log(tBottom <= oTop);
			console.log(tTop, ">=",oBottom);
			console.log(tTop >= oBottom);
			
			return tLeft <= oRight && tRight >= oLeft && tBottom <= oTop && tTop >= oBottom;
		}
		console.error("Error: Cannot test intersecion of non AABB!");
		return false;
	}
	
	this.containsPoint = function(x, y) {
		return x < (this.x + this.width) && x >= this.x && y < (this.y + this.height) && y >= this.y;
	}
	
	/* Only useful for debug information. Draws a yellow-green box. */
	this.draw = function() {
		if (InputBuffer.instance.get("debug")) {
			push();
			translate(this.x, this.y);
			rectMode(CORNER);
			fill(70, 60, 90, 30);
			stroke(70, 60, 90, 100);
			rect(0, 0, this.width, this.height);
			pop();
		}
	}
};

/* Shapes are best explained as pinwheels of triangles. */
function Shape (x, y, points) {
	this.position = createVector(x, y);
	if (typeof points == "Array" && points.length >= 3) {
		this.points = points;
	} else {
		console.warn("Error: Cannot initialize a shape with less than 3 points.");
		this.points = new Array(createVector(-20, 0), createVector(0, 20), createVector(20, 0), createVector(0, -20));
	}
	
	
	
	/* Surround this shape in an AABB. */
	this.calculateBounds = function() {
		var xMin = 0;
		var yMin = 0;
		var xMax = 0;
		var yMax = 0;
		var self = this;
		this.points.forEach(function(point) {
			xMin = point.x + self.position.x < xMin ? point.x + self.position.x : xMin;
			xMax = point.x + self.position.x >= xMax ? point.x + self.position.x : xMax;
			yMin = point.y + self.position.y < yMin ? point.y + self.position.y : yMin;
			yMax = point.y + self.position.y >= yMax ? point.y + self.position.y : yMax;
		});
		
		return new AABB(xMin, yMin, xMax - xMin, yMax - yMin);
	}
	
	/* Rough collision test. Determine if a more accurate test is necessary. */
	this.intersectsAABB = function(other) {
		if (other instanceof Shape) {
			return this.bounds.intersectsAABB(other.bounds);
		} else if (other instanceof AABB) {
			return this.bounds.intersectsAABB(other);
		} else {
			console.error("Error: Cannot test AABB collision on a non-Shape.");
		}
	}
	
	/* Calculate edges between each couple of points in this shape. */
	this.calculateEdges = function() {
		var edges = new Array();
		for (var i = 0; i < this.points.length; i++) {
			// edges[i] = points[i + 1] - points[i]
			edges.push(this.points[(i + 1) % this.points.length].copy().sub(this.points[i]));
		}
		return edges;
	}
	
	/* Calculate all normal vectors for the edges of this shape. */
	this.calculateNormals = function() {
		var edges = this.calculateEdges();
		var normals = new Array();
		edges.forEach(function(edge) { 
			normals.push(createVector(edge.y, -edge.x).normalize());
		});
		return normals;
	}
		
	/* Project this 2 dimensional shape onto a single dimension */
	this.project = function(axis) {
		var min = this.points[0].copy().add(this.position).dot(axis);
		var max = this.points[0].copy().add(this.position).dot(axis);
			
		for (var i = 1; i < this.points.length; i++) {
			var dot = this.points[i].copy().add(this.position).dot(axis);
			
			min = dot < min ? dot : min;
			max = dot > max ? dot : max;
		}
		return [min, max];
	}
	
	/*  Hyperplane Separation Theorem 
	 *  Returns null if the shapes aren't colliding. Returns an mtv if they are.
	 */
	this.intersectsShape = function(other) {
		var axes = this.normals.concat(other.normals);
		
		var minOverlap = Number.MAX_VALUE;
		var minVector = null;
		
		var self = this;
		axes.forEach(function(axis) {
			projection = self.project(axis);
			var min = projection[0];
			var max = projection[1];
			
			otherProjection = other.project(axis);
			var oMin = otherProjection[0];
			var oMax = otherProjection[1];
			
			// Determine overlap between the two projections.
			if (!(min <= oMax && oMin <= max)) {
				return null; // No collision! Stop here!
			} else {
				// Find the mtv.
				var overlap = Math.max(0, Math.min(max, oMax) - Math.max(min, oMin));
				
				if (overlap < minOverlap) {
					minOverlap = overlap;
					
					// overlap could actually be negative, if so flip it.
					if (min < oMin) {
						minVector = axis.copy().setMag(overlap);
					} else {
						minVector = axis.copy().setMag(-overlap);
					}
				}
			}
		});
		
		return minVector;
	}
	
	this.draw = function() {
		if (InputBuffer.instance.get("debug")) {
			push();
			translate(this.position.x, this.position.y);
			rectMode(CORNER);
			fill(70, 60, 90, 30);
			stroke(70, 60, 90, 100);
			rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
			fill(120, 60, 90, 30);
			stroke(120, 60, 90, 100);
			beginShape();
			this.points.forEach(function(point) {
				vertex(point.x, point.y);
			});
			endShape(CLOSE);
			pop();
		}
	}
	
	this.bounds = this.calculateBounds();
	this.edges = this.calculateEdges();
	this.normals = this.calculateNormals();
};

/* Circles allow us to put boundaries around individual points. */
function Circle (x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
};
