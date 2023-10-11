export const errorHandler = (err) => {
  const error = new Error();
  error.statusCode = err.response.data.statusCode;
  error.message = err.response.data.message;
  console.log(error);
  return error;
};
