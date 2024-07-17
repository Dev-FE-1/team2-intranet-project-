// UI 관련된 헬퍼 함수

// ID 입력 차단
export const setFormIdInputDisable = (el) => {
  const userId = el.querySelector('#user-id');
  userId.readOnly = true;
  userId.style.border = 'none';
  const duplicateValidedButton = document.querySelector('.user-info__type');
  duplicateValidedButton.style.display = 'none';
};

// 유저정보 수정

// 수정 모드와 조회 모드 전환
export const toggleFormMode = (el, info) => {
  const sel = el.querySelector('#user-position');
  const [editInfoButton, saveCancelButton] = el.querySelectorAll('.user-info__btns');
  if (info === '조회') {
    const inputEl = el.querySelectorAll('input');
    el.querySelector('.user-info__type').classList.add('btnNone');
    inputEl.forEach((el) => {
      el.readOnly = true;
      el.style.border = 'none';
      sel.disabled = true;
      editInfoButton.style.display = 'none';
    });
  } else {
    saveCancelButton.style.display = 'none';
  }
};

// 유저가 저장을 클릭하고 나서 백엔드에 데이터가 전송 되기 까지 500ms 딜레이가 있을 때
// 저장 버튼 아래 "임직원 변경 사항 저장중.." 메시지가 뜨게함.
export const showDelaySubmitMessage = (el) => {
  const delay_submit_message = el.querySelector('.user-info-submit-delay__message');
  delay_submit_message.classList.add('toggle-f');
};
