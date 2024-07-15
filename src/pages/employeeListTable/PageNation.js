export class Pagination {
  constructor(container, totalItems, itemsPerPage, currentPage = 1) {
    this.container = container || document.querySelector('page-nation');
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageItems() {
    const rowStart = (this.currentPage - 1) * this.itemsPerPage;
    const rowEnd = Math.min(rowStart + this.itemsPerPage, this.totalItems);
    return { rowStart, rowEnd };
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setCuttentPageNumber = (e) => {
    if (e.target.matches('[pagination-number-anchor]')) {
      e.preventDefault();
      this.currentPage = parseInt(e.target.innerText);
    }
    if (e.target.matches('[pagination-next-anchor]')) {
      e.preventDefault();
      this.nextPage();
    }
    if (e.target.matches('[pagination-previous-anchor]')) {
      e.preventDefault();
      this.prevPage();
    }
  };

  attachEventListener() {
    this.container.addEventListener('click', this.setCuttentPageNumber);
  }
  render() {
    // Pagination UI 렌더링 로직
    this.container.innerHTML = /* HTML */ `
      <div class="pagination">
        <a
          pagination-previous-anchor
          href="#"
          aria-label="Go to previous page"
          class="pagination__btn-prev"
        >
          Previous
        </a>
        <ol class="pagination__page-numbers">
          ${Array.from({ length: this.numberOfPages })
            .map((_, index) => {
              return /* HTML */ ` <li><a pagination-number-anchor href="#">${index + 1}</a></li> `;
            })
            .join('')}
        </ol>
        <a pagination-next-anchor href="" aria-label="Go to next page" class="pagination__btn-next">
          Next
        </a>
      </div>
    `;
    this.attachEventListener();
  }
}
