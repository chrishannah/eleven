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
};

export default dateFilters;
