import { compile } from "handlebars";


// 현재는 갤러리 데이터가 정적이기 때문에 단순히 json파일을 가져오는 방식을 택함
import galleryData from './gallery.json';

async function fetchUserInfo() {
  try {
    // 서버의 '/api/userInfo' 엔드포인트로부터 데이터 가져오기
    const response = await fetch('/api/userInfo');
    // 가져온 데이터를 json 형식으로 변환하기
    const userData = await response.json();
    // 변환된 데이터에서 userType을 sessionStorage에 저장
    sessionStorage.setItem('userType', userData.userType);
    // 변환된 데이터를 반환합니다.
    return userData;
    // 에러 발생 시 실행되는 블록
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

const galleryHtml = compile(`
  <div class="gallery">
    <div class="gallery__container">
      {{#each galleries}}
        <div class="gallery__container-card"> 
          <div class="gallery__container-image-area">
            <img src="{{image}}" alt="{{title}}" />
          </div> 
          <div class="gallery__container-title">{{title}}</div>
          <div class="gallery__container-date">{{date}}</div>
        </div>
      {{/each}}
    </div>
  </div>
`);



export default class Gallery {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  // JSON 데이터 가져오기
  static async fetchGalleryData() {
    try {
      return galleryData;
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      return null;
    }
  }

  async renderGallery() {
    try {
      const data = await Gallery.fetchGalleryData();
      if (!data) return;

      const html = galleryHtml({ galleries: data });

      this.container.innerHTML = html;
    } catch (error) {
      console.error('Error rendering gallery:', error);
    }
  }

}


const addGalleryCard = new GalleryCard('.ggallery__container-card');
addGalleryCard.renderGallery();






/* 아래는 호버 효과에 대한 이벤트 처리 방식 참고용

const cards = document.querySelectorAll('.gallery__container-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.classList.add('hovered'); // 특정 클래스 추가 예시
  });

  card.addEventListener('mouseleave', function() {
    this.classList.remove('hovered'); // 특정 클래스 제거 예시
  });
});

*/