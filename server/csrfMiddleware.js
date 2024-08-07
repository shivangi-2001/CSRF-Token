// csrfMiddleware.js
const csrfMiddleware = (req, res, next) => {
  const csrfToken = req.csrfToken();
  console.log("Generated CSRF Token:", csrfToken);
  res.cookie("XSRF-TOKEN", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  next();
};

module.exports = csrfMiddleware;
