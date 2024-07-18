import '@fortawesome/fontawesome-free/css/all.min.css';
import './login.css';
import Initialization from './Initialization';

export default class Login {
  constructor(container) {
    this.container = container;
    this.render();
  }
  //Login페이지 렌더링 하는 메소드
  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="container">
        <div class="wrapper">
          <div class="login-background"></div>
          <div class="login__wrap">
            <div class="logo">
              <h1>Corenet</h1>
            </div>
            <div class="login">
              <form class="login__form" id="loginForm" action="/login" method="POST" novalidate>
                <h1 class="readable-hidden">Log In</h1>
                <div class="login__description">
                  <p>
                    <span>안녕하세요! 👋</span>
                  </p>
                  <p>
                    <span
                      >사내 인트라넷 솔루션
                      <strong class="product-name">코어넷</strong>입니다.</span
                    >
                  </p>
                </div>
                <div class="login__group">
                  <label class="login__label" for="username">아이디</label>
                  <input
                    class="login__input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="ID"
                    value="H2410001"
                    required
                  />
                  <span class="usernameError"></span>
                </div>
                <div class="login__group">
                  <label class="login__label" for="password">비밀번호</label>
                  <div class="login__password-wrapper">
                    <input
                      class="login__input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value="Passw0rd!1"
                      required
                    />
                    <button
                      type="button"
                      class="login__toggle-password"
                      aria-label="비밀번호 보기"
                      data-shown="false"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                  <span class="passwordError"></span>
                </div>
                <div class="login__checkboxgroup">
                  <p>
                    <input class="admin__checkbox" type="checkbox" id="admin" name="remember" />
                    <label class="admin__checkbox-label" for="admin">관리자 접속</label>
                  </p>
                  <p>
                    <input class="login__checkbox" type="checkbox" id="remember" name="remember" />
                    <label class="login__checkbox-label" for="remember">아이디 기억하기</label>
                  </p>
                </div>
                <button class="login__button" type="submit">로그인 하기</button>
                <div class="login__footer">
                  <p class="login__continue">or continue with</p>
                  <!--<a class="login__forgot-pw" href="/forgot-password">비밀번호를 잊으셨나요?</a>-->
                  <p class="forgotpass-info">
                    <span>비밀번호를 분실하셨나요?</span
                    ><span>관리자에게 문의하여 비밀번호를 재설정하세요.</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    const initialization = new Initialization();
    initialization();
  }
}
