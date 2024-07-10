// import date from 'date-and-time';
// // import { AttendanceType } from './AttendanceType.js';

// const attendanceFrontTypeEnum = Object.freeze({
//   annual_leave: '연차', // 연차
//   half_day: '반차', // 반차
//   early_out: '조퇴', // 조퇴
//   etc: '기타', // 기타
// });

// const attendancePatchDefaultDTO = {
//   attendanceType: attendanceFrontTypeEnum.early_out,
//   title: '조퇴를 신청합니다.',
//   content: '오늘 조퇴를 신청합니다.',
//   attendanceStartDate: date.format(new Date(), 'YYYY-MM-DD'),
//   attendanceDays: 1,
//   attendanceApplyTime: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
// };

// export class RequestPatchAttendanceDTO {
//   constructor(data) {
//     console.log(data.id);
//     console.log(data.itemId);
//     this.id = data.itemId;
//     this.userId = data.userLoginId || 'defaultID12';
//     this.attendanceType =
//       attendanceFrontTypeEnum[data.attendanceType] || attendancePatchDefaultDTO.attendanceType;
//     this.title = data.itle || attendancePatchDefaultDTO.title;
//     this.content = data.content || attendancePatchDefaultDTO.content;
//     this.attendanceStartDate =
//       data.attendanceStartDate || attendancePatchDefaultDTO.attendanceStartDate;
//     this.attendanceDays = data.attendanceDays || attendancePatchDefaultDTO.attendanceDays;
//     this.attendanceApplyTime =
//       data.attendanceApplyTime || attendancePatchDefaultDTO.attendanceApplyTime;
//   }
// }
