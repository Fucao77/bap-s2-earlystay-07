export class ManagerValidator {
  constructor(body) {
    this.body = body;
    this.errors = {};
  }

  get isValid() {
    return Object.keys(this.errors).length === 0;
  }

  isString(field) {
    if (typeof this.body[field] !== 'string') {
      this.errors[field] = field + ' is not a string';
    }
    return this;
  }

  isNumber(field) {
    if (typeof this.body[field] !== 'number') {
      this.errors[field] = field + ' is not a number';
    }
    return this;
  }

  isRange(field, min, max) {
    if (this.body[field].length < min || this.body[field].length > max) {
      this.errors[field] = field + ' is not in the required length';
    }
    return this;
  }

  isDate(field) {
    if (isNaN(Date.parse(this.body[field]))) {
      this.errors[field] = field + ' this input is not a date';
    }
    return this;
  }

  isImage(field) {
    if (!this.body[field].type == 'image') {
      this.errors[field] = field + ' this file is not an image';
    }
    console.log(this.body[field]);
    return this;
  }
}
