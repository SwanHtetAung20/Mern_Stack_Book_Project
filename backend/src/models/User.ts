import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { USER_ROLES } from "./Roles.js";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles?: USER_ROLES[];
  refreshToken?: string;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  roles: {
    type: [String],
    default: [USER_ROLES.USER],
    enum: Object.values(USER_ROLES),
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre<IUser>("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  if (this.isNew) {
    this.refreshToken = this.generateRefreshToken();
  }
});

UserSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.name, roles: this.roles },
    process.env.JWT_SECRET_TOKEN as string,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    }
  );
  return token;
};

UserSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    { id: this._id, username: this.name, roles: this.roles },
    process.env.JWT_REFRESH_TOKEN as string,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    }
  );
  return token;
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
