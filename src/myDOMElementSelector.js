function myDOMElementSelector(dataAttr, callback) {
  const arrayOfElements = document.querySelectorAll(`[data-${dataAttr}]`);
  arrayOfElements.forEach(callback);
}
