import { optimizePhoto } from './imageUtils';
import { uploadToCloudinary } from './cloudinaryUploader';

export const setAddEventListener = (container, MAX_WIDTH, QUALITY) => {
  container.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('프로필 사진이 변경되었습니다.');
  });
  const input = document.getElementById('fileField');

  const processReduce = async (photo) => {
    const resizedPhoto = await optimizePhoto(photo, MAX_WIDTH, QUALITY);
    console.log(resizedPhoto);

    let reader = new FileReader();
    reader.readAsDataURL(resizedPhoto); // converts the blob to base64 and calls onload

    reader.onload = async () => {
      document.getElementById('img1').src = reader.result; // data url
      const imgUrl = await uploadToCloudinary(resizedPhoto); // 이미지 받기
      document.getElementById('img1').dataset.profileImage = imgUrl;
    };
  };

  input.addEventListener('change', function (e) {
    console.log('선택한 파일이름: ' + e.target.files[0].name);
    processReduce(e.target.files[0]);
    subMenu.classList.remove('profile__submenu--active');
  });

  const btnEdit = document.querySelector('.profile__btn-edit'); // 사진변경버튼
  const subMenu = document.querySelector('.profile__submenu');

  btnEdit.addEventListener('click', () => {
    subMenu.classList.toggle('profile__submenu--active');
  });

  const btnRemove = document.querySelector('.profile__btn-remove');
  btnRemove.addEventListener('click', () => {
    removePhoto();
    subMenu.classList.remove('profile__submenu--active');
  });
};

export const removePhoto = () => {
  const img = document.getElementById('img1');
  const input = document.getElementById('fileField');

  // 기본 프로필 이미지로 설정
  img.src = '/src/assets/images/avatar-default.jpg';
  // 파일 입력 값 초기화
  input.value = '';

  console.log('프로필 사진이 제거되었습니다.');
};
