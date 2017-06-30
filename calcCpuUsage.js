/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('calcCpuUsage');
 * mod.thing == 'a thing'; // true
 */
var startCpu;
var cpuUsed;
var calcCpuUsage = {
    run: function (settings) {
        if(settings == 'start') {
            startCpu = Game.cpu.getUsed();
        } else if(settings == 'stop') {
            cpuUsed = Game.cpu.getUsed() - startCpu;
            console.log(cpuUsed);
        }
    }
}

module.exports = calcCpuUsage;