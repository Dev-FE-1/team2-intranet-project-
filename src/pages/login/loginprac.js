class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.usernameError = document.getElementById('usernameError');
    this.passwordError = document.getElementById('passwordError');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearErrors();

    if (this.validateInputs()) {
      this.attemptLogin();
    }
  }

  validateInputs() {
    let isValid = true;

    if (!this.usernameInput.value) {
      this.showError(this.usernameError, '아이디를 입력해주세요.');
      isValid = false;
    }

    if (!this.passwordInput.value) {
      this.showError(this.passwordError, '비밀번호를 입력해주세요.');
      isValid = false;
    }

    return isValid;
  }

  attemptLogin() {
    // 실제로는 여기서 서버에 로그인 요청을 보내야 합니다.
    // 이 예제에서는 모든 로그인 시도를 실패로 처리합니다.
    this.showError(this.usernameError, '등록되지 않은 아이디이거나 잘못된 비밀번호입니다.');
  }

  showError(element, message) {
    element.textContent = message;
  }

  clearErrors() {
    this.usernameError.textContent = '';
    this.passwordError.textContent = '';
  }
}

// 페이지 로드 시 LoginForm 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});
