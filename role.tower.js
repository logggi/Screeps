/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {
    for(let i=0;i<Game.spawns['Spawn1'].room.towers().length;i++) {
        tower = Game.spawns['Spawn1'].room.towers()[i];
        let targets = tower.room.find(FIND_STRUCTURES, {filter: obj => obj.hits < obj.hitsMax})
        let target = targets.sort((a,b) => a.hits - b.hits)[0];
        tower.repair(target);
    }
    
}