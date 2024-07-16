import './ProfileImage.css';
import { editIcon } from '/src/utils/icons';
import avatarDefaultImg from '../../assets/images/avatar-default.jpg';
import { EmployeeListFetch } from '../../pages/employeeListTable/EmployeeListFetch';
import { optimizePhoto } from './imageUtils';
import { uploadToCloudinary } from './cloudinaryUploader';

export default class ProfileImage {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    console.log(this.props);
    this.MAX_WIDTH = 200;
    this.QUALITY = 0.9;
    this.defaultProfileImg = avatarDefaultImg;
    this.employeeListFetch = new EmployeeListFetch();
    this.updateProfileImage();
  }
  setAddEventListener = () => {
    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('프로필 사진이 변경되었습니다.');
    });
    const input = document.getElementById('fileField');

    const processReduce = async (photo) => {
      const resizedPhoto = await optimizePhoto(photo, this.MAX_WIDTH, this.QUALITY);
      console.log(resizedPhoto);

      let reader = new FileReader();
      reader.readAsDataURL(resizedPhoto); // converts the blob to base64 and calls onload
      this.resizedPhoto = resizedPhoto;
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
      this.removePhoto();
      subMenu.classList.remove('profile__submenu--active');
    });
  };
  async fetchProfileImage() {
    const employeeId = sessionStorage.getItem('id');

    if (!employeeId) {
      console.error('Employee ID not found');
      return null;
    }

    try {
      const employee = await this.employeeListFetch.getEmployeeInFoListById(employeeId);
      return employee.profileImg;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async updateProfileImage() {
    const profileImage = await this.fetchProfileImage();
    if (profileImage) {
      this.render(profileImage);
    }
  }

  async render(profileImg = this.defaultProfileImg) {
    this.container.innerHTML = /* HTML */ `
      <form class="profile-form-">
        <div class="profile">
          <img src="${profileImg}" alt="avatar" class="profile__image" id="img1" />
          <button type="button" class="profile__btn-edit">${editIcon()} 사진변경</button>

          <ul class="profile__submenu">
            <li>
              <input
                id="fileField"
                type="file"
                name="files[]"
                accept="image/*"
                class="profile__input-file"
              />
              <label for="fileField" class="profile__btn-upload"> Upload a photo </label>
            </li>
            <li>
              <button type="button" class="profile__btn-remove">Remove photo</button>
            </li>
          </ul>
        </div>
      </form>
    `;
    this.setAddEventListener();
  }

  removePhoto() {
    const img = document.getElementById('img1');
    const input = document.getElementById('fileField');

    // 기본 프로필 이미지로 설정
    img.src = '/src/assets/images/avatar-default.jpg';
    // 파일 입력 값 초기화
    input.value = '';

    console.log('프로필 사진이 제거되었습니다.');
  }
}
