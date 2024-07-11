import { EmployeeListTable } from '../employeeListTable/EmployeeListTable';
import './UserInfo.css';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { Validator } from './Validator';

import { UserInfoDTO } from './userInfoDTO';
import { EmployeeListFetch } from '../employeeListTable/EmployeeListFetch';
import { Route } from '../router/route';

export default class UserInfo {
  constructor(cotainer, props = {}) {
    this.employeeListFetch = new EmployeeListFetch();
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
    console.log(profileImg);
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
                <div>
                  <input
                    required
                    type="text"
                    id="user-id"
                    name="user-id"
                    placeholder="아이디를 입력해주세요"
                  />
                  <p class="user-info__error user-info__error-id"></p>
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
                  <p class="user-info__error"></p>
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
                  <p class="user-info__error"></p>
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
                  <p class="user-info__error"></p>
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
        <div class="user-info__btns ">
          <button type="button" class="user-info__btn--cancel">취소</button>
          <button type="sumbit" class="user-info__btn--save">저장</button>
        </div>
        <div class="user-info__btns">
          <button type="button" class="user-info__btn--edit">정보변경</button>
        </div>
      </form>
    `;
    if (this.permission === 'user') {
      this.el.querySelector('.user-info__type').classList.add('btnNone');
      this.el.querySelector('#user-id').readOnly = true;
      this.el.querySelector('.user-info__btn--cancel').addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
      });
    }

    // 해당 페이지가 관리자 권한을 가지고 접속한 관리자 페이지일경우 에만 아이디 입력화면을 렌더링한다.
    this.renderIDInputWhenUserIsAdmin();

    // 폼 제출 방지
    this.preventFormSubmission();

    // 수정, 조회 페이지 전환
    this.toggleFormMode();

    // 유저정보 불러오기
    this.loadUserData();

    // 입력값 검증
    this.setupInputValidation();

    // 프로필 이미지 컴포넌트 불러오기
    this.renderProfileImage();

    // 수정 버튼 클릭 헨들러
    // this.handleEditButton();
  }

  renderIDInputWhenUserIsAdmin() {
    if (sessionStorage.getItem('admin') === 'true') {
      this.btnType();
    } else {
      this.renderUserEditPageNotAllowIdEdit();
    }
  }

  // 관리자가 아닌 유저가 아이디를 수정하거나 입력하는 것을 막음.
  renderUserEditPageNotAllowIdEdit() {
    const userId = this.el.querySelector('#user-id');
    userId.readOnly = true;
    userId.style.border = 'none';
  }

  // 폼 제출 방지
  preventFormSubmission() {
    const form = this.el.querySelector('.user-info');
    form.addEventListener('submit', (event) => event.preventDefault());
    if (this.permission !== 'user') {
      this.anminSaveUserData(form);
    }
    this.setupButtonHandlers(form); // 버튼 핸들러 설정
  }

  // 버튼 핸들러
  setupButtonHandlers(props) {
    this.el.querySelectorAll('.user-info__btns > button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('user-info__btn--edit')) {
          this.switchToEditMode(); // 수정 모드로 전환
        } else if (e.target.classList.contains('user-info__btn--cancel')) {
          this.info === '등록' ? history.back() : this.switchToViewMode();
          //조회 모드 전환
        } else if (e.target.classList.contains('user-info__btn--save')) {
          this.saveUserData(props);
        }
      });
    });
  }

  // 서브밋 헨들러, 백엔드로 데이터 수정 요청 API 호출
  anminSaveUserData(form) {
    const onSumbit = async () => {
      const formData = new FormData(form);
      const userInfotr = Object.fromEntries(formData.entries());
      const trdataId = document.querySelector('.user-info__lists-wrap');
      const employeeListFetch = new EmployeeListFetch();
      userInfotr['data-id'] = trdataId.dataset.dataId; // 데이터 아이디 설정

      if (this.info === '수정') {
        await employeeListFetch.updateEmployee(new UserInfoDTO(userInfotr));
      } else if (this.info === '등록') {
        await employeeListFetch.addEmployee(new UserInfoDTO(userInfotr));
      }

      const pathMappings = {
        '/employee-list': { title: 'Employee List', ComponentClass: EmployeeListTable },
      };
      const routeView = document.querySelector('route-view');
      const route = new Route({ pathMappings, routeView });
      route.router({}, '/employee-list');
    };

    form.addEventListener('submit', onSumbit);
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
    this.render();
  }
  // 조회 모드로 전환
  switchToViewMode() {
    this.info = '조회';
    this.render();
  }

  // 프로필 이미지 컴포넌트 렌더링
  renderProfileImage() {
    const profileImage = this.el.querySelector('.user-info__profile');
    new ProfileImage(profileImage).render();
  }

  // 입력값 검증 설정
  setupInputValidation() {
    const validator = new Validator();
    // this.validateInput('user-id', validator.idValidator, '.user-info__error');
    this.validateInput('user-password', validator.passwordValidator, '.user-info__error');
    this.validateInput('user-email', validator.emailValidator, '.user-info__error');
    this.validateInput('user-phone', validator.phoneValidator, '.user-info__error');
  }

  async validatorIdDuplicate(employeeId) {
    return await this.employeeListFetch.getEmployeeListById(employeeId);
  }

  btnType() {
    const saveBtnType = this.el.querySelector('.user-info__type');
    const saveBtn = this.el.querySelector('.user-info__btn--save');
    const errCheck = this.el.querySelector(`
      #user-id + .user-info__error`);
    saveBtnType.addEventListener('click', async () => {
      const employeeId = document.querySelector('#user-id').value;

      if (!employeeId) {
        throw new Error('employeeId가 없습니다');
      }
      // ID 중복이 존재하는지 확인함.
      const isEmptyEmployeeId = await this.validatorIdDuplicate(employeeId);

      if (!isEmptyEmployeeId) this.btnState = false;
      else this.btnState = true;

      // this.btnState = true;
      if (this.btnState) {
        // ID 중복이 아닐 경우
        errCheck.textContent = '사용 가능한 아이디입니다.';
        saveBtn.classList.remove('user-info__btn--disable');
        saveBtn.disabled = false;
        this.renderValidationID(employeeId);
      } else {
        // ID 중복일 경우
        errCheck.textContent = '이미 존재하는 아이디입니다.';
        saveBtn.classList.add('user-info__btn--disable');
        saveBtn.disabled = true;
      }
    });
  }

  renderValidationID(employeeId) {
    const validator = new Validator();
    const waringId = document.querySelector('.user-info__error-id');
    waringId.innerHTML = validator.idValidator(employeeId);
  }

  // 입력값 검증 함수
  // 아이디를 제외한 (비밀번호, 이름, 이메일, 휴대폰 번호) 입력값 검증 로직
  validateInput(id, fn, err) {
    const idCheck = this.el.querySelector(`#${id}`);
    const errCheck = this.el.querySelector(`
      #${id} + ${err}`);
    const saveBtn = this.el.querySelector('.user-info__btn--save');

    idCheck.addEventListener('change', () => {
      const errorMsg = fn(idCheck.value);
      errCheck.textContent = errorMsg;
      if (errorMsg !== 'success') {
        saveBtn.classList.add('user-info__btn--disable');
        saveBtn.disabled = true;
      } else {
        saveBtn.classList.add('user-info__btn--disable');
        saveBtn.disabled = true;
      }
    });
  }
}
