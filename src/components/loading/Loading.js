import './Loading.css';
export default class Loading {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  render() {
    const html = document.querySelector('html');
    console.log('!!!');
    html.style.overflow = 'hidden'; // 로딩 중 스크롤 방지
    this.container.innerHTML = /* HTML */ ` <!---->
      <div class="loading-container">
        <div class="mask"></div>
        <div class="loader loader--style8" title="7">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="30px"
            viewBox="0 0 24 30"
            style="enable-background:new 0 0 50 50;"
            xml:space="preserve"
          >
            <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div>`;

    const mask = document.querySelector('.mask');
    if (!mask) {
      console.error('Mask element not found');
    }
  }

  hide() {
    // 억지로 로딩 컴포넌트를 제거함

    const mask = document.querySelector('.mask');
    const html = document.querySelector('html');

    if (mask) {
      mask.style.opacity = '0'; // 서서히 사라지는 효과
      setTimeout(() => {
        mask.style.display = 'none';
        html.style.overflow = 'auto'; // 스크롤 방지 해제
      }, 1000); // 1초 후에 mask를 숨김
    } else {
      console.error('Mask element not found in hide method');
    }
  }
}
