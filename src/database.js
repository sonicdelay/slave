const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// const DBSOURCE = "db.sqlite"
const DBSOURCE = ":memory:";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key text UNIQUE, 
            data text
            )`,
            // // CONSTRAINT email_unique UNIQUE (email)
            (err) => {
                if (err) {
                    console.log("Table already exists");
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO data (key, data) VALUES (?,?)'
                    db.run(insert, [uuidv4(), JSON.stringify({ "name": "admin" })])
                    db.run(insert, [uuidv4(), JSON.stringify({ "name": "user" })])
                }
            });
    }
});

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

module.exports = db