import axios from 'axios';
export default class Submit {
  constructor(errorController, loginValid) {
    this.loginValid = loginValid;
    this.errorController = errorController;
  }

  adminSubmit = (e) => {
    e.preventDefault();
    console.log('관리자 로그인시도');
    if (this.loginValid.validateInputs()) {
      console.log('타당성 검사 완료, 로그인 시도');
      this.errorController.clearErrors();
      //employee-list11
      sessionStorage.setItem('id', 'admin');
      window.location.reload();
    }
  };

  userSubmit = async (e, usernameInput, passwordInput) => {
    e.preventDefault();
    console.log('사용자 로그인 시도');
    if (
      this.loginValid.validateInputs(usernameInput, passwordInput) &&
      this.loginValid.validateId(usernameInput) &&
      this.loginValid.validatePassword(passwordInput)
    ) {
      this.errorController.clearErrors();
      console.log('타당성 검사 완료, 로그인 시도');
      const requestData = {
        username: usernameInput.value,
        password: passwordInput.value,
      };

      try {
        const response = await axios.post(`/api/employees/loginCheck`, requestData);
        // 서버 응답에서 데이터 부분을 추출합니다.
        const employeeData = response.data;
        const { email, employeeId, name, phone, position } = employeeData.data;

        sessionStorage.setItem('id', employeeId);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('position', position);
      } catch (error) {
        console.error('로그인 정보 불일치', error);
        //모달창 확인후 입력값 전부 clear
        usernameInput.value = '';
        passwordInput.value = '';
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
}
