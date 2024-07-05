import './Header.css';
import { EmployeeGnb, AdminGnb } from './gnb';
import Login from '../login/userLogin';
import faviconImg from '/src/assets/images/favicon/android-chrome-192x192.png';

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
            <a href="/" data-link>
              <img
                class="header__intranet-logo"
                src="${faviconImg}"
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
      sessionStorage.clear();
      const app = document.querySelector('#app');
      history.replaceState('', '', '/');
      const login = new Login(app);
      login.render();
    });
  }
}
