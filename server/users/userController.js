import express from 'express';
import { ResponseDTO } from '../DTO/responseDTO.js';
import loadish from 'lodash';
export class UserController {
  constructor({ userService }) {
    this.userService = userService;
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.post('/', this.createUser.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/show-info', this.getUserByLoginId.bind(this));
    this.router.post('/login', this.getUserByLoginIdAndPassword.bind(this));
    this.router.put('/edit', this.updateByLoginId.bind(this));
    this.router.delete('/delete', this.deleteByLoginId.bind(this));
    this.router.delete('/delete-many', this.deleteByLoginIds.bind(this));
    this.router.put('/restore', this.restoreByLoginId.bind(this));
  }

  // 회원가입,
  // => req.body: { loginId, password, name, email, phone }
  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body.data);
      res.status(200).json(ResponseDTO.success(user));

      if (loadish.isEmpty(user)) {
        return res.status(500).json(ResponseDTO.fail('Failed to create user'));
      }
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to create user'));
    }
  }

  // 회원 전체 조회
  async getAll(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(ResponseDTO.success(users));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to get all users'));
    }
  }

  // 계정 개인 정보 조회
  // => req.body: { loginId }
  async getUserByLoginId(req, res) {
    const { loginId } = req.body;

    const user = await this.userService.getUserByLoginId(loginId);

    if (!loadish.isEmpty(user)) {
      res.status(200).json(ResponseDTO.success(user));
    } else {
      return res.status(500).json(ResponseDTO.fail('Failed to get user info'));
    }
  }

  // 로그인
  // => req.body: { loginId, password }
  async getUserByLoginIdAndPassword(req, res) {
    const { loginId, password } = req.body;
    const user = await this.userService.getUserByLoginIdAndPassword(loginId, password);
    if (!loadish.isEmpty(user)) {
      res.status(200).json(ResponseDTO.success(user));
    } else {
      res.status(401).json(ResponseDTO.fail('Login failed'));
    }
  }

  // 계정 개인정보 수정
  // => req.body: { loginId, password, name, email, phone }
  async updateByLoginId(req, res) {
    try {
      const user = await this.userService.updateByLoginId(req.body.data);
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Failed to update user date' });
    }
  }

  // 계정 삭제
  // => req.body: { loginId }
  async deleteByLoginId(req, res) {
    const { loginId } = req.body;

    try {
      const deleted = await this.userService.deleteByLoginId(loginId);
      res.status(200).json(ResponseDTO.success(deleted));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to delete user'));
    }
  }

  // 계정 여러개 삭제
  // loginIds: [loginId1, loginId2, ...]
  // => req.body: { loginIds: [loginId1, loginId2, ...] }
  async deleteByLoginIds(req, res) {
    const { loginIds } = req.body;
    try {
      const deletedIds = await this.userService.deleteByLoginIds(loginIds);
      res.status(200).json(ResponseDTO.success(deletedIds));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to delete many users'));
    }
  }

  // 계정 복구
  // => req.body: { loginId }
  async restoreByLoginId(req, res) {
    const { loginId } = req.body;
    try {
      const restored = await this.userService.restoreByLoginId(loginId);
      res.status(200).json(ResponseDTO.success(restored));
    } catch (e) {
      console.error(e);
      res.status(500).json(ResponseDTO.fail('Failed to restore user'));
    }
  }
}
