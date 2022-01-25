var express = require('express');
var router = express.Router();
var db = require('../logic/logicDB');

router.get('/getGenres', async function (req, res, next) {
    let data = await db.getGenresFromCatalog();
    res.send(JSON.stringify(data));
});

router.get('/getTitles', async function (req, res, next) {
    let data = await db.getTitlesFromCatalog();
    res.send(JSON.stringify(data));
});

router.get('/getNote/:id', async function (req, res, next) {
    let id = req.params.id;
    let data = await db.getNoteById(id);
    res.send(JSON.stringify(data));
});

router.delete('/deleteNote/:id', async function (req, res, next) {
    let id = req.params.id;
    await db.deleteNoteById(id);
    res.status(200);
    res.send();
});

router.post('/addNote', async function (req, res, next) {
    let data = req.body;
    await db.addNoteToCatalog(data);
    res.status(200);
    res.send();
});

router.put('/addNote', async function (req, res, next) {
    let data = req.body;
    await db.editNoteInCatalog(data);
    res.status(200);
    res.send();
});

module.exports = router;
