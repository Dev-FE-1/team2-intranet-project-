import LeaveApplicationForm from './LeaveApplicationForm';
import './LeaveApplicationForm.css';
import './LeaveApplicationList.css';
import '../attendanceList/AttendanceList.css';
import { AttendanceListItems } from '../attendanceList/AttendanceListItems';

export default class LeaveApplicationList {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  setAddEventListener() {
    const modalBackground = document.querySelector('.modal-background');
    const modal = document.querySelector('.modal');
    const btnApply = document.querySelector('.btn-apply');
    const leaveApplicationForm = new LeaveApplicationForm();
    modalBackground.style.display = 'none';
    btnApply.addEventListener('click', () => {
      //   this.renderApplicationForm();
      modal.innerHTML = leaveApplicationForm.render();
      modalBackground.style.display = 'block';
      console.log('모달창으로 입력폼이 팝업된다');
    });
  }
  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="leave-application-wrap">
        <header class="leave-application">
          <h1 class="leave-application__heading">근태신청 목록</h1>

          <button class="btn-apply">휴가신청하기</button>
          <div class="leave-type">
            <select>
              <option value="" selected disabled hidden>휴가신청타입</option>
              <option value="annual-leave">연차</option>
              <option value="half-dayoff">반차</option>
              <option value="sick-leave">조퇴</option>
              <option value="others">기타</option>
            </select>
          </div>
        </header>
        <div><ul class="attendance-items"></ul></div>
      </section>
      <div class="modal-background">
        <div class="modal"></div>
      </div>
    `;
    this.setAddEventListener();
    this.updateAttendanceList();
  }
  renderApplicationForm() {}
  updateAttendanceList() {
    const attendanceListItems = new AttendanceListItems();
    attendanceListItems.render();
  }
}
