import Home from './sbs1253/view/Home';
import UserInfo from './sbs1253/userinfo/UserInfo';
const app = document.querySelector('#app');

const routes = {
  '/': { title: 'Home', render: () => renderComponent(Home) },
  '/about': {
    title: 'About',
    render: () => renderComponentClass(UserInfo),
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
    if (view.title === 'About') {
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
