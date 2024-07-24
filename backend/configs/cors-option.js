const corsOrigins = require('./cors-origin');

const corsOption = {
	origin: (origin, callback) => {
		if (corsOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	},
};

module.exports = corsOption;
