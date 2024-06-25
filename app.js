import { EmployeeListTable } from './EmployeeListTable.js';

const appElem = document.querySelector('#app');
const employeeeTable = new EmployeeListTable();

appElem.appendChild(employeeeTable.elem);
