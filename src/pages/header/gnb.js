export { EmployeeGnb, AdminGnb };

function EmployeeGnb() {
  return /* HTML */ `
  <nav class="header__gnb">
    <ul class="header__nav-list">
      <li>
        <a href="/" data-link>
        <span class="material-symbols-rounded"> group </span>
        <span>Home<span>
        </a>
      </li>
      <li>
        <a href="/gallery" data-link>
          <span class="material-symbols-rounded"> group </span>
          <span>갤러리<span>
        </a>
      </li>
      <li>
        <a href="/attendance" data-link>
          <span class="material-symbols-rounded"> group </span>
          <span>근태신청<span></a></li>
      <li> 
        <a href="/myPage" data-link>
          <span class="material-symbols-rounded"> group </span>
          <span>마이페이지<span>
        </a>
      </li>
    </ul>
  </nav>
  `;
}

function AdminGnb() {
  return /* HTML */ `
    <nav class="header__gnb">
    <ul class="header__nav-list">
      <li>
        <a href="/" data-link>
          <span class="material-symbols-rounded"> group </span>
          <span>Home<span>
        </a>
      </li>
      <li>
      <a href="/galleryManagement" data-link>
        <span class="material-symbols-rounded">gallery_thumbnail</span>
        <span>갤러리관리</span>
      </a>
      </li>
    </ul>
  </nav>
  `;
}
