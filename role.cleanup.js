/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.cleanup');
 * mod.thing == 'a thing'; // true
 */
var roleCleanup = {
    run: function() {
		for(var name in Memory.creeps) {
			if(!Game.creeps[name]) {
			    if(_.isObject(Memory.creeps[name].source)) {
                    let source = Game.getObjectById(Memory.creeps[name].source);
                    source.memory.workers--;
			    }
				delete Memory.creeps[name];
				console.log("creep deleted from memory: " + name)
			}
		}
    }
}
module.exports = roleCleanup;