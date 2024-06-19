const input = document.querySelector('.l-table__header__search input');
const searchHeader = document.querySelector('.l-table__header__search');

input.addEventListener('input', () => {
  if (input.value.length > 0) {
    searchHeader.classList.add('active');
  } else {
    searchHeader.classList.remove('active');
  }
});
window.addEventListener('DOMContentLoaded', function () {
  const selectAllCheckbox = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');

  selectAllCheckbox.addEventListener('change', function () {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });
});
