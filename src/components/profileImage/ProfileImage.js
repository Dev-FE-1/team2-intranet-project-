import './ProfileImage.css';
export default class ProfileImage {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    console.log(this.props);
    this.MAX_WIDTH = 200;
    this.QUALITY = 0.9;
  }
  setAddEventListener() {
    const input = document.getElementById('fileField');

    const processReduce = async (photo) => {
      const resizedPhoto = await this.optimizePhoto(photo);
      console.log(resizedPhoto);

      let reader = new FileReader();
      reader.readAsDataURL(resizedPhoto); // converts the blob to base64 and calls onload

      reader.onload = function () {
        document.getElementById('img1').src = reader.result; // data url
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
  }
  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="profile">
        <img
          src="/src/assets/images/avatar-default.jpg"
          alt="avatar"
          class="profile__image"
          id="img1"
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
            <label for="fileField" class="profile__btn-upload"> Upload a photo </label>
          </li>
          <li>
            <button class="profile__btn-remove">Remove photo</button>
          </li>
        </ul>
      </div>
    `;
    this.setAddEventListener();
  }
  // 사진 불러오기
  readPhoto = async (photo) => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');

    // create img element from File object
    img.src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(photo);
    });

    await new Promise((resolve) => {
      console.log(resolve);
      img.onload = resolve;
    });

    // draw image in canvas element
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas;
  };

  scaleCanvas = (canvas, scale) => {
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;

    scaledCanvas.getContext('2d').drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

    return scaledCanvas;
  };

  optimizePhoto = async (photo) => {
    let canvas = await this.readPhoto(photo);

    console.log('이미지 등록되었습니다.');
    while (canvas.width >= 2 * this.MAX_WIDTH) {
      canvas = this.scaleCanvas(canvas, 0.5);
    }

    if (canvas.width > this.MAX_WIDTH) {
      canvas = this.scaleCanvas(canvas, this.MAX_WIDTH / canvas.width);
    }

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', this.QUALITY);
    });
  };

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
