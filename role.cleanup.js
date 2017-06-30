/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.cleanup');
 * mod.thing == 'a thing'; // true
 */
var roleCleanup = {
    run: function(name) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("creep deleted from memory: " + name)
        }
    }
}
module.exports = roleCleanup;