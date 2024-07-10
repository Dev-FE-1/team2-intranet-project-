import './Mypage.css';
import { Route } from '../router/route';
import UserInfo from '../userinfo/UserInfo';
import ProfileImage from '../../components/profileImage/ProfileImage';
import Login from '../login/userLogin';

export default class Mypage {
  constructor(cotainer, props = {}) {
    this.props = props;
    this.el = cotainer;
    this.state = { ...sessionStorage };
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
              <li><span>출근시간</span><span class="work-start"></span></li>
              <li><span>퇴근시간</span><span class="work-end"></span></li>
              <li><span>근무상태</span><span class="mypage__state"></span></li>
            </ul>

            <div class="mypage__btns">
              <button class="mypage__btns--info">개인정보 변경</button>
              <button class="header__btn-logout">로그아웃</button>
            </div>
          </div>
        </div>
      </div>
    `;
    // 이벤트 핸들러 설정
    this.setupEventHandlers();
    // 사용자 데이터 채우기
    this.loadUserData();
    // 프로필 이미지 컴포넌트 렌더링
    this.renderProfileImage();
  }

  // 프로필 이미지 컴포넌트를 렌더링하는 함수
  renderProfileImage() {
    const profileImage = this.el.querySelector('.mypage__profile-image');
    new ProfileImage(profileImage).render();
  }

  // 이벤트 핸들러들을 설정하는 함수
  setupEventHandlers() {
    this.setupLogoutHandler(); // 로그아웃 버튼의 이벤트 핸들러 설정
    this.setupUserInfoButtonHandler(); // 정보수정 버튼의 이벤트 핸들러 설정
  }

  // 로그아웃 버튼의 이벤트 핸들러를 설정하는 함수
  setupLogoutHandler() {
    const logoutButton = this.el.querySelector('.header__btn-logout');
    logoutButton.addEventListener('click', () => {
      sessionStorage.clear();
      const app = document.querySelector('#app');
      history.replaceState('', '', '/');
      const login = new Login(app);
      login.render(); // 로그인 페이지로 이동
    });
  }

  // 정보수정 페이지로 이동하는 함수
  setupUserInfoButtonHandler() {
    const userInfoButton = this.el.querySelector('.mypage__btns--info');
    userInfoButton.addEventListener('click', (e) => {
      e.preventDefault();
      const pathMappings = {
        '/userinfo': { title: 'userinfo', ComponentClass: UserInfo },
      };
      const routeView = document.querySelector('route-view');
      const route = new Route({ pathMappings, routeView });
      const href = '/userinfo';
      const props = this.getUserInfoProps(); // 정보수정 페이지로 전달할 데이터
      route.router(props, href);
    });
  }

  // 정보수정 페이지로 전달할 데이터를 반환하는 함수
  getUserInfoProps() {
    return {
      info: '수정',
      permission: 'user',
    };
  }
  // 사용자 데이터를 채워 넣는 함수
  loadUserData() {
    const fields = [
      { key: 'user-name', value: 'name' },
      { key: 'user-email', value: 'email' },
      { key: 'user-phone', value: 'phone' },
      { key: 'user-position', value: 'position' },
      { key: 'work-start', value: 'INtime' },
      { key: 'work-end', value: 'OUTtime' },
    ];

    if (this.state) {
      fields.forEach(({ key, value }) => {
        this.el.querySelector(`.${key}`).textContent = this.state[value] || '';
      });
    }
    this.checkWorkStatus(); // 근무 상태 업데이트
  }

  // 근무 상태 업데이트
  checkWorkStatus() {
    const workStatus = this.el.querySelector('.mypage__state');
    if (this.state.status === '2') {
      workStatus.classList.add('mypage__state-end');
      workStatus.textContent = '퇴근';
    } else if (this.state.status === '1') {
      workStatus.textContent = '출근';
    } else {
      workStatus.textContent = '미출근';
    }
  }
}
