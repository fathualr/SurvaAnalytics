export const resSuccess = (res, message, data = null, code = 200) => {
  res.status(code).json({
    status: 'success',
    message,
    data
  });
};

export const resFail = (res, message, code = 400) => {
  res.status(code).json({
    status: 'fail',
    message
  });
};
