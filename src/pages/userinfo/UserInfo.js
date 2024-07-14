import './UserInfo.css';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { Validator } from './Validator';

import { UserInfoDTO } from './userInfoDTO';
import { EmployeeListFetch } from '../employeeListTable/EmployeeListFetch';
import defalutProfileImg from '../../assets/images/avatar-default.jpg';

import { EmployeeListTable } from '../employeeListTable/EmployeeListTable';
import Mypage from '../mypage/Mypage';

const validator = new Validator();

const isValidAndReturnMessage = {
  'user-id': (inputValue) => validator.idValidator(inputValue),
  'user-email': (inputValue) => validator.emailValidator(inputValue),
  'user-password': (inputValue) => validator.passwordValidator(inputValue),
  'user-phone': (inputValue) => validator.phoneValidator(inputValue),
};

const isValidInputState = {
  'user-id': false,
  'user-email': false,
  'user-password': false,
  'user-phone': false,
};

export default class UserInfo {
  constructor(cotainer, props = {}) {
    this.employeeListFetch = new EmployeeListFetch();
    this.validator = new Validator();
    this.btnState = false;

    const {
      dataId,
      name,
      email,
      phone,
      position,
      profileImg,
      userId,
      userPassword,
      info = '등록',
      permission = '',
    } = props;

    this.userid = userId;
    this.profileImage = profileImg || defalutProfileImg;
    this.permission = permission;
    this.info = info;
    this.state = {
      user: {
        [userId]: {
          dataId,
          id: userId,
          userPassword,
          name,
          email,
          phone,
          position,
          profileImg,
        },
      },
    };
    this.fields = [
      { id: 'user-id', key: 'id' },
      { id: 'user-password', key: 'userPassword' },
      { id: 'user-name', key: 'name' },
      { id: 'user-email', key: 'email' },
      { id: 'user-phone', key: 'phone' },
      { id: 'user-position', key: 'position' },
    ];
    this.el = cotainer;
  }
  render() {
    this.el.innerHTML = /* HTML */ `
      <form class="user-info">
        <div class="user-info__lists-wrap">
          <div class="user-info__profile"></div>
          <div class="user-info__lists">
            <h1>임직원 ${this.info}</h1>
            <ul>
              <li class="user-info__list">
                <label for="user-id">
                  <span>아이디</span>
                </label>
                <div class="user-id-input-form">
                  <input
                    required
                    type="text"
                    id="user-id"
                    name="user-id"
                    placeholder="아이디를 입력해주세요"
                  />
                  <p class="user-id__error user-info__error user-info__error-id"></p>

                  <button type="button" class="user-info__type">중복 확인</button>
                </div>
              </li>
              <li class="user-info__list">
                <label for="user-password">
                  <span>패스워드</span>
                </label>
                <div>
                  <input
                    required
                    type="password"
                    id="user-password"
                    name="user-password"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <p class="user-password__error user-info__error"></p>
                </div>
              </li>
              <li class="user-info__list">
                <label for="user-name">
                  <span>이름</span>
                </label>

                <input
                  required
                  type="text"
                  id="user-name"
                  name="user-name"
                  placeholder="이름을 입력해주세요"
                />
              </li>
              <li class="user-info__list">
                <label for="user-email">
                  <span>이메일</span>
                </label>
                <div>
                  <input
                    required
                    type="email"
                    id="user-email"
                    name="user-email"
                    placeholder="이메일을 입력해주세요"
                  />
                  <p class="user-email__error user-info__error"></p>
                </div>
              </li>
              <li class="user-info__list">
                <label for="user-phone">
                  <span>휴대폰번호</span>
                </label>
                <div>
                  <input
                    required
                    type="text"
                    id="user-phone"
                    name="user-phone"
                    placeholder="휴대폰 번호를 입력해주세요"
                  />
                  <p class="user-phone__error user-info__error"></p>
                </div>
              </li>
              <li class="user-info__list">
                <label for="user-position"> <span>직급</span></label>
                <select required id="user-position" name="user-position">
                  <option value="" selected disabled hidden>직급 선택</option>
                  <option value="부장">부장</option>
                  <option value="차장">차장</option>
                  <option value="과장">과장</option>
                  <option value="대리">대리</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        <div class="user-info-submit-delay__message">
          <h3>임직원 변경 사항 저장중..</h3>
        </div>
        <div class="user-info__btns ">
          <button type="button" class="user-info__btn--cancel">취소</button>
          <button type="sumbit" class="user-info__btn--save">저장</button>
        </div>
        <div class="user-info__btns">
          <button type="button" class="user-info__btn--cancel">취소</button>
          <button type="button" class="user-info__btn--edit">정보변경</button>
        </div>
      </form>
    `;
    // 유저정보 불러오기
    this.loadUserData();

    // 관리자 모드와 유저(직원)모드를 설정함.
    // 직원 모드 : 아이디 입력, 수정 불가
    // 관리자 모드 : 아이디 입력, 수정 가능, 아이디 증복성 체크를함.
    this.setAdminModeOrUserMode();

    // 수정밑등록 모드 와 조회 모드
    // 수정밑등록 화면에서는 유효성 검사를함.
    // 조회 모드에서는 유효성 검사를 하지 않음.
    this.setEditModeOrShowMode();

    // 수정, 조회 페이지 전환
    // 수정 모드와 조회 모드 전환
    this.toggleFormMode();

    // 버튼 핸들러 설정 적용
    //  수정, 취소 버튼 클릭 이벤트 헨들러
    this.setupButtonHandlers();

    // 프로필 이미지 컴포넌트 불러오기
    // 직원에 등록된 프로필이미지 적용하기
    this.renderProfileImage(this.profileImage);
  }

