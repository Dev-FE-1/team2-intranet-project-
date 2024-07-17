import './ProfileImage.css';
import { editIcon } from '/src/utils/icons';
import avatarDefaultImg from '../../assets/images/avatar-default.jpg';
import { setAddEventListener, removePhoto } from './eventHandlers';
import { updateProfileImage } from './profileImageUtils';
import { EmployeeListFetch } from '../../pages/employeeListTable/EmployeeListFetch';

export default class ProfileImage {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.MAX_WIDTH = 200;
    this.QUALITY = 0.9;
    this.defaultProfileImg = avatarDefaultImg;
    this.employeeListFetch = new EmployeeListFetch();
    this.updateProfileImage();
  }
  setAddEventListener = () => {
    setAddEventListener(this.container, this.MAX_WIDTH, this.QUALITY);
  };

  updateProfileImage = () => {
    updateProfileImage(this, this.employeeListFetch);
  };
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
  removePhoto = () => {
    removePhoto();
  };
}
