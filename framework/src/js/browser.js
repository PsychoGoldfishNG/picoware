// a few methods for browser detection
const BrowserHelper = {

	isMobile: function() {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)))
	},

	isIOS: function() {
		return isMobile() && navigator.userAgent.indexOf("Safari") > -1;
	}

}