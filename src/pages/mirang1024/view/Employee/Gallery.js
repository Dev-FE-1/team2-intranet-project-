import EmployeeHeader from '../header/EmployeeHeader';
import Footer from '../footer/Footer';
import EmployeeGallery from '../gallery/EmployeeGallery';

export default class Gallery {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }

  render() {
    const employeeHeader = new EmployeeHeader();
    const employeeGallery = new EmployeeGallery();
    const footer = new Footer();
    this.container.innerHTML = `
      ${employeeHeader.render()}
      <div class='main'>
        ${employeeGallery.render()}
      </div>
      ${footer.render()}
    `;
    return this.container.innerHTML;
  }
}
