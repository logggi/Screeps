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
    let container = undefined; //target.pos.findClosestByRange(containers, {filter: obj => obj.store[RESOURCE_ENERGY] > 0});
    //let container = Game.getObjectById('5958b3408df84f4018fd5af1')
    
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
            let source = creep.pos.findClosestByRange(creep.room.sources());
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, source, 10)
            }
        }
    }
    else
    {
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, target, 20);
            }
        } else {
            target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, target, 5)
            }
        }
    }
};