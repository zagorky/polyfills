Array.prototype.myCustomFilter = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw TypeError();
  }

  const array = [];
  for (let i = 0; i < this.length; i += 1) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      array.push(this[i]);
    }
  }
  return array;
};
