module.exports = {
  run: function(creep, target, reuse) {
  	if(creep.moveTo(target, { noPathFinding: true, reusePath: reuse }) == ERR_NO_PATH) {
			creep.moveTo(target);
		}
  }
};
