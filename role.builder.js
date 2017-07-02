/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var pathing = require('pathing');
 
var roleUpgrader = require('role.upgrader');
 
var roleBuilder = {
    run: function(name) {

        var creep = Game.creeps[name];
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        
        if(target) {
			var source = target.pos.findClosestByRange(creep.room.sources());
			if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
            }
            if(creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            if(!creep.memory.working) {
                var container = target.pos.findClosestByRange(target.room.containers(), {filter: obj => obj.store[RESOURCE_ENERGY] > 200});
                
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, container, 5);
                }
            } else {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, target, 5);
                }
                if(!Game.constructionSites[target.id]) {
                    Memory.spawnStructures.update = true;
                }
            }
        } else {
            roleUpgrader.run(nam)
        }
    }
}
module.exports = roleBuilder;
