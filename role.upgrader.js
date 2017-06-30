/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = {
    run: function(nam) {

        var creep = Game.creeps[nam];
        var spawn1 = Game.spawns['Spawn1'];
        var control = spawn1.room.controller;
        var resource = Game.getObjectById('58dbc35f8283ff5308a3d721')
        
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
        }
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        
        if(!creep.memory.working) {
            if(creep.harvest(resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource);
            }
        } else {
            if(creep.upgradeController(control) == ERR_NOT_IN_RANGE) {
                creep.moveTo(control);
            }
        }
    }
}
module.exports = roleUpgrader;