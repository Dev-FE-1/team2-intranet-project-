// import 순서를 관리자와 사용자별 메뉴 순서에 맞게 수정했습니다.
import { Layout } from './layout/Layout.js';
import { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
import UserInfo from './userinfo/UserInfo';

import { AdminGallery } from './gallery/AdminGallery.js';
// HomeUpper와 bottom은 나중에 Home.js 에 합쳐질 예정, 합친 후 수정 필요
// import Home from './Home';
import { HomeUpper } from './Home/HomeUpper.js';
import { EmployeeGallery } from './gallery/EmployeeGallery.js';

import Mypage from './mypage/Mypage';

import Login from './login/userLogin.js';

const app = document.querySelector('#app');

// 유저 타입 정보 세션스토리지에서 가져오기
const userType = sessionStorage.getItem('userType');

if (!sessionStorage.length) {
  history.replaceState('', '', '/');
  const login = new Login(app);
  login.render();
} else {
  // 유저타입에 따른 레이아웃 인스턴스 생성
  const layout = new Layout(app, { userType });
  layout.render();

  const routeView = app.querySelector('route-view');

  const routes = {
    // 관리자 페이지
    '/userinfo': {
      title: 'userinfo',
      Component: UserInfo,
    },
    '/employee-list': {
      title: 'Employee List',
      Component: EmployeeListTable,
    },
    '/galleryManagement': {
      title: 'GalleryManagement',
      Component: AdminGallery,
    },
    // 직원 페이지
    '/': {
      title: 'Home',
      Component: HomeUpper,
    },
    '/gallery': {
      title: 'Gallery',
      Component: EmployeeGallery,
    },
    '/attendance': {
      title: 'Attendance Request',
    },
    '/mypage': {
      title: 'mypage',
      Component: Mypage,
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
