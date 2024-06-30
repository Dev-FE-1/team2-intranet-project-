import './UserInfo.css';
import { Validator } from './Validator';

export default class UserInfo {
  constructor(props = {}) {
    const { userId = '4567', info = '조회', permission = '' } = props;
    this.userid = userId;
    this.info = this.reinfo(info);
    this.permission = permission;
    this.state = {};
    this.el = document.createElement('form');
    this.init();
  }
  async init() {
    await this.fetchUser();
    this.render();
  }

  render() {
    // 헤더부분 변경된곳
    this.el.classList.add('user-info');
    this.el.innerHTML =
      /* HTML */
      `
        <div class="user-info__lists">
          <h1>임직원 정보${this.info}</h1>
          <ul>
            <li class="user-info__list">
              <label for="user-id">
                <span>아이디</span>
              </label>
              <input type="text" id="user-id" name="user-id" placeholder="아이디를 입력해주세요" />
              <p class="user-info__error"></p>
            </li>
            <li class="user-info__list">
              <label for="user-password">
                <span>패스워드</span>
              </label>
              <input
                type="password"
                id="user-password"
                name="user-password"
                placeholder="비밀번호를 입력해주세요"
              />
              <p class="user-info__error"></p>
            </li>
            <li class="user-info__list">
              <label for="user-name">
                <span>이름</span>
              </label>
              <input
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
              <input
                type="email"
                id="user-email"
                name="user-email"
                placeholder="이메일을 입력해주세요"
              />
              <p class="user-info__error"></p>
            </li>
            <li class="user-info__list">
              <label for="user-phone">
                <span>휴대폰번호</span>
              </label>
              <input
                type="text"
                id="user-phone"
                name="user-phone"
                placeholder="휴대폰 번호를 입력해주세요"
              />
              <p class="user-info__error"></p>
            </li>
            <li class="user-info__list">
              <label for="user-position"> <span>직급</span></label>
              <select id="user-position" name="user-position">
                <option value="부장">부장</option>
                <option value="차장">차장</option>
                <option value="과장">과장</option>
                <option value="대리">대리</option>
              </select>
            </li>
            <div class="user-info__btns ">
              <button class="user-info__btn--cancel">취소</button>
              <button class="user-info__btn--save">저장</button>
            </div>
            <div class="user-info__btns">
              <button class="user-info__btn--edit">정보변경</button>
            </div>
          </ul>
        </div>
        <div class="user-info__profile">
          <img
            src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
            alt="profile"
          />
        </div>
      `;
    if (this.permission === 'user') {
      this.el.querySelector('#user-id').readOnly = true;
      this.el.querySelector('.user-info__btn--cancel').addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
      });
    } else {
      this.btnHandler();
    }
    this.pageChange();
    this.userValue();

    this.inputValidator();
    // console.log(this.el.innerHTML);
  }

  btnHandler() {
    this.el.querySelectorAll('.user-info__btns > button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('user-info__btn--edit')) {
          this.formChange('수정');
        } else if (e.target.classList.contains('user-info__btn--cancel')) {
          this.formChange('조회');
        } else if (e.target.classList.contains('user-info__btn--save')) {
          // console.log(this.saveValue());
          // const modal = new Modal('근무시작');
          // this.el.append(modal.el);
        }
      });
    });
  }

  pageChange() {
    const sel = this.el.querySelector('#user-position');
    const btn = this.el.querySelectorAll('.user-info__btns');
    if (this.info === '조회') {
      const inputEl = this.el.querySelectorAll('input');
      inputEl.forEach((el) => {
        el.readOnly = true;
        el.style.border = 'none';
        sel.disabled = true;
        btn[0].style.display = 'none';
      });
    } else {
      btn[1].style.display = 'none';
    }
    sel.value = this.state.user[this.userid] ? this.state.user[this.userid].userPosition : '대리';
  }
  userValue() {
    const fields = [
      { id: 'user-id', key: 'userId' },
      { id: 'user-password', key: 'userPassword' },
      { id: 'user-name', key: 'userName' },
      { id: 'user-email', key: 'userEmail' },
      { id: 'user-phone', key: 'userPhone' },
    ];
    if (this.state.user[this.userid]) {
      fields.forEach(({ id, key }) => {
        this.el.querySelector(`#${id}`).value = this.state.user[this.userid][key];
      });
    }
  }

  formChange(val) {
    this.info = val;
    this.render();
  }

  reinfo(info) {
    if (info === 'change') {
      return '수정';
    } else {
      return '조회';
    }
  }

  inputValidator() {
    const validator = new Validator();
    this.testinput('user-id', validator.idValidator, '.user-info__error');
    this.testinput('user-password', validator.passwordValidator, '.user-info__error');
    this.testinput('user-email', validator.emailValidator, '.user-info__error');
    this.testinput('user-phone', validator.phoneValidator, '.user-info__error');
  }

  testinput(id, fn, err) {
    const idCheck = this.el.querySelector(`#${id}`);
    const errCheck = this.el.querySelector(`
      #${id} + ${err}`);
    idCheck.addEventListener('change', () => {
      this.el.querySelector('.user-info__btn--save').classList.add('user-info__btn--disable');
      errCheck.textContent = fn(idCheck.value);
    });
  }
  async fetchUser() {
    try {
      const response = await fetch('./src/pages/userinfo/User.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.state = await response.json();
      // console.log(this.state);
    } catch (e) {
      console.error('User.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }
}
