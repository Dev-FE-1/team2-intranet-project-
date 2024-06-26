import { Route } from '../router/route.js';
import UserInfo from '../userinfo/UserInfo.js';
export class EmployeeListTableRows {
  constructor({ cid = '.employee-list__rows', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
    this.defaultProfileImg = 'https://i.imgur.com/KM82VtW.png';
  }

  render = async (employees) => {
    this.container.innerHTML = employees
      .map((employee) => this.tableRowTemplate(employee))
      .join('');
    this.attachEventListeners();
  };

  tableRowTemplate(employee) {
    const { profileImg, name, email, phone, position, employeeId, password } = employee;
    return /* HTML */ `
      <tr data-link="" data-id="${employeeId}" , data-password="${password}">
        <td>
          <div class="c-checkbox">
            <input type="checkbox" class="c-checkbox__input" />
            <label></label>
          </div>
        </td>
        <td>
          <img src="${profileImg || this.defaultProfileImg}" alt="프로필 사진" />
        </td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${position}</td>
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

  attachEventListeners = () => {
    document.addEventListener('change', (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    });

    const routeToUserInfo = (e) => {
      //   pathMappings = {'/':{ title: 'Home', ComponentClass: Home}};
      if (e.target.parentNode.tagName === 'TR') {
        e.preventDefault();
        const pathMappings = {
          '/userinfo': { title: 'userinfo', ComponentClass: UserInfo },
        };
        const routeView = document.querySelector('route-view');
        const route = new Route({ pathMappings, routeView });
        const href = '/userinfo';

        const props = this.getRowData(e.target.parentNode);
        route.router(props, href);
      }
    };

    this.container.addEventListener('click', (e) => routeToUserInfo(e));
  };
}
