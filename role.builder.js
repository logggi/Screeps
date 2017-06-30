/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
 
 var roleUpgrader = require('role.upgrader');
 
var roleBuilder = {
    run: function(nam) {

        var creep = Game.creeps[nam];
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
         
        if(target) {
			var source = target.pos.findClosestByRange(FIND_SOURCES);
			if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
            }
            if(creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            if(!creep.memory.working) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    pathing(creep, source, 20);
                }
            } else {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    pathing(creep, target, 20);
                }
            }
        } else {
            roleUpgrader.run(nam)
        }
    }
}
module.exports = roleBuilder;
