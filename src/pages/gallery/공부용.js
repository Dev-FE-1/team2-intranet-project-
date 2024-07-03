import axios from 'axios';
import './gallery.css';

export class AdminGallery {
  constructor(props = {}) {
    // 갤러리 컨테이너를 위한 새로운 <div> 요소를 생성합니다.
    this.el = document.createElement('div');
    // 외부에서 전달받은 클래스를 추가합니다. 없으면 'gallery' 클래스를 사용합니다.
    this.el.classList.add(props.containerClass || 'gallery');
    // 갤러리 데이터가 있는 JSON 파일의 경로를 설정합니다. 기본값은 './src/pages/gallery/gallery.json'입니다.
    this.galleryDataPath = props.galleryDataPath || './src/pages/gallery/gallery.json';
    this.state = {}; // 현재 상태를 저장할 객체입니다.
    // 갤러리 데이터를 저장하는 객체. 이후 render 메서드에서는 this.state에 저장된 데이터를 기반으로 갤러리의 각 항목을 동적으로 생성하여 HTML에 추가
    this.init(); // 초기화 함수를 호출하여 갤러리를 준비합니다.
  }

  async init() {
    await this.fetchGallery(); // 갤러리 데이터를 불러옵니다.
    this.render(); // 데이터를 기반으로 갤러리를 렌더링합니다.
  }

  async fetchGallery() {
    try {
      // axios를 사용해 갤러리 데이터를 가져옵니다.
      const response = await axios.get(this.galleryDataPath);
      console.log(response.data); // 데이터를 콘솔에 출력합니다.
      this.state = response.data; // 가져온 데이터를 상태에 저장합니다.
    } catch (e) {
      console.error('Gallery.json 파일을 불러오는 데 실패했습니다.', e); // 에러 발생 시 에러 메시지를 출력합니다.
    }
  }

  render() {
    if (this.state) {
      // 갤러리 데이터가 있으면 각 항목을 순회하면서 갤러리 아이템을 생성합니다.
      this.state.forEach((item) => {
        const gallery__container = document.createElement('div'); // 갤러리 컨테이너 요소를 생성합니다.
        gallery__container.classList.add('gallery__container'); // 'gallery__container' 클래스를 추가합니다.

        const card = document.createElement('div'); // 갤러리 카드 요소를 생성합니다.
        card.classList.add('gallery__container-card'); // 'gallery__container-card' 클래스를 추가합니다.

        // 카드 내용을 HTML 문자열로 설정합니다. 이미지, 제목, 날짜를 포함합니다.
        card.innerHTML = `
          <div class="gallery__container-image-area">
            <img src="${item.image}" alt="${item.title}" /> 
          </div>
          <div class="gallery__container-title">${item.title}</div> 
          <div class="gallery__container-date">${item.date}</div> 
        `;

        gallery__container.appendChild(card); // 갤러리 컨테이너에 카드를 추가합니다.
        this.el.appendChild(gallery__container); // 전체 갤러리 요소에 갤러리 컨테이너를 추가합니다.
      });
    }

    // document.body.appendChild(this.el); // 만든 갤러리 요소를 본문에 추가할 수도 있습니다.
  }
}
