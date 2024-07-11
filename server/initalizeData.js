import InMemoDatabase from './inMemoDatabase.js';
const indb = new InMemoDatabase();

const galleryData = [
  {
    image: 'https://imgur.com/f2oYh3A.jpg',
    title: '2016년 하반기 워크샵',
    date: '2016.10.01',
  },
  {
    image: 'https://imgur.com/Cikg2Ra.jpg',
    title: '2017년 상반기 워크샵',
    date: '2017.03.01',
  },
  {
    image: 'https://imgur.com/qWNskAP.jpg',
    title: '2017년 하반기 워크샵',
    date: '2017.10.01',
  },
  {
    image: 'https://imgur.com/W94F4Zh.jpg',
    title: '2018년 상반기 워크샵',
    date: '2018.03.01',
  },
  {
    image: 'https://imgur.com/Qg7HnyQ.jpg',
    title: '2018년 하반기 워크샵',
    date: '2018.10.01',
  },
  {
    image: 'https://imgur.com/PtID6pD.jpg',
    title: '2019년 상반기 워크샵',
    date: '2019.03.01',
  },
  {
    image: 'https://imgur.com/HacHnZ5.jpg',
    title: '2019년 하반기 워크샵',
    date: '2019.10.01',
  },
  {
    image: 'https://imgur.com/hEtaSWs.jpg',
    title: '2020년 상반기 워크샵',
    date: '2020.03.01',
  },
  {
    image: 'https://imgur.com/pNbapED.jpg',
    title: '2020년 하반기 워크샵',
    date: '2020.10.01',
  },
  {
    image: 'https://imgur.com/ZnkIS3B.jpg',
    title: '2021년 상반기 워크샵',
    date: '2021.03.01',
  },
  {
    image: 'https://imgur.com/7f3kJzZ.jpg',
    title: '2021년 하반기 워크샵',
    date: '2021.10.01',
  },
  {
    image: 'https://imgur.com/9yWnNts.jpg',
    title: '2022년 상반기 워크샵',
    date: '2022.03.01',
  },
  {
    image: 'https://imgur.com/5RAZByo.jpg',
    title: '2022년 하반기 워크샵',
    date: '2022.10.01',
  },
  {
    image: 'https://imgur.com/iLbCcv9.jpg',
    title: '2023년 상반기 워크샵',
    date: '2023.03.01',
  },
  {
    image: 'https://imgur.com/qpzH5HB.jpg',
    title: '2023년 하반기 워크샵',
    date: '2023.10.01',
  },
  {
    image: 'https://imgur.com/3AgLMFE.jpg',
    title: '2024년 상반기 워크샵',
    date: '2024.03.01',
  },
];

