export class DummyApiClients {
  constructor(baseURL, clients) {
    this.baseURL = baseURL || '/api/v1';
    this.clients = clients || [];
  }
}
