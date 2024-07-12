import { DatabaseConnection } from './DatabaseConnection.js';
export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = null;
  }

  async initialize() {
    if (this.db === null) {
      const connection = await DatabaseConnection.getInstance();
      this.db = await connection.getDatabase();
      return this.db;
    }
  }

  async getAll() {
    await this.initialize();
    return await this.db.all(`SELECT * FROM ${this.tableName}`);
  }

  async getById(id) {
    await this.initialize();
    return await this.db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, id);
  }

  async create(entity, entitykeys, entityvalues) {
    await this.initialize();
    const keys = entitykeys || Object.keys(entity);
    const values = entityvalues || Object.values(entity);
    const placeholders = keys.map(() => '?').join(',');
    const { lastID } = await this.db.run(
      `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (${placeholders})`,
      values,
    );
    return { id: lastID, ...entity };
  }

  async update(id, entity) {
    await this.initialize();
    const sets = Object.keys(entity)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(entity), id];

    await this.db.run(`UPDATE ${this.tableName} SET ${sets} WHERE id = ?`, values);
    return await this.getById(id);
  }

  async delete(id) {
    await this.initialize();
    await this.db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, id);
    return { id };
  }
}
