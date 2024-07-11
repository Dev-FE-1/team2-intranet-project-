import './Home.css';
import { AttendanceList } from '../attendancePreview/AttendanceList';
import { phoneIcon, jobIcon, emailIcon } from '../../utils/icons';
import axios from 'axios';

export class Home {
  constructor(container) {
    // sessionStorage에서 값을 가져와 객체를 구성합니다.
    const user = {
      name: sessionStorage.getItem('name') || '이동혁',
      position: sessionStorage.getItem('position') || '신입',
      phone: sessionStorage.getItem('phone') || '010-2826-3158',
      email: sessionStorage.getItem('email') || 'asd1234',
      status: sessionStorage.getItem('status') || '0',
    };

    this.userName = user.name;
    this.rank = user.position;
    this.ph = user.phone;
    this.email = user.email;
    this.status = Number(user.status);
    this.container = container;

    console.log(typeof this.status);
    this.timeFormatter = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  // 이름, 사원, 현재시간, 현재상태, 근무상태
  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="user-dashboard__wrap">
      <h1 class="user-dashboard__heading">홈 대시보드</h1>
        <div>
          <div class="working-timer-page">
            <div class="work">
              <div class="summary">
                <img src="${avatarDefaultImg}" alt="" />
                <div class="worker-name">${this.userName}</div>
                <div class="worker-rank">${this.rank}</div>
              </div>
              <div class="punching-displayer">
                <div class="timer">
                  <p class="current-time">현재시간</p>
                  <p class="current-displayer">8:21</p>
                </div>
                <div class="working-status">
                  <p class="current-status">현재상태</p>
                  <p class="current-displayer">${this.status === 1 ? '근무중' : '퇴근'}</p>
                </div>
              </div>
              <button class="puncher" ${this.status === 2 ? 'disabled' : ''}>
              ${this.status === 1 ? '근무종료' : '근무시작'}
              </button>
            </div>
            <div class="profil-mini">
              <div class="profile-title">PROFILE</div>
              <div class="ph-section">
                <p class="ph-title">
                  ${phoneIcon()}Phone
                </p>
                <p class="ph-number">${this.ph}</p>
              </div>
              <div class="rank-section">
                <p class="rank-title">${jobIcon()}Job</p>
                <p class="rank-name">${this.rank}</p>
              </div>
              <div class="email-section">
                <p class="email-title">${emailIcon()}</span>Email</p>
                <p class="email-address">${this.email}</p>
              </div>
            </div>
        </div>
        </div>
          <div class='attendanceList'>
          </div>
        
        
      </section>
    `;
    const attendanceList = new AttendanceList(document.querySelector('.attendanceList'), {});
    attendanceList.render();
    this.timepunchListener();
    this.startClock();
    console.log(new Date());
  }

  startClock() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  }

  updateCurrentTime = () => {
    const timeString = this.timeFormatter.format(new Date());
    const timeDisplay = this.container.querySelector('.timer .current-displayer');
    if (timeDisplay) {
      timeDisplay.textContent = timeString;
    }
  };

  timepunchListener = () => {
    const puncherButton = this.container.querySelector('.puncher');
    puncherButton.addEventListener('click', async () => {
      try {
        this.status += 1;
        const requestData = {
          employeeId: sessionStorage.getItem('id'),
          INtime: sessionStorage.getItem('INtime'),
          OUTtime: sessionStorage.getItem('OUTtime'),
          status: sessionStorage.getItem('status'),
        };
        console.log(requestData);
        const response = await axios.post('/api/employees/setTime', requestData);
        if (response) {
          const responseData = response.data;
          console.log(responseData);
          sessionStorage.setItem('status', responseData.status);
          sessionStorage.setItem('OUTtime', responseData.OUTtime);
          sessionStorage.setItem('INtime', responseData.INtime);
          this.updateWorkStatus();
        }
      } catch (e) {
        console.error('출퇴근 시간 등록 실패', e);
      }
    });
  };

  updateWorkStatus() {
    const statusDisplay = this.container.querySelector('.working-status .current-displayer');
    const puncherButton = this.container.querySelector('.puncher');

    statusDisplay.textContent = this.status === 1 ? '근무중' : '퇴근';
    puncherButton.textContent = this.status === 1 ? '근무종료' : '근무시작';

    puncherButton.disabled = this.status === 2;
  }
}
