import mongoose from "mongoose";
import Account from "./accountSchema";
import Message from "./messageSchema";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },
    emailVerified: Date,

    hashedPassword: String,

    image: String,

    // relation
    conversationIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    seenMessageIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

// Delete account when user is removed
// reference ---- "https://mongoosejs.com/docs/middleware.html#pre"
userSchema.pre("remove", async function (next) {
  // 'this' refers to the user document being removed
  const user = this;
  await Account.deleteMany({ user: user._id });
  await Message.deleteMany({ sender: user._id });
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
