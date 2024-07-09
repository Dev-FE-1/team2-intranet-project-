import './Header.css';
import { EmployeeGnb, AdminGnb } from './gnb';
import Login from '../login/userLogin';
import faviconImg from '/src/assets/images/favicon/android-chrome-192x192.png';

export class Header {
  constructor(container, props) {
    this.container = container || {};
    this.props = props || {};
    // 변경: userType 대신 isAdmin을 사용하고 sessionStorage에서 'admin' 값을 확인
    this.isAdmin = sessionStorage.getItem('admin') === 'true';
  }

  render() {
    // 대시보드 제목 및 링크 재설정
    const dashboardTitle = this.isAdmin ? 'Admin Dashboard' : 'corenet';
    const dashboardLink = this.isAdmin ? '/employee-list' : '/';

    return /* HTML */ `
      <header class="header">
        <div class="header__container">
          <h1 class="header__heading-title">
            <a href="${dashboardLink}" data-link>
              <img class="header__intranet-logo" src="${faviconImg}" alt="Logo" />
              <span>${dashboardTitle}</span>
            </a>
          </h1>
          ${this.isAdmin ? AdminGnb() : EmployeeGnb()}
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;
  }

  setupLogoutButton() {
    const logoutButton = document.querySelector(`#${this.cid} .header__btn-logout`);
    logoutButton.addEventListener('click', () => {
      sessionStorage.clear();
      const app = document.querySelector('#app');
      history.replaceState('', '', '/');
      const login = new Login(app);
      login.render();
    });
  }
}
