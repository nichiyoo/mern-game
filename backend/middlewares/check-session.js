const Client = require('../libs/client');

const checkSession = async (req, res, next) => {
	Client.getClient(req);
	next();
};

module.exports = checkSession;
