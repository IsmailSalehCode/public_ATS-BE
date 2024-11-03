function isValidDate(date) {
  return !isNaN(date.getTime());
}
const msgInvalidDate = "Invalid date passed.";

module.exports = {
  async createdAtInBody(req, res, next) {
    const strCreatedAt = req.body.createdAt;
    const dateCreatedAt = new Date(strCreatedAt);
    if (!isValidDate(dateCreatedAt)) {
      return res.status(400).send(msgInvalidDate);
    }
    next();
  },
  async startEndDatePathParams(req, res, next) {
    const { startDt, endDt } = req.params;
    const startDate = new Date(startDt);
    const endDate = new Date(endDt);
    // console.log(startDate, endDate);
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return res.status(400).send(msgInvalidDate);
    }
    if (endDate <= startDate) {
      return res.status(400).send("End date must be after start date!");
    }
    req.startDate = startDate;
    req.endDate = endDate;
    next();
  },
};
