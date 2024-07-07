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
}
