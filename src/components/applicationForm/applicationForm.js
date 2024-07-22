import './applicationForm.css';
import { defaultAvatarUrl } from '../../assets/images/avatar-default.jpg';

export default class ApplicationForm {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  render() {
    this.container.innerHTML = /* HTML */ ` <section class="applicaion-form-wrap">
      <div class="applicaion-form">
        <!-- <h1>근태신청 폼</h1> -->
        <img src="${defaultAvatarUrl}" alt="profile image" class="profile-image" />

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
                <input id="early-leave" class="radio-button" type="radio" name="typeForLeave" />
                <div class="radio-tile">
                  <label for="early-leave" class="radio-tile-label">조퇴</label>
                </div>
              </div>

              <div class="input-container">
                <input id="other-leave" class="radio-button" type="radio" name="typeForLeave" />
                <div class="radio-tile">
                  <label for="other-leave" class="radio-tile-label">기타</label>
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
          <button type="button" class="btn-apply">신청하기</button>
        </form>
      </div>
    </section>`;
  }
}
