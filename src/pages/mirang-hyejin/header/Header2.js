import './Header.css'

// Handlebars 라이브러리에서 compile 함수 가져오기, 
import { compile } from 'handlebars'


// 사용자가 이미 로그인에 성공했고, 세션에 사용자 정보가 저장되어 있다는 가정 하에 진행
// 서버 API를 통해 JSON 파일에서 사용자 데이터 읽어오기
// 비동기함수
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

// 사용자 유형 전역 변수로 두기
const userType = sessionStorage.getItem('userType');

// header의 html 구조를 Handlebars와 머스태치를 사용해 html 템플릿으로 변환하기
const headerHtml = compile(`
  <header class='header'>
    <div class='header__container'>
      <h1 class='header__heading-title'>
        <img class='header__intranet-logo' src='/src/assets/images/favicon/android-chrome-192x192.png' alt='Logo'>
        <span>{{title}}</span>
      </h1>
      <nav class='header__gnb'>
        <ul class='header__nav-list'>
        {{#each menus}}
          <li><a href='{{path}}' data-link>{{label}}</a></li>
        {{/each}}
        </ul>
      </nav>
      <button id='logout' class='header__btn-logout'>로그아웃</button>
    </div>
  </header>
`)

// 관리자와 사용자 공통 요소를 헤더 클래스 컴포넌트로 만들기
export class Header {
  constructor({ cid, title, menus }) {
    this.cid = cid;
    this.el = document.querySelector(`#${this.cid}`);
    this.render();
  }

  render() {
    // 사용자 타입에 따라 title과 menus를 설정
    // this.el.innerHTML = getHeaderHtml({ title, menus });
    this.el.innerHTML = (`
    <header class='header'>
    <div class='header__container'>
      <h1 class='header__heading-title'>
        <img class='header__intranet-logo' src='/src/assets/images/favicon/android-chrome-192x192.png' alt='Logo'>
        <span>{{title}}</span>
      </h1>
      <nav class='header__gnb'>
        <ul class='header__nav-list'>
        {{#each menus}}
          <li><a href='{{path}}' data-link>{{label}}</a></li>
        {{/each}}
        </ul>
      </nav>
      <button id='logout' class='header__btn-logout'>로그아웃</button>
    </div>
    </header>
    `)
    // 로그아웃 버튼에 대한 이벤트 리스너 >> 이벤트리스너 정상 작동 여부 확인 필요!!!!!!!!!
    // 타이틀 클릭 시 홈으로 이동하는 기능 추가
  //   if (userType === 'employee') {
  //     this.setupTitleClick();
  //   }
  //   this.setupLogoutButton();
  }

  // 사용자 유형을 임의로 admin과 employee로 나누고, 사용자 유형에 따라 타이틀과 메뉴를 바꾸는 함수
  getHeaderHtml() {
    return headerHtml({
      title: userType === 'admin' ? 'Admin Dashboard' : 'Intranet',
      menus: userType === 'admin' ? [
        { path: '/employeeAdmin', label: '직원관리' },
        { path: '/galleryAdmin', label: '갤러리관리' },
      ] : [
        { path: '/home', label: 'Home' },
        { path: '/gallery', label: '갤러리' },
        { path: '/attendanceRequest', label: '근태신청' },
        { path: '/myPage', label: '마이페이지' },
      ]
    })
  }

  setupTitleClick() {
    const titleElement = this.el.querySelector('.header__heading-title a[data-link]');
    titleElement.addEventListener('click', () => {
      // 타이틀 클릭 시 홈으로 리다이렉트
      window.location.href = '/home';
    });
  }


  // 로그아웃 버튼에 이벤트 리스너를 추가하는 메서드
  setupLogoutButton() {
    const logoutButton = document.querySelector(`#${this.cid} .header__btn-logout`);
    logoutButton.addEventListener('click', () => {
      // 로그아웃 시 세션에서 사용자 정보 제거
      sessionStorage.removeItem('userType'); 
      // 유저 유형별로 각각의 로그인 페이지로 다이렉트하도록 만들기
      if (userType === 'admin') {
        window.location.href = '/adminLogin';
      } else if (userType === 'employee') {
        window.location.href = '/employeeLogin';
      }
    });
  }
}


/*
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
*/