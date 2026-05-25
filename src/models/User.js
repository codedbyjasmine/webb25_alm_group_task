import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    profileImage: {
      type: String,
      required: false,
      match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Please enter a valid URL for your image"],
    },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  const Accommodation = (await import("./Accommodation.js")).default;
  await Accommodation.deleteMany({ userId: this.getQuery()._id });
  next();
});

export default mongoose.model("User", userSchema);
