const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    // Validators
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "Only 20 characters are allowed"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
