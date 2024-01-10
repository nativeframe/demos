// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPrivateKey, getLiveStreams, getAuthToken } = require('./handlers');

// In order to use our Environment variables
require('dotenv').config();

const app = express();

// Can be changed to whatever port you want
const port = 3005;

app.use(cors());

app.use(bodyParser.json());

// Your endpoints
app.get('/private-key', getPrivateKey);

app.get('/live-streams', getLiveStreams);

app.post('/auth-token', getAuthToken);

app.listen(port, () => {
    console.log(`Server is listening at Your Server Endpoint:${port}`);
});
