export default class Home {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }

  render() {
    this.container.innerHTML = `
      <div class='main'>메인</div>
    `;
  }
}
