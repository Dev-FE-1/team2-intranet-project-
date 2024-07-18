export class SearchComponent {
  constructor(container, onSearch) {
    this.container = container ?? document.querySelector('.employee-list__header__search');
    this.onSearch = onSearch;
  }

  // 검색바의 검색아이콘 토글 함수: 직원 검색바 입력시, 검색 아이콘 색깔이 진한 검정색으로 바뀌게함.
  onInputToggleSearchIcon = (e) => {
    if (e.target.id === 'search') {
      this.container.classList.toggle('active', e.target.value.length > 0);
    }
  };

  // 직원 리스트 검색 요소에 붙여진 submit핸들러함수: 직원 검색바에 입력하고 enter를 눌렀을 때를 감지
  onSubmit = async (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector('input').value;
    this.onSearch(searchInput);
  };

  render() {
    this.container.innerHTML = /* HTML */ `
      <form action="#" class="employee-list__header__search-form">
        <label for="search">검색</label>
        <input type="search" id="search" placeholder="이름 또는 이메일로 검색하기" />
      </form>
    `;
    this.container.addEventListener('submit', this.onSubmit);
    this.container.addEventListener('input', this.onInputToggleSearchIcon);
  }
}
