import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

export default class Login {
  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="wrapper">
        <div class="login-background"></div>
        <div class="login__wrap">
          <div class="logo">
            <h1>Corenet</h1>
          </div>
          <div class="login">
            <form class="login__form" id="loginForm" action="/login" method="POST" novalidate>
              <h1 class="readable-hidden">Log In</h1>
              <div class="login__description">
                <p>
                  <span>안녕하세요! 👋</span>
                </p>
                <p>
                  <span
                    >사내 인트라넷 솔루션 <strong class="product-name">코어넷</strong>입니다.</span
                  >
                </p>
              </div>
              <div class="login__group">
                <label class="login__label" for="username">아이디</label>
                <input
                  class="login__input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="ID"
                  value="H2410001"
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
                    value="P@ssw0rd!"
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
                <p>
                  <input class="admin__checkbox" type="checkbox" id="admin" name="remember" />
                  <label class="admin__checkbox-label" for="admin">관리자 접속</label>
                </p>
                <p>
                  <input class="login__checkbox" type="checkbox" id="remember" name="remember" />
                  <label class="login__checkbox-label" for="remember">아이디 기억하기</label>
                </p>
              </div>
              <button class="login__button" type="submit">로그인 하기</button>
              <div class="login__footer">
                <p class="login__continue">or continue with</p>
                <!--<a class="login__forgot-pw" href="/forgot-password">비밀번호를 잊으셨나요?</a>-->
                <p class="forgotpass-info">
                  <span>비밀번호를 분실하셨나요?</span
                  ><span>관리자에게 문의하여 비밀번호를 재설정하세요.</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    this.initializeElements();
    this.changeLabelStyle();
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
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      sessionStorage.getItem('admin') === '' ? this.adminSubmit(e) : this.userSubmit(e);
    });
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
    if (this.adminCheck.checked) {
      sessionStorage.setItem('admin', true);
    } else {
      sessionStorage.setItem('admin', false);
    }
  }

  adminSubmit(e) {
    e.preventDefault();
    console.log('관리자 로그인시도');
    if (this.validateInputs()) {
      console.log('타당성 검사 완료, 로그인 시도');
      this.clearErrors();
      //employee-list
      sessionStorage.setItem('id', 'admin');
      window.location.reload();
      // history.replaceState('', '', '/employee-list');
    }
  }

  userSubmit = async (e) => {
    e.preventDefault();
    console.log('사용자 로그인 시도');
    if (this.validateInputs() && this.validateId() && this.validatePassword()) {
      this.clearErrors();
      console.log('타당성 검사 완료, 로그인 시도');
      const requestData = {
        username: this.usernameInput.value,
        password: this.passwordInput.value,
      };

      try {
        const response = await axios.post(`/api/employees/loginCheck`, requestData);
        // 서버 응답에서 데이터 부분을 추출합니다.
        const employeeData = response.data;
        console.log('직원 데이터:', employeeData.data);
        const { email, employeeId, name, phone, position } = employeeData.data;

        sessionStorage.setItem('id', employeeId);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('position', position);
      } catch (error) {
        console.error('로그인 정보 불일치', error);
        //모달창 확인후 입력값 전부 clear
        this.usernameInput.value = '';
        this.passwordInput.value = '';
      }

      if (sessionStorage.getItem('id')) {
        const timeResponse = await axios.get(`/api/employees/getTime/${requestData.username}`);
        const timeData = timeResponse.data;
        console.log('시간 데이터:', timeData);
        const { employeeId, INtime, OUTtime, status } = timeData;
        console.log(employeeId + '시간값 확인');
        sessionStorage.setItem('INtime', INtime);
        sessionStorage.setItem('OUTtime', OUTtime);
        sessionStorage.setItem('status', status);
        window.location.reload();
      }
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
    console.log(`id = ${isValid}`);

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
    console.log(isValid8);
    const isValid10 = pattern10.test(this.passwordInput.value.trim());

    console.log(isValid10);

    const isValid = isValid8 || isValid10;
    if (!isValid) {
      this.showError(this.passwordError, '등록되지 않았거나 잘못된 형식의 비밀번호 입니다');
      return isValid;
    }

    return isValid;
  }

  showError(element, message) {
    element.textContent = message;
  }

  clearErrors() {
    this.usernameError.textContent = '';
    this.passwordError.textContent = '';
  }
  changeLabelStyle() {
    const fields = [
      { inputId: 'username', labelFor: 'username' },
      { inputId: 'password', labelFor: 'password' },
    ];

    fields.forEach((field) => {
      const input = document.querySelector(`#${field.inputId}`);
      const label = document.querySelector(`.login__label[for="${field.labelFor}"]`);

      input.addEventListener('focus', () => {
        label.style.color = 'var(--color-ocean-blue)';
      });

      input.addEventListener('blur', () => {
        label.style.color = '';
      });
    });
  }
}
