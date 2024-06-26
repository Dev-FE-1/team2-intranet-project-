export class EmployeeListTableRows {
  constructor({ cid = '.employee-list__rows', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
  }

  render = async () => {
    this.container.innerHTML = /* HTML */ `${this.props.employees
      .map((employee) => this.tableRowTemplate(employee))
      .join('')}`;
    this.setEventListeners();
  };

  tableRowTemplate = (employee) => {
    return /* HTML */ ` <tr>
      <td>
        <div class="c-checkbox">
          <input type="checkbox" class="c-checkbox__input" />
          <label></label>
        </div>
      </td>
      <td>
        <img src="${employee.profileImg}" alt="프로필 사진" />
      </td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.phone}</td>
      <td>${employee.position}</td>
    </tr>`;
  };

  // render = async () => {
  //   this.container.innerHTML = this.tableRowTemplate2()({ employees: this.props.employees });
  //   this.setEventListeners();
  // };

  // tableRowTemplate2 = () => {
  //   return compile(
  //     /* HTML */ ` {{#each employees}}
  //       <tr>
  //         <td>
  //           <div class="c-checkbox">
  //             <input type="checkbox" class="c-checkbox__input" />
  //             <label></label>
  //           </div>
  //         </td>
  //         <td>
  //           <img src="{{profileImg}}" alt="프로필 사진" />
  //         </td>
  //         <td>{{name}}</td>
  //         <td>{{email}}</td>
  //         <td>{{phone}}</td>
  //         <td>{{position}}</td>
  //       </tr>`,
  //   );
  // };

  setEventListeners = () => {
    document.addEventListener('change', (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    });
  };
}
