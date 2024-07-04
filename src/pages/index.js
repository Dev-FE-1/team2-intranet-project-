import { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
// import { AttendanceList } from './attendanceList/AttendanceList.js';
import HomeUpper from './Home/HomeUpper.js';
import UserInfo from './userinfo/UserInfo';
import Mypage from './mypage/Mypage';
import { Layout } from './layout/Layout.js';
import Login from './login/userLogin.js';

const app = document.querySelector('#app');

if (!sessionStorage.length) {
  history.replaceState('', '', '/');
  const login = new Login(app);
  login.render();
} else {
  const layout = new Layout(app, {});
  layout.render();
  const routeView = app.querySelector('route-view');
  window.addEventListener('popstate', router);
  window.addEventListener('DOMContentLoaded', router);

  const routes = {
    '/': {
      title: 'Home',
      render: () => renderComponent(HomeUpper),
    },
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

  function router(props = {}) {
    let view = routes[location.pathname];
    if (view) {
      document.title = view.title;
      routeView.innerHTML = '';
      view.render(props);
    } else {
      history.replaceState('', '', '/');
      routeView.innerHTML = '';
      router();
    }
  }

  // Handle navigation
  window.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      history.pushState('', '', link.href);
      router();
    }
  });
}
