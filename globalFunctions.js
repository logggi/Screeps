module.exports = {
    init: function() {
        
	Object.defineProperty(Room.prototype, 'sources', {
	    get: function() {
	        if(!Memory.sources) {
    	        Memory.sources = this.find(FIND_SOURCES);
	        }
    	    return Memory.sources;
	    },
	    enumerable: false,
	    configurable: true
	});


    if(!Memory.spawnStructures) {
        Memory.spawnStructures = {};
        Memory.spawnStructures.length = 0;
        Memory.spawnStructures.update = true;
    }
	Object.defineProperty(Room.prototype, 'spawnStructures', {
	    get: function() {
	        if(!Memory.spawnStructures || Memory.spawnStructures.update) {
	            var i = 0;
	            Memory.spawnStructures = {};
	            this.find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_EXTENSION || obj.structureType == STRUCTURE_SPAWN}).forEach(function(obj) {;
	                Memory.spawnStructures[i++] = {id: obj.id, pos: obj.pos};
	                Memory.spawnStructures.update = false;
	                Memory.spawnStructures.length = i;
	            });
	        }
	        var arr = [];
            for(var i=0;i<Memory.spawnStructures.length;i++) {
                arr[i] = Game.getObjectById(Memory.spawnStructures[i].id);
            }
	        return arr;
	    },
	    enumerable: false,
	    configurable: true
	})
    }
};