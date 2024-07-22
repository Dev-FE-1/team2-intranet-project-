import { BaseRepository } from '../BaseRepository/BaseRepository.js';
import { EntityKeyConverter } from '../converter/entityKeyConverter.js';

export class GalleryRepository extends BaseRepository {
  constructor() {
    super('company_gallery');
    this.converter = new EntityKeyConverter();
  }

  // 갤러리 글 생성
  async createPosts(entity) {
    await this.initialize();
    const keys = Object.keys(entity);
    const values = Object.values(entity);

    const placeholders = keys.map(() => '?').join(',');

    try {
      await this.db.run(
        `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (
      ${placeholders})`,
        values,
      );
      const result = await this.db.get(
        `SELECT * FROM ${this.tableName} where id = last_insert_rowid()`,
      );
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 갤러리 전체 조회
  async getAllGallery() {
    try {
      return await this.getAll();
    } catch (e) {
      throw new Error('Failed to get all gallery', e);
    }
  }
  // // 갤러리 전체 조회
  // async getAllGallery() {
  //   try {
  //     await this.initialize();
  //     return await this.db.all(`SELECT * FROM ${this.tableName}`);
  //   } catch (e) {
  //     throw new Error('Failed to get all gallery');
  //   }
  // }
}
