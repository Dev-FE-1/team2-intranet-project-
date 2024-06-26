import axios from 'axios';

// 기본 프로필 이미지, 이미지가 등록되어 있지 얂은 경우 사용함.
const defaultProfileImg = 'https://i.imgur.com/JJEqrWE.png';

// 근태 타입
const attendanceType = {
  연차: '-attendance-annual-leave',
  반차: '-attendance-half-day',
  조퇴: '-attendance-early-out',
  기타: '-attendance-etc',
};

export class AttendanceListItems {
  constructor() {}

  // 화면 렌더링, 데이터 가져오기
  render = async () => {
    const attendances = await this.fetchAttendances();
    console.log(attendances);
    const container = document.querySelector('.attendance-items');
    container.innerHTML = (attendances || [])
      .map((attendance) => this.renderAttendanceListItem(attendance))
      .slice(-4)
      .join(' ');
  };

  // 서버로부터 근태 리스트 데이터 가져오기
  async fetchAttendances() {
    try {
      const response = await axios.get('/api/attendances');
      return response.data.data;
    } catch (error) {
      console.error('attendances근태 리스트 데이터를 가져오는 중에 에러 발생', error);
      return [];
    }
  }

  // 근태 리스트 아이템 템플릿, <li> 생성
  // 이름, 타입, 내용, 프로필 이미지
  // 이름, 타입이 없는 리스트 아이템(li) 렌더링 안됨, 에러 출력
  renderAttendanceListItem({ name, type, content, profileImg }) {
    if (!type || !name)
      return console.error('근태타입(type), 직원이름(name)이 등록이 안되어 있습니다.');
    return /* HTML */ `
      <li class="attendance-item">
        <img src="${profileImg || defaultProfileImg}" alt="profile image" srcset="" />
        <div class="l-attendance-item">
          <div class="attendance-item__status">
            <h2 class="${attendanceType[type] || attendanceType['기타']}">${type}</h2>
            <p>${content || '신청합니다.'}</p>
          </div>
          <div class="attendance-item__name">
            <p>${name}</p>
          </div>
        </div>
      </li>
    `;
  }
}
