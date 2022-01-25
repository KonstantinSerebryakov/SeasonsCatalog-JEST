module.exports = (function () {
    async function getDBQueryPromise(db, databaseQuery) {
        return new Promise(data => {
            db.query(databaseQuery, function (error, result) { // change db->connection for your code
                if (error) {
                    console.log(error);
                    throw error;
                }
                try {
                    console.log(result);
                    data(result);
                } catch (error) {
                    data({});
                    throw error;
                }
            });
        }).then(result => {
            return result;
        });
    }

    async function dbQueryHandler(queryString = 'SELECT 1 + 1 AS solution', db = 'seriesprojectdb1') {
        //connect to DB
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'qK*GPua9Q8uG',
            database: db,
        });
        connection.connect();

        //get result
        let queryResult = await (await getDBQueryPromise(connection, queryString));

        //disconnect
        connection.end();

        return JSON.parse(JSON.stringify(queryResult));
    }

    async function getTitlesFromCatalog() {
        let query = 'select id, title from catalognotes';
        return await dbQueryHandler(query);
    }

    async function getGenresFromCatalog() {
        let query = 'select id, genre from genres';
        return await dbQueryHandler(query);
    }

    async function getFullNotesFromCatalog() {
        let query = 'SELECT cat.id, genres.genre, title, description '
            + 'FROM catalognotes AS cat LEFT JOIN genres ON cat.genre = genres.id';
        return await dbQueryHandler(query);
    }

    async function getNoteById(id) {
        let query = 'SELECT cat.id, genres.id as genre, description, title, producer, date ' +
            'FROM catalognotes AS cat LEFT JOIN genres ON cat.genre = genres.id ' +
            'where cat.id = ' + id.toString();
        return await dbQueryHandler(query);
    }

    async function isNoteExist(note) {
        let id = note.id;
        let query = 'select * from catalognotes where id = ' + id;
        return (await dbQueryHandler(query)).length === 0;
    }

    async function addNoteToCatalog(note) {
        let query = "INSERT INTO catalognotes (genre, description, title, producer, date) VALUES " +
            "('" + note.genre.substr(3, note.genre.length - 3) +
            "', '" + note.description +
            "', '" + note.name +
            "', '" + note.producer +
            "', '" + note.date + '-11' +
            "');";
        await dbQueryHandler(query);
    }

    async function editNoteInCatalog(note) {
        console.log(note.genre.substr(3, note.genre.length - 3));
        let query = "update catalognotes set genre = " + note.genre.substr(3, note.genre.length - 3) +
            ", description = '" + note.description +
            "', title = '" + note.name +
            "', producer = '" + note.producer +
            "', DATE = '" + note.date + '-11' +
            "' WHERE id = " + note.id;
        await dbQueryHandler(query);
    }

    async function deleteNoteById(id) {
        let query = "DELETE FROM catalognotes WHERE id = " + id;
        await dbQueryHandler(query);
    }

    return {
        getTitlesFromCatalog,
        getGenresFromCatalog,
        getFullNotesFromCatalog,
        isNoteExist,
        addNoteToCatalog,
        getNoteById,
        editNoteInCatalog,
        deleteNoteById,
    };
})()
