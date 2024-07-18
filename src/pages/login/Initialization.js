import LoginValid from './LoginValid';
import ErrorController from './ErrorController';
import Submit from './Submit';
import LoginUtil from './loginUtil';

export default class Initialization {
  constructor() {
    // 요소 초기화
    this.form = document.getElementById('loginForm');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.usernameError = document.querySelector('.usernameError');
    this.passwordError = document.querySelector('.passwordError');
    this.adminCheck = document.querySelector('.admin__checkbox');
    this.togglePasswordButton = document.querySelector('.login__toggle-password');

    this.ErrorController = new ErrorController(this.usernameError, this.passwordError);
    this.loginUtil = new LoginUtil(this.passwordInput, this.adminCheck);
    this.loginValid = new LoginValid(this.ErrorController);
    this.submit = new Submit(this.ErrorController, this.loginValid);

    // 이벤트 리스너 추가
    this.adminCheck.addEventListener('change', this.loginUtil.adminChecker);

    this.togglePasswordButton.addEventListener('click', this.loginUtil.togglePasswordVisibility);
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      sessionStorage.getItem('admin') === ''
        ? this.submit.adminSubmit(e)
        : this.submit.userSubmit(e, this.usernameInput, this.passwordInput);
    });
  }
}
