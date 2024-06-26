export default class ProfileImage {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.imageUrl = '/src/assets/images/avatar-default.jpg';
    // this.render();
  }
  addEventListeners = () => {
    const editBtn = this.container.querySelector('.profile__btn-edit');
    const uploadBtn = this.container.querySelector('.profile__btn-upload');
    const deleteBtn = this.container.querySelector('.profile__btn-remove');
    const fileInput = this.container.querySelector('.profile__input-file');
    const subMenu = this.container.querySelector('.profile__submenu');

    editBtn.addEventListener('click', () => {
      subMenu.classList.toggle('profile__submenu--active');
    });

    uploadBtn.addEventListener('click', () => {
      console.log('click');
      fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      //   파일이 이미지 파일인지 확인합니다 (file.type.startsWith('image/')).
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader(); //FileReader 객체를 사용하여 이미지 파일을 읽고,
        // FileReader가 이미지를 읽은 후, onload 이벤트 핸들러에서 이미지 데이터를 <img> 요소의 src 속성에 설정합니다.
        reader.onload = function (event) {
          const imgElement = document.querySelector('#img');
          imgElement.src = event.target.result;

          const imagePreview = document.getElementById('.profile__image');
          //   미리보기 영역인 #imagePreview 요소의 내용을 지우고 새로운 <img> 요소를 추가하여 선택한 이미지를 표시합니다.
          imagePreview.innerHTML = ''; // Clear any previous image
          imagePreview.appendChild(imgElement);
        };
        reader.readAsDataURL(file); //readAsDataURL 메서드를 통해 이미지 데이터를 읽습니다.
      } else {
        alert('Please select a valid image file.');
      }
    });

    deleteBtn.addEventListener('click', () => {
      this.imageUrl = '/src/assets/images/technology-3.png'; // Reset to default image
      this.render();
      subMenu.classList.remove('profile__submenu--active');
    });
  };
  render = () => {
    this.container.innerHTML = /* HTML */ `
      <div class="profile">
        <img
          src="${this.imageUrl}"
          alt="avatar"
          class="profile__image"
          id="img1"
          accept="image/*"
        />
        <button class="profile__btn-edit">
          <span class="material-symbols-rounded"> edit </span> 사진변경
        </button>

        <ul class="profile__submenu">
          <li>
            <input
              id="fileField"
              type="file"
              name="files[]"
              accept="image/*"
              class="profile__input-file"
            />
            <label for="fileField" class="profile__btn-upload">Upload a photo</label>
          </li>
          <li>
            <button class="profile__btn-remove">Remove photo</button>
          </li>
        </ul>
      </div>
    `;
    this.addEventListeners();
  };
}
