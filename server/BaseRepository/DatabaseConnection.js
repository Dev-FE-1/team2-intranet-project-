import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export class DatabaseConnection {
  static instance = null;
  static initializationPromise = null;

  static async getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      DatabaseConnection.initializationPromise = DatabaseConnection.instance.initialize();
    }
    await DatabaseConnection.initializationPromise;
    return DatabaseConnection.instance;
  }

  async initialize(filename) {
    try {
      this.db = await open({
        filename: filename || ':memory:',
        driver: sqlite3.Database,
      });
      console.log('Connected to the SQLite database.');
      await this.initializeTables();
    } catch (e) {
      console.error('Error initializing database:', e);
      throw e; // 오류를 다시 던져서 호출자가 처리할 수 있도록 합니다.
    }
  }

  async initializeTables() {
    await this.createUserTable();
    await this.createTimPunchTable();
    await this.createAttendanceTable();
    await this.createAdminstratorTable();
    await this.createCompanyGalleryTable();
  }

  async runQuery(query) {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }
    return this.db.run(query);
  }

  async createUserTable() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT,
        name TEXT NOT NULL,
        position TEXT,
        employee_id TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        profile_img TEXT,
        is_deleted INTEGER DEFAULT 0
      )
    `);
  }

  async createTimPunchTable() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS time_punch (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        punch_in TEXT,
        punch_out TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }

  async createAttendanceTable() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title TEXT,
        content TEXT,
        name TEXT,
        attendance_start_date TEXT,
        attendance_days INTEGER,
        attendance_type TEXT NOT NULL,
        attendance_apply_time TEXT DEFAULT (datetime('now', '+9 hours'))
      )
    `);
  }

  async createAdminstratorTable() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS administrator (
        id INTEGER PRIMARY KEY,
        login_id TEXT UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        user_id INTEGER UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }

  async createCompanyGalleryTable() {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS company_gallery (
        id INTEGER PRIMARY KEY,
        administrator_id INTEGER,
        name TEXT,
        date TEXT DEFAULT (datetime('now', '+9 hours')),
        title TEXT,
        content TEXT,
        image TEXT
      )
    `);
  }

  getDatabase() {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }
    return this.db;
  }
}
