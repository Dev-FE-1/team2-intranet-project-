import './Header.css';
import { EmployeeGnb, AdminGnb } from './gnb';

export class Header {
  constructor(container, props) {
    this.container = container || {};
    this.props = props || {};
    this.userType = sessionStorage.getItem('userType');
  }

  render() {
    return /* HTML */ `
      <header class="header">
        <div class="header__container">
          <h1 class="header__heading-title">
            <a href="/" data-link="">
              <img
                class="header__intranet-logo"
                src="/src/assets/images/favicon/android-chrome-192x192.png"
                alt="Logo"
              />
              <span>Admin Dashboard</span>
            </a>
          </h1>
          ${this.userType === 'admin' ? AdminGnb() : EmployeeGnb()}
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;
  }

  // 로그아웃 버튼에 이벤트 리스너를 추가하는 메서드, 나중에 로그인 쪽 완료되면 활성화하기
  // setupLogoutButton() {
  //   const logoutButton = document.querySelector(`#${this.cid} .header__btn-logout`);
  //   logoutButton.addEventListener('click', () => {
  //     // 로그아웃 시 세션에서 사용자 정보 제거
  //     sessionStorage.removeItem('userType');
  //     // 유저 유형별로 각각의 로그인 페이지로 다이렉트하도록 만들기
  //     if (userType === 'admin') {
  //       window.location.href = '/adminLogin';
  //     } else if (userType === 'employee') {
  //       window.location.href = '/employeeLogin';
  //     }
  //   });
  // }
}
