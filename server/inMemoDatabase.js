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
      this.db.run('PRAGMA foreign_keys = ON');

      this.db.run(`
        CREATE TABLE IF NOT EXISTS Employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          position TEXT,
          employeeId TEXT NOT NULL UNIQUE,
          profileImg TEXT,
          password TEXT
        )`);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Attendances (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          profileImg TEXT,
          content TEXT
        )`);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS WorkTimes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          employeeId TEXT NOT NULL,
          INtime DATETIME,
          OUTtime DATETIME,
          status INTEGER CHECK (status IN (0, 1, 2)) NOT NULL,
          FOREIGN KEY (employeeId) REFERENCES Employees (employeeId)
        )`);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS ADMIN (
        managerID TEXT NOT NULL UNIQUE,
        employeeId TEXT NOT NULL,
        password TEXT,
        FOREIGN KEY (employeeId) REFERENCES Employees (employeeId)
        )`);
    });
  }

  insertEmployees(employees) {
    (employees || []).forEach((employee) => {
      this.insertEmployee(employee);
    });
  }

  insertEmployee({ name, email, phone, position, profileImg, employeeId, password }) {
    const sql = `INSERT INTO Employees (name, email, phone, position, profileImg, employeeId, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    this.db.run(sql, [name, email, phone, position, profileImg, employeeId, password], (err) => {
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

  getEmployeeById(id, callback) {
    const sql =
      'SELECT email,employeeid,name,phone,position,profileImg FROM Employees WHERE employeeId = ?';
    this.db.get(sql, [id], (err, row) => {
      console.log(id);
      if (err) {
        console.error('Error selecting Employee by id:', err);
      }
      console.log(`${id}에 맞는 데이터 찾기 성공`);
      callback(row);
    });
  }

  updateEmployee({ id }) {
    const b = [];
    this.getEmployeeById(id, (employee) => {
      console.log('employee', employee);
      b.push(employee);
    });
    console.log('employee', b);
    // const sql = `UPDATE Employees SET name = ?, email = ?, phone = ?, position = ?, profileImg = ?`;
    // this.db.run(sql, [name, email, phone, position, profileImg], (err) => {
    //   if (err) {
    //     console.error('Error updating Employee:', err);
    //   }
    // });
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

  //로그인 검증 메소드
  getEmployeeByIdPw(id, pw, callback) {
    const sql =
      'SELECT email,employeeid,name,phone,position,profileImg FROM Employees WHERE employeeId = ? AND password = ?';
    this.db.get(sql, [id, pw], (err, row) => {
      console.log(row);
      if (err) {
        console.error('Error selecting Employee by id and pw:', err);
      }
      callback(row);
    });
  }

  //row 업데이트 메소드
  async updateTime(employeeId, INtime, OUTtime, status) {
    console.log('업데이트 메소드');
    console.log(status);
    const sql = `
      UPDATE WorkTimes 
      SET INtime = CASE WHEN INtime IS NULL THEN ? ELSE INtime END,
          OUTtime = ?,
          status = ?
      WHERE employeeId = ? 
        AND id = (SELECT id FROM WorkTimes WHERE employeeId = ? ORDER BY INtime DESC LIMIT 1)
    `;
    return new Promise((resolve, reject) => {
      this.db.run(sql, [INtime, OUTtime, status, employeeId, employeeId], function (err) {
        if (err) {
          console.error('Error updating timer:', err);
          reject(err);
        } else {
          resolve({
            changes: this.changes,
            employeeId,
            INtime,
            OUTtime,
            status,
          });
        }
      });
    });
  }
  //테이블 초기화 메소드
  async setTime(employeeId, status) {
    const sql = `INSERT INTO WorkTimes (employeeId, status) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, [employeeId, status], function (err) {
        if (err) {
          console.error('Error inserting timer:', err);
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            employeeId,
            status,
          });
        }
      });
    });
  }

  //DB 데이터 입력 루프
  async settingTimeTable({ employeeId, INtime, OUTtime, status }) {
    const sql = `INSERT INTO WorkTimes (employeeId, INtime, OUTtime, status) VALUES (?, ?, ?, ?)`;
    await this.db.run(sql, [employeeId, INtime, OUTtime, status], (err) => {
      if (err) {
        console.error('Error inserting timer:', err);
      }
    });
  }
  //DB 데이터 입력 루프
  setTimes(times) {
    (times || []).forEach((time) => {
      this.settingTimeTable(time);
    });
  }

  async getTime(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM WorkTimes WHERE employeeId = ? ORDER BY INtime DESC LIMIT 1',
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        },
      );
    });
  }

  async createRow(id) {
    // INSERT 쿼리 실행
    await new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO WorkTimes (employeeId, INtime, OUTtime, status) VALUES (?, "", "", 0)',
        [id],
        (err) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });

    // SELECT 쿼리 실행
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM WorkTimes WHERE employeeId = ? AND STATUS = 0 LIMIT 1',
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        },
      );
    });
  }
}
