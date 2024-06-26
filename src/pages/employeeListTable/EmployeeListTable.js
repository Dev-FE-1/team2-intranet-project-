import axios from 'axios';
import './EmployeeListTable.css';
import { EmployeeListTableRows } from './EmployeeListTableRows.js';
// import { compile } from 'handlebars';

export class EmployeeListTable {
  constructor({ cid = '#app', ...props }) {
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
                  <input type="checkbox" id="selectAll" class="c-checkbox__input" id="selectAll" />
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
      </section>
    `;
    this.setAddEventListener();
    const employees = await this.getEmployees();
    this.renderEmployeeListTableRows({ employees, cid: '.employee-list__rows' });
  };

  renderEmployeeListTableRows = async ({ employees, cid }) => {
    const employeeListTableRows = new EmployeeListTableRows({
      cid,
      employees,
    });
    employeeListTableRows.render();
  };

  searchEmployees = ({ userSearchInput, employees }) => {
    return employees.filter(
      (employee) =>
        employee.name.includes(userSearchInput) ||
        employee.email.includes(userSearchInput) ||
        employee.position.includes(userSearchInput),
    );
  };

  getEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      return [...response.data.data];
    } catch {
      console.log('Error get employees');
      return [];
    }
  };

  setAddEventListener = () => {
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        e.stopPropagation();
        this.container.classList.toggle('active', e.target.value.length > 0);
      }
    });
    this.container.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (e.target.classList.contains('employee-list__header__search-form')) {
        e.stopPropagation();
        const userSearchInput = e.target.querySelector('input');
        const employees = await this.getEmployees();
        const searchResult = this.searchEmployees({
          userSearchInput: userSearchInput.value,
          employees,
        });
        this.renderEmployeeListTableRows({ employees: searchResult, cid: '.employee-list__rows' });
      }
    });
  };
}
