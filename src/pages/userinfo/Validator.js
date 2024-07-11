// import { EmployeeListFetch } from '../employeeListTable/EmployeeListFetch';
export class Validator {
  constructor() {}

  idValidator(id) {
    // const employeeListFetch = new EmployeeListFetch();
    // const isExist = await employeeListFetch.getEmployeeListById();
    // if (isExist) return '이미 존재하는 아이디입니다.';
    let reg = new RegExp('^[A-Za-z0-9]+$');
    // g플래그로 하면 두번째부터는 이전위치 기억해서 false가 나옴

    if (id.length > 20) return '아이디는 20자 이하로 입력해주세요';
    else if (id.length < 8) return '아이디는 8자 이상 입력해주세요';
    else if (!reg.test(id)) return '아이디는 영문과 숫자만 입력해주세요';
    else return 'success';
  }
  passwordValidator(password) {
    let reg = new RegExp('^[A-Za-z0-9#@!$%^&*]{8,20}$');
    if (password.length > 20) return '비밀번호는 20자 이하로 입력해주세요';
    else if (password.length < 8) return '비밀번호는 8자 이상 입력해주세요';
    else if (!reg.test(password)) return '비밀번호는 영문, 숫자, 특수문자(#@!$%^&*)만 입력해주세요';
    else return 'success';
  }
  emailValidator(email) {
    const emailDomains = ['gmail.com', 'company.com', 'naver.com', 'daum.net', 'kakao.com'];
    for (let i = 0; i < emailDomains.length; i++) {
      let reg = new RegExp(`^[A-Za-z0-9]+@${emailDomains[i]}$`);
      if (!reg.test(email)) return "도메인은 다음 중 하나여야 합니다.'gmail.com', 'company.com'";
      else if (reg.test(email) && email.length > 30)
        return '이메일은 30자 이하로 입력되어야 합니다.';
      return 'success';
    }
  }
  phoneValidator(phone) {
    let reg = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);
    if (!reg.test(phone)) return '올바른 휴대폰 번호를 다시 입력해주세요';
    else return 'success';
  }
}
