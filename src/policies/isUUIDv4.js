const regexUUIDv4 =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
module.exports = function (inputId) {
  const isValidUUIDv4 = regexUUIDv4.test(inputId);
  return isValidUUIDv4;
};
