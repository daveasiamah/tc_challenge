const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min: 3,
    max: 255,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    required: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: { type: Date, default: Date.now },
});

ItemSchema.plugin(mongoosePaginate);

const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

const options = {
  page: 1,
  limit: 10,
  collation: {
    locale: "en",
  },
  customLabels: myCustomLabels,
};

module.exports = mongoose.model("Item", ItemSchema);
