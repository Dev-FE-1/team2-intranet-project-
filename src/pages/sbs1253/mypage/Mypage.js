// import { routeRender } from '../route/route';
import './Mypage.css';
import Header from './../header/Header';

// import UserInfo from '../userinfo/UserInfo';
// import Modal from './modal';
export default class Mypage {
  constructor(props = {}) {
    const { userId = '4567', str = '근무시작' } = props;
    this.userid = userId;
    this.str = str;
    this.el = document.createElement('div');
    this.state = {};
    this.init();
  }
  async init() {
    await this.fetchUser();
    this.render();
  }
  render() {
    const header = new Header();
    header.render();
    this.el.before(header.container);
    this.el.classList.add('mypage');
    this.el.innerHTML =
      /* HTML */
      `
        <div class="mypage__bg-img"></div>
        <div class="mypage__info">
          <div class="mypage__profile">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
              alt="profile"
            />
          </div>

          <div class="mypage__name">
            <span class="user-name">김직원</span>
            <span>사원</span>
          </div>

          <ul class="mypage__list">
            <li><span>이메일</span><span class="user-email"></span></li>
            <li><span>휴대폰 번호</span><span class="user-phone"></span></li>
            <li><span>직급</span><span class="user-position"></span></li>
          </ul>

          <ul class="mypage__list">
            <li><span>출근시간</span><span class="work-start">-</span></li>
            <li><span>퇴근시간</span><span class="work-end">-</span></li>
            <li><span>근무상태</span><span class="mypage__state">-</span></li>
          </ul>

          <div class="mypage__btns">
            <button class="mypage__btns--info">개인정보 변경</button>
          </div>
        </div>
      `;
    this.goUserInfo();
    this.userValue();
  }

  goUserInfo() {
    const goBtn = this.el.querySelector('.mypage__btns--info');
    goBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // const url = `/info?userId=${this.userid}&info=change&permission=user`;
      // history.pushState(null, null, url);
      // routeRender([{ path: '/info', component: UserInfo }]);
      // 아래가 변경된 코드입니다.
      // history.pushState(null, null, '/info');
      // routeRender([{ path: '/info', component: UserInfo }], {
      //   userId: this.userid,
      //   info: 'change',
      //   permission: 'user',
      // });
    });
  }

  userValue() {
    const field = [
      { 'user-name': 'userName' },
      { 'user-email': 'userEmail' },
      { 'user-phone': 'userPhone' },
      { 'user-position': 'userPosition' },
    ];
    if (this.state.user[this.userid]) {
      field.forEach((el) => {
        this.el.querySelector(`.${Object.keys(el)[0]}`).textContent =
          this.state.user[this.userid][Object.values(el)[0]];
      });
    }
  }

  async fetchUser() {
    try {
      const response = await fetch('./src/pages/sbs1253/userinfo/User.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.state = await response.json();
    } catch (e) {
      console.error('User.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }
}