  // 유저모드, 관리자 모드 전환
  setAdminModeOrUserMode() {
    // 관리자 모드
    if (this.isAdminPage()) {
      // 아이디 입력 활성화
      // 아이디 중복성 체크 활성화
      this.btnType();
      return;
    }

    // 유저모드
    if (!this.isAdminPage()) {
      // 아이디 입력 비활성화
      this.setFormIdInputDisable();
      return;
    }
  }

  // 수정 또는 등록페이지일 때
  setEditModeOrShowMode() {
    // 유효성 검사를 함
    // submit이 가능하게함.
    if (this.isEditOrRegisterPage()) {
      // 저장 버튼 클릭 비활성화
      this.setSaveButtonElemDisable();

      // focusout 이벤트를 헨들러를 붙임.
      this.handleFocusOutEventForValidCheck();

      // 현재 화면에서 유효성을 체크함.
      this.checkIsFormAllInputsValid();

      // 폼 submit 이벤트 헨들러
      // form Submit 이벤트를 이용해서 백엔드에 직원 정보 수정, 등록 데이터를 전송함.
      this.handleFormSubmitEvent();
    }
  }

  // ID 입력 차단
  setFormIdInputDisable() {
    const userId = this.el.querySelector('#user-id');
    userId.readOnly = true;
    userId.style.border = 'none';
    const duplicateValidedButton = document.querySelector('.user-info__type');
    duplicateValidedButton.style.display = 'none';
  }

  // 관리자 페이지인지 아닌지를 체크함.
  isAdminPage() {
    return sessionStorage.getItem('admin') === 'true';
  }

  // 수정 또는 등록 페이지인지 체크를함.
  isEditOrRegisterPage() {
    return this.info === '수정' || this.info === '등록';
  }

  // 유저가 저장을 클릭하고 나서 백엔드에 데이터가 전송 되기 까지 500ms 딜레이가 있을 때
  // 저장 버튼 아래 "임직원 변경 사항 저장중.." 메시지가 뜨게함.
  showDelaySubmitMessage() {
    const delay_submit_message = document.querySelector('.user-info-submit-delay__message');
    delay_submit_message.classList.add('toggle-f');
  }

  // form Submit 이벤트 리스너
  // form 데이터를 백엔드에 전송함.
  onFormSubmit = async (event) => {
    event.preventDefault();
    const form = this.el.querySelector('.user-info');
    // 만약 폼에 입력된 값이 하나라도 유효성 검사 실패했다면
    //  submit 이벤트를 중지시킴.
    if (!this.checkIsFormAllInputsValid) return;

    // `저장 버튼` 아래 "임직원 변경 사항 저장중.." 메시지가 뜨게함.
    this.showDelaySubmitMessage();

    // SessionStorage에 변경된 직원 데이터(직원 아이디,  비밀번호, 이름, 이메일, 직급)을 저장함.
    this.saveUserDataOnSessionStorage(form);

    // 변경된 직원 데이터를 DB에 저장.
    await this.saveUserDataWhenFormSubmit(form);

    // submit 전송하고 db에 반영되기 까지 0.3초 시간을 기다린다음.
    // 유저(직원)일 경우 마이페이지로 이동하고,
    // 관리자는 유저(직원)일 경우 관리자 직원 관리 페이지로 이동함.
    setTimeout(() => this.renderEmployeeListPageOrMyPage(), 500);
  };

