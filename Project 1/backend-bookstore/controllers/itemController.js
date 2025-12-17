const Item = require("../models/Item");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Cannot add item" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Cannot update item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Cannot delete item" });
  }
};
