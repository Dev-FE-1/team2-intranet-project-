import loadish from 'lodash';

const defaultPassword = '1q2w3e4r';
import { userdatadummydatas } from './userDummyDatas.js';
export class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
    this.initalizeUserTableByDummyDatas();
  }

  async getUserById(id) {
    return await this.userRepository.getById(id);
  }

  // 회원가입
  async createUser(user) {
    if (!user.password) {
      user.password = this.createPasswordDefault();
    }
    const resultUser = await this.userRepository.create(user);
    if (loadish.isEmpty(resultUser)) {
      throw new Error('Failed to create user in database');
    }
    return user;
  }

  // 회원 전체 조회
  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  // 로그인: 아이디와 비밀번호로 조회
  async getUserByLoginIdAndPassword(loginId, password) {
    return await this.userRepository.getByLoginIdAndPassword(loginId, password);
  }

  // 계정 개인정보 수정
  async updateByLoginId(loginId, user) {
    return await this.userRepository.updateByLoginId(loginId, user);
  }

  // 계정 개인 정보 조회
  async getUserByLoginId(loginId) {
    return await this.userRepository.getByLoginId(loginId);
  }

  // 계정 삭제
  async deleteByLoginId(loginId) {
    return await this.userRepository.deleteByLoginId(loginId);
  }

  // 계정 여러개 삭제
  async deleteByLoginIds(loginIds) {
    const promiseIds = loginIds.map(
      async (loginId) => await this.userRepository.deleteByLoginId(loginId),
    );
    return await Promise.all(promiseIds);
  }

  // 계정 복구
  async restoreByLoginId(loginId) {
    return await this.userRepository.restoreByLoginId(loginId);
  }

  createPasswordDefault() {
    return defaultPassword;
  }

  initalizeUserTableByDummyDatas() {
    userdatadummydatas.forEach(async (user) => {
      await this.createUser(user);
    });
  }
}
