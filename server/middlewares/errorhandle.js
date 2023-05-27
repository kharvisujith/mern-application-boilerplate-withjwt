const errorHandle = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Intrnal server error" });
};

module.exports = { errorHandle };
