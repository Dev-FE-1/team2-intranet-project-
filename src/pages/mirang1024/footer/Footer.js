import './Footer.css';

export default class Footer {
  constructor() {
    this.container = document.createElement('div');
  }

  render() {
    this.container.innerHTML = `
      <footer class="footer">
        <div class="footer__container">
          <div class="footer__title">Intranet</div>
          <a href="https://github.com/Dev-FE-1/team2-intranet-project-.git">
            <img class="footer__logo" src="/team2-intranet-project-/src/assets/images/favicon/android-chrome-192x192.png" alt="Repository Logo">
          </a>
          <p class="footer__copyright">
            Copyright 2024. 고낙연, 송병훈, 신혜진, 이동혁, 최미랑 all rights reserved.
          </p>
        </div>
      </footer>
    `;

    this.clickLogo();

    return this.container.innerHTML;
  }

  clickLogo() {
    const logo = document.querySelector('.footer__logo');
    logo.addEventListener('click', () => {
      window.location.href = 'https://github.com/Dev-FE-1/team2-intranet-project-.git';
    });
  }
}
