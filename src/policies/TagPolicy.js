const { NFCtag } = require("../models");
const { regexNFCtag } = require("../config/rules");

module.exports = {
  async tagHasEmployee(req, res, next) {
    // always preceeded by existsTag middleware function which includes the associated Employee
    const employee = req.nfc_tag.Employee;
    if (!employee) {
      return res.status(404).send({
        message: "This tag has no employee registered!",
      });
    }
    req.employee = employee;
    next();
  },
  async isTagIdValid(req, res, next) {
    const NFCtagId = req.body.tag_id || req.params.tagId;
    const isIdValid = regexNFCtag.test(NFCtagId);
    if (!isIdValid) {
      return res.status(400).send({ message: "Invalid tag." });
    }
    req.NFCtagId = NFCtagId;
    next();
  },
  async existsTag(req, res, next) {
    //  always preceeded by isTagIdValid, which includes NFCtagId in the req object. Reason for separation: when adding a new NFC tag to the DB, i want to make sure that the passed in ID is OK, which means that existsTag check would get in the way!
    const nfc_tag = await NFCtag.findOne({
      where: { id: req.NFCtagId },
      include: ["Employee"],
    });

    if (!nfc_tag) {
      return res.status(404).send({
        message: "This card is not registered!",
      });
    }

    req.nfc_tag = nfc_tag;
    next();
  },
};
