import './Header.css';
import { EmployeeGnb, AdminGnb } from './gnb';

export class Header {
  constructor(container, props) {
    this.container = container || {};
    this.props = props || {};
    this.userType = this.props.userType || sessionStorage.getItem('userType');
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

  setupLogoutButton() {
    const logoutButton = document.querySelector(`#${this.cid} .header__btn-logout`);
    logoutButton.addEventListener('click', () => {
      // 로그아웃 시 세션 초기화
      sessionStorage.clear();
      // 로그아웃 버튼 클릭 시 href로 홈으로 이동하도록 만들기
      window.location.href = '/';
    });
  }
}
