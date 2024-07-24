const MainDatabase = require('./main.database');
const db = MainDatabase.getInstance();

const Logger = {
	/**
	 * Function to log a query
	 *
	 * @param {*} clientId client id
	 * @param {*} query query
	 * @param {*} step step
	 * @param {*} score score
	 * @param {*} type type
	 * @param {*} initiator initiator
	 */
	logQuery(client, query, step, score, type, initiator) {
		db.prepare('INSERT INTO log (clientId, query, step, score, type, initiator) VALUES (?, ?, ?, ?, ?, ?)').run(
			client.id,
			query,
			step,
			score,
			type,
			initiator
		);
	},
};

module.exports = Logger;
