// Middleware to handle errors in the application
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message
  });
};

module.exports = errorHandler;