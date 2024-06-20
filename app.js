import EmployeeTable from './EmployeeListTable.js';

const appElem = document.querySelector('#app');
const employeeeTable = new EmployeeTable();

appElem.appendChild(employeeeTable.elem);
