module.exports = {
    init: function() {
    
    //Get all towers
    Room.prototype.towers = function() {
        if(!this._towers) {
            if(!this.memory.towerIds) {
                this.memory.towerIds = this.find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_TOWER}).map(tower => tower.id)
            }
            this._towers = this.memory.towerIds.map(id => Game.getObjectById(id));
        }
        return this._towers;
    }
    
    //Get all sources
    Room.prototype.sources = function() {
        if(!this._sources) {
            if(!this.memory.sourceIds) {
                this.memory.sourceIds = this.find(FIND_SOURCES).map(source => source.id);
            }
            this._sources = this.memory.sourceIds.map(id => Game.getObjectById(id));
        }
        return this._sources;
    }
    
    
    //Get all spawning structures
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