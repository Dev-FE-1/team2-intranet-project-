// 카멜케이스를 스네이크케이스로 변환하는 함수
// ex) camelToSnakeCase('loginId') => 'login_id'
function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export { camelToSnakeCase };
