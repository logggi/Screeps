var pathing = require('pathing');

var roleHarvester = {
    run: function(name) {
        let creep = Game.creeps[name];
        let source = Game.getObjectById(creep.memory.source);
        let container = Game.getObjectById(creep.memory.container);
        creep.pickup(creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1)[0]);
        if(Object.keys(Game.creeps).length == 1 && creep.energy == creep.energyCapacity) { 
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                pathing.run(creep,Game.spawns['Spawn1']);
            }
        } else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            pathing.run(creep, source, 20);
        }
        if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            pathing.run(creep, container, 5)
        }
    }
}

module.exports = roleHarvester;