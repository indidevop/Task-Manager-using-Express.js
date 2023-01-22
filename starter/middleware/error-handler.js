// Previous middleware will directly redirect to below function if error occurs

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
