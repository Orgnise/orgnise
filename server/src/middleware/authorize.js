var { expressjwt: jwt } = require("express-jwt");
const config = require("../config/auth.config");
const User = require("../models/user");
const RefreshToken = require("../models/refresh-token.model");
const ApiResponseHandler = require("../helper/response/api-response");

module.exports = function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: config.jwtTokenSecret, algorithms: ["HS256"] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await User.findById(req.auth.id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        if (!user) {
          // user no longer exists
          return ApiResponseHandler.default.error({
            res: res,
            message: "",
            status: 401,
            errors: null,
            errorCode: "Unauthorized",
          });
          // return ApiResponseHandler(res, 401, "Unauthorized");
        } else {
          // User is not authorized to access this route
          return ApiResponseHandler.default.error({
            res: res,
            message: "Not authorized to access this resource",
            status: 401,
            errors: null,
            errorCode: "Unauthorized",
          });
        }
      }
      console.log("user", user);
      // authenticate and authorization successful
      // req.user.role = user.role;
      const refreshToken = await RefreshToken.find({ user: user.id });
      req.auth.ownsToken = (token) =>
        !!refreshToken.find((x) => x.token === token);
      next();
    },
  ];
};