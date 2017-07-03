module.exports = {
    init: function() {
    
        //Give sources memory
        Object.defineProperty(Source.prototype, 'memory', {
           configurable: true,
           get: function() {
               if(_.isUndefined(Memory.mySourcesMemory)) {
                   Memory.mySourcesMemory = {};
               }
               if(!_.isObject(Memory.mySourcesMemory)) {
                   return undefined;
               }
               return Memory.mySourcesMemory[this.id] || {};
           },
           set: function(value) {
               if(_.isUndefined(Memory.mySourcesMemory)) {
                   Memory.mySourcesMemory = {};
               }
               if(!_.isObject(Memory.mySourcesMemory)) {
                   throw new Error('Could not set souce memory');
               }
               Memory.mySourcesMemory[this.id] = value;
           }
        });
        
        //Get all containers
        Room.prototype.containers = function() {
            if(!this._containers) {
                if(!this.memory.containerIds) {
                    this.memory.containerIds = this.find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_CONTAINER}).map(obj => obj.id)
                }
                this._containers = this.memory.containerIds.map(id => Game.getObjectById(id));
            }
            return this._containers;
        }
        
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
        Room.prototype.spawnStructures = function() {
            if(!this._spawnStructures) {
                if(!this.memory.spawnStructures || this.memory.spawnStructuresUpdate) {
                    this.memory.spawnStructures = this.find(FIND_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_SPAWN || obj.structureType == STRUCTURE_EXTENSION}).map(structs => structs.id);
                    this.memory.spawnStructuresUpdate = false;
                }
                this._spawnStructures = this.memory.spawnStructures.map(id => Game.getObjectById(id));
            }
            return this._spawnStructures;
        }
    }
};
