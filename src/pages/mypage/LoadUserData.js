// 클래스 선언 문법 오류 수정
export default class LoadUserData {
  constructor(el, state) {
    this.el = el;
    this.state = state;
  }

  loadUserData() {
    const fields = [
      { key: 'user-name', value: 'name' },
      { key: 'user-email', value: 'email' },
      { key: 'user-phone', value: 'phone' },
      { key: 'user-position', value: 'position' },
      { key: 'work-start', value: 'INtime' },
      { key: 'work-end', value: 'OUTtime' },
    ];

    if (this.state) {
      fields.forEach(({ key, value }) => {
        this.el.querySelector(`.${key}`).textContent = this.state[value] || '';
      });
    }
    this.checkWorkStatus(); // 근무 상태 업데이트
  } // 세미콜론 제거

  // 근무 상태 업데이트
  checkWorkStatus() {
    const workStatus = this.el.querySelector('.mypage__state');
    if (this.state.status === '2') {
      workStatus.classList.add('mypage__state-end');
      workStatus.textContent = '퇴근';
    } else if (this.state.status === '1') {
      workStatus.textContent = '출근';
    } else {
      workStatus.textContent = '미출근';
    }
  }
}
