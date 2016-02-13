const DomModule = (() => {
	let windowHeight;
	let domHeight;

	function calculationHeight (height) {
		let wholeHeight = height + 65 + 70;
		let diff;
		diff = windowHeight - wholeHeight;
		if(diff <= 0){
			return false;
		}
		return diff;
	}

	//can't use arrow in return.
	return {
		setWindowHeight: function (height){
			windowHeight = height;
		},
		getDiffHeight: function (height) {
			return calculationHeight(height);
		}
	}
})();

module.exports = DomModule;