  // 폼 제출
  // 폼 submit 이벤트 헨들러
  // form Submit 이벤트를 이용해서 백엔드에 직원 정보 수정, 등록 데이터를 전송함.
  handleFormSubmitEvent() {
    this.el.addEventListener('submit', (event) => this.onFormSubmit(event));
  }

  // 임직원 수정 페이지를 랜더링
  // 수정 모드로 전환
  switchToEditMode() {
    this.info = '수정';
    this.render();
  }

  // 버튼 이벤트 리스너
  // 수정, 취소 버튼 클릭 이벤트 리스너
  onClickEditButtonOrShowButton = (e) => {
    // 수정 버튼을 클릭 했을 때, 현재 화면을 수정 페이지로 재랜더링.
    if (e.target.classList.contains('user-info__btn--edit')) return this.switchToEditMode();
    // 취소 버튼을 클릭 했을 때, 이전 화면으로 뒤로 가기
    if (e.target.classList.contains('user-info__btn--cancel')) return history.back();
  };

  // 버튼 헨들러
  // 수정, 취소 버튼 클릭 이벤트 헨들러
  setupButtonHandlers() {
    // editAndCancelbuttons는 수정, 취소 버튼들임.
    const editAndCancelbuttons = this.el.querySelectorAll('.user-info__btns > button');
    editAndCancelbuttons.forEach((btn) =>
      btn.addEventListener('click', this.onClickEditButtonOrShowButton),
    );
  }

  // 다른 페이지로 이동
  renderEmployeeListPageOrMyPage() {
    // 관리자일 경우 /employee-list 직원 관리페이지로 이동
    if (sessionStorage.getItem('admin') === 'true') {
      const routeView = document.querySelector('route-view');
      const employeeListTable = new EmployeeListTable(routeView, {});
      history.pushState('', '', '/employee-list');
      employeeListTable.render();
    }

    // 직원일 경우 /userinfo 직원 마이페이지로 이동
    if (sessionStorage.getItem('admin') === 'false') {
      const routeView = document.querySelector('route-view');
      const mypage = new Mypage(routeView, {});
      history.pushState('', '', '/mypage');
      mypage.render();
    }
  }

  // submit 헨들러
  //  백엔드로 유저 데이터 수정 요청 API 호출
  //  백엔드로 유저 데이터 등록 요청 API 호출
  async saveUserDataWhenFormSubmit(form) {
    const formData = new FormData(form);
    const userInfotr = Object.fromEntries(formData.entries());
    const trdataId = document.querySelector('.user-info__lists-wrap');
    const employeeListFetch = new EmployeeListFetch();
    userInfotr['data-id'] = trdataId.dataset.dataId; // 데이터 아이디 설정
    userInfotr['data-profileImg'] = document.getElementById('img1').dataset.profileImage;

    if (this.info === '수정') {
      await employeeListFetch.updateEmployee(new UserInfoDTO(userInfotr));
    } else if (this.info === '등록') {
      await employeeListFetch.addEmployee(new UserInfoDTO(userInfotr));
    }
  }
  // 유저정보 수정

  // 유저 정보를 SessionStorage에 저장
  saveUserDataOnSessionStorage(props) {
    const formData = new FormData(props); // 폼 데이터 가져오기
    this.fields.forEach(({ id, key }) => {
      const value = formData.get(id); // 폼 데이터에서 값 가져오기
      if (value !== null) {
        sessionStorage.setItem(key, value);
      }
    });
  }

  // 수정 모드와 조회 모드 전환
  toggleFormMode() {
    const sel = this.el.querySelector('#user-position');
    const [editInfoButton, saveCancelButton] = this.el.querySelectorAll('.user-info__btns');
    if (this.info === '조회') {
      const inputEl = this.el.querySelectorAll('input');
      this.el.querySelector('.user-info__type').classList.add('btnNone');
      inputEl.forEach((el) => {
        el.readOnly = true;
        el.style.border = 'none';
        sel.disabled = true;
        editInfoButton.style.display = 'none';
      });
    } else {
      saveCancelButton.style.display = 'none';
    }
  }
  // 유저 정보 불러오기
  loadUserData() {
    if (this.permission === 'user') {
      this.loadUserFromSession(this.fields);
    } else {
      this.loadUserFromProps(this.fields);
    }
  }

  // user일경우 세션스토리지에서 정보 가져오기
  loadUserFromSession() {
    sessionStorage.setItem('userPassword', 'password');
    this.state = { ...sessionStorage };
    if (this.state) {
      this.fields.forEach(({ id, key }) => {
        this.el.querySelector(`#${id}`).value = this.state[key] || '';
      });
    }
  }

