// 데이터 관리와 관련된 함수들
import { UserInfoDTO } from './userInfoDTO';
import { EmployeeListFetch } from '../employeeListTable/EmployeeListFetch';

const employeeListFetch = new EmployeeListFetch();

// 유저정보 수정
// 유저 정보를 SessionStorage에 저장
export const saveUserDataOnSessionStorage = (formData, fields) => {
  fields.forEach(({ id, key }) => {
    const value = formData.get(id); // 폼 데이터에서 값 가져오기
    if (value !== null) {
      sessionStorage.setItem(key, value);
    }
  });
};

// submit 헨들러
//  백엔드로 유저 데이터 수정 요청 API 호출
//  백엔드로 유저 데이터 등록 요청 API 호출
export const saveUserDataWhenFormSubmit = async (form, info) => {
  const formData = new FormData(form);
  const userInfotr = Object.fromEntries(formData.entries());
  const trdataId = document.querySelector('.user-info__lists-wrap');

  userInfotr['data-id'] = trdataId.dataset.dataId; // 데이터 아이디 설정
  userInfotr['data-profileImg'] = document.getElementById('img1').dataset.profileImage;

  if (info === '수정') {
    await employeeListFetch.updateEmployee(new UserInfoDTO(userInfotr));
  } else if (info === '등록') {
    await employeeListFetch.addEmployee(new UserInfoDTO(userInfotr));
  }
};
