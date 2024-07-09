import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export class Layout {
  constructor(container = document.querySelector('#app'), props = {}) {
    this.container = container;
    this.props = props;
    this.isAdmin = props.isAdmin || false;
  }
  render() {
    this.container.innerHTML = /* HTML */ `
      ${new Header(null, { isAdmin: this.isAdmin }).render()}
      <route-view></route-view>
      ${new Footer().render()}
    `;
  }
}
