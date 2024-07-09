import express from 'express';
import { ResponseDTO } from '../DTO/responseDTO.js';
import { RequestAttendanceDTO } from './RequestAttendaceDTO.js';
import { RequestPatchAttendanceDTO } from './RequestPatchAttendanceDTO.js';

export class AttendanceController {
  constructor({ attendanceService }) {
    this.attendanceService = attendanceService;
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.post('/', this.createAttendance.bind(this));
    this.router.get('/', this.getAllAttendanceList.bind(this));
    this.router.post('/filter/by-login-id', this.getAttendanceListById.bind(this));
    this.router.get('/filter/by-type', this.getAttendanceListByAttendanceType.bind(this));
    this.router.get('/filter/by-username', this.getAttendanceListByUserName.bind(this));
    this.router.put('/update', this.updateAttendanceByLoginId.bind(this));
    this.router.delete('/delete', this.deleteAttendancebyIdAndUserId.bind(this));
  }

  // 근태 신청하기
  // req.body = { user_id, title, content, attendance_start_date, attendance_days, attendance_type, attendance_apply_time }
  async createAttendance(req, res) {
    try {
      const attendance = await this.attendanceService.createAttendance(
        new RequestAttendanceDTO(req.body),
      );
      res.status(200).json(ResponseDTO.success(attendance));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to create attendance'));
    }
  }

  // 전직원 근태 전체 신청 내역 조회하기
  async getAllAttendanceList(req, res) {
    try {
      const attendanceList = await this.attendanceService.getAllAttendanceList();
      res.status(200).json(ResponseDTO.success(attendanceList));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to get all attendance list'));
    }
  }

  // 근태 신청 내역 조회하기 - 아이디로 조회
  // req.body = { userId }
  async getAttendanceListById(req, res) {
    try {
      const { userId } = req.body;
      const attendanceList = await this.attendanceService.getAttendanceListById(userId);
      res.status(200).json(ResponseDTO.success(attendanceList));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to get attendance list by ID'));
    }
  }

  // 근태 신청 내역 조회 - 근태 신청 타입으로 조회
  // req.query = { attendanceType }
  async getAttendanceListByAttendanceType(req, res) {
    try {
      const { attendanceType } = req.query;
      const attendanceList =
        await this.attendanceService.getAttendanceListByAttendanceType(attendanceType);
      res.status(200).json(ResponseDTO.success(attendanceList));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to get attendance list by attendance type'));
    }
  }

  // 근태 신청 내역 조회 - 사용자 이름으로 조회
  // req.query = { userName }
  async getAttendanceListByUserName(req, res) {
    try {
      const { userName } = req.query;
      const attendanceList = await this.attendanceService.getAttendanceListByUserName(userName);
      res.status(200).json(ResponseDTO.success(attendanceList));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to get attendance list by user name'));
    }
  }

  // 근태 신청 내역 아이디와 근태신청번호(id)를 이용해서 수정하기
  // req.body = { loginId, title, content, attendance_start_date, attendance_days, attendance_type, attendance_apply_time}
  async updateAttendanceByLoginId(req, res) {
    try {
      const requestPatchAttendanceDTO = new RequestPatchAttendanceDTO(req.body);
      const updatedAttendance =
        await this.attendanceService.updateAttendanceByLoginId(requestPatchAttendanceDTO);
      res.status(200).json(ResponseDTO.success(updatedAttendance));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to update attendance'));
    }
  }

  // 근태 신청 내역 아이디와 신청내역 번호(id)를 이용해서 삭제하기
  // req.body = { loginId, id }
  async deleteAttendancebyIdAndUserId(req, res) {
    try {
      const { loginId, id } = req.body;
      const result = await this.attendanceService.deleteAttendancebyIdAndUserId(loginId, id);
      res.status(200).json(ResponseDTO.success(result));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to delete attendance'));
    }
  }
}
