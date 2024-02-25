module.exports = {
	getPermalinkSuffixFromPageNum: (pageNumber) => {
		if (pageNumber == 0) {
			return "";
		}
		return (pageNumber + 1) + "/"
	}
}
