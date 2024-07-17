import { EmployeeListTableRows } from './EmployeeListTableRows.js';
export class PageNation {
  constructor({
    container,
    tableTotalItems,
    tableRowRender,
    numberPerPage,
    totalRows,
    currentPage,
  }) {
    this.tableTotalItems = tableTotalItems;
    this.container = container;
    this.numberPerPage = numberPerPage;
    this.totalRows = totalRows;
    this.numberOfPages = Math.ceil(this.totalRows / this.numberPerPage);
    this.renderTableRows = new EmployeeListTableRows().render ?? tableRowRender;
    this.currentPage = currentPage ?? 1;
  }

  getStartRowAndEndRowNumberOnCurrentPage() {
    const rowStartNumber = (this.currentPage - 1) * this.numberPerPage;
    const rowEndNumber = Math.min(rowStartNumber + this.numberOfPages, this.currentPage);
    return {
      rowStartNumber,
      rowEndNumber,
    };
  }

  nextPage() {
    if (this.currentPage < this.numberPerPage) {
      ++this.currentPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      --this.currentPage;
    }
  }

  goToPage(page) {
    if (page >= 1 && page <= this.numberOfPages) {
      this.currentPage = page;
    }
  }

  setCurrentPage(e) {
    e.preventDefault();
    const anchorButton = e.target.closest('a');
    if (anchorButton.matches('[pagination-number-anchor]')) {
      this.goToPage(parseInt(anchorButton.innerText));
    }
    if (anchorButton.matches('[pagination-next-anchor]')) {
      this.nextPage();
    }
    if (anchorButton.matches('[pagination-previous-anchor]')) {
      this.prevPage();
    }
  }

  renerCurrentPageTableRows() {
    const { rowStartNumber, rowEndNumber } = this.getStartRowAndEndRowNumberOnCurrentPage();
    const currentPageRows = [...this.tableTotalItems].slice(rowStartNumber, rowEndNumber);
    this.renderTableRows(currentPageRows);
  }

  onClickAnchorButtons(e) {
    const IsPaginationAnchor = e.target.closest('a')?.classList.contains('pagination__anchor');
    if (!IsPaginationAnchor) return;
    this.setCurrentPage(e);
    this.setButtonAnchorFocus();
    this.renerCurrentPageTableRows();
  }

  attachEventListener() {
    this.container.addEventListener('click', this.onClickAnchorButtons);
  }

  setButtonAnchorFocus() {
    const currentPage = this.currentPage;
    const pageNationButtons = document.querySelectorAll('[pagination-number-anchor]');
    pageNationButtons.forEach((button) => {
      button.classList.remove('pagination--focus');
      if (parseInt(button.innerText) === currentPage) {
        button.classList.add('pagination--focus');
      }
    });
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <div class="pagination ">
        <a
          pagination-previous-anchor
          href="#"
          aria-label="Go to previous page"
          class="pagination__btn-prev pagination__anchor"
        >
          Previous
        </a>
        <ol class="pagination__page-numbers">
          ${Array.from({ length: this.numberOfPages })
            .map((_, index) => {
              return /* HTML */ `
                <li>
                  <a pagination-number-anchor class="pagination__anchor" href="#">${index + 1}</a>
                </li>
              `;
            })
            .join('')}
        </ol>
        <a
          pagination-next-anchor
          href=""
          aria-label="Go to next page"
          class="pagination__anchor pagination__btn-next"
        >
          Next
        </a>
      </div>
    `;
    this.attachEventListener();
  }
}
