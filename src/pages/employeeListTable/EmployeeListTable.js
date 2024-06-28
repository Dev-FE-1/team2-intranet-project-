import axios from 'axios';
import './EmployeeListTable.css';
import { EmployeeListTableRows } from './EmployeeListTableRows.js';
import { PageNation } from '../../components/pagination/PageNation.js';

customElements.define('page-nation', PageNation);
export class EmployeeListTable {
  constructor({ cid = '#content', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
  }

  render = async () => {
    this.container.innerHTML = /* HTML */ `
      <section class="employee-list">
        <div class="employee-list__header">
          <div class="employee-list__header__button">
            <button class="c-button c-button-enroll">임직원 등록</button>
            <button class="c-button c-button-delete">임직원 삭제</button>
          </div>
          <div class="employee-list__header__search">
            <form action="#" class="employee-list__header__search-form">
              <label for="search">검색</label>
              <input type="search" id="search" placeholder="이름 또는 이메일로 검색하기" />
            </form>
          </div>
        </div>
        <table>
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
        <page-nation></page-nation>
      </section>
    `;
    this.attachEventListeners();
    const employees = await this.getEmployees();
    this.renderEmployeeListTableRows({ cid: '.employee-list__rows', employees });
  };

  renderEmployeeListTableRows = async ({ cid, employees }) => {
    const employeeListTableRows = new EmployeeListTableRows({
      cid,
      employees,
    });
    employeeListTableRows.render();
  };

  searchEmployees = async ({ userSearchInput, employees }) => {
    console.log(employees);
    const searchResult = employees.filter(
      (employee) =>
        employee.name.includes(userSearchInput) ||
        employee.email.includes(userSearchInput) ||
        employee.position.includes(userSearchInput),
    );
    this.renderEmployeeListTableRows({ employees: searchResult, cid: '.employee-list__rows' });
  };

  getEmployees = async () => {
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
      if (e.target.classList.contains('employee-list__header__search-form')) {
        e.preventDefault();
        const userSearchInput = e.target.querySelector('input').value;
        const employees = await this.getEmployees();
        this.searchEmployees({ userSearchInput, employees });
      }
    });
  };
}
