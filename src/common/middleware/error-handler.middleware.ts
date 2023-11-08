export const errorHandler = (err, req, res, next) => {
  console.log('Error handler', err.message);
  res.status(err.code || 500);
  res.json({
    error: {
      message: (err.code && err.message) || 'Internal server error',
    },
    data: null,
  });
};
