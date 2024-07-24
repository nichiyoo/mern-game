const Client = require('../libs/client');

const ClientController = {
	async find(req, res) {
		const client = Client.getClient(req);

		return res.status(200).json({
			client,
			message: 'Client found successfully',
		});
	},
};

module.exports = ClientController;
