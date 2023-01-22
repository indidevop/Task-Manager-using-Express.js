// This function returns a promise
// If rejected or error is thrown the next(error) is called 
// Below is a function to just redirect if error occurs in fn

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Passing error to next middleware
    }
  };
};

module.exports=asyncWrapper;


// Express provides built-in error handler middleware
// It is added to the end of the middleware stack by default
// So if you send an error to the next(), it will be handled automatically
// In this project we have created a custom middleware