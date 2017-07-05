var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleTower = require('role.tower');
var roleTransporter = require('role.transporter');

var roleSpawnCreeps = require('role.spawnCreeps');
var roleCleanup = require('role.cleanup');
var pathing = require('pathing');

var globalFunctions = require('globalFunctions');
globalFunctions.init();

var updateConstructionSites = true;

module.exports.loop = function() {
    //ccu.run('start');
    
    if(updateConstructionSites) {
        Memory.rooms['E97N74'].constructionSites = _.map(Game.constructionSites, obj => obj.id);
        updateConstructionSites = false;
    } else {
        for(let i in Memory.rooms['E97N74'].constructionSites) {
            if(Game.constructionSites[i] == undefined) {
                Game.rooms['E97N74'].containers();
                Game.rooms['E97N74'].spawnStructures();
                Memory.rooms['E97N74'].spawnStructuresUpdate = true;
                updateConstructionSites = true;
            }
        }
    }
    
    roleSpawnCreeps.run();
    roleCleanup.run();

	roleTower();

    for(var name in Game.creeps) {
        if(Game.creeps[name].memory.role == 'harvester') {
            roleHarvester.run(name);
        }
        if(Game.creeps[name].memory.role == 'transporter') {
            roleTransporter(name);
        }
        if(Game.creeps[name].memory.role == 'upgrader') {
            roleUpgrader.run(name);
        }
        if(Game.creeps[name].memory.role == 'builder') {
            roleBuilder.run(name);
        }
        if(Game.creeps[name].memory.role == 'repairer') {
            roleRepair.run(name);
        }
    }
    
    //ccu.run('stop');
}
