import { compile } from 'handlebars';

const html = compile(`
  <ul>
  {{#each menus}}
    <li><a href="{{path}}"><span>{{label}}</span></a></li>
  {{/each}}
  </ul>
`);

export function navBar(props) {
  const { cid } = props;
  const container = document.querySelector(`#${cid}`);

  container.innerHTML = html(props);
}
