import sqlite3 from 'sqlite3';

class ConnectionMaker {
  constructor() {}

  makeConnection() {
    const db = new sqlite3.Database(`:memory:`, (err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to the in-memory SQlite database.');
      }
    });

    return db;
  }
}

export default class InMemoDatabase {
  constructor() {
    this.db = new ConnectionMaker().makeConnection();
    this.createTable();
  }

  createTable() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          position TEXT,
          profileImg TEXT,
          password TEXT
        )`).run(`
          CREATE TABLE IF NOT EXISTS Attendances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            type TEXT,
            profileImg TEXT,
            content TEXT
          )`);
    });
  }

  insertEmployees(employees) {
    (employees || []).forEach((employee) => {
      this.insertEmployee(employee);
    });
  }

  insertEmployee({ name, email, phone, position, profileImg }) {
    const sql = `INSERT INTO Employees (name, email, phone, position,  profileImg) VALUES (?, ?, ?, ?, ?)`;
    this.db.run(sql, [name, email, phone, position, profileImg], (err) => {
      if (err) {
        console.error('Error inserting Employee:', err);
      }
    });
  }

  getAllEmployees(callback) {
    const sql = 'SELECT * FROM Employees';
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error selecting all Employees:', err);
      }
      callback(rows);
    });
  }

  insertAttendance({ name, type, profileImg, content }) {
    const sql = `INSERT INTO Attendances (name, type, profileImg, content) VALUES (?, ?, ?, ?)`;
    this.db.run(sql, [name, type, profileImg, content], (err) => {
      if (err) {
        console.error('Error inserting Attendance:', err);
      }
    });
  }

  insertAttendances(attendances) {
    (attendances || []).forEach((attendance) => {
      this.insertAttendance(attendance);
    });
  }

  getAllAttendances(callback) {
    const sql = 'SELECT * FROM Attendances';
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error selecting all Attendances:', err);
      }
      callback(rows);
    });
  }
}
