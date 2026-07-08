const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const crypto = require("crypto");
const { passwordResetTemplate } = require("../utils/emailTemplates");

const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(data.password);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role
  });

  return user;
};

const loginUser = async (email, password) => {
  // Return the same message for missing users and bad passwords so login does
  // not reveal which emails are registered.
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

const forgotPassword = async (email) => {
  if (!email) throw new Error("Email is required");

  const user = await User.findOne({ email });
  if (!user) return null;

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${token}`;
  const template = passwordResetTemplate(resetLink);

  return { token, email: user.email, template };
};

const resetPassword = async (token, password) => {
  if (!token || !password) throw new Error("Token and password are required");

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error("Invalid or expired reset token");

  user.password = await hashPassword(password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { email: user.email };
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
