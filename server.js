// Importing packages
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');



// Load environment variables
const NODE_ENV = process.env.NODE_ENV || "production";
dotenv.config({ path: `.env.${NODE_ENV}` });
const PORT = process.env.PORT;

// Create Express app
const app = express();
app
	.use(cors())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())
	.use(express.static(path.join(__dirname, '/public')))
	.use(morgan('dev'))
	.use(compression());

// Start the server
app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});

// Connect to the database
mongoose.connect(process.env.DATABASE, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
	console.log("Database connected");
});

mongoose.connection.on('error', (err) => {
	console.log("Error connecting to the database", err);
});



// CORS configuration
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});


// Student App Routes
const apiRoutesUserApp1 = require('./routes/user/v1/userApp');
app.use('/api/v1/user', apiRoutesUserApp1);




