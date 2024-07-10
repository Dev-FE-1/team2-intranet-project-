import date from 'date-and-time';
import { AttendanceType } from './AttendanceType.js';

const attendanceDefaultDTO = {
  attendanceType: AttendanceType.EaryOut,
  title: '조퇴를 신청합니다.',
  content: '오늘 조퇴를 신청합니다.',
  attendanceStartDate: date.format(new Date(), 'YYYY-MM-DD'),
  attendanceDays: 1,
  attendanceApplyTime: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
};

export class RequestAttendanceDTO {
  constructor({
    loginId,
    attendanceType,
    title,
    content,
    attendanceStartDate,
    attendanceDays,
    attendanceApplyTime,
  }) {
    this.loginId = loginId;
    this.attendanceType = AttendanceType[attendanceType] || attendanceDefaultDTO.attendanceType;
    this.title = title || attendanceDefaultDTO.title;
    this.content = content || attendanceDefaultDTO.content;
    this.attendanceStartDate = attendanceStartDate || attendanceDefaultDTO.attendanceStartDate;
    this.attendanceDays = attendanceDays || attendanceDefaultDTO.attendanceDays;
    this.attendanceApplyTime = attendanceApplyTime || attendanceDefaultDTO.attendanceApplyTime;
  }
}

// const AttendanceType = Object.freeze({
//   AuunalLeave: "annual-leave", // 연차
//   HalfDay: "half-day", // 반차
//   EaryOut: "early-out", // 조퇴
//   Etc: "etc", // 기타
// });

// export { AttendanceType };

// console.log(AttendanceType['AuunalLeave']);
