import Home from './view/Home';
import Gallery from './view/Gallery';
import GalleryManagement from './view/GalleryManagement';

const app = document.querySelector('#app');

const routes = {
  '/home': { title: 'Home', render: () => renderComponent(Home) },
  '/gallery': { title: 'Gallery', render: () => renderComponent(Gallery) },
};

const renderComponent = (ComponentClass) => {
  const componentInstance = new ComponentClass(app, {});
  return componentInstance.render();
};

function router() {
  let view = routes[location.pathname];
  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
  } else {
    /* 로그인 상태를 확인한 뒤 로그인되어있지 않으면 로그인 페이지로 리디렉션되록 만들기
    직원이 로그인하지 않은 상태에서 관리자 페이지의 경로로 접근하려고 할 경우
    관리자 로그인페이지로 리디렉션될텐데 이 경우 어떻게 해결해야하는지 */
    history.replaceState('', '', '/login');
    router();
  }
}

window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    router();
  }
});

window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
