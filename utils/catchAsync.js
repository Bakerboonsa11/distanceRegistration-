const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      console.log("even the code part"); // ✅ Now it should log
      await fn(req, res, next); // ✅ Await the function so errors are caught
    } catch (error) {
      console.log("entered the catch");
      next(error); // ✅ Pass the error to the error-handling middleware
    }
  };
};

module.exports = catchAsync;
