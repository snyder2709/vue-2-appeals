export default function saveDataByKey(keyList, data, separator = "_") {
  const result = {};
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  keyList.forEach((key) => {
    const keys = key.split(separator);
    let currentData = data;

    for (let i = 0; i < keys.length; i++) {
      const part = keys[i];
      // eslint-disable-next-line no-debugger
      if (
        currentData !== null &&
        currentData !== undefined &&
        hasOwnProperty.call(currentData, part)
      ) {
        currentData = currentData[part];
      } else {
        currentData = "";
        break;
      }
    }

    if (currentData !== undefined) {
      const resultKey =
        separator !== "_" && key.indexOf(separator) !== -1
          ? key.split(separator).join("_")
          : key;
      result[resultKey] = currentData;
    }
  });

  if (typeof result.then === "function") {
    return Promise.resolve(result);
  }

  return Promise.resolve(result);
}
