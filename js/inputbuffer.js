/*  Implements observer pattern, allowing objects to subscribe to inputs with callbacks, or query current input values.
 */
function InputBuffer() {
	var instance;
	this.keys = new Map(); 		// Map of (string, boolean). Keeps track of current input values.
	this.observers = new Map(); // Map of (string, array). Maps a value from keys to an array of callbacks.


	this.keyDown = function(key) {
		this.keys.set(key, true);
		this.notify(key);
	}
	this.keyUp = function(key) {
		this.keys.set(key, false);
		this.notify(key);
	}
	this.toggle = function(key) {
		if (this.keys.has(key)) {
			this.keys.set(key, !this.keys.get(key));
		} else {
			this.keys.set(key, true); 	// True on first keypress if undefined before.
										// Call set(key, false) to make something false by default instead of undefined.
		}
		this.notify(key);
	}
	this.set = function(key, value) {
		this.keys.set(key, value);
		this.notify(key);
	}
	
	this.subscribe = function(key, callback) {
		if (this.observers.has(key)) {
			var observerArr = this.observers.get(key);
			observerArr.push(callback);
			this.observers.set(key, observerArr);
		} else {
			this.observers.set(key, [callback]);
		}
	}

	// Subscribers will be automatically notified when keyDown(), keyUp(), toggle(), or set() are called.
	this.notify = function(key) { 
		if (this.observers.has(key)) {
			this.observers.get(key).forEach(observer => observer(this.keys.get(key)));
		}
	}
	
	this.get = function(key) {
		return this.keys.get(key);
	}
}

InputBuffer.instance = new InputBuffer(); // Global input buffer. Can be queried from anywhere!