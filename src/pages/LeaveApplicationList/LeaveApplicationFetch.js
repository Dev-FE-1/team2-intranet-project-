import axios from 'axios';
import { isEmpty } from 'lodash';

const attendanceApiType = Object.freeze({
  annual_leave: '연차',
  half_day: '반차',
  early_out: '조퇴',
  etc: '기타',
});

export class LeaveAppplicationFetch {
  constructor(params) {
    this.urlpath = params.urlpath || `api/v1/attendance`;
  }

  async getLeaveApplication() {
    try {
      const response = await axios.get(`${this.urlpath}`);
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
  }

  // {{orgin}}{{/api/version/}}attendance
  // 근태 신청을 추가하는 API post 요청
  async fetchCreateLeaveApplication(formDataDTO) {
    const response = await axios.post(this.urlpath, {
      data: formDataDTO,
    });
    const data = await response.json();
    return data;
  }

  // {{orgin}}{{/api/version/}}attendance/update
  // 근태 신청 내역을 수정 하는 API put 요청
  async fetchUpdateLeaveApplication(formDataDTO) {
    const { id, attendanceType } = formDataDTO;

    console.log(id, attendanceType);

    if (isEmpty(id) || isEmpty(attendanceType)) {
      console.error('id, attendanceType is required');
    }
    const response = await axios.put(`${this.urlpath}/update`, {
      data: formDataDTO,
    });
    const data = await response.json();
    return data;
  }

  // {{orgin}}{{/api/version/}}attendance/delete
  // 근태 신청 내역을 삭제 하는 API delete
  async fetchDeleteLeaveApplication(itemId) {
    try {
      const response = await axios.delete(`${this.urlpath}/delete`, {
        data: { id: parseInt(itemId) },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
