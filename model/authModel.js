import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unipue: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false }
});
// const BlacklistSchema = new mongoose.Schema(
//   {
//       token: {
//           type: String,
//           required: true,
//           ref: "User",
//       },
//   },
//   { timestamps: true }
// );
// const Users = mongoose.model("BlacklistSchema",BlacklistSchema)
const User = mongoose.model("User", userSchema);
export default User;
