const taskSchema = require("../models/tasks");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  // Find does'nt return a promise but it has then() function that can be used as promise
  const tasks = taskSchema.find({});
  res.status(200).json({ tasks });
});

// If properties other than those in schema are sent via post then only the allowed properties will be considered and added to the db {No error occures}
const createTask = asyncWrapper(async (req, res) => {
  // Handling validation errors
  const task = await taskSchema.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskId } = req.params; //TaskId is alias for id
  const task = await taskSchema.findOne({ _id: TaskId });

  // Below function ensures empty object is not sent
  if (!task) {
    const error = new Error("Not Found ):");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res,next) => {
  const { id: TaskId } = req.params; //TaskId is alias for id
  const task = await taskSchema.findOneAndUpdate(
    { _id: TaskId },
    req.body,
    // By default it gets old values. To get updated values following options are required
    {
      new: true,
      runValidators: true,
    }
  );

  // Below function ensures empty object is not sent
  if (!task) {
    const error = new Error("Not Found ):");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res,next) => {
  const { id: TaskId } = req.params; //TaskId is alias for id
  const task = await taskSchema.findOneAndDelete({ _id: TaskId });

  // Below function ensures empty object is not sent
  if (!task) {
    const error = new Error("Not Found ):");  // Required for error-handler middleware
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
