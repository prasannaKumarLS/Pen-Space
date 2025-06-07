export default function isAuthenticated(req, res, next) {
  return req.session.user
    ? next()
    : res.status(401).json({ error: "Unauthorized access" });
};
