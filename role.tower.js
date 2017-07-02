/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {
    var hostile = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
    if(hostile.length > 0) {
        for(let i=0;i<Game.spawns['Spawn1'].room.towers().length;i++) {
            let tower = Game.spawns['Spawn1'].room.towers()[i]
            tower.attack(hostile[0])
        }
    } else {
        for(let i=0;i<Game.spawns['Spawn1'].room.towers().length;i++) {
            let tower = Game.spawns['Spawn1'].room.towers()[i];
            let targets = tower.room.find(FIND_STRUCTURES, {filter: obj => obj.hits < obj.hitsMax && obj.hits < 23000})
            let target = targets.sort((a,b) => a.hits - b.hits)[0];
            tower.repair(target);
        }
    }
    
    
}