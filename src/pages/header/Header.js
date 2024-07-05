import './Header.css';
import { EmployeeGnb, AdminGnb } from './gnb';
import Login from '../login/userLogin';

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
      // 라우터뷰가 아니라 앱 자체에 로그인 인스턴스를 만들어 렌더링하고 뒤로가기를 막음으로서 해결할 수 있다(병훈님 조언)
      const app = document.querySelector('#app');
      history.replaceState('', '', '/');
      const login = new Login(app);
      login.render();
    });
  }
}
