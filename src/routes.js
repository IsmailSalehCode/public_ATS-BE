const TagPolicy = require("./policies/TagPolicy");
const KioskPolicy = require("./policies/KioskPolicy");
const AttendanceController = require("./controllers/AttendanceController");
const AuthController = require("./controllers/AuthController");
const OneEntryPerEmployee_TimeLimitPolicy = require("./policies/OneEntryPerEmployee_TimeLimitPolicy");
const KioskController = require("./controllers/KioskController");
const isCaptchaValid = require("./policies/isCaptchaValid");
const isAuthenticated = require("./policies/isAuthenticated");
const isAdmin = require("./policies/isAdmin");
const existsUser = require("./policies/existsUser");
const existsEmployee = require("./policies/existsEmployee");
const UserController = require("./controllers/UserController");
const NFCtagController = require("./controllers/NFCtagController");
const EmployeeController = require("./controllers/EmployeeController");
const AttendanceEntryPolicy = require("./policies/AttendanceEntryPolicy");
const validateDate = require("./policies/validateDate");
const validateBool = require("./policies/validateBool");
const isPasswordFormatValid = require("./policies/isPasswordFormatValid");
const computePasswordResetToken = require("./utils/computePRT");
const express = require("express");
const isEmailFormatValid = require("./policies/isEmailFormatValid");
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.send("ponggg");
}); //TODO: delete?

// === KIOSK ENDPOINTS ===
router.get(
  "/kiosk/get-startup-vars",
  KioskPolicy.existsKiosk,
  KioskPolicy.isEnabled,
  KioskController.getStartUpVars
);
router.post(
  "/kiosk/insert-attendance-entry",
  KioskPolicy.existsKiosk,
  KioskPolicy.isEnabled,
  TagPolicy.isTagIdValid,
  TagPolicy.existsTag,
  TagPolicy.tagHasEmployee,
  validateBool.goesToWorkInBody,
  AttendanceEntryPolicy.previousAttendanceEntryIsWorkingFieldHasUnexpectedValue,
  AttendanceController.insertAttendanceEntry
);
// OneEntryPerEmployee_TimeLimitPolicy.validate,

// === ATS Portal ENDPOINTS ===
router.post(
  "/login",
  isCaptchaValid,
  isPasswordFormatValid,
  isEmailFormatValid,
  AuthController.login
);
router.post(
  "/forgot-password",
  isCaptchaValid,
  isEmailFormatValid,
  AuthController.forgotPassword
);
// computePasswordResetToken attaches associated user to the req obj, so that changePass can do its thing
router.patch(
  "/change-password/:passwordResetToken",
  isPasswordFormatValid,
  computePasswordResetToken,
  UserController.changePass
);
// --- Users ---
router.get("/users", isAuthenticated, isAdmin, UserController.getUsers);
router.delete(
  "/users/:id",
  isAuthenticated,
  isAdmin,
  existsUser,
  UserController.deleteUser
);
router.patch(
  "/users/:id",
  isAuthenticated,
  isAdmin,
  existsUser,
  UserController.editUser
);
router.patch(
  "/users/change-pass/:id",
  isAuthenticated,
  isAdmin,
  existsUser,
  isPasswordFormatValid,
  UserController.changePass
);
router.post(
  "/users",
  isAuthenticated,
  isAdmin,
  isPasswordFormatValid,
  UserController.addUser
);
// --- Kiosks ---
router.get("/ats-kiosks", isAuthenticated, KioskController.getAll);
// id is in query param -> kiosk_id. KioskPolicy.existsKiosk works with it.
router.delete(
  "/ats-kiosks",
  isAuthenticated,
  KioskPolicy.existsKiosk,
  KioskController.deleteOne
);
router.patch(
  "/ats-kiosks",
  isAuthenticated,
  KioskPolicy.existsKiosk,
  KioskController.edit
);
router.post("/ats-kiosks", isAuthenticated, KioskController.addOne);
// --- NFC tags ---
router.get(
  "/nfc-tags/unassigned",
  isAuthenticated,
  NFCtagController.getAllUnassigned
);
router.get(
  "/nfc-tags/assigned",
  isAuthenticated,
  NFCtagController.getAllAssigned
);
router.patch(
  "/nfc-tags/assign-tag-to-employee/:tagId/:employeeId",
  isAuthenticated,
  TagPolicy.isTagIdValid,
  TagPolicy.existsTag,
  existsEmployee,
  NFCtagController.assignTagToEmployee
);
router.delete(
  "/nfc-tags/:tagId",
  isAuthenticated,
  TagPolicy.isTagIdValid,
  TagPolicy.existsTag,
  NFCtagController.deleteOne
);
router.post(
  "/nfc-tags",
  isAuthenticated,
  TagPolicy.isTagIdValid,
  NFCtagController.addOne
);
// ============================
// --- Employees ---
router.get("/employees", isAuthenticated, EmployeeController.getAll);
router.delete(
  "/employees/:employeeId",
  isAuthenticated,
  existsEmployee,
  EmployeeController.deleteEmployeeAndAssociatedATEs
);
router.patch(
  "/employees/:employeeId",
  isAuthenticated,
  existsEmployee,
  EmployeeController.edit
);
router.post("/employees", isAuthenticated, EmployeeController.addOne);
router.delete(
  "/employees/unassign-tag/:employeeId",
  isAuthenticated,
  existsEmployee,
  EmployeeController.unassignTagAndDeleteAssociatedATEs
);
// ============================
// --- ATEs ---
router.get(
  "/attendance-entries/:startDt/:endDt",
  isAuthenticated,
  validateDate.startEndDatePathParams,
  AttendanceController.getAllATEs
);
router.post(
  "/attendance-entries",
  isAuthenticated,
  KioskPolicy.existsKiosk,
  TagPolicy.isTagIdValid,
  TagPolicy.existsTag,
  TagPolicy.tagHasEmployee,
  validateDate.createdAtInBody,
  validateBool.goesToWorkInBody,
  AttendanceController.insertAttendanceEntry
);
router.patch(
  "/attendance-entries/:attendanceEntryId",
  AttendanceEntryPolicy.isAttendanceEntryIdValid,
  AttendanceEntryPolicy.existsAttendanceEntry,
  KioskPolicy.existsKiosk,
  TagPolicy.isTagIdValid,
  TagPolicy.existsTag,
  TagPolicy.tagHasEmployee,
  validateDate.createdAtInBody,
  validateBool.goesToWorkInBody,
  AttendanceController.editAttendanceEntry
);
router.delete(
  "/attendance-entries/:attendanceEntryId",
  isAuthenticated,
  AttendanceEntryPolicy.isAttendanceEntryIdValid,
  AttendanceController.deleteOne
);
router.get(
  "/attendance-entries/employees/:startDt/:endDt",
  isAuthenticated,
  validateDate.startEndDatePathParams,
  AttendanceController.getEachEmployeesATEs
);

module.exports = router;
