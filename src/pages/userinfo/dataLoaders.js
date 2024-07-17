// 데이터 로딩 관련 함수

import { fields } from './constants';
// user일경우 세션스토리지에서 정보 가져오기
export const loadUserFromSession = (el) => {
  sessionStorage.setItem('userPassword', 'password');
  const state = { ...sessionStorage };
  if (state) {
    fields.forEach(({ id, key }) => {
      el.querySelector(`#${id}`).value = state[key] || '';
    });
  }
};

// admin일경우 props에서 정보 가져오기
export const loadUserFromProps = (el, state, userId) => {
  if (state.user && state.user[userId]) {
    const trdataId = document.querySelector('.user-info__lists-wrap');
    if (state.user[userId] === undefined) {
      console.error('dataId가 없습니다.');
    }
    trdataId.dataset.dataId = state.user[userId].dataId || '';
    fields.forEach(({ id, key }) => {
      el.querySelector(`#${id}`).value = state.user[userId][key] || '';
    });
  }
};
