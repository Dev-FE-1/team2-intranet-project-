import { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
// import { AttendanceList } from './attendanceList/AttendanceList.js';
import { HomeUpper } from './Home/HomeUpper.js';
import UserInfo from './userinfo/UserInfo';
import Mypage from './mypage/Mypage';
import { Layout } from './layout/Layout.js';
import { AdminGallery } from './gallery/AdminGallery.js';
import Login from './login/userLogin.js';
import LeaveApplicationList from './LeaveApplicationList/LeaveApplicationList.js';
import LeaveApplicationForm from './LeaveApplicationList/LeaveApplicationForm.js';

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
    '/': {
      title: 'Home',
      Component: HomeUpper,
    },
    '/userinfo': {
      title: 'userinfo',
      Component: UserInfo,
    },
    '/mypage': {
      title: 'mypage',
      Component: Mypage,
    },
    '/employee-list': {
      title: 'Employee List',
      Component: EmployeeListTable,
    },
    '/galleryManagement': {
      title: 'GalleryManagement',
      Component: AdminGallery,
    },
    '/leave-application-list': {
      title: 'Leave Application List',
      Component: LeaveApplicationList,
    },
    '/leave-application-form': {
      title: 'Leave Application List',
      Component: LeaveApplicationForm,
    },
  };

  const renderComponent = ({ ComponentClass, props }) => {
    const componentInstance = new ComponentClass(routeView, props);
    componentInstance.render();
  };

  function router(props = {}) {
    const view = routes[location.pathname];
    if (view) {
      const { Component: ComponentClass, title: title } = view;
      document.title = title;
      routeView.innerHTML = '';
      renderComponent({ ComponentClass, props });
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
