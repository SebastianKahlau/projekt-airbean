const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./airbean.db", (err) => {
  if (err) {
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen.");
  }
});

module.exports = db;
