import { EmployeeListTable } from './src/pages/employeeListTable/EmployeeListTable.js';
document.addEventListener('DOMContentLoaded', () => {
  const employeeListTable = new EmployeeListTable({ cid: '#app' });
  employeeListTable.render();
});
