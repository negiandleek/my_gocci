const DomModule = (() => {
	let windowHeight;
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
		},
		scroll_most_bottom: function (height) {
			let scroll_position = 50 + height - windowHeight;
			if(scroll_position >= 0){
				scrollTo(0,windowHeight + scroll_position);
			}
		}
	}
})();

module.exports = DomModule;