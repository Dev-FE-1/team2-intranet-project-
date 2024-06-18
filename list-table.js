const input = document.querySelector('.l-table__header__search input');
const searchHeader = document.querySelector('.l-table__header__search');

input.addEventListener('input', () => {
  if (input.value.length > 0) {
    searchHeader.classList.add('active');
  } else {
    searchHeader.classList.remove('active');
  }
});
