export default class LeaveApplicationItem {
  constructor(data) {
    this.data = data;
  }

  render() {
    return /* HTML */ `
      <li class="leave-application-item">
        <div class="leave-application-item__type">${this.data.typeForLeave}</div>
        <div class="leave-application-item__title">${this.data.applicationTitle}</div>
        <div class="leave-application-item__desc">${this.data.applicationDesc}</div>
      </li>
    `;
  }
}
