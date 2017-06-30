module.exports = {
	run: function(creep, target, reuse) {
  		if(creep.moveTo(target, { noPathFinding: true, reusePath: reuse }) == ERR_NOT_FOUND) {
			creep.moveTo(target);
		}
	}
};
