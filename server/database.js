var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "arranger.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
    console.log("creating db")
    db.run(`CREATE TABLE arrangements (
            aid INTEGER PRIMARY KEY AUTOINCREMENT,
            data text 
            )`,
      (err) => {
        if (err) {
          console.log("db exists or err: " + err)
          // Table already created
        }else{
          // Table just created, creating some rows
          //var insert = 'INSERT INTO arrangements (uid, x_dim, y_dim, points) VALUES (?,?,?,?)'
          //db.run(insert, ["admin","admin@example.com",md5("admin123456")])
          //db.run(insert, ["user","user@example.com",md5("user123456")])
        }
      });  
  }
});

module.exports = db
