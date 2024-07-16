export const fetchProfileImage = async (employeeListFetch) => {
  const employeeId = sessionStorage.getItem('id');

  if (!employeeId) {
    console.error('Employee ID not found');
    return null;
  }

  try {
    const employee = await employeeListFetch.getEmployeeInFoListById(employeeId);
    return employee.profileImg;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateProfileImage = async (instance, employeeListFetch) => {
  const profileImage = await fetchProfileImage(employeeListFetch);
  if (profileImage) {
    instance.render(profileImage);
  }
};
