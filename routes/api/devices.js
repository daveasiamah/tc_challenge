const express = require("express");
const router = express.Router();
const deviceController = require("../../controllers/device_controller");

// route /api/gateways
router
  .route("/")
  .get(deviceController.getAllDevices)
  .post(deviceController.createDevice);

// route /api/gateways/:id
router
  .route("/:id")
  .get(deviceController.getDevice)
  .put(deviceController.updateDevice)
  .delete(deviceController.deleteDevice);

module.exports = router;
