class UserInfoDTO {
  constructor(data) {
    this.id = data['data-id'];
    this.employeeId = data['user-id'];
    this.name = data['user-name'];
    this.password = data['user-password'];
    this.email = data['user-email'];
    this.position = data['user-position'];
    this.phone = data['user-phone'];
    this.profileImg = data['data-profileImg'];
  }
}

export { UserInfoDTO };
