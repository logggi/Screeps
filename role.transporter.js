/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var pathing = require('pathing');

module.exports = function(name) {
    let creep = Game.creeps[name];
    let containers = creep.room.containers();
    
    let target = creep.pos.findClosestByRange(creep.room.spawnStructures(), {filter: obj => obj.energy != obj.energyCapacity})
    if(target == undefined) {
        target = creep.pos.findClosestByRange(creep.room.towers());
    }
    let container = Game.getObjectById(creep.memory.container);
    
    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }
    if(creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
    }

    if(!creep.memory.working) {
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            pathing.run(creep, container, 20)
        }
        if (!container) {
            let source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, source, 20)
            }
        }
    }
    else
    {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            pathing.run(creep, target, 10);
        }
    }
};