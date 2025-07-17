// Recusive read json array object
export function findValuesObject(obj, key) {
  return findValuesObjectHelper(obj, key, []);
}

export function findValuesObjectHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesObjectHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if (typeof obj == "object" && obj !== null) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesObjectHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}
