import { EmployeeListTable } from './pages/employeeListTable/EmployeeListTable';

async function app() {
  const appElem = document.querySelector('#app');
  const employeeeTable = new EmployeeListTable();
  appElem.appendChild(employeeeTable.elem);
}

document.addEventListener('DOMContentLoaded', app);
