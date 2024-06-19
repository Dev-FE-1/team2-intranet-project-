import './UserInfo.css';
export class UserInfo {
  constructor(props = {}) {
    const { userId = '1234', info = '조회' } = props;
    this.userid = userId;
    this.info = info;
    this.state = {};
    this.el = document.createElement('form');
    this.render();
  }
  async render() {
    await this.fetchUser();
    this.el.classList.add('user-info');
    this.el.innerHTML =
      /*html */
      `
    <div class="user-info__lists">
    <h1>임직원 정보${this.info}</h1>
    <ul>
      <li class="user-info__list">
        <label for="user-id">
          <span>아이디</span>
        </label>
        <input type="text" id="user-id" name="user-id" />
      </li>
      <li class="user-info__list">
        <label for="user-password">
          <span>패스워드</span>
        </label>
        <input type="password" id="user-password" name="user-password" />
      </li>
      <li class="user-info__list">
        <label for="user-name">
          <span>이름</span>
        </label>
        <input type="text" id="user-name" name="user-name" />
      </li>
      <li class="user-info__list">
        <label for="user-email">
          <span>이메일</span>
        </label>
        <input type="email" id="user-email" name="user-email" />
      </li>
      <li class="user-info__list">
        <label for="user-phone">
          <span>휴대폰번호</span>
        </label>
        <input type="text" id="user-phone" name="user-phone" />
      </li>
      <li class="user-info__list">
        <label for="user-position"> <span>직급</span></label>
        <select id="user-position" name="user-position" value="과장">
          <option value="부장">부장</option>
          <option value="차장">차장</option>
          <option value="과장">과장</option>
          <option value="대리">대리</option>
        </select>
      </li>
      <div class="user-info__btn ">
        <button class="btn btn--cancel">취소</button>
        <button class="btn btn--save">저장</button>
      </div>
      <div class="user-info__btn">
        <button class="btn btn--edit">정보변경</button>
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
    this.btnHandler();
    this.pageChange();
    this.userValue();
  }

  btnHandler() {
    this.el.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('btn--edit')) {
          this.formChange('수정');
        } else if (e.target.classList.contains('btn--cancel')) {
          this.formChange('조회');
          console.log(this.state);
        } else if (e.target.classList.contains('btn--save')) {
          console.log(this.saveValue());
        }
      });
    });
  }

  pageChange() {
    const sel = this.el.querySelector('#user-position');
    const btn = this.el.querySelectorAll('.user-info__btn');
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
    const field = [
      { 'user-id': 'userId' },
      { 'user-password': 'userPassword' },
      { 'user-name': 'userName' },
      { 'user-email': 'userEmail' },
      { 'user-phone': 'userPhone' },
    ];
    if (this.state.user[this.userid]) {
      field.forEach((el) => {
        document.getElementById(Object.keys(el)[0]).value =
          this.state.user[this.userid][Object.values(el)[0]];
      });
    }
  }

  // saveValue() {
  //   const userId = document.getElementById('user-id').value;
  //   this.state.user[userId] = {
  //     userId: userId,
  //     userPassword: document.getElementById('user-password').value,
  //     userName: document.getElementById('user-name').value,
  //     userEmail: document.getElementById('user-email').value,
  //     userPhone: document.getElementById('user-phone').value,
  //     userPosition: document.getElementById('user-position').value,
  //   };
  //   const data = JSON.stringify(this.state);
  //   return data;
  // }

  formChange(val) {
    this.info = val;
    this.render();
  }

  async fetchUser() {
    try {
      const response = await fetch('src/Components/userinfo/User.json');
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
