import { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
// import { AttendanceList } from './attendanceList/AttendanceList.js';
import Home from './Home';
import UserInfo from './userinfo/UserInfo';
import Mypage from './mypage/Mypage';
import { Layout } from './layout/Layout.js';

const app = document.querySelector('#app');

const layout = new Layout(app, {});
layout.render();

const routeView = app.querySelector('route-view');

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
  '/employee-list': {
    title: 'Employee List',
    render: () => renderComponent(EmployeeListTable),
  },
};

const renderComponent = (ComponentClass) => {
  const componentInstance = new ComponentClass(routeView, {});
  componentInstance.render();
};

const renderComponentClass = (ComponentClass) => {
  const componentInstance = new ComponentClass();
  routeView.append(componentInstance.el);
};

function router() {
  let view = routes[location.pathname];
  if (view) {
    document.title = view.title;
    if (view.title === 'userinfo' || view.title === 'mypage') {
      routeView.innerHTML = '';
      view.render();
    } else {
      routeView.innerHTML = '';
      view.render();
    }
  } else {
    history.replaceState('', '', '/');
    routeView.innerHTML = '';
    router();
  }
}

router();
// Handle navigation
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    router();
  }
});

// // Update router
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
