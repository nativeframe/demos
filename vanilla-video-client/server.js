const express = require('express');
const path = require('path');
const concurrently = require('concurrently');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/encoder', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'encoder.html'));
});

app.get('/manifest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifestPlayer.html'));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  // Open the main page (encoder.html) and the second page (manifest.html) in separate windows
  concurrently([
    { command: `open http://localhost:${port}/encoder.html`, name: 'main-window' },
    { command: `open http://localhost:${port}/manifestPlayer.html`, name: 'second-window' }
  ], {
    killOthers: ['failure', 'success'],
    prefix: 'none'
  });
});

// Handle process termination (e.g., Ctrl+C) to close the opened windows
process.on('SIGINT', () => {
  console.log('Closing windows...');
  server.close(() => {
    console.log('Server closed.');
    process.exit();
  });
});

