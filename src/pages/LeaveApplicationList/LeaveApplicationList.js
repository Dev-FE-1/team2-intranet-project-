import LeaveApplicationItem from './LeaveApplicationItem';
import LeaveApplicationForm from './LeaveApplicationForm';
import './LeaveApplicationForm.css';
import './LeaveApplicationList.css';

export default class LeaveApplicationList {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.items = [];
  }
  setAddEventListener() {
    const modalBackground = document.querySelector('.modal-background');
    const modal = document.querySelector('.modal');
    const btnApply = document.querySelector('.btn-apply');

    const leaveApplicationForm = new LeaveApplicationForm();
    // 모달 기본 초기화: 안보이게
    modalBackground.style.display = 'none';

    // 휴가신청하기 버튼 누르면,
    btnApply.addEventListener('click', () => {
      modal.innerHTML = leaveApplicationForm.render();
      modalBackground.style.display = 'block';
      console.log('모달창으로 입력폼이 팝업된다');

      // 신청하기 버튼 이벤트 리스너 설정
      leaveApplicationForm.setAddEventListener((formData) => {
        this.handleFormSubmit(formData);
      });
    });

    const btnClose = document.querySelector('.btn-close');
    btnClose.addEventListener('click', () => {
      console.log('뒤로가기 버튼 클릭됨');
      // 각 input 비워진 후

      // 모달 닫힌다
      modalBackground.style.display = 'none';
    });
  }
  handleFormSubmit(formData) {
    console.log('Form submitted:', formData);
    // 여기에 formData를 처리하는 로직 추가

    // 🌱 새로운 컴포넌트를 만들어서 한줄씩 그려준다
    // LeaveApplicationItem 생성
    const leaveApplicationItem = new LeaveApplicationItem(formData);
    this.items.push(leaveApplicationItem);

    // 목록에 추가
    const attendanceItems = document.querySelector('.attendance-items');
    attendanceItems.innerHTML = this.items.map((item) => item.render()).join('');

    // 모달 닫기
    document.querySelector('.modal-background').style.display = 'none';
  }
  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="leave-application-wrap">
        <header class="leave-application">
          <h1 class="leave-application__heading">근태신청 목록</h1>

          <div class="heading-events">
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
          </div>
        </header>
        <div><ul class="attendance-items"></ul></div>
      </section>
      <div class="modal-background">
        <button class="btn-close"></button>
        <div class="modal"></div>
      </div>
    `;
    this.setAddEventListener();
  }
}
