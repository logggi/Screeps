var pathing = require('pathing');

var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var roleRepair = {
    run: function(nam) {
        var creep = Game.creeps[nam];
        var spawn1 = Game.spawns['Spawn1'];
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        var container = creep.pos.findClosestByRange(creep.room.containers());
        
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
        }
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
			creep.memory.repairing = false;
        }
        
        if(!creep.memory.working) {
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, container, 20)
            } 
        } else {
			target = creep.room.towers()[0];
            if(target.energy == target.energyCapacity) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, creep.room.controller, 5)
                }
            } else {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, target, 5);
                }
            }
        }
    }
}

module.exports = roleRepair;