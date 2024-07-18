export default class ErrorController {
  constructor(usernameError, passwordError) {
    this.usernameError = usernameError;
    this.passwordError = passwordError;
  }

  showIdError(message) {
    this.message = message;
    this.usernameError.textContent = message;
  }

  showPwError(message) {
    this.message = message;
    this.passwordError.textContent = message;
  }

  clearErrors() {
    this.usernameError.textContent = '';
    this.passwordError.textContent = '';
  }
}
