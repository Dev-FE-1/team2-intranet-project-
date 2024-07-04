import handlebars from 'handlebars';

export default function headerTemplate() {
  const menus = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: '갤러리',
      link: '#',
    },
    {
      title: '근태시청',
      link: '#',
    },
    {
      title: '마이페이지',
      link: '/mypage',
    },
  ];

  const html = handlebars.compile(
    `
        <header class="header">
        <div class="logo">INTRANET</div>
        <nav class="nav-links">
            {{#each menus}}
                <a href="{{link}}">{{title}}</a>
            {{/each}}
        </nav>
        <a href="/userLogIn" class="userLogIn">로그인</a>
        </header>
        `,
  );

  return html({ menus: menus });

  // let menuHtml = menus.map(element => `<a href=${element.link}>${element.title}</a>`).join('')
  // return `
  //     <header class="header">
  //     <div class="logo">INTRANET</div>
  //     <nav class="nav-links">
  //     ${menuHtml}
  //     </nav>
  //     <a href="/userLogIn" class="userLogIn">로그인</a>
  //     </header>
  //     `
}
