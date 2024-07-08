import './LeaveApplicationForm.css';
import './LeaveApplicationList.css';
import avatarDefaultImg from '/src/assets/images/avatar-default.jpg';

export default class LeaveApplicationForm {
  constructor(container, props) {
    this.container = container;
    this.props = props || {}; // props가 없을 경우 빈 객체로 초기화
  }

  // LeaveApplicationList의 1개의 LeaveApplicationItem 클릭 하면,
  // 클릭한 LeaveApplicationItem의 기존 데이터를 보여줌
  // 폼 데이터를 로드하여 입력 필드에 채우기
  loadFormData(formData) {
    if (formData.typeForLeave) {
      const radioButton = document.querySelector(
        `input[name="typeForLeave"][value="${formData.typeForLeave}"]`,
      );
      if (radioButton) {
        radioButton.checked = true;
      }
    }
    document.querySelector('#applicationTitle').value = formData.applicationTitle;
    document.querySelector('#applicationDesc').value = formData.applicationDesc;
  }
  setAddEventListener(onSubmit, onClose) {
    const btnApply = document.querySelector('.btn-applyform');
    const btnGoBack = document.querySelector('.btn-goback');

    btnApply.addEventListener('click', () => {
      const formData = this.getFormData();
      if (this.validateFormData(formData)) {
        onSubmit(formData);
      }
    });

    btnGoBack.addEventListener('click', () => {
      onClose();
    });
  }
  // 폼 데이터를 가져오고 반환
  getFormData() {
    const selectedRadio = document.querySelector('input[name="typeForLeave"]:checked');
    const typeForLeave = selectedRadio ? selectedRadio.value : null;
    const applicationTitle = document.querySelector('#applicationTitle').value.trim();
    const applicationDesc = document.querySelector('#applicationDesc').value.trim();
    // 현재 사용자 ID를 포함시키기 위해 this.props.currentUser.id를 사용
    const userId = this.props.currentUser ? this.props.currentUser.id : null;

    return {
      typeForLeave,
      applicationTitle,
      applicationDesc,
      userId, // 이 부분에서 currentUser의 ID를 formData에 추가
    };
  }

  // 폼 데이터의 유효성을 검사
  validateFormData(formData) {
    let isValid = true;

    // Reset previous error messages
    this.clearErrorMessages();

    if (!formData.typeForLeave) {
      isValid = false;
      this.showErrorMessage('typeForLeave', '휴가 종류를 선택해주세요.');
    }

    if (!formData.applicationTitle) {
      isValid = false;
      this.showErrorMessage('applicationTitle', '제목을 입력해주세요.');
    }

    return isValid;
  }
  //기존의 오류 메시지를 제거
  clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((errorMessage) => errorMessage.remove());
  }
  // 특정 필드에 오류 메시지를 표시
  showErrorMessage(field, message) {
    let inputElement;
    if (field === 'typeForLeave') {
      inputElement = document.querySelector('.error-radio');
    } else {
      const inputTitle = document.querySelector('#applicationTitle');
      inputTitle.style.borderBottom = '1px solid red';
      inputTitle.focus();
      inputElement = document.querySelector('.error-title');
    }
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    inputElement.appendChild(errorMessage);
  }
  render() {
    return /* HTML */ `
      <section class="applicaion-form-wrap">
        <div class="applicaion-form">
          <h1 class="applicaion-form__heading">근태/휴가 신청서</h1>
          <div class="applicaion-form__profile">
            <img src="${avatarDefaultImg}" alt="profile image" class="profile-image" />
            <span class="applicaion-form__username">${'세션에서 가지고온 이름'}</span>
          </div>
          <form class="form">
            <div class="container">
              <div class="radio-tile-group">
                <div class="input-container">
                  <input
                    id="annual-leave"
                    class="radio-button"
                    type="radio"
                    name="typeForLeave"
                    value="연차"
                  />
                  <div class="radio-tile">
                    <label for="annual-leave" class="radio-tile-label">연차</label>
                  </div>
                </div>

                <div class="input-container">
                  <input
                    id="half-dayoff"
                    class="radio-button"
                    type="radio"
                    name="typeForLeave"
                    value="반차"
                  />
                  <div class="radio-tile">
                    <label for="half-dayoff" class="radio-tile-label">반차</label>
                  </div>
                </div>

                <div class="input-container">
                  <input
                    id="sick-leave"
                    class="radio-button"
                    type="radio"
                    name="typeForLeave"
                    value="조퇴"
                  />
                  <div class="radio-tile">
                    <label for="sick-leave" class="radio-tile-label">조퇴</label>
                  </div>
                </div>

                <div class="input-container">
                  <input
                    id="others"
                    class="radio-button"
                    type="radio"
                    name="typeForLeave"
                    value="기타"
                  />
                  <div class="radio-tile">
                    <label for="others" class="radio-tile-label">기타</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="apply-title">
              <label for="applicationTitle">제목</label>
              <input
                type="text"
                name="applicationTitle"
                id="applicationTitle"
                placeholder="제목을 입력하세요."
              />
            </div>

            <div class="apply-description">
              <label for="applicationDesc">내용</label>
              <textarea
                name="applicationDesc"
                id="applicationDesc"
                cols="30"
                rows="10"
                placeholder="상세 신청사유를 작성하세요."
              ></textarea>
            </div>
            <div class="error-radio"></div>
            <div class="error-title"></div>
            <div class="btn-group">
              <button type="button" class="btn-goback">뒤로가기</button>
              <button type="button" class="btn-applyform">신청하기</button>
            </div>
          </form>
        </div>
      </section>
    `;
  }
}
