var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var pathing = require('pathing');

var roleHarvester = {
    run: function(name) {
        if(false) {
            var creep = Game.creeps[name];
            var target = creep.pos.findClosestByRange(creep.room.spawnStructures, {filter: obj => obj.energy < obj.energyCapacity});
            
            if(target == undefined) {
                target = Game.spawns['Spawn1'];
            }
            
            var sources = Game.getObjectById('58dbc35f8283ff5308a3d71f');
            
            if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
            }
            if(creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            
            if(sources) {
                if(!creep.memory.working) {
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
    					pathing.run(creep, sources, 20);
                    }    
                } else {
                    if(target.energy < target.energyCapacity) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            pathing.run(creep, target, 20);
    					}
                    } else {
                        roleBuilder.run(name)
                    }
                }
            }
        }
        else
        {
            let creep = Game.creeps[name];
            let source = Game.getObjectById(creep.memory.source);
            let container = Game.getObjectById(creep.memory.container);
            if(container.store[RESOURCE_ENERGY] >= 0) {
                creep.pickup(creep.pos.findInRange(FIND_DROPPED_ENERGY,1)[0]);
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    pathing.run(creep, container, 5)
                }
            }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            {
                pathing.run(creep, source, 20);
            }
        }
    }
}

module.exports = roleHarvester;