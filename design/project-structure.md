src
├── assets (정적 파일을 담는 폴더)
│     ├── images
│     └── style (css 파일)
│           ├── core
│           │    ├── fonts
│           │    ├── fonts.css
│           │    └── reset.css
│           └── style.css (컬러,사이즈,폰트 등 변수 및 공통 스타일)
│
├── components (UI를 출력하는 컴포넌트. prop의 함수에 의해 state를 변경)
│           ├── card
│           │    ├── Card.css
│           │    └── Card.js
│           ├── header
│           │    ├── Header.css
│           │    └── Headdr.js        
│           └── footer
│                ├── Footer.css
│                └── Footer.js  
│
│
├── util(자주 사용하는 특정 함수들)
│     ├── counter.js 
│     └── datetime.js
│
├── index.html (브라우저에 업로드될 HTML파일)
├── index.js (애플리케이션의 시작점 (App을 생성))
│
└── pages
      ├── admin
      │     ├── login
      │     │    ├── AdminLogin.css
      │     │    └── AdminLogin.js
      │     └── dashboard
      │          ├── AdminDash.css
      │          └── AdminDash.js
      └── user
            ├── login
            │    ├── UserLogin.css
            │    └── UserLogin.js
            └── dashboard
                 ├── UserDash.css
                 └── UserDash.js


index.html 브라우저에 업로드될 HTML파일
api fetch 관련 유틸리티
asserts gif, png와 같은 이미지 정적 파일
components UI를 출력하는 컴포넌트 ( prop의 함수에 의해 state를 변경 )
container 데이터와 데이터 조작에 관한 함수를 components를 제공
styles css 파일
App.js App 컴포넌트
index.js 애플리케이션의 시작점 (App을 생성)
