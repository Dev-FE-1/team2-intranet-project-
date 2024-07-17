import { checkIsFormAllInputsValid } from './validatorHelpers';

// 버튼 헨들러
// 수정, 취소 버튼 클릭 이벤트 헨들러
export const setupButtonHandlers = (el, switchToEditMode, historyBack) => {
  // editAndCancelbuttons는 수정, 취소 버튼들임.
  const editAndCancelbuttons = el.querySelectorAll('.user-info__btns > button');
  editAndCancelbuttons.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('user-info__btn--edit')) return switchToEditMode();
      if (e.target.classList.contains('user-info__btn--cancel')) return historyBack();
    }),
  );
};

// focusOut 이벤트헨들러,  발생시 마다 제대로 입력 되었는지 체크를함
// onFocusOutEvent 함수를 form에 붙임.
export const handleFocusOutEventForValidCheck = (
  getFormInputData,
  isAdminPage,
  isEditOrRegisterPage,
) => {
  const userformElem = document.querySelector('.user-info');
  userformElem.addEventListener('focusout', () => {
    checkIsFormAllInputsValid(getFormInputData, isAdminPage, isEditOrRegisterPage);
  });
};
