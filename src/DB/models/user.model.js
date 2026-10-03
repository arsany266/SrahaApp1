import mongoose from "mongoose";
import {
  GenderEnum,
  ProviderEnum,
  RoleEnum,
} from "../../utils/enums/user.enum.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is mandatory"],
      minLength: 2,
      maxLength: 22,
    },
    lastName: {
      type: String,
      required: [true, "lastName is mandatory"],
      minLength: 2,
      maxLength: 22,
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider == ProviderEnum.system;
      },
    },
    DOB: Date,
    phone: String,
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.Male,
    },
    role: {
      type: Number,
      role: Object.values(RoleEnum),
      default: RoleEnum.user,
    },

    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.system,
    },
    confirmEmailOtp: String,
    confirmEmail: Date,
    forgetPasswordOtp: String,
    profilePic: String,
    coverImaes: [String],
    changeCredentialsTime: Date,
    // freeze account
    freezedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    freezedAt: Date,
    restoredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restoredAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema
  .virtual("username")
  .set(function (value) {
    const [firsName, lastName] = value?.split(" ") || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
