import './LeaveApplicationForm.css';

export default class LeaveApplicationForm {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  render() {
    return /* HTML */ `
      <section class="applicaion-form-wrap">
        <div class="applicaion-form">
          <h1>근태/휴가 신청서</h1>
          <img
            src="/src/assets/images/avatar-default.jpg"
            alt="profile image"
            class="profile-image"
          />

          <form class="form">
            <div class="container">
              <div class="radio-tile-group">
                <div class="input-container">
                  <input id="annual-leave" class="radio-button" type="radio" name="typeForLeave" />
                  <div class="radio-tile">
                    <label for="annual-leave" class="radio-tile-label">연차</label>
                  </div>
                </div>

                <div class="input-container">
                  <input id="half-dayoff" class="radio-button" type="radio" name="typeForLeave" />
                  <div class="radio-tile">
                    <label for="half-dayoff" class="radio-tile-label">반차</label>
                  </div>
                </div>

                <div class="input-container">
                  <input id="sick-leave" class="radio-button" type="radio" name="typeForLeave" />
                  <div class="radio-tile">
                    <label for="sick-leave" class="radio-tile-label">조퇴</label>
                  </div>
                </div>

                <div class="input-container">
                  <input id="others" class="radio-button" type="radio" name="typeForLeave" />
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
            <div>
              <button type="button" class="btn-back">뒤로가기</button>
              <button type="button" class="btn-apply">신청하기</button>
            </div>
          </form>
        </div>
      </section>
    `;
  }
}
