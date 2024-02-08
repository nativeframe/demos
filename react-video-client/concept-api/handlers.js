const axios = require('axios');

// Function that creates our private key for our broadcaster.
const getPrivateKey = async (req, res) => {
    // You will need to setup your environment variables or hardcode the values here.
    const url = `${process.env.BACKEND_ENDPOINT}/api/ls/v1/key/${req.query.user}?token=${process.env.TOKEN}`;

    try {
        const response = await axios.get(url);

        const data = JSON.stringify(response.data);

        res.end(data);
    } catch (error) {
        console.log('Error', error.message);
        res.end('Internal Server Error');
    }
};
// Function that hits our live endpoint in order to get a list of all current live streams.
const getLiveStreams = async (req, res) => {
    // You will need to setup your environment variables or hardcode the values here.
    const url = `${process.env.BACKEND_ENDPOINT}/api/ls/v1/live?token=${process.env.TOKEN}`;
    try {
        const response = await axios.get(url);

        const data = JSON.stringify(response.data);

        res.end(data);
    } catch (error) {
        console.log('Error', error.message);
        res.end('Internal Server Error');
    }
};

// Function that hits our foundation auth in order to generate an auth token for broadcasters and viewers.
const getAuthToken = async (req, res) => {
    // You will need to setup your environment variables or hardcode the values here.
    const url = `${process.env.BACKEND_ENDPOINT}/auth/v1/access-tokens`;
    try {
        const token = process.env.TOKEN;

        const response = await axios.post(url, req.body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const responseData = JSON.stringify(response.data);

        res.end(responseData);
    } catch (error) {
        console.log('Error:', error.message);
        res.end('Internal Server Error');
    }
};

module.exports = {
    getPrivateKey,
    getLiveStreams,
    getAuthToken,
};

