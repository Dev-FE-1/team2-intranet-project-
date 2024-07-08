import './LeaveApplicationItem.css';
import avatarDefaultImg from '../../assets/images/avatar-default.jpg';
import { currentUser } from './dummyData';

export default class LeaveApplicationItem {
  constructor() {
    this.avatarDefaultImg = avatarDefaultImg;
    this.currentUserId = currentUser.id;
  }

  renderLeaveItem(userData) {
    const { id, title, content, attendanceType, name, attendanceApplyTime, userId } = userData;
    // 현재 사용자가 정의되어 있고, 현재 사용자의 ID가 글 작성자의 ID와 동일한지 확인
    return /* HTML */ `
      <li class="leave-application-item" data-id="${id}">
        <img src="${avatarDefaultImg}" alt="profile-image" class="photo" />
        <div class="formdata">
          <span>${attendanceType}</span>
          <div>
            <p class="eave-application-item__title">제목: ${title}</p>
            <p class="leave-application-item__conetent">내용: ${content}</p>
            <p class="eave-application-item__attendanceApplyTime">${attendanceApplyTime}</p>
          </div>
        </div>
        <span class="author">${name}</span>
        ${this.currentUserId === userId ? `${this.renderEditAndDeleteButton(id)}` : ''}
      </li>
    `;
  }

  renderEditAndDeleteButton(id) {
    return /* HTML */ ` <div class="btn-for-update">
      <button class="btn-edit" data-id="${id}">수정</button>
      <button class="btn-delete" data-id="${id}">삭제</button>
    </div>`;
  }
}
