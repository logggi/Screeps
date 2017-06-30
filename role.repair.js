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
        }
        
        if(!creep.memory.working) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
            }    
        } else {
            var targets = spawn1.room.find(FIND_STRUCTURES, { filter: obj => obj.hits < obj.hitsMax });
            targets.sort((a,b) => a.hits - b.hits);
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                console.log(targets.length)
                roleBuilder.run(nam)
            }
        }
    }
}

module.exports = roleRepair;