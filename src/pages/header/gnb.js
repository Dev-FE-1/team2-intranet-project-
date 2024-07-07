export { EmployeeGnb, AdminGnb };

function AdminGnb() {
  return /* HTML */ `
    <nav class="header__gnb">
    <ul class="header__nav-list">
      <li>
        <a href="/employee-list" data-link>
        <span class="material-symbols-rounded">
        group
        </span>
          <span>직원관리<span>
        </a>
      </li>
      <li>
      <a href="/galleryManagement" data-link>
      <span class="material-symbols-rounded">
      gallery_thumbnail
      </span>
        <span>갤러리관리</span>
      </a>
      </li>
      <li>
      <a href="/NoticeManagement" data-link>
      <span class="material-symbols-rounded">
      campaign
      </span>
        <span>공지관리</span>
      </a>
      </li>
    </ul>
  </nav>
  `;
}

function EmployeeGnb() {
  return /* HTML */ `
    <nav class="header__gnb">
      <ul class="header__nav-list">
        <li>
          <a href="/" data-link>
            <span class="material-symbols-rounded"> grid_view </span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/gallery" data-link>
            <span class="material-symbols-rounded"> gallery_thumbnail </span>
            <span>갤러리</span>
          </a>
        </li>
        <li>
          <a href="/leave-application-list" data-link>
            <span class="material-symbols-rounded"> event_available </span>
            <span>근태신청</span>
          </a>
        </li>
        <li>
          <a href="/mypage" data-link>
            <span class="material-symbols-rounded"> account_circle </span>
            <span>마이페이지</span>
          </a>
        </li>
      </ul>
    </nav>
  `;
}
