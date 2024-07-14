import './UserInfo.css';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { Validator } from './Validator';

import { UserInfoDTO } from './userInfoDTO';
import { EmployeeListFetch } from '../employeeListTable/EmployeeListFetch';
import defalutProfileImg from '../../assets/images/avatar-default.jpg';

import { EmployeeListTable } from '../employeeListTable/EmployeeListTable';
import Mypage from '../mypage/Mypage';
// const routeView = document.querySelector('route-view');

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

    // 해당 페이지가 관리자 권한을 가지고 있을 경우 아이디를 입력할 수 있고
    // 입력 페이지에서만 아이디를 수정 할 수 있음.
    this.renderUserEditPageNotAllowIdEdit();

    // 폼 제출 방지
    this.preventFormSubmission();

    // 수정, 조회 페이지 전환
    this.toggleFormMode();

    // 유저정보 불러오기
    this.loadUserData();

    // 입력값 검증
    // this.setupInputValidation();

    // 프로필 이미지 컴포넌트 불러오기
    const profileImg = this.profileImage;
    this.renderProfileImage(profileImg);

    this.setSaveButtonElemDisable();
    // 수정 버튼 클릭 헨들러
    // this.handleEditButton();

    // // 처음 유저가 들어왔을 때
    // // 모든 입력 값이  적절하면 저장을 누를 수 있다.
    // this.onFocusOutEventvalidCheckerFormInput();

    this.handleFocusOutEventForFormValidCheck();
    // 페이지가 임직원 '조회' 페이지일 경우 이미지 변경 불가.
    if (this.info === '조회') {
      document.querySelector('.profile__btn-edit').style.display = 'none';
      return;
    }

    if (this.info === '수정') {
      // 처음 유저가 수정, 등록창에 들어오면, 저장 버튼을 못누르게 함
      this.onFocusOutEventvalidCheckerFormInput();
      // 폼에서 유저가 무언가를 입력하고 이동하거나 탭으로 이동할 때마다
      // 유저의 입력값에 대한 유효성읋 검사함.
      this.handleFocusOutEventForFormValidCheck();

      return;
    }

    if (this.info === '등록') {
      // 처음 유저가 수정, 등록창에 들어오면, 저장 버튼을 못누르게 함
      this.onFocusOutEventvalidCheckerFormInput();
      // 폼에서 유저가 무언가를 입력하고 이동하거나 탭으로 이동할 때마다
      // 유저의 입력값에 대한 유효성읋 검사함.
      this.handleFocusOutEventForFormValidCheck();
      this.renderUserEditPageNotAllowIdEdit();
      return;
    }
  }

  // 관리자가 아닌 유저가 아이디를 수정하거나 입력하는 것을 막음.
  renderUserEditPageNotAllowIdEdit() {
    // 관리자 페이지에서만 등록 버튼을 누를 경우 아이디 중복 확인을 함.
    const isAdmin = sessionStorage.getItem('admin') === 'true';
    if (isAdmin) {
      if (this.info === '수정' && this.info === '등록') {
        // 아이디 중복 검사
        this.checkIdDuplicated();
      }
    } else if (isAdmin === false) {
      const userId = this.el.querySelector('#user-id');
      userId.readOnly = true;
      userId.style.border = 'none';
      const duplicateValidedButton = document.querySelector('.user-info__type');
      duplicateValidedButton.style.display = 'none';
    }
  }

  // 폼 제출
  preventFormSubmission() {
    const form = this.el.querySelector('.user-info');
    this.setupButtonHandlers(form); // 버튼 핸들러 설정
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.handleFocusOutEventForFormValidCheck();
      const IsFormInputAllValid = Object.values(isValidInputState).every(Boolean);
      if (IsFormInputAllValid) {
        const delay__message = document.querySelector('.user-info-submit-delay__message');
        delay__message.classList.add('toggle-f');
        setTimeout(async () => {
          this.saveUserData(form);
          await this.saveUserDataWhenFormSubmit(form);
        }, 500);
      }
    });

    // if (this.permission !== 'user') {
  }

  // 버튼 핸들러
  setupButtonHandlers() {
    this.el.querySelectorAll('.user-info__btns > button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // 수정 버튼을 클릭 했을 때
        if (e.target.classList.contains('user-info__btn--edit')) {
          this.switchToEditMode(); // 수정 모드로 전환
          return;
        }

        // 취소 버튼을 클릭 했을 때
        if (e.target.classList.contains('user-info__btn--cancel')) {
          // 해당 페이지가 등록 화면이면 취소 버튼을 누르면, 관리자 화면이므로, 관리자 홈으로 이동

          if (this.info === '조회') {
            return history.back();
          }
          if (this.info === '등록') {
            return history.back();
          }
          // 해당 페이지가 수정 화면이면, 뒤로 가기를 함
          if (this.info === '수정') return history.back();
        }
      });
    });
  }

  // 다른 페이지로 이동
  renderAnotherPage() {
    const routeView = document.querySelector('route-view');
    const employeeListTable = new EmployeeListTable(routeView, {});
    const mypage = new Mypage(routeView, {});
    // 관리자일 경우에만 employee-list로 이동
    if (sessionStorage.getItem('admin') === 'true') {
      history.pushState('', '', '/employee-list');
      routeView.innerHTML = '';
      employeeListTable.render();
      // 관리자가 아닐 경우에는 mypage로 이동
    } else {
      history.back();
      // history.pushState('', '', '/mypage');
      routeView.innerHTML = '';
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
    this.renderAnotherPage();
  }
  // 유저정보 수정

  saveUserData(props) {
    const formData = new FormData(props); // 폼 데이터 가져오기

    this.fields.forEach(({ id, key }) => {
      const value = formData.get(id); // 폼 데이터에서 값 가져오기
      if (value !== null) {
        sessionStorage.setItem(key, value);
      }
    });
    history.back();
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
  // 수정 모드로 전환
  switchToEditMode() {
    this.info = '수정';
    // 처음 유저가 수정, 등록창에 들어오면, 저장 버튼을 못누르게 함

    // 폼에서 유저가 무언가를 입력하고 이동하거나 탭으로 이동할 때마다
    // 유저의 입력값에 대한 유효성읋 검사함.
    this.checkIdDuplicated();
    this.render();
  }
  // 조회 모드로 전환
  switchToViewMode() {
    this.info = '조회';
    this.render();
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

    const IsFormInputAllValid = Object.values(isValidInputState).every(Boolean);

    // 유저가 폼에 입력을 모두 제대로 입력했으면, 저장 버튼을 누를 수 있게함.
    if (IsFormInputAllValid) {
      this.setSaveButtonElemAble();
    }
  };

  //  focusOut 발생시 마다 제대로 입력 되었는지 체크를함
  // 아이디, 패스워드, 이메일, 핸드폰 번호에 대한 각각의 유효성 검사를함.
  // 전체 이들 모두가 유효성 검사를 통과 해야 저장 버튼이 활성화됨
  onFocusOutEventvalidCheckerFormInput = () => {
    const formInputDatas = this.getFormInputData();
    this.validCheckerFormInput('user-id', formInputDatas['user-id']);
    this.validCheckerFormInput('user-password', formInputDatas['user-password']);
    this.validCheckerFormInput('user-email', formInputDatas['user-email']);
    this.validCheckerFormInput('user-phone', formInputDatas['user-phone']);
  };

  // focusOut 이벤트헨들러,  발생시 마다 제대로 입력 되었는지 체크를함
  // onFocusOutEvent 함수를 form에 붙임.
  handleFocusOutEventForFormValidCheck = () => {
    const userformElem = document.querySelector('.user-info');
    userformElem.addEventListener('focusout', this.onFocusOutEventvalidCheckerFormInput);
  };

  // ID 중복 확인 함수
  async validatorIdDuplicate(employeeId) {
    return await this.employeeListFetch.getEmployeeListById(employeeId);
  }

  // 아이디 중복 확인 버튼 로직, 이벤트 헨들러
  checkIdDuplicated() {
    const saveBtnType = this.el.querySelector('.user-info__type');
    const errCheck = this.el.querySelector(`.user-id__error`);
    saveBtnType.addEventListener('click', async () => {
      const employeeId = document.querySelector('#user-id').value;

      if (!employeeId) {
        console.error(`employeeId가 없습니다.`);
      }

      // ID가 중복인지 아닌지를 확인함.
      const isDuplicated = await this.validatorIdDuplicate(employeeId);

      // 중복이 아니라면 사용가능한 아이디라는 메시지를 출력함.
      if (isDuplicated === false) {
        errCheck.textContent = '사용 가능한 아이디입니다.';
      }

      // 중복이라면 사용불가능한 아이디라는 메시지를 출력함.
      if (isDuplicated) {
        errCheck.textContent = '이미 존재하는 아이디입니다.';
      }
    });
  }
}
