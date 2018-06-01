//this function is used so that we can check all data types validator only check for strings

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.length.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

module.exports = isEmpty;
