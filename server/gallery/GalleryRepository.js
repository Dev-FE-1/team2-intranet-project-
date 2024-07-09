import { BaseRepository } from '../BaseRepository/BaseRepository.js';
import { EntityKeyConverter } from '../utils/entityKeyConverter.js';

export class GalleryRepository extends BaseRepository {
  constructor() {
    super('company_gallery');
    this.converter = new EntityKeyConverter();
  }

  // 갤러리 글 생성
  async createPosts(post) {
    try {
      const postKeys = this.converter.convertKeysToSnakeCase(Object.keys(post));
      const postValues = Object.values(post);
      const posts = await this.create(post, postKeys, postValues);
      return this.converter.convertEntitySnakeToCamelCaseKeys(posts);
    } catch (e) {
      throw new Error('Failed to create gallery', e);
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
