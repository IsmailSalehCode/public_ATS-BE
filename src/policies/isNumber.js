const regexNumber = /^\d+$/;
module.exports = function (input) {
  return regexNumber.test(input);
};
