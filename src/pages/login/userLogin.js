import './login.css';
import { admin } from '../../../server/data/11b2ac8a015c5afca5db507d6587a42b';
export default class Login {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="user">
        <h1 class="user__title">INTRANET</h1>
      </div>
      <div class="login">
        <form class="login__form" id="loginForm" action="/login" method="POST" novalidate>
          <h1 class="login__title">Log In</h1>
          <p class="login__description">Enter your email to sign up for this app</p>
          <div class="login__group">
            <label class="login__label" for="username">아이디</label>
            <input
              class="login__input"
              type="text"
              id="username"
              name="username"
              placeholder="ID"
              required
            />
            <span class="usernameError"></span>
          </div>
          <div class="login__group">
            <label class="login__label" for="password">비밀번호</label>
            <div class="login__password-wrapper">
              <input
                class="login__input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                class="login__toggle-password"
                aria-label="비밀번호 보기"
                data-shown="false"
              >
                <i class="fas fa-eye"></i>
              </button>
            </div>
            <span class="passwordError"></span>
          </div>
          <div class="login__checkboxgroup">
            <input class="admin__checkbox" type="checkbox" id="admin" name="remember" />
            <label class="admin__checkbox-label" for="admin">관리자접속</label>
            <input class="login__checkbox" type="checkbox" id="remember" name="remember" />
            <label class="login__checkbox-label" for="remember">이 아이디를 기억하기</label>
          </div>
          <button class="login__button" type="submit">로그인 하기</button>
          <div class="login__footer">
            <p class="login__continue">or continue with</p>
            <a class="login__forgot-pw" href="/forgot-password">비밀번호를 잊으셨나요?</a>
          </div>
        </form>
      </div>
    `;
    this.initializeElements();
    this.adminChecker();
  }

  initializeElements() {
    // 요소 초기화
    this.form = document.getElementById('loginForm');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.usernameError = document.querySelector('.usernameError');
    this.passwordError = document.querySelector('.passwordError');
    this.adminCheck = document.querySelector('.admin__checkbox');
    this.togglePasswordButton = document.querySelector('.login__toggle-password');

    // 이벤트 리스너 추가
    this.adminCheck.addEventListener('change', this.adminChecker.bind(this));
    this.togglePasswordButton.addEventListener('click', this.togglePasswordVisibility.bind(this));
  }

  togglePasswordVisibility() {
    const isPasswordShown = this.passwordInput.getAttribute('type') === 'text';

    this.passwordInput.setAttribute('type', isPasswordShown ? 'password' : 'text');

    // Font Awesome 아이콘 변경
    if (isPasswordShown) {
      this.togglePasswordButton.innerHTML = '<i class="fas fa-eye"></i>';
      this.togglePasswordButton.setAttribute('aria-label', '비밀번호 보기');
    } else {
      this.togglePasswordButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
      this.togglePasswordButton.setAttribute('aria-label', '비밀번호 숨기기');
    }
  }

  adminChecker() {
    this.form.removeEventListener('submit', this.userSubmit);
    this.form.removeEventListener('submit', this.adminSubmit);

    if (this.adminCheck.checked) {
      console.log('관리자 모드 활성화');
      this.form.addEventListener('submit', this.adminSubmit.bind(this));
    } else {
      console.log('일반 사용자 모드 활성화');
      this.form.addEventListener('submit', this.userSubmit.bind(this));
    }
  }

  adminSubmit(e) {
    e.preventDefault();
    this.clearErrors();
    this.attemptAdminLogin();
  }

  userSubmit = (e) => {
    e.preventDefault();
    this.clearErrors();
    if (this.validateInputs() && this.validateId() && this.validatePassword()) {
      this.attemptLogin();
    }
  };

  validateInputs() {
    let isValid = true;

    if (!this.usernameInput.value.trim()) {
      this.showError(this.usernameError, '아이디를 입력해주세요.');
      isValid = false;
    }

    if (!this.passwordInput.value.trim()) {
      this.showError(this.passwordError, '비밀번호를 입력해주세요.');
      isValid = false;
    }

    return isValid;
  }

  validateId() {
    // 첫 문자는 H 또는 C, 그 뒤에 7자리 숫자
    const idPattern = /^(H|C)\d{7}$/;

    const isValid = idPattern.test(this.usernameInput.value.trim());

    if (!isValid) {
      this.showError(this.usernameError, '등록되지 않았거나 잘못된 형식의 아이디 입니다');
      return isValid;
    }
    return isValid;
  }

  validatePassword() {
    //문자 숫자 특수문자 8자리 or 문자 숫자 특수문자 중 2가지 10자리
    const pattern8 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8}$/;
    const pattern10 = /^(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_]).{10}$/;
    const isValid8 = pattern8.test(this.passwordInput.value.trim());
    const isValid10 = pattern10.test(this.passwordInput.value.trim());
    const isValid = isValid8 || isValid10;
    if (!isValid) {
      this.showError(this.passwordError, '등록되지 않았거나 잘못된 형식의 비밀번호 입니다');
      return isValid;
    }

    return isValid;
  }

  // 일반 사용자 로그인의 경우, 동일하게 아이디와 비밀번호 값 비교 후 로그인을 처리
  // 세션 스토리지의 admin 플래그를 제거한 후, 대시보드(/)로 리다이렉트
  async attemptLogin() {
    console.log('attemptLogin');
    const data = await fetch('/server/data/users.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    if (this.validateInputs() && this.validateId() && this.validatePassword()) {
      const inputUserName = this.usernameInput.value.trim();
      const inputUserPass = this.passwordInput.value.trim();
      const result = data.users.map(({ userId, userPass }) => ({ userId, userPass }));

      const index = result.findIndex((user) => {
        return user.userId === inputUserName && user.userPass === inputUserPass;
      });

      if (index !== -1) {
        console.log('사용자가 있습니다.');
        sessionStorage.setItem('admin', false);
        this.redirectToUserDashboard();
      } else {
        console.log('사용자가 없습니다.');
        this.showError(this.usernameError, '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    // 백단 로그인 로직
    console.log('attemptLogin');
  }

  // 입력된 아이디와 비밀번호가 import된 관리자 아이디와 비밀번호와 일치하는지 확인하고,
  // 일치할 경우 세션 스토리지에 admin 플래그를 설정한 후 직원관리(/employee-list)로 리다이렉트
  attemptAdminLogin() {
    if (this.validateInputs()) {
      const inputUserName = this.usernameInput.value.trim();
      const inputUserPass = this.passwordInput.value.trim();

      if (inputUserName === admin.adminId && inputUserPass === admin.adminPass) {
        console.log('attemptAdminLogin');

        sessionStorage.setItem('admin', true);
        this.redirectToAdminDashboard();
      } else {
        this.showError(this.usernameError, '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    ///백단 로그인 로직(관리자)
    console.log('attemptAdminLogin');
  }
  // 사용자 대시보드로 리다이렉트 후 다시 로딩
  redirectToUserDashboard() {
    history.replaceState('', '', '/');
    location.reload();
  }
  // 관리자 직원관리로 리다이렐트 후 다시 로딩
  redirectToAdminDashboard() {
    history.replaceState('', '', '/employee-list');
    location.reload();
  }
  showError(element, message) {
    element.textContent = message;
  }

  clearErrors() {
    this.usernameError.textContent = '';
    this.passwordError.textContent = '';
  }
}
