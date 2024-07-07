import { Route } from '../router/route.js';
import UserInfo from '../userinfo/UserInfo.js';
export class EmployeeListTableRows {
  constructor({ cid = '.employee-list__rows', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
    this.defaultProfileImg = 'https://i.imgur.com/KM82VtW.png';
    this.attachEventListeners();
  }

  render = async (employees) => {
    this.container.innerHTML = employees
      .map((employee) => this.tableRowTemplate(employee))
      .join('');
  };

  tableRowTemplate(employee) {
    const { profileImg, name, email, phone, position, employeeId, password } = employee;
    return /* HTML */ `
      <tr data-id="${employeeId}" data-password="${password}">
        <td>
          <div class="c-checkbox">
            <input type="checkbox" class="c-checkbox__input" />
            <label></label>
          </div>
        </td>
        <td class="employee-list__info">
          <img src="${profileImg || this.defaultProfileImg}" alt="프로필 사진" />
        </td>
        <td class="employee-list__info">${name}</td>
        <td class="employee-list__info">${email}</td>
        <td class="employee-list__info">${phone}</td>
        <td class="employee-list__info">${position}</td>
      </tr>
    `;
  }

  getRowData(tr) {
    const td = tr.querySelectorAll('td');
    return {
      userId: tr.dataset.id,
      userPassword: tr.dataset.password,
      profileImg: td[1].querySelector('img').src,
      name: td[2].textContent.trim(),
      email: td[3].textContent.trim(),
      phone: td[4].textContent.trim(),
      position: td[5].textContent.trim(),
    };
  }

  onCheckAllCheckboxes() {
    const checkAllCheckboxes = (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    };
    const checkboxTableHeadElem = document.querySelector('#selectAll');
    checkboxTableHeadElem.addEventListener('change', checkAllCheckboxes);
  }

  onClickTableRow() {
    const pathMappings = {
      '/userinfo': { title: 'userinfo', ComponentClass: UserInfo },
    };
    const routeView = document.querySelector('route-view');
    const href = '/userinfo';
    const routeToUserInfo = (e) => {
      const row = e.target.closest('TR');
      if (e.target.closest('td').classList.contains('employee-list__info') && row) {
        e.preventDefault();
        const props = this.getRowData(e.target.parentNode);
        const route = new Route({ pathMappings, routeView });
        props['info'] = '조회';
        route.router(props, href);
      }
    };
    this.container.removeEventListener('click', routeToUserInfo);
    this.container.addEventListener('click', routeToUserInfo);
  }

  attachEventListeners = () => {
    this.onCheckAllCheckboxes();
    this.onClickTableRow();
  };
}
