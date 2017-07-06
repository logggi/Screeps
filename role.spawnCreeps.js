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
        const mHarvesters = 2;
        const mUpgraders = 4;
        const mBuilders = 2;
        const mRepairers = 0;
        const mTransporters = 2;
    
        let harvestersTTL = _(Memory.creeps).filter({ role: 'harvester' });
        let upgradersTTL = _(Memory.creeps).filter({ role: 'upgrader' });
        let buildersTTL = _(Memory.creeps).filter({ role: 'builder' });
        let repairersTTL = _(Memory.creeps).filter({ role: 'repairer' });
        let transportersTTL = _(Memory.creeps).filter({ role: 'transporter' });
        //let test = transportersTTL.map(function(c) { return { name: c, role: c.role };});
        
        let tHarvesters = harvestersTTL.size();
        let tUpgraders = upgradersTTL.size();
        let tBuilders = buildersTTL.size();
        let tRepairers = repairersTTL.size();
        let tTransporters = transportersTTL.size();

        Game.spawns['Spawn1'].room.visual.text("Harvesters:" + tHarvesters + "/" + mHarvesters, 16, 11, {color: 'green', align: 'left'});
        Game.spawns['Spawn1'].room.visual.text("Upraders: " + tUpgraders + "/" + mUpgraders, 16, 13, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Builders: " + tBuilders + "/" + mBuilders, 16, 14, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Repairers: " + tRepairers + "/" + mRepairers, 16, 12, {color: 'green', align: 'left'})
        Game.spawns['Spawn1'].room.visual.text("Transporters: " + tTransporters + "/" + mTransporters, 16, 10, {color: 'green', align: 'left'})

        let tEnergy = Game.spawns['Spawn1'].room.energyAvailable;
        
        if(tEnergy >= 100) {
            if(tHarvesters < mHarvesters || tHarvesters == 0)
            {
                let sources = Game.spawns['Spawn1'].room.sources().sort((a,b) => a.memory.workers - b.memory.workers);
                let container = sources[0].pos.findInRange(FIND_STRUCTURES, 2, {filter: obj => obj.structureType == STRUCTURE_CONTAINER})[0];
                let parts = [];
                let part;
                parts[0] = [WORK,WORK,MOVE,CARRY];
                parts[550] = [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY];
                if(tHarvesters == 0) {
                    part = parts[0];
                } else {
                    part = parts[550];
                }
                if(container == undefined) {
                    container = {id: "null"};
                }
                if(tHarvesters == 1) {
                    const newCreep = Game.spawns['Spawn1'].createCreep(
                                        //[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], //1300
                                        part, //550
                                        undefined,
                                        { role: 'harvester', source: sources[0].id, container: container.id, working: false }
                                    );
                } 
                const newCreep = Game.spawns['Spawn1'].createCreep(
                                        //[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], //1300
                                        [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY], //550
                                        undefined,
                                        { role: 'harvester', source: sources[0].id, container: container.id, working: false }
                                    );
                if(_.isString(newCreep)) {
                    sources[0].memory.workers++;
                }
            }
            if((tTransporters < mTransporters) && tEnergy >= 300)
            {
                let sources = Game.spawns['Spawn1'].room.sources();
                let container = sources[0].pos.findInRange(FIND_STRUCTURES, 2, {filter: obj => obj.structureType == STRUCTURE_CONTAINER})[0];
                if(container == undefined) {
                    container = {id: "null"};
                }
                Game.spawns['Spawn1'].createCreep(
                        //[WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY], //1300
                        [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], //300
                        //[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE], //550
                        undefined,
                        { role: 'transporter', container: container.id, working: false }
                    );
                
            }
            else if(tUpgraders < mUpgraders && tEnergy >= 300)
            {
                Game.spawns['Spawn1'].createCreep(
                        //[WORK,WORK,WORK,WORK,WORK,MOVE,CARRY,CARRY,CARRY],
                        [WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY],
                        undefined,
                        { role: 'upgrader', working: false }
                    );
            }
            else if(tBuilders < mBuilders && tEnergy >= 300)
            {
                Game.spawns['Spawn1'].createCreep(
                    //[WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], //1300
                    [WORK,WORK,WORK,MOVE,CARRY,CARRY],
                    undefined,
                    { role: 'builder', working: false }
                );
            }
            else if(tRepairers < mRepairers)
            {
                Game.spawns['Spawn1'].createCreep(
                    [WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                    undefined,
                    { role: 'repairer', working: false }
                );
            }
        }
    }
}

module.exports = roleSpawnCreeps;