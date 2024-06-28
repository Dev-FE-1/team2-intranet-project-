// import Mypage from '../mypage/Mypage';
// import UserInfo from '../userinfo/UserInfo';
// import { UserHeader } from '../header/Header';
// import Footer from '../footer/Footer';

const app = () => {
  const appEl = document.querySelector('#app');
  // const header = new UserHeader();
  // const footer = new Footer();
  const routerView = document.createElement('router-view');

  // appEl.append(header.render(), routerView, footer.render());
  appEl.append(routerView);
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
  const routerView = document.querySelector('router-view');

  switch (path) {
    case '/':
      routerView.innerHTML = '';
      break;
    // case '/info':
    //   routerView.innerHTML = '';
    //   routerView.append(new UserInfo().el);
    //   break;
    // case '/mypage':
    //   routerView.innerHTML = '';
    //   routerView.append(new Mypage().el);
    //   break;
  }
};

document.addEventListener('DOMContentLoaded', app);