const attendances = [
  {
    name: '프론트',
    type: '조퇴',
    content: '조퇴 할래요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '김백엔드',
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
  {
    name: '프론트',
    type: '조퇴',
    content: '조퇴 할래요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '김백엔드',
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
  {
    name: '프론트',
    type: '조퇴',
    content: '조퇴 할래요.',
    profileImg: 'https://i.imgur.com/4RPlpYo.png',
  },
  {
    name: '김백엔드',
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
    name: '김철수',
    email: 'chulsoo.kim@company.com',
    phone: '010-1234-5678',
    position: '대리',
    employeeId: 'H2410001',
    // password: '1111',
    password: 'P@ssw0rd!',
  },
  {
    name: '이영희',
    email: 'younghee.lee@company.com',
    phone: '010-2345-6789',
    position: '과장',
    employeeId: 'H2310002',
    password: 'P@ssw0rd!',
  },
  {
    name: '박민준',
    email: 'minjun.park@company.com',
    phone: '010-3456-7890',
    position: '차장',
    employeeId: 'H2210003',
    password: 'P@ssw0rd!',
  },
  {
    name: '정수진',
    email: 'sujin.jung@company.com',
    phone: '010-4567-8901',
    position: '부장',
    employeeId: 'H2110004',
    password: 'P@ssw0rd!',
  },
  {
    name: '홍길동',
    email: 'gildong.hong@company.com',
    phone: '010-5678-9012',
    position: '대리',
    employeeId: 'C2410005',
    password: 'P@ssw0rd!',
  },
  {
    name: '송지원',
    email: 'jiwon.song@company.com',
    phone: '010-6789-0123',
    position: '대리',
    employeeId: 'H2410006',
    password: '6666',
  },
  {
    name: '강민호',
    email: 'minho.kang@company.com',
    phone: '010-7890-1234',
    position: '과장',
    employeeId: 'H2310007',
    password: '7777',
  },
  {
    name: '윤서연',
    email: 'seoyeon.yoon@company.com',
    phone: '010-8901-2345',
    position: '대리',
    employeeId: 'C2410008',
    password: '8888',
  },
  {
    name: '임재현',
    email: 'jaehyun.lim@company.com',
    phone: '010-9012-3456',
    position: '차장',
    employeeId: 'H2210009',
    password: '9999',
  },
  {
    name: '오은주',
    email: 'eunju.oh@company.com',
    phone: '010-0123-4567',
    position: '대리',
    employeeId: 'H2410010',
    password: '1010',
  },
  {
    name: '서진우',
    email: 'jinwoo.seo@company.com',
    phone: '010-1122-3344',
    position: '과장',
    employeeId: 'H2310011',
    password: '1212',
  },
  {
    name: '최다은',
    email: 'daeun.choi@company.com',
    phone: '010-2233-4455',
    position: '대리',
    employeeId: 'C2410012',
    password: '1313',
  },
  {
    name: '권혁준',
    email: 'hyukjun.kwon@company.com',
    phone: '010-3344-5566',
    position: '부장',
    employeeId: 'H2110013',
    password: '1414',
  },
  {
    name: '장미란',
    email: 'miran.jang@company.com',
    phone: '010-4455-6677',
    position: '대리',
    employeeId: 'H2410014',
    password: '1515',
  },
  {
    name: '신동훈',
    email: 'donghoon.shin@company.com',
    phone: '010-5566-7788',
    position: '과장',
    employeeId: 'H2310015',
    password: '1616',
  },
  {
    name: '백승민',
    email: 'seungmin.baek@company.com',
    phone: '010-6677-8899',
    position: '차장',
    employeeId: 'H2210016',
    password: '1717',
  },
  {
    name: '류한솔',
    email: 'hansol.ryu@company.com',
    phone: '010-7788-9900',
    position: '대리',
    employeeId: 'C2410017',
    password: '1818',
  },
  {
    name: '문예진',
    email: 'yejin.moon@company.com',
    phone: '010-8899-0011',
    position: '대리',
    employeeId: 'H2410018',
    password: '1919',
  },
  {
    name: '조성우',
    email: 'sungwoo.cho@company.com',
    phone: '010-9900-1122',
    position: '과장',
    employeeId: 'H2310019',
    password: '2020',
  },
  {
    name: '한지민',
    email: 'jimin.han@company.com',
    phone: '010-0011-2233',
    position: '부장',
    employeeId: 'H2110020',
    password: '2121',
  },
  {
    name: '남궁원',
    email: 'won.namkung@company.com',
    phone: '010-1122-3344',
    position: '대리',
    employeeId: 'C2410021',
    password: '2222',
  },
  {
    name: '고은비',
    email: 'eunbi.ko@company.com',
    phone: '010-2233-4455',
    position: '대리',
    employeeId: 'H2410022',
    password: '2323',
  },
  {
    name: '황민석',
    email: 'minseok.hwang@company.com',
    phone: '010-3344-5566',
    position: '과장',
    employeeId: 'H2310023',
    password: '2424',
  },
  {
    name: '유지훈',
    email: 'jihoon.yoo@company.com',
    phone: '010-4455-6677',
    position: '차장',
    employeeId: 'H2210024',
    password: '2525',
  },
  {
    name: '안소희',
    email: 'sohee.ahn@company.com',
    phone: '010-5566-7788',
    position: '대리',
    employeeId: 'C2410025',
    password: '2626',
  },
];
const workTimeData = [
  {
    employeeId: 'H2410001',
    INtime: '2024-07-06 09:30:00',
    OUTtime: '2024-07-06 17:30:00',
    status: 2,
  },
  {
    employeeId: 'H2410001',
    INtime: '2024-07-07 09:30:00',
    OUTtime: '2024-07-07 17:30:00',
    status: 2,
  },
  {
    employeeId: 'H2410001',
    INtime: '2024-07-08 09:30:00',
    OUTtime: '2024-07-08 17:30:00',
    status: 2,
  },
  {
    employeeId: 'H2410001',
    INtime: '2024-07-09 09:30:00',
    OUTtime: '2024-07-09 17:30:00',
    status: 2,
  },
  //2024-07-10 09:30:00
  {
    employeeId: 'H2410001',
    INtime: '',
    OUTtime: '',
    status: 0,
  },
  {
    employeeId: 'H2310002',
    INtime: '2024-07-09 09:30:00',
    OUTtime: '2024-07-09 17:30:00',
    status: 2,
  },
  {
    employeeId: 'H2210003',
    INtime: '2024-07-09 09:30:00',
    OUTtime: '2024-07-09 17:30:00',
    status: 2,
  },
  {
    employeeId: 'H2110004',
    INtime: '2024-07-09 09:30:00',
    OUTtime: '2024-07-09 17:30:00',
    status: 2,
  },
  {
    employeeId: 'C2410005',
    INtime: '2024-07-09 09:30:00',
    OUTtime: '2024-07-09 17:30:00',
    status: 2,
  },
];

// console.log('총 직원 수:', employees.length);

const initializeDatabase = () => {
  try {
    indb.insertEmployees(employees);
    indb.insertAttendances(attendances);
    indb.setTimes(workTimeData);
  } catch (error) {
    console.error('inMemoryDatabase 초기화 실패:', error);
  }
};

export { initializeDatabase, indb, galleryData };
