const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
// Serve static files from the current working directory (better for Vercel)
app.use(express.static(process.cwd()));

// Explicitly serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Fallback for script.js
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'script.js'));
});

// Fallback for styles.css
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'styles.css'));
});

// Explicitly serve favicon.png
app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'favicon.png'));
});

// Avoid 404s for favicon.ico (browsers still request this sometimes)
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`Portfolio server running on port ${PORT}`);
});
