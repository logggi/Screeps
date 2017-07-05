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
			if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
            }
            if(creep.memory.working && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            if(!creep.memory.working) {
                var source = target.pos.findClosestByRange(target.room.containers(), {filter: obj => obj.store[RESOURCE_ENERGY] > 200});
                if(!source) {
                    source = target.pos.findClosestByRange(creep.room.sources());
                    //source = Game.getObjectById('58dbc6088283ff5308a4182d');
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        pathing.run(creep, source, 10);
                    }
                } else {
                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        pathing.run(creep, source, 10);
                    }
                }
            } else {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, target, 30);
                }
            }
        } else {
            roleUpgrader.run(name)
        }
    }
}
module.exports = roleBuilder;
