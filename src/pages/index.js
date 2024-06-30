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
    render: (props) => renderComponentClass(UserInfo, props),
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

const renderComponentClass = (ComponentClass, props = {}) => {
  const componentInstance = new ComponentClass(props);
  routeView.append(componentInstance.el);
};

function router() {
  let view = routes[location.pathname];
  if (view) {
    document.title = view.title;
    routeView.innerHTML = '';
    view.render();
  } else {
    history.replaceState('', '', '/');
    routeView.innerHTML = '';
    router();
  }
}

export class Route {
  constructor({ routes, routeView } = {}) {
    this.routes = routes || {};
    this.routeView = routeView || document.querySelector('route-view');
  }

  router(props) {
    let view = this.routes[location.pathname];
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
  renderComponent(ComponentClass) {
    const componentInstance = new ComponentClass(routeView, {});
    componentInstance.render();
  }
}

router();
// Handle navigation
window.addEventListener('click', (e) => {
  // console.log('data-link-tr', e.target);
  // console.log('data-link-tr boolean', e.target.matches('[data-props]'));

  // if (e.target.matches('[data-props]')) {
  //   e.preventDefault();
  //   const anchorElem = e.target.closest('a');
  //   const props = { props: anchorElem.dataset.props };
  //   history.pushState('', '', e.target.href);
  //   console.log('props:', props);
  //   router(props);
  // }

  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    // const anchorElem = e.target.closest('a');
    // console.log('anchorElem:', anchorElem.dataset.link);
    history.pushState('', '', e.target.href);
    const props = { data: 'data' };
    router(props);
  }
});

// // Update router
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);
