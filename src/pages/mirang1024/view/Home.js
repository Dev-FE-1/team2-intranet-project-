import EmployeeHeader from '../header/EmployeeHeader';
import Footer from '../footer/Footer';
// import 홈 상단 from '../';
// import 홈 하단 from '../';

// 홈 페이지 클래스 컴포넌트 정의 및 내보내기
export default class Home {
  // 홈 클래스의 생성자를 통해 객체의 속성으로 container와 props 값 설정
  constructor(container, props) {
    // 홈 클래스 컴포넌트를 삽입할 요소로 컨테이너 설정
    this.container = container;
    //// 홈 클래스 컴포넌트애 전달된 데이터(컴포넌트의 속성, 프로퍼티나 동적 데이터)
    this.props = props;
  }
  // 생성자는 클래스의 인스턴스를 만들 때 호출되는 메소드로,   객체가 생성될 때 필요한 속성이나 상태를 설정하는 초기화 작업을 수행한다.

  // 홈 클래스의 인스턴스가 호출할 수 있는 렌더 메소드
  render() {
    // 헤더와 푸터 클래스 컴포넌트로부터 인스턴스 생성
    const EmployeeHeader = new EmployeeHeader();
    // const 홈 상단 = new 홈 상단 클래스 인스턴스();
    // const 홈 하단 = new 홈 하단 클래스 인스턴스();
    const footer = new Footer();
    // 홈 클래스의 생성자에서 초기화된 HTML 요소에 삽입할 내용
    this.container.innerHTML = `
      // 헤더의 인스턴스인 렌더 메소드를 호출한 결과인 헤더의 HTML을 문자열에 삽입
      ${EmployeeHeader.render()}
      // div 요소를 추가하여 클래스 이름이 main인 div를 만들기, 그 안에 홈 상단, 하단 인스턴스의 메소드 호출
      <div class='main'></div>
      ${footer.render()}
    `;
    // render 메소드가 실행된 후 container 요소에 최종적인 HTML 콘텐츠를 반환
    return this.container.innerHTML;
  }
}
