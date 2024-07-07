import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export class Layout {
  constructor(container = document.querySelector('#app'), props = {}) {
    this.container = container;
    this.props = props;
    this.userType = props.userType;
  }
  render() {
    this.container.innerHTML = /* HTML */ `
      ${new Header(null, { userType: this.userType }).render()}
      <route-view></route-view>
      ${new Footer().render()}
    `;
  }
}
