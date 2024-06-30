import { compile } from 'handlebars';

export class EmployeeTableRows extends HTMLElement {
  constructor(props = {}) {
    super();
    this.defaultProfileImg = 'https://i.imgur.com/KM82VtW.png';
    const { employees } = props;
    this.render(employees);
  }

  // 렌더링
  render(employees) {
    if (!employees) {
      this.innerHTML = '데이터가 없습니다.';
    }

    this.innerHTML = compile(
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
  }

  connectedCallback() {
    this.attachEventListeners();
  }

  // 이벤트 리스너 추가, 체크박스 전체 선택
  attachEventListeners = () => {
    this.addEventListener('change', (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    });
  };
}
