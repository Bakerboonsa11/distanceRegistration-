const AppError = require("../utils/appError");

const errorController = (error, req, res, next) => {
  // Ensure statusCode is always set (defaults to 500)
  console.log('entered error handler')
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  console.log(error.name)

  // Define error handlers for specific cases
  const CastError = (error) => {
    const message = `Invalid ${error.path}: "${error.value}"`;
    return new AppError(message, 400);
  };

  const ValidationError = (error) => {
    if (!error.errors) {
      return new AppError("An unexpected validation error occurred", 400);
    }

    const errors = Object.values(error.errors).map((el) => el.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(message, 400);
  };

  const handleDuplicateErrorDB = (error) => {
    if (error.keyValue && typeof error.keyValue === "object") {
      const value = Object.values(error.keyValue)[0];
      const message = `A duplicate value is '${value}'. Please use another value.`;
      return new AppError(message, 400);
    } else {
      const message = `Unknown duplicate key value. Please try again.`;
      return new AppError(message, 400);
    }
  };

  const sendProductionError = (error, res) => {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message || "An error occurred. Please try again later.", // Default message if error.message is missing
    });
  };

  const sendDevelopmentError = (error, res) => {
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error: error,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
        error: error, // Add detailed error information in development
      });
    }
  };

  const handleJwtError = () =>
    new AppError("Invalid token. Please log in again.", 401);

  const handleJwtExpired = () =>
    new AppError("The token is expired. Please log in again.", 401);

  // Check if the error is one of the expected types, and handle them accordingly
  if (error.name === "CastError") error = CastError(error);
  if (error.code === 11000) error = handleDuplicateErrorDB(error);
  if (error.name === "ValidationError") error = ValidationError(error);
  if (error.name === "JsonWebTokenError") error = handleJwtError(error);
  if (error.name === "TokenExpiredError") error = handleJwtExpired(error);

  // Handling environment-based error responses
  if (process.env.ENV === "production") {
    sendProductionError(error, res);
  } else if (process.env.ENV === "development") {
    console.log("Error in development:", error); // Log for development
    sendDevelopmentError(error, res);
  }
};

module.exports = errorController;
