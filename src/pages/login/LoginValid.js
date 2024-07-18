export default class LoginValid {
  constructor(errorController) {
    // this.usernameInput = usernameInput
    // this.passwordInput = passwordInput
    // this.usernameError = usernameError
    // this.passwordError = passwordError
    // this.errorController = new ErrorController(this.usernameError,this.passwordError)
    this.errorController = errorController;
  }

  validateInputs = (usernameInput, passwordInput) => {
    let isValid = true;

    if (!usernameInput.value.trim()) {
      this.errorController.showIdError('아이디를 입력해주세요.');
      // this.showError(this.usernameError, '아이디를 입력해주세요.');
      isValid = false;
    }

    if (!passwordInput.value.trim()) {
      this.errorController.showPwError('비밀번호를 입력해주세요.');
      // this.showError(this.passwordError, '비밀번호를 입력해주세요.');
      isValid = false;
    }

    return isValid;
  };

  validateId = (usernameInput) => {
    // 첫 문자는 H 또는 C, 그 뒤에 7자리 숫자
    const idPattern = /^(H|C)\d{7}$/;
    const isValid = idPattern.test(usernameInput.value.trim());
    console.log(`id = ${isValid}`);

    if (!isValid) {
      this.errorController.showIdError('등록되지 않았거나 잘못된 형식의 아이디 입니다');
      // this.showError(this.usernameError, '등록되지 않았거나 잘못된 형식의 아이디 입니다');
      return isValid;
    }
    return isValid;
  };

  validatePassword = (passwordInput) => {
    //문자 숫자 특수문자 8자리 or 문자 숫자 특수문자 중 2가지 10자리
    const pattern8 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8}$/;
    const pattern10 =
      /^(?=(?=.*[a-zA-Z])(?=.*\d).{10}$)|(?=(?=.*[a-zA-Z])(?=.*[\W_]).{10}$)|(?=(?=.*\d)(?=.*[\W_]).{10}$)$/;
    const isValid8 = pattern8.test(passwordInput.value.trim());
    console.log(isValid8);
    const isValid10 = pattern10.test(passwordInput.value.trim());

    console.log(isValid10);

    const isValid = isValid8 || isValid10;
    if (!isValid) {
      this.errorController.showPwError('등록되지 않았거나 잘못된 형식의 비밀번호 입니다');
      // this.showError(this.passwordError, '등록되지 않았거나 잘못된 형식의 비밀번호 입니다');
      return isValid;
    }

    return isValid;
  };
}
