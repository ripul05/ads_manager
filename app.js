const express = require('express');
const path = require('path')
const app = express();


// Define a route for the root URL (/)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(express.static(path.join(__dirname, 'frontend/build')));

// Route to serve the React login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
// Export the app module
module.exports = app;
