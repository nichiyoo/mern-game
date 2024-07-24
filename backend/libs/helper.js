const Helper = {
	/**
	 * Function to calculate the time difference between two dates
	 * @param {Date} now
	 * @param {Date} then
	 * @returns {number} Seconds between the two dates
	 */
	timeDifference(now, then) {
		const offset = new Date().getTimezoneOffset() * 60000;
		const diff = now.getTime() - then.getTime() + offset;

		const second = Math.floor(diff / 1000);
		return second;
	},

	/**
	 * Function to calculate the point of a client
	 * @param {int} userTime Seconds that have passed since the client started
	 * @param {int} expectedTime The expected time to complete the task
	 * @returns {int} The point that the client has earned
	 */
	calculatePoint(userTime, expectedTime) {
		if (userTime <= expectedTime) return 100;
		else if (userTime <= expectedTime * 1.5) return 75;
		else return 50;
	},
};

module.exports = Helper;
