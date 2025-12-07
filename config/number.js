const numberFilters = {
	getPermalinkSuffixFromPageNum: (pageNumber) => {
		if (pageNumber == 0) {
			return "";
		}
		return (pageNumber + 1) + "/";
	},

	getBlogPermalinkSuffixFromPageNum: (pageNumber) => {
		return "/page/" + (pageNumber + 1) + "/";
	},
};

export default numberFilters;
