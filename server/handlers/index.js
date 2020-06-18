module.exports = {
  ...require("./auth"),
  ...require("./internship"),
  ...require("./admin"),
  ...require("./notices"),
  ...require("./Faculty"),
};

module.exports.notFound = (req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

module.exports.errors = (err, req, res, next) => {
  res.status(err.status || 400).json({
    message: err.message || "Something went wrong",
  });
};