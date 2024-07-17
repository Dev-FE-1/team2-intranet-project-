// 유효성 검사와 관련된 함수 및 관련 이벤트 핸들러함수

import { Validator } from './Validator';
const validator = new Validator();

export const isValidAndReturnMessage = {
  'user-id': (inputValue) => validator.idValidator(inputValue),
  'user-duplicate-id': (inputValue) => validator.idDuplicateValidator(inputValue),
  'user-email': (inputValue) => validator.emailValidator(inputValue),
  'user-password': (inputValue) => validator.passwordValidator(inputValue),
  'user-phone': (inputValue) => validator.phoneValidator(inputValue),
};

export const isValidInputState = {
  'user-id': false,
  'user-duplicate-id': false,
  'user-email': false,
  'user-password': false,
  'user-phone': false,
};

//  focusOut 발생시 마다 제대로 입력 되었는지 체크를함
// 아이디, 패스워드, 이메일, 핸드폰 번호에 대한 각각의 유효성 검사를함.
// 전체 이들 모두가 유효성 검사를 통과 해야 저장 버튼이 활성화됨
export const checkIsFormAllInputsValid = (getFormInputData, isAdminPage, isEditOrRegisterPage) => {
  const formInputDatas = getFormInputData();
  isAdminPage() && isEditOrRegisterPage()
    ? validCheckerFormInput('user-id', formInputDatas['user-id'])
    : (isValidInputState['user-id'] = true);
  validCheckerFormInput('user-password', formInputDatas['user-password']);
  validCheckerFormInput('user-email', formInputDatas['user-email']);
  validCheckerFormInput('user-phone', formInputDatas['user-phone']);
  return isValidStateAllTrue();
};

// 유저가 form input에 대한 각각 검사를 함.
// inputElemId: String, input 요소 id 이름
// inputElemValue: String, input.value 값
export const validCheckerFormInput = (inputElemId, inputElemValue) => {
  const returnValidMessageFunc = isValidAndReturnMessage[inputElemId];
  const validMessage = returnValidMessageFunc(inputElemValue);

  const errorcheck = document.querySelector(`.${inputElemId}__error`);
  errorcheck.innerHTML = returnValidMessageFunc(inputElemValue);

  if (validMessage === 'success') {
    errorcheck.classList.remove('-fail-red');
    errorcheck.classList.add('-success-green');
    isValidInputState[inputElemId] = true;
  }
  if (validMessage !== 'success') {
    errorcheck.classList.remove('-success-green');
    errorcheck.classList.add('-fail-red');
    isValidInputState[inputElemId] = false;
  }

  // 유저가 폼에 입력을 모두 제대로 입력했으면, 저장 버튼을 누를 수 있게함.
  if (isValidStateAllTrue()) {
    setSaveButtonElemAble();
  }
};

// 모든 유효성 검증에 대한 상태값들이 모두 true인지 확인.
function isValidStateAllTrue() {
  return Object.values(isValidInputState).every(Boolean);
}

// 유저가 폼에 입력을 제대로 입력했으면, 저장 버튼을 누를 수 있게함.
const setSaveButtonElemAble = () => {
  const saveButtonElem = document.querySelector('.user-info__btn--save');
  saveButtonElem.disabled = false;
  saveButtonElem.classList.remove('user-info__btn--disable');
};
// 처음 유저가 수정, 등록창에 들어오면, 저장 버튼을 못누르게 함
export const setSaveButtonElemDisable = () => {
  const saveButtonElem = document.querySelector('.user-info__btn--save');
  saveButtonElem.disabled = true;
  saveButtonElem.classList.add('user-info__btn--disable');
};
