const logError = require("./logError");
const { Sequelize } = require("./models");
/** Less Code: By relying on Sequelize's built-in validation, we reduce the amount of code and avoid duplicating validation logic.
Centralized Validation: All validation rules are defined in the Sequelize models, keeping the validation logic centralized and easier to maintain.
Robust Error Handling: Sequelize's validation and unique constraint errors provide detailed error messages that we use to inform the client of what went wrong.*/
function formatDBError(err) {
  let status;
  let message = err.message;
  let hasToLogError = false;
  switch (err.name) {
    case "SequelizeValidationError":
      hasToLogError = true;
      status = 400;
      message = "Bad resource fields.";
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((error) => error.message).join(", ");
      break;
    case "SequelizeDatabaseError":
      status = 500;
      message = "Database error.";
      hasToLogError = true;
      break;
    case "SequelizeTimeoutError":
      status = 504;
      message = "Database request timed out.";
      break;
    case "SequelizeConnectionError":
      status = 500;
      message = "Database connection error.";
      hasToLogError = true;
      break;
    case "SequelizeForeignKeyConstraintError":
      status = 400;
      message = "Foreign key constraint error.";
      hasToLogError = true;
      break;
    case "SequelizeExclusionConstraintError":
      status = 400;
      message = "Exclusion constraint error.";
      hasToLogError = true;
      break;
    case "SequelizeInstanceError":
      status = 400;
      message = "Instance error.";
      hasToLogError = true;
      break;
    case "SequelizeOptimisticLockError":
      status = 409;
      message = "Optimistic lock error.";
      hasToLogError = true;
      break;
    default:
      status = 500;
      hasToLogError = true;
      break;
  }

  if (hasToLogError) {
    logError(err);
  }

  return { status, message };
}
module.exports = { formatDBError };
