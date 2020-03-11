export function flatten(array, result = []) {
  for (var i = 0; i < array.length; i++) {
    const value = array[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}
