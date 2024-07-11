// Setting.js
import '../Setting/setting.css';

export default class Setting {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="setting">
        <h1 class="setting__heading">갤러리</h1>
        <button id="logoutButton" class="btn-logout">로그아웃</button>
      </div>
    `;
  }
}
