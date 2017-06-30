var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

var roleSpawnCreeps = require('role.spawnCreeps');
var roleCleanup = require('role.cleanup');
var globalFunctions = require('globalFunctions');

globalFunctions.init();
//var ccu = require('calcCpuUsage');

module.exports.loop = function() {
    //ccu.run('start');

    roleSpawnCreeps.run();
    roleCleanup.run();
		
    for(var name in Game.creeps) {
        if(Game.creeps[name].memory.role == 'harvesters') {
            roleHarvester.run(name);
        }
        if(Game.creeps[name].memory.role == 'upgraders') {
            roleUpgrader.run(name);
        }
        if(Game.creeps[name].memory.role == 'builders') {
            roleBuilder.run(name);
        }
        if(Game.creeps[name].memory.role == 'repairers') {
            roleRepair.run(name);
        }
    }
    
    //ccu.run('stop');
}