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

  const routes = {
    '/': { title: 'Home', render: (props) => renderComponent(HomeUpper, props) },
    '/userinfo': {
      title: 'userinfo',
      render: (props) => renderComponent(UserInfo, props),
    },
    '/mypage': {
      title: 'mypage',
      render: (props) => renderComponent(Mypage, props),
    },
    '/employee-list': {
      title: 'Employee List',
      render: (props) => renderComponent(EmployeeListTable, props),
    },
  };

  const renderComponent = (ComponentClass, props) => {
    const componentInstance = new ComponentClass(routeView, props);
    componentInstance.render();
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
    }
  }

  router();
  // Handle navigation
  window.addEventListener('click', (e) => {
    const anchorElem = e.target.closest('a');
    if (anchorElem && anchorElem.matches('[data-link]')) {
      e && e.preventDefault();
      history.pushState('', '', anchorElem.href);
      const props = { data: 'data' };
      router(props);
    }
  });

  window.addEventListener('load', () => {
    console.log('page loaded');
  });

  // // Update router
  window.addEventListener('popstate', router);
  window.addEventListener('DOMContentLoaded', router);
}
