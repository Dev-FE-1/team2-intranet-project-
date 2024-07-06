import './Footer.css';
import faviconImg from '/src/assets/images/favicon/android-chrome-192x192.png';
import githubMarkImg from '/src/assets/images/github-mark.png';

export class Footer {
  constructor(container, props) {
    this.container = container || {};
    this.props = props || {};
  }
  render() {
    return /* HTML */ `
      <footer class="footer">
        <div class="footer__container">
          <h1 class="footer__title">
            <img src="${faviconImg}" alt="logo" />
            <span>Intranet</span>
          </h1>
          <div class="footer__contents">
            <p class="footer__copyright">
              Copyright 2024. 고낙연, 송병훈, 신혜진, 이동혁, 최미랑 all rights reserved.
            </p>
            <p>
              <a href="https://github.com/Dev-FE-1/team2-intranet-project-">
                <img
                  class="github__link"
                  src="${githubMarkImg}"
                  alt="Repository Logo"
                  target="_blank"
                />
              </a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}
