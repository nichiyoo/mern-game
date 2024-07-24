import humanize from 'humanize-duration';

/**
 * Function to format the time in human readable format
 * @param {*} seconds
 * @returns {string} formatted time
 */
export const humanizeTime = (seconds) => {
	return humanize(seconds * 1000, {
		largest: 2,
		round: true,
		units: ['h', 'm', 's'],
	});
};

/**
 * Function to get the local time
 * @param {*} date
 * @returns {number} local time
 */

export const toLocalTime = (date) => {
	const local = new Date(date).getTime() - new Date().getTimezoneOffset() * 60 * 1000;
	return local;
};
