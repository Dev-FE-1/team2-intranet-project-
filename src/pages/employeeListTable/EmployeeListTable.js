import './EmployeeListTable.css';
import { EmployeeListTableRows } from './EmployeeListTableRows.js';
import './PageNation.css';
import Modal from '../../components/modal/ModalInofo.js';
import { Route } from '../router/route.js';
import UserInfo from '../userinfo/UserInfo.js';
import { EmployeeListFetch } from './EmployeeListFetch.js';
import Loading from '../../components/loading/Loading.js';
import { Pagination } from './Pagination.js';
import { SearchComponent } from './SearchComponent.js';

export class EmployeeListTable {
  constructor(cotainer, props) {
    this.container = cotainer;
    this.props = props;
    this.employeeListFetch = new EmployeeListFetch();
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
            <a
              ><button id="employee-delete" class="c-button c-button-delete">임직원 삭제</button></a
            >
          </div>
          <div class="employee-list__header__search"></div>
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
          <div class="loading-component-container"></div>
        </div>
        <div class="page-nation-container"></div>
        <page-nation></page-nation>
        <div class="ex-modal-container"></div>
      </section>
    `;
    this.renderTableRowsByFetch();
    this.rednerSearchComponent();
    this.attachEventListeners();
    this.addLoadingComponent();
  }

  rednerSearchComponent() {
    this.employeeListTableSearch = new SearchComponent(
      document.querySelector('.employee-list__header__search'),
      this.searchEmployees,
    );
    this.employeeListTableSearch.render();
  }

  addLoadingComponent() {
    const loadingComponentContainer = document.querySelector('.loading-component-container');
    this.loading = new Loading(loadingComponentContainer, {});
    this.loading.render();
  }

  removeLoadingComponent() {
    const loadingComponentContainer = document.querySelector('.loading-component-container');
    loadingComponentContainer.remove();
  }

  async renderTableRowsByFetch() {
    try {
      const employees = await this.employeeListFetch.getEmployeeList();
      if (!employees) {
        throw new Error('직원 데이터가 없거나 오류가 발생했습니다.');
      }
      this.renderTableRows({ employees });
    } catch (error) {
      console.error('Error fetching employee list:', error);
    } finally {
      this.removeLoadingComponent();
    }
  }

  renderTableRows({ employees }) {
    const pageNation = new Pagination({
      tableTotalItems: employees,
      container: document.querySelector('page-nation'),
      renderTableRow: new EmployeeListTableRows(document.querySelector('.employee-list__rows'))
        .render,
      numberPerPage: 10,
      currentPage: 1,
    });
    pageNation.render();
  }

  // 직원 검색 함수: 직원리스트를 매개변수 값으로 받고,
  // 리스트를 하나씩 순차적으로 확인하면서 name, email, position중에 한글자라도 동일한 것이 있으면
  searchEmployees = async (userSearchInput) => {
    const employees = await this.employeeListFetch.getEmployeeList();
    const searchResult = employees.filter(
      (employee) =>
        employee.name.includes(userSearchInput) ||
        employee.email.includes(userSearchInput) ||
        employee.position.includes(userSearchInput),
    );
    this.renderTableRows({ employees: searchResult });
  };

  // 직원 삭제 버튼 클릭시 모달창 생성 함수: 삭제버튼을 클릭하면 모달창이 생성되고, 삭제버튼을 누르면 모달창이 사라짐.
  deleteEmployee = (e) => {
    if (e.target.id === 'employee-delete') {
      const modal = new Modal('삭제');
      // this.container.appendChild(modal.el); // 모달창이 뜸
      console.log('modal', modal.el);
      const modalContainer = this.container.querySelector('.ex-modal-container');
      modalContainer.innerHTML = '';
      modalContainer.appendChild(modal.el);

      // 모달 팝업되면 body 스크롤링 금지
      document.body.style.overflow = 'hidden';

      modal.onClickDeleteButton(async (value) => {
        if (value) {
          const checkedEmployeeIds = this.getCheckedEmployeeIds();
          await this.employeeListFetch.deleteEmployee(checkedEmployeeIds);
          this.renderTableRowsByFetch();
        }
        document.body.style.overflow = 'auto';
      });
    }
  };

  getCheckedEmployeeIds() {
    const checkboxInputs = document.querySelectorAll('.employee-list__rows .c-checkbox__input');
    return [...checkboxInputs]
      .filter((input) => input.checked)
      .map((input) => input.closest('tr').dataset.dataId);
  }

  getRowData(tr) {
    const td = tr.querySelectorAll('td');
    return {
      dataId: tr.dataset.dataId,
      userId: tr.dataset.id,
      userPassword: tr.dataset.password,
      profileImg: tr.querySelector('img').src,
      name: td[2].textContent.trim(),
      email: td[3].textContent.trim(),
      phone: td[4].textContent.trim(),
      position: td[5].textContent.trim(),
    };
  }

  onClickTableRowrouteToUserInfo = (e) => {
    const pathMappings = {
      '/userinfo': { title: 'CORENET - 인트라넷 솔루션', ComponentClass: UserInfo },
    };
    const routeView = document.querySelector('route-view');
    const href = '/userinfo';
    const row = e.target.closest('TR');
    if (e.target.closest('td').classList.contains('employee-list__info') && row) {
      e.preventDefault();
      const props = this.getRowData(e.target.parentNode);
      const route = new Route({ pathMappings, routeView });
      props['info'] = '조회';
      route.router(props, href);
    }
  };

  attachEventListeners = () => {
    this.container.addEventListener('change', this.oncheckAllCheckboxes);
    this.container.addEventListener('click', this.deleteEmployee);
    const tableRow = this.container.querySelector('.employee-list__rows');
    tableRow.addEventListener('click', this.onClickTableRowrouteToUserInfo);
  };
}
