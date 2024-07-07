import './UserInfo.css';
import ProfileImage from '../../components/profileImage/ProfileImage';
import { Validator } from './Validator';
export default class UserInfo {
  constructor(cotainer, props = {}) {
    const {
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

    console.log(`프로필 이미지: ${profileImg}`);

    this.state = {
      user: {
        [userId]: {
          userId: userId,
          userPassword: userPassword,
          userName: name,
          userEmail: email,
          userPhone: phone,
          userPosition: position,
        },
      },
    };
    this.el = cotainer;
  }

  render() {
    this.el.innerHTML =
      /* HTML */
      `
        <form class="user-info">
          <div class="user-info__lists">
            <h1>임직원 ${this.info}</h1>
            <ul>
              <li class="user-info__list">
                <label for="user-id">
                  <span>아이디</span>
                </label>
                <input
                  type="text"
                  id="user-id"
                  name="user-id"
                  placeholder="아이디를 입력해주세요"
                />
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
          <div class="user-info__profile"></div>
        </form>
      `;
    if (this.permission === 'user') {
      this.el.querySelector('#user-id').readOnly = true;
      this.el.querySelector('.user-info__btn--cancel').addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
      });
    }
    // 폼전송 방지
    this.preventFormSubmission();
    // 수정, 조회 페이지 전환
    this.pageChange();
    // 유저정보 불러오기
    this.userValue();
    // 입력값 검증
    this.inputValidator();

    // 프로필 이미지 컴포넌트 불러오기
    const profileImage = document.querySelector('.user-info__profile');
    new ProfileImage(profileImage).render();
  }
  preventFormSubmission() {
    const form = this.el.querySelector('.user-info');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    this.btnHandler(form);
  }

  btnHandler(props) {
    this.el.querySelectorAll('.user-info__btns > button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('user-info__btn--edit')) {
          this.formChange('수정');
        } else if (e.target.classList.contains('user-info__btn--cancel')) {
          this.info === '등록' ? history.back() : this.formChange('조회');
        } else if (e.target.classList.contains('user-info__btn--save')) {
          const formData = new FormData(props); // 폼 데이터 가져오기
          // 폼 데이터 출력
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
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
  }
  userValue() {
    const fields = [
      { id: 'user-id', key: 'userId' },
      { id: 'user-password', key: 'userPassword' },
      { id: 'user-name', key: 'userName' },
      { id: 'user-email', key: 'userEmail' },
      { id: 'user-phone', key: 'userPhone' },
      { id: 'user-position', key: 'userPosition' },
    ];
    if (this.state.user && this.state.user[this.userid]) {
      fields.forEach(({ id, key }) => {
        this.el.querySelector(`#${id}`).value = this.state.user[this.userid][key] || '';
      });
    }
  }

  formChange(val) {
    this.info = val;
    this.render();
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
}
