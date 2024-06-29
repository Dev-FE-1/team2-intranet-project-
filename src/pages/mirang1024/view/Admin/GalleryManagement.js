import AdminHeader from '../header/AdminHeader';
import Footer from '../footer/Footer';
import AdminGallery from '../gallery/AdminGallery';

export default class Gallery {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }

  render() {
    const adminHeader = new AdminHeader();
    const adminGallery = new AdminGallery();
    const footer = new Footer();
    this.container.innerHTML = `
      ${adminHeader.render()}
      <div class='main'>
        ${adminGallery.render()}
      </div>
      ${footer.render()}
    `;
    return this.container.innerHTML;
  }
}
