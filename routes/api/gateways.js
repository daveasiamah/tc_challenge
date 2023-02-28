const express = require("express");
const router = express.Router();
const gatewayController = require("../../controllers/gateway_controller");

// route /api/gateways
router
  .route("/")
  .get(gatewayController.getAllGateways)
  .post(gatewayController.createGateway);

// route /api/gateways/:id
router
  .route("/:id")
  .get(gatewayController.getGateway)
  .put(gatewayController.updateGateway)
  .delete(gatewayController.deleteGateway);

//route /api/gateways/:id/devices/:deviceId
router.delete(
  "/:id/devices/:deviceId",
  gatewayController.deleteDeviceFromGateway
);

module.exports = router;
