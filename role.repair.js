var pathing = require('pathing');

var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var roleRepair = {
    run: function(nam) {
        var creep = Game.creeps[nam];
        var spawn1 = Game.spawns['Spawn1'];
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
        }
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
			creep.memory.repairing = false;
        }
        
        if(!creep.memory.working) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, source, 5);
            }    
        } else {
			var targets = undefined;
            if(creep.memory.repairing) {
				targets = creep.pos.findInRange(FIND_STRUCTURES, 3, { filter: obj => (obj.hits+1) < obj.hitsMax });
            } else {
				targets = spawn1.room.find(FIND_STRUCTURES, { filter: obj => obj.hits < obj.hitsMax });
			}
			targets.sort((a,b) => a.hits - b.hits);
			target = targets[0];
            if(target != undefined) {
                console.log(target)
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, target, 5);
					creep.memory.repairing = true;
                }
            } else {
				if(creep.memory.repairing) {
					creep.memory.repairing = false;
				}
                roleBuilder.run(nam)
            }
        }
    }
}

module.exports = roleRepair;