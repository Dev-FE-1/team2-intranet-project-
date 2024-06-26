export default class Pagination {
  constructor(container, props) {
    this.container = container;
    this.props = props;
  }
  render = () => {
    this.container.innerHTML = /* HTML */ `
      <div class="pagination">
        <a href="#" aria-label="Go to previous page" class="pagination__btn-prev"> Previous </a>
        <ol class="pagination__page-numbers">
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <!-- <li><button type="button" disabled>...</button></li> -->
          <li><a href="#">5</a></li>
          <li><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">8</a></li>
          <li><a href="#">9</a></li>
          <li><a href="#">10</a></li>
        </ol>
        <a href="" aria-label="Go to next page" class="pagination__btn-next"> Next </a>
      </div>
    `;
  };
}
