import './AttendanceList.css';
import { AttendanceListItems } from './AttendanceListItems.js';
import avatarDefaultImg from '../../assets/images/avatar-default.jpg';

export class AttendanceList {
  constructor(container, props) {
    this.container = container;
    this.defaultProfileImg = avatarDefaultImg;
    this.props = props;
    this.attendanceListItems = new AttendanceListItems();
  }

  render() {
    const container = this.container || document.querySelector('.attendanceList');
    container.innerHTML = /* HTML */ `
      <section class="attendance-list">
        <header class="attendance-list__header">
          <h1>근태현황</h1>
          <a href='/leave-application-list' data-link><span>근태현황</span></span>바로가기</span></a>
        </header>
        <ul class="attendance-items scroll"></ul>
      </section>
    `;
    this.attendanceListItems.render();
  }

  setListItemsNumbers(number) {
    this.attendanceListItems.setListItemsNumbers(number);
  }
}
