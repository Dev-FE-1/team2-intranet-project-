import axios from 'axios';
import './gallery.css';

export class EmployeeGallery {
  constructor(props = {}) {
    this.container = document.createElement('div');
    this.container.classList.add(props.containerClass || 'gallery');
    this.galleryDataPath = props.galleryDataPath || './src/pages/gallery/gallery.json';
    // 제이슨이 배열이기 때문에 객체가 아닌 배열로 수정
    this.state = [];
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
      // 이 부분 역시 수정
      this.state = response.data || [];
    } catch (e) {
      console.error('gallery.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }

  getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href;
  }

  //  /pages/gallery/image/c4.jpg
  render() {
    const gallery__container = document.createElement('div');
    gallery__container.classList.add('gallery__container');

    // state가 빈 배열이기 때문에 실제로 렌더링할 이미지 데이터가 없는 상황에서 반복문 실행됨. 이를 해결하기 위해 배열이 비어있지 않을 때만 렌더링 되도록 변경
    if (this.state && this.state.length > 0) {
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
    } else {
      // 상태가 비어있을 때
      const noImagesMessage = document.createElement('div');
      noImagesMessage.classList.add('no-images-message');
      noImagesMessage.textContent = '이미지가 없습니다.';
      gallery__container.appendChild(noImagesMessage);
    }

    this.container.appendChild(gallery__container);
  }
}
