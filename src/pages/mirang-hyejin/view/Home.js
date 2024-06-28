import Header from '../header/Header';

export default class Home {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }

  render() {
    const header = new Header();
    this.container.innerHTML = `
      ${header.render()}
      <div class='main'>메인</div>
    `;
    return this.container.innerHTML;
  }
}
