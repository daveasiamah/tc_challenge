const { Device, validateDevice } = require("../models/Device");
const createError = require("http-errors");
const Joi = require("joi");

// Joi validation schema
const querySchema = Joi.object({
  pageNumber: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1),
}).unknown(false);

// Get all gateways with pagination
async function getAllDevices(req, res, next) {
  try {
    // Set default values for page number and page size
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Validate query parameters with Joi
    const { error, value } = querySchema.validate(req.query);
    if (error) {
      throw createError(400, error.details);
    }

    // Query for gateways using mongoose-paginate-v2
    const options = {
      page: pageNumber,
      limit: pageSize,
      sort: "name",
    };
    const result = await Device.paginate({}, options);

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

// Get a single device by ID
async function getDevice(req, res) {
  const device = await Device.findById(req.params.id);
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
}

// Create a new device
async function createDevice(req, res, next) {
  try {
    const { uid, vendor, status, gateway } = req.body;

    // const { error } = validateDevice({ uid, vendor, status, gateway });
    // if (error) {
    //   throw createError(400, error.details[0].message);
    // }

    const device = await Device.create({ uid, vendor, status, gateway });

    res.status(201).json({ data: device });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// Update an existing device by ID
async function updateDevice(req, res) {
  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const device = await Device.findByIdAndUpdate(
    req.params.id,
    {
      serialNumber: req.body.serialNumber,
      name: req.body.name,
      ipAddress: req.body.ipAddress,
    },
    { new: true }
  );

  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
}

// Delete a device by ID
async function deleteDevice(req, res) {
  const device = await device.findByIdAndRemove(req.params.id);
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
}

module.exports = {
  getAllDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
};
