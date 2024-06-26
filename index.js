import { EmployeeListTable, AttendanceList, navBar, layout, pageNotFound } from './src/pages';

const rootElementIdName = '#app';

const app = () => {
  init();
  route();
};

const init = () => {
  const root = document.querySelector(rootElementIdName);
  root.innerHTML = layout();
  navBar({
    cid: 'nav',
    menus: [
      { path: '/', label: 'Home' },
      { path: '/EmployeeListTable', label: '직원 리스트 페이지' },
      { path: '/attendances', label: '직원 근태 신청 프리뷰' },
    ],
  });
  window.addEventListener('popstate', route);
  document.querySelector('#nav').addEventListener('click', navigatePage);
};

const navigatePage = (event) => {
  const anchor = event.target.closest('a');
  if (anchor && anchor.href) {
    event.preventDefault();
    history.pushState(null, null, anchor.href);
    route();
  }
};

const route = () => {
  const path = window.location.pathname;
  const content = document.querySelector('#content');
  const employeeListTable = new EmployeeListTable({ cid: '#content' });
  const attendanceList = new AttendanceList({ cid: '#content' });

  switch (path) {
    case '/':
      content.innerHTML = /* HTML */ ` <div class="home"><h1>Home</h1></div> `;
      break;
    case '/EmployeeListTable':
      employeeListTable.render();
      break;
    case '/attendances':
      attendanceList.render();
      break;
    default:
      content.innerHTML = pageNotFound();
      break;
  }
};

document.addEventListener('DOMContentLoaded', app);
