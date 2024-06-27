import Mypage from '../mypage/Mypage';
import UserInfo from '../userinfo/UserInfo';
function nav() {
  return /* HTML */ ` <h1>Home</h1>
    <ul>
      <li>
        <a href="/"><span>Home</span></a>
      </li>
      <li><a href="/info">유저정보</a></li>
      <li><a href="/mypage">마이페이지</a></li>
    </ul>`;
}
const app = () => {
  const content = document.querySelector('#app');
  const view = document.createElement('view');
  content.innerHTML = nav();
  content.append(view);

  init();
  route();
};

const init = () => {
  window.addEventListener('popstate', route);
  document.body.addEventListener('click', navigatePage);
};

const navigatePage = (event) => {
  const anchor = event.target.closest('a');
  if (anchor && anchor.href) {
    event.preventDefault();
    history.pushState(null, null, anchor.href);
    route();
  }
};

const route = () => {
  const path = window.location.pathname;
  const view = document.querySelector('view');

  switch (path) {
    case '/':
      view.innerHTML = /* HTML */ ` <h1>메인 페이지</h1>`;
      break;
    case '/info':
      view.innerHTML = '';
      view.append(new UserInfo().el);
      break;
    case '/mypage':
      view.innerHTML = '';
      view.append(new Mypage().el);
      break;
  }
};

document.addEventListener('DOMContentLoaded', app);
