const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Joi = require("joi");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["online", "offline"],
  },
});

DeviceSchema.plugin(mongoosePaginate);

const Device = mongoose.model("Device", DeviceSchema);

function validateDevice(device) {
  const schema = Joi.object({
    uid: Joi.number().min(3).required(),
    vendor: Joi.string().min(3).max(150).required(),
    status: Joi.string().required(),
  });

  return schema.validate(device);
}

module.exports = {
  Device,
  validateDevice,
};
