import axios from 'axios';

export class EmployeeListFetch {
  constructor(urlPath) {
    this.urlPath = urlPath || '/api/v1/users';
  }

  //GET
  async getEmployeeList() {
    try {
      const response = await axios.get(this.urlPath);
      return [...response.data.data];
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //GET by id, check if employee exists
  async getEmployeeListById(employeeId) {
    try {
      const response = await axios.get(`${this.urlPath}/show-info`, {
        data: { employeeId: employeeId },
      });
      return response.data.data.isExist;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //GET by id, check if employee exists
  // 직원 이름, 아이디, 이메일, 휴대폰번호, 직급, 프로필 이미지를 가져옴.
  async getEmployeeInFoListById(employeeId) {
    try {
      const response = await axios.get(`${this.urlPath}/show-info`, {
        data: { employeeId: employeeId },
      });
      return response.data.data.isExist;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //POST
  async addEmployee(employee) {
    try {
      const { id, ...employeedata } = employee;
      console.log(`employeedata: ${employeedata}, id: ${id}`);
      const response = await axios.post(this.urlPath, {
        data: employee,
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //PUT
  async updateEmployee(employee) {
    try {
      const response = await axios.put(`${this.urlPath}/edit`, {
        data: employee,
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //DELETE
  async deleteEmployee(employeeId) {
    try {
      await axios.delete(`${this.urlPath}/delete`, {
        data: { id: parseInt(employeeId) },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
