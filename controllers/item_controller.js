const Item = require("../models/Item");

//TODO: Wrap operations in Try Catch blocks

exports.getAllItems = async (req, res) => {
  try {
    const result = await Item.find({}).sort({ date_created: -1 });

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        count: result.length,
        results: result,
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.toString() });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const result = await Item.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

exports.createItem = async (req, res) => {
  const { name, price, description, images } = req.body;
  try {
    let result = await Item.findOne({ email: req.body.email });
    res.send(result);
  } catch (err) {
    res.statu(500).json({ message: err });
  }

  // const newItem = new Item({
  //   name,
  //   price,
  //   description,
  //   images,
  // });

  // newItem
  //   .save()
  //   .then((doc) => {
  //     res.status(200).json({
  //       success: true,
  //       newItem: doc,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(400).json({ success: false, error: err.message });
  //   });
};

exports.updateItem = async (req, res) => {
  try {
    const result = await Item.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      result: result,
      message: "updated successfully.",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });

    result.deletedCount
      ? res.status(200).json({ success: true, message: "Delete successful." })
      : res.status(400).json({ success: false, message: "Delete failed." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
