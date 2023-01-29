const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/item_controller");

// route /api/items
router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.createItem);

// route /api/items/:id
router
  .route("/:id")
  .get(itemController.getItemById)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
