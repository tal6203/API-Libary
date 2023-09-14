const { Router } = require('express');
const path = require('path');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/search_book.html'));
});

router.get('/favorites_books', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/favorites_books.html'));
});

module.exports = router;
