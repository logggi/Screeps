var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var pathing = require('pathing');

var roleHarvester = {
    run: function(name) {
        let creep = Game.creeps[name];
        let source = Game.getObjectById(creep.memory.source);
        let container = Game.getObjectById(creep.memory.container);
        creep.build(Game.getObjectById('595cae465bd41bd61718f773'));
        creep.pickup(creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1)[0]);
        if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            pathing.run(creep, container, 5)
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
        {
            pathing.run(creep, source, 20);
        }
    }
}

module.exports = roleHarvester;