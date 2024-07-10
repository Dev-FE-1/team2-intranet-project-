import axios from 'axios';
import './gallery.css';
export class AdminGallery {
  constructor(container, props = {}) {
    this.container = container;
    this.apiEndpoint = props.galleryDataPath || '/api/v1/gallery';
  }

  async getGalleryData() {
    try {
      const response = await axios.get(this.apiEndpoint);
      return response.data.data;
    } catch (e) {
      console.error('gallery contents를 fetch해서 불러오는 데 실패했습니다.', e);
      return [];
    }
  }

  getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href;
  }

  async updateGalleryContainer() {
    const galleryCardData = await this.getGalleryData();
    this.renderGalleryContainer(galleryCardData);
  }

  // 갤러리
  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="gallery">
        <h1 class="gallery__heading">갤러리 관리</h1>
        <button class="gallery__button">카드 추가</button>
        <div class="gallery__container"></div>
      </div>
    `;
    this.updateGalleryContainer();
  }

  renderGalleryContainer(galleryCardData) {
    const galleryContainer = this.container.querySelector('.gallery__container');
    galleryContainer.innerHTML = /* HTML */ `
      ${galleryCardData.map((item) => this.cardTemplate(item)).join('')}
    `;
  }

  cardTemplate({ image, title, date }) {
    return /* HTML */ `
      <div class="gallery__container-card">
        <div class="gallery__container-image-area">
          <img src="${this.getImageUrl(image) || 'no images'}" alt="${title}" />
        </div>
        <div class="gallery__container-title">${title || '제목 없음'}</div>
        <div class="gallery__container-date">${date}</div>
      </div>
    `;
  }
}
