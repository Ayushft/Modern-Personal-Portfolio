const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Route all requests to index.html
// Route removed to prevent masking of 404s for static files

app.listen(PORT, () => {
    console.log(`Portfolio server running on port ${PORT}`);
});
