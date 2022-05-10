const router = require('express').Router();

const { readFromFile, writeToFile, readAndAppend, uuid } = require('../helpers/fsUtils');


// Post route to add notes to the database
router.post('/notes', (req, res) => {
    let newNote = req.body;
    const note = {
        title: newNote.title,
        text: newNote.text,
        id: uuid(),
    };
    readAndAppend(note, './db/db.json');
    res.json('Notes Saved!');
})

// Get route to save the notes to the database
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((router) =>
            res.json(JSON.parse(router)))
});

// Delete route to  delete the notes from the database
router.delete('/notes/:id', (req, res) => {
    readFromFile('./db/db.json')
        .then((journal) => {
            let dbParse = JSON.parse(journal);
            lastParse = dbParse.filter(journal => journal.id !== req.params.id);
            writeToFile('./db/db.json', lastParse);
            res.json(lastParse)
            console.log('Notes were deleted!')
        })
})

// main landing page routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Route for the notes html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// Defult route if the first 2 fail
router.get('*', (req, res) => {
    res.send('<h1>Error on loading notes... </h1><p>Please try again</p>')
})

module.exports = router;