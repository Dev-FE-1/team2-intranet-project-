import { galleryData } from '../initalizeData.js';
export class GalleryService {
  constructor({ galleryRepository }) {
    this.galleryRepository = galleryRepository;
    this.insertDummyDatasToGalleryTable();
  }

  // 갤러리 전체 조회
  async getAllGallery() {
    try {
      return await this.galleryRepository.getAll();
    } catch (e) {
      console.error('Failed to get all gallery', e);
    }
  }

  // 갤러리 글 작성
  async createPosts(post) {
    try {
      const result = await this.galleryRepository.createPosts(post);
      return result;
    } catch (e) {
      console.error('Failed to create gallery', e);
    }
  }

  // 갤러리에 더미 테이터들 추가함.
  async insertDummyDatasToGalleryTable() {
    try {
      const dummyDatas = galleryData;
      for (const dummyData of dummyDatas) {
        await this.createPosts(dummyData);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
