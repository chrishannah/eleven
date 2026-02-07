import moment from "moment";

const dateFilters = {
	displayDate: (date) => {
		return moment(date).format("D MMM YYYY");
	},

	fixedDisplayDate: (date) => {
		return moment(date).format("DD MMM YYYY");
	},

	dayAndMonth: (date) => {
		return moment(date).format("DD MMM");
	},

	monthNumberToName: (month) => {
		return moment().month(month).format("MMMM");
	},

	// Returns day as "DD" (e.g., "28")
	dayNumber: (date) => {
		return moment(date).format("DD");
	},

	// Returns "MMM YYYY" (e.g., "Jan 2026")
	monthYear: (date) => {
		return moment(date).format("MMM YYYY");
	},

	// Returns relative time (e.g., "2 days ago")
	relativeTime: (date) => {
		return moment(date).fromNow();
	},
};

export default dateFilters;
