import axios from 'axios';
import './gallery.css';

export class AdminGallery {
  constructor(props = {}) {
    this.el = document.createElement('div');
    this.el.classList.add(props.containerClass || 'gallery');
    this.galleryDataPath = props.galleryDataPath || './src/pages/gallery/gallery.json';
    this.state = {};
    this.init();
  }

  async init() {
    await this.fetchGallery();
    this.render();
  }

  async fetchGallery() {
    try {
      const response = await axios.get(this.galleryDataPath);
      console.log(response.data);
      console.log(this.state);
      this.state = response.data;
    } catch (e) {
      console.error('Gallery.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }

  getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href;
  }

  //  /pages/gallery/image/c4.jpg
  render() {
    const gallery__container = document.createElement('div');
    gallery__container.classList.add('gallery__container');

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

        gallery__container.appendChild(card);
      });
    }

    this.el.appendChild(gallery__container); // this.el에 컨테이너 추가
  }
}
