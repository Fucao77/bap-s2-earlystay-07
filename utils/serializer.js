export function serializeDateInObject(object) {
  for (const prop in object) {
    if (object[prop] instanceof Date) {
      object[prop] = String(object[prop]);
    }
  }

  return object;
}
