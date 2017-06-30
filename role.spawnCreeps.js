/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.spawnCreeps');
 * mod.thing == 'a thing'; // true
 */
var roleSpawnCreeps = {
    run: function() {
        const mHarvesters = 12;
        const mUpgraders = 1;
        const mBuilders = 3;
        const mRepairers = 4;
    
        var tHarvesters = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'harvesters' }}}).length;
        var tUpgraders = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'upgraders' }}}).length;
        var tBuilders = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'builders' }}}).length;
        var tRepairers = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'repairers' }}}).length;

        Game.spawns['Spawn1'].room.visual.text("Harvesters:" + tHarvesters + "/" + mHarvesters, 16, 11, {color: 'green', align: 'left'});
        Game.spawns['Spawn1'].room.visual.text("Upraders: " + tUpgraders + "/" + mUpgraders, 16, 13, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Builders: " + tBuilders + "/" + mBuilders, 16, 14, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Repairers: " + tRepairers + "/" + mRepairers, 16, 12, {color: 'green', align: 'left'})
    
        if(Game.spawns['Spawn1'].energy == 300) {
            if(tHarvesters < mHarvesters) {
                Game.spawns['Spawn1'].createCreep( [WORK,WORK,MOVE,CARRY], undefined, { role: 'harvesters', working: false});
            } else if(tUpgraders < mUpgraders) {
                Game.spawns['Spawn1'].createCreep( [WORK,WORK,MOVE,CARRY], undefined, { role: 'upgraders', working: false});
            } else if(tBuilders < mBuilders) {
                    Game.spawns['Spawn1'].createCreep( [WORK,MOVE,CARRY,CARRY], undefined, { role: 'builders', working: false});
            } else if(tRepairers < mRepairers) {
                    Game.spawns['Spawn1'].createCreep( [WORK,MOVE,MOVE,CARRY], undefined, { role: 'repairers', working: false});
            }
        }
    }
}

module.exports = roleSpawnCreeps;