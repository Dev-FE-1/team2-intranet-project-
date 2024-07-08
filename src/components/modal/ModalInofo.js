import './modal-info.css';
export default class Modal {
  constructor(state = '삭제') {
    this.state = state;
    this.el = document.createElement('div');
    this.render();
  }
  render() {
    this.el.classList.add('modal-info', 'show');
    this.el.innerHTML = /*html*/ `
      <div class="modal__wrap">
        <div class="modal__text">
          <h1></h1>
          <p>Are you sure you want to cancle this?</p>
        </div>
        <div class="modal__btns">
          <button class="modal__btn modal__btn--cancel">아니오</button>
          <button class="modal__btn modal__btn--click"></button>
        </div>
        <span class="modal--close"><span class="material-symbols-rounded">
        close
        </span></span>
      </div>
    `;
    this.btnHandler();
    this.textChange();
  }
  btnHandler() {
    const btnClose = this.el.querySelectorAll(
      '.modal__btn--cancel, .modal--close, .modal__btn--click',
    );
    const modalContent = this.el.querySelector('.modal__wrap');

    // 이벤트 버블링의 기본값은 false 이다. (하위요소 -> 상위요소로 이벤트 전파)
    // 이벤트 캡쳐링 방지 (상위요소 -> 하위요소로 이벤트 전파)
    this.el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.el.classList.contains('show')) {
        this.hideModal();
      } else {
        this.showModal();
      }
    });
    modalContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    btnClose.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // 스크롤링 블락 해제
        document.body.style.overflow = 'auto';
        this.hideModal();
      });
    });
  }

  showModal() {
    this.el.classList.add('show');
  }
  hideModal() {
    this.el.classList.remove('show');
  }
  textChange() {
    const text = {
      삭제: {
        title: '해당 직원을 삭제하시겠습니까?',
        content: '네, 삭제합니다.',
      },
      근무시작: {
        title: '근무를 시작하시겠습니까?',
        content: '네, 시작합니다.',
      },
      근무종료: {
        title: '근무를 종료하시겠습니까?',
        content: '네, 종료합니다.',
      },
    };
    const modalText = this.el.querySelector('.modal__text');
    const modalbtn = this.el.querySelector('.modal__btn--click');
    modalText.querySelector('h1').textContent = text[this.state].title;
    modalbtn.textContent = text[this.state].content;
    if (this.state === '근무시작') {
      modalbtn.className = 'modal__btn modal__btn--start';
    }
  }
  onClickDeleteButton(fn) {
    const modalbtn = this.el.querySelector('.modal__btn--click');
    console.log(modalbtn);

    modalbtn.addEventListener('click', () => {
      fn(true);
    });
  }
}
