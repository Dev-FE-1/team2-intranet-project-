const currentUser = {
  id: 'H2410014',
  name: '신혜진',
};

const attendanceType = Object.freeze({
  'annual-leave': '연차',
  'half-dayoff': '반차',
  'sick-leave': '조퇴',
  others: '기타',
});

const attendancesUserData = [
  {
    id: 1,
    userId: 'H2410014',
    title: '여름 휴가',
    name: '신혜진',
    content: '가족과 함께 제주도 여행 예정입니다.',
    attendanceStartDate: '2023-07-15',
    attendanceDays: 5,
    attendanceType: '연차',
    attendanceApplyTime: '2024-07-08 23:22:11',
  },
  {
    id: 2,
    userId: 'H2410014',
    title: '병원 진료',
    name: '신혜진',
    content: '정기 건강 검진을 위한 반차 신청입니다.',
    attendanceStartDate: '2023-06-28',
    attendanceDays: 0.5,
    attendanceType: '반차',
    attendanceApplyTime: '2024-07-08 23:22:11',
  },
  {
    id: 3,
    userId: 'H2205028',
    title: '개인 사정',
    name: '김낙연',
    content: '개인적인 용무로 조퇴 신청합니다.',
    attendanceStartDate: '2023-06-23',
    attendanceDays: 0.25,
    attendanceType: '조퇴',
    attendanceApplyTime: '2024-07-08 23:22:11',
  },
  {
    id: 4,
    userId: 'H2410014',
    title: '경조사 참석',
    name: '신혜진',
    content: '친구 결혼식 참석을 위한 연차 신청입니다.',
    attendanceStartDate: '2023-08-05',
    attendanceDays: 1,
    attendanceType: '연차',
    attendanceApplyTime: '2024-07-08 23:22:11',
  },
  {
    id: 5,
    userId: 'C2317042',
    title: '재택근무',
    name: '오낙연',
    content: '코로나 의심 증상으로 인한 재택근무 신청입니다.',
    attendanceStartDate: '2023-06-30',
    attendanceDays: 3,
    attendanceType: '기타',
    attendanceApplyTime: '2024-07-08 23:22:11',
  },
];

export { currentUser, attendancesUserData, attendanceType };
