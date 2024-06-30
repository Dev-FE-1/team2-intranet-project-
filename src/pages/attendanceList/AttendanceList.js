import './AttendanceList.css';
import { AttendanceListItems } from './AttendanceListItems.js';

export class AttendanceList {
  constructor(container, props) {
    this.container = container;
    this.defaultProfileImg = 'https://i.imgur.com/JJEqrWE.png';
    this.props = props;
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="attendance-list">
        <header class="attendance-list__header">
          <h1>Attendance State</h1>
          <button>근태현황 바로가기</button>
        </header>
        <ul class="attendance-items"></ul>
      </section>
    `;
    this.updateAttendanceList();
    return this.container.innerHTML;
  }

  updateAttendanceList() {
    const attendanceListItems = new AttendanceListItems();
    attendanceListItems.render();
  }
}
