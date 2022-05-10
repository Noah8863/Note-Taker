const path = require('path');

const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// Defult route if the route isn't successful
router.get('*', (req, res) => {
    res.send('<h1>Error on loading notes... </h1><p>Please try again</p>')
})

module.exports = router;