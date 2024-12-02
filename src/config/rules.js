// TODO: make sure they match FE
const regexPass =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^.(&*_)-]).{8,32}$/;
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regexNFCtag = /^[a-zA-Z0-9]{8,20}$/;
const regexPRT = /^[a-fA-F0-9]{64}$/;

module.exports = {
  regexPass,
  regexEmail,
  regexNFCtag,
  regexPRT,
};
