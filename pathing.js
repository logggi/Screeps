module.exports = {
	run: function(creep, target, reuse) {
	    creep.pickup(creep.pos.findInRange(FIND_DROPPED_RESOURCES,1)[0])
  		if(creep.moveTo(target, { noPathFinding: true, reusePath: reuse }) == ERR_NOT_FOUND) {
			creep.moveTo(target);
		}
	}
};
