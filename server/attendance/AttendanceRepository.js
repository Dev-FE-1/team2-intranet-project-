import { BaseRepository } from '../BaseRepository/BaseRepository.js';
import { AttendanceType } from './AttendanceType.js';
import { EntityKeyConverter } from '../utils/entityKeyConverter.js';
import { UserRepository } from '../users/userRepository.js';
import loadish from 'lodash';

export class AttendanceRepository extends BaseRepository {
  constructor() {
    super('Attendance');
    this.converter = new EntityKeyConverter();
    this.userRepository = new UserRepository();
  }

  // 근태 신청하기
  async createAttendace(requestDTO) {
    const { loginId, ...attendanceEntity } = requestDTO;
    const user = await this.userRepository.getByLoginId(loginId);
    if (loadish.isEmpty(user)) {
      throw new Error(`UserID not found, loginID: ${loginId}`);
    }

    await this.initialize();
    const keys = this.converter.convertKeysToSnakeCase(Object.keys(attendanceEntity));
    const values = Object.values(attendanceEntity);
    const placeholders = keys.map(() => '?').join(',');
    try {
      const { lastID } = await this.db.run(
        `INSERT INTO ${this.tableName} (USER_ID, ${keys.join(',')}) VALUES (${
          user.id
        }, ${placeholders})`,
        values,
      );
      return { id: lastID, ...attendanceEntity };
    } catch (e) {
      console.error(e);
    }
  }

  // 전직원 근태 전체 신청 내역 조회하기
  async getAllAttendanceList() {
    await this.initialize();
    try {
      const attendanceList = await this.db.all(
        `select
          a.id, u.login_id, u.name, title, content, attendance_start_date, attendance_days, attendance_type, attendance_apply_time
        from
          ${this.tableName} a, users u
        where a.user_id = u.id;`,
      );
      return this.converter.convertFieldsToCamelCase(attendanceList);
    } catch (e) {
      console.error(e);
    }
  }

  //   근태 신청 내역 조회하기 - 아이디로 조회
  async getAttendanceListById(loginId) {
    try {
      return await this.getAllAttendanceListByFilter(`login_id = '${loginId}'`);
    } catch (e) {
      console.error(e);
    }
  }

  // 근태 신청 내역 조회 - 근태 신청 타입으로 조회
  async getAttendanceListByAttendanceType(attendanceType) {
    try {
      return await this.getAllAttendanceListByFilter(
        `attendance_type = '${AttendanceType[attendanceType]}'`,
      );
    } catch (e) {
      console.error(e);
    }
  }

  // 근태 신청 내역 조회 -  직원 이름으로 조회
  async getAttendanceListByUserName(userName) {
    try {
      return await this.getAllAttendanceListByFilter(`u.name = '${userName}'`);
    } catch (e) {
      console.error(e);
    }
  }

  // 근태 신청 내역 조회
  async getAllAttendanceListByFilter(filter) {
    await this.initialize();
    try {
      const attendanceLists = await this.db.all(
        `select
          a.id, u.login_id, u.name, title, content, attendance_start_date, attendance_days, attendance_type, attendance_apply_time
        from
          ${this.tableName} a, users u
        where a.user_id = u.id and ${filter};`,
      );
      return this.converter.convertFieldsToCamelCase(attendanceLists);
    } catch (e) {
      console.error(e);
    }
  }

  // 근태 신청 내역 아이디와 근태신청번호(id)를 이용해서 수정하기
  async updateAttendanceByLoginId(requestPatchAttendanceDTO) {
    const { loginId, id, ...entity } = requestPatchAttendanceDTO;
    await this.initialize();
    const sets = this.converter
      .convertKeysToSnakeCase(Object.keys(entity))
      .map((key) => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(entity)];

    await this.db.run('BEGIN TRANSACTION');
    try {
      console.log(sets);
      await this.db.run(
        `
      update ${this.tableName} 
      SET ${sets} 
      where user_id = (select users.id from users where users.login_id = '${loginId}')
      and ${this.tableName}.id = ${id};
      `,
        values,
      );
      const updatedAttendance = await this.getAttendanceListById(loginId);
      await this.db.run('COMMIT');
      return updatedAttendance;
    } catch (e) {
      console.error(e);
    }
  }

  // 근태 신청 내역 아이디와 신청내역 번호(id)를 이용해서 삭제하기
  async deleteAttendancebyIdAndUserId(loginId, id) {
    await this.initialize();
    try {
      await this.db.run(
        `
      delete from ${this.tableName} 
      where ${this.tableName}.user_id = (select users.id from users where users.login_id = '${loginId}')
      AND ${this.tableName}.id = ?;
      `,
        id,
      );
      return { id };
    } catch (e) {
      console.error(e);
    }
  }
}
