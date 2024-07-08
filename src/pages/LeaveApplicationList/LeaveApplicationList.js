import LeaveApplicationItem from './LeaveApplicationItem';
import LeaveApplicationForm from './LeaveApplicationForm';
import './LeaveApplicationForm.css';
import './LeaveApplicationList.css';

import { attendancesUserData, currentUser } from './dummyData';

export default class LeaveApplicationList {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.attendancesUserData = [...attendancesUserData]; // 근태신청 데이터를 클래스 변수에 저장
    this.currentUser = { ...currentUser }; // 현재 사용자 정보를 클래스 변수에 저장
    this.leaveApplicationForm = new LeaveApplicationForm('div', this.currentUser); // 모달창에 렌더링할 폼 컴포넌트
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="leave-application-wrap">
        <header class="leave-application">
          <h1 class="leave-application__heading">근태신청</h1>
        </header>
        <div class="heading-events">
          <div>
            <button class="btn-apply">휴가 신청하기</button>
            <button class="btn-show-onlyMe">내 신청서만 보기</button>
          </div>
          <div class="leave-type">
            <select>
              <option value="" selected disabled hidden>휴가 신청타입</option>
              <option value="annual-leave">연차</option>
              <option value="half-dayoff">반차</option>
              <option value="sick-leave">조퇴</option>
              <option value="others">기타</option>
            </select>
          </div>
        </div>
        <div class="leave-application-list"><ul class="leave-application-items"></ul></div>
      </section>
      <div class="modal-background">
        <button class="btn-close"></button>
        <div class="modal"></div>
      </div>
    `;
    this.renderLeaveItems(this.attendancesUserData);
    this.attachEventListeners();
    this.initializeModal();
  }

  // 근태신청 목록을 렌더링하는 메서드
  renderLeaveItems(attendancesUserData) {
    const leaveItemsListElem = document.querySelector('.leave-application-items');
    leaveItemsListElem.innerHTML = '';
    const leaveApplicationItem = new LeaveApplicationItem();
    leaveItemsListElem.innerHTML = attendancesUserData
      .map((item) => {
        return leaveApplicationItem.renderLeaveItem(item);
      })
      .join('');
  }

  // 모달 기본 초기화: 안보이게함, 모달 닫기 버튼 이벤트 추가
  initializeModal() {
    const modalBackground = document.querySelector('.modal-background');
    modalBackground.style.display = 'none';

    // 모달 컴포넌트의 닫기버튼(X) 클릭하면
    const btnClose = document.querySelector('.btn-close');
    btnClose.addEventListener('click', () => {
      modalBackground.style.display = 'none';
    });
  }

  // 신청서 목록을 클릭 헨들러, 내 신청서들만 보여주게함.
  handleClickMyApplyRequestButton() {
    const btnShowOnlyMe = document.querySelector('.btn-show-onlyMe');
    btnShowOnlyMe.addEventListener('click', () => {
      this.filterMyApplications();
    });
  }

  // 신청 버튼 클릭 이벤트 헨들러, 폼 데이터를 받아서 신청서 목록에 추가하는 메서드
  handleClickApplyButton() {
    const modal = document.querySelector('.modal');
    const modalBackground = document.querySelector('.modal-background');

    const onSubmit = (formData) => {
      this.handleFormSubmit(formData);
      modalBackground.style.display = 'none';
    };

    const onClose = () => {
      modalBackground.style.display = 'none';
    };

    const onClickApplyButton = (e) => {
      if (e.target.classList.contains('btn-apply')) {
        modal.innerHTML = this.leaveApplicationForm.render();
        modalBackground.style.display = 'block';

        // leaveApplicationForm(자식)의 setAddEventListener 실행시,
        // LeaveApplicationList(부모)로부터 내려보낼 콜백함수2개(onSubmit, onClose)를 작성
        // onSubmit에 필요한 파라미터(formData) 같이 내려보냄
        this.leaveApplicationForm.attachEventListeners(onSubmit, onClose);
      }
    };
    document.querySelector('.btn-apply').addEventListener('click', onClickApplyButton);
  }

  // 수정 버튼 클릭 이벤트 핸들러
  handleClickEditButton() {
    const onClickEditButton = (e) => {
      if (e.target.classList.contains('btn-edit')) {
        const itemId = e.target.dataset.id;
        console.log('edit button clicked', itemId);
      }
    };
    const leaveApplicationItems = document.querySelector('.leave-application-items');
    leaveApplicationItems.addEventListener('click', onClickEditButton);
  }

  // 삭제 버튼 클릭 이벤트 핸들러
  handleDeleteButton() {
    const onClickDeleteButton = (e) => {
      if (e.target.classList.contains('btn-delete')) {
        const itemId = e.target.dataset.id;
        console.log('delete button clicked', itemId);
      }
    };
    const leaveApplicationItems = document.querySelector('.leave-application-items');
    leaveApplicationItems.addEventListener('click', onClickDeleteButton);
  }

  // 모달창 폼 submit 이벤트 핸들러, 폼 데이터를 받아서 신청서 목록에 추가하는 메서드
  handleFormSubmit(formDataDTO) {
    const newItem = formDataDTO;
    this.attendancesUserData.push(newItem);
    // 모달 닫기
    document.querySelector('.modal-background').style.display = 'none';

    // 신청서 목록에 추가
    this.renderLeaveItems(this.attendancesUserData);
  }

  // 이벤트 리스너를 추가하는 메서드
  attachEventListeners() {
    this.handleClickEditButton();
    this.handleDeleteButton();
    this.handleClickApplyButton();
    this.handleClickMyApplyRequestButton();
  }
}
