function myObjectFreezeDeep(object) {
  if (typeof object === 'object') {
    for (const key in object) {
      if (typeof object[key] === 'object') {
        myObjectFreezeDeep(object[key]);
      }
    }
    return Object.freeze(object);
  }
  return object;
}

module.exports = myObjectFreezeDeep;
