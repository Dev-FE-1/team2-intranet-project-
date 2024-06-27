import login from "./pages/admin/login/login.js"
import {mypageTemplate , MyPage} from  "./pages/user/mypage/index.js"
function app(){
    const anc = document.querySelectorAll('a')

    // anc.forEach(element => {
    //     element.addEventListener('click', navigatePage)
    // });
    document.body.addEventListener('click',navigatePage)

    window.addEventListener('popstate',(event)=>{
        console.log(event)
        route()
    })

    route()

    // 일단 새로고침이나 페이지를 닫지 않는다고 생각하고
    // 사용자랑 관리자는 라우트를 다르게
    //  login()&&route()
    // 유효성 확인
    // 이후 메인 사용자 or 관리자 페이지로 이동
    //일단은 메인 페이지에 내 관리창만 링크 형태로 구현
}

const navigatePage = event => {
    event.preventDefault()
    const anc = event.target.closest('a')
    if(anc&&anc.href){
        const path = anc.getAttribute('href')
        history.pushState(null,null,path)
        route()
    }
}

const route =() =>{

    const mypage = new MyPage('#app',mypageTemplate())

    const app = document.querySelector('#app')
    const path = location.pathname


    switch (path) {
        case '/':
            app.innerHTML = `<h1>Home</h1><a href='/mypage'>Mypage</a>`
            break;
    
        case '/mypage':
            mypage.render()
            // document.querySelector('#app').style.color = 'red'
            // loadCSS('workingTimer')
            // loadCSS('workingTimer')
            // .then(() => {
            //   mypage.render(); // CSS 로드가 완료된 후 렌더링합니다.
            // });
            break;
    
        default:
            break;
    }
}


// const loadCSS = (filename) => {
//     const link = document.createElement('link')
//     link.rel = 'stylesheet'
//     link.href = `./pages/user/mypage/${filename}.css`
//     document.head.appendChild(link)
// }

// const loadCSS = (filename) => {
//     return new Promise((resolve) => {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = `/pages/user/mypage/${filename}.css`;
//       link.onload = resolve; // CSS 로드가 완료되면 Promise를 해결합니다.
//       document.head.appendChild(link);
//     });
//   };
  

document.addEventListener('DOMContentLoaded',app)