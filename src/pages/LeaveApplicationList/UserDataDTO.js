//    const { id, title, content, attendanceType, name, attendanceApplyTime, userId }
import date from 'date-and-time';
import { attendancesUserData } from './dummyData.js';

function Counter() {
  let count = attendancesUserData.length;
  return {
    getCount: () => count,
    increase: () => ++count,
    decrease: () => --count,
  };
}

const counter = Counter();

export class UserDataDTO {
  constructor(data) {
    this.id = counter.increase();
    this.title = data.title || '제목없음';
    this.content = data.content || '내용없음';
    this.attendanceType = data.attendanceType || '';
    this.name = data.name || '익명';
    this.attendanceApplyTime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    this.userId = data.userId || '';
  }
}

console.log(
  new UserDataDTO({
    title: '테스트 제목',
    content: '테스트 내용',
    attendanceType: '연차',
    name: '테스터',
    userId: 'H2410014',
  }),
);
