import { compile } from 'handlebars';
export function layout() {
  return compile(
    `<nav id="nav"></nav>
    <div id="content"></div>`,
  )();
}
