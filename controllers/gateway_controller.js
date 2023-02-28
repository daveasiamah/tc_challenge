const { Gateway, validateGateway } = require("../models/Gateway");
const createError = require("http-errors");
const Joi = require("joi");

// Get all gateways with pagination
async function getAllGateways(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const gateways = await Gateway.paginate(
      {},
      { page, limit, populate: "devices" }
    );

    res.status(200).json(gateways);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// Get a single gateway by ID
async function getGateway(req, res, next) {
  const { id } = req.params.id;
  try {
    const gateway = await Gateway.findById(id).populate({
      path: "devices",
    });

    if (!gateway) return res.status(404).send("Gateway not found.");

    res.status(200).json(gateway);
  } catch (error) {
    console.log(err);
    next(err);
  }
}

// Create a new gateway
async function createGateway(req, res, next) {
  try {
    const { serialNumber, name, ipAddress, devices } = req.body;

    const { error } = validateGateway({
      serialNumber,
      name,
      ipAddress,
      devices,
    });
    if (error) {
      throw createError(400, error.details[0].message);
    }

    const gateway = await Gateway.create({
      serialNumber,
      name,
      ipAddress,
      devices,
    });
    res.status(201).json(gateway);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// Update an existing gateway by ID
async function updateGateway(req, res, next) {
  try {
    const { error: validationError } = validateGateway(req.body);
    if (validationError) {
      throw createError(400, validationError.details[0].message);
    }
    const { id, devices } = req.body;

    const updatedGateway = await Gateway.findByIdAndUpdate(id, {
      devices,
    }).populate("devices");

    if (!updatedGateway) {
      throw createError(404, "Gateway not found.");
    }

    res.status(200).json({ data: updatedGateway });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//Delete a device from a gateway
async function deleteDeviceFromGateway(req, res, next) {
  try {
    // const { id } = req.params;
    // const { deviceId } = req.params.devices;

    const updatedGateway = await Gateway.findByIdAndUpdate(
      req.params.id,
      { $pull: { devices: req.params.deviceId } },
      { new: true }
    ).populate("devices");

    if (!updatedGateway) {
      throw createError(404, "Gateway not found.");
    }

    console.table({
      data: { gateway: req.params.id, device: req.params.deviceId },
    });
    res.status(200).json({ data: updatedGateway });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Delete a gateway by ID
async function deleteGateway(req, res) {
  const gateway = await Gateway.findByIdAndRemove(req.params.id);
  if (!gateway)
    return res
      .status(404)
      .send("The Gateway you are trying to delete was not found.");

  res.status(200).json(gateway);
}

module.exports = {
  getAllGateways,
  getGateway,
  createGateway,
  updateGateway,
  deleteDeviceFromGateway,
  deleteGateway,
};
