import './AttendanceList.css';
import { AttendanceListItems } from './AttendanceListItems.js';

export class AttendanceList {
  constructor({ cid = '#content', ...props }) {
    this.container = document.querySelector(`${cid}`);
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
    const attendanceListItems = new AttendanceListItems({ cid: '.attendance-items' });
    attendanceListItems.render();
  }
}
