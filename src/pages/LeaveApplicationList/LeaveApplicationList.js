import LeaveApplicationItem from './LeaveApplicationItem';
import LeaveApplicationForm from './LeaveApplicationForm';
import './LeaveApplicationForm.css';
import './LeaveApplicationList.css';
import lodash from 'lodash';

import { attendancesUserData, currentUser, attendanceType } from './dummyData';
import { FormDataDTO } from './FormDataDTO';
import { LeaveAppplicationFetch } from './LeaveApplicationFetch';

import './LeaveAppplicationToggle.css';

export default class LeaveApplicationList {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.attendancesUserData = [...attendancesUserData]; // 근태신청 데이터를 클래스 변수에 저장
    this.currentUser = { ...currentUser }; // 현재 사용자 정보를 클래스 변수에 저장
    this.leaveApplicationForm = new LeaveApplicationForm('div', this.currentUser); // 모달창에 렌더링할 폼 컴포넌트
    this.isMyFiltered = false;
    this.leaveApplicationFetch = new LeaveAppplicationFetch({});
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="leave-application-wrap">
        <header class="leave-application">
          <h1 class="leave-application__heading">근태신청</h1>
        </header>
        <div class="heading-events">
          <div class="w-heading-events">
            <div class="myApplication-toggle" id="myApplicationList-container">
              <div class="myApplicationList-inner-container">
                <div class="myApplicationList-toggle btn-show-onlyMe">
                  <p>내 신청 목록</p>
                </div>
                <div class="myApplicationList-toggle btn-show-all">
                  <p>전체 신청 목록</p>
                </div>
              </div>
              <div
                class="myApplicationList-inner-container"
                id="myApplicationList-toggle-container"
              >
                <div class="myApplicationList-toggle btn-show-onlyMe">
                  <p>내 신청 목록</p>
                </div>
                <div class="myApplicationList-toggle btn-show-all">
                  <p>전체 신청 목록</p>
                </div>
              </div>
            </div>
          </div>

