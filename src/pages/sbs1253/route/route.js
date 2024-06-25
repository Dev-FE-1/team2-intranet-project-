export class Component {
  constructor(payload = {}) {
    const { tagname = 'div', state = {}, props = {} } = payload;
    this.tagname = tagname;
    this.props = props;
    this.state = state;
    this.el = document.createElement(this.tagname);
    this.render();
  }
  // 클래스가 생성되면 render 함수를 실행하게 함으로써 다른 컴포넌트에서 render부분의 코드를 작성하게 되면 실행할 수 있게 만듬
  render() {}
}

/// Router ///
export function routeRender(routes, props = {}) {
  const routerView = document.querySelector('router-view');
  const path = location.pathname;
  // const query = location.search
  //   .substring(1)
  //   .split('&')
  //   .reduce((acc, cur) => {
  //     const [key, value] = cur.split('=');
  //     acc[key] = value;
  //     return acc;
  //   }, {});

  // history.replaceState(query, '');
  const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(path));
  routerView.innerHTML = '';
  // console.log(props);
  routerView.append(new currentRoute.component(props).el);
  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });

    document.body.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href) {
        e.preventDefault();
        history.pushState(null, null, anchor.href);
        routeRender(routes);
      }
    });

    routeRender(routes);
  };
}
