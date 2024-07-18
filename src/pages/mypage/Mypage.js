import './Mypage.css';
import ProfileImage from '../../components/profileImage/ProfileImage';
import MypageEventHandler from './MypageEventHandler';
import LoadUserData from './LoadUserData';

export default class Mypage {
  constructor(cotainer, props = {}) {
    this.props = props;
    this.el = cotainer;
    this.state = { ...sessionStorage };
    this.eventHandler = new MypageEventHandler(this);
    this.loadUserData = new LoadUserData(this.el, this.state);
  }

  render() {
    this.renderHTML();
    // 이벤트 핸들러 메서드 가져오기
    this.eventHandler.setupEventHandlers();
    this.loadUserData.loadUserData();
    this.loadUserData.checkWorkStatus();
    // 프로필 이미지 컴포넌트 렌더링
    this.renderProfileImage();
  }

  renderHTML() {
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
  }

  // 프로필 이미지 컴포넌트를 렌더링하는 함수
  renderProfileImage() {
    const profileImage = this.el.querySelector('.mypage__profile-image');
    new ProfileImage(profileImage).render();
  }
}
