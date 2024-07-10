import axios from 'axios';
// import { at } from 'lodash';

const attendanceApiType = Object.freeze({
  annual_leave: '연차',
  half_day: '반차',
  early_out: '조퇴',
  etc: '기타',
});

const getAttendanceTest = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/attendance');
    const {
      data: { data: attendance },
    } = response;

    return attendance.map((item) => ({
      ...item,
      attendanceType: attendanceApiType[item.attendanceType],
    }));
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const attendances = await getAttendanceTest();
  console.log(attendances);
};

main();

console.log(attendanceApiType['annual-leave']);
