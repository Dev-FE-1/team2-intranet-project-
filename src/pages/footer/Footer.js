import { compile } from 'handlebars';
import './Footer.css';
const footerHtml = compile(`
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__title">Intranet</div>
      <a href="{{ githubUrl }}">
        <img class="footer__logo" src="{{ logoUrl }}" alt="Repository Logo">
      </a>
      <p class="footer__copyright">
        Copyright {{ currentYear }}. {{ authors }} all rights reserved.
      </p>
    </div>
  </footer>
`);

class Footer {
  constructor() {
    this.el = document.createElement('footer');
  }

  // render() 메서드
  render() {
    // cid로 지정된 컨테이너 요소 찾기

    // 컨테이너 안에 HTML을 동적으로 생성 및 삽입
    this.el.innerHTML = footerHtml({
      title: this.title,
      githubUrl: 'https://github.com/Dev-FE-1/team2-intranet-project-.git',
      logoUrl: this.img,
      currentYear: new Date().getFullYear(), // 현재 연도 동적으로 가져오기
      authors: '고낙연, 송병훈, 신혜진, 이동혁, 최미랑',
    });

    // 로고 이미지에 대한 클릭 이벤트 리스너 설정
    // this.clickLogo();
    return this.el;
  }

  // 푸터 로고 클릭 시 깃허브 레포지토리로 이동하는 이벤트 리스너 메서드
  clickLogo() {
    // const logo = document.querySelector('.footer__logo');
    // logo.addEventListener('click', () => {
    //   window.location.href = 'https://github.com/Dev-FE-1/team2-intranet-project-.git';
    // });
  }
}

export default Footer;
