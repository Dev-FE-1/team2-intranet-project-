import loadish from 'lodash';
import { attendancesUserDatas } from './attendanceDummyDatas.js';
export class AttendanceService {
  constructor({ attendanceRepository }) {
    this.attendanceRepository = attendanceRepository;
    this.insertDummyDatasToAttendanceTable();
  }

  // 근태 신청하기
  async createAttendance(requestDTO) {
    try {
      return await this.attendanceRepository.createAttendace(requestDTO);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to create attendance');
    }
  }

  // 전직원 근태 전체 신청 내역 조회하기
  async getAllAttendanceList() {
    try {
      return await this.attendanceRepository.getAllAttendanceList();
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get all attendance list');
    }
  }

  // 근태 신청 내역 조회하기 - 아이디로 조회
  async getAttendanceListById(userId) {
    try {
      return await this.attendanceRepository.getAttendanceListById(userId);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get attendance list by ID');
    }
  }

  // 근태 신청 내역 조회 - 근태 신청 타입으로 조회
  async getAttendanceListByAttendanceType(attendanceType) {
    try {
      return await this.attendanceRepository.getAttendanceListByAttendanceType(attendanceType);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get attendance list by attendance type');
    }
  }

  // 근태 신청 내역 조회 - 사용자 이름으로 조회
  async getAttendanceListByUserName(userName) {
    try {
      return await this.attendanceRepository.getAttendanceListByUserName(userName);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to get attendance list by user name');
    }
  }
  // 근태 신청 내역 아이디와 근태신청번호(id)를 이용해서 수정하기
  async updateAttendanceByLoginId(requestPatchAttendanceDTO) {
    try {
      const updatedAttendance =
        await this.attendanceRepository.updateAttendanceByLoginId(requestPatchAttendanceDTO);
      if (loadish.isEmpty(updatedAttendance)) {
        throw new Error('Failed to update attendance, is empty');
      }
      return updatedAttendance;
    } catch (e) {
      console.error(e);
      throw new Error('Failed to update attendance');
    }
  }

  // 근태 신청 내역 번호로 삭제하기
  async deleteAttendancebyIdAndUserId(id) {
    try {
      return await this.attendanceRepository.deleteAttendancebyIdAndUserId(id);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to delete attendance');
    }
  }

  // 근태 신청 내역 초기 데이터 넣기
  async insertDummyDatasToAttendanceTable() {
    try {
      const dummyDatas = attendancesUserDatas;
      dummyDatas.map(async (dummydata) => await this.createAttendance(dummydata));
    } catch (e) {
      console.error(e);
    }
  }
}
