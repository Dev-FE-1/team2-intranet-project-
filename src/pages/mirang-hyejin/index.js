import Home from './view/Home';

const app = document.querySelector('#app');

const routes = {
  '/': { title: 'Home', render: () => renderComponent(Home) },
  // '/about': { title: 'About', render: renderComponent(About) },
  // '/contact': { title: 'Contact', render: renderComponent(Contact) },
};

const renderComponent = (ComponentClass) => {
  const componentInstance = new ComponentClass(app, {});
  return componentInstance.render();
};

function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
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
