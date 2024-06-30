export { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
export { AttendanceList } from './attendanceList/AttendanceList.js';
export { AttendanceApply } from './attendanceApply/AttendanceApply.js';
export { navBar } from './tmp_test_components/navbar.js';
export { layout } from './tmp_test_components/layout.js';
export { pageNotFound } from './tmp_test_components/pageNotFound.js';

import Home from './Home';
import UserInfo from './userinfo/UserInfo';
import Mypage from './mypage/Mypage';
const app = document.querySelector('#app');

const routes = {
  '/': { title: 'Home', render: () => renderComponent(Home) },
  '/userinfo': {
    title: 'userinfo',
    render: () => renderComponentClass(UserInfo),
  },
  '/mypage': {
    title: 'mypage',
    render: () => renderComponentClass(Mypage),
  },
  // '/contact': { title: 'Contact', render: renderComponent(Contact) },
};

const renderComponent = (ComponentClass) => {
  const componentInstance = new ComponentClass(app, {});
  return componentInstance.render();
};

const renderComponentClass = (ComponentClass) => {
  const componentInstance = new ComponentClass();
  return componentInstance.el;
};
function router() {
  let view = routes[location.pathname];
  if (view) {
    document.title = view.title;
    if (view.title === 'userinfo' || view.title === 'mypage') {
      app.innerHTML = '';
      app.append(view.render());
    } else {
      app.innerHTML = view.render();
    }
  } else {
    history.replaceState('', '', '/');
    router();
  }
}

// Handle navigation
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    router();
  }
});

// Update router
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
