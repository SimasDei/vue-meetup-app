export const throwError = (error = 'Something exploded') => {
  return Promise.reject(error);
};
