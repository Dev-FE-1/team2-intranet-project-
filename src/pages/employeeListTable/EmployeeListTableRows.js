import { compile } from 'handlebars';

export class EmployeeListTableRows {
  constructor({ cid = '.employee-list__rows', ...props }) {
    this.container = document.querySelector(`${cid}`);
    this.props = props;
    this.defaultProfileImg = 'https://i.imgur.com/KM82VtW.png';
  }

  render = async () => {
    const employees = this.props.employees;
    this.container.innerHTML = compile(
      /* HTML */ `{{#each employees}}
        <tr>
          <td>
            <div class="c-checkbox">
              <input type="checkbox" class="c-checkbox__input" />
              <label></label>
            </div>
          </td>
          <td>
            {{#if profileImg}}
            <img src="{{profileImg}}" alt="프로필 사진" />
            {{else}}
            <img src="${this.defaultProfileImg}" alt="프로필 사진" />
            {{/if}}
          </td>
          <td>{{name}}</td>
          <td>{{email}}</td>
          <td>{{phone}}</td>
          <td>{{position}}</td>
        </tr>
        {{/each}}`,
    )({ employees: employees });
    this.attachEventListeners();
  };

  attachEventListeners = () => {
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
