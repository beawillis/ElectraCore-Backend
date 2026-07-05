const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    // User should already exist from authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    // Check if the user's role is included in the allowed roles
    const hasAccess =
      allowedRoles.includes(req.user.role);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to access this resource"
      });
    }

    next();
  };
};

module.exports = authorizeRoles;