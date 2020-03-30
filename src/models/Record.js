class Record {
  constructor(type, value) {
    this.createdAt = Date.now();
    this.type = type;
    this.value = value;
  }
}

export default Record;
