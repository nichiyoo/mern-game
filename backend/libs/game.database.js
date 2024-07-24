const fs = require('fs');
const path = require('path');
const sqlite = require('better-sqlite3');

const dbpath = path.join(__dirname, '../db/sessions');
const schemaPath = path.join(__dirname, '../db/schema/game.schema.sql');

class GameDatabase {
	/**
	 * Constructor for the DB class
	 * @param {*} client
	 */
	constructor(client) {
		const id = client.id;
		const filepath = path.join(dbpath, `${id}.db`);
		const exist = fs.existsSync(filepath);

		this.mkdir();
		this.cleanup();

		this.db = new sqlite(filepath);
		this.db.pragma('journal_mode = WAL');
		if (!exist) this.initialize();

		return this.db;
	}

	/**
	 * Create a new sqlite database file for a new session
	 * @returns {void}
	 */
	initialize() {
		try {
			const schema = fs.readFileSync(schemaPath, 'utf-8');
			this.db.exec(schema);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Clean up old sqlite files for an expired session (24 hours)
	 * @returns {void}
	 */
	cleanup() {
		const sessions = fs.readdirSync(dbpath);

		for (const session of sessions) {
			const filepath = path.join(dbpath, session);
			const { mtime } = fs.statSync(filepath);

			if (new Date() - mtime > 1000 * 60 * 60 * 24) {
				fs.unlinkSync(filepath);
			}
		}
	}

	/**
	 * Create the sessions directory if it does not exist
	 * @returns {void}
	 */
	mkdir() {
		if (!fs.existsSync(dbpath)) {
			fs.mkdirSync(dbpath);
		}
	}
}

module.exports = GameDatabase;
