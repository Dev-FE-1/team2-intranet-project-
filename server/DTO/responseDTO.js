export class ResponseDTO {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(data, message = 'ok') {
    return new ResponseDTO(200, message, data);
  }

  static fail(message = 'fail', data = null) {
    return new ResponseDTO(400, message, data);
  }
}
