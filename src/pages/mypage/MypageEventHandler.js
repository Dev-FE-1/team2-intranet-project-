import Login from '../login/userLogin';
import UserInfo from '../userinfo/UserInfo';
import { Route } from '../router/route';

export default class MypageEventHandler {
  constructor(mypageInstance) {
    this.mypage = mypageInstance;
    this.el = mypageInstance.el;
  }

  // 이벤트 핸들러들을 설정하는 함수
  setupEventHandlers() {
    this.setupLogoutHandler();
    this.setupUserInfoButtonHandler();
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
        '/userinfo': { title: 'CORENET - 인트라넷 솔루션', ComponentClass: UserInfo },
      };
      const routeView = document.querySelector('route-view');
      const route = new Route({ pathMappings, routeView });
      const href = '/userinfo';
      const props = this.getUserInfoProps();
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
}
