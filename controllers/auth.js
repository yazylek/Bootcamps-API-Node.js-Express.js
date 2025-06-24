import { asyncHandler } from "../middlewares/async.js";
import User from "../models/User.js";
import { ErrorResponse } from "../util/errorResponse.js";

/**
 *  @Desc        Post register
 *  @Route       POST /api/v1/auth/register
 *  @Access      Public
 */

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;

  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  jwtResponse(res, 200, user);
});

/**
 *  @Desc        Post login
 *  @Route       POST /api/v1/auth/login
 *  @Access      Public
 */

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
  //   Check token
  const isMatch = user.getJwtToken(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }

  jwtResponse(res, 200, user);
});

/**
 *  @Desc        Get User
 *  @Route       GET /api/v1/auth/user
 *  @Access      private
 */
export const getUser = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

async function jwtResponse(res, statusCode, user) {
  const token = await user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ succes: true, token });
}
