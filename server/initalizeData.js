import InMemoDatabase from './inMemoDatabase.js';
const indb = new InMemoDatabase();

const attendances = [
  {
    name: '프론트',
    type: '조퇴',
    content: '조퇴 할래요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    type: '연차',
    content: '연차를 쓰고 싶어요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '고낙연',
    type: '기타',
    content: '기타 사유',
    profileImg: 'https://i.imgur.com/KM82VtW.png',
  },
  {
    name: '젠슨황',
    type: '반차',
    content: '나 반차 쓴다.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '김나성',
    type: '조퇴',
    content: ' 급성 장염으로 질병 조퇴 요청합니다.',
  },
];

const employees = [
  {
    name: '홍길동',
    email: '765idoll@gmail.com',
    phone: '010-1234-5678',
    position: '사원',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '김길동',
    email: 'kimPhoneHi256@gmail.com',
    phone: '010-1234-5678',
    position: '대리',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '이지은',
    email: 'jieun.lee@company.com',
    phone: '010-9876-5432',
    position: '과장',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '박철수',
    email: 'chulsoo.park@company.com',
    phone: '010-2468-1357',
    position: '차장',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '정미영',
    email: 'miyoung.jung@company.com',
    phone: '010-1357-2468',
    position: '부장',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '최영호',
    email: 'youngho.choi@company.com',
    phone: '010-3698-7412',
    position: '사원',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '김민지',
    email: 'minji.kim@company.com',
    phone: '010-7412-3698',
    position: '대리',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '송태영',
    email: 'taeyoung.song@company.com',
    phone: '010-8520-7413',
    position: '과장',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
  },
  {
    name: '임수진',
    email: 'sujin.lim@company.com',
    phone: '010-9632-8520',
    profileImg: 'https://i.imgur.com/JJEqrWE.png',
    position: '과장',
  },
  {
    name: '강동훈',
    email: 'donghoon.kang@company.com',
    phone: '010-7530-9514',
    position: '이사',
  },
];

const initializeDatabase = () => {
  try {
    indb.insertEmployees(employees);
    indb.insertAttendances(attendances);
  } catch (error) {
    console.error('inMemoryDatabase 초기화 실패:', error);
  }
};

export { initializeDatabase, indb };
