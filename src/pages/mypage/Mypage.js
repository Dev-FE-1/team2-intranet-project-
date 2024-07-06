// import axios from 'axios';
import './Mypage.css';
import { Route } from '../router/route';
import UserInfo from '../userinfo/UserInfo';
import ProfileImage from '../../components/profileImage/ProfileImage';

export default class Mypage {
  constructor(cotainer, props = {}) {
    const { userId = '1234', str = '근무시작' } = props;
    this.userid = userId;
    this.str = str;
    this.el = cotainer;
    this.state = {};
    this.init();
  }
  init() {
    this.sessionStorageFetchUser();
    this.sessionStorageGetUser();
  }
  render() {
    this.el.innerHTML = /* HTML */ `
      <div class="mypage">
        <h1 class="mypage__heading">마이페이지</h1>
        <div class="mypage__bg-img"></div>
        <div class="mypage__info">
          <div class="mypage__profile">
            <div class="mypage__profile-image"></div>
            <div class="mypage__name">
              <span class="user-name">김직원</span>
              <span>사원</span>
            </div>
          </div>
          <div class="mypage__list-wrap">
            <ul class="mypage__list">
              <li><span>이메일</span><span class="user-email"></span></li>
              <li><span>휴대폰 번호</span><span class="user-phone"></span></li>
              <li><span>직급</span><span class="user-position"></span></li>
              <li><span>출근시간</span><span class="work-start">-</span></li>
              <li><span>퇴근시간</span><span class="work-end">-</span></li>
              <li><span>근무상태</span><span class="mypage__state">근무 중</span></li>
            </ul>

            <div class="mypage__btns">
              <button class="mypage__btns--info">개인정보 변경</button>
              <button class="header__btn-logout">로그아웃</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.goUserInfo();
    this.userValue();
    const profileImage = document.querySelector('.mypage__profile-image');
    new ProfileImage(profileImage).render();
  }

  goUserInfo() {
    const goBtn = this.el.querySelector('.mypage__btns--info');
    goBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const pathMappings = {
        '/userinfo': { title: 'userinfo', ComponentClass: UserInfo },
      };
      const routeView = document.querySelector('route-view');

      const route = new Route({ pathMappings, routeView });
      const href = '/userinfo';
      const props = this.getRowData();
      route.router(props, href);
    });
  }
  getRowData() {
    return {
      userId: this.state.user[this.userid].userId,
      userPassword: this.state.user[this.userid].userPassword,
      profileImg: this.state.user[this.userid].profileImg,
      name: this.state.user[this.userid].userName,
      email: this.state.user[this.userid].userEmail,
      phone: this.state.user[this.userid].userPhone,
      position: this.state.user[this.userid].userPosition,
      info: '수정',
      permission: 'user',
    };
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

  sessionStorageFetchUser() {
    try {
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          1234: {
            userId: '1234',
            userPassword: 'password',
            userName: '홍길동',
            userEmail: 'hong@gmail.com',
            userPhone: '123-456-7890',
            userPosition: '차장',
          },
          4567: {
            userId: '4567',
            userPassword: 'password',
            userName: '세종대왕',
            userEmail: 'se@gmail.com',
            userPhone: '098-765-4321',
            userPosition: '부장',
          },
        }),
      );
    } catch (e) {
      console.error('Failed fetch users! User.json 파일을 불러오는 데 실패했습니다.', e);
    }
  }

  sessionStorageGetUser() {
    this.state.user = JSON.parse(sessionStorage.getItem('user'));
  }
}
