const fs = require('fs');

class CompareError extends Error {
	constructor(message, result = null) {
		super(message);
		this.result = result;
	}
}

const Query = {
	/**
	 * Function to sanitize the query
	 * @param {*} query
	 * @returns {string} sanitized query
	 * @returns {Object} the sanitized query and the output type
	 * @throws {Error}
	 */
	sanitizedQuery(query) {
		if (query.length > 1000) throw new Error('Query is too long'); // check query length

		query = query.trim(); // remove leading and trailing spaces

		query = query.replace(/--.*\n/g, ''); // remove single line comments
		query = query.replace(/\/\*.*\*\//g, ''); // remove multi line comments

		query = query.replace(/\n/g, ' '); // remove new lines characters
		query = query.replace(/\s+/g, ' '); // remove extra spaces in between words

		query = query.replace(/"/g, "'"); // replace double quotes with single quotes
		query = query.replace(/;$/, ''); // remove trailing semicolon (if any)

		if (query.match(/;/g)) throw new Error('Multiple statements are not allowed');

		const command = query.match(/^[a-zA-Z]+/)?.[0].toUpperCase();
		const allowed = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

		if (!command || !allowed.includes(command)) throw new Error(`Only ${allowed.join(', ')} commands are allowed`);
		if (command === 'INSERT' && query.match(/SELECT/gi)) throw new Error('SELECT is not allowed in INSERT command');

		return {
			query,
			output: query.match(/SELECT/gi) ? true : false,
		};
	},

	/**
	 * Function to remove ORDER BY clause from query (for comparison purpose)
	 * because ORDER BY since it does not affect the result of the query
	 * @param {*} query query string
	 * @returns {string} remove order by clause from query
	 */
	removeOrder(query) {
		return query.replace(/ ORDER BY [a-zA-Z0-9_.,*()"'=% ]+/gi, '');
	},

	// separate the validateQuery and the compareQuery function
	/**
	 * Function to validate the query by using Transaction
	 * @param {*} query
	 * @param {*} db better-sqlite instance
	 * @returns {Object} result of the validation
	 */
	executeQuery(query, db) {
		try {
			let { query: sanitized, output } = this.sanitizedQuery(query);
			const result = output ? db.prepare(sanitized).all() : db.prepare(sanitized).run();

			return {
				type: output ? 'result' : 'execute',
				query: sanitized,
				result: result,
				message: output
					? `Query executed successfully and returned ${result.length} rows`
					: 'Query executed successfully',
			};
		} catch (error) {
			return {
				type: 'error',
				query: query,
				message: error.message,
			};
		}
	},

	/**
	 * Function to compare the query with the solution
	 * @param {*} query
	 * @param {*} solution
	 * @param {*} db better-sqlite instance
	 * @returns {Object} result of the comparison
	 */
	compareQuery(query, solution, db) {
		const begin = db.prepare('BEGIN');
		const rollback = db.prepare('ROLLBACK');

		let result = null;

		try {
			begin.run();

			query = this.sanitizedQuery(query).query;
			output = this.sanitizedQuery(query).output;

			solution = this.sanitizedQuery(solution).query;
			result = output ? db.prepare(query).all() : null;

			query = this.removeOrder(query);
			solution = this.removeOrder(solution);

			const attemp = db.prepare(`${query} EXCEPT ${solution}`);
			const correct = db.prepare(`${solution} EXCEPT SELECT * FROM ( ${query} )`);
			if (!attemp || !correct) throw new Error('Query is wrong, please check the table name and column name');

			const attemptResult = attemp.all();
			const correctResult = correct.all();

			attempRows = attemptResult.length;
			correctRows = correctResult.length;

			if (attempRows && correctRows) throw new Error('Query is wrong, the expected result is different');
			if (correctRows) throw new Error('Query is wrong, the result is missing some rows');
			if (attempRows) throw new Error('Query is wrong, the result has some extra rows');

			return {
				type: 'success',
				query: query,
				message: 'Query is correct and the result is the same as the solution',
			};
		} catch (error) {
			return {
				type: 'incorrect',
				query: query,
				result: result,
				message: error.message.includes('EXCEPT')
					? 'Query is invalid, please check the table name and column name'
					: error.message,
			};
		} finally {
			rollback.run(); // rollback the transaction since it's only for comparison
		}
	},
};

module.exports = Query;
