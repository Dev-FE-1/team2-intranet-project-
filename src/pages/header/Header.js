import './Header.css';

export class Header {
  constructor(container, props) {
    this.container = container || {};
    this.props = props || {};
  }

  render() {
    return /* HTML */ `
      <header class="header">
        <div class="header__container">
          <h1 class="header__heading-title">
            <img
              class="header__intranet-logo"
              src="/src/assets/images/favicon/android-chrome-192x192.png"
              alt="Logo"
            />
            <span>Admin Dashboard</span>
          </h1>
          <nav class="header__gnb">
            <ul class="header__nav-list">
              <li><a href="/employee-list" data-link>직원관리</a></li>
              <li><a href="/about" data-link>갤러리관리</a></li>
              <li><a href="/userinfo" data-link>직원 등록</a></li>
              <li><a href="/mypage" data-link>마이페이지</a></li>
            </ul>
          </nav>
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;
  }
}
