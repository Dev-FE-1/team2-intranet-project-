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

  // 직원 검색 함수: 직원리스트를 매개변수 값으로 받고,
  // 리스트를 하나씩 순차적으로 확인하면서 name, email, position중에 한글자라도 동일한 것이 있으면
  // 일치하는 리스트 요소 값들을 넣고 테이블 로우 부분만 다시 랜더링함.
  searchEmployees = async ({ userSearchInput, employees }) => {
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

  // 검색바의 검색아이콘 토글 함수: 직원 검색바 입력시, 검색 아이콘 색깔이 진한 검정색으로 바뀌게함.
  onInputToggleSearchIcon() {
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        this.container.classList.toggle('active', e.target.value.length > 0);
      }
    });
  }

  // 직원 리스트 검색 요소에 붙여진 submit핸들러함수: 직원 검색바에 입력하고 enter를 눌렀을 때를 감지
  onSubmitSearchEmployees() {
    this.container.addEventListener('submit', async (e) => {
      const searchForm = e.target.classList.contains('employee-list__header__search-form');
      if (searchForm) {
        e.preventDefault();
        const userSearchInput = e.target.querySelector('input').value;
        const employees = await this.fetchEmployees();
        this.searchEmployees({ userSearchInput, employees });
      }
    });
  }

  attachEventListeners = () => {
    this.onInputToggleSearchIcon();
    this.onSubmitSearchEmployees();
  };
}
