import avatarDefaultImg from '../../assets/images/avatar-default.jpg';
export class EmployeeListTableRows {
  constructor({ cid = '.employee-list__rows', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
    this.defaultProfileImg = avatarDefaultImg;
  }

  render = async (employees) => {
    this.container.innerHTML = employees
      .map((employee) => this.tableRowTemplate(employee))
      .sort((a, b) => b.id - a.id)
      .join('');
  };

  tableRowTemplate(employee) {
    const { profileImg, name, email, phone, position, employeeId, password, id } = employee;
    return /* HTML */ `
      <tr data-data-id="${id}" data-id="${employeeId}" data-password="${password}">
        <td>
          <div class="c-checkbox">
            <input type="checkbox" class="c-checkbox__input" />
            <label></label>
          </div>
        </td>
        <td class="employee-list__info">
          <img
            class="employee-default-img"
            src="${profileImg || this.defaultProfileImg}"
            alt="프로필 사진"
          />
        </td>
        <td class="employee-list__info">${name}</td>
        <td class="employee-list__info">${email}</td>
        <td class="employee-list__info">${phone}</td>
        <td class="employee-list__info">${position}</td>
      </tr>
    `;
  }
}
