var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var pathing = require('pathing');

var roleHarvester = {
    run: function(nam) {
        var creep = Game.creeps[nam];
        var spawn1 = Game.spawns['Spawn1'];
        //var sources = creep.pos.findClosestByRange(FIND_SOURCES, {filter: obj => obj.energy > 0});
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
					pathing(creep, sources, 30);
                }    
            } else {
                if(spawn1.energy < spawn1.energyCapacity) {
                    if(creep.transfer(spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        pathing(creep, spawn1, 30);
					}
                } else {
                    roleBuilder.run(nam)
                }
            }
        }
    }
}

module.exports = roleHarvester;