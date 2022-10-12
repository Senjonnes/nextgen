const response = (data, isError) => {
  return {
    error: isError,
    status: isError ? "01" : "00",
    data,
  };
};

module.exports.response = response;
