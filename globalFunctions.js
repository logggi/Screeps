module.exports = {
    init: function() {
	Object.defineProperty(Room.prototype, 'sources', {
	    get: function() {
	        if(!this._sources) {
    	        this._sources = this.find(FIND_SOURCES);
    	        return this._sources;
	        }
	    },
	    enumerable: false,
	    configurable: true
	});
    }
};