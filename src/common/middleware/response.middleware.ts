export const formatResponse = (req, res, next) => {
  res.formattedSent = (data: any) => {
    try {
      res.json({ data: data, error: null });
    } catch (error) {
      console.log('formatter error');
      next(error);
    }
  };
  next();
};
