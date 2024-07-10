import axios from 'axios';

// 기본 프로필 이미지, 이미지가 등록되어 있지 얂은 경우 사용함.
const defaultProfileImg = 'https://i.imgur.com/JJEqrWE.png';

// 근태 타입 색깔을 지정하는 css 클래스
const attendanceTypeStyleClass = {
  연차: '-attendance-annual-leave',
  반차: '-attendance-half-day',
  조퇴: '-attendance-early-out',
  기타: '-attendance-etc',
};

// 근태 타입이 영어로 들어 온 경우, 한글로 변경
const attendanceFrontTypes = Object.freeze({
  annual_leave: '연차', // 연차
  half_day: '반차', // 반차
  early_out: '조퇴', // 조퇴
  etc: '기타', // 기타
});

export { attendanceTypeStyleClass };
// export { attendanceTypeStyleClass as attendanceType };

export class AttendanceListItems {
  constructor(container) {
    this.container = container;
    this.listItemsNumbersLimit = 100;
  }

  // 화면 렌더링, 데이터 가져오기
  render = async () => {
    const container = this.container || document.querySelector('.attendance-items');
    const attendances = await this.fetchAttendances();
    container.innerHTML = (attendances || [])
      .map((attendance) => this.renderAttendanceListItem(attendance))
      .slice(-this.listItemsNumbersLimit)
      .join(' ');
  };

  setListItemsNumbers(number) {
    this.listItemsNumbersLimit = parseInt(number);
  }

  // 서버로부터 근태 리스트 데이터 가져오기
  async fetchAttendances() {
    try {
      const response = await axios.get('/api/v1/attendance');
      return response.data.data;
    } catch (error) {
      console.error('attendances근태 리스트 데이터를 가져오는 중에 에러 발생', error);
      return [];
    }
  }

  // 근태 리스트 아이템 템플릿, <li> 생성
  // 이름, 타입, 내용, 프로필 이미지
  // 이름, 타입이 없는 리스트 아이템(li) 렌더링 안됨, 에러 출력
  renderAttendanceListItem({ name, attendanceType, title, profileImg }) {
    if (!attendanceType || !name)
      return console.error('근태타입(type), 직원이름(name)이 등록이 안되어 있습니다.');
    return /* HTML */ `
      <li class="attendance-item">
        <img src="${profileImg || defaultProfileImg}" alt="profile image" srcset="" />
        <div class="l-attendance-item">
          <div class="attendance-item__status">
            <h2
              class="${attendanceTypeStyleClass[attendanceFrontTypes[attendanceType]] ||
              attendanceTypeStyleClass['기타']}"
            >
              ${attendanceFrontTypes[attendanceType]}
            </h2>
            <p>${title || '신청합니다.'}</p>
          </div>
          <div class="attendance-item__name">
            <p>${name}</p>
          </div>
        </div>
      </li>
    `;
  }
}
