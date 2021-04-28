export class ObjectSerializer {
  serialize(object) {
    return this._iterateObject(object);
  }

  _iterateObject(object) {
    for (const prop in object) {
      // if(typeof object[prop] === "object" && !object[prop].constructor) {
      //     object[prop] = this._iterateObject(object[prop])
      // }

      if (object[prop] instanceof Date) {
        object[prop] = String(object[prop]);
      }
    }

    return object;
  }
}
