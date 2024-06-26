// Handlebars 라이브러리에서 compile 함수 가져오기, 
import { compile } from 'handlebars'

// 템플릿 문자열을 컴파일하여 재사용 가능한 템플릿 함수를 생성?
const headerHtml = compile(`
  <header class="header">
    <div class="header__container">
      <h1 class="header__heading-title">
        <img class="header__intranet-logo" src="/src/assets/images/favicon/android-chrome-192x192.png" alt="Logo">
        <span>{{title}}</span>
      </h1>
      <nav class="header__gnb">
        <ul class="header__nav-list">
        {{#each menus}}
          <li><a href="{{path}}" data-link>{{label}}</a></li>
        {{/each}}
        </ul>
      </nav>
      <button id="logout" class="header__btn-logout">로그아웃</button>
    </div>
  </header>
`)


// 관리자와 사용자 공통 요소를 헤더 클래스로 만들기
class Header {
  constructor({ cid, title, menus }) {
    this.cid = cid;
    this.title = title; 
    this.menus = menus;
  }

  // render() 메서드
  render() {
    // cid로 지정된 컨테이너 요소 찾기
    const container = document.querySelector(`#${this.cid}`);
    // 컨테이너 안에 HTML을 동적으로 생성 및 삽입
    container.innerHTML = headerHtml({ title: this.title, menus: this.menus });
    // 로그아웃 버튼에 대한 이벤트 리스너 
    this.setupLogoutButton();
  }

  // 로그아웃 버튼에 이벤트 리스너를 추가하는 메서드
  setupLogoutButton() {
    const logoutButton = document.querySelector('.header__btn-logout');
    logoutButton.addEventListener('click', () => {
    // 로그아웃 시 관리자와 사용자 로그인 화면으로 각각 이동하는 것 추가
    });
  }
}


// 관리자에서만 사용되는 요소를 AdminHeader 클래스로 만들기
// extends로 헤더 클래스 생성자를 부모로 설정하고 그로부터 상속받는다.
class AdminHeader extends Header {
  constructor() {
    super({
      cid: 'header', // 헤더가 삽입될 컨테이너 ID
      title: 'Admin Dashboard', // 헤더 제목
      menus: [ // 메뉴 목록
        { path: '/employeeAdmin', label: '직원관리' },
        { path: '/galleryAdmin', label: '갤러리관리' },
      ],
    });
  }
}

// 사용자에서만 사용되는 요소를 AdminHeader 클래스로 만들기
class UserHeader extends Header {
  constructor() {
    super({
      cid: 'header', // 헤더가 삽입될 컨테이너 ID
      // 타이틀 클릭 시 홈으로 이동
      title: `
        <a href="/home" data-link>Home</a>
        Intranet`, // 헤더 제목
      menus: [ // 메뉴 목록
        { path: '/home', label: 'Home' },
        { path: '/gallery', label: '갤러리' },
        { path: '/attendanceRequest', label: '근태신청' },
        { path: '/myPage', label: '마이페이지' },
      ],
    });
  }

  render() {
    // 부모 클래스 Header의 render 메서드 호출
    super.render(); 
    // title 요소 선택하여 이벤트 리스너 추가
    const titleLink = document.querySelector('.header__heading-title a[data-link]');
    titleLink.addEventListener('click', (event) => {
      event.preventDefault(); // 기본 동작(링크 이동) 방지
      // Home으로 이동
      window.location.href = '/home';
    });
  }
}

// 로그인 상태에 따라서 렌더링을 어떻게 달라지게 할 것인지 고민해보기
// document.addEventListener('DOMContentLoaded', () => {
//   const adminHeader = new AdminHeader();
//   AdminHeader.render();
//   const userHeader = new UserHeader();
//   UserHeader.render();
// });


export { AdminHeader, UserHeader };