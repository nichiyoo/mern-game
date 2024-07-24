const GameDatabase = require('../libs/game.database');

const Query = require('../libs/query');
const Client = require('../libs/client');
const Logger = require('../libs/logger');
const Helper = require('../libs/helper');

const { stages } = require('../game/data.json');

const GameController = {
	async query(req, res) {
		const { query } = req.body;

		const client = Client.getClient(req);
		const db = new GameDatabase(client);
		const stage = stages.find((stage) => stage.step === client.step);

		if (!stage) {
			return res.status(400).json({
				type: 'error',
				message: 'Theres no stage for this step yet',
				client: req.session.client,
			});
		}

		const compare = Query.compareQuery(query, stage.solution, db);
		if (compare.type === 'error' || compare.type === 'incorrect') {
			console.log({
				...compare,
				client: req.session.client,
			});

			return res.status(400).json({
				...compare,
				client: req.session.client,
			});
		}

		const result = Query.executeQuery(query, db);
		const time = Helper.timeDifference(new Date(), new Date(client.updatedAt));
		const point = Helper.calculatePoint(time, 60);

		Logger.logQuery(client, query, client.step, point, result.type, 'client');
		// Client.incrementStep(req, point);

		return res.status(200).json({
			...result,
			client: req.session.client,
		});
	},
};

module.exports = GameController;
