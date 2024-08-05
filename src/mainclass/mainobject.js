class ObjectState {
  constructor() {
    this.data = [];
  }

  functionsetdata(integer) {
    this.data.push(integer);
  }

  getdata() {
    return this.data[this.data.length - 1];
  }
}
