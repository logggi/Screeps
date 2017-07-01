var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleTower = require('role.tower');

var roleSpawnCreeps = require('role.spawnCreeps');
var roleCleanup = require('role.cleanup');
var pathing = require('pathing');

var globalFunctions = require('globalFunctions');
globalFunctions.init();

/*
var ccu = require('calcCpuUsage');
Game.spawns['Spawn1'].room.souces
ccu.run('start');
Game.spawns['Spawn1'].room.find(FIND_SOURCES);
ccu.run('stop');
ccu.run('start');
Game.spawns['Spawn1'].room.souces
ccu.run('stop');
*/
newRoom = new RoomPosition(13,15,'W79S97');
module.exports.loop = function() {
    //ccu.run('start');

    roleSpawnCreeps.run();
    roleCleanup.run();
    
	roleTower();
	
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
        if(name == 'Joshua') {
            Game.creeps['Joshua'].reserveController(Game.getObjectById('58dbc35c8283ff5308a3d6dc'))
        }
    }
    
    //ccu.run('stop');
}