import axios from 'axios';
import './gallery.css';

// AdminGallery.js와 Employee.js의 공통 기능을 추출해 기본 클래스로 생성
export class Gallery {
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

  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="gallery">
        <h1 class="gallery__title">갤러리 관리</h1>
        <div class="gallery__container"></div>
      </div>
    `;
    this.updateGalleryContainer();
  }

  // 기존 방식으로는 모든 DOM 요소와 이벤트 리스너 제거 후 새로 생성되므로 개선 필요 :
  //
  renderGalleryContainer(galleryCardData) {
    const galleryContainer = this.container.querySelector('.gallery__container');

    // 카드가 추가될 때마다 컨테이너의 기존 내용 제거
    galleryContainer.innerHTML = '';

    // 가독성 향상, 유연한 DOM 요소 조작과 메모리 성능 최적화를 위한 분리
    galleryCardData.forEach((item) => {
      const cardElement = this.createCardElement(item);
      galleryContainer.appendChild(cardElement);
    });
  }

  // cardTemplate 대신 createCardElement 함수를 사용해 카드 컨테이너와 HTML을 그려주는 방식으로
  createCardElement({ image, title, date }) {
    const card = document.createElement('div');
    card.className = 'gallery__container-card';
    card.innerHTML = /* HTML */ `
      <div class="gallery__container-card">
        <div class="gallery__container-image-area">
          <img src="${this.getImageUrl(image) || 'no images'}" alt="${title}" />
        </div>
        <div class="gallery__container-title">${title || '제목 없음'}</div>
        <div class="gallery__container-date">${date}</div>
      </div>
    `;
    // 렌더링 후에 이벤트를 추가하지 않고 각 카드 요소에 직적 이벤트 리스너를 추가 가능
    // card.addEventListener('click', () => this.onCardClick({ image, title, date }));
    return card;
  }

  // 확정성 고려 : 카드 클릭 시 모달창이 뜨도록 만들 예정
  // onCardClick(cardData) {
  //   console.log('Card clicked:', cardData);
  // }
}
