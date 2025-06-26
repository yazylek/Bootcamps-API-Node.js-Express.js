import { asyncHandler } from "../middlewares/async.js";
import User from "../models/User.js";
import { ErrorResponse } from "../util/errorResponse.js";
import { sendEmail } from "../util/sendEmail.js";
import crypto from "node:crypto";

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
  const isMatch = await user.getJwtToken(password);

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

/**
 *  @Desc        Log user out / clear cookies
 *  @Route       GET /api/v1/auth/logout
 *  @Access      private
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

/**
 *  @Desc        Reset Password
 *  @Route       POST /api/v1/auth/forgotpassword
 *  @Access      public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you or someone else has requested the reset of password. Please make a put request to: ${resetURL} `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 404));
  }
});

/**
 *  @Desc        Reset password
 *  @Route       POST /api/v1/auth/resetpassword/:resettoken
 *  @Access      Public
 */

export const resetPassword = asyncHandler(async (req, res, next) => {
  //  get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  jwtResponse(res, 200, user);
});

// /////////////////////////////////////////////////////////////////////////////////////////////////

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
