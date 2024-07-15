// 로딩 컴포넌트 추가
import Loading from '../components/loading/Loading.js';
import { Layout } from './layout/Layout.js';
import { EmployeeListTable } from './employeeListTable/EmployeeListTable.js';
// import { AttendanceList } from './attendanceList/AttendanceList.js';
import UserInfo from './userinfo/UserInfo';
import Setting from './Setting/Setting.js';

import { AdminGallery } from './gallery/AdminGallery.js';
import { Home } from './Home/Home.js';
import { EmployeeGallery } from './gallery/EmployeeGallery.js';

import Mypage from './mypage/Mypage';

import Login from './login/userLogin.js';
import LeaveApplicationList from './LeaveApplicationList/LeaveApplicationList.js';

const app = document.querySelector('#app');

// isAdmin으로 admin 상태를 확인
const isAdmin = sessionStorage.getItem('admin') === 'true';

if (!sessionStorage.id) {
  history.replaceState('', '', '/');
  const login = new Login(app);
  login.render();
} else {
  // admin 상태에 따른 레이아웃 인스턴스 생성
  const layout = new Layout(app, { isAdmin });
  layout.render();

  // 로그아웃 이벤트 리스너 설정
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = '/';
    });
  }

  const adminLogoutButton = document.getElementById('adminLogout');
  if (adminLogoutButton) {
    adminLogoutButton.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = '/';
    });
  }
  const routeView = app.querySelector('route-view');

  const adminRoutes = {
    '/adminHome': {
      title: 'CORENET Admin - Home',
      Component: Home,
    },

    '/': {
      title: 'CORENET Admin - 직원관리',
      Component: EmployeeListTable,
    },
    '/userinfo': {
      title: 'CORENET Admin - 인트라넷 솔루션',
      Component: UserInfo,
    },
    '/galleryManagement': {
      title: 'CORENET Admin - 갤러리 관리',
      Component: AdminGallery,
    },
    '/logout': {
      title: 'Logout',
      Component: Setting,
    },
  };

  const userRoutes = {
    // 직원 페이지
    '/': {
      title: 'CORENET - Home',
      Component: Home,
    },
    '/gallery': {
      title: 'CORENET - 갤러리',
      Component: EmployeeGallery,
    },
    '/leave-application-list': {
      title: 'CORENET - 근태신청',
      Component: LeaveApplicationList,
    },
    '/mypage': {
      title: 'CORENET - 마이페이지',
      Component: Mypage,
    },
  };

  const renderComponent = async ({ ComponentClass, props }) => {
    const componentInstance = new ComponentClass(routeView, props);

    if (typeof componentInstance.loadData === 'function') {
      const loading = new Loading(routeView);
      loading.render();
      try {
        await componentInstance.render();
        await componentInstance.loadData();
      } finally {
        loading.hide();
      }
    } else {
      componentInstance.render();
    }
  };

  function router(props = {}) {
    const routes = isAdmin ? adminRoutes : userRoutes;
    const view = routes[location.pathname];
    if (view) {
      const { Component: ComponentClass, title: title } = view;
      document.title = title;
      routeView.innerHTML = '';
      renderComponent({ ComponentClass, props });
    } else {
      history.replaceState('', '', '/');
      router();
    }
  }

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
