import './addCardMModal.css';

export default class AddCardMModal {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  render() {
    this.container.innerHTML = /* HTML */ ` <section class="AddCard-form-wrap">
      <div class="AddCard-form">
        // imgur api로 이미지 업로드하도록 만들기
        <img class="card-image" />

        <form class="form">
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
              placeholder="상세 내용을 작성하세요."
            ></textarea>
          </div>
          <button type="button" class="btn-apply">추가하기</button>
        </form>
      </div>
    </section>`;
  }
}
