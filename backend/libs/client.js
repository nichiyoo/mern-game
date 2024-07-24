const { nanoid } = require('nanoid');

const MainDatabase = require('./main.database');
const db = MainDatabase.getInstance();

const Client = {
	/**
	 * Function to get client data
	 * @param {*} req Request object from express
	 * @returns {Object} client object
	 */
	getClient(req) {
		const client = req.session.client || this.createClient(req);
		return client;
	},

	/**
	 * Function to create a new client
	 * @param {*} req Request object from express
	 * @returns {Object} client object
	 */
	createClient(req) {
		const id = nanoid(16);

		db.prepare('INSERT INTO client (id) VALUES (?)').run(id);
		const result = db.prepare('SELECT * FROM client WHERE id = ?').get(id);

		req.session.client = result;
		req.session.save();
		return result;
	},

	/**
	 * Function to increment the step and score of the client
	 *
	 * @param {*} req Request object from express
	 * @returns {Object} client object
	 */
	incrementStep(req, point) {
		const client = this.getClient(req);

		db.prepare('UPDATE client SET step = step + ?, score = score + ? WHERE id = ?').run(1, point, client.id);
		const result = db.prepare('SELECT * FROM client WHERE id = ?').get(client.id);

		req.session.client = result;
		req.session.save();
		return result;
	},
};

module.exports = Client;
