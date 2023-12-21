const express = require('express');
const path = require('path');
const browserSync = require('browser-sync');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/encoder', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'encoder.html'));
});

app.get('/manifest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifestPlayer.html'));
});

// Create a single instance of BrowserSync
const bs = browserSync.create();

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  // Use browserSync for live-reloading and open tabs
  bs.init({
    proxy: `http://localhost:${port}`,
    files: ['public/**/*.html', 'public/**/*.js', 'public/**/*.css'],
    browser: 'google chrome', // Change this to your preferred browser
    open: 'external',
    startPath: 'encoder.html'
  });

  // Delay the opening of the second tab
  setTimeout(() => {
    bs.reload('manifestPlayer.html');
  }, 500); // Adjust the delay as needed
});

// Handle process termination (e.g., Ctrl+C) to close the server
process.on('SIGINT', () => {
  console.log('Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit();
  });
});
