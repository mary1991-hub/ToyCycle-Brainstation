const requireAuth = (req, res, next) => {
  console.log(req.authUser);
  if (req.authUser) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = requireAuth;
