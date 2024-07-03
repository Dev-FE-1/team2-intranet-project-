import axios from 'axios';
import './gallery.css';

export class EmployeeGallery {
  constructor(props = {}) {
    this.container = document.createElement('div');
    this.container.classList.add(props.containerClass || 'gallery__container'); // 외부에서 클래스 받아오기
    this.galleryDataPath = props.galleryDataPath || './src/pages/gallery/gallery.json';
    this.init();
  }

  async init() {
    await this.fetchGallery();
    this.render();
  }

  async fetchGallery() {
    try {
      const response = await axios.get(this.galleryDataPath);
      this.state = response.data;
    } catch (e) {
      console.error('Gallery.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }
  getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href;
  }

  render() {
    // this.container.innerHTML = /* HTML */ `<h2 class="gallery__title">Gallery</h2> `;
    if (this.state) {
      this.state.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('gallery__container-card');

        card.innerHTML = `
          <div class="gallery__container-image-area">
            <img src="${this.getImageUrl(item.image)}" alt="${item.title}" />
          </div>
          <div class="gallery__container-title">${item.title}</div>
          <div class="gallery__container-date">${item.date}</div>
        `;

        this.container.appendChild(card);
      });
    }

    document.body.appendChild(this.container);
  }
}
