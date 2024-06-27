import axios from 'axios';

export class AttendanceListItems {
  constructor({ cid = '.attendance-list__items', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;

    // 기본 프로필 이미지, 이미지가 없을 경우 사용
    this.defaultProfileImg = 'https://i.imgur.com/JJEqrWE.png';

    // 근태 타입
    this.attendanceType = {
      연차: '-attendance-annual-leave',
      반차: '-attendance-half-day',
      조퇴: '-attendance-early-out',
      기타: '-attendance-etc',
    };
  }

  // 화면 렌더링, 데이터 가져오기
  render = async () => {
    const attendances = await this.getAttendances();
    this.container.innerHTML = (attendances || [])
      .slice(-4)
      .map((attendance) => this.attendancesListItemTamplate(attendance))
      .join(' ');
  };

  // 서버로부터 근태 리스트 데이터 가져오기
  async getAttendances() {
    try {
      const response = await axios.get('/api/attendances');
      return response.data.data;
    } catch (error) {
      console.error('attendances근태 리스트 데이터를 가져오는 중에 에러 발생', error);
      return [];
    }
  }

  // 근태 리스트 아이템 템플릿, <li> 생성
  attendancesListItemTamplate({ name, type, content, profileImg }) {
    return /* HTML */ `
      <li class="attendance-item">
        <img src="${profileImg || this.defaultProfileImg}" alt="profile image" srcset="" />
        <div class="l-attendance-item">
          <div class="attendance-item__status">
            <h2 class="${this.attendanceType[type] || ''}">${type}</h2>
            <p>${content || '신청합니다.'}</p>
          </div>
          <div class="attendance-item__name">
            <p>${name || ''}</p>
          </div>
        </div>
      </li>
    `;
  }
}
