import './LeaveApplicationItem.css';
import { currentUser } from './dummyData';

import '../attendancePreview/AttendanceList.css';
import { attendanceTypeStyleClass } from '../attendancePreview/AttendanceListItems';

export default class LeaveApplicationItem {
  constructor() {
    this.currentUserId = currentUser.id;
  }

  renderLeaveItem(userData) {
    const { id, title, content, attendanceType, name, attendanceApplyTime, userId } = userData;
    // 현재 사용자가 정의되어 있고, 현재 사용자의 ID가 글 작성자의 ID와 동일한지 확인
    return /* HTML */ `
      <li class="leave-application-item" data-id="${id}">
        <img src="https://imgur.com/qr7cBFt.jpg" alt="profile-image" class="photo" />
        <div class="formdata">
          <span class=${attendanceTypeStyleClass[attendanceType]}>${attendanceType}</span>
          <div>
            <p class="leave-application-item__title">제목: ${title}</p>
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
