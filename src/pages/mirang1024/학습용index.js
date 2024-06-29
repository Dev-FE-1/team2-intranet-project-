// 홈 페이지의 클래스 컴포넌트 불러오기
import Home from './view/Employee/Home
import Gallery from './view/Employee/Gallery';

// HTML에서 id가 app인 요소 선택
const app = document.querySelector('#app');

// 라우트 설정 : 경로에 따라 각 페이지의 클래스 컴포넌트 렌더링하도록 설정 = 경로별로 페이지 정보가 들어있음
const routes = {
  '/home': { title: 'Home', render: () => renderComponent(Home) },
  '/gallery': { title: 'Gallery', render: () => renderComponent(Gallery) },
};

// 컴포넌트를 렌더링할 함수 생성
//  app 요소에 들어갈 페이지 컴포넌트 클래스를 렌더링 하는 화살표 함수 만들기
const renderComponent = (ComponentClass) => {
  // 페이지 컴포넌트 클래스에서 인스턴스를 만든다.
  // 인스턴스의 인자는 페이지 컴포넌트를 삽입할 요소인 containder(여기서는 app)와
  // 컴포넌트에 전달된 데이터(컴포넌트의 속성, 프로퍼티나 동적 데이터)인 props다.
  const componentInstance = new ComponentClass(app, {});
  // 페이지 컴포넌트 클래스의 인스턴스로부터 렌더 메소드를 호출하여 페이지 컴포넌트의 HTML을 반환한다.
  return componentInstance.render();
};

// 라우터 함수
function router() {
  // 현재 URL 경로와 일치하는 routes 객체의 경로별로 정의된 페이지 정보를 view에 할당
  let view = routes[location.pathname];
  // routes에 현재 경로에 맞는 페이지 정보가 있을 경우
  if (view) {
    // 해당 페이지의 이름을 브라우저 탭에 표시하고
    document.title = view.title;
    // 해당 페이지를 렌더링할 메소드를 호출하고 그 결과를 app 요소에 삽입한다
    app.innerHTML = view.render();
    // routes에 현재 경로에 맞는 페이지 정보가 없을 경우
  } else {
    // 현재 페이지의 URL을 변경해서 홈페이지로 리디렉션하기
    history.replaceState('', '', '/home');
    // 라우터 함수를 호출해 초기화하기
    router();
  }
}
/*
history.replaceState(stateObj, title, url) 메소드 :
HTML5 History API의 메서드로, 브라우저의 히스토리 스택을 조작하며 페이지를 새로고침하지 않고 URL을 변경할 수 있도록 만든다.
브라우저의 히스토리 스택 :
사용자가 방문한 페이지들이 스택이라는 브라우저 메모리에 저장되어 기록된 정보를 통해 이전/다음 페이지로 이동할 수 있다.
인자1 - 상태 객체(stateObj) : 현재 페이지의 상태를 나타내는 객체로, 브라우저 히스토리 스택에서 페이지 전환을 관리한다.
히스토리 객체에 저장되며 특정 상태 데이터를 저장해 페이지를 복원할 수도 있으나
대부분 방문 기록을 남기지 않게 해서 히스토리 스택에 불필요한 데이터를 남기지 않고 URL 변경을 효율적으로 처리하기 위해 빈 문자열이나 null로 저장한다.
인자2 - 페이지 제목(title) : 브라우저 탭에 표시될 페이지의 이름, 변경하지 않을 경우 빈 문자열로 설정 가능 
인자3 - 현재 페이지 주소 변경(url)

이를 활용해 로그인을 하지 않은 사용자가 특정 페이지 경로에 접속하려는 경우,
또는 권한이 없는 페이지 경로에 접속하려는 경우, 잘못된 경로로 접근한 경우,
네트워크 오류나 서버에서 페이지를 찾을 수 없는 경우 동에서 특정 페이지로 리디렉션 되도록 만들 수 있다.
*/

// Handle navigation : 클릭 이벤트 발생 시 실행되는 이벤트 처리 함수
window.addEventListener('click', (e) => {
  // 특정 요소가 [data-link] 속성을 가지고 있는지 확인하고 해당 요소가 링크(<a> 태그)인 경우에만 실행
  // 사용자가 클릭한 요소는 실제로 페이지를 변경시키는 링크다.
  if (e.target.matches('[data-link]')) {
    // a태그의 기본 동작인 클릭 시 페이지로 이동하는 동작을 중지시킨다
    e.preventDefault();
    // HTML5 History API의 메서드
    history.pushState('', '', e.target.href);
    router();
  }
});

/*
e = 이벤트 객체(event object) : 이벤트가 발생한 상황에 대한 정보를 담은 객체로
이벤트 발생 시점, 이벤트 타입, 발생 위치, 발생 요소 등이 해당된다.

e.target : 이벤트가 발생한 요소

data- 접두어 : HTML 요소에 사용자가 직접 정의한 데이터를 저장하며, 즉 사용자 데이터 속성(data attribute)이라고 부른다.
JavaScript에서 쉽게 접근하고 조작할 수 있도록 만들어진 속성이다.

[data-link] :
<a> 태그의 링크 요소에 사용자가 정의한 데이터를 저장하는 속성

e.preventDefault(): 이벤트의 기본 동작을 중지시키는 메소드

history.pushState
브라우저의 세션 히스토리 스택에 새로운 상태를 추가

a 태그는 하이퍼링크를 나타내는 태그고 필수 속성으로 href가 있다. 링크를 클릭하면 페이지로 이동하는 기본 동작을 가진다.


*/

// Update router : 아래 이벤트 중 하나가 발생했을 때 router 함수 호출 및 페이지 업데이트
// 브라우저 세션 스토리지 활성화될 때 발생하는 이벤트 : 앞으로/뒤로 가기 클릭시 라우터 함수를 호출하여 현재 URL에 맞는 페이지를 다시 렌더링한다.
window.addEventListener('popstate', router);
// 초기 HTML 문서가 완전히 로드되고 파싱되었을 때 발생하는 이벤트 : 페이지가 처음 로드될 때 router 함수를 호출하여 현재 URL에 맞는 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', router);
