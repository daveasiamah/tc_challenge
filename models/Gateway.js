const Joi = require("joi");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const GatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const ipv4Pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return ipv4Pattern.test(value);
      },
      message: (props) => `${props.value} is not a valid IPv4 address!`,
    },
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      maxItems: 10,
    },
  ],
});

GatewaySchema.plugin(mongoosePaginate);

const Gateway = mongoose.model("Gateway", GatewaySchema);

function validateGateway(gateway) {
  const schema = Joi.object({
    serialNumber: Joi.string().required(),
    name: Joi.string().required(),
    ipAddress: Joi.string().ip().required(),
    devices: Joi.array().required(),
  });
  return schema.validate(gateway);
}

module.exports = {
  Gateway,
  validateGateway,
};
