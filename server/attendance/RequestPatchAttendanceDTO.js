import date from 'date-and-time';
import { AttendanceType } from './AttendanceType.js';

const attendancePatchDefaultDTO = {
  attendanceType: AttendanceType.EaryOut,
  title: '조퇴를 신청합니다.',
  content: '오늘 조퇴를 신청합니다.',
  attendanceStartDate: date.format(new Date(), 'YYYY-MM-DD'),
  attendanceDays: 1,
  attendanceApplyTime: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
};

export class RequestPatchAttendanceDTO {
  constructor({
    id,
    loginId,
    attendanceType,
    title,
    content,
    attendanceStartDate,
    attendanceDays,
    attendanceApplyTime,
  }) {
    this.id = id;
    this.loginId = loginId;
    this.attendanceType =
      AttendanceType[attendanceType] || attendancePatchDefaultDTO.attendanceType;
    this.title = title || attendancePatchDefaultDTO.title;
    this.content = content || attendancePatchDefaultDTO.content;
    this.attendanceStartDate = attendanceStartDate || attendancePatchDefaultDTO.attendanceStartDate;
    this.attendanceDays = attendanceDays || attendancePatchDefaultDTO.attendanceDays;
    this.attendanceApplyTime = attendanceApplyTime || attendancePatchDefaultDTO.attendanceApplyTime;
  }
}
