/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var pathing = require('pathing');
 
var roleUpgrader = {
    run: function(name) {

        var creep = Game.creeps[name];
        let control = Game.spawns['Spawn1'].room.controller;

        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        
        if(!creep.memory.working) {
            let resource = control.pos.findClosestByRange(control.room.containers());
            if(resource == undefined) {
                resource = control.pos.findClosestByRange(control.room.sources());
                if(creep.harvest(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    pathing.run(creep, resource)
                }
            } else if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, resource, 5);
            }
        } else {
            if(creep.upgradeController(control) == ERR_NOT_IN_RANGE) {
                pathing.run(creep, control, 5);
            }
        }
    }
}
module.exports = roleUpgrader;