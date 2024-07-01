import './Header.css';

export class AdminHeader {
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
            <span>Admin Dashboard</span>
          </h1>
          <nav class="header__gnb">
            <ul class="header__nav-list">
              <li>
                <a href="/employeeManagement" data-link="employeeManagement">직원관리</a>
              </li>
              <li>
                <a href="/galleryManagement" data-link="galleryManagement">갤러리관리</a>
              </li>
            </ul>
          </nav>
          <button class="header__btn-logout">로그아웃</button>
        </div>
      </header>
    `;

    this.setupLogoutButton();

    return this.container.innerHTML;
  }

  setupLogoutButton() {
    const logoutButton = document.querySelector(`.header__btn-logout`);
    logoutButton.addEventListener('click', () => {
      window.location.href = '/adminLogin';
    });
  }
}
