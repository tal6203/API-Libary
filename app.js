const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

// Serve static files from the 'static' and 'script' directories
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'script')));

// Fallback route to serve 'search_book.html' for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'search_book.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
