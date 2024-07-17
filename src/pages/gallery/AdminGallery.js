import { Gallery } from './Gallery';

export class AdminGallery extends Gallery {
  getGalleryTitle() {
    return '갤러리 관리';
  }
}

// 향후 카드 추가, 수정, 삭제 기능 추가 등 확장성을 고려하여 아래에 메서드 추가 가능
