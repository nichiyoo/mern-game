const fs = require('fs');
const path = require('path');
const sqlite = require('better-sqlite3');

const filePath = path.join(__dirname, '../db/session.db');
const schemaPath = path.join(__dirname, '../db/schema/client.schema.sql');
let instance = null;

class MainDatabase {
	/**
	 * Constructor for the DB class
	 * @param {*} client
	 */
	constructor() {
		if (!instance) {
			const exist = fs.existsSync(filePath);

			this.db = new sqlite(filePath);
			this.db.pragma('journal_mode = WAL');
			if (!exist) this.initialize();

			instance = this.db;
			return this.db;
		}
	}

	/**
	 * Get instance of the database (singleton pattern since this database wont be close until the server is closed)
	 * @returns {sqlite} database instance
	 * @static
	 */
	static getInstance() {
		if (!instance) return new MainDatabase();
		return instance;
	}

	/**
	 * Create the needed tables for the storing client data
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
}

module.exports = MainDatabase;
