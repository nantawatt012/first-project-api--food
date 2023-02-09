module.exports = (mes, statusCode) => {
  const error = new Error(mes);
  error.statusCode = statusCode;
  throw error;
};
