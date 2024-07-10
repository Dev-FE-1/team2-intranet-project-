// 스네이크케이스를 카멜케이스로 변환하는 함수
// ex) snakeToCamelCase('login_id') => 'loginId'
function snakeToCamelCase(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

export { snakeToCamelCase };
