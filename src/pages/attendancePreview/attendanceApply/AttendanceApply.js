// import './attendanceApply.css';

export class AttendanceApply {
  constructor({ cid = '#content', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.defaultProfileImg = 'https://i.imgur.com/JJEqrWE.png';
    this.props = props;
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="attendance-list">
        <header class="attendance-list__header">
          <h1>근태 신청</h1>
        </header>
        <ul class="attendance-items"></ul>
      </section>
    `;
  }
}
