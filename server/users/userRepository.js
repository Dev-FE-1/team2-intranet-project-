import { BaseRepository } from '../BaseRepository/BaseRepository.js';
import { camelToSnakeCase } from '../converter/camelToSnakeCase.js';
import { snakeToCamelCase } from '../converter/snakeToCamelCase.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('Users');
  }

  // 회원가입
  async create(entity) {
    if (this.db == null) {
      await this.initialize();
    }
    const { id, ...createEntity } = entity;
    const keys = this.convertKeysToSnakeCase(Object.keys(createEntity));
    const values = Object.values(createEntity);

    const placeholders = keys.map(() => '?').join(',');

    try {
      const { lastID } = await this.db.run(
        `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (${placeholders})`,
        values,
      );
      return { id: id || lastID, ...createEntity };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 직원 전체 조회
  async getAll() {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      const result = await this.db.all(
        `SELECT id, employee_id, name, password, email, position, phone, profile_img FROM ${this.tableName} WHERE is_deleted = 0
        order by id desc`,
      );
      return this.convertFieldsToCamelCase(result);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 직원 조회: 이메일로 조회
  async getByEmail(email) {
    if (this.db == null) {
      await this.initialize();
    }

    try {
      return await this.db.get(
        `SELECT  id, employee_id, name, password, email, position, phone, profile_img FROM ${this.tableName} WHERE email = ?
      AND is_deleted = 0
      `,
        email,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 직원 조회: 아이디로 조회
  async getByLoginId(emplyeeId) {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      const result = await this.db.get(
        `SELECT id, employee_id, name, password, email, position, phone, profile_img
      FROM ${this.tableName} WHERE employee_id = ?
      AND is_deleted = 0`,
        emplyeeId,
      );
      return this.snakeToCamelCaseKeys(result);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 로그인: 아이디와 비밀번호로 조회
  async getByLoginIdAndPassword(loginId, password) {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      const result = await this.db.get(
        `SELECT id, employee_id, name, password, email, position, phone, profile_img 
        FROM ${this.tableName} WHERE login_id = ? AND password = ?
        AND is_deleted = 0`,
        loginId,
        password,
      );
      return this.snakeToCamelCaseKeys(result);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 계정 수정
  async updateByLoginId(entity) {
    if (this.db == null) {
      await this.initialize();
    }
    const { id, ...updateEntity } = entity;
    const keys = this.convertKeysToSnakeCase(Object.keys(updateEntity));
    const values = Object.values(updateEntity);

    const sets = keys.map((key) => `${key} = ?`).join(', ');

    try {
      if (!id) {
        const { employeeId } = updateEntity;
        return await this.db.run(
          `UPDATE ${this.tableName} SET ${sets} 
        WHERE employee_id=?
        `,
          [...values, employeeId],
        );
      } else {
        return await this.db.run(
          `UPDATE ${this.tableName} SET ${sets} 
        WHERE id=?
        `,
          [...values, id],
        );
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 여러개의 계정 삭제
  async deleteByLoginIds(employeeIds) {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      await this.db.run(
        `UPDATE ${this.tableName} 
      SET is_deleted = 1
      WHERE employeeId IN (${employeeIds.join(',')})
      AND is_deleted = 0`,
      );
      return { employeeIds };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  //  계정 삭제
  async deleteByLoginId(employeeId) {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      await this.db.run(
        `UPDATE ${this.tableName} 
      SET is_deleted = 1
      WHERE employeeId = ?
      AND is_deleted = 0`,
        employeeId,
      );
      return { employeeId };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  //  계정 복구
  async restoreByLoginId(loginId) {
    if (this.db == null) {
      await this.initialize();
    }
    try {
      await this.db.run(
        `UPDATE ${this.tableName} 
      SET is_deleted = 0
      WHERE login_id = ?
      AND is_deleted = 1`,
        loginId,
      );
      return { loginId };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // 회원가입 필드 검증
  verifyCreateFields(entity) {
    if (!entity.login_id || !entity.password || !entity.name) {
      throw new Error('login_id, password, name 가 필요합니다.');
    }
  }

  // json 형식을 키 값을 스네이크케이스로 변환
  convertKeysToSnakeCase(keys) {
    return keys.map((key) => camelToSnakeCase(key));
  }

  // 데이터베이스에서 받은 데이터를 json 필드로 변환
  convertFieldsToCamelCase(fields) {
    return fields.map((field) => {
      const newField = {};
      for (const key in field) {
        newField[snakeToCamelCase(key)] = field[key];
      }
      return newField;
    });
  }

  // json객체 형태의 카멜케이스로 변환
  snakeToCamelCaseKeys(entity) {
    const newEntity = {};
    for (const key in entity) {
      newEntity[snakeToCamelCase(key)] = entity[key];
    }
    return newEntity;
  }
}
