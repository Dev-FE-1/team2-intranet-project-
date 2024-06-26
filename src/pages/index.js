import ProfileImage from './clara-shin/pages/ProfileImage';
import Loading from './clara-shin/pages/loading';
import './clara-shin/css/ProfileImage.css';
import './clara-shin/css/Loading.css';

function app() {
  //   const anchors = document.querySelectorAll('nav a');

  window.addEventListener('popstate', route);
  document.body.addEventListener('click', navigatePage);
  route();
}

function navigatePage(event) {
  event && event.preventDefault(); // anchor 기본동작 금지

  const anchor = event.target.closest('a');

  if (anchor && anchor.href) {
    const path = anchor.getAttribute('href'); //클릭이벤트 대상의 경로
    history.pushState(null, null, path);
    route();
  }
}

function route() {
  const content = document.querySelector('#app');
  const path = location.pathname;
  // console.log(path);

  // const homePage = new Page('#app', { title: '홈 대시보드' });
  const profileImage = new ProfileImage(content, {});
  const loading = new Loading(content, {});

  switch (path) {
    case '/pages/clara-shin/pages/dashboad':
      content.innerHTML = `<h1>홈 대시보드</h1>`;
      break;
    case '/pages/clara-shin/pages/profile-image':
      profileImage.render();
      break;
    case '/pages/clara-shin/pages/pagination':
      content.innerHTML = `<h1>페이지네이션 컴포넌트</h1>`;
      break;
    case '/pages/clara-shin/pages/apply-leave':
      content.innerHTML = `<h1>근태신청 페이지</h1><a href='/pages/clara-shin/pages/profile-image'>홈으로</>`;
      break;
    case '/pages/clara-shin/pages/loading':
      loading.render();
      break;
    default:
      content.innerHTML = `<h1>404 Not Found</h1><p>해당 페이지를 찾을 수 없습니다.</p>`;
      break;
  }
}
document.addEventListener('DOMContentLoaded', app);
