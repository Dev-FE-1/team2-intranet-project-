window.addEventListener('DOMContentLoaded', () => {
  const listTableLayoutElem = document.querySelector('.l-table');
  const headerSearchInputElem = document.querySelector('.l-table__header__search input');
  const checkboxAllElem = document.querySelector('#selectAll');
  const checkboxElem = document.querySelectorAll('tbody .c-checkbox__input');

  const handleHeaderSearchInput = () => {
    listTableLayoutElem.classList.toggle('active', headerSearchInputElem.value.length > 0);
  };

  const checkAllCheckboxes = () => {
    checkboxElem.forEach((checkbox) => {
      checkbox.checked = checkboxAllElem.checked;
    });
  };

  headerSearchInputElem.addEventListener('input', handleHeaderSearchInput);
  checkboxAllElem.addEventListener('change', checkAllCheckboxes);
});
