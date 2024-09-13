module.exports = {
	getPermalinkSuffixFromPageNum: (pageNumber) => {
		if (pageNumber == 0) {
			return "";
		}
		return (pageNumber + 1) + "/"
	},

	getBlogPermalinkSuffixFromPageNum: (pageNumber) => {
		if (pageNumber == 0) {
			return "/";
		}
		return "page/" + (pageNumber + 1) + "/"
	}
}