          <button class="btn-apply">휴가 신청하기</button>
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
    // this.renderLeaveItems(this.attendancesUserData);
    this.updateLeaveItemsByGetFetch();
    this.attachEventListeners();
    this.initializeModal();
    this.buttonToggle();
  }

  // 근태신청 목록을 서버에서 가져와서 렌더링하는 메서드
  async updateLeaveItemsByGetFetch() {
    this.attendancesUserData = await this.leaveApplicationFetch.getLeaveApplication();
    this.renderLeaveItems(this.attendancesUserData);
  }

  buttonToggle() {
    const myApplicationListToggle = document.getElementById('myApplicationList-container');
    const myApplicationListToggleContainer = document.getElementById(
      'myApplicationList-toggle-container',
    );
    let toggleState = false;

    const onToggle = (e) => {
      toggleState = !toggleState;
      e.preventDefault();
      if (toggleState) {
        myApplicationListToggleContainer.style.clipPath = 'inset(0 0 0 50%)';
        myApplicationListToggleContainer.style.backgroundColor = 'var(--color-vivid-red)';
        this.isMyFiltered = true;
        this.renderfilteredMyApplications(this.attendancesUserData);
      } else {
        myApplicationListToggleContainer.style.clipPath = 'inset(0 50% 0 0)';
        myApplicationListToggleContainer.style.backgroundColor = 'var(--color-teal-grean)';
        this.isMyFiltered = false;
        this.renderLeaveItems(this.attendancesUserData);
      }
      console.log(toggleState);
    };
    myApplicationListToggle.addEventListener('click', onToggle);
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

  // 내 신청서만 필터링함
  filterMyApplications(leaveItems) {
    return leaveItems.filter((item) => item.userId === this.currentUser.id);
  }

  // 내 신청서만 렌더링함
  renderfilteredMyApplications(attendancesUserData) {
    const myApplications = this.filterMyApplications(attendancesUserData);
    this.renderLeaveItems(myApplications);
  }

  // 신청서 목록을 클릭 헨들러, 내 신청서들만 보여주게함.
  handleClickMyFillterButton() {
    const onClickMyFillterButton = (e) => {
      const myButton = e.target.closest('div');
      if (myButton.classList.contains('btn-show-onlyMe')) {
        // e.preventDefault();
        this.isMyFiltered = true;
        this.renderfilteredMyApplications(this.attendancesUserData);
      }
    };

    this.container.addEventListener('click', onClickMyFillterButton);
  }

  // 신청 버튼 클릭 이벤트 헨들러, 폼 데이터를 받아서 신청서 목록에 추가하는 메서드
  handleClickApplyButton() {
    const btnApply = document.querySelector('.btn-apply');
    this.attachModalEventListeners({ buttonElement: btnApply });
  }

  // 신청 버튼 클릭 모달창 이벤트 리스너 추가
  attachModalEventListeners({ buttonElement }) {
    const modal = document.querySelector('.modal');
    const modalBackground = document.querySelector('.modal-background');

    const onSubmit = (formData) => {
      if (!lodash.isEmpty(formData)) {
        this.handleFormSubmit(formData);
        this.leaveApplicationFetch.fetchCreateLeaveApplication(formData);
      }
      modalBackground.style.display = 'none';
    };

    const onClose = () => {
      modalBackground.style.display = 'none';
    };

    const onClickButton = (e) => {
      e.preventDefault();
      modal.innerHTML = this.leaveApplicationForm.render();
      modalBackground.style.display = 'block';

      this.leaveApplicationForm.attachEventListeners(onSubmit, onClose);
    };

    buttonElement.addEventListener('click', onClickButton);
  }

  // 수정 버튼 클릭 이벤트 핸들러
  handleClickEditButton() {
    const modal = document.querySelector('.modal');
    const modalBackground = document.querySelector('.modal-background');

    const onSubmit = (formData) => {
      if (!lodash.isEmpty(formData)) {
        // formData.id = parseInt(formData.id);
        this.handleFormEditSubmit(formData);
      }
      modalBackground.style.display = 'none';
    };

    const onClose = () => {
      modalBackground.style.display = 'none';
    };

    const onClickEditButton = (e) => {
      if (!e.target.classList.contains('btn-edit')) return;
      e.preventDefault();
      const dataId = e.target.closest('li').dataset.id;
      modal.innerHTML = this.leaveApplicationForm.render(dataId);
      modalBackground.style.display = 'block';

      const formdata = this.attendancesUserData.find(
        (item) => parseInt(item.id) === parseInt(e.target.dataset.id),
      );
      this.leaveApplicationForm.loadFormData(new FormDataDTO(formdata));
      this.leaveApplicationForm.attachEventListeners(onSubmit, onClose);
    };

    const leaveApplicationItems = document.querySelector('.leave-application-items');
    leaveApplicationItems.addEventListener('click', onClickEditButton);
  }

  // 삭제 버튼 클릭 시, 삭제된 아이템을 필터링하는 메서드
  filterDeletedItem(attendancesUserData, itemId) {
    return attendancesUserData.filter((item) => parseInt(item.id) !== parseInt(itemId));
  }

  // 삭제 버튼 클릭 이벤트 핸들러
  handleDeleteButton() {
    const onClickDeleteButton = (e) => {
      if (e.target.classList.contains('btn-delete')) {
        const itemId = e.target.dataset.id;
        this.leaveApplicationFetch.fetchDeleteLeaveApplication(itemId);
        const attendancesUserData = this.filterDeletedItem(this.attendancesUserData, itemId);
        this.attendancesUserData = [...attendancesUserData];
        e.target.parentElement.parentElement.classList.add('deletingLeave');
        setTimeout(() => {
          e.target.parentElement.parentElement.style.display = 'none';
        }, 500);

        // if (this.isMyFiltered) {
        //   this.renderfilteredMyApplications(attendancesUserData);
        // } else {
        //   this.renderLeaveItems(attendancesUserData);
        // }
      }
    };
    const leaveApplicationItems = document.querySelector('.leave-application-items');
    leaveApplicationItems.addEventListener('click', onClickDeleteButton);
  }

  // 모달창 폼 submit 이벤트 핸들러, 폼 데이터를 받아서 신청서 목록에 추가하는 메서드
  handleFormSubmit(formDataDTO) {
    if (!lodash.isEmpty(formDataDTO)) {
      this.attendancesUserData = [formDataDTO, ...this.attendancesUserData];
    }
    // 모달 닫기
    document.querySelector('.modal-background').style.display = 'none';

    // 내 신청서만 보기 필터링이 켜져있으면, 내 신청서만 보여주기
    if (this.isMyFiltered) {
      this.renderfilteredMyApplications(this.attendancesUserData);
    } else {
      this.renderLeaveItems(this.attendancesUserData);
    }
  }

  // 수정 모달창 submit  이벤트 헨들러, 폼 데이터를 반아서 신청 목록을 수정하는 메서드
  handleFormEditSubmit(formDataDTO) {
    this.leaveApplicationFetch.fetchUpdateLeaveApplication(formDataDTO);
    // this.attendancesUserData = [formDataDTO, ...this.attendancesUserData];
    this.attendancesUserData = this.attendancesUserData.map((item) => {
      if (parseInt(item.id) === parseInt(formDataDTO.id)) {
        return formDataDTO;
      }
      return item;
    });
    // 모달 닫기
    document.querySelector('.modal-background').style.display = 'none';

    // 내 신청서만 보기 필터링이 켜져있으면, 내 신청서만 보여주기
    if (this.isMyFiltered) {
      this.renderfilteredMyApplications(this.attendancesUserData);
    } else {
      this.renderLeaveItems(this.attendancesUserData);
    }
  }

  handleClickLeaveTypeFilterButton() {
    const leaveTypeFilter = document.querySelector('.leave-type select');

    const onChange = (e) => {
      const selectedAttendanceType = attendanceType[e.target.value];

      const filteredAttendancesUserData = this.filterAttendanceType(
        this.attendancesUserData,
        selectedAttendanceType,
      );

      if (this.isMyFiltered) {
        this.renderfilteredMyApplications(filteredAttendancesUserData);
      } else {
        this.renderLeaveItems(filteredAttendancesUserData);
      }
    };
    leaveTypeFilter.addEventListener('change', onChange);
  }

  filterAttendanceType(attendancesUserData, selectedAttendanceType) {
    return attendancesUserData.filter((item) => item.attendanceType === selectedAttendanceType);
  }

  // 이벤트 리스너를 추가하는 메서드
  attachEventListeners() {
    this.handleClickEditButton();
    this.handleDeleteButton();
    this.handleClickApplyButton();
    this.handleClickLeaveTypeFilterButton();
    // this.handleClickMyFillterButton();
  }
}
