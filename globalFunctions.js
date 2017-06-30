module.exports = {
    init: function() {
	Object.defineProperty(Room.prototype, 'sources', {
	    get: function() {
	        return this.find(FIND_SOURCES);
	    },
	    enumerable: false,
	    configurable: true
	});
    }
};