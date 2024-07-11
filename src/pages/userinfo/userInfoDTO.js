class UserInfoDTO {
  constructor(data) {
    this.id = data['data-id'];
    this.employeeId = data['user-id'];
    this.name = data['user-name'];
    this.password = data['user-password'];
    this.email = data['user-email'];
    this.position = data['user-position'];
    this.phone = data['user-phone'];
    // this.profileImg = data['user-profileImg'];
  }
}

export { UserInfoDTO };
// const data = {
//   id: 1,
//   employeeId: 'H2410001',
//   name: '김철수',
//   password: 'P@ssw0rd!',
//   email: 'chulsoo.kim@company.com',
//   position: '대리',
//   phone: '010-1234-5678',
//   profileImg: null,
// };
