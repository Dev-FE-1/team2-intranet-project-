import './header.css';

export default () => {
  return `
    <header class="header">
        <div class="logo">INTRANET</div>
        <nav class="nav-links">
            <a href="/">Home</a>
            <a href="/mypage">mypage</a>
        </nav>
        <a href="/userLogin" class="userLogIn">로그인</a>
    </header>
    <section class="section"></section>
    <footer class="footer"></footer>
    `;
};
