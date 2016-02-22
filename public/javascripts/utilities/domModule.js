const DomModule = (() => {
	let windowHeight;
	let domHeight;
	function calculationHeight () {
		let wholeHeight = domHeight + 65 + 70;
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
		setHeight: function (height) {
			domHeight = height
		},
		getDiffHeight: function () {
			console.log(calculationHeight());
			return calculationHeight();
		}
	}
})();

module.exports = DomModule;