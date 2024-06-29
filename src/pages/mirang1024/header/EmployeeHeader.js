import './Header.css';

export default class EmployeeHeader {
  constructor() {
    this.container = document.createElement('div');
  }

  render() {
    this.container.innerHTML = `
      <header class="header">
        <div class="header__container">
          <h1 class="header__heading-title">
            <img
              class="header__intranet-logo"
              src="/team2-intranet-project-/src/assets/images/favicon/android-chrome-192x192.png"
              alt="Logo"
            />
            <span>
              <a href="/home" data-link="home">Home</a>
              Intranet
            </span>
          </h1>
          <nav class="header__gnb">
            <ul class="header__nav-list">
              <li>
                <a href="/home" data-link>Home</a>
              </li>
              <li>
                <a href="/gallery" data-link>갤러리</a>
              </li>
              <li>
                <a href="/attendance" data-link>근태신청</a>
              </li>
              <li>
                <a href="/myPage" data-link>마이페이지리</a>
              </li>
            </ul>
          </nav>
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;

    this.setupTitleClick();
    this.setupLogoutButton();

    return this.container.innerHTML;
  }

  setupTitleClick() {
    const titleElement = this.el.querySelector('.header__heading-title a[data-link]');
    titleElement.addEventListener('click', () => {
      window.location.href = '/home';
    });
  }

  setupLogoutButton() {
    const logoutButton = document.querySelector(`.header__btn-logout`);
    logoutButton.addEventListener('click', () => {
      window.location.href = '/employeeLogin';
    });
  }
}
