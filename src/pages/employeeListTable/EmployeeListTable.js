import axios from 'axios';
import './EmployeeListTable.css';
import { EmployeeListTableRows } from './EmployeeListTableRows.js';
import './PageNation.css';

export class EmployeeListTable {
  constructor(cotainer, props) {
    this.container = cotainer;
    this.props = props;
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = /* HTML */ `
      <section class="employee-list">
        <h1 class="employee-list__heading">직원관리</h1>
        <div class="employee-list__header">
          <div class="employee-list__header__button">
            <a href="/userinfo" data-link>
              <button class="c-button c-button-enroll">임직원 등록</button></a
            >
            <a><button class="c-button c-button-delete">임직원 삭제</button></a>
          </div>
          <div class="employee-list__header__search">
            <form action="#" class="employee-list__header__search-form">
              <label for="search">검색</label>
              <input type="search" id="search" placeholder="이름 또는 이메일로 검색하기" />
            </form>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="12%" />
              <col width="*" />
              <col width="25%" />
              <col width="20%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <div class="c-checkbox">
                    <input type="checkbox" id="selectAll" class="c-checkbox__input" />
                    <label for="selectAll">Select All</label>
                  </div>
                </th>
                <th>프로필사진</th>
                <th>이름</th>
                <th>이메일</th>
                <th>휴대폰 번호</th>
                <th>직급</th>
              </tr>
            </thead>
            <tbody class="employee-list__rows"></tbody>
          </table>
        </div>
        <page-nation></page-nation>
      </section>
    `;
    this.updateEmployeeListRows();
  }

  async updateEmployeeListRows() {
    const employees = await this.fetchEmployees();
    this.renderTableRows({ cid: '.employee-list__rows', employees });
    // this.attachEventListeners();
  }

  renderTableRows({ cid, employees }) {
    const employeeListTableRows = new EmployeeListTableRows({
      cid,
    });
    const numberPerPage = 10;
    const totalRows = employees.length;
    const numberOfPages = Math.ceil(totalRows / numberPerPage);
    let currentPage = 1;

    const pageNation = document.querySelector('page-nation');
    pageNation.innerHTML = /* HTML */ `
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
          ${Array.from({ length: numberOfPages })
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
    loadTableRows({ currentPage, numberPerPage });

    this.container.addEventListener('click', (e) => {
      if (e.target.matches('[pagination-number-anchor]')) {
        e.preventDefault();
        currentPage = parseInt(e.target.innerText);
        loadTableRows({ currentPage, numberPerPage });
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.matches('[pagination-next-anchor]')) {
        e.preventDefault();
        if (currentPage === numberOfPages) {
          return;
        }
        currentPage++;
        loadTableRows({ currentPage, numberPerPage });
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.matches('[pagination-previous-anchor]')) {
        e.preventDefault();
        if (currentPage === 1) {
          return;
        }
        currentPage--;
        loadTableRows({ currentPage, numberPerPage });
      }
    });

    function setButtonStateFocus({ currentPage }) {
      const pageNationButtons = document.querySelectorAll('[pagination-number-anchor]');
      pageNationButtons.forEach((button) => {
        button.classList.remove('pagination--focus');
        if (parseInt(button.innerText) === currentPage) {
          button.classList.add('pagination--focus');
        }
      });
    }

    function loadTableRows({ currentPage, numberPerPage }) {
      const rowStart = (currentPage - 1) * numberPerPage;
      const rowEnd = calcRowEnd({ totalRows });
      employeeListTableRows.render(employees.slice(rowStart, rowEnd));
      setButtonStateFocus({ currentPage });
    }

    function calcRowEnd({ totalRows }) {
      if (currentPage * numberPerPage > totalRows) return totalRows;
      return currentPage * numberPerPage;
    }
  }

  searchEmployees = async ({ userSearchInput, employees }) => {
    console.log(employees);
    const searchResult = employees.filter(
      (employee) =>
        employee.name.includes(userSearchInput) ||
        employee.email.includes(userSearchInput) ||
        employee.position.includes(userSearchInput),
    );
    this.renderTableRows({ employees: searchResult, cid: '.employee-list__rows' });
  };

  fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      return [...response.data.data];
    } catch (error) {
      console.error('Error get employees', error);
      return [];
    }
  };

  attachEventListeners = () => {
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        this.container.classList.toggle('active', e.target.value.length > 0);
      }
    });
    this.container.addEventListener('submit', async (e) => {
      const searchForm = e.target.classList.contains('employee-list__header__search-form');
      if (searchForm) {
        e.preventDefault();
        const userSearchInput = e.target.querySelector('input').value;
        const employees = await this.fetchEmployees();
        this.searchEmployees({ userSearchInput, employees });
      }
    });
  };
}
