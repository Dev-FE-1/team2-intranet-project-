export default class LoginUtil {
  constructor(passwordInput, adminCheck) {
    this.passwordInput = passwordInput;
    this.adminChecker = adminCheck;
  }

  togglePasswordVisibility = () => {
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
  };

  adminChecker = () => {
    if (this.adminCheck.checked) {
      sessionStorage.setItem('admin', true);
    } else {
      sessionStorage.setItem('admin', false);
    }
  };
}
