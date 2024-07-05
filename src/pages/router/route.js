export class Route {
  //   pathMappings = {'/':{ title: 'Home', ComponentClass: Home}};
  constructor({ pathMappings, routeView } = {}) {
    this.pathMappings = pathMappings || {};
    this.routeView = routeView || document.querySelector('route-view');
  }

  router(props, href) {
    let currentView = this.pathMappings[href];
    if (currentView) {
      this.renderComponent(currentView, props, href);
    } else {
      history.replaceState('', '', '/');
      this.renderComponent(currentView, props, href);
    }
  }

  renderComponent(currentView, props, href) {
    history.pushState('', '', href);
    const { ComponentClass, title } = currentView;
    document.title = title;
    const componentInstance = new ComponentClass(this.routeView, props);
    this.routeView.innerHTML = '';
    componentInstance.render();
  }
}
