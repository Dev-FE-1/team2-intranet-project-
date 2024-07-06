import axios from 'axios';
import './gallery.css';
export class AdminGallery {
  constructor(container, props = {}) {
    this.container = container;
    this.container.classList.add(props.containerClass || 'gallery');
    this.galleryDataPath = props.galleryDataPath || '/api/gallery/contents';
  }

  async getGalleryData() {
    try {
      const response = await axios.get(this.galleryDataPath);
      return response.data;
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

  render() {
    this.container.innerHTML = /* HTML */ `
      <h2 class="gallery__title">사진 갤러리</h2>
      <div class="gallery__container"></div>
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
