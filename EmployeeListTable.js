import axios from 'axios';
import './EmployeeListTable.css';

export default class EmployeeListTable {
  constructor() {
    this.elem = document.createElement('section');
    this.render();
    this.updateTableRows();
  }

  render(state) {
    this.elem.innerHTML = /* HTML */ `
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
          <tbody>
            ${state ? this.tableRows(state.employees) : ''}
          </tbody>
        </table>
      </section>
    `;
    this.setAddEventListener();
  }

  async updateTableRows() {
    const employees = await this.getEmployees();
    this.render({ employees });
  }

  async getEmployees() {
    try {
      const response = await axios.get('/api/employees');
      return [...response.data.data];
    } catch {
      console.log('Error get employees');
      return [];
    }
  }

  tableRowTemplate(data) {
    return /* HTML */ ` <tr>
      <td>
        <div class="c-checkbox">
          <input type="checkbox" class="c-checkbox__input" />
          <label></label>
        </div>
      </td>
      <td>
        <img src="${data.profileImg}" alt="프로필 사진" />
      </td>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.phone}</td>
      <td>${data.position}</td>
    </tr>`;
  }

  tableRows(employees) {
    return employees.map((employee) => this.tableRowTemplate(employee)).join('');
  }

  setAddEventListener() {
    this.elem.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        this.elem.classList.toggle('active', e.target.value.length > 0);
      }
    });
    this.setAllCheckboxEvent();
  }

  setAllCheckboxEvent() {
    this.elem.addEventListener('change', (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    });
  }
}
