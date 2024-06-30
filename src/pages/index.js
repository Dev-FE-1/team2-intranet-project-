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
  '/': { title: 'Home', render: (props) => renderComponent(Home, props) },
  '/userinfo': {
    title: 'userinfo',
    render: (props) => renderComponentClass(UserInfo, props),
  },
  '/mypage': {
    title: 'mypage',
    render: (props) => renderComponentClass(Mypage, props),
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

const renderComponentClass = (ComponentClass, props = {}) => {
  const componentInstance = new ComponentClass(props);
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
  }
}

router();
// Handle navigation
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    const props = { data: 'data' };
    router(props);
  }
});

// // Update router
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
