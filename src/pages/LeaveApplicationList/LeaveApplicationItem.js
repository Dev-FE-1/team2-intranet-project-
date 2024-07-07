import './LeaveApplicationItem.css';
export default class LeaveApplicationItem {
  constructor(props, currentUser) {
    this.props = props;
    this.currentUser = currentUser;
  }

  render() {
    const { id, userId, typeForLeave, applicationTitle, applicationDesc } = this.props;
    // 현재 사용자가 정의되어 있고, 현재 사용자의 ID가 글 작성자의 ID와 동일한지 확인
    const canEdit = this.currentUser && this.currentUser.id === userId;
    return /* HTML */ `
      <li class="leave-application-item" data-id="${id}">
        <img src="/src/assets/images/avatar-default.jpg" alt="profile-image" class="photo" />
        <div class="formdata">
          <span>${typeForLeave}</span>
          <div>
            <p class="title">제목: ${applicationTitle}</p>
            <p class="desc">내용: ${applicationDesc}</p>
          </div>
        </div>
        <div class="author">${'글쓴이'}</div>
        ${canEdit
          ? `
      <div class="btn-for-update">
          <button class="btn-edit" data-id="${id}">수정</button>
      <button class="btn-delete" data-id="${id}">삭제</button>
      </div>
    `
          : ''}
      </li>
    `;
  }
}
