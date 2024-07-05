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
            <a href="/" data-link>
              <img
                class="header__intranet-logo"
                src="/src/assets/images/favicon/android-chrome-192x192.png"
                alt="Logo"
              />
              <span>Admin Dashboard</span>
            </a>
          </h1>
          <nav class="header__gnb">
            <ul class="header__nav-list">
              <li><a href="/employee-list" data-link><span class="material-symbols-rounded"> group </span><span>직원관리<span></a>
              </li>
              <li><a href="/about" data-link><span class="material-symbols-rounded">
              gallery_thumbnail
              </span><span>갤러리관리</span></a></li>
              <li><a href="/userinfo" data-link><span class="material-symbols-rounded">
              person_add
              </span><span>직원 등록</span></a></li>
              <li><a href="/mypage" data-link><span class="material-symbols-rounded">
              account_circle
              </span><span>마이페이지</span></a></li>
            </ul>
          </nav>
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;
  }
}
