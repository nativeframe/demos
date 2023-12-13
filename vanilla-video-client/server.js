const express = require('express');
const path = require('path');
const opn = require('opn');
const fs = require('fs');

const app = express();
//If you dont want to use this port you can specify a port when running the app using PORT=yourPort node server.js
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Open the default web browser and save the browser process ID
const url = `http://localhost:${port}`;
const browserProcess = opn(url, { wait: false });
const browserPIDFile = '.browserpid';

browserProcess.then(({ pid }) => {
    fs.writeFileSync(browserPIDFile, pid.toString());
});

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Close the server gracefully
process.on('SIGINT', () => {
    server.close(() => {
        // Read the browser process ID from the file and close the browser
        try {
            const browserPID = parseInt(fs.readFileSync(browserPIDFile, 'utf-8'), 10);
            if (!isNaN(browserPID)) {
                process.kill(browserPID);
                console.log('Browser closed.');
            } else {
                console.error('Invalid browser process ID in the file.');
            }
        } catch (error) {
            console.error('Error closing browser:', error.message);
        }

        process.exit(0);
    });
});