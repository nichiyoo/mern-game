const corsOrigins = require('../configs/cors-origin');

const credentialCheck = (req, res, next) => {
	const origin = req.headers.origin;
	if (corsOrigins.includes(origin)) res.header('Access-Control-Allow-Credentials', true);
	next();
};

module.exports = credentialCheck;
