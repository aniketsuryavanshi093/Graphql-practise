const AppError = (status, message) => {
  throw Error(JSON.stringify({ statusCode: status, message }));
};

module.exports = AppError;
