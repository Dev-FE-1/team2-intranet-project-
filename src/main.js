import './style.css';
import routes from './pages/sbs1253';
async function app() {
  const routerView = document.createElement('router-view');
  document.querySelector('#app').innerHTML = /* HTML */ `
    <a href="/info">info</a>
    <a href="/mypage">mypage</a>
  `;
  document.querySelector('#app').append(routerView);
  routes();
}

document.addEventListener('DOMContentLoaded', app);
