import { camelToSnakeCase } from './camelToSnakeCase.js';
import { snakeToCamelCase } from './snakeToCamelCase.js';

export class EntityKeyConverter {
  constructor() {}

  // 객체의 키를 스네이크케이스로 변환, 단일 객체에 대한 변환
  convertKeysToSnakeCase(keys) {
    return keys.map((key) => camelToSnakeCase(key));
  }

  // 필드(배열 안에 객체가 들어 있는 형태)를 스네이크케이스로 변환, 배열 안에 객체가 들어 있는 형태에 대한 변환
  convertFieldsToCamelCase(fields) {
    return fields.map((field) => {
      const newField = {};
      for (const key in field) {
        newField[snakeToCamelCase(key)] = field[key];
      }
      return newField;
    });
  }

  // 객체의 키를 카멜케이스로 변환, 단일 객체에 대한 변환
  convertEntitySnakeToCamelCaseKeys(entity) {
    const newEntity = {};
    for (const key in entity) {
      newEntity[snakeToCamelCase(key)] = entity[key];
    }
    return newEntity;
  }
}
