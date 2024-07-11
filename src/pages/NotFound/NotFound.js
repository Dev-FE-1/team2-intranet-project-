import './NotFound.css';
export default class NotFound {
  constructor() {}
  render = () => {
    return /* HTML */ ` <!---->
      <div class="not-found-wrap">
        <div class="non-found">
          <p>404 NOT FOUND</p>
          <p>올바른 경로로 접속해주세요 😵</p>
          <img src="/src/assets/images/non-found-bg.png" alt="page's not found." />
        </div>
      </div>`;
  };
}
