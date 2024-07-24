const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookie = require('cookie-parser');

const session = require('express-session');
const sessionStore = require('better-sqlite3-session-store')(session);

const corsOptions = require('./configs/cors-option');
const credentialCheck = require('./middlewares/credential-check');
const checkSession = require('./middlewares/check-session');

const MainDatabase = require('./libs/main.database');

// environment variable
require('dotenv').config({
	path: path.join(__dirname, '.env'),
});

// database
const db = MainDatabase.getInstance();

// express app
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(morgan('dev'));
app.use(credentialCheck);
app.use(cors(corsOptions));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session store
app.use(
	session({
		store: new sessionStore({
			client: db,
			expired: {
				clear: true,
				interval: 1000 * 60 * 60 * 12, // 1 day
			},
		}),
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
	})
);

// check session middleware
app.use(checkSession);

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// app routes
app.use('/', require('./routes/index.route'));

// fallback routes
app.all('*', (req, res) => {
	const url = req.originalUrl;
	res.status(404).json({
		type: 'error',
		message: `The requested URL ${url} was not found`,
	});
});

// error handling
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		type: 'error',
		message: 'Internal server error',
	});
});

// start server
app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
	process.on('SIGINT', () => {
		db.close();
		process.exit();
	});
});
