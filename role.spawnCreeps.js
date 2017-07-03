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
        const mHarvesters = 3;
        const mUpgraders = 2;
        const mBuilders = 2;
        const mRepairers = 1;
        const mTransporters = 2;
    
        let tHarvesters = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'harvesters' }}}).length;
        let tUpgraders = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'upgraders' }}}).length;
        let tBuilders = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'builders' }}}).length;
        let tRepairers = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'repairers' }}}).length;
        let tTransporters = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, { filter: obj => obj.memory.role == 'transporter'}).length;

        Game.spawns['Spawn1'].room.visual.text("Harvesters:" + tHarvesters + "/" + mHarvesters, 16, 11, {color: 'green', align: 'left'});
        Game.spawns['Spawn1'].room.visual.text("Upraders: " + tUpgraders + "/" + mUpgraders, 16, 13, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Builders: " + tBuilders + "/" + mBuilders, 16, 14, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Repairers: " + tRepairers + "/" + mRepairers, 16, 12, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Transporters: " + tTransporters + "/" + mTransporters, 16, 10, {color: 'green', align: 'left'})
        
        let tEnergy = Game.spawns['Spawn1'].room.energyAvailable;

        if(Game.spawns['Spawn1'].room.energyAvailable >= 500) {
            if(tHarvesters < mHarvesters)
            {
                let sources = Game.spawns['Spawn1'].room.sources().sort((a,b) => a.memory.workers - b.memory.workers);
                let container = sources[0].pos.findInRange(FIND_STRUCTURES, 2, {filter: obj => obj.structureType == STRUCTURE_CONTAINER})[0];
                const newCreep = Game.spawns['Spawn1'].createCreep(
                                        [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], //1300
                                        undefined,
                                        { role: 'harvesters', source: sources[0].id, container: container.id, working: false }
                                    );
                if(_.isString(newCreep)) {
                    sources[0].memory.workers += 1;
                }
            }
            if (tTransporters < mTransporters && tEnergy >= 1200)
            {
                let sources = Game.spawns['Spawn1'].room.sources().sort((a,b) => a.memory.workers - b.memory.workers);
                let container = sources[0].pos.findInRange(FIND_STRUCTURES, 2, {filter: obj => obj.structureType == STRUCTURE_CONTAINER})[0];
                Game.spawns['Spawn1'].createCreep(
                        [WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY], //1300
                        undefined,
                        { role: 'transporter', container: container.id, working: false }
                    );
            }
            else if(tUpgraders < mUpgraders)
            {
                Game.spawns['Spawn1'].createCreep(
                        [WORK,WORK,WORK,WORK,WORK,MOVE,CARRY,CARRY,CARRY],
                        undefined,
                        { role: 'upgraders', working: false }
                    );
            }
            else if(tBuilders < mBuilders)
            {
                Game.spawns['Spawn1'].createCreep(
                    [WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], //1300
                    undefined,
                    { role: 'builders', working: false }
                );
            }
            else if(tRepairers < mRepairers)
            {
                Game.spawns['Spawn1'].createCreep(
                    [WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                    undefined,
                    { role: 'repairers', working: false }
                );
            }
        }
    }
}

module.exports = roleSpawnCreeps;