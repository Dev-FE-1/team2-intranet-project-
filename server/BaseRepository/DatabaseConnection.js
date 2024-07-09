import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export class DatabaseConnection {
  static instance = null;

  static async getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      await DatabaseConnection.instance.initialize();
    }
    return DatabaseConnection.instance;
  }

  async initialize(filename) {
    try {
      this.db = await open({
        filename: filename || ':memory:',
        driver: sqlite3.Database,
      });
      console.log('Connected to the in-memory SQLite database.');
      await this.initializeTables();
    } catch (e) {
      console.error(e);
    }
  }

  async initializeTables() {
    await this.createUserTable();
    await this.createTimPunchTable();
    await this.createAttendanceTable();
    await this.createAdminstratorTable();
    await this.createCompanyGalleryTable();
  }

  async createUserTable() {
    await this.db.run(`
CREATE TABLE IF NOT EXISTS users (
    id integer primary key,
    login_id text unique not null,
    password TEXT not null ,
    name TEXT not null,
    email TEXT,
    position TEXT,
    phone TEXT,
    img TEXT,
    is_deleted INTEGER DEFAULT 0
);
    `);
  }

  async createTimPunchTable() {
    await this.db.run(`
CREATE TABLE IF NOT EXISTS time_punch (
    id integer primary key,
    user_id integer not null,
    punch_in text,
    punch_out text,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
    `);
  }

  async createAttendanceTable() {
    await this.db.run(`
create table if not exists attendance(
    id integer PRIMARY KEY,
    user_id integer not null,
    title text,
    content text,
    attendance_start_date text,
    attendance_days integer,
    attendance_type text not null,
    attendance_apply_time text DEFAULT (datetime('now', '+9 hours')),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
    `);
  }

  async createAdminstratorTable() {
    await this.db.run(`
create table if not exists administrator(
    id integer primary key,
    login_id text unique,
    name text not null,
	  password text not null,
    user_id integer unique,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`);
  }

  async createCompanyGalleryTable() {
    await this.db.run(`
create table if not exists company_gallery(
    id integer primary key,
    administrator_id integer,
    title TEXT,
    content text,
    img text,
    FOREIGN KEY (administrator_id) REFERENCES administrator(id)
);
        `);
    //     await this.db.run(`
    // create table if not exists company_gallery(
    //     id integer primary key,
    //     administrator_id integer not null,
    //     title TEXT,
    //     content text,
    //     img text,
    //     FOREIGN KEY (administrator_id) REFERENCES administrator(id)
    // );
    //         `);
  }

  getDatabase() {
    return this.db;
  }
}
