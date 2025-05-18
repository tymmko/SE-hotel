const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes/apiRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const allowedOrigins = [
	'http://localhost:8080',
	'https://hotel-frontend.up.railway.app'
];

const app = express();

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
}));

app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorHandler);

module.exports = app;