  // admin일경우 props에서 정보 가져오기
  loadUserFromProps() {
    if (this.state.user && this.state.user[this.userid]) {
      const trdataId = document.querySelector('.user-info__lists-wrap');
      if (this.state.user[this.userid] === undefined) {
        console.error('dataId가 없습니다.');
      }
      trdataId.dataset.dataId = this.state.user[this.userid].dataId || '';
      this.fields.forEach(({ id, key }) => {
        this.el.querySelector(`#${id}`).value = this.state.user[this.userid][key] || '';
      });
    }
  }

  // 프로필 이미지 컴포넌트 렌더링
  renderProfileImage(profileImg) {
    const profileImage = this.el.querySelector('.user-info__profile');
    new ProfileImage(profileImage).render(profileImg);
  }

  // 유저가 폼 안에 입력한 값들을 가져옴
  // form에 유저가 입력한 데이터를 다 가져와서 객체로 리턴함
  getFormInputData = () => {
    return {
      'user-id': document.querySelector('#user-id').value,
      'user-password': document.querySelector('#user-password').value,
      'user-email': document.querySelector('#user-email').value,
      'user-phone': document.querySelector('#user-phone').value,
    };
  };

  // 처음 유저가 수정, 등록창에 들어오면, 저장 버튼을 못누르게 함
  setSaveButtonElemDisable = () => {
    const saveButtonElem = document.querySelector('.user-info__btn--save');
    saveButtonElem.disabled = true;
    saveButtonElem.classList.add('user-info__btn--disable');
  };

  // 유저가 폼에 입력을 제대로 입력했으면, 저장 버튼을 누를 수 있게함.
  setSaveButtonElemAble = () => {
    const saveButtonElem = document.querySelector('.user-info__btn--save');
    saveButtonElem.disabled = false;
    saveButtonElem.classList.remove('user-info__btn--disable');
  };

  // 유저가 form input에 대한 각각 검사를 함.
  // inputElemId: String, input 요소 id 이름
  // inputElemValue: String, input.value 값
  validCheckerFormInput = (inputElemId, inputElemValue) => {
    const returnValidMessageFunc = isValidAndReturnMessage[inputElemId];
    const validMessage = returnValidMessageFunc(inputElemValue);

    const errorcheck = document.querySelector(`.${inputElemId}__error`);
    errorcheck.innerHTML = returnValidMessageFunc(inputElemValue);

    if (validMessage === 'success') {
      errorcheck.classList.remove('-fail-red');
      errorcheck.classList.add('-success-green');
      isValidInputState[inputElemId] = true;
    }
    if (validMessage !== 'success') {
      errorcheck.classList.remove('-success-green');
      errorcheck.classList.add('-fail-red');
      isValidInputState[inputElemId] = false;
    }

    // 유저가 폼에 입력을 모두 제대로 입력했으면, 저장 버튼을 누를 수 있게함.
    if (this.isValidStateAllTrue()) {
      this.setSaveButtonElemAble();
    }
  };

  // 모든 유효성 검증에 대한 상태값들이 모두 true인지 확인.
  isValidStateAllTrue() {
    return Object.values(isValidInputState).every(Boolean);
  }

  //  focusOut 발생시 마다 제대로 입력 되었는지 체크를함
  // 아이디, 패스워드, 이메일, 핸드폰 번호에 대한 각각의 유효성 검사를함.
  // 전체 이들 모두가 유효성 검사를 통과 해야 저장 버튼이 활성화됨
  checkIsFormAllInputsValid = () => {
    const formInputDatas = this.getFormInputData();
    this.validCheckerFormInput('user-id', formInputDatas['user-id']);
    this.validCheckerFormInput('user-password', formInputDatas['user-password']);
    this.validCheckerFormInput('user-email', formInputDatas['user-email']);
    this.validCheckerFormInput('user-phone', formInputDatas['user-phone']);
    return this.isValidStateAllTrue();
  };

  // focusOut 이벤트헨들러,  발생시 마다 제대로 입력 되었는지 체크를함
  // onFocusOutEvent 함수를 form에 붙임.
  handleFocusOutEventForValidCheck = () => {
    const userformElem = document.querySelector('.user-info');
    userformElem.addEventListener('focusout', this.checkIsFormAllInputsValid);
  };

  // ID 중복 확인 함수
  async validatorIdDuplicate(employeeId) {
    return await this.employeeListFetch.getEmployeeListById(employeeId);
  }

  // 아이디 중복 확인 버튼 로직, 이벤트 헨들러
  btnType() {}
}